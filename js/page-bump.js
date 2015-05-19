
$(document).ready(function(){

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
