
$(document).ready(function(){
	
	var qrcode = new QRCode("qrcode", {
	    text: "1MVEfs8QLgLWZbHF62rjy7qnjHR4Bfe3MY",
	    width: 144,
	    height: 144,
	    colorDark : "#000000",
	    colorLight : "#ffffff",
	    correctLevel : QRCode.CorrectLevel.H
	});

	$.ajax({
              url: "/api/frontend/chooseYourWalletDonation",
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
