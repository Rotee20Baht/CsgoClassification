from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from database import mycursor, mydb
import pandas as pd

from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import make_column_transformer
from seaborn import load_dataset
import numpy as np
from sklearn.model_selection import train_test_split
import xgboost as xgb
import pickle

from pydantic import BaseModel

router = APIRouter()


transformer = make_column_transformer(
    (OneHotEncoder(), ['map', 'bomb_planted']),
    remainder='passthrough')

@router.get("/create_model")
def create_model():
    csgo_df = pd.read_sql("SELECT * FROM csgo", con = mydb)
    csgo_df.astype({'map': 'category',
                    'bomb_planted': 'category',
                    'round_winner': 'category'}).dtypes
    print(csgo_df.columns)
    
    transformed = transformer.fit_transform(csgo_df)

    ohe = pd.DataFrame(
        transformed, 
        columns=transformer.get_feature_names()
    )

    ohe.head(10).to_csv('csgo_ohe_deploy.csv')
    print(ohe.head(10))
    
    X = ohe.drop(columns = ['round_id', 'round_winner'])
    y = ohe['round_winner']

    X = np.array(X)
    y = np.array(y)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state=42)
    
    print("------------------TRAINING----------------------")
    print("------------------TRAINING----------------------")
    print("------------------TRAINING----------------------")
    print("------------------TRAINING----------------------")
    model = xgb.XGBClassifier(objective ='reg:squarederror', learning_rate = 0.1, max_depth = 30, n_estimators = 100)
    model.fit(X_train, y_train)
    print("------------------SUCCESS----------------------")
    print("------------------SUCCESS----------------------")
    print("------------------SUCCESS----------------------")
    print("------------------SUCCESS----------------------")

    y_predict = model.predict(X_test)

    with open('model_csgo', 'wb') as files:
        pickle.dump(model, files)

    deploy_df = pd.read_csv("csgo_ohe_deploy.csv")
    deploy_df = deploy_df.drop(columns = ['Unnamed: 0','round_id','round_winner'])

    deploy_X = np.array(deploy_df)
    deploy_Y = model.predict(deploy_X)

    print(deploy_Y.reshape(-1,1))

    return {"message": True, "data": deploy_Y.tolist()}


class Item(BaseModel):    
    time_left: float
    ct_score: int
    t_score: int
    map: str
    bomb_planted: str
    ct_health: int
    t_health: int
    ct_armor: int
    t_armor: int
    ct_money: int
    t_money: int
    ct_helmets: int
    t_helmets: int
    ct_defuse_kits: int
    ct_players_alive: int
    t_players_alive: int
    ct_weapon_ak47: int
    t_weapon_ak47: int
    ct_weapon_aug: int
    t_weapon_aug: int
    ct_weapon_awp: int
    t_weapon_awp: int
    ct_weapon_bizon: int
    t_weapon_bizon: int
    ct_weapon_cz75auto: int
    t_weapon_cz75auto: int
    ct_weapon_elite: int
    t_weapon_elite: int
    ct_weapon_famas: int
    t_weapon_famas: int
    ct_weapon_g3sg1: int
    t_weapon_g3sg1: int
    ct_weapon_galilar: int
    t_weapon_galilar: int
    ct_weapon_glock: int
    t_weapon_glock: int
    ct_weapon_m249: int
    t_weapon_m249: int
    ct_weapon_m4a1s: int
    t_weapon_m4a1s: int
    ct_weapon_m4a4: int
    t_weapon_m4a4: int
    ct_weapon_mac10: int
    t_weapon_mac10: int
    ct_weapon_mag7: int
    t_weapon_mag7: int
    ct_weapon_mp5sd: int
    t_weapon_mp5sd: int
    ct_weapon_mp7: int
    t_weapon_mp7: int
    ct_weapon_mp9: int
    t_weapon_mp9: int
    ct_weapon_negev: int
    t_weapon_negev: int
    ct_weapon_nova: int
    t_weapon_nova: int
    ct_weapon_p90: int
    t_weapon_p90: int
    ct_weapon_r8revolver: int
    t_weapon_r8revolver: int
    ct_weapon_sawedoff: int
    t_weapon_sawedoff: int
    ct_weapon_scar20: int
    t_weapon_scar20: int
    ct_weapon_sg553: int
    t_weapon_sg553: int
    ct_weapon_ssg08: int
    t_weapon_ssg08: int
    ct_weapon_ump45: int
    t_weapon_ump45: int
    ct_weapon_xm1014: int
    t_weapon_xm1014: int
    ct_weapon_deagle: int
    t_weapon_deagle: int
    ct_weapon_fiveseven: int
    t_weapon_fiveseven: int
    ct_weapon_usps: int
    t_weapon_usps: int
    ct_weapon_p250: int
    t_weapon_p250: int
    ct_weapon_p2000: int
    t_weapon_p2000: int
    ct_weapon_tec9: int
    t_weapon_tec9: int
    ct_grenade_hegrenade: int
    t_grenade_hegrenade: int
    ct_grenade_flashbang: int
    t_grenade_flashbang: int
    ct_grenade_smokegrenade: int
    t_grenade_smokegrenade: int
    ct_grenade_incendiarygrenade: int
    t_grenade_incendiarygrenade: int
    ct_grenade_molotovgrenade: int
    t_grenade_molotovgrenade: int
    ct_grenade_decoygrenade: int
    t_grenade_decoygrenade: int
     
