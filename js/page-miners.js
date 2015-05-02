var listingMap;
var keys;
var sponsoredListingMap;

$(document).ready(function(){

$.ajax({
              url: "https://www.btc.org/api/listing/mineBitcoins",
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
			  				for (var i=0; i<keys.length; i++)
			  				{
			  					var item = listingMap[keys[i]];
			  					
			  					console.log(item);

								var style="display: none;";
								if (item.id == sponsoredListing)
								{
									style = '';
								}
			  					$('#wallets').append($('<div id="wallet-' + i + '" data-walletcompat="cloud hardware" data-walletlevel="1" style="'+style+'">')
			                                                      .html('<a href="'+ item.homepageURL +'"><img src="'+item.faviconURL+'" alt="'+ item.name +'">'+item.name+'<span class="wallet-item-sponsored"></span></a>')
			                                                  )
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
	$('#wallets').animate({	marginLeft: 0, height: "100%" }, 1000, function() {
		console.log("Done");
		$('#wallets').find( "div" ).show(500);
	});
});

$('#hardware').mouseenter(function(event){
    console.log("Enter hw");
    relistMiners('hardware');
});

$('#cloud').mouseenter(function(event){
    console.log("Enter klåd");
    relistMiners('cloud');
});

function relistMiners(category)
{
	$('#wallets div').remove();
	var sponsoredListing = sponsoredListingMap[category];
	console.log(sponsoredListing);
    
    for (var i=0; i<keys.length; i++)
	{
    	var item = listingMap[keys[i]];
		console.log(item);

		var style="display: none;";
		if (item.id == sponsoredListing)
		{
			style = '';
		}
		
		if (item.categories.indexOf(category) > -1)
		{
			$('#wallets').append($('<div id="wallet-' + i + '" data-walletcompat="cloud hardware" data-walletlevel="1" style="'+style+'">')
	                   .html('<a href="'+ item.homepageURL +'"><img src="'+item.faviconURL+'" alt="'+ item.name +'">'+item.name+'<span class="wallet-item-sponsored"></span></a>')
	        )
		}
	}
}