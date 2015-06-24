var qrClicked;
var countries = ['US', 'GB', 'CN', 'JP'];
var loadedCountries = [];
var loadedExchanges = [];

$(document).ready(function(){
	
	qrClicked = false;
	
	loadExchanges(null);
	
});


$('div').on('click', '.qrcodeshow', function(event){
	event.preventDefault();
	
	if (!qrClicked)
	{
		qrClicked = true;
		var qrId = 'qr' + $(this).data('qrid');
		
		$('.walletqr').find('img').hide();
		$('a.qrcodeshow').show();
		$('a.qrcodeshow').find('img').show();
		
		$(this).hide();
		
		var qrcode = new QRCode(qrId, {
			    text: 'bitcoin:' + $(this).data('address'),
			    width: 144,
			    height: 144,
			    colorDark : "#000000",
			    colorLight : "#ffffff",
			    correctLevel : QRCode.CorrectLevel.H
			});
		setTimeout(function (){
			qrClicked = false;
		}, 500);
	}
});

function loadExchanges(country) {
	
	var url = '/api/frontend/buyBitcoins';
	if (country != null)
	{
		url = url + '?country=' + country;
		countries.shift();
	}
	
	$.ajax({
        url: url,
        type: "GET",
        cache: false,
        data: { },
        statusCode: {
                200: function (response) {

              	  	loadedCountries[loadedCountries.length] = response.countryCode;
              	  	
              	  	keys = Object.keys(response);
              	  	walletMap = response;
              	  	
              	  	var walletWarray = [];
              	  	var keyOrder = [];
                  	
		  				
		  				for (var i=0; i<response.localListings.length; i++)
		  				{
		  					var item = response.localListings[i];
		  					
		  					if (loadedExchanges.indexOf(item.id) == -1)
		  					{
		  						var wallet = $('.walletinfo').first().clone();
		  						var divId = 'wallet' + item.id;
		  						$(wallet).attr('id', divId);
		  						$(wallet).find('.walletlogo img').attr('src', item.icon);
		  						$(wallet).find('h2').html(item.name);
		  						$(wallet).find('b.address').html(item.btcaddr);
		  						$(wallet).find('#bitcoin-uri').attr('href', 'bitcoin:' + item.btcaddr);
		  						$(wallet).find('#bitcoin-be-url').attr('href', 'https://blockchain.info/address/' + item.btcaddr);
		  						$(wallet).find('.qrcodeshow').data('address', item.btcaddr);
		  						$(wallet).find('.qrcodeshow').data('qrid', item.id);
		  						$(wallet).find('.exchangebrief').html(item.description);
		  						
		  						var qrId = 'qr' + item.id;
		  						$(wallet).find('.walletqr').attr('id', qrId);
		  						$(wallet).show();
		  						$(wallet).attr('style', '');
		  						$('#walletlist').append($(wallet));
		  						
		  						loadedExchanges[loadedExchanges.length] = item.id;
		  					}
		  					
		  				}
              	  
                },
                500: function (response) {
                }
              },
              complete: function(e, xhr, settings){
              	
              	$('#loader').hide();
              	
              	while (loadedCountries.indexOf(countries[0]) > -1)
              	{
              		countries.shift();
              	}
              	
              	if (countries.length > 0)
              	{
              		var newCountry = countries[0];
              		loadExchanges(newCountry);		
              	}
              }
	});
}