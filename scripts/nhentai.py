import requests, random, sys
from bs4 import BeautifulSoup

siteUrl = 'https://nhentai.net'
randomDoujin = '/random/'

args = sys.argv[1]

def randDoujin():
	req = requests.get(siteUrl+randomDoujin)
	print(req.url)

def newsDoujin():
	sitePage = requests.get(siteUrl)
	siteSoup = BeautifulSoup(sitePage.content, 'html.parser')
	siteSearch = siteSoup.findAll('div', class_='index-container')

	for tag in siteSearch:
		if not tag.find(class_='index-popuplar'):
			siteSearch = tag

	searchDoujin = siteSearch.findAll('div', class_='gallery')

	randomNumber = random.randint(1, len(searchDoujin))
	sortDoujin = searchDoujin[randomNumber-1]

	sortedDoujin = sortDoujin.find('a', class_='cover')
	doujinId= sortedDoujin['href']

	print(siteUrl+doujinId)

if args == 'random': 
	randDoujin()
else:
	newsDoujin()