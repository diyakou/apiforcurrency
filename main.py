from fastapi import FastAPI
from typing import List
import requests
from bs4 import BeautifulSoup
from pydantic import BaseModel

app = FastAPI()

class Currency(BaseModel):
    title: str
    live_price: str
    change: str
    lowest: str
    highest: str
    time: str
    flag_url: str  
@app.get("/currencies/", response_model=List[Currency])
async def get_currencies():
    url = 'https://www.tgju.org/currency'
    response = requests.get(url)
    response.raise_for_status() # اگر با خطا روبرو شویم، Exception صادر می‌کند.
    soup = BeautifulSoup(response.text, 'html.parser')
    currency_rows = soup.find_all('tr', attrs={'data-market-row': True})
    currencies = []
    for row in currency_rows:
        flag_class = row.find('th').find('span', class_='mini-flag')['class'][1] if row.find('th').find('span', class_='mini-flag') else ''
        country_code = flag_class.replace('flag-', '')  # 'flag-us' -> 'us'
        flag_url = f"https://www.tgju.org/images/flags/1x1/{country_code}.svg"  

        currency_data = {
            'title': row.find('th').get_text(strip=True),
            'live_price': row.find_all('td', class_='nf')[0].get_text(strip=True),
            'change': row.find_all('td', class_='nf')[1].get_text(strip=True),
            'lowest': row.find_all('td')[2].get_text(strip=True),
            'highest': row.find_all('td')[3].get_text(strip=True),
            'time': row.find_all('td')[4].get_text(strip=True),
            'flag_url': flag_url
        }
        currencies.append(currency_data)
    return currencies