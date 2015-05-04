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
    $http.get("https://www.btc.org/api/listing/buyBitcoins")
    .success(function(response) {
      //console.log(response);
      $scope.exchange = response;
      LocalData.getValue(response);
      //console.log(LocalData);
    });
});

app.controller('exchangeLocationCtrl', function($scope, LocalData, $http) {
    //$http.get("./buy.json")
    $http.get("https://www.btc.org/api/listing/countryList")
    .success(function(response) {
      //console.log(response);
      $scope.countries = response;
      LocalData.getCountries(response);
      $scope.localData = LocalData.getValue();
      //console.log($scope.localData);
    });

    $scope.update = function( value ) {
      for( var prop in $scope.countries ) {
          if( $scope.countries.hasOwnProperty( prop ) ) {
               if( $scope.countries[ prop ] === value )
               //$http.get("./buy.json")
               $http.get("https://www.btc.org/api/listing/buyBitcoins?country="+prop)
               .success(function(response) {
                 LocalData.getValue(response);
                 //console.log($scope.localData);
               });
          }
      }
    }
});

app.controller('exchangeListingCtrl',function($scope, LocalData, $http) {
  $scope.localData = LocalData.getValue();
});

app.controller('exchangeTreeviewCtrl',function($scope, LocalData, $http) {
  $http.get("https://www.btc.org/api/listing/regionMap")
  .success(function(response) {
    $scope.regions = response.data;
  });

  $scope.countries = LocalData.getCountries();

  $scope.getCountryFromCode = function( value ) {
    return $scope.countries.countries[value];
  }

  $scope.showListings = function(countryCode) {
    $http.get("https://www.btc.org/api/listing/buyBitcoins?country="+countryCode)
    .success(function(response) {
      LocalData.getValue(response);
      //console.log($scope.localData);
    });
  }
});
