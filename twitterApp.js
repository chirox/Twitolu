//Flitter
//I created this app to help me orgnize, visualize and socialize my Twitter feed.
//I have used Twitter since it first became available to the public. 
//I like the medium of microblogging to quickly create snippets of the cool things I see online every day.
//However, there aren't many tools that allow you to look back through history to remind you what you were thinking about last week.
//This app retrieves my last 200 tweets
//seperates them into categories
//transforms each one into a tile with controls for sharing their content
//allows searching 

//Functions:
//appInit
//cloudInit
//searchInit
//toggleWordCloud
//clearSearch
//buildTweets
//showOnlyFavoirties
//createWordCloud
//NEWchangeMeToRandomColor
//shareFavorites
//searchByTag


 
//I use two functions called appInit and cloudInit to initialize all of my event listeners.
//This allows me to bootstrap the controls when I load page elements asnycronously.
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

cloudInit = function(){
  $('.cloud').click(function(){
    $('#filter').val($(this).text());
    $('.searchNow').click();
    $('html, body').animate({ scrollTop: 0 }, "slow");	
    hideWordCloud('.cloud');
  });	
}

toggleWordCloud = function(cloudLinks){
	if ($(cloudLinks).hasClass('visible')==true) {
		hideWordCloud(cloudLinks);	
	} else {
		showWordCloud(cloudLinks);
	}
}

showWordCloud = function(cloudLinks){$(cloudLinks).addClass('visible')}
hideWordCloud = function(cloudLinks){$(cloudLinks).removeClass('visible')}

clearSearch = function() {
	$('#filter').val('');
	$('.tags .content').empty();
	$('#filter-count').hide();	
	$('.shareLink').html('Send');
};

//Use PHP to get a list of tweets in JSON format
//Use the first word or phrase from the tweet as the category for that tweet
//Use the URL from the tweet as the link for its tile 
buildTweetList = function() {
	$.ajax({
		url: "/_dev/twitterApp/tmhOAuth-master/tweets_json.php?count=200",
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
				//	console.log('tweetLink : ' + tweetLink);
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
			console.log(err);
		}
	});
};

//Each tweet is transformed into a tile
//Tiles allow me to manipulate each tweet seperately or in groups
//Group several tiles as Favorites
//Send the content of each tile as an email
//Send a group of Favorites as a single email 
//Create category links that will search for all tweets that match that category
buildTweets = function(tweetLink, tweetText, tweetTag){	
	var tweet = tweetText.replace(tweetLink,'');
	//console.log('tweetTag.length =', tweetTag.length);
	if (tweetTag.length >= 30) {
		tweetTag = '';
	} else {
		tweetTag = tweetTag;
	}
	$('#tweets .container').append('<li class="tweetItem">' 
		+ '<p>' + tweet + '</p><span>'
		+ '<div class="table">'
		+ '<a class="gotoTop" style="width:0px;">&uarr;</a>'
		+ '<a class="favoriteLink" style="width:0px;">&hearts;</a>'
		+ '<a class="shareLink">Send</a>'
		+ '<a class="tag">' + tweetTag + '</a>'
		+ '<a href="' + tweetLink + '" class="openTweet" style="width:50px;">' + tweetLink + '</a>' 
		+ '</div>'				
		+ '</span><span class="shade"></span></li>');		
}

showOnlyFavoirties = function(){
	$('.tweetItem').not('.favorite').hide();	
}

showAllTweets = function(){
	$('.tweetItem').show();	
}

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
	   	//console.log('Duplicate : ' + last);
	   	};
	   last = cloud[i];
	}
	countCloudItems(cloud2);
};

