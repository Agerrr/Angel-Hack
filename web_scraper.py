import urllib
from bs4 import BeautifulSoup
import re


def findMatchingUrl(links):
    for link in links:
        newLink = link.get('href')
        if(newLink.startswith("http://www.mayoclinic.org/drugs-supplements/thiamine/evidence")):
            return newLink


def getConditions(titles):
    newTitles = []
    for title in titles:
        newTd = title.get('data-title')
        if(newTd.startswith("Condition to which grade level applies")):
            newTitles.append(title.h3.string)
    return newTitles

if __name__ == '__main__':
    html = urllib.urlopen('http://www.mayoclinic.org/search/search-results?q=Thiamine').read()
    soup = BeautifulSoup(html)
    # print(soup.prettify())

    evidenceUrl = findMatchingUrl(soup.find_all('a'))

    evidenceHtml = urllib.urlopen(evidenceUrl).read()
    evidenceSoup = BeautifulSoup(evidenceHtml)
    print(evidenceSoup.prettify())

    titles = getConditions(evidenceSoup.find_all('td'))
    print(titles)
