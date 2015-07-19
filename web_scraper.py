import urllib, sys
from bs4 import BeautifulSoup


def findMatchingUrl(links, ingredient):
    for link in links:
        newLink = link.get('href')
        if(newLink.startswith("http://www.mayoclinic.org/drugs-supplements/%s/evidence" % ingredient)):
            return newLink


def getConditions(titles):
    newTitles = {}
    for title in titles:
        newTd = title.get('data-title')
        if(newTd.startswith("Condition to which grade level applies")):
            newTitles[title.h3.string] = title.contents[1]
    return newTitles

if __name__ == '__main__':
    ingredient = sys.argv[1].lower()
    html = urllib.urlopen('http://www.mayoclinic.org/search/search-results?q=%s' % ingredient).read()
    soup = BeautifulSoup(html)
    # print(soup.prettify())

    evidenceUrl = findMatchingUrl(soup.find_all('a'), ingredient)

    evidenceHtml = urllib.urlopen(evidenceUrl).read()
    evidenceSoup = BeautifulSoup(evidenceHtml)

    titles = getConditions(evidenceSoup.find_all('td'))
    print(titles)
