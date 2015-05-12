var listLoaded;
var articleLoaded;

$(document).ready(function(){
	
	listLoaded = false;
	articleLoaded = false;
	
	listNewsItems();
	
	var articleId = document.URL.substr(document.URL.lastIndexOf('/')+1);
	
	if (articleId != null)
	{
		getArticle(articleId);
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
	            	
	            	var hasPrimary = false;
	            	var hasSecondary = false;
	            	var hasVOTD = false;
	            	var secondaryHeadlines = [0, 0, 0, 0];
	            	var usedArticles = [];
	            	var secondaryHeadlineLocations = [0, 1, 3, 4];
	            	
	            	$('.news-featured .latest-stories .latest-story').remove();
	            	
	            	var newsListLength = response.items.length;
	            	if (newsListLength > 10)
	            	{
	            		newsListLength = 10;
	            	}
	            	
	            	for (var i=0; i<newsListLength; i++)
	            	{
	            		if (response.items[i].labels != null && response.items[i].labels.indexOf('news') != -1)
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
	        	  
	        	  listLoaded = true;
	        	  
	        	  if (listLoaded && articleLoaded)
	        	  {
	        		  $('.starthidden').fadeTo( 300 , 1, function() {
	        			  // Animation complete
	        		  });	        		 
	        	  }
	          }
	});
}

function getArticle(articleId) {
	$.ajax({
	    url: "/api/news/post/" + articleId,
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	console.log(response);
	            	var content = document.createElement('div');
	            	$(content).html(response.content);
	            	
	            	// Take the first image, place it first and remove it
	            	$(content).find('img').first().remove();
	            	$('.news-featured .lead-story .pure-img').attr('src',response.images[0].url);
	            	
	            	$('#textcontent').html($(content).html());
	            	$('.news-featured .lead-story h1').html(response.title);
	            	
	            	
	            },
	            500: function (response) {
	            	console.log(response);
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  articleLoaded = true;
	        	  
	        	  if (listLoaded && articleLoaded)
	        	  {
	        		  $('.starthidden').fadeTo( 300 , 1, function() {
	        			  // Animation complete
	        		  });	        		 
	        	  }
	          }
	});
}