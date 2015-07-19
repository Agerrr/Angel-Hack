import urllib, sys
from bs4 import BeautifulSoup

class WebScraper(object):

    def findMatchingUrl(self, links, ingredient):
        for link in links:
            newLink = link.get('href')
            if(newLink.startswith("http://www.mayoclinic.org/drugs-supplements") and ("evidence" in newLink)):
                return newLink


    def getConditions(self, titles):
        newTitles = {}
        for title in titles:
            newTd = title.get('data-title')
            if(newTd.startswith("Condition to which grade level applies")):
                newTitles[title.h3.string] = title.contents[1]
        return newTitles


    def scrapDataAboutIngredient(self, ing):
        ingredient = ing.lower()
        html = urllib.urlopen('http://www.mayoclinic.org/search/search-results?q=%s' % ingredient).read()
        soup = BeautifulSoup(html)
        # print(soup.prettify())

        evidenceUrl = self.findMatchingUrl(soup.find_all('a'), ingredient)
        if (evidenceUrl):
            evidenceHtml = urllib.urlopen(evidenceUrl).read()
            evidenceSoup = BeautifulSoup(evidenceHtml)

            return self.getConditions(evidenceSoup.find_all('td'))
        else:
            return None


    # data_dict = {'condition1': 'description1', 'condition2': 'description2'}
    def get_data_in_cluster_format(self, ingredient):
        cluster_format = {}
        data_dict = self.scrapDataAboutIngredient(ingredient)
        # data_dict = {u'Skin conditions': u'Niacinamide has been used in skin care products', u'cond': u'value'} 
        if data_dict is not None:
            cluster_format[ingredient] = {'conditions': []}
            for key, value in data_dict.iteritems():
                cond_descr = {'condition': key, 'description': value}
                cluster_format[ingredient]['conditions'].append(cond_descr)
        return cluster_format


if __name__ == '__main__':

    ingredient = sys.argv[1].lower()
    html = urllib.urlopen('http://www.mayoclinic.org/search/search-results?q=%s' % ingredient).read()
    soup = BeautifulSoup(html)
    # print(soup.prettify())

    evidenceUrl = findMatchingUrl(soup.find_all('a'), ingredient)
    if (evidenceUrl):
        evidenceHtml = urllib.urlopen(evidenceUrl).read()
        evidenceSoup = BeautifulSoup(evidenceHtml)

        conditions = getConditions(evidenceSoup.find_all('td'))
    else:
        print "Didn't find evidence for ingredient: %s" % ingredient
