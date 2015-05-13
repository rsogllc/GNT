$(document).ready(function(){
	listNewsItems();
	
	// setInterval(function(){ $(".date").prettyDate(); }, 5000);
	
	// getTicker();
});


function listNewsItems() {
	$.ajax({
	    url: "/api/news/posts",
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	
	            	var hasPrimary = false;
	            	var hasSecondary = false;
	            	var hasVOTD = false;
	            	var secondaryHeadlines = [0, 0, 0, 0];
	            	var usedArticles = [];
	            	var secondaryHeadlineLocations = [0, 1, 2, 3];
	            	
	            	for (var i=0; i<response.items.length; i++)
	            	{
		            	if (response.items[i].labels != null && response.items[i].labels.indexOf('headline') != -1)
	            		{
		            		if (!hasPrimary)
		            		{
		            			$('.news-featured .lead-story img').attr('src',response.items[i].images[0].url);
		            			$('.news-featured .lead-story .figcaption').html(response.items[i].title);
		            			$('.news-featured .lead-story a').attr('href','bitcoin-news/' + response.items[i].id);
		            			usedArticles[usedArticles.length] = response.items[i].id;
		            			hasPrimary = true;
		            		} else {
		            			for (var j=0; j<secondaryHeadlines.length; j++)
		            			{
		            				if (secondaryHeadlines[j] == 0 && secondaryHeadlines.indexOf(response.items[i].id) == -1)
		            				{
		            					console.log($('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).height());
		            					console.log($('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).width());
		            					$('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).find('.headline').remove();
		            					$('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).find('.figcaptionsmall').html(response.items[i].title);
		            					// $('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).find('.headline').html(response.items[i].title);
		            					var imgUrl = response.items[i].images[0].url;
		            					imgUrl = imgUrl.replace(/^http:\/\//i, 'https://');
		            					$('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).find('img').attr('src',imgUrl);
		            					$('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).find('a').attr('href','bitcoin-news/' + response.items[i].id);
		            					
		            					var parentHeight = $('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).height();
		            					var parentWidth = $('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).width();
		            					
		            					secondaryHeadlines[j] = response.items[i].id;
		            					usedArticles[usedArticles.length] = response.items[i].id;
		            				}
		            			}
		            		}
	            		}
	            	}
	            	$('.news-featured .latest-stories .latest-story').remove();
	            	
	            	var newsListLength = response.items.length;
	            	if (newsListLength > 10)
	            	{
	            		newsListLength = 10;
	            	}
	            	
	            	var tertiaryStory = 0;
	            	
	            	for (var i=0; i<newsListLength; i++)
	            	{
	            		if (response.items[i].labels != null && response.items[i].labels.indexOf('news') != -1)
	            		{
	            			$('.news-featured .latest-stories').append($('<div class="latest-story">').
	            					append(
	            							'<img src="'+ response.items[i].images[0].url +'"><a href="bitcoin-news/'+ response.items[i].id +'">' + response.items[i].title +
	            							'</a><div class="date" title="'+ response.items[i].published +'">' + prettyDate(response.items[i].published) + '</div>'
	            					)
	            			);
	            			if (usedArticles.indexOf(response.items[i].id) == -1 && tertiaryStory <= 4) {
	            				usedArticles[usedArticles.length] = response.items[i].id;
	            				
	            				var html = $.parseHTML( response.items[i].content );
	            				var element = document.createElement('div');
	            				$(element).html(response.items[i].content);
	            				
	            				var link = document.createElement('a');
	            				$(link).html(response.items[i].title)
	            				
	            				var imgUrl = response.items[i].images[0].url;
            					imgUrl = imgUrl.replace(/^http:\/\//i, 'https://');
	            				
            					$('.tertiary-story').eq(tertiaryStory).find('.headline').html('');
	            				$('.tertiary-story').eq(tertiaryStory).find('.headline').append($(link));
	            				$('.tertiary-story').eq(tertiaryStory).find('.date').html(prettyDate(response.items[i].published));
	            				$('.tertiary-story').eq(tertiaryStory).find('img').attr('src',imgUrl);
	            				$('.tertiary-story').eq(tertiaryStory).find('a').attr('href','bitcoin-news/' + response.items[i].id);
	            				$('.tertiary-story').eq(tertiaryStory).find('.description').html($(element).find('div#brief').first().html());
	            				tertiaryStory++;
	            			}
	            		}
	            	}
	            	
	            },
	            500: function (response) {
	
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  $('.starthidden').fadeTo( 300 , 1, function() {
	        		    // Animation complete
	        	  });
	          }
	});
}

function getTicker() {
	$.ajax({
	    url: "https://www.bitstamp.net/api/ticker/",
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	console.log(response);
	            },
	            500: function (response) {
	            	console.log(response);
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  
	          }
	});
}