$(document).ready(function(){
	listNewsItems();
	
	// setInterval(function(){ $(".date").prettyDate(); }, 5000);
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
	            	var secondaryHeadlineLocations = [0, 1, 3, 4];
	            	
	            	for (var i=0; i<response.items.length; i++)
	            	{
		            	if (response.items[i].labels.indexOf('headline') != -1)
	            		{
		            		if (!hasPrimary)
		            		{
		            			$('.news-featured .lead-story img').attr('src',response.items[i].images[0].url);
		            			$('.news-featured .lead-story .figcaption').html(response.items[i].title);
		            			hasPrimary = true;
		            		} else {
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
	            	}
	            	$('.news-featured .latest-stories .latest-story').remove();
	            	
	            	var newsListLength = response.items.length;
	            	if (newsListLength >= 8)
	            	{
	            		newsListLength = 8;
	            	}
	            	
	            	for (var i=0; i<=newsListLength; i++)
	            	{
	            		if (response.items[i].labels.indexOf('news') != -1)
	            		{
	            			$('.news-featured .latest-stories').append($('<div class="latest-story">').
	            					append(
	            							'<img src="'+ response.items[i].images[0].url +'">' + response.items[i].title +
	            							'<div class="date" title="'+ response.items[i].published +'">' + prettyDate(response.items[i].published) + '</div>'
	            					)
	            			);
	            		}
	            	}
	            	
	            },
	            500: function (response) {
	
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  
	          }
	});
}