Twitolu
=======

### Organize, visualize and socialize your Twitter feed.
#### PLEASE NOTE: Twitolu is in alpha. These docs are a work-in-progress and will be finished shortly. The next version of Twitolu will use Angular.JS to organize the codebase and eliminate unnecessary global variables. 


I've used Twitter for years, and I prefer the medium of microblogging as a way to quickly create snippets of the cool things I see online every day. However, there aren't many tools that allow me to visualize my tweet history and remind me of what I was doing last week. I use Twitter as a kind of diary: it's a running log of the random thoughts that occupy my mind from day-to-day.

I use a period-delimited format to organize my tweets into categories, or tags.
Twitolu takes advantage of this format and creates an interactive word cloud that creates links based on these tags.
I can click on tags in the word cloud and see only the tweets that match those tags.
I can also group tweets into lists of Favorites and share those Favorites via email.

Twitolu is valuable to me as a means of:
* creating a crumbtrail of links I've visited recently
* recalling important research items or inspirational links
* sharing cool stuff with people I know

## Basic Functionality
* Retrieve my most recent tweets (maximum of 200) from Twitter
* Organize those tweets into categories
* Transform each tweet into a tile with controls for sharing its content
* Allow text searching of my most recent tweets 

## Demo
#### PLEASE NOTE: This version of Twitolu is best viewed on mobile devices.

Visit my portfolio site and UX diary to see Twitolu in action: 
[http://janianderson.com/twitterApp/]

## Setup and Dependencies
Twitolu is simple to set up. Most of the technology for the app is JavaScript, jQuery and CSS, with a dash of PHP to connect with Twitter. You will need a [Twitter Developer Account](https://dev.twitter.com/) to connect to Twitter and retrieve your latest tweets in JSON format.

Twitolu cosists of five parts:

1. [index.html](https://github.com/matharchod/Twitolu#indexhtml)
2. [twitterApp.js](https://github.com/matharchod/Twitolu#twitterAppjs)
3. [twitterStyles.css](https://github.com/matharchod/Twitolu#twitterStylescss)
4. [tmhOAuth](https://github.com/matharchod/Twitolu#tmhOAuth), an OAuth library written in PHP by @themattharris
5. [jQuery](https://github.com/matharchod/Twitolu#jQuery)

### index.html
The main HTML wrapper and controls are contained in this template file.
```
<!DOCTYPE HTML>
<html>
<head>
	<title>Twitolu / a twitter search app / by jani momolu anderson / front-end developer / chicago, il</title>
	<meta name="viewport" content="width=device-width"> // This version of Twitolu is best viewd on mobile devices
	<link rel="stylesheet" type="text/css" href="twitterStyles.css" />
</head>
<body>
	<div class="main">
		<ul class="mainNavToggle">
			<li><a class="navToggle">&times;</a></li> //Closes the app
		</ul>	
		<div id="tweets" class="content-section">
			<div class="tags sidebar"> 
				<h2>UX Diary</h2>
				<div class="search-box border-box"> 
					<div class="wrap border-box">
						<input id="filter" class="border-box" name="filter"> //Search box 
					</div>
					<a class="searchNow border-box">Search<p id="filter-count"></p></a> //Search button
					<button class="clearSearch border-box">Reset</button>	//Reset button
					<a class="onlyFaves border-box">Show &hearts; Only</a>	//Show Only Favorites button
					<a id="toggleWordCloud" class="border-box">Word Cloud</a>	//Toggle Word Cloud button
				</div>
				<div class="loading"><img src="/imx/_nav/ajax-loader.gif" /></div>
				<div id="wordCloud"></div> //Word Cloud container
			</div>	
			<ul class="container"></ul> //Tweet Tiles container
		</div>				
	</div>
</body>
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script> //jQuery file
<script type="text/javascript" src="twitterApp.js"></script>
<script type="text/javascript">
		buildTweetList(); //Initialize Twitolu on the page
</script>
</html>
```

### twitterApp.js
There are only a few functions that make up the front-end of Twitolu, so all of the JavaScript is contained in one JS file.
[View twitterApp.js](https://github.com/matharchod/Twitolu/blob/master/twitterApp.js)

### twitterStyles.css
Twitolu uses less than 300 lines of CSS for page styling, so all of the CSS is contained in one stylesheet.
[View twitterStyles.css](https://github.com/matharchod/Twitolu/blob/master/twitterStyles.css)

### tmhOAuth
Twitolu uses [thmOAuth](https://github.com/themattharris/tmhOAuth), an OAuth library written in PHP by @themattharris, to authorize a connection to Twitter and retrieve your most recent tweets in JSON format.

### jQuery
Twitolu uses [jQuery 1.x](http://jquery.com/download/).

=======

## Main Functions
These functions represent the major aspects of the app. 

* [buildTweets()](https://github.com/matharchod/Twitolu#buildtweetstweetlink-tweettext-tweettag)
* [searchByTag()](https://github.com/matharchod/Twitolu#searchbytagtag)
* [createWordCloud()](https://github.com/matharchod/Twitolu#createwordcloud)
* [emailTweets()](https://github.com/matharchod/Twitolu#emailtweetssharecontent)
* [toggleFavorites()](https://github.com/matharchod/Twitolu#togglefavorites_elem-activeclass)
* [shareFavorites()](https://github.com/matharchod/Twitolu#sharefavorites_this)

## Helper Functions
I use helper functions to give me more flexibility in the UI by allowing me to invoke functionality more granularly.

* [appInit()](https://github.com/matharchod/Twitolu#appinit)
* [cloudInit()](https://github.com/matharchod/Twitolu#cloudinit)
* [searchInit()](https://github.com/matharchod/Twitolu#searchinitelem)
* [clearSearch()](https://github.com/matharchod/Twitolu#clearsearch)
* [showWordCloud()](https://github.com/matharchod/Twitolu#showwordcloudcloudlinks)
* [hideWordCloud()](https://github.com/matharchod/Twitolu#hidewordcloudcloudlinks)
* [toggleWordCloud()](https://github.com/matharchod/Twitolu#togglewordcloudcloudlinks)
* [countCloudItems(](https://github.com/matharchod/Twitolu#countclouditemscloudlinks))
* [buildTweetList()](https://github.com/matharchod/Twitolu#buildtweetlist)
* [showOnlyFavoirties()](https://github.com/matharchod/Twitolu#showonlyfavoirties)
* [NEWchangeMeToRandomColor()](https://github.com/matharchod/Twitolu#newchangemetorandomcolorelem)

## Descriptions
Twitolu uses JSON to transform your tweets into a set of "tiles". Tiles allow you to manipulate tweets seperately or in groups. 

Each tile contains:
* the tweet text content
* the tweet category, or tag
* a link to mark the tweet as a Favorite
* a Send link to share the tweet as an email
* the URL contained in the tweet
* a link that takes the user back to the top of the page (primarily for mobile users)
* a "shade" which adds a tint to the background color of the tile (for aesthetics)

=======

#### buildTweets(tweetLink, tweetText, tweetTag)

This function accepts three arguments:
* `tweetLink`: The URL contained in the tile 
* `tweetText`: The text content of the tile (minus the tweetLink) 
* `tweetTag`: The category, or tag, of the tile

This function performs the following operations:
* Transform each tweet into a tile
* Group several tiles as Favorites
* Send the content of each tile as an email
* Send a group of Favorites as a single email 
* Create category links that will search for all tiles that match that category

```
buildTweets = function(tweetLink, tweetText, tweetTag){	
	var tweet = tweetText.replace(tweetLink,'');
	if (tweetTag.length >= 30) {
		tweetTag = '';
	} else {
		tweetTag = tweetTag;
	}
	$('#tweets .container').append('<li class="tweetItem">' 
		+ '<p>' + tweet + '</p><span>'
		+ '<div class="table">'
		+ '<a class="gotoTop">&uarr;</a>'
		+ '<a class="favoriteLink">&hearts;</a>'
		+ '<a class="shareLink">Send</a>'
		+ '<a class="tag">' + tweetTag + '</a>'
		+ '<a href="' + tweetLink + '" class="openTweet">' + tweetLink + '</a>' 
		+ '</div>'				
		+ '</span><span class="shade"></span></li>');		
}
```


#### buildTweetList()

Twitolu uses the [thmOAuth PHP script](https://github.com/themattharris/tmhOAuth) to retrieve your latest Tweets from Twitter. 

This function performs the following functions:
* Use PHP to retrieve a list of tweets in JSON format 
* Use the first word or phrase from the tweet as the category for the tile
* Create the link for this tile using the URL from the tweet  


```
buildTweetList = function() {
	$.ajax({
		url: "/LINKTOYOURPROJECTROOT/twitolu/tmhOAuth-master/tweets_json.php?count=200",
		type: "GET",
		dataType: "json",
		success: function(result){
			for (i in result) {
				var tweetId = i,
					tweetText = result[i].text,
					tweetTag = result[i].text.split('. ')[0],
					tweetURLS = result[i].entities.urls;
				for (x in tweetURLS) {
					var tweetLink = tweetURLS[x].url;
					buildTweets(tweetLink, tweetText, tweetTag);				
				}	
			}			
			appInit();
			createWordCloud();
			$('.loading').fadeOut(function(){
				$(this).remove();
				$('#tweets .container').show();
			});
		},
		error: function(err){
			alert("Error with JSON");
		}
	});
};
```

#### searchInit(elem)

Twitolu's search functionality is based on a DOM search. 
Accepts the argument `elem`, representing the wrapped set of tiles on which to perform the search.

* Create an event handler for hitting the RETURN/ENTER button
* Create an event handler for the SEARCH button
* Read the value of the seach field
* Run a case-insensitive regular expression on each tile for that value 
* Toggle the visibility on tiles that match the regex
* Show the number of tiles that match the search
* Create an event handler to clear the search results


```
searchInit = function (elem) {
	$('input').keypress(function (evt) {
		var charCode = evt.charCode || evt.keyCode;
		if (charCode == 13) { 
			$('.searchNow').click();
		}
	});	
	$('.searchNow').click(function () {
		var filter = $('#filter').val(),
				count = 0;
		$(elem).each(function () {
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).hide();
			} else {
				$(this).show();
				count++;
			}
		});	
		var numberItems = count;
		$('#filter-count').text(count).show();
		return false;
	});	
	$('.clearSearch').click(function(){	
		clearSearch();
	});
};
```


#### searchByTag(tag)

Creates a jQuery-wrapped set of elements in which to limit the search. 
Accepts the argument `tag`, representing the category of each tweet.

This funtion performs the following operations:
* Search all tweets for an instance of `tag`
* Toggle "active" and "inactive" states on tweets that contain `tag`

```
searchByTag = function(tag){ 
	var count = 0;
	$('.content li:not(:contains(' + tag + '))').each(function(){
		$(this).hide();
	});
	$('.content li:contains(' + tag + ')').each(function(){
		count++;
		$(this).show();
		$('#filter-count').text(count).show();
	});
	$('.tags a').each(function(){
		if ( $(this).attr('rel') !== tag && $(this).hasClass('active') === false){
			$(this).addClass('inactive');
		} else {
			$(this).addClass('active').removeClass('inactive');	
		}
	});	
};
```

#### createWordCloud()

A helper function involved in creating the word cloud. THIS WILL PROBABLY BE DEPRICATED IN THE NEXT VERSION. 

```
createWordCloud = function(){
	var cloud = [],
		cloud2 = [];
	$('.tweetItem p').each(function(){
		var x = $(this).text().split('.')[0];
		cloud.push(x);
	});
	cloud.sort();
	var last = cloud[0];
	for (var i=1; i<cloud.length; i++) {
	   if (cloud[i] == last) {
	   	cloud2.push(last);
	   	};
	   last = cloud[i];
	}
	countCloudItems(cloud2);
};
```

#### emailTweets(shareContent)

Accepts the argument `shareContent`, representing the tiles you wish to share via email.

This funciton performs the following operations:
* Encode the URLs in `shareContent` for email 
* Open the user's default email program
* Create an email with the Subject and Body populated with `shareContent`

```
emailTweets = function(shareContent){	
	var content = encodeURIComponent(shareContent);
	window.location = 'mailto:' 
		+ ' ' 
		+ '?subject=' + 'Cool Stuff from Twitolu'
		+ '&body=Twitolu says:' 
		+ '%0D%0A%0D%0A-----%0D%0A%0D%0A'
		+ content
		+ '%0D%0A%0D%0A-----%0D%0A%0D%0A' 
}
```

#### toggleFavorites($_elem, activeClass)

Accepts the arguments `$_elem` and `activeClass`:
* `$_elem`: a selected tile
* `activeClass`: the CSS class you wish to use as the active class for `$_elem`

```
toggleFavorites = function ($_elem, activeClass){
	var $_thisParent = $_elem.closest('.tweetItem');	
	if ($_thisParent.hasClass(activeClass) == false){
		$_thisParent.addClass(activeClass);
	} else {
		$_thisParent.removeClass(activeClass);
	}
	if ($('.favorite').size()==1){
		$('.shareLink').text('');
		$('.favorite .shareLink').html('Send');		
	} 	
	else if ($('.favorite').size()>1){
		$('.shareLink').text('');
		$('.favorite .shareLink').html('Send All &hearts;');
	} else {
		$('.shareLink').text('Send');
	}
}
```


#### shareFavorites($_this)

Accepts the argument `$_this`, representing the selected tile.

```
shareFavorites = function($_this){
	
	var tweetsToSend = [],
  		tweetContent = $_this.closest('.tweetItem').text().replace('%20%E2%86%91%E2%99%A5Send','');
		
	function closeMe(){
		$('#zerostate').fadeOut(function(){
			$('#zerostate').remove();
		});
	}
	
	if ($('.favorite, #zerostate').length <= 0){		
		var shareContent = tweetContent;
		emailTweets(shareContent);
		$('.close').click(function(){closeMe()});
		
	} else {
		$('.favorite').each(function(){
			var	tweetContent = $(this).find('p').text();
			var	tweetContentLink = $(this).find('.openTweet').attr('href');	
			tweetsToSend.push([tweetContent + tweetContentLink]);			
		});	
		var x = tweetsToSend.join('\n\n').toString();		
		emailTweets(x);
	}
		
}
```

#### appInit()

Initializes most of the event listeners on the page.
This methodology allows Twitolu to bootstrap these controls when DOM elements load asnycronously.

```
appInit = function(){
	searchInit('#tweets li:not(.cloud)');		
	
	$('.favoriteLink').click(function(){
		toggleFavorites($(this),'favorite');
	});	
	
	$('.shareLink').click(function(){
		shareFavorites($(this));
	});	
	
	$('.gotoTop').click(function(){
		$('html, body').animate({ scrollTop: 0 }, "slow");		
	});	
	$('#tweets li').each(function(){
		NEWchangeMeToRandomColor($(this));
	});	
	$('.onlyFaves').click(function(){
		showOnlyFavoirties();
	});	
    $('.tag').click(function(){
	    $('#filter').val($(this).text());
      hideWordCloud('.cloud');
	    $('.searchNow').click();
	    $('html, body').animate({ scrollTop: 0 }, "slow");	
    });	
    $('#toggleWordCloud').click(function(){
	    toggleWordCloud('.cloud');
    });	
}
```


#### cloudInit()

A helper function which initializes Twitolu's word cloud functionality

```
cloudInit = function(){
  $('.cloud').click(function(){
    $('#filter').val($(this).text());
    $('.searchNow').click();
    $('html, body').animate({ scrollTop: 0 }, "slow");	
    hideWordCloud('.cloud');
  });	
}
```



#### clearSearch()

A helper function which resets the application to its zero state.

```
clearSearch = function() {
	$('#filter').val('');
	$('.tags .content').empty();
	$('#filter-count').hide();	
};
```



#### showWordCloud(cloudLinks)

A helper function that hides the word cloud. 
Accepts the argument `cloudLinks`, representing the jQuery-wrapped set of tags.

```
showWordCloud = function(cloudLinks) {
  $(cloudLinks).addClass('visible');
}
```



#### hideWordCloud(cloudLinks)

A helper function that hides the word cloud.
Accepts the argument `cloudLinks`, representing the jQuery-wrapped set of tags.

```
hideWordCloud = function(cloudLinks) {
  $(cloudLinks).removeClass('visible');
}
```



#### toggleWordCloud(cloudLinks)

Toggles the visibility of word cloud. 
Accepts the argument `cloudLinks`, representing the jQuery-wrapped set of tags.

```
toggleWordCloud = function(cloudLinks){
	if ($(cloudLinks).hasClass('visible')==true) {
		hideWordCloud(cloudLinks);	
	} else {
		showWordCloud(cloudLinks);
	}
}
```



#### countCloudItems(cloudLinks)

Sorts and counts the items in the word cloud and accepts `arr` as an argument, representing the array of items retrieved as tags from the tweet list. THIS WILL BE REPLACED WITH LESS BLOATED CODE IN THE NEXT VERSION.

```
countCloudItems = function (arr) {
  var a = [], 
  b = [], 
  prev;
	theCloud = [];
  arr.sort();
  for ( var i = 0; i < arr.length; i++ ) {
      if ( arr[i] !== prev ) {
          a.push(arr[i]);
          b.push(1);         
      } else {	
          b[b.length-1]++;
      }
      prev = arr[i];
  }
	theCloud.push({'words':a},{'count':b});
	theNewCloud = [];
	for (i in theCloud[0].words){ 
		  theNewCloud.push({id:theCloud[0].words[i], value:theCloud[1].count[i]});
    } 
    theNewCloud.sort(function(a, b) { return b.value - a.value });    
    for (i in theNewCloud){
	    if (theNewCloud[i].value <= 1) {	    
	    } else {
  			$('#wordCloud').append('<div class="cloud">'
    			+ theNewCloud[i].id
    			+ '</div>'
  			);
	    }
    }
	cloudInit();
}
```



#### showOnlyFavoirties()

Hides all tiles that are NOT marked as Favorites. 

```
showOnlyFavoirties = function(){
	$('.tweetItem').not('.favorite').hide();	
}
```



#### NEWchangeMeToRandomColor(elem)

A helper function that generates a random color for the background of a tile.
Accepts the argument `elem`, representing the DOM element you want to add the color to. 
[The original code for this function from Paul Irish can be found here](http://paulirish.com/2009/random-hex-color-code-snippets/).


```
NEWchangeMeToRandomColor = function(elem){
	var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16); 
	var bgcolor = (!bgcolor) ? randomColor : bgcolor ;
	$(elem).css({'background-color': bgcolor});		
};
```




