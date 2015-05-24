$(document).ready(function(){
	
	$('.checkcontrol .checkfail').addClass('danger');
	
});

$("#wallets").on('click', 'a', function(event){
	$('div.checkcontrol.checkfail').addClass('danger');
});

$("#walletmenu").on('click', 'a', function(event){
	console.log("Clicked category");
	console.log($(this).data('walletcompat'));
	walletShowPlatform($(this).data('walletcompat'));
	var category = $(this).data('walletcompat');
	$('.walletsdisclaimer').hide();
	if (category == 'android' || category == 'ios' || category == 'blackberry')
	{
		category = 'mobile';
	}

	$('.walletsdisclaimer[data-disclaimer="'+ category +'"]').show();
	
	$.ajax({
        url: "/api/frontend/chooseYourWalletViewAll",
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

$(document).on('click', 'body', function(event){
	if ($(event.target).parents('.modalopen').length == 0)
	{
		closeModal();
	}
});

$(document).keyup(function(e) {
	  if (e.keyCode == 27)
		  closeModal();
});

function closeModal() {
	if ($('#wallets div').hasClass('modalopen'))
	{
		$('#wallets div.modalopen a span').css('display', '');
		$('#wallets div').removeClass('modalopen');
	}
}