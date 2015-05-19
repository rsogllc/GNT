
$(document).ready(function(){
	
	/*
	var qrcode = new QRCode("qrcode", {
	    text: "1MVEfs8QLgLWZbHF62rjy7qnjHR4Bfe3MY",
	    width: 144,
	    height: 144,
	    colorDark : "#000000",
	    colorLight : "#ffffff",
	    correctLevel : QRCode.CorrectLevel.H
	});
	*/

	$.ajax({
              url: "/api/frontend/chooseYourWalletDonation",
              type: "GET",
              cache: false,
              data: { },
              statusCode: {
                      200: function (response) {

                    	  	console.log(response);
                    	  
                    	  	keys = Object.keys(response);
                    	  	walletMap = response;
                        	
			  				for (var i=0; i<keys.length; i++)
			  				{
			  					var item = walletMap[keys[i]];
			  					
			  					console.log(item);
			  					
			  					var wallet = $('.walletinfo').first().clone();
			  					var divId = 'wallet' + item.name;
			  					$(wallet).attr('id', divId);
			  					$(wallet).find('.walletlogo img').attr('src', item.icon);
			  					$(wallet).find('h2').html(item.name);
			  					$(wallet).find('.address').html(item.btcaddr);
			  					
			  					var platforms = 'Available for ';
			  					var platformItems = 0;
			  					
			  					for (var j=0; j<item.categories.length; j++)
			  					{
			  						if ((item.categories[j] == 'default' || item.categories[j] == 'mobile' || item.categories[j] == 'desktop') == false)
			  						{
			  							if (platformItems>0)
				  							platforms += ', ';
			  							
			  							platformItems++;
			  							
			  							if (item.categories[j] == 'bank')
			  							{
			  								platforms = 'Available as bank service';
			  							} else {
			  								platforms += item.categories[j];
			  							}
			  						}
			  					}
			  					$(wallet).find('.platforms').html(platforms);
			  					
			  					var qrId = 'qr' + item.id;
			  					$(wallet).find('.walletqr').attr('id', qrId);
			  					$(wallet).show();
			  					$(wallet).attr('style', '');
			  					$('#walletlist').append($(wallet));
			  					
			  					var qrcode = new QRCode(qrId, {
			  					    text: item.btcaddr,
			  					    width: 144,
			  					    height: 144,
			  					    colorDark : "#000000",
			  					    colorLight : "#ffffff",
			  					    correctLevel : QRCode.CorrectLevel.H
			  					});
			  					
			  				}
                    	  
                      },
                      500: function (response) {

                      }
                    },
                    complete: function(e, xhr, settings){
                    	
                    }
	});
});
