import requests, random, sys
from bs4 import BeautifulSoup

siteUrl = 'https://nhentai.net'
randomDoujin = '/random/'

badWords = ['cp', 'child', 'loli', 'lolicon', 'lolita', 'shotacon', 'shota', 'kid', 'kiddo', 'kids', 'lolis', 'kiddy', 'children', 'baby', 'babies', 'jb', 'jailbait', 'lollipop', 'cub', 'toddlercon', 'toddler']

args = sys.argv[1]

def badWord(doujinUrl):

	badWordState = False

	request = requests.get(doujinUrl)
	badSoup = BeautifulSoup(request.content, 'html.parser')
	
	badSearch = badSoup.find('section', {'id':'tags'})
	badTags = badSearch.findAll('div', class_='tag-container')

	for bad in badTags:
		divText = bad.text.strip()

		if(divText.startswith('Tags')):

			tagsSpan = bad.find('span', class_='tags')
			tags = tagsSpan.findAll('span', class_='name')

			for tag in tags:
				if tag.text in badWords:
					badWordState = True

	return badWordState

def randDoujin():

	req = requests.get(siteUrl+randomDoujin)

	if badWord(req.url) == True:
		randDoujin()
	else:
		print(req.url)

def newsDoujin():
		
	sitePage = requests.get(siteUrl)
	siteSoup = BeautifulSoup(sitePage.content, 'html.parser')
	siteSearch = siteSoup.findAll('div', class_='index-container')

	for tag in siteSearch:
		if not tag.find(class_='index-popuplar'):
			siteSearch = tag

	searchDoujin = siteSearch.findAll('div', class_='gallery')

	def getRandDoujin(searchDoujin):
		randomNumber = random.randint(1, len(searchDoujin))
		sortDoujin = searchDoujin[randomNumber-1]

		sortedDoujin = sortDoujin.find('a', class_='cover')
		doujinId= sortedDoujin['href']
		
		doujinUrl = siteUrl+doujinId
		return doujinUrl

	doujinUrl = getRandDoujin(searchDoujin)

	if badWord(doujinUrl) == True:
		getRandDoujin(searchDoujin)
	else:
		print(doujinUrl)

if args == 'random': 
	randDoujin()
else:
	newsDoujin()