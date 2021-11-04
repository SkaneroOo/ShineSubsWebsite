from pymongo import MongoClient
import requests
import random
import os
from fastapi import FastAPI, Request
from fastapi.responses import PlainTextResponse, Response, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.security import HTTPBasic
from Models import *
from Data import *
from typing import Dict, Any


#API_ENDPOINT = 'https://discord.com/api'
#CLIENT_ID = '860982072244043839'
#CLIENT_SECRET = os.environ['DISCORD_SECRET']
#REDIRECT_URI = 'https://shinesubswebsite.herokuapp.com/auth'


Mongo = MongoClient(os.environ['MONGO_TOKEN'])

Anime = Mongo.ShineSubs.Anime
Podcasts = Mongo.ShineSubs.Podcasts
Episodes = Mongo.ShineSubs.Episodes
Info = Mongo.ShineSubs.Info

security = HTTPBasic()
app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/images", StaticFiles(directory="static/images"), name="images")

templates = Jinja2Templates(directory="./templates")

def random_string(min_len, max_len):
    return "".join([random.choice("1234567890qwertyuiopasdfghjklzxcvbnm-") for i in range(random.randint(min_len, max_len))])

#####       webhooks



#####       website

@app.get("/robots.txt", response_class=PlainTextResponse)
def robots():
    return ROBOTS

@app.get("/sitemap.xml", response_class=PlainTextResponse)
def robots():
    return SITEMAP

@app.get("/player_test")
async def main(request: Request):
    return templates.TemplateResponse("test.html", {"request": request})

@app.get("/")
async def main(request: Request):
    print(request.cookies)
    item = [a for a in Episodes.find()][::-1]
    serie = [a for a in Anime.find()]
    serie2 = [a for a in Podcasts.find()]
    series={}
    for i in serie:
        series[i["series_id"]] = i
    for i in serie2:
        series[i["series_id"]] = i
    info = [a for a in Info.find()]
    return templates.TemplateResponse("main.html", {"request": request, "episodes": item[:12], "series": series, "info": info})

@app.post("/auth")
async def pauth(request: Request):
    
    return

@app.get("/auth")
async def auth(response: Response, code: str):
    data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    r = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers)
    r.raise_for_status()
    js = r.json()
    print(js)
    response.set_cookie(key="user", value="dsa")
    return RedirectResponse("https://a043534675c5.ngrok.io/")

@app.get("/nudesy")         # XD
async def anime(request: Request):
    return templates.TemplateResponse("nudesy.html", {"request": request})

@app.get("/anime")
async def anime(request: Request):
    serie = list(Anime.find().sort("title"))
    return templates.TemplateResponse("serie.html", {"request": request, "serie": serie})

@app.get("/podcasty")
async def podcasty(request: Request):
    serie = list(Podcasts.find().sort("title"))
    return templates.TemplateResponse("serie.html", {"request": request, "serie": serie})

@app.get("/series/{sid}")
async def odcinki(request: Request, sid: int):
    seria = Anime.find_one({"series_id": sid})
    if seria == None:
        seria = Podcasts.find_one({"series_id": sid})
    odcinki = list(Episodes.find({"series_id": sid}))
    return templates.TemplateResponse("series.html", {"request": request, "seria": seria, "odcinki": odcinki})

@app.get("/series/{sid}/episode/{ep}")
async def odcinki(request: Request, sid: int, ep: int):
    seria = Anime.find_one({"series_id": sid})
    odcinki = Episodes.find_one({"series_id": sid, "episode": ep})
    p = True if Episodes.find_one({"series_id": sid, "episode": ep-1}) != None else False
    n = True if Episodes.find_one({"series_id": sid, "episode": ep+1}) != None else False
    return templates.TemplateResponse("watch.html", {"request": request, "odcinek": odcinki, "seria": seria, "pn": [p, n]})


#####       errors

@app.get("/{full_path:path}")
async def maintanence(request: Request, full_path: str):
    return templates.TemplateResponse("maintanence.html", {"request": request})
