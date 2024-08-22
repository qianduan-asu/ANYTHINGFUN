import requests

url = 'http://localhost:3000/coordinates'
data = {
  "latitude": 41.2128,
  "longitude": -75.1060,
  "description": "牛牛"
}
# response = requests.post(url, json=data)
response = requests.get(url)
# url =f'http://localhost:3000/coordinates/66c5cfd8155da435dbe0d5c7'
# response = requests.delete(url)
print(response.status_code)
print(response.json())