countCloudItems = function (arr) {
    var a = [], b = [], prev;
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
	//console.log(theCloud[0].words);
	theNewCloud = [];
	for (i in theCloud[0].words){ 
		theNewCloud.push({id:theCloud[0].words[i], value:theCloud[1].count[i]});
    } 
    theNewCloud.sort(function(a, b) { return b.value - a.value });    
    for (i in theNewCloud){
	    if (theNewCloud[i].value <= 1) {} else {
			//console.log(theNewCloud[i].id, theNewCloud[i].value);
			$('#wordCloud').append('<div class="cloud">'
			+ theNewCloud[i].id
			+ '</div>');
	    }
    }
	cloudInit();
	console.log(theNewCloud);
}

NEWchangeMeToRandomColor = function(elem){
	//http://paulirish.com/2009/random-hex-color-code-snippets/	
	var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16); 
	var bgcolor = (!bgcolor) ? randomColor : bgcolor ;
	$(elem).css({'background-color': bgcolor});		
};

shareFavorites = function($_this){
	
	var tweetsToSend = [];
	var	tweetContent = $_this.closest('.tweetItem').text().replace('%20%E2%86%91%E2%99%A5Send','');
		
	function closeMe(){
		$('#zerostate').fadeOut(function(){
			$('#zerostate').remove();
		});
	}
	
	if ($('.favorite, #zerostate').length <= 0){		
		var shareContent = tweetContent;
		
		emailTweets(shareContent);
		
		console.log(shareContent);
		/*
		$_this.parent().prepend('<li id="zerostate">' 
		+ '<a class="close">&times;</a>'
		+ '<p>Click something, fool!</p>'
		+ '</li>');
		*/
		
		$('.close').click(function(){closeMe()});
		
	} else {
		$('.favorite').each(function(){
			var	tweetContent = $(this).find('p').text();
			var	tweetContentLink = $(this).find('.openTweet').attr('href');	
			tweetsToSend.push([tweetContent + tweetContentLink]);			
		});	
		var x = tweetsToSend.join('\n\n').toString();
		//var y = encodeURIComponent(x);
		//var y = x.replace(/&/ig,'&');
		
		emailTweets(x);
		//%0D%0A
		console.log('tweetsToSend = \n', x);
		
	}
		
}

emailTweets = function(shareContent){	
	var content = encodeURIComponent(shareContent);
	window.location = 'mailto:' 
		+ ' ' 
		+ '?subject=' + 'Cool Stuff in Web Development'
		+ '&body=Jani says:' 
		+ '%0D%0A%0D%0A-----%0D%0A%0D%0A'
		+ content
		+ '%0D%0A%0D%0A-----%0D%0A%0D%0A' 
		+ 'Find more cool stuff in the UX diary of Jani Momolu Anderson at http://janianderson.com/#diary';
}

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

//SEARCH
searchInit = function (elem) {
  //The search functionality in the Portfolio section is a DOM search.
  //I use the searchInit function to create a jQuery-wrapped set of elements to limit the search.
  //USEAGE: searchInit('#elem');
  
	//prevent default ENTER key
	$('input').keypress(function (evt) {
		//Deterime where our character code is coming from within the event
		var charCode = evt.charCode || evt.keyCode;
		if (charCode == 13) { //Enter key's keycode
			//Simulate a click on the "search" button
			$('.searchNow').click();
		}
	});	
	//Event handler for the "search" button
	//Takes the value of the seach field
	//Runs a case-insensitive regular expression on each tweet for that value 
	//Toggles the visibility on tweets that match the regex
	//Shows the nuber of tweets that match the search
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
		// Update the tweet count for matched items
		var numberItems = count;
		$('#filter-count').text(count).show();
		return false;
	});	
	//Clears the search box
	//shows all tweets 
	//resets the tile controls
	$('.clearSearch').click(function(){	
		$('#filter').val('');
		$(elem).show();
		$('#filter-count').hide();	
		$('.tweetItem').removeClass('favorite');	
		$('.shareLink').html('Send');
	});
};


searchByTag = function(tag){ //searchTags
	var count = 0;
	$('.content li:not(:contains(' + tag + '))').each(function(){
		$(this).hide();
		//console.log($(this));
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


