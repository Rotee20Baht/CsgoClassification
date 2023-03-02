import React from 'react';
import axios from 'axios';

class Products extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            map_data: [],
            time_left: 0,
            ct_score: 0,
            t_score: 0,
            t_players_alive: 5,
            map: null,
            bomb_planted: 0,
            ct_infomation: [
                {
                    id: 1,
                    hp: 100,
                    armor: 0,
                    money: 800,
                    helmet: 0,
                    defuse_kits_1: 0,
                    primary_gun_1: 0,
                    secondary_gun_1: 0,
                    nade_1: 0,
                    is_alive : 1
                },
                {
                    id: 2,
                    hp: 100,
                    armor: 0,
                    money: 800,
                    helmet: 0,
                    defuse_kits_2: 0,
                    primary_gun_2: 0,
                    secondary_gun_2: 0,
                    nade_2: 0,
                    is_alive : 1
                },
                {
                    id: 3,
                    hp: 100,
                    armor: 0,
                    money: 800,
                    helmet: 0,
                    defuse_kits_3: 0,
                    primary_gun_3: 0,
                    secondary_gun_3: 0,
                    nade_3: 0,
                    is_alive : 1
                },
                {
                    id: 4,
                    hp: 100,
                    armor: 0,
                    money: 800,
                    helmet: 0,
                    defuse_kits_4: 0,
                    primary_gun_4: 0,
                    secondary_gun_4: 0,
                    nade_4: 0,
                    is_alive : 1
                },
                {
                    id: 5,
                    hp: 100,
                    armor: 0,
                    money: 800,
                    helmet: 0,
                    defuse_kits_5: 0,
                    primary_gun_5: 0,
                    secondary_gun_5: 0,
                    nade_5: 0,
                    is_alive : 1
                }
            ],
            t_infomation: [
                {
                    id: 1,
                    hp: 100,
                    armor: 0,
                    money: 800,
                    helmet: 0,
                    primary_gun_1: 0,
                    secondary_gun_1: 0,
                    nade_1: 0,
                    is_alive : 1
                },
                {
                    id: 2,
                    hp: 100,
                    armor: 0,
                    money: 800,
                    helmet: 0,
                    primary_gun_2: 0,
                    secondary_gun_2: 0,
                    nade_2: 0,
                    is_alive : 1
                },
                {
                    id: 3,
                    hp: 100,
                    armor: 0,
                    money: 800,
                    helmet: 0,
                    primary_gun_3: 0,
                    secondary_gun_3: 0,
                    nade_3: 0,
                    is_alive : 1
                },
                {
                    id: 4,
                    hp: 100,
                    armor: 0,
                    money: 800,
                    helmet: 0,
                    primary_gun_4: 0,
                    secondary_gun_4: 0,
                    nade_4: 0,
                    is_alive : 1
                },
                {
                    id: 5,
                    hp: 100,
                    armor: 0,
                    money: 800,
                    helmet: 0,
                    primary_gun_5: 0,
                    secondary_gun_5: 0,
                    nade_5: 0,
                    is_alive : 1
                }
            ],
            round_winner: null,
        }
    }



    componentDidMount(){
        this.getMap();
    }

    getMap = () => {
        axios.get("http://localhost:3001/map").then((res) => {
            this.setState({map_data: res.data.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
          [name]: value
        });
    }

    handleNumberChange = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
          [name]: parseInt(value)
        });
    }

    handleDecimalChange = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
          [name]: parseFloat(value)
        });
    }

    handleChecked = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        let toggle = this.state[name];
        (toggle == 1)? toggle = 0: toggle = 1;
        this.setState({
          [name]: toggle
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/predict', this.state).then(res => {
          console.log(res.data);
          if(res.data){
            this.setState({
                round_winner: res.data.round_winner
            })
          }
        }).catch(error => {
          console.log(error);
        });
    }

    handleCreate = () => {
        axios.get("http://localhost:3001/recreatemodel").then(res => {
            console.log(res.data);
            if(res.data) alert("Successful Model Creation ")
        }).catch(error => {
            console.log(error);
            alert("Model Creation Failed ")
        });
    }

    updateState = (index) => (e) => {
        const newArray = this.state.ct_infomation.map((item, i) => {
          if (index === i) {
            return { ...item, [e.target.name]: e.target.value };
          } else {
            return item;
          }
        });
        this.setState({ ct_infomation: newArray });
    }

    updateStateT = (index) => (e) => {
        const newArray = this.state.t_infomation.map((item, i) => {
          if (index === i) {
            return { ...item, [e.target.name]: e.target.value };
          } else {
            return item;
          }
        });
        this.setState({ t_infomation: newArray });
    }

    updateStateNumber = (index) => (e) => {
        const newArray = this.state.ct_infomation.map((item, i) => {
          if (index === i) {
            return { ...item, [e.target.name]: parseInt(e.target.value) };
          } else {
            return item;
          }
        });
        this.setState({ ct_infomation: newArray });
    }    

    updateStateNumberT = (index) => (e) => {
        const newArray = this.state.t_infomation.map((item, i) => {
          if (index === i) {
            return { ...item, [e.target.name]: parseInt(e.target.value) };
          } else {
            return item;
          }
        });
        this.setState({ t_infomation: newArray });
    }

    updateStateToggle = (index) => (e) => {
        const newArray = this.state.ct_infomation.map((item, i) => {
          if (index === i) {
            return { ...item, [e.target.name]: (e.target.value == 1) ? e.target.value = 0: e.target.value = 1};
          } else {
            return item;
          }
        });
        this.setState({ ct_infomation: newArray });
    }

    updateStateToggleT = (index) => (e) => {
        const newArray = this.state.t_infomation.map((item, i) => {
          if (index === i) {
            return { ...item, [e.target.name]: (e.target.value == 1) ? e.target.value = 0: e.target.value = 1};
          } else {
            return item;
          }
        });
        this.setState({ t_infomation: newArray });
    }

    updateAliveCt = (index) => (e) => {
        let oper = (e.target.value == 1) ? e.target.value = 0: e.target.value = 1;
        let newArray = {};
        console.log(oper)
        if(!oper){
            newArray = this.state.ct_infomation.map((item, i) => {
                if (index === i) {
                    let temp = {}
                    for(var key in item) {
                        if(key === "id"){ 
                            temp["id"] = index+1;
                            continue; 
                        }
                        if(key === "is_alive"){ 
                            temp["is_alive"] = oper;
                            continue; 
                        }
                        temp[key] = 0
                    }
                    return temp;
                }else
                    return item;
            })
        }else{
            newArray = this.state.ct_infomation.map((item, i) => {
                if (index === i) {
                  return { ...item, [e.target.name]: oper};
                } else {
                  return item;
                }
            })
        }
        console.log(newArray)
        this.setState({ ct_infomation: newArray });
    }

    updateAliveT = (index) => (e) => {
        let oper = (e.target.value == 1) ? e.target.value = 0: e.target.value = 1;
        let newArray = {};
        console.log(oper)
        if(!oper){
            newArray = this.state.t_infomation.map((item, i) => {
                if (index === i) {
                    let temp = {}
                    for(var key in item) {
                        if(key === "id"){ 
                            temp["id"] = index+1;
                            continue; 
                        }
                        if(key === "is_alive"){ 
                            temp["is_alive"] = oper;
                            continue; 
                        }
                        temp[key] = 0
                    }
                    return temp;
                }else
                    return item;
            })
        }else{
            newArray = this.state.t_infomation.map((item, i) => {
                if (index === i) {
                  return { ...item, [e.target.name]: oper};
                } else {
                  return item;
                }
            })
        }
        console.log(newArray)
        this.setState({ t_infomation: newArray });
    }

    render(){
        return(
            <div class="container">
                <form onSubmit={this.handleSubmit}>
                    <section class="score-section">
                        <div class="score-container">
                            <span class="team-name">counter terrorist</span>
                            <div class="score-badge">
                                <div class="team-score">
                                    <img class="team-logo" src="assets/Icon/Ct-patch-small-bw.png" alt="" />
                                    <div class="score-input">
                                        <input type="number" name="ct_score" id="" onChange={this.handleNumberChange} value={this.state.ct_score} min="0" max="32" />
                                    </div>
                                </div>
                                <div class="team-score timer">
                                    <span class="material-symbols-outlined icon">schedule</span>
                                    <div class="score-input">
                                        <input type="number" name="time_left" id="" onChange={this.handleDecimalChange} value={this.state.time_left} min="0.0" max="180" step="5.1" />
                                    </div>
                                </div>
                                <div class="team-score">
                                    <div class="is_planted">
                                        <input type="checkbox" name="bomb_planted" id="bomb_planted" onChange={this.handleChecked} value={this.state.bomb_planted}/>
                                        <label for="bomb_planted">
                                            <img class="team-logo" src="assets/Icon/Weapons/C4.png" alt="" />
                                        </label>
                                    </div>
                                </div>
                                <div class="team-score">
                                    <div class="score-input">
                                        <input type="number" name="t_score" id="" onChange={this.handleNumberChange} value={this.state.t_score} min="0" max="32" />
                                    </div>
                                    <img class="team-logo" src="assets/Icon/t-patch-small-bw.png" alt="" />
                                </div>
                            </div>
                            <span class="team-name">terrorist</span>
                        </div>
                    </section>

                    <section class="map-section">
                        <h1>Select Map</h1>
                        <div class="map-img-container">
                            {(this.state.map_data).map((d, i) => (
                                <div class="input-map">
                                    <input type="radio" name="map" id={d.map} value={d.map} onChange={this.handleChange}/>
                                    <label for={d.map}>
                                        <div class="map-image" id={"map-"+d.map}></div>
                                        <img src={"./assets/Icon/collection_icon_"+d.map+".png"} alt="" />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section class="player-tab">
                        <div class="players-container">
                            {(this.state.ct_infomation).map((data, index) => (
                                <div class="player-card-container">
                                    <span>{data.hp}</span>
                                    <div className='player-hp-box' style={{ width: `${data.hp}%` }}></div>
                                    <div className="player-info-box">
                                        <div className="player-img-bg">
                                            <img className="player-img" src="./assets/Icon/Ct-patch-small-bw.png" alt="" />
                                        </div>
                                        <div className="player-tune">
                                            <div className="interior">
                                                <div className='is_alive ct'>
                                                    <input type="checkbox" name="is_alive" id={"is_alive_"+data.id} onChange={this.updateAliveCt(index)} checked={data.is_alive}/>
                                                    <label for={"is_alive_"+data.id} ><span class="material-symbols-outlined"> skull </span></label>
                                                </div>
                                                <a id={"open-modal_ct"+data.id} className={data.is_alive? null : 'disable'} href={"#open-modal" + data.id}><span class="material-symbols-outlined">tune</span></a>
                                            </div>
                                            <div id={"open-modal" + data.id} className="modal-window">
                                                <div className="modal-wrapper">
                                                    <div className='modal-info-con'>
                                                        <div className="modal-section-header"><span className="material-symbols-outlined">manage_accounts </span><span>CT Player {data.id}</span></div>
                                                        <a href="#" title="Close" className="modal-close">Close</a>

                                                        <div className="modal-section">
                                                            <h1 className="modal-section-header2">🩸 Health Point : <span>{data.hp}</span></h1>
                                                            <input type="range" name="hp" min="0" max="100" step="1" onChange={this.updateStateNumber(index)} value={data.hp} />
                                                        </div>

                                                        <div className="modal-section">
                                                            <h1 className="modal-section-header2">🛡️ Armor : <span>{data.armor}</span></h1>
                                                            <input type="checkbox" className="" name="helmet" id={"helmets_" + data.id} checked={data.helmet} onChange={this.updateStateToggle(index)} />
                                                            <label for={"helmets_" + data.id} className="checkbox-label">Helmet</label>
                                                            <input type="range" name="armor" min="0" max="100" step="1" onChange={this.updateStateNumber(index)} value={data.armor} />
                                                        </div>

                                                        <div className="modal-section">
                                                            <h1 className="modal-section-header2">💸 Money : <span>${data.money}</span></h1>
                                                            <input type="range" name="money" min="0" max="20000" step="1" onChange={this.updateStateNumber(index)} value={data.money} />
                                                        </div>

                                                        <div className="modal-section">
                                                            <h1 className="modal-section-header2">🔫 Primary Gun</h1>
                                                            <div className="weapon-img-con">
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"ak_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="ak47" />
                                                                    <label for={"ak_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/ak47.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"aug_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="aug" />
                                                                    <label for={"aug_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/aug.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"famas_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="famas" />
                                                                    <label for={"famas_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/famas.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"galilar_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="galilar" />
                                                                    <label for={"galilar_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/galilar.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"m4a1s_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="m4a1s" />
                                                                    <label for={"m4a1s_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/m4a1s.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"m4a4_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="m4a4" />
                                                                    <label for={"m4a4_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/m4a4.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"m249_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="m249" />
                                                                    <label for={"m249_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/m249.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"negev_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="negev" />
                                                                    <label for={"negev_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/negev.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"sg553_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="sg553" />
                                                                    <label for={"sg553_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/sg553.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"awp_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="awp" />
                                                                    <label for={"awp_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/awp.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"g3sg1_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="g3sg1" />
                                                                    <label for={"g3sg1_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/g3sg1.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"scar20_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="scar20" />
                                                                    <label for={"scar20_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/scar20.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"ssg08_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="ssg08" />
                                                                    <label for={"ssg08_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/ssg08.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"mac10_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="mac10" />
                                                                    <label for={"mac10_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/mac10.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"mp5sd_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="mp5sd" />
                                                                    <label for={"mp5sd_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/mp5sd.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"mp7_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="mp7" />
                                                                    <label for={"mp7_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/mp7.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"mp9_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="mp9" />
                                                                    <label for={"mp9_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/mp9.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"p90_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="p90" />
                                                                    <label for={"p90_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/p90.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"bizon_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="bizon" />
                                                                    <label for={"bizon_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/bizon.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"ump45_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="ump45" />
                                                                    <label for={"ump45_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/ump45.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"mag7_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="macg" />
                                                                    <label for={"mag7_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/mag7.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"nova_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="nova" />
                                                                    <label for={"nova_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/nova.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"sawedoff_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="sawedoff" />
                                                                    <label for={"sawedoff_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/sawedoff.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"xm1014_ct_primary_" + data.id} name={"primary_gun_" + data.id} onChange={this.updateState(index)} value="xm1014" />
                                                                    <label for={"xm1014_ct_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/xm1014.png' />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="modal-section">
                                                            <h1 className="modal-section-header2">🔫 Secondary Gun</h1>
                                                            <div className="weapon-img-con">
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"cz75auto_ct_secondary_" + data.id} name={"secondary_gun_" + data.id} onChange={this.updateState(index)} value="cz75auto" />
                                                                    <label for={"cz75auto_ct_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/cz75auto.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"deagle_ct_secondary_" + data.id} name={"secondary_gun_" + data.id} onChange={this.updateState(index)} value="deagle" />
                                                                    <label for={"deagle_ct_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/deagle.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"elite_ct_secondary_" + data.id} name={"secondary_gun_" + data.id} onChange={this.updateState(index)} value="elite" />
                                                                    <label for={"elite_ct_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/elite.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"fiveseven_ct_secondary_" + data.id} name={"secondary_gun_" + data.id} onChange={this.updateState(index)} value="fiveseven" />
                                                                    <label for={"fiveseven_ct_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/fiveseven.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"glock_ct_secondary_" + data.id} name={"secondary_gun_" + data.id} onChange={this.updateState(index)} value="glock" />
                                                                    <label for={"glock_ct_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/glock.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"p2000_ct_secondary_" + data.id} name={"secondary_gun_" + data.id} onChange={this.updateState(index)} value="p2000" />
                                                                    <label for={"p2000_ct_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/p2000.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"p250_ct_secondary_" + data.id} name={"secondary_gun_" + data.id} onChange={this.updateState(index)} value="p250" />
                                                                    <label for={"p250_ct_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/p250.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"tec9_ct_secondary_" + data.id} name={"secondary_gun_" + data.id} onChange={this.updateState(index)} value="tec9" />
                                                                    <label for={"tec9_ct_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/tec9.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"usps_ct_secondary_" + data.id} name={"secondary_gun_" + data.id} onChange={this.updateState(index)} value="usps" />
                                                                    <label for={"usps_ct_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/usps.png' />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="modal-section">
                                                            <h1 className="modal-section-header2">🎒 Equipment</h1>
                                                            <div className="weapon-img-con">
                                                                <div className="weapon-input-con">
                                                                    <input type="checkbox" id={"ct_defuse_kits_"+data.id} name={"defuse_kits_"+data.id} onChange={this.updateStateToggle(index)} />
                                                                    <label for={"ct_defuse_kits_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/defuse_kits.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"decoygrenade_ct_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateState(index)} value="decoygrenade" />
                                                                    <label for={"decoygrenade_ct_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/decoygrenade.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"flashbang_ct_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateState(index)} value="flashbang" />
                                                                    <label for={"flashbang_ct_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/flashbang.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"hegrenade_ct_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateState(index)} value="hegrenade" />
                                                                    <label for={"hegrenade_ct_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/hegrenade.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"incendiarygrenade_ct_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateState(index)} value="incendiarygrenade" />
                                                                    <label for={"incendiarygrenade_ct_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/incendiarygrenade.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con hidden">
                                                                    <input type="radio" id={"molotovgrenade_ct_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateState(index)} value="molotovgrenade" />
                                                                    <label for={"molotovgrenade_ct_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/molotovgrenade.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"smokegrenade_ct_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateState(index)} value="smokegrenade" />
                                                                    <label for={"smokegrenade_ct_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/smokegrenade.png' />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* A Player Element*/}
                            {/* <div class="player-card-container">
                                <span>{this.state.ct_hp_1}</span>
                                <div class="player-hp-box" style={{width : `${this.state.ct_hp_1}%`}}>
                                </div>
                                <div class="player-info-box">
                                    <div class="player-img-bg">
                                        <img class="player-img" src="./assets/Icon/Ct-patch-small-bw.png" alt="" />
                                    </div>
                                    <div class="player-tune">
                                        <div class="interior">
                                            <a class="btn" href="open-modal1"><span class="material-symbols-outlined">tune</span></a>
                                        </div>
                                        <div id="open-modal1" class="modal-window disable">
                                            <div class="modal-wrapper">
                                                <div class="modal-info-con">
                                                    <div class="modal-section-header"><span class="material-symbols-outlined">manage_accounts </span><span>CT Player 1</span></div>
                                                    <a href="#" title="Close" class="modal-close">Close</a>

                                                    <div class="modal-section">
                                                        <h1 class="modal-section-header2">🩸 Health Point : <span>{this.state.ct_hp_1}</span></h1>
                                                        <input type="range" name="ct_hp_1" min="0" max="100" step="1" onChange={this.handleNumberChange} value={this.state.ct_hp_1}/>
                                                    </div>

                                                    <div class="modal-section">
                                                        <h1 class="modal-section-header2">🛡️ Armor : <span>{this.state.ct_armor_1}</span></h1>
                                                        <input type="checkbox" class="" name="ct_helmets_1" id="helmets_1" checked={this.state.ct_helmets_1} onChange={this.handleChecked}/>
                                                        <label for="helmets_1" class="checkbox-label">Helmet</label>
                                                        <input type="range" name="ct_armor_1" min="0" max="100" onChange={this.handleNumberChange} value={this.state.ct_armor_1} />
                                                    </div>

                                                    <div class="modal-section">
                                                        <h1 class="modal-section-header2">💸 Money : <span>${this.state.ct_money_1}</span></h1>
                                                        <input type="range" name="ct_money_1" min="0" max="20000" onChange={this.handleNumberChange} value={this.state.ct_money_1} />
                                                    </div>

                                                    <div class="modal-section">
                                                        <h1 class="modal-section-header2">🔫 Primary Gun</h1>
                                                        <div class="weapon-img-con">
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="ak_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="ak47"/>
                                                                <label for="ak_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/ak47.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="aug_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="aug"/>
                                                                <label for="aug_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/aug.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="famas_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="famas"/>
                                                                <label for="famas_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/famas.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="galilar_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="galilar"/>
                                                                <label for="galilar_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/galilar.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="m4a1s_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="m4a1s"/>
                                                                <label for="m4a1s_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/m4a1s.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="m4a4_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="m4a4"/>
                                                                <label for="m4a4_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/m4a4.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="m249_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="m249"/>
                                                                <label for="m249_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/m249.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="negev_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="negev"/>
                                                                <label for="negev_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/negev.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="sg553_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="sg553"/>
                                                                <label for="sg553_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/sg553.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="awp_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="awp"/>
                                                                <label for="awp_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/awp.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="g3sg1_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="g3sg1"/>
                                                                <label for="g3sg1_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/g3sg1.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="scar20_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="scar20"/>
                                                                <label for="scar20_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/scar20.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="ssg08_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="ssg08"/>
                                                                <label for="ssg08_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/ssg08.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="mac10_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="mac10"/>
                                                                <label for="mac10_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/mac10.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="mp5sd_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="mp5sd"/>
                                                                <label for="mp5sd_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/mp5sd.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="mp7_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="mp7"/>
                                                                <label for="mp7_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/mp7.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="mp9_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="mp9"/>
                                                                <label for="mp9_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/mp9.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="p90_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="p90"/>
                                                                <label for="p90_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/p90.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="bizon_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="bizon"/>
                                                                <label for="bizon_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/bizon.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="ump45_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="ump45"/>
                                                                <label for="ump45_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/ump45.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="mag7_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="macg"/>
                                                                <label for="mag7_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/mag7.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="nova_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="nova"/>
                                                                <label for="nova_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/nova.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="sawedoff_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="sawedoff"/>
                                                                <label for="sawedoff_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/sawedoff.png'/>
                                                                </label>
                                                            </div>                                                            
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="xm1014_ct_primary_1" name="ct_primary_1" onChange={this.handleChange} value="xm1014"/>
                                                                <label for="xm1014_ct_primary_1">
                                                                    <img src='./assets/Icon/Weapons/xm1014.png'/>
                                                                </label>
                                                            </div>                                                            
                                                        </div>
                                                    </div>

                                                    <div class="modal-section">
                                                        <h1 class="modal-section-header2">🔫 Secondary Gun</h1>
                                                        <div class="weapon-img-con">
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="cz75auto_ct_secondary_1" name="ct_secondary_1" onChange={this.handleChange} value="cz75auto"/>
                                                                <label for="cz75auto_ct_secondary_1">
                                                                    <img src='./assets/Icon/Weapons/cz75auto.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="deagle_ct_secondary_1" name="ct_secondary_1" onChange={this.handleChange} value="deagle"/>
                                                                <label for="deagle_ct_secondary_1">
                                                                    <img src='./assets/Icon/Weapons/deagle.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="elite_ct_secondary_1" name="ct_secondary_1" onChange={this.handleChange} value="elite"/>
                                                                <label for="elite_ct_secondary_1">
                                                                    <img src='./assets/Icon/Weapons/elite.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="fiveseven_ct_secondary_1" name="ct_secondary_1" onChange={this.handleChange} value="fiveseven"/>
                                                                <label for="fiveseven_ct_secondary_1">
                                                                    <img src='./assets/Icon/Weapons/fiveseven.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="glock_ct_secondary_1" name="ct_secondary_1" onChange={this.handleChange} value="glock"/>
                                                                <label for="glock_ct_secondary_1">
                                                                    <img src='./assets/Icon/Weapons/glock.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="p2000_ct_secondary_1" name="ct_secondary_1" onChange={this.handleChange} value="p2000"/>
                                                                <label for="p2000_ct_secondary_1">
                                                                    <img src='./assets/Icon/Weapons/p2000.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="p250_ct_secondary_1" name="ct_secondary_1" onChange={this.handleChange} value="p250"/>
                                                                <label for="p250_ct_secondary_1">
                                                                    <img src='./assets/Icon/Weapons/p250.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="tec9_ct_secondary_1" name="ct_secondary_1" onChange={this.handleChange} value="tec9"/>
                                                                <label for="tec9_ct_secondary_1">
                                                                    <img src='./assets/Icon/Weapons/tec9.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="usps_ct_secondary_1" name="ct_secondary_1" onChange={this.handleChange} value="usps"/>
                                                                <label for="usps_ct_secondary_1">
                                                                    <img src='./assets/Icon/Weapons/usps.png'/>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="modal-section">
                                                        <h1 class="modal-section-header2">🎒 Equipment</h1>
                                                        <div class="weapon-img-con">
                                                            <div class="weapon-input-con">
                                                                <input type="checkbox" id="ct_defuse_kits_1" name="ct_defuse_kits_1" checked={this.state.ct_defuse_kits_1} onChange={this.handleChecked}/>
                                                                <label for="ct_defuse_kits_1">
                                                                    <img src='./assets/Icon/Weapons/defuse_kits.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="decoygrenade_ct_nade_1" name="ct_nade_1" onChange={this.handleChange} value="decoygrenade"/>
                                                                <label for="decoygrenade_ct_nade_1">
                                                                    <img src='./assets/Icon/Weapons/decoygrenade.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="flashbang_ct_nade_1" name="ct_nade_1" onChange={this.handleChange} value="flashbang"/>
                                                                <label for="flashbang_ct_nade_1">
                                                                    <img src='./assets/Icon/Weapons/flashbang.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="hegrenade_ct_nade_1" name="ct_nade_1" onChange={this.handleChange} value="hegrenade"/>
                                                                <label for="hegrenade_ct_nade_1">
                                                                    <img src='./assets/Icon/Weapons/hegrenade.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="incendiarygrenade_ct_nade_1" name="ct_nade_1" onChange={this.handleChange} value="incendiarygrenade"/>
                                                                <label for="incendiarygrenade_ct_nade_1">
                                                                    <img src='./assets/Icon/Weapons/incendiarygrenade.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="molotovgrenade_ct_nade_1" name="ct_nade_1" onChange={this.handleChange} value="molotovgrenade"/>
                                                                <label for="molotovgrenade_ct_nade_1">
                                                                    <img src='./assets/Icon/Weapons/molotovgrenade.png'/>
                                                                </label>
                                                            </div>
                                                            <div class="weapon-input-con">
                                                                <input type="radio" id="smokegrenade_ct_nade_1" name="ct_nade_1" onChange={this.handleChange} value="smokegrenade"/>
                                                                <label for="smokegrenade_ct_nade_1">
                                                                    <img src='./assets/Icon/Weapons/smokegrenade.png'/>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* A Player Element*/}

                        </div>

                        <div class="players-container">
                            <div className="action-container">
                                <div className="round-winner-box">
                                    <h1>🏆 Round Winner</h1>
                                    <div className='round-winner-img-box'>
                                        <img src={"./assets/Icon/"+this.state.round_winner+".png"} />
                                        <img src="https://media.tenor.com/-jKFU5c-fXgAAAAd/genshin-paimon.gif" className={this.state.round_winner? 'hidden':null} alt="csgo teammate"/>
                                    </div>
                                </div>
                                <button type="submit">🔮 Predict Round Winner</button>
                                <button type="">🤖 Recreate Model</button>
                            </div>
                        </div>

                        <div class="players-container t-side">
                            {(this.state.t_infomation).map((data, index) => (
                                <div class="player-card-container t-side">
                                    <span>{data.hp}</span>
                                    <div className='player-hp-box t-side' style={{ width: `${data.hp}%` }}></div>
                                    <div className='player-info-box t-side'>
                                        <div className="player-img-bg-t-side">
                                            <img className="player-img" src="./assets/Icon/t-patch-small-bw.png" alt="" />
                                        </div>
                                        <div className="player-tune">
                                            <div className="interior t-side">
                                                <a className={data.is_alive? null : 'disable'} href={"#open-modal-t" + data.id}><span class="material-symbols-outlined">tune</span></a>
                                                <div className='is_alive t'>
                                                    <input type="checkbox" name="is_alive" id={"is_alive_t"+data.id} onChange={this.updateAliveT(index)} checked={data.is_alive}/>
                                                    <label for={"is_alive_t"+data.id} ><span class="material-symbols-outlined"> skull </span></label>
                                                </div>
                                            </div>
                                            <div id={"open-modal-t" + data.id} className="modal-window">
                                                <div className="modal-wrapper">
                                                    <div className='modal-info-con'>
                                                        <div className="modal-section-header"><span className="material-symbols-outlined">manage_accounts </span><span>T Player {data.id}</span></div>
                                                        <a href="#" title="Close" className="modal-close">Close</a>
                                                    </div>

                                                    <div className="modal-section">
                                                        <h1 className="modal-section-header2">🩸 Health Point : <span>{data.hp}</span></h1>
                                                        <input type="range" className='t-side' name="hp" min="0" max="100" step="1" onChange={this.updateStateNumberT(index)} value={data.hp} />
                                                    </div>

                                                    <div className="modal-section">
                                                        <h1 className="modal-section-header2">🛡️ Armor : <span>{data.armor}</span></h1>
                                                        <input type="checkbox" className='t-side' name="helmet" id={"helmets_t" + data.id} checked={data.helmet} onChange={this.updateStateToggleT(index)} />
                                                        <label for={"helmets_t" + data.id} className="checkbox-label">Helmet</label>
                                                        <input type="range" name="armor" className='t-side' min="0" max="100" step="1" onChange={this.updateStateNumberT(index)} value={data.armor} />
                                                    </div>

                                                    <div className="modal-section">
                                                        <h1 className="modal-section-header2">💸 Money : <span>${data.money}</span></h1>
                                                        <input type="range" name="money" className='t-side' min="0" max="20000" step="1" onChange={this.updateStateNumberT(index)} value={data.money} />
                                                    </div>

                                                    <div className="modal-section">
                                                        <h1 className="modal-section-header2">🔫 Primary Gun</h1>
                                                        <div className="weapon-img-con">
                                                            <div className="weapon-input-con">
                                                                <input type="radio" id={"ak_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="ak47" />
                                                                <label for={"ak_t_primary_" + data.id}>
                                                                    <img src='./assets/Icon/Weapons/ak47.png' />
                                                                </label>
                                                            </div>
                                                            <div className="weapon-input-con">
                                                                    <input type="radio" id={"aug_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="aug" />
                                                                    <label for={"aug_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/aug.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"famas_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="famas" />
                                                                    <label for={"famas_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/famas.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"galilar_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="galilar" />
                                                                    <label for={"galilar_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/galilar.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"m4a1s_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="m4a1s" />
                                                                    <label for={"m4a1s_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/m4a1s.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"m4a4_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="m4a4" />
                                                                    <label for={"m4a4_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/m4a4.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"m249_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="m249" />
                                                                    <label for={"m249_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/m249.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"negev_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="negev" />
                                                                    <label for={"negev_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/negev.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"sg553_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="sg553" />
                                                                    <label for={"sg553_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/sg553.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"awp_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="awp" />
                                                                    <label for={"awp_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/awp.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"g3sg1_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="g3sg1" />
                                                                    <label for={"g3sg1_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/g3sg1.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"scar20_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="scar20" />
                                                                    <label for={"scar20_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/scar20.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"ssg08_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="ssg08" />
                                                                    <label for={"ssg08_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/ssg08.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"mac10_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="mac10" />
                                                                    <label for={"mac10_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/mac10.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"mp5sd_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="mp5sd" />
                                                                    <label for={"mp5sd_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/mp5sd.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"mp7_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="mp7" />
                                                                    <label for={"mp7_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/mp7.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"mp9_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="mp9" />
                                                                    <label for={"mp9_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/mp9.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"p90_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="p90" />
                                                                    <label for={"p90_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/p90.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"bizon_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="bizon" />
                                                                    <label for={"bizon_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/bizon.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"ump45_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="ump45" />
                                                                    <label for={"ump45_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/ump45.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"mag7_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="macg" />
                                                                    <label for={"mag7_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/mag7.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"nova_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="nova" />
                                                                    <label for={"nova_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/nova.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"sawedoff_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="sawedoff" />
                                                                    <label for={"sawedoff_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/sawedoff.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"xm1014_t_primary_" + data.id} name={"primary_gun_t" + data.id} onChange={this.updateStateT(index)} value="xm1014" />
                                                                    <label for={"xm1014_t_primary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/xm1014.png' />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="modal-section">
                                                            <h1 className="modal-section-header2">🔫 Secondary Gun</h1>
                                                            <div className="weapon-img-con">
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"cz75auto_t_secondary_" + data.id} name={"secondary_gun_t" + data.id} onChange={this.updateStateT(index)} value="cz75auto" />
                                                                    <label for={"cz75auto_t_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/cz75auto.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"deagle_t_secondary_" + data.id} name={"secondary_gun_t" + data.id} onChange={this.updateStateT(index)} value="deagle" />
                                                                    <label for={"deagle_t_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/deagle.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"elite_t_secondary_" + data.id} name={"secondary_gun_t" + data.id} onChange={this.updateStateT(index)} value="elite" />
                                                                    <label for={"elite_t_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/elite.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"fiveseven_t_secondary_" + data.id} name={"secondary_gun_t" + data.id} onChange={this.updateStateT(index)} value="fiveseven" />
                                                                    <label for={"fiveseven_t_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/fiveseven.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"glock_t_secondary_" + data.id} name={"secondary_gun_t" + data.id} onChange={this.updateStateT(index)} value="glock" />
                                                                    <label for={"glock_t_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/glock.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"p2000_t_secondary_" + data.id} name={"secondary_gun_t" + data.id} onChange={this.updateStateT(index)} value="p2000" />
                                                                    <label for={"p2000_t_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/p2000.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"p250_t_secondary_" + data.id} name={"secondary_gun_t" + data.id} onChange={this.updateStateT(index)} value="p250" />
                                                                    <label for={"p250_t_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/p250.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"tec9_t_secondary_" + data.id} name={"secondary_gun_t" + data.id} onChange={this.updateStateT(index)} value="tec9" />
                                                                    <label for={"tec9_t_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/tec9.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"usps_t_secondary_" + data.id} name={"secondary_gun_t" + data.id} onChange={this.updateStateT(index)} value="usps" />
                                                                    <label for={"usps_t_secondary_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/usps.png' />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="modal-section">
                                                            <h1 className="modal-section-header2">🎒 Equipment</h1>
                                                            <div className="weapon-img-con">
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"decoygrenade_t_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateStateT(index)} value="decoygrenade" />
                                                                    <label for={"decoygrenade_t_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/decoygrenade.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"flashbang_t_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateStateT(index)} value="flashbang" />
                                                                    <label for={"flashbang_t_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/flashbang.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"hegrenade_t_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateStateT(index)} value="hegrenade" />
                                                                    <label for={"hegrenade_t_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/hegrenade.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con hidden">
                                                                    <input type="radio" id={"incendiarygrenade_t_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateStateT(index)} value="incendiarygrenade" />
                                                                    <label for={"incendiarygrenade_t_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/incendiarygrenade.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"molotovgrenade_t_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateStateT(index)} value="molotovgrenade" />
                                                                    <label for={"molotovgrenade_t_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/molotovgrenade.png' />
                                                                    </label>
                                                                </div>
                                                                <div className="weapon-input-con">
                                                                    <input type="radio" id={"smokegrenade_t_nade_" + data.id} name={"nade_" + data.id} onChange={this.updateStateT(index)} value="smokegrenade" />
                                                                    <label for={"smokegrenade_t_nade_" + data.id}>
                                                                        <img src='./assets/Icon/Weapons/smokegrenade.png' />
                                                                    </label>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </form>
            </div>
        )
    }
}

export default Products;