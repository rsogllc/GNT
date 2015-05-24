var qrClicked;

$(document).ready(function(){
	
	qrClicked = false;
	
	var selectedWallet = window.location.hash.substr(1);

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
			  					var divId = 'wallet' + item.id;
			  					$(wallet).attr('id', divId);
			  					$(wallet).find('.walletlogo img').attr('src', item.icon);
			  					$(wallet).find('h2').html(item.name);
			  					$(wallet).find('b.address').html(item.btcaddr);
			  					$(wallet).find('#bitcoin-uri').attr('href', 'bitcoin:' + item.btcaddr);
			  					$(wallet).find('.qrcodeshow').data('address', item.btcaddr)
			  					$(wallet).find('.qrcodeshow').data('qrid', item.id)
			  					
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
			  					
			  					/*
			  					var qrcode = new QRCode(qrId, {
			  					    text: item.btcaddr,
			  					    width: 144,
			  					    height: 144,
			  					    colorDark : "#000000",
			  					    colorLight : "#ffffff",
			  					    correctLevel : QRCode.CorrectLevel.H
			  					});
			  					*/
			  				}
                    	  
                      },
                      500: function (response) {

                      }
                    },
                    complete: function(e, xhr, settings){
                    	
                    	$('#loader').hide();
                    	
                    	if (selectedWallet != null && selectedWallet != '')
                    	{
                    		var walletId = '#wallet' + selectedWallet;
                    		var offset = $(walletId).offset().top;
                    		
                    		$("html, body").animate({ scrollTop: $(walletId).offset().top - 100 }, 1000);                    		
                    	}
                    }
	});
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
			    text: $(this).data('address'),
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