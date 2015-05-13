var listLoaded;
var articleLoaded;
var articleId;
var linkClicked = false;
var statePoped = false;

$(document).ready(function(){
	
	listLoaded = false;
	articleLoaded = false;
	
	listNewsItems();
	
	articleId = document.URL.substr(document.URL.lastIndexOf('/')+1);
	
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
	            	
	            	// $('.news-featured .latest-stories .latest-story').remove();
	            	
	            	var newsListLength = response.items.length;
	            	if (newsListLength > 10)
	            	{
	            		newsListLength = 10;
	            	}
	            	
	            	for (var i=0; i<newsListLength; i++)
	            	{
	            		if (response.items[i].labels != null && response.items[i].labels.indexOf('news') != -1)
	            		{
	            			var articleItem = response.items[i];
	            			
	            			var storyItem = $('#latest-story-template').clone();
	            			
	            			$(storyItem).removeAttr('id');
	            			$(storyItem).data('articleid', articleItem.id);
	            			$(storyItem).find('.date').html(prettyDate(articleItem.published));
	            			$(storyItem).find('img').attr('src', articleItem.images[0].url);
	            			$(storyItem).find('a').attr('href', articleItem.id);
	            			$(storyItem).find('a').html(articleItem.title);
	            			
	            			if (articleItem.id == articleId)
	            			{
	            				$(storyItem).hide();
	            			}
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
	        	  
	        	  if (listLoaded && articleLoaded)
	        	  {
	        		  $('.starthidden').fadeTo( 300 , 1, function() {
	        			  // Animation complete
	        		  });	        		 
	        	  }
	          }
	});
}

$('div').on('click', '.article-link', function(event) {
	event.preventDefault();
	if (linkClicked != true) {
		linkClicked = true;
		console.log($(this).attr('href'));
		var articleId = $(this).attr('href');
		$('.lead-story').fadeTo( 300 , 0, function() {
			getArticle(articleId);
			$('#right-story-container .latest-story').show(600);
			$('#right-story-container .latest-story a[href='+articleId+']').parent().hide(600);
		});
	}
});

window.onpopstate = function(e){
	console.log(e);
    if (e.state && !linkClicked)
    {
    	var articleId = e.state;
    	statePoped = true;
    	getArticle(articleId);
		$('#right-story-container .latest-story').show(600);
		$('#right-story-container .latest-story a[href='+articleId+']').parent().hide(600);
    }
};

function getArticle(articleId) {
	console.log("/api/news/post/" + articleId);
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
	            	
	            	$('#article-timestamp span').eq(0).html(prettyDate(response.published));
	            	$('#article-timestamp span').eq(1).html(prettyDate(response.updated));
	            	
	            	$('#byline').html('Writen by ' + response.author.displayName);
	            	
	            	if (!statePoped)
	            	{
	            		window.history.pushState(response.id, response.title, response.id);
	            	} else {
	            		statePoped = false;	            		
	            	}
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
	        			  
	        		  });
	        		  $('.lead-story').fadeTo( 300 , 1, function() {
	        			  
	        		  });
	        	  }
	        	  getComments(articleId);
	        	  linkClicked = false;
	          }
	});
}

function getComments(articleId) {
	$.ajax({
	    url: "/api/news/comments/" + articleId,
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	console.log(response);
	            	var comment = document.createElement('div');
	            	$(comment).html($('#comment-template').html());
	            	
	            	if ('items' in response)
	            	{
	            		for (var i=0; i<response.items.length; i++)
	            		{
	            			var comment = document.createElement('div');
	            			$(comment).html($('#comment-template').html());
	            			$(comment).addClass('tertiary-story');
	            				
	            			var commentData = response.items[i];
	            			var author = commentData.author.displayName
	            				
	            			$(comment).find('.headline').html(author + ' says:');
	            			$(comment).find('.description').html(commentData.content);
	            			$(comment).find('.date').html(prettyDate(commentData.published));
	            				
	            			$('#comment-container').append($(comment));
	            		}
	            	} else {
	            		var comment = document.createElement('h2');
            			$(comment).html('No comments');
            			$('#comment-container').html($(comment));
	            	}
	            	$('#comment-template').remove();
	            	$('.html-template').remove();
	            },
	            500: function (response) {
	            	console.log(response);
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  
	          }
	});
}