var country;
var featuredExchange;
var availableExchanges = ['bitstamp', 'kraken'];

$(document).ready(function(){
	
	$.ajax({
	    url: "/api/frontend/buyBitcoins",
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	console.log(response);
	            	
	            	country = response.countryCode;
	            	featuredExchange = response.sponsoredListing;
	            	
	            	// If exchange does not exist
	            	if (availableExchanges.indexOf(featuredExchange) == -1)
	            	{
	            		featuredExchange = 'bitstamp';
	            	}
	            	
	            },
	            500: function (response) {
	            	console.log(response);
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  getTicker();
	        	  setInterval(function(){ getTicker(); }, 60000);
	          }
	});
	
});

function getTicker() {
	$.ajax({
	    url: "/api/ticker/" + featuredExchange,
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	console.log(response);
	            	
	            	var last = parseFloat(response.last).toFixed(2);
	            	var high = parseFloat(response.high).toFixed(2);
	            	var low = parseFloat(response.low).toFixed(2);
	            	var currency = response.currency;
	            	var change = ( parseFloat(response.vwap) / parseFloat(response.high) -1 ) * 100;
	            	var triangle = ' ▼';
	            	change = change.toFixed(2);
	            	
	            	if (response.currency == 'USD')
	            	{
	            		$('.news-header-bitcoin-price div.quote').html('$' + last);
	            		$('.news-header-bitcoin-price span.daily-high').html('HI: $' + high);
	            		$('.news-header-bitcoin-price span.daily-low').html('LOW: $' + low);
	            	} else if (response.currency == 'EUR') {
	            		$('.news-header-bitcoin-price div.quote').html(last + '€');
	            		$('.news-header-bitcoin-price span.daily-high').html('HI: ' + high + '€');
	            		$('.news-header-bitcoin-price span.daily-low').html('LOW: ' + low + '€');
	            	}
	            	
	            	if (change > 0)
            		{
            			triangle = ' ▲';
            			$('.news-header-bitcoin-price span.change').removeClass('down');
            			$('.news-header-bitcoin-price span.change').addClass('up');
            		}
	            	$('.news-header-bitcoin-price span.currency').html(currency + triangle);
            		$('.news-header-bitcoin-price span.change').html(change +'%'+ triangle);
            		$('div.news-header-ad-unit-300x100 img').attr('src', '/img/news/exchange/' + response.exchange + '.png')
	            },
	            500: function (response) {
	            	console.log(response);
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  $('.news-header-bitcoin-price').fadeTo( 200 , 1, function() {
	        		    
	        	  });
	        	  $('.news-header-ad-unit-300x100').fadeTo( 200 , 1, function() {
	        		    
	        	  });
	          }
	});
}