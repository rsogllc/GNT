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
});