	// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('index',{
		url: '/index',
		templateUrl: 'templates/menu.html',
		//controller: 'AppCtrl'
	})
		.state('list',{
		url: '/list',
		templateUrl: 'templates/list.html',
		controller: 'PlaylistCtrl'
	})
		.state('history',{
		url: '/history',
		templateUrl: 'templates/history.html',
		//controller: 'AppCtrl'
	})
		.state('set',{
		url: '/set',
		templateUrl: 'templates/set.html',
		controller: 'AppCtrl'
	})
		/*.state('admin',{
		url: '/admin',
			templateUrl: 'templates/admin.html',
		controller: 'AdminCtrl'
	})*/
	
		.state('insert_list',{
		url: '/insert_list',
			templateUrl: 'templates/insert_list.html',
		controller: 'listCtrl'
	})

		.state('edit_admin',{
		url: '/edit_admin',
			templateUrl: 'templates/edit_admin.html',
		controller: 'editCtrl'
	})
		.state('del_admin',{
		url: '/del_admin',
			templateUrl: 'templates/del_admin.html',
		controller: 'Admin_delCtrl'
	})
		.state('insert_admin',{
		url: '/insert_admin',
			templateUrl: 'templates/insert_admin.html',
		controller: 'AdminCtrl'
	})
		.state('login',{
		url: '/login',
			templateUrl: 'templates/login.html',
		controller: 'AppCtrl'
	})
	$urlRouterProvider.otherwise('/login');
	
	})
		

	

.controller('AppCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.login={};

 $scope.doLogin=function(){
      var admin_user=$scope.login.username;
      var admin_password=$scope.login.password;
      console.log(admin_user);
      if(admin_user && admin_password){
          str=url+"login.php?username="+admin_user+"&password="+admin_password;
          $http.get(str)
            .success(function(response){

                $scope.admin=response.records;
                sessionStorage.setItem('loggedin_status',true);
                sessionStorage.setItem('loggedin_id',$scope.admin.admin_id);
                sessionStorage.setItem('loggedin_status',$scope.admin.admin_user);
				
                $ionicHistory.nextViewOptions({
                  disableAnimate:true,
                  disableBack:true
                })

                $ionicPopup.alert({
                  title:'��͡�Թ',
                  template:'�Թ�յ�͹�Ѻ�������к�'
                })

                $state.go('list',{},{location:"replace",reload:true});
            })
            .error(function(){

              $ionicPopup.alert({
                title:'��͡�Թ',
                template:'�������ö��͡�Թ�� ��سҵ�Ǩ�ͺ'
              })
            });

      }else{
        $ionicPopup.alert({
          title:'��͡�Թ',
          template:'��سҡ�͡���������ú'
        })

      }

  }
})



.controller('PlaylistCtrl',function($scope,$http){

	$scope.datalist=[];
	$scope.url="http://localhost/ionic_php/loaddata.php";
	$http.get($scope.url)
		.success(function(data){
		$scope.datalist=data;
	})
		.error(function(data){
		console.log("erorr");
	});
})



.controller('AdminCtrl',function($scope,$http){
var url="http://localhost/ionic_php/";
	$scope.admin=[];
	 $scope.createAdmin=function(){
      var admin_user=$scope.admin.admin_user;
      var admin_password=$scope.admin.admin_password;
      console.log(admin_user);
	  str=url+"admin-insert.php?username="+admin_user+"&password="+admin_password;
       $http.get(str)
		.success(function(data){
		if(data==true)
		console.log("OK");
	})
		.error(function(data){
		console.log("Erorr");
	});
	
	
	}
})

.controller('listCtrl',function($scope,$state,$ionicPopup,$http,$ionicHistory){
var url="http://localhost/ionic_php/";
	$scope.Listdata=[];
	 $scope.Listdata=function(){
      var fname=$scope.listData.fname;
      var lname=$scope.listData.lname;
	  var pic=$scope.listData.pic;
      console.log(fname),console.log(lname),console.log(pic);
	  str=url+"list-insert.php?fname="+fname+"&lname="+lname+"&pic="+pic;
       $http.get(str)
		.success(function(data){
		if(data==true)
		console.log("OK");
	})
		.error(function(data){
		console.log("Erorr");
	});
	
	
	}
})

.controller('editCtrl',function($scope,$state,$http){
var url="http://localhost/ionic_php/";
	  $scope.editData={};
  $scope.editAdmin=function(){
    var admin_id = $scope.adminDatas.admin_id;
    var admin_user = $scope.adminDatas.admin_user;
    var admin_password = $scope.adminDatas.admin_password;
console.log(admin_id),console.log(admin_user),console.log(admin_password);

      str= url + "admin-edit.php?user=" + admin_user + "&password=" + admin_password + "&id=" + admin_id;

       $http.get(str)
		.success(function(data){
		if(data==true)
		console.log("OK");
	})
		.error(function(data){
		console.log("Erorr");
	});
	
	
	}
})




.controller('Admin_delCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.del={};

    $scope.delAdmin=function(){
    var admin_id = $scope.adminDel.admin_id;
	console.log(admin_id);


   
      str= url + "admin-del.php?user=" + admin_id + "&id=" + admin_id;

      $http.get(str)
		.success(function(data){
		if(data==true)
		console.log("OK");
	})
		.error(function(data){
		console.log("Erorr");
	});
	
	
	}
})
/*.controller('Ad_insertCtrl',function($scope,$http){
var url="http://localhost/ionic_php/";
	$scope.Admin=[];
	 $scope.createAdmin=function(){
      var admin_user=$scope.admin.admin_user;
      var admin_password=$scope.admin.admin_password;
      console.log(admin_user);
	  str=url+"admin-insert.php?username="+admin_user+"&password="+admin_password;
       $http.get(str)
		.success(function(data){
		if(data==true)
		console.log("OK");
	})
		.error(function(data){
		console.log("Error");
	});
	
	
	}
})*/