@router.post("/predict")
async def predict(item: Item):
    # insurance_df = pd.read_sql("SELECT * FROM parishousing limit 10", con = mydb)
    # df = await df_in.json()
    test_df = pd.DataFrame(data = {
        "time_left": [item.time_left],
        "ct_score": [item.ct_score],
        "t_score": [item.t_score],
        "map": [item.map],
        "bomb_planted": [item.bomb_planted],
        "ct_health": [item.ct_health],
        "t_health": [item.t_health],
        "ct_armor": [item.ct_armor],
        "t_armor": [item.t_armor],
        "ct_money": [item.ct_money],
        "t_money": [item.t_money],
        "ct_helmets": [item.ct_helmets],
        "t_helmets": [item.t_helmets],
        "ct_defuse_kits": [item.ct_defuse_kits],
        "ct_players_alive": [item.ct_players_alive],
        "t_players_alive": [item.t_players_alive],
        "ct_weapon_ak47": [item.ct_weapon_ak47],
        "t_weapon_ak47": [item.t_weapon_ak47],
        "ct_weapon_aug": [item.ct_weapon_aug],
        "t_weapon_aug": [item.t_weapon_aug],
        "ct_weapon_awp": [item.ct_weapon_awp],
        "t_weapon_awp": [item.t_weapon_awp],
        "ct_weapon_bizon": [item.ct_weapon_bizon],
        "t_weapon_bizon": [item.t_weapon_bizon],
        "ct_weapon_cz75auto": [item.ct_weapon_cz75auto],
        "t_weapon_cz75auto": [item.t_weapon_cz75auto],
        "ct_weapon_elite": [item.ct_weapon_elite],
        "t_weapon_elite": [item.t_weapon_elite],
        "ct_weapon_famas": [item.ct_weapon_famas],
        "t_weapon_famas": [item.t_weapon_famas],
        "ct_weapon_g3sg1": [item.ct_weapon_g3sg1],
        "t_weapon_g3sg1": [item.t_weapon_g3sg1],
        "ct_weapon_galilar": [item.ct_weapon_galilar],
        "t_weapon_galilar": [item.t_weapon_galilar],
        "ct_weapon_glock": [item.ct_weapon_glock],
        "t_weapon_glock": [item.t_weapon_glock],
        "ct_weapon_m249": [item.ct_weapon_m249],
        "t_weapon_m249": [item.t_weapon_m249],
        "ct_weapon_m4a1s": [item.ct_weapon_m4a1s],
        "t_weapon_m4a1s": [item.t_weapon_m4a1s],
        "ct_weapon_m4a4": [item.ct_weapon_m4a4],
        "t_weapon_m4a4": [item.t_weapon_m4a4],
        "ct_weapon_mac10": [item.ct_weapon_mac10],
        "t_weapon_mac10": [item.t_weapon_mac10],
        "ct_weapon_mag7": [item.ct_weapon_mag7],
        "t_weapon_mag7": [item.t_weapon_mag7],
        "ct_weapon_mp5sd": [item.ct_weapon_mp5sd],
        "t_weapon_mp5sd": [item.t_weapon_mp5sd],
        "ct_weapon_mp7": [item.ct_weapon_mp7],
        "t_weapon_mp7": [item.t_weapon_mp7],
        "ct_weapon_mp9": [item.ct_weapon_mp9],
        "t_weapon_mp9": [item.t_weapon_mp9],
        "ct_weapon_negev": [item.ct_weapon_negev],
        "t_weapon_negev": [item.t_weapon_negev],
        "ct_weapon_nova": [item.ct_weapon_nova],
        "t_weapon_nova": [item.t_weapon_nova],
        "ct_weapon_p90": [item.ct_weapon_p90],
        "t_weapon_p90": [item.t_weapon_p90],
        "ct_weapon_r8revolver": [item.ct_weapon_r8revolver],
        "t_weapon_r8revolver": [item.t_weapon_r8revolver],
        "ct_weapon_sawedoff": [item.ct_weapon_sawedoff],
        "t_weapon_sawedoff": [item.t_weapon_sawedoff],
        "ct_weapon_scar20": [item.ct_weapon_scar20],
        "t_weapon_scar20": [item.t_weapon_scar20],
        "ct_weapon_sg553": [item.ct_weapon_sg553],
        "t_weapon_sg553": [item.t_weapon_sg553],
        "ct_weapon_ssg08": [item.ct_weapon_ssg08],
        "t_weapon_ssg08": [item.t_weapon_ssg08],
        "ct_weapon_ump45": [item.ct_weapon_ump45],
        "t_weapon_ump45": [item.t_weapon_ump45],
        "ct_weapon_xm1014": [item.ct_weapon_xm1014],
        "t_weapon_xm1014": [item.t_weapon_xm1014],
        "ct_weapon_deagle": [item.ct_weapon_deagle],
        "t_weapon_deagle": [item.t_weapon_deagle],
        "ct_weapon_fiveseven": [item.ct_weapon_fiveseven],
        "t_weapon_fiveseven": [item.t_weapon_fiveseven],
        "ct_weapon_usps": [item.ct_weapon_usps],
        "t_weapon_usps": [item.t_weapon_usps],
        "ct_weapon_p250": [item.ct_weapon_p250],
        "t_weapon_p250": [item.t_weapon_p250],
        "ct_weapon_p2000": [item.ct_weapon_p2000],
        "t_weapon_p2000": [item.t_weapon_p2000],
        "ct_weapon_tec9": [item.ct_weapon_tec9],
        "t_weapon_tec9": [item.t_weapon_tec9],
        "ct_grenade_hegrenade": [item.ct_grenade_hegrenade],
        "t_grenade_hegrenade": [item.t_grenade_hegrenade],
        "ct_grenade_flashbang": [item.ct_grenade_flashbang],
        "t_grenade_flashbang": [item.t_grenade_flashbang],
        "ct_grenade_smokegrenade": [item.ct_grenade_smokegrenade],
        "t_grenade_smokegrenade": [item.t_grenade_smokegrenade],
        "ct_grenade_incendiarygrenade": [item.ct_grenade_incendiarygrenade],
        "t_grenade_incendiarygrenade": [item.t_grenade_incendiarygrenade],
        "ct_grenade_molotovgrenade": [item.ct_grenade_molotovgrenade],
        "t_grenade_molotovgrenade": [item.t_grenade_molotovgrenade],
        "ct_grenade_decoygrenade": [item.ct_grenade_decoygrenade],
        "t_grenade_decoygrenade": [item.t_grenade_decoygrenade]
    })
    
    deploy_df = pd.read_csv("csgo_ohe_deploy.csv")
    print(deploy_df)
    deploy_df.to_csv("deploy_df_before.csv")
    
    transformed = transformer.fit_transform(test_df)
    transformed_df = pd.DataFrame(
        transformed, 
        columns=transformer.get_feature_names()
    )
    
    deploy_df = deploy_df.append(transformed_df)
    print(deploy_df)
    deploy_df.to_csv("deploy_df_after.csv")
    deploy_df = deploy_df.drop(columns = ['Unnamed: 0','round_id','round_winner'])


    deploy_X = np.array(deploy_df)
    
    with open('model_csgo' , 'rb') as f:
        lr = pickle.load(f)
    deploy_Y = lr.predict(deploy_X)

    print(deploy_Y.reshape(-1,1))

    data_list = deploy_Y.tolist()

    return {"message": True, "round_winner": data_list[-1]}