$(document).ready(function(){
	listNewsItems();
});


function listNewsItems() {
	$.ajax({
	    url: "/api/news/posts",
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	
	            	console.log(response);
	            	
	            	var hasPrimary = false;
	            	var hasSecondary = false;
	            	var hasVOTD = false;
	            	var secondaryHeadlines = [0, 0, 0, 0];
	            	var secondaryHeadlineLocations = [0, 1, 3, 4];
	            	
	            	for (var i=0; i<response.items.length; i++)
	            	{
	            		console.log(response.items[i].labels.indexOf('headline'));
		            	if (response.items[i].labels.indexOf('headline') != -1)
	            		{
		            		if (!hasPrimary)
		            		{
		            			$('.news-featured .lead-story img').attr('src',response.items[i].images[0].url);
		            			$('.news-featured .lead-story .figcaption').html(response.items[i].title);
		            			hasPrimary = true;
		            		} else {
		            			console.log(secondaryHeadlines);
		            			console.log(response.items[i].id);
		            			for (var j=0; j<secondaryHeadlines.length; j++)
		            			{
		            				if (secondaryHeadlines[j] == 0 && secondaryHeadlines.indexOf(response.items[i].id) == -1)
		            				{
		            					$('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).find('.headline').remove();
		            					$('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).find('.figcaptionsmall').html(response.items[i].title);
		            					// $('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).find('.headline').html(response.items[i].title);
		            					$('.news-secondary .secondary-story').eq(secondaryHeadlineLocations[j]).find('img').attr('src',response.items[i].images[0].url);
		            					secondaryHeadlines[j] = response.items[i].id;
		            				}
		            			}
		            		}
	            		}
		            	/*
		            	if (response.items[i].labels.indexOf('videos') != -1 && !hasVOTD)
	            		{
		            		$('.news-secondary .secondary-story').eq(0).find('.headline').html(response.items[i].title);
	            			$('.news-secondary .secondary-story').eq(0).find('img').attr('src',response.items[i].images[0].url);
			            	hasVOTD = true;
	            		}
	            		*/
	            	}
	            	// secondary-story
	            	
	            	$('.news-featured .latest-stories .latest-story').remove();
	            	
	            	var newsListLength = response.items.length;
	            	if (newsListLength >= 8)
	            	{
	            		newsListLength = 8;
	            	}
	            	
	            	for (var i=0; i<=newsListLength; i++)
	            	{
	            		console.log(response.items[i]);
	            		if (response.items[i].labels.indexOf('news') != -1)
	            		{
	            			$('.news-featured .latest-stories').append($('<div class="latest-story">').
	            					append(
	            							'<img src="'+ response.items[i].images[0].url +'">' + response.items[i].title +
	            							'<div class="date">' + response.items[i].published + '</div>'
	            					)
	            			);
	            		}
	            	}
	            	
	            	/*
	            	<div class="latest-story">
				      <img src="/img/news/latest-icon.jpg">
				      Fed open up probe
				      <div class="date">
				        May 6, 2015
				      </div>
				    </div>
	            	*/
	            },
	            500: function (response) {
	
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  
	          }
	});
}