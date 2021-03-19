import requests, sys, random, json
from bs4 import BeautifulSoup

headers = {
	'User-Agent':'MMozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15',
	'Connection':'keep-alive'
}

loginData = {
	'login' : 'GutiLibo',
	'url' : '',
	'password' : 'GutiLibo123',
	'password_confirm' : '',
	'additional_security' : '',
	'remember' : '1',
	'_xfRedirect' : 'https://f95zone.to/',
	'website_code' : '',
}

tags = ''

def login():

	session = requests.Session()

	loginPage = session.get('https://f95zone.to/login/', headers=headers)
	soupLoginPage = BeautifulSoup(loginPage.content, 'html.parser')
	inputToken = soupLoginPage.findAll('input', {'name':'_xfToken'})
	inputToken = inputToken[0]['value'] #_xfToken 

	loginData['_xfToken'] = inputToken
	response = session.post('https://f95zone.to/login/login', headers=headers, data=loginData)

	return (session.cookies.get_dict())

#Sys argvs
if(len(sys.argv)>1):
	token = json.loads(sys.argv[1])
	tags = sys.argv[2]

#F95 Base Url
url = "https://f95zone.to/search/108120845/?q=*&t=post&c[child_nodes]=1&c[nodes][0]=1&c[tags]="+tags+"&o=relevance"

page = requests.get(url, cookies=token)

#Soup
soup = BeautifulSoup(page.content, 'html.parser')

loginNo = soup.find('title')
pageTitle = loginNo.text.lower()

#Response final print
returnMessage = {}

if "log in" in pageTitle:
	token = login()
	returnMessage['token'] = json.dumps(token)
	page = requests.get(url, cookies=token)
	soup = BeautifulSoup(page.content, 'html.parser')

finalPage = soup.findAll('li', class_='pageNav-page')

if(finalPage != None):
	finalPage = finalPage[-1]
	finalPage = finalPage.find('a').text

	randPage = random.randint(1, int(finalPage))
	
	secondUrl = url.replace('?q=*', '?page='+str(randPage)+'&q=*')
	secondRequest = requests.get(secondUrl, cookies=token)
	secondSoup = BeautifulSoup(secondRequest.content, 'html.parser')

	pageContent = secondSoup.find('div', class_="p-body-pageContent")
	blockBody = pageContent.find('ol', class_="block-body")
	games = blockBody.findAll('li', class_="block-row")

	randGameNumber = random.randint(1, len(games))

	game = games[randGameNumber-1]
	gameTitle  =game.find('h3', 'contentRow-title')
	if(gameTitle != None):
		gameUrl = gameTitle.find('a')
		gameUrl = 'https://f95zone.to'+gameUrl['href']

	returnMessage['url'] = str(gameUrl)
	print(json.dumps(returnMessage))
