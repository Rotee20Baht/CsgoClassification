const express = require("express");
const mysql = require('mysql');
const app = express();
const port = 3001;
const axios = require('axios');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csgo"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.get("/map", (req, res) => {
    con.query("SELECT * FROM map", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json({ data: result })
    });
});

app.get("/recreatemodel", (req, res) => {

    var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/create_model',
        headers: {}
    };

    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.post("/predict", (req, res) => {
    let arr_data = req.body;
    let ct_primay = [ arr_data.ct_infomation[0].primary_gun_1,
                      arr_data.ct_infomation[1].primary_gun_2,
                      arr_data.ct_infomation[2].primary_gun_3,
                      arr_data.ct_infomation[3].primary_gun_4,
                      arr_data.ct_infomation[4].primary_gun_5,
                    ]
    let ct_secondary = [ arr_data.ct_infomation[0].secondary_gun_1,
                         arr_data.ct_infomation[1].secondary_gun_2,
                         arr_data.ct_infomation[2].secondary_gun_3,
                         arr_data.ct_infomation[3].secondary_gun_4,
                         arr_data.ct_infomation[4].secondary_gun_5,
                    ]
    let ct_nade = [ arr_data.ct_infomation[0].nade_1,
                    arr_data.ct_infomation[1].nade_2,
                    arr_data.ct_infomation[2].nade_3,
                    arr_data.ct_infomation[3].nade_4,
                    arr_data.ct_infomation[4].nade_5,
                ]
    let t_primay = [ arr_data.t_infomation[0].primary_gun_t1,
                     arr_data.t_infomation[1].primary_gun_t2,
                     arr_data.t_infomation[2].primary_gun_t3,
                     arr_data.t_infomation[3].primary_gun_t4,
                     arr_data.t_infomation[4].primary_gun_t5,
                ]
    let t_secondary = [ arr_data.t_infomation[0].secondary_gun_t1,
                        arr_data.t_infomation[1].secondary_gun_t2,
                        arr_data.t_infomation[2].secondary_gun_t3,
                        arr_data.t_infomation[3].secondary_gun_t4,
                        arr_data.t_infomation[4].secondary_gun_t5,
                    ]
    let t_nade = [  arr_data.t_infomation[0].nade_1,
                    arr_data.t_infomation[1].nade_2,
                    arr_data.t_infomation[2].nade_3,
                    arr_data.t_infomation[3].nade_4,
                    arr_data.t_infomation[4].nade_5,
                ]

    // console.log(ct_primay)
    // console.log(ct_secondary)
    // console.log(ct_nade)
    // console.log(t_primay)
    // console.log(t_secondary)
    // console.log(t_nade)
    
    let arr_df = JSON.stringify({
        "time_left": arr_data.time_left,
        "ct_score": arr_data.ct_score,
        "t_score": arr_data.t_score,
        "map": arr_data.map,
        "bomb_planted": (arr_data.bomb_planted === 1) ? arr_data.bomb_planted = "True": arr_data.bomb_planted = "False",
        "ct_health": arr_data.ct_infomation.reduce((total, obj) => obj.hp + total,0),
        "t_health": arr_data.t_infomation.reduce((total, obj) => obj.hp + total,0),
        "ct_armor": arr_data.ct_infomation.reduce((total, obj) => obj.armor + total,0),
        "t_armor": arr_data.t_infomation.reduce((total, obj) => obj.armor + total,0),
        "ct_money": arr_data.ct_infomation.reduce((total, obj) => obj.money + total,0),
        "t_money": arr_data.t_infomation.reduce((total, obj) => obj.money + total,0),
        "ct_helmets": arr_data.ct_infomation.reduce((total, obj) => obj.helmet + total,0),
        "t_helmets": arr_data.t_infomation.reduce((total, obj) => obj.helmet + total,0),
        "ct_defuse_kits": 
            arr_data.ct_infomation[0].defuse_kits_1+
            arr_data.ct_infomation[1].defuse_kits_2+
            arr_data.ct_infomation[2].defuse_kits_3+
            arr_data.ct_infomation[3].defuse_kits_4+
            arr_data.ct_infomation[4].defuse_kits_5,
        "ct_players_alive": arr_data.ct_infomation.reduce((total, obj) => obj.is_alive + total,0),
        "t_players_alive": arr_data.t_players_alive,
        "ct_weapon_ak47": ct_primay.filter(ele => ele == "ak47").length,
        "t_weapon_ak47": t_primay.filter(ele => ele == "ak47").length,
        "ct_weapon_aug": ct_primay.filter(ele => ele == "aug").length,
        "t_weapon_aug": t_primay.filter(ele => ele == "aug").length,
        "ct_weapon_awp": ct_primay.filter(ele => ele == "awp").length,
        "t_weapon_awp": t_primay.filter(ele => ele == "awp").length,
        "ct_weapon_bizon": ct_primay.filter(ele => ele == "bizon").length,
        "t_weapon_bizon": t_primay.filter(ele => ele == "bizon").length,
        "ct_weapon_cz75auto": ct_secondary.filter(ele => ele == "cz75auto").length,
        "t_weapon_cz75auto": t_secondary.filter(ele => ele == "cz75auto").length,
        "ct_weapon_elite": ct_secondary.filter(ele => ele == "elite").length,
        "t_weapon_elite": t_secondary.filter(ele => ele == "elite").length,
        "ct_weapon_famas": ct_secondary.filter(ele => ele == "famas").length,
        "t_weapon_famas": t_secondary.filter(ele => ele == "famas").length,
        "ct_weapon_glock": ct_secondary.filter(ele => ele == "glock").length,
        "t_weapon_glock": t_secondary.filter(ele => ele == "glock").length,
        "ct_weapon_g3sg1": ct_primay.filter(ele => ele == "g3sg1").length,
        "t_weapon_g3sg1": t_primay.filter(ele => ele == "g3sg1").length,
        "ct_weapon_galilar": ct_primay.filter(ele => ele == "galilar").length,
        "t_weapon_galilar": t_primay.filter(ele => ele == "galilar").length,
        "ct_weapon_m249": ct_primay.filter(ele => ele == "m249").length,
        "t_weapon_m249": t_primay.filter(ele => ele == "m249").length,
        "ct_weapon_m4a1s": ct_primay.filter(ele => ele == "m4a1s").length,
        "t_weapon_m4a1s": t_primay.filter(ele => ele == "m4a1s").length,
        "ct_weapon_m4a4": ct_primay.filter(ele => ele == "m4a4").length,
        "t_weapon_m4a4": t_primay.filter(ele => ele == "m4a4").length,
        "t_weapon_mac10": t_primay.filter(ele => ele == "mac10").length,
        "ct_weapon_mac10": ct_primay.filter(ele => ele == "mac10").length,
        "ct_weapon_mag7": ct_primay.filter(ele => ele == "mag7").length,
        "t_weapon_mag7": t_primay.filter(ele => ele == "mag7").length,
        "ct_weapon_mp5sd": ct_primay.filter(ele => ele == "mp5sd").length,
        "t_weapon_mp5sd": t_primay.filter(ele => ele == "mp5sd").length,
        "ct_weapon_mp7": ct_primay.filter(ele => ele == "mp7").length,
        "t_weapon_mp7": t_primay.filter(ele => ele == "mp7").length,
        "ct_weapon_mp9": ct_primay.filter(ele => ele == "mp9").length,
        "t_weapon_mp9": t_primay.filter(ele => ele == "mp9").length,
        "ct_weapon_negev": ct_primay.filter(ele => ele == "negev").length,
        "t_weapon_negev": t_primay.filter(ele => ele == "negev").length,
        "ct_weapon_nova": ct_primay.filter(ele => ele == "nova").length,
        "t_weapon_nova": t_primay.filter(ele => ele == "nova").length,
        "ct_weapon_p90": ct_primay.filter(ele => ele == "p90").length,
        "t_weapon_p90": t_primay.filter(ele => ele == "p90").length,
        "ct_weapon_r8revolver": ct_secondary.filter(ele => ele == "r8revolver").length,
        "t_weapon_r8revolver": t_secondary.filter(ele => ele == "r8revolver").length,
        "ct_weapon_sawedoff": ct_primay.filter(ele => ele == "sawedoff").length,
        "t_weapon_sawedoff": t_primay.filter(ele => ele == "sawedoff").length,
        "ct_weapon_scar20": ct_primay.filter(ele => ele == "scar20").length,
        "t_weapon_scar20": t_primay.filter(ele => ele == "scar20").length,
        "ct_weapon_ssg08": ct_primay.filter(ele => ele == "ssg08").length,
        "t_weapon_ssg08": t_primay.filter(ele => ele == "ssg08").length,
        "ct_weapon_sg553": ct_primay.filter(ele => ele == "sg553").length,
        "t_weapon_sg553": t_primay.filter(ele => ele == "sg553").length,
        "ct_weapon_ump45": ct_primay.filter(ele => ele == "ump45").length,
        "t_weapon_ump45": t_primay.filter(ele => ele == "ump45").length,
        "ct_weapon_xm1014": ct_primay.filter(ele => ele == "xm1014").length,
        "t_weapon_xm1014": t_primay.filter(ele => ele == "xm1014").length,
        "ct_weapon_deagle": ct_secondary.filter(ele => ele == "deagle").length,
        "t_weapon_deagle": t_secondary.filter(ele => ele == "deagle").length,
        "ct_weapon_fiveseven": ct_secondary.filter(ele => ele == "fiveseven").length,
        "t_weapon_fiveseven": t_secondary.filter(ele => ele == "fiveseven").length,
        "ct_weapon_usps": ct_secondary.filter(ele => ele == "usps").length,
        "t_weapon_usps": t_secondary.filter(ele => ele == "usps").length,
        "ct_weapon_p250": ct_secondary.filter(ele => ele == "p250").length,
        "t_weapon_p250": t_secondary.filter(ele => ele == "p250").length,
        "ct_weapon_p2000": ct_secondary.filter(ele => ele == "p2000").length,
        "t_weapon_p2000": t_secondary.filter(ele => ele == "p2000").length,
        "ct_weapon_tec9": ct_secondary.filter(ele => ele == "tec9").length,
        "t_weapon_tec9": t_secondary.filter(ele => ele == "tec9").length,
        "ct_grenade_hegrenade": ct_nade.filter(ele => ele == "hegrenade").length,
        "t_grenade_hegrenade": t_nade.filter(ele => ele == "hegrenade").length,
        "ct_grenade_flashbang": ct_nade.filter(ele => ele == "flashbang").length,
        "t_grenade_flashbang": t_nade.filter(ele => ele == "flashbang").length,
        "ct_grenade_smokegrenade": ct_nade.filter(ele => ele == "smokegrenade").length,
        "t_grenade_smokegrenade": t_nade.filter(ele => ele == "smokegrenade").length,
        "ct_grenade_incendiarygrenade": ct_nade.filter(ele => ele == "incendiarygrenade").length,
        "t_grenade_incendiarygrenade": t_nade.filter(ele => ele == "incendiarygrenade").length,
        "ct_grenade_molotovgrenade": ct_nade.filter(ele => ele == "molotovgrenade").length,
        "t_grenade_molotovgrenade": t_nade.filter(ele => ele == "molotovgrenade").length,
        "ct_grenade_decoygrenade": ct_nade.filter(ele => ele == "decoygrenade").length,
        "t_grenade_decoygrenade": t_nade.filter(ele => ele == "decoygrenade").length,
    })

    console.log(arr_df)
    
    var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/predict',
        headers: {
            'Content-Type': 'application/json'
        },
        data: arr_df
    };

    axios(config)
    .then(function (response) {
            console.log(response.data);
            res.json(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});