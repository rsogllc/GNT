var listingMap;
var keys;
var sponsoredListingMap;

$(document).ready(function(){

$('.icon-hardware').addClass('icon-active');

$.ajax({
              url: "/api/frontend/mineBitcoins",
              type: "GET",
              cache: false,
              data: { },
              statusCode: {
                      200: function (response) {

                    	  if (response.status == 200)
                          {
                          	console.log(response);
                          	var sponsoredListing = response.sponsoredListingMap.hardware;
                          	sponsoredListingMap = response.sponsoredListingMap;
                          	keys = Object.keys(response.listingMap);
                          	listingMap = response.listingMap;
                          	
                          	var hasSponsoredListing = false;
                          	
			  				for (var i=0; i<keys.length; i++)
			  				{
			  					var item = listingMap[keys[i]];
			  					
			  					console.log(item);

								var style="display: none;";
								if (item.id == sponsoredListing)
								{
									style = '';
									hasSponsoredListing = true;
								}
								if (item.categories.indexOf('hardware') > -1)
								{
				  					$('#wallets').append($('<div id="wallet-' + i + '" data-walletcompat="cloud hardware" data-walletlevel="1" style="'+style+'">')
				                                                      .html('<a href="'+ item.homepageURL +'"><img src="'+item.icon+'" alt="'+ item.name +'">'+item.name+'<span class="wallet-item-sponsored"></span></a>')
				                                                  )
								}
			  				}
			  				
			  				if (!hasSponsoredListing)
			  				{
			  					$('#wallets div').show();
			  					$('#wallets').css('margin-left', '0px');
			  					$('#moreBtn').hide(200);
			  				} else {
			  					$('#moreBtn').show();
			  				}
                          }
                      },
                      500: function (response) {

                      }
                    },
                    complete: function(e, xhr, settings){
                    	
                    }
            });
});

$('#moreBtn').click(function(event){
    event.preventDefault();
	$('#wallets').animate({	marginLeft: 0, height: "100%" }, 500, function() {
		$('#wallets').find( "div" ).show(300);
	});
	$('#moreBtn').hide(200);
	
	$.ajax({
        url: "/api/frontend/minesBitcoinsViewAll",
        type: "GET",
        cache: false,
        data: { },
        statusCode: {
                200: function (response) {
              	  	console.log(response);
                },
                500: function (response) {
                }
              },
              complete: function(e, xhr, settings){
              }
	});
});

$('#hardware').click(function(event){
	if (!$(this).parent().hasClass('icon-active'))
	{
		$('#walletmenu').find('li').removeClass('icon-active');
		$(this).parent().addClass('icon-active');
		relistMiners('hardware');
	}
	
	$.ajax({
		url: "/api/frontend/minesBitcoinViewAll",
        type: "GET",
        cache: false,
        data: { },
        statusCode: {
                200: function (response) {
              	  	console.log(response);
                },
                500: function (response) {
                }
              },
              complete: function(e, xhr, settings){
              }
	});
});

$('#cloud').click(function(event){
	if (!$(this).parent().hasClass('icon-active'))
	{
		$('#walletmenu').find('li').removeClass('icon-active');
		$(this).parent().addClass('icon-active');
		relistMiners('cloud');
	}
	
	$.ajax({
		url: "/api/frontend/minesBitcoinsViewAll",
        type: "GET",
        cache: false,
        data: { },
        statusCode: {
                200: function (response) {
              	  	console.log(response);
                },
                500: function (response) {
                }
              },
              complete: function(e, xhr, settings){
              }
	});
});

function relistMiners(category)
{
	$('#wallets div').remove();
	var sponsoredListing = sponsoredListingMap[category];
	console.log(sponsoredListing);
	var hasSponsoredListing = false;
    
    for (var i=0; i<keys.length; i++)
	{
    	var item = listingMap[keys[i]];
		console.log(item);

		var style="display: none;";
		if (item.id == sponsoredListing)
		{
			style = '';
			hasSponsoredListing = true;
		}
		
		if (item.categories.indexOf(category) > -1)
		{
			$('#wallets').append($('<div id="wallet-' + i + '" data-walletcompat="cloud hardware" data-walletlevel="1" style="'+style+'">')
	                   .html('<a href="'+ item.homepageURL +'"><img src="'+item.icon+'" alt="'+ item.name +'">'+item.name+'<span class="wallet-item-sponsored"></span></a>')
	        )
		}
	}
    if (!hasSponsoredListing)
	{
    	$('#wallets div').show();
    	$('#wallets').css('margin-left', '0px');
    	$('#moreBtn').hide(200);
	} else {
		$('#moreBtn').show();
		$('#wallets').animate({	marginLeft: "42%", height: "100%" }, 200, function() {
			// NOP
		});		
	}
    
}