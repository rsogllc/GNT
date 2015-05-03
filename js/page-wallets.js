$(document).ready(function(){
	
	$('.checkcontrol .checkfail').addClass('danger');
	
});

$("#wallets").on('click', 'a', function(event){
	console.log("Hehu");
	$('div.checkcontrol.checkfail').addClass('danger');
});