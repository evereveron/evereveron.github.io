import urllib
import requests
import os.path
import json
import argparse

def parse_json(output, url, count):
	r = requests.get(url)
	articlesJson = r.json()
	for article in articlesJson["results"]:
		if count >= 300:
			break
		title = article["title"]
		url = article["url"]
		abstract = article["abstract"]
		author = article["byline"]
		urlSJ = None
		urlLarge = None
		copyright = None
		section = article["section"]

		media = article["media"]
		if len(media) > 0:
			media2 = media[0]
			copyright = media2["copyright"]
			for size in media2["media-metadata"]:
				test = size["format"]
				if test == "superJumbo":
					urlSJ = size["url"]
				elif test == "Large":
					urlLarge = size["url"]
		
		if (verifyPhoto(title, url, abstract, author, copyright, urlSJ, urlLarge, section)):
			count = count + 1
			addToFile(output, title, url, abstract, author, copyright, urlSJ, urlLarge, section)

	return count


def verifyPhoto(title, url, abstract, author, copyright, sj, large, section):
	#comment out the line below to get the faces back for opinion section
	if((sj is not None) and (("Krugman" in sj) or ("Douthat" in sj) or ("Kristof" in sj) or ("contributor" in sj) or ("Cohen" in sj) or ("Blow_New" in sj) or ("bittman" in sj) or ("Brooks_New" in sj) or ("Jarbawi" in sj) or ("barbara_new" in sj))): return False
	return (title is not None) and (url is not None) and (abstract is not None) and (author is not None) and (copyright is not None) and (sj is not None) and (large is not None) and (section is not None)

def addToFile(output, title, article, abstract, author, copy, img, imgLG, section):
	out = title+"\t"+article+"\t"+abstract+"\t"+author+"\t"+copy+"\t"+img+"\t"+imgLG+"\t"+section
	out2 = out.encode('ascii', 'ignore')
	output.write(out2 + "\n")


def toJson(filename, outname):
	source = open(filename, "r")
	data = []
	for line in source:
		keys = line.split("\t")
		data.append({"title" : keys[0], "article" : keys[1],
			"abstract" : keys[2], "author" : keys[3], 
			"copyright" : keys[4], "superJumbo" : keys[5], "section" : keys[7].strip("\n"), 
			"Large" : keys[6]})

	with open(outname, 'w') as outfile:
		json.dump(data, outfile, sort_keys = True, indent = 4, ensure_ascii = False)

	source.close()


def print_sections():
	print "printing sections..."
	url = 'http://internal.du.ec2.nytimes.com/svc/mostpopular/v2/emailed/sections-list.json'
	r = requests.get(url)
	sectionsJson = r.json()

	for section in sectionsJson['results']:
		print section
	print "\n**********\n\nRemember to use URL encoding when inputting a section!!\n\n**********"

def main():
	description = "NYTDarkroom -- json Photo Generator"
	parser = argparse.ArgumentParser(description=description)
	parser.add_argument('-c', '--content', help="specify content to sort by, use url encoding to give possible sections rerun with -s")
	parser.add_argument('-o', '--output_file', help='Choose output file name')
	parser.add_argument('-s', '--sections', action='store_true')
	args = vars(parser.parse_args())
	print args

	if args['sections']:
		print_sections()
	if args['output_file'] is None or args['content'] is None:
		print "To put info to json specify an output filename for example: -o fullData.json\nTo get information specify content for example: -c all-sections"
		print ("Must specify content with -c flag to run, choose from below list:"
			   "\n\tall-sections\n\tarts\n\topinion\n\tliving\n\tnews")
		return
	filename = "newJsonSource.txt"

	output = open(filename, "w")

	# select sections, separate by semicolon
	sections = ''
	all_sections = 'all-sections'
	arts = 'Magazine;movies;multimedia;arts;books;style;t%3Astyle;theater'
	opinion = 'opinion;sunday%20review'
	living = 'automobiles;crosswords%20%25%20games;dining%20%25%20wine;Fashion%20%25%20Style;Great%20Homes%20%25%20destinations;health;home & garden;job market;magazine;real estate;travel'
	news = 'business%20day;world;u.s.;education;sports;N.Y.%20%2F%20Region;obituaries;science;technology;your%20money'
	
	if args['content'] == 'all-sections':
		sections = all_sections
	elif args['content'] == 'arts':
		sections = arts
	elif args['content'] == 'opinion':
		sections = opinion
	elif args['content'] == 'living':
		sections = living
	elif args['content'] == 'news':
		sections = news
	else:
		print ("!invalid content selection! please specify content from one of the following groups:"
			   "\n\tall-sections\n\tarts\n\topinion\n\tliving\n\tnews")
		return
	
	url = 'http://internal.du.nytimes.com/svc/mostpopular/v2/mostviewed/'+sections+'/7.json?offset='
	j = 20
	count = 0
	while True:
		if count >= 300 or j >= 500:
			break
		url2 = url + str(j)
		print url2 + " Article: " + str(count)
		count = parse_json(output, url2, count)
		j = j + 20

	output.close()
		
	toJson(filename, args['output_file'])


if __name__ == "__main__":
	main()
	

