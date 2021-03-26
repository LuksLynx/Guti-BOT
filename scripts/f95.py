import requests, sys, random, json, os
from bs4 import BeautifulSoup
from selenium import webdriver
from dotenv import load_dotenv

headers = {
	'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Safari/605.1.15',
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
#Response final print
returnMessage = {}
currentDir = os.getcwd()

def login():

	global returnMessage

	session = requests.Session()

	loginPage = session.get('https://f95zone.to/login/', headers=headers)
	soupLoginPage = BeautifulSoup(loginPage.content, 'html.parser')
	inputToken = soupLoginPage.findAll('input', {'name':'_xfToken'})
	inputToken = inputToken[0]['value'] #_xfToken 

	loginData['_xfToken'] = inputToken
	response = session.post('https://f95zone.to/login/login', headers=headers, data=loginData)

	tk = session.cookies.get_dict()

	returnMessage['token'] = json.dumps(tk)

	return (tk)

#Sys argvs
token = json.loads(sys.argv[1])
tags = sys.argv[2]

def withTags():
	
	global token

	#F95 Base Url
	url = "https://f95zone.to/search/108120845/?q=*&t=post&c[child_nodes]=1&c[nodes][0]=1&c[tags]="+str(tags)+"&o=relevance"

	if len(token):
		token = login()

	page = requests.get(url, cookies=token)

	#Soup
	soup = BeautifulSoup(page.content, 'html.parser')

	loginNo = soup.find('title')
	pageTitle = loginNo.text.lower()

	if "log in" in pageTitle:
		token = login()
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

def withoutTags():

	global token

	siteLink = 'https://f95zone.to/latest/'

	# Opções do firefox para colocar no headless mode
	options = webdriver.FirefoxOptions()
	options.headless = True

	# Roda o firefox em modo headless
	geckoDir = str(currentDir)+'/scripts/' + os.getenv("GECKODRIVER")
	browser = webdriver.Firefox(options=options, executable_path=geckoDir)

	# Entra na página
	browser.get(siteLink)

	def addCookies():

		global token

		if len(token):
			# Adiciona os cookies na página
			for idx, name in enumerate(token):
				browser.add_cookie({ 'name': name, 'value': token[name] })
		else:
			token = login()
			addCookies()

	addCookies()

	# Recarrega as páginas para os cookies funcionarem
	browser.refresh()

	html = browser.page_source

	# Fecha o navegador
	browser.close()

	siteSoup = BeautifulSoup(html, 'html.parser')

	latestReleases = siteSoup.findAll('a', class_='resource-tile_link')

	game = random.choice(latestReleases)

	gameUrl = game['href']
	
	returnMessage['url'] = str(gameUrl)
	
	print(json.dumps(returnMessage))

if __name__ == "__main__":
	if not tags:
		withoutTags()
	else:
		withTags()