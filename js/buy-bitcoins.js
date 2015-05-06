// Jquery stuff

$(document).ready(function(){
	
	/*
	<div class="exchange-listing" data-listid="" id="listing-">
      <div class="exchange-listing-right">
          <div class="exchange-listing-title"><img src="">Name</div>
          <div class="exchange-listing-description">
            DESC
          </div>
          <a href="{% raw %}/url?promo={{listing.id}}-{{localData.val.countryCode}}&url={{listing.homepageURL}}{% endraw %}"><div class="exchange-listing-button">Buy bitcoin</div></a>
      </div>
  	</div>

	*/
	$.ajax({
	    url: "/api/listing/buyBitcoins",
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	console.log('jkväry');
	            	console.log(response);
	            	
	            	$('#listingsloader').hide();
	            	
	            	for (var i=0; i<response.localListings.length; i++) {
	            		var listingData = response.localListings[i];
	            		
	            		$('#exchange-listing-container').append($('<div class="exchange-listing" data-listid="'+listingData.id+'" id="listing-'+listingData.id+'">')
	            			.append($('<div class="exchange-listing-right">')
	            				.append($('<div class="exchange-listing-title"><img src="'+listingData.faviconURL+'">'+listingData.name+'</div>'+
	            						'<div class="exchange-listing-description">'+listingData.description+'</div>'+
	            						'<a href="{% raw %}/url?promo='+listingData.id+'-'+response.countryCode+'&url='+listingData.homepageURL+'"><div class="exchange-listing-button">Buy bitcoin</div></a>')
	            				)
	            			)
	            		);
	            	}
	            	console.log(response.sponsoredListing);
	            	$('.exchange-listing').hide();
	            	var sponsoredId = '#listing-' + response.sponsoredListing;
	            	$(sponsoredId).show();
	            	$(sponsoredId).css('width', '900px');
	            },
	            500: function (response) {
	
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  
	          }
	});

});

$(document).on("click", "#show-more", function(event) {
    event.preventDefault();
    
    $('#exchange-listing-container').children('.exchange-listing').each(function () {
    	console.log($(this).height());
        if ($(this).width() > 275)
        {
        	$(this).animate({ width: "275px"}, 500, function() {
        		var maxHeight = 0;
        		$('#exchange-listing-container').children('.exchange-listing').each(function () {
        	    	if ($(this).height() > maxHeight)
        	    	{
        	    		maxHeight = $(this).height();
        	    	}
        	    });
        		$('.exchange-listing').height(maxHeight);
        		$('.exchange-listing').show(300);
        	});
        }
    });
});

var app = angular.module('buyBitcoins', []);

app.factory('LocalData', function() {
  var obj = {}
  return {

  getValue: function(update) {
      var defaultValue = '';

      if( typeof(update)==='undefined') {
        obj.val = {
            city : '',
            regionCode: '',
            countryCode: '',
            country: ''
        };
      } else {
        obj.val = update;
      }
     //console.log('should be changed to', update);
     return obj;
   },

  getCountries: function(update) {
    var defaultValue = '';

    if( typeof(update)==='undefined') {
      obj.countries = {};
    } else {
      obj.countries = update;
    }
    //console.log('should be changed to', update);
    return obj;
    }
  }
});


app.controller('exchangeStatsCtrl', function($scope, LocalData, $http) {
    //$http.get("./buy.json")
    /*
	$http.get("/api/listing/buyBitcoins")
    .success(function(response) {
      //console.log(response);
      $scope.exchange = response;
      LocalData.getValue(response);
      console.log(response);
      console.log('lax');
      $('.exchange-listing .ng-scope').css('display', 'none');
      $('#listing-' + response.sponsoredListing).show();
      console.log('#listing-' + response.sponsoredListing)
      $('#listing-' + response.sponsoredListing).css('width', '900px');
      $('#exchange-listing-container').children().hide();
      console.log($('#exchange-listing-container').children().css('background', 'red'));
      $('.exchange-listing').css('background', 'red');
      
    });
    */
});


app.controller('exchangeLocationCtrl', function($scope, LocalData, $http) {
    //$http.get("./buy.json")
    $http.get("/api/listing/countryList")
    .success(function(response) {
      //console.log(response);
      $scope.countries = response;
      LocalData.getCountries(response);
      $scope.localData = LocalData.getValue();
      //console.log($scope.localData);
      console.log(response);
    });

    $scope.update = function( value ) {
      for( var prop in $scope.countries ) {
          if( $scope.countries.hasOwnProperty( prop ) ) {
               if( $scope.countries[ prop ] === value )
               //$http.get("./buy.json")
            	   
               $http.get("/api/listing/buyBitcoins?country="+prop)
               .success(function(response) {
                 LocalData.getValue(response);
                 // console.log($scope.localData);
                 var baseText = $('#featuredH1').data('text');
                 $('#featuredH1').html(baseText.replace("@", response.localizedCountryName));
               });
          }
      }
    }
});

app.controller('exchangeListingCtrl',function($scope, LocalData, $http) {
  $scope.localData = LocalData.getValue();
});

app.controller('exchangeTreeviewCtrl',function($scope, LocalData, $http) {
  $http.get("/api/listing/regionMap")
  .success(function(response) {
    $scope.regions = response.data;
    console.log(response);
    // exchange-listing
  });

  $scope.countries = LocalData.getCountries();

  $scope.getCountryFromCode = function( value ) {
    return $scope.countries.countries[value];
  }

  $scope.showListings = function(countryCode, event) {
	event.preventDefault();
	if ($scope.showEU != null)
		$scope.showEU = false;
	if ($scope.showNA != null)
		$scope.showNA = false;
	if ($scope.showCR != null)
		$scope.showCR = false;
	if ($scope.showAF != null)
		$scope.showAF = false;
	if ($scope.showSA != null)
		$scope.showSA = false;
	if ($scope.showOP != null)
		$scope.showOP = false;
	if ($scope.showME != null)
		$scope.showME = false;
	if ($scope.showAS != null)
		$scope.showAS = false;
	
	/*
    $http.get("/api/listing/buyBitcoins?country="+countryCode)
    .success(function(response) {
      LocalData.getValue(response);
      console.log(response);
      console.log($scope);
      var baseText = $('#featuredH1').data('text');
      $('#featuredH1').html(baseText.replace("@", response.localizedCountryName));
      
    });
    */
	$.ajax({
	    url: "/api/listing/buyBitcoins?country="+countryCode,
	    type: "GET",
	    cache: false,
	    data: { },
	    statusCode: {
	            200: function (response) {
	            	console.log(response);
	            	var baseText = $('#featuredH1').data('text');
	            	$('#featuredH1').html(baseText.replace("@", response.localizedCountryName));
	            	
	            	$('#listingsloader').hide();
	            	$('.exchange-listing').remove();
	            	
	            	for (var i=0; i<response.localListings.length; i++) {
	            		var listingData = response.localListings[i];
	            		
	            		$('#exchange-listing-container').append($('<div class="exchange-listing" data-listid="'+listingData.id+'" id="listing-'+listingData.id+'">')
	            			.append($('<div class="exchange-listing-right">')
	            				.append($('<div class="exchange-listing-title"><img src="'+listingData.faviconURL+'">'+listingData.name+'</div>'+
	            						'<div class="exchange-listing-description">'+listingData.description+'</div>'+
	            						'<a href="{% raw %}/url?promo='+listingData.id+'-'+response.countryCode+'&url='+listingData.homepageURL+'"><div class="exchange-listing-button">Buy bitcoin</div></a>')
	            				)
	            			)
	            		);
	            	}
	            	console.log(response.sponsoredListing);
	            	$('.exchange-listing').hide();
	            	var sponsoredId = '#listing-' + response.sponsoredListing;
	            	$(sponsoredId).show();
	            	$(sponsoredId).css('width', '900px');
	            },
	            500: function (response) {
	
	            }
	          },
	          complete: function(e, xhr, settings){
	        	  
	          }
	});
  }
  
	    $scope.gotoBottom = function() {
	      // set the location.hash to the id of
	      // the element you wish to scroll to.
	      $location.hash('exchange-listing-container');

	      // call $anchorScroll()
	      $anchorScroll();
	    };
});