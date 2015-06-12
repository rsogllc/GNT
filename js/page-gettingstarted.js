$(document).ready(function(){
	
	setSpendButtonLink();
	
});


function setSpendButtonLink() {
	$.ajax({
		url: "/api/frontend/spendBitcoins",
        type: "GET",
        cache: false,
        data: { },
        statusCode: {
                200: function (response) {
              	  	
              	  	var url = response.localListings[0].homepageURL;
              	  	var name = response.localListings[0].name;
              	  	var id = response.localListings[0].id;
              	  	var promo = 'NULLPROMO';
              	  	
              	  	for (var i=0; i<response.campaigns.general.length; i++)
              	  	{
              	  		var item = response.campaigns.general[i];
              	  		if (item.tagname == id)
              	  		{
              	  			promo = item.promoCode
              	  		}
              	  	}
              	  	
              	  	var promoUrl = '/url?promo='+ promo +'&url=' + url;
              	  	
              	  	$('#spendbtn').attr('href', promoUrl);
              	  	$('#spendbtn').html('Spend bitcoins at ' + name);
              	  	
                },
                500: function (response) {
                }
              },
              complete: function(e, xhr, settings){
              }
	});
}