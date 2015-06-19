var listLoaded;

$(document).ready(function(){
	
	listLoaded = false;
	
	listNewsItems();
	
	var params = get_params(location.search);
	var query = params['q'];
	
	if (query)
	{
		searchQuery(query);
		
		var regex = /(<([^>]+)>)/ig;
		$('#headline').html('Search results for ' + query.replace(regex, ""));
		
	} else {
		$('#headline').html('No search results');
	}
	
});


function listNewsItems() {
	$.ajax({
	    url: "/api/news/posts",
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	
	            	var usedArticles = [];
	            	
	            	var newsListLength = response.items.length;
	            	if (newsListLength > 5)
	            	{
	            		newsListLength = 5;
	            	}
	            	
	            	for (var i=0; i<newsListLength; i++)
	            	{
	            		if (response.items[i].labels != null && response.items[i].labels.indexOf('news') != -1)
	            		{
	            			var articleItem = response.items[i];
	            			
	            			var storyItem = $('#latest-story-template').clone();
	            			var imgUrl = articleItem.images[0].url;
        					imgUrl = imgUrl.replace(/^http:\/\//i, 'https://');
            				
        					var urlSlug = articleItem.id;
            				urlSlug += '-' + convertToSlug(articleItem.title);
	            			
	            			$(storyItem).removeAttr('id');
	            			$(storyItem).data('articleid', articleItem.id);
	            			$(storyItem).find('.date').html(prettyDate(articleItem.published));
	            			$(storyItem).find('img').attr('src', imgUrl);
	            			$(storyItem).find('a').attr('href', 'bitcoin-news/' + urlSlug);
	            			$(storyItem).find('a').html(articleItem.title);
	            			
	            			$('#right-story-container').append($(storyItem));
	            		}
	            	}
	            	$('#latest-story-template').remove();
	            	
	            },
	            500: function (response) {
	
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  
	        	  listLoaded = true;
	        	  
	        	  if (listLoaded)
	        	  {
	        		  $('.starthidden').fadeTo( 300 , 1, function() {
	        			  // Animation complete
	        		  });	        		 
	        	  }
	          }
	});
}

function searchQuery(query) {
	$.ajax({
	    url: "/api/news/search?q=" + query,
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	
	            	if (response.items && response.items.length > 0)
	            	{
	            		for (var i=0; i<response.items.length; i++)
	            		{
	            			var newTertiaryStory = $('.tertiary-story').first().clone();
	            			$(newTertiaryStory).find('img').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=');
	            			
	            			var html = $.parseHTML( response.items[i].content );
	            			var element = document.createElement('div');
	            			$(element).html(response.items[i].content);
	            			
	            			var link = document.createElement('a');
	            			$(link).html(response.items[i].title);
	            			
	            			var imgUrl = $(element).find('img').first().attr('src');
	            			
	            			var urlSlug = response.items[i].id;
	            			urlSlug += '-' + convertToSlug(response.items[i].title);
	            			
	            			$(newTertiaryStory).find('.headline').html('');
	            			$(newTertiaryStory).find('.headline').append($(link));
	            			$(newTertiaryStory).find('.date').html(prettyDate(response.items[i].published));
	            			$(newTertiaryStory).find('img').attr('src',imgUrl);
	            			$(newTertiaryStory).find('a').attr('href','bitcoin-news/' + urlSlug);
	            			$(newTertiaryStory).find('.description').html($(element).find('div#brief').first().html());
	            			$(newTertiaryStory).css('display', '');
	            			$(newTertiaryStory).show();
	            			
	            			$('div.news-tertiary').append($(newTertiaryStory));
	            		}
	            	} else {
	            		$('#headline').html('No search results');
	            	}
	            	
	            },
	            500: function (response) {
	
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  
	          }
	});
}

var get_params = function(search_string) {

	  var parse = function(params, pairs) {
	    var pair = pairs[0];
	    var parts = pair.split('=');
	    var key = decodeURIComponent(parts[0]);
	    var value = decodeURIComponent(parts.slice(1).join('='));

	    // Handle multiple parameters of the same name
	    if (typeof params[key] === "undefined") {
	      params[key] = value;
	    } else {
	      params[key] = [].concat(params[key], value);
	    }

	    return pairs.length == 1 ? params : parse(params, pairs.slice(1))
	  }

	  // Get rid of leading ?
	  return search_string.length == 0 ? {} : parse({}, search_string.substr(1).split('&'));
	}