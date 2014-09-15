NYT Darkroom -- intern-project-group-3
======================

Alex Brashear, Becca Fox, Diego Morales, Jasmine Feng, and Jeffrey Shih

=====================

Darkroom is a proposed solution for increasing traffic to and extending the lifetime of articles through the New York Time's extensive collection of high quality photos.  Sites like Pinterest, Buzzfeed, and Tumblr are popular among young people because images are much easier to digest at a glance than blocks of text.  By leading the reader to the article through an image (with an abstract/description) and giving them the opportunity to share the image, we are creating a new avenue for the Times to target younger audiences via the web.

Features inclue:

~ Featured article carousel that would be hand-picked by the Newsroom

~ 1-click distance between photos and the article's homepage

~ Masonry implentation to tile the photos in an elegant and clean fashion

~ Fancybox implementation allows users to see a larger version of the photo, along with the article's title, author, abstract, and a direct link to the full article.

~ Sharing through facebook, twitter, and email

~ Infinite scrolling to allow for a continuous browsing experience

~ 'Light Switch' to switch between a black or white background (if you want a more Times-like experience

=====================

Check out Darkroom.pptx to see the our presentation of NYT Darkroom to various members of the New York Times technology and marketing staff. 

=====================

generating json files for photos by section

this will generate json files with superjumbo and large photos with some metadata, like the article title and author. the information is pulled from the mostpopular api. 

run photogenerator.py (in scripts folder) with this command:

python photogenerator.py -o [output file] -c [section name]

(both -o and -c options are required in order to generate the file)

other options are -h for help and -s to print the section list
  
section names are "arts", "living", "all-sections", "opinion", and "news"

======================
