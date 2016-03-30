// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova','ngRoute', 'starter.controllers','starter.services','ngSanitize'])

.run(function($ionicPlatform, $ionicPopup,$cordovaPush,$rootScope,$http,$cordovaSQLite,$cordovaFileTransfer,$cordovaFile,$cordovaNetwork,$timeout,$ionicLoading,$cordovaDialogs,$q) {
        $ionicPlatform.ready(function($scope) {
                
                
                $ionicPlatform.registerBackButtonAction(function(event) {
                if (true) {
                        var menuUrl=localStorage.getItem("menuUrl");
                        if (menuUrl=="MenuController") {
                               $cordovaDialogs.confirm("Do you want to exit?", 'Are you sure', ['Cancel','OK'])
                                .then(function(buttonIndex) {
                                        if (buttonIndex==2) {
                                                ionic.Platform.exitApp();
                                        }
                                });
                        }
                        else
                        {
                            window.history.back();    
                        }
                        //var url = $location.url();
                        //var temp = url.split("=");
                        //var menuId=temp[1];
                        //var subMenuId=temp[2];
                        //alert("back");
                        
                  //$ionicPopup.confirm({
                  //  title: 'System warning',
                  //  template: 'are you sure you want to exit?'
                  //}).then(function(res) {
                  //  if (res) {
                  //    ionic.Platform.exitApp();
                  //  }
                  //})
                }
              }, 100);
                
                
            if(window.Connection) {
                if($cordovaNetwork.isOnline())
                {
                        var initStatus = 0;
                        localStorage.setItem("cartCount", 0);
                        localStorage.setItem("businessId",1);
                        var businessId= localStorage.getItem("businessId");
                        
                        
                        
                                       
                        var firsttimeInitilaization=localStorage.getItem("firsttimeInitilaization");
                        if (firsttimeInitilaization==null)
                        {
                                
                                localStorage.setItem("firsttimeLoading","new");
                                localStorage.setItem("updationMnu","mnu");
                                localStorage.setItem("updationCat","cat");
                                localStorage.setItem("updationSet","set");
                                localStorage.setItem("updationItm","itm");
                                localStorage.setItem("updationLoc","loc");
                                localStorage.setItem("updationGal","gal");
                                localStorage.setItem("updationAbt","abt");
                                localStorage.setItem("updationvido","vdo");
                                localStorage.setItem("firsttimeInitilaization","data");
                                localStorage.setItem("customerimgSrc","img/noProfileImage.jpg");
                        }      
                        var firsttimeLoading=localStorage.getItem("firsttimeLoading");        
                        if (firsttimeLoading=="new")
                        {       
                                var firsttimeLoadingShow=localStorage.getItem("firsttimeLoadingShow");
                                if (firsttimeLoadingShow==null)
                                {
                                        // $ionicLoading.show({
                                        //    template: 'Initialization is on Progress... After Initialization App will closed Automatically..  Please Open Next time',
                                        // });
                                        var text = 'Initializing';
                                        localStorage.setItem("firsttimeLoadingShow","data");
                                }   
                                else if (firsttimeLoading=="new"){
                                    var text = 'Updating';
                                         //alert(firsttimeLoading);
                                        // $ionicLoading.show({
                                        //    template: 'Update process is on Progress... After that App will closed Automatically..  Please Open Next time',
                                        // });
                                }
                        
                                //Menu page start
                                //alert(businessId);
                                FunctionMenu();
                                function FunctionMenu()
                                {
                                    initStatus++;
                                    swal({
                                      title: text+' Menu',
                                      text: initStatus+"/6",
                                      showConfirmButton: false
                                    })
                                    var updationMnu=localStorage.getItem("updationMnu");
                                    if (updationMnu=="mnu") {
                                           //alert(updationMnu);
                                            $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxMenu.php',{bussId: businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                                            .success(function (data) {
                                                var ajaxlength = data.rows.length;
                                                var counterMenu = 0;
                                                var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                                db.transaction(function(tx){
                                                    tx.executeSql('DROP TABLE IF EXISTS menu');
                                                    tx.executeSql('CREATE TABLE IF NOT EXISTS menu (id INTEGER, businessId INTEGER, name TEXT, image TEXT, position TEXT, status TEXT, online TEXT,menuchild TEXT)');
                                                    for(var i=0; i < ajaxlength; i++){
                                                        var url = data.rows[i]['image'];
                                                        var filename =url.split("/").pop();
                                                        var targetPath = cordova.file.externalRootDirectory+"Branbox/Menu/"+ filename;
                                                        var trustHosts = true
                                                        var options = {};
                                                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                          .then(function(result) {
                                                                counterMenu++;
                                                                //test.resolve();
                                                                if(ajaxlength == counterMenu)
                                                                {
                                                                        alert("Menu Download completed");
                                                                        FunctionSubMenu();
                                                                        localStorage.setItem("updationMnu","mnu_old");
                                                                }
                                                                
                                                          }, function(error) {
                                                            // Error
                                                            // alert(JSON.stringify(error));
                                                          }, function (progress) {
                                                            $timeout(function () {
                                                              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                            })
                                                          });
                                                        tx.executeSql('INSERT OR REPLACE INTO menu (id,businessId, name,image, position, status, online,menuchild) VALUES("' + data.rows[i].id + '","' + data.rows[i].businessId + '","' + data.rows[i].name + '","' + targetPath + '","' + data.rows[i].position + '", "' + data.rows[i].status +'", "' + data.rows[i].online +'", "' + data.rows[i].menuchild+'")',successID);
                                                        //alert(data.rows[i].name);
                                                        alert(counterMenu +" counterMenu");
                                                    }
                                                });
                                            }).error(function(){  
                                                // open(location, '_self').close(); 
                                                // alert("server Error");
                                            });
                                            //Menu page end
                                    }else{
                                        alert("call sub menu");
                                        FunctionSubMenu();
                                    }
                                    
                                }
                                function FunctionSubMenu()
                                {
                                initStatus++;
                                swal({
                                  title: text+" Menu Category",
                                  text: initStatus+"/6",
                                  showConfirmButton: false
                                });
                                //alert("submenuuuuuu");
                                var updationCat=localStorage.getItem("updationCat");
                                if (updationCat=="cat") {
                                        //alert(updationCat);
                                        //Sub Menu page Start
                                        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxGetAllData.php',{bussId: businessId,nav:"subMenu"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                                        .success(function (data) {
                                            var ajaxlength = data.rows.length;
                                            alert(ajaxlength+" submenu");
                                            var countersubMenu = 0;
                                            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                            db.transaction(function(tx){
                                                tx.executeSql('DROP TABLE IF EXISTS subMenu');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS subMenu (id INTEGER, businessId INTEGER, menuId INTEGER, name TEXT, image TEXT, position TEXT, status TEXT, online TEXT,submenuchiled TEXT)');
                                                
                                                for(var i=0; i < ajaxlength; i++){
                    
                                                    var url = data.rows[i]['image'];
                                                    alert(url);
                                                    var filename =url.split("/").pop();
                                                    var targetPath = cordova.file.externalRootDirectory+"Branbox/SubMenu/"+ filename;
                                                    var trustHosts = true
                                                    var options = {};
                                                    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                      .then(function(result) {
                                                        countersubMenu++;
                                                        if(ajaxlength == countersubMenu)
                                                        {
                                                                alert("Menu Category Download completed");
                                                                localStorage.setItem("updationCat","loc_old");
                                                                FunctionSubMenuItem();
                                                        }
                                                      }, function(error) {
                                                        // Error
                                                        // alert(JSON.stringify(error));
                                                      }, function (progress) {
                                                        $timeout(function () {
                                                          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                        })
                                                      });
                    
                                                    tx.executeSql('INSERT OR REPLACE INTO subMenu (id,businessId,menuId, name,image, position, status, online,submenuchiled) VALUES("' + data.rows[i].id + '","' + data.rows[i].businessId + '","'+data.rows[i].menuId+ '","' + data.rows[i].name + '","' + targetPath + '","' + data.rows[i].position + '", "' + data.rows[i].status +'", "' + data.rows[i].online +'", "' + data.rows[i].submenuchiled +'")',successID);
                                                alert(countersubMenu +" countersubMenu");
                                                }
                                            });
                                            
                                        }).error(function(){  
                                            // open(location, '_self').close(); 
                                            // alert("server Error");
                                        });
                                        //Sub Menu page end
                                }else{
                                        alert("call item");
                                    FunctionSubMenuItem();
                                }
                                }
                                var updationSet=localStorage.getItem("updationSet");
                                if (updationSet=="set") {
                                        //alert("settings");
                                        //Color Settings Start..
                    
                                        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxColorSettings.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                                        .success(function (colorSettings) {
                                                localStorage.setItem("updationSet","set_old");
                                            var colorSetting=colorSettings.rows;
                                            var HeaderColor=colorSettings.rows[0]['headerColor'].toString();
                                            localStorage.setItem("HeaderColor",HeaderColor);
                                            var HeaderLogo=colorSettings.rows[0]['favIcon'];
                                            var SideHeaderLogo=colorSettings.rows[0]['bannerImage'];
                                            var currencyFormat=colorSettings.rows[0]['currencyFormat'];
                                            var deliveryTime=colorSettings.rows[0]['deliveryTime'];
                                            var pickupTime=colorSettings.rows[0]['pickupTime'];
                                            var startTime=colorSettings.rows[0]['startTime'];
                                            var closeTime=colorSettings.rows[0]['closeTime'];
                                            var cartCaption=colorSettings.rows[0]['cartCaption'];
                                            
                                            var signInImage=colorSettings.rows[0]['signInImage'];
                                            var needCartConcept=colorSettings.rows[0]['needCartConcept'];
                                            
                                            var subMenuOption=colorSettings.rows[0]['subMenuOption'];
                                            
                                            localStorage.setItem("subMenuOption",subMenuOption);
                                            localStorage.setItem("pickupTime",pickupTime);
                                            localStorage.setItem("deliveryTime",deliveryTime);
                                            localStorage.setItem("startTime",startTime);
                                            localStorage.setItem("closeTime",closeTime);
                                            localStorage.setItem("cartCaption",cartCaption);
                                            //localStorage.setItem("subMenuOption",subMenuOption);
                                           // alert(HeaderColor+"Header Color"+currencyFormat+"Format");
                                            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                            db.transaction(function(tx){
                                                tx.executeSql('DROP TABLE IF EXISTS colorSetting');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS colorSetting (id INTEGER, businessId INTEGER,currencyFormat TEXT,HeaderColor TEXT,HeaderLogo TEXT,SideHeaderLogo TEXT,pickupTime TEXT,deliveryTime TEXT,startTime TEXT,closeTime TEXT,subMenuOption TEXT,cartCaption TEXT,signInImage TEXT,needCartConcept TEXT)');
                                                
                                                    var url =HeaderLogo;
                                                    var filename1 =url.split("/").pop();
                                                    var targetPath1 = cordova.file.externalRootDirectory+"Branbox/colorSettings/"+ filename1;
                                                    var trustHosts = true
                                                    var options = {};
                                                    $cordovaFileTransfer.download(url, targetPath1, options, trustHosts)
                                                      .then(function(result) {
                                                      }, function(error) {
                                                      }, function (progress) {
                                                        $timeout(function () {
                                                          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                        })
                                                      });
                                                      
                                                    var url =signInImage;
                                                    var filename3 =url.split("/").pop();
                                                    var targetPath3 = cordova.file.externalRootDirectory+"Branbox/colorSettings/"+ filename3;
                                                    var trustHosts = true
                                                    var options = {};
                                                    $cordovaFileTransfer.download(url, targetPath3, options, trustHosts)
                                                      .then(function(result) {
                                                      }, function(error) {
                                                      }, function (progress) {
                                                        $timeout(function () {
                                                          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                        })
                                                      });
                                                      
                    
                                                    var url =SideHeaderLogo;
                                                    var filename2 =url.split("/").pop();
                                                    var targetPath2 = cordova.file.externalRootDirectory+"Branbox/colorSettings/"+ filename2;
                                                    var trustHosts = true
                                                    var options = {};
                                                    $cordovaFileTransfer.download(url, targetPath2, options, trustHosts)
                                                      .then(function(result) {
                                                      }, function(error) {
                                                      }, function (progress) {
                                                        $timeout(function () {
                                                          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                        })
                                                      });
                                                    tx.executeSql('INSERT OR REPLACE INTO colorSetting (id,businessId,currencyFormat,HeaderColor,HeaderLogo,SideHeaderLogo,pickupTime,deliveryTime,startTime,closeTime,subMenuOption,cartCaption,signInImage,needCartConcept) VALUES("1","'+businessId+'","' +currencyFormat+'","'+HeaderColor+'","'+targetPath1+'","'+targetPath2+'","'+pickupTime+'","'+deliveryTime+'","'+startTime+'","'+closeTime+'","'+subMenuOption+'","'+cartCaption+'","'+targetPath3+'","'+needCartConcept+'")',successID);
                                                  });
                                            //alert("INSERT OR REPLACE INTO colorSetting");
                                        }).error(function(){  
                    
                                        });
                                        //Color Settings End..
                                        
                                         // Side Menu Settings
                                       // alert("getSideMenuSettings");
                                        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/getSideMenuSettings.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                                        .success(function (data) {
                                               
                                               var datas=[];
                                               //alert(data.rows.length);
                                               datas= data.rows[0];
                                              // alert(datas.menuCaption1);
                                            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                            db.transaction(function(tx){
                                                tx.executeSql('DROP TABLE IF EXISTS Sidemenu');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS Sidemenu (id INTEGER, businessId INTEGER,needSideMenu TEXT,sideMenufontColor TEXT,sideMenuFont TEXT,sideMenuBackColor TEXT,menuCaption1 TEXT,menuCaption2 TEXT,menuCaption3 TEXT,menuCaption4 TEXT,menuCaption5 TEXT,menuCaption6 TEXT,menuCaption7 TEXT,menuCaption8 TEXT,menuStatus1 TEXT,menuStatus2 TEXT,menuStatus3 TEXT,menuStatus4 TEXT,menuStatus5 TEXT,menuStatus6 TEXT,menuStatus7 TEXT,menuStatus8 TEXT,menuIcon1 TEXT,menuIcon2 TEXT,menuIcon3 TEXT,menuIcon4 TEXT,menuIcon5 TEXT,menuIcon6 TEXT,menuIcon7 TEXT,menuIcon8 TEXT)');
                                                
                                                   
                                                    tx.executeSql('INSERT OR REPLACE INTO Sidemenu (id , businessId ,needSideMenu ,sideMenufontColor ,sideMenuFont ,sideMenuBackColor ,menuCaption1 ,menuCaption2,menuCaption3,menuCaption4,menuCaption5,menuCaption6,menuCaption7,menuCaption8,menuStatus1,menuStatus2,menuStatus3,menuStatus4,menuStatus5,menuStatus6,menuStatus7,menuStatus8,menuIcon1,menuIcon2,menuIcon3,menuIcon4,menuIcon5,menuIcon6,menuIcon7,menuIcon8) VALUES("1","'+datas.businessId+'","' +datas.needSideMenu+'","'+datas.sideMenufontColor+'","'+datas.sideMenuFont+'","'+datas.sideMenuBackColor+'","'+datas.menuCaption1+'","'+datas.menuCaption2+'","'+datas.menuCaption3+'","'+datas.menuCaption4+'","'+datas.menuCaption5+'","'+datas.menuCaption6+'","'+datas.menuCaption7+'","'+datas.menuCaption8+'","'+datas.menuStatus1+'","'+datas.menuStatus2+'","'+datas.menuStatus3+'","'+datas.menuStatus4+'","'+datas.menuStatus5+'","'+datas.menuStatus6+'","'+datas.menuStatus7+'","'+datas.menuStatus8+'","'+datas.menuIcon1+'","'+datas.menuIcon2+'","'+datas.menuIcon3+'","'+datas.menuIcon4+'","'+datas.menuIcon5+'","'+datas.menuIcon6+'","'+datas.menuIcon7+'","'+datas.menuIcon8+'")',successID);
                                                    
                                                        //tx.executeSql('SELECT * FROM Sidemenu ',[], function (tx, results)
                                                        //{
                                                        //    var itemLength = results.rows.length;
                                                        //    alert(itemLength)
                                                        //    var items=results.rows;
                                                        //    alert(items.item(0).menuCaption1);
                                                        //    
                                                        //});
                                                  });
                                            //alert("getSideMenuSettings Completed");
                                        }).error(function(){  
                                                alert("error unable to connect");
                                        });
                                        
                                }
                                function FunctionSubMenuItem()
                                {
                                alert("Item");
                                initStatus++;
                                swal({
                                  title: text+" Menu Item",
                                  text: initStatus+"/6",
                                  showConfirmButton: false
                                });
                                var updationItm=localStorage.getItem("updationItm");
                                if (updationItm=="itm") {        
                                        //Item Data Start.
                                        
                                        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxGetAllData.php',{bussId: businessId,nav:"item"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                                        .success(function (data) {
                                            var ajaxlength = data.rows.length;
                                            alert("item len->"+ajaxlength);
                                            var counterMenuitem = 0;
                                            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                            db.transaction(function(tx){
                                                tx.executeSql('DROP TABLE IF EXISTS item');
                                                tx.executeSql('DROP TABLE IF EXISTS orderitems');
                                                tx.executeSql('DROP TABLE IF EXISTS orderingredients');
                                                tx.executeSql('DROP TABLE IF EXISTS orderitemingredients');
                                                
                                                //tx.executeSql('DROP TABLE IF EXISTS myordereditems');
                                                //tx.executeSql('DROP TABLE IF EXISTS ordereddates');
                                                
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS item (id INTEGER, businessId INTEGER,menuId INTEGER,subMenuId INTEGER,name TEXT,image TEXT,price TEXT,oldPrice TEXT,tax TEXT,offers TEXT,positions TEXT, status TEXT, online TEXT,offerStatus TEXT)');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS orderitems (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, itemName TEXT, image TEXT, price TEXT, subTotal TEXT, quantity TEXT,tax TEXT,offers TEXT,orderType TEXT)');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS orderingredients (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, ingId INTEGER,ingredients TEXT,price TEXT, ingredientsYN TEXT, extras TEXT)'); 
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS orderitemingredients (id INTEGER PRIMARY KEY AUTOINCREMENT,itemStorageId INTEGER, businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, ingId INTEGER, ingredients TEXT, price TEXT, ingredientsYN TEXT, extras TEXT)');                                   
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS myordereditems (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, itemName TEXT, image TEXT, price TEXT, subTotal TEXT, quantity TEXT,tax TEXT,offers TEXT,orderType TEXT,orderedDate TEXT,orderRefDate TEXT)');
                                                
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS ordereddates (id INTEGER PRIMARY KEY AUTOINCREMENT,orderedDate TEXT, orderRefDate TEXT)');
                                                
                                                for(var i=0; i < ajaxlength; i++){
                                                    var url = data.rows[i]['image'];
                                                    var filename =url.split("/").pop();
                                                    var targetPath = cordova.file.externalRootDirectory+"Branbox/Item/"+ filename;
                                                    var trustHosts = true
                                                    var options = {};
                                                    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                      .then(function(result) {
                                                        counterMenuitem++;
                                                        if(ajaxlength == counterMenuitem)
                                                        {
                                                                alert("item Download completed");
                                                                localStorage.setItem("updationItm","itm_old");
                                                                FunctionGallery();
                                                        }
                                                      }, function(error) {
                                                      }, function (progress) {
                                                        $timeout(function () {
                                                          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                        })
                                                      });
                                                    tx.executeSql('INSERT OR REPLACE INTO item (id,businessId,menuId,subMenuId,name,image,price,oldPrice,tax,offers,positions,status,online,offerStatus) VALUES("'+data.rows[i].id+'","'+data.rows[i].businessId+'","'+data.rows[i].menuId+'","'+data.rows[i].subMenuId+'","'+data.rows[i].name+'","'+targetPath+'","'+ data.rows[i].price+'","'+ data.rows[i].oldPrice+'","'+ data.rows[i].tax+'","'+data.rows[i].offers+'","'+data.rows[i].positions+'", "'+data.rows[i].status+'", "'+data.rows[i].online+'", "'+data.rows[i].offerStatus+'")',successID);
                                                   alert(i);
                                                }
                                            });
                                        }).error(function(){  
                                            // open(location, '_self').close(); 
                                            // alert("server Error");
                                        });
                                     
                                        //Item Data End..
                                        
                                        //Item Ingredients Start
                                        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxGetAllData.php',{bussId: businessId,nav:"itemIng"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                                        .success(function (jsonIng) {
                                             var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                            db.transaction(function(tx){
                                                tx.executeSql('DROP TABLE IF EXISTS itemings');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS itemings (id INTEGER, businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,ingredients TEXT, price TEXT, category TEXT)');
                                            //alert(jsonIng.rows.length);
                                            // alert(jsonIng.rows.length+" outer Ing");
                                                for(var i = 0; i < jsonIng.rows.length; i++) {
                                                    tx.executeSql('INSERT OR REPLACE INTO itemings(id,businessId,menuId,subMenuId,itemId,ingredients,price,category) VALUES("'+jsonIng.rows[i].id+'","'+jsonIng.rows[i].businessId+'","'+jsonIng.rows[i].menuId+'","'+jsonIng.rows[i].subMenuId+'","'+jsonIng.rows[i].itemId+'","'+jsonIng.rows[i].ingredients+'","'+jsonIng.rows[i].price+'","'+jsonIng.rows[i].category+'")',successID);
                                                }
                                            });
                                            
                                        }).error(function(){  
                                            // open(location, '_self').close(); 
                                            // alert("server Error");
                                        });
                                        //Item Ingredients End
                               
                                       //Business Details Start
                                           $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxGetAllData.php',{bussId: businessId,nav:"businessDetails"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                                        .success(function (business) {
                                            
                                                var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                                db.transaction(function(tx){
                                                tx.executeSql('DROP TABLE IF EXISTS businessDetails');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS businessDetails (businessId INTEGER, brandName TEXT,companyName TEXT,address1 TEXT,address2 TEXT,city TEXT,state TEXT,country TEXT,postalCode TEXT,phoneNumber1 TEXT,phoneNumber2 TEXT,email1 TEXT,email2 TEXT,website TEXT,latitude TEXT,longitude TEXT)');
                                           
                                                for(var i = 0; i < business.rows.length; i++) {
                                                    tx.executeSql('INSERT INTO businessDetails(businessId, brandName,companyName,address1,address2,city,state,country,postalCode,phoneNumber1,phoneNumber2,email1,email2,website,latitude,longitude) VALUES ("'+business.rows[i].businessId+'","'+business.rows[i].brandName+'","'+business.rows[i].companyName+'","'+business.rows[i].address1+'","'+business.rows[i].address2+'","'+business.rows[i].city+'","'+business.rows[i].state+'","'+business.rows[i].country+'","'+business.rows[i].postalCode+'","'+business.rows[i].phoneNumber1+'","'+business.rows[i].phoneNumber2+'","'+business.rows[i].email1+'","'+business.rows[i].email2+'","'+business.rows[i].website+'","'+business.rows[i].latitude+'","'+business.rows[i].longitude+'")',successID);
                                                }
                                                
                                            });
                                        }).error(function(){  
                                            
                                        });
                                            
                                        //Location start
                                }else{
                                    FunctionGallery();
                                }
                                }
                                var updationLoc=localStorage.getItem("updationLoc");
                                if (updationLoc=="loc") {
                                        alert("location");
                                        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/branbox.php',{'branboxVariable':'location', businessId:'1'},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })
                                        .success(function(data){
                                                
                                            var ajaxlength=data.rows.length;
                                           // alert(ajaxlength);
                                           
                                            if (ajaxlength==0) {
                                                $cordovaFile.removeDir(cordova.file.dataDirectory+"Branbox", "Locaion")
                                                .then(function (success) {
                                                  alert("deleted")
                                                }, function (error) {
                                                  alert("not deleted")
                                                });
                                            }
                                             var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                            db.transaction(function(tx){
                                                tx.executeSql('DROP TABLE IF EXISTS location');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS location (id INTEGER,businessId INTEGER,branchname TEXT,country TEXT,state TEXT,city TEXT,latitude TEXT,longitude TEXT,image TEXT,status TEXT)');
                                           
                                                    for(var i=0; i < ajaxlength; i++){
                                                        var url = data.rows[i]['image'];
                                                        var filename =url.split("/").pop();
                                                        var targetPath = cordova.file.externalRootDirectory+"Branbox/Locaion/"+ filename;
                                                        var trustHosts = true
                                                        var options = {};
                                                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                            .then(function(result){
                                                            localStorage.setItem("updationLoc","loc_old");
                                                            }, function(error){
                                                            }, function (progress){
                                                                $timeout(function(){
                                                                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                })
                                                            });
                                                        tx.executeSql('INSERT OR REPLACE INTO location (id,businessId,branchname,country,state,city,latitude,longitude,image,status) VALUES("'+data.rows[i].id+'","'+data.rows[i].businessId+'","'+data.rows[i].branchname+'","'+data.rows[i].country+'","'+data.rows[i].state+'","'+data.rows[i].city+'","'+ data.rows[i].latitude+'","'+ data.rows[i].longitude+'","'+targetPath+'","'+data.rows[i].status+'")',successID);
                                                       
                                                    }
                                            });
                                            
                                        }).error(function(){
                                              $scope.data = "error DataBase";
                                        })
                                }
                                //Location End
                                function FunctionGallery()
                                {
                                        alert("gallery");
                                    initStatus++;
                                    swal({
                                      title: text+" Gallery",
                                      text: initStatus+"/6",
                                      showConfirmButton: false
                                    });
                                    var updationGal=localStorage.getItem("updationGal");
                                    if (updationGal=="gal") {
                                        
                                         $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxGetAllData.php',{bussId: businessId,nav:"AalbumDetails"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                                        .success(function (albm) {
                                            alert(albm.rows.length+" length");
                                                var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                                db.transaction(function(tx){
                                                tx.executeSql('DROP TABLE IF EXISTS album');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS album (galId INTEGER, businessId INTEGER,galName TEXT,status TEXT)');
                                           
                                                for(var i = 0; i < albm.rows.length; i++) {
                                                    tx.executeSql('INSERT INTO album(galId, businessId,galName,status) VALUES ("'+albm.rows[i].galId+'","'+albm.rows[i].businessId+'","'+albm.rows[i].galName+'","'+albm.rows[i].status+'")',successID);
                                                }
                                                
                                            });
                                        }).error(function(){  
                                            
                                        });
                                        
                                        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/branbox.php', {branboxVariable:'gallery',businessId:'1'},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
                                        .success(function(data){
                                            var pushArry = [];
                                            var dataAjax = [];
                                            var filterArr = [];
                                            var delArr = [];
                                            var counterGallery = 0;
                                            var flag =false;
                                            var loopSuccss = 0;   
                                            var finalFlag = false;
                                            dataAjax = data.imageUrl;
                                            var db1 = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                            db1.transaction(function(tx) {
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS gallery (id INTEGER PRIMARY KEY AUTOINCREMENT,galId INTEGER, images TEXT, timeStamp TIMESTAMP)');
                                                tx.executeSql("SELECT * FROM  gallery", [], function(tx, results) {
                                                    //alert(results.rows.length > 0);
                                                    if(results.rows.length > 0)
                                                    {
                                                        for(var i=0; i < results.rows.length;i++)
                                                        { 
                                                            pushArry.push(results.rows.item(i).timeStamp);
                                                        }
                                                        $.each(dataAjax, function(key, value) { 
                                                            delArr.push(value.createdTime);
                                                        })
                                                        $.each(dataAjax, function(key, value) {
                                                            var found = $.inArray(value.createdTime, pushArry);
                                                            //alert(value.createdTime);
                                                            //alert(found);
                                                            if(found < 0) {
                                                                filterArr.push({galId:value.galId, link: value.link,  createdTime: value.createdTime});
                                                            }
                                                            
                                                        })
                                                        $.each(filterArr, function(key,value) { 
                                                            var url = value.link;
                                                            console.log(url);
                                                            var galId = value.galId;
                                                            var tstamp = value.createdTime;
                                                            var filename =url.split("/").pop();
                                                            var targetPath = cordova.file.externalRootDirectory+"Branbox/gallery/"+ filename;
                                                            var trustHosts = true
                                                            var options = {};
                                                            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                                .then(function(result) {
                                                                    loopSuccss++;
                                                                    var db1 = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                                                    db1.transaction(function(tx) { 
                                                                        tx.executeSql('INSERT OR REPLACE INTO gallery (galId,images,timeStamp) VALUES("'+galId+'","' +targetPath+ '","' +tstamp+ '")',successID,errID);
                                                                    });
                                                                    function successID(){

                                                                    }
                                                                    function errID(tx, err){
                                                                        
                                                                    }
                                                                    if(loopSuccss == filterArr.length)
                                                                    {
                                                                        alert("gallery Download completed");
                                                                        localStorage.setItem("updationGal","gal_old");
                                                                        FunctionAboutGallery();
                                                                    }
                                                                    
                                                                }, function(error) {
                                                                }, function (progress) {
                                                                    $timeout(function () {
                                                                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                })
                                                            });
                                                        })
                                                        for(var j=0; j<pushArry.length;j++)
                                                        {
                                                            var date = pushArry[j];
                                                            var arrIndex = $.inArray(date, delArr);
                                                            if(arrIndex < 0)
                                                            {
                                                                tx.executeSql('SELECT * FROM gallery WHERE timeStamp="'+date+'"', [], function(tx, results) { 
                                                                    //var imageUrl = results.rows.item(0).images;
                                                                    tx.executeSql('DELETE FROM gallery WHERE timeStamp="'+date+'"',successID);       
                                                                })
                                                            }
                                                        }
                                                    }else{
                                                        $.each(dataAjax, function(key, value) {
                                                            var url = value.link;
                                                             var galId = value.galId;
                                                             
                                                             //alert(galId+" gal Id");
                                                            var tstamp = value.createdTime;
                                                            var filename =url.split("/").pop();
                                                            var targetPath = cordova.file.externalRootDirectory+"Branbox/gallery/"+ filename;
                                                            var trustHosts = true
                                                            var options = {};
                                                            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                                .then(function(result) {
                                                                    counterGallery++;
                                                                    //alert(counterGallery);
                                                                    var dataArr = {targetPath : targetPath, tstamp: tstamp};
                                                                    galInsert.resolve(dataArr);
                                                                    if(dataAjax.length == counterGallery)
                                                                    {
                                                                        localStorage.setItem("updationGal","gal_old");
                                                                        FunctionAboutGallery();
                                                                    }
                                                                    
                                                                }, function(error) {
                                                                }, function (progress) {
                                                                    $timeout(function () {
                                                                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                })
                                                              });
                                                            var galInsert = $q.defer();
                                                            galInsert.promise.then(success)
                                                            function success(dataArr){
                                                                var path = dataArr.targetPath;
                                                                var stamp = dataArr.tstamp;
                                                                      
                                                                var db1 = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                                                db1.transaction(function(tx) { 
                                                                    tx.executeSql('INSERT OR REPLACE INTO gallery (galId,images,timeStamp) VALUES("'+galId+'","' +path+ '","' +stamp+ '")',successID,errID);
                                                                });
                                                                function successID(){

                                                                }
                                                                function errID(tx, err){
                                                                    
                                                                }
                                                            }
                                                        })
                                                    }//else end
                                                })
                                            })
                                        })//ajax gallery end
                                    }else{
                                        FunctionAboutGallery();
                                    }
                                }
                                function FunctionAboutGallery()
                                {
                                initStatus++;
                                swal({
                                  title: text+" About Us",
                                  text: initStatus+"/6",
                                  showConfirmButton: false
                                });
                                var updationAbt = localStorage.getItem("updationAbt");
                                if(updationAbt == "abt")
                                {   
                                        //aboutUs start
                                        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/branbox.php', {branboxVariable:'aboutUs',businessId:businessId},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
                                        .success(function(data) {
                                           var aboutUsImage = [];
                                           var aboutUsGallery = [];
                                           var aboutSplitImage = [];
                                           var aboutSplitName = [];
                                           var title = [];
                                           var description = [];
                                           var businessId = [];
                                           var tableId = [];
                                           var imageUrl = [];
                                           var createdTime = [];
                                           var galleryImage =[];
                                           var tableGallery = [];
                                           var filterArr = [];
                                           var counterAbt;
                                           aboutUsImage = data.aboutus;
                                           aboutUsGallery = data.aboutGallery;
                                           var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                            db.transaction(function(tx){
                                                //tx.executeSql('DROP TABLE IF EXISTS aboutUs');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS aboutUs (id INTEGER PRIMARY KEY AUTOINCREMENT, businessId INTEGER, title TEXT, description TEXT, image TEXT, timeStamp TIMESTAMP)');
                                                tx.executeSql("SELECT * FROM aboutUs", [], function(tx, results) { 
                                                    if(results.rows.length > 0) {
                    
                                                        for(var i=0; i < results.rows.length;i++)
                                                        { 
                                                            var split = results.rows.item(i).image;
                                                            Fine =split.substring(split.lastIndexOf('/'));
                                                            aboutSplitImage.push(Fine);
                                                            tableId.push(results.rows.item(i).id);
                                                        }
                                                        $.each(aboutUsImage, function(key, value) { 
                                                            var image = value.image;
                                                            str =image.substring(image.lastIndexOf('/'));
                                                            aboutSplitName.push(str);
                                                            imageUrl.push(value.image);
                                                            title.push(value.title);
                                                            description.push(value.description);
                                                            businessId.push(value.businessId);
                                                            createdTime.push(value.createdTime);
                                                        })
                                                        for(var i=0;i < aboutSplitName.length;i++)
                                                        {
                                                            if(aboutSplitImage[i] == aboutSplitName[i])
                                                            {
                                                                tx.executeSql('UPDATE aboutUs SET title="'+title[i]+'", description="'+description[i]+'" WHERE businessId="'+businessId[i]+'"',successID);
                                                            }else{
                                                                var url = imageUrl[i];
                                                                var filename =url.split("/").pop();
                                                                var targetPath = cordova.file.externalRootDirectory+"Branbox/Aboutus/"+ filename;
                                                                var trustHosts = true
                                                                var options = {};
                                                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                                  .then(function(result) {
                                                                    // Success!
                                                                    // alert(JSON.stringify(result));
                                                                  }, function(error) {
                                                                    // Error
                                                                    // alert(JSON.stringify(error));
                                                                  }, function (progress) {
                                                                    $timeout(function () {
                                                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                    })
                                                                  });
                    
                                                                tx.executeSql('DELETE FROM aboutus WHERE id="'+tableId+'"',successID);
                                                                tx.executeSql('INSERT OR REPLACE INTO aboutUs (businessId, title, description,image,timeStamp) VALUES("'+businessId[i]+'","'+title[i]+'","'+description[i]+'","'+targetPath+'","'+createdTime[i]+'")',successID);
                                                            }
                                                            
                                                        }
                                                    }else{
                                                        $.each(aboutUsImage, function(key, value){
                                                            var url = value.image;
                                                            var filename =url.split("/").pop();
                                                            var targetPath = cordova.file.externalRootDirectory+"Branbox/Aboutus/"+ filename;
                                                            var trustHosts = true
                                                            var options = {};
                                                            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                              .then(function(result) {
                                                                
                                                              }, function(error) {
                                                                // Error
                                                                // alert(JSON.stringify(error));
                                                              }, function (progress) {
                                                                $timeout(function () {
                                                                  $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                })
                                                              });
                                                            tx.executeSql('INSERT OR REPLACE INTO aboutUs (businessId, title, description,image,timeStamp) VALUES("'+value.businessId+'","'+value.title+'","'+value.description+'","'+targetPath+'","'+value.createdTime+'")',successID);
                                                        })
                                                    }     
                                                })
                                            });
                                            
                                            db.transaction(function(tx){
                                                //tx.executeSql('DROP TABLE IF EXISTS aboutUsGallery');
                                                tx.executeSql('CREATE TABLE IF NOT EXISTS aboutUsGallery (id INTEGER PRIMARY KEY AUTOINCREMENT,  aboutGalleryImages TEXT, timeStamp TIMESTAMP)');
                                                tx.executeSql("SELECT * FROM aboutUsGallery", [], function(tx, results) { 
                                                    var counterAbtGal = 0;
                                                    var loopSuccss = 0;
                                                    if(results.rows.length > 0)
                                                    {
                                                        for(var i=0; i < results.rows.length;i++)
                                                        { 
                                                            tableGallery.push(results.rows.item(i).timeStamp);
                                                        }
                                                        $.each(aboutUsGallery, function(key, value) { 
                                                            galleryImage.push(value.createdTime);
                                                        })
                                                        $.each(aboutUsGallery, function(key, value) {
                                                            var inx = $.inArray(value.createdTime, tableGallery);
                                                            if(inx < 0){
                                                                filterArr.push({link: value.imageUrl,  createdTime: value.createdTime});
                                                            }
                                                        })
                                                        $.each(filterArr, function(key, value) { 
                                                                var url = value.link;
                                                                var filename =url.split("/").pop();
                                                                var targetPath = cordova.file.externalRootDirectory+"Branbox/AboutusGallery/"+ filename;
                                                                var trustHosts = true
                                                                var options = {};
                                                                var timeStamp = value.createdTime;
                                                                $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                                  .then(function(result) {
                                                                    loopSuccss++;
                                                                    var db1 = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                                                    db1.transaction(function(tx) { 
                                                                        tx.executeSql('INSERT OR REPLACE INTO aboutUsGallery (aboutGalleryImages,timeStamp) VALUES("'+targetPath+ '","'+timeStamp+'")',successID);
                                                                    });
                                                                    function successID(){

                                                                    }
                                                                    function errID(tx, err){
                                                                        
                                                                    }
                                                                    if(filterArr.length == loopSuccss)
                                                                    {
                                                                        localStorage.setItem("updationAbt","old");
                                                                        FunctionVideo();
                                                                    }
                                                                  }, function(error) {
                                                                    // Error
                                                                    // alert(JSON.stringify(error));
                                                                  }, function (progress) {
                                                                    $timeout(function () {
                                                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                    })
                                                                  });
                                                        })
                                                        for(var j=0; j<tableGallery.length;j++)
                                                        {
                                                            var date = tableGallery[j];
                                                            var arrIndex = $.inArray(date, galleryImage);
                                                            if(arrIndex < 0)
                                                            {
                                                                tx.executeSql('DELETE FROM aboutUsGallery WHERE timeStamp="'+date+'"',successID);       
                                                            }
                                                        }
                                                        
                                                    }else{
                                                        $.each(aboutUsGallery, function(key, value) {
                                                            var url = value.imageUrl;
                                                            var filename =url.split("/").pop();
                                                            var targetPath = cordova.file.externalRootDirectory+"Branbox/AboutusGallery/"+ filename;
                                                            var trustHosts = true
                                                            var options = {};
                                                            var tstamp = value.createdTime;
                                                            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                            .then(function(result) {
                                                                counterAbtGal++;
                                                                var dataArr = {targetPath : targetPath, tstamp: tstamp};
                                                                AbtInsert.resolve(dataArr);
                                                                if(aboutUsGallery.length == counterAbtGal)
                                                                {
                                                                    localStorage.setItem("updationAbt","old");
                                                                    FunctionVideo();
                                                                }
                                                            }, function(error) {
                                                                // Error
                                                                // alert(JSON.stringify(error));
                                                              }, function (progress) {
                                                                $timeout(function () {
                                                                  $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                })
                                                            });
                                                            var AbtInsert = $q.defer();
                                                            AbtInsert.promise.then(success)
                                                            function success(dataArr){
                                                                var path = dataArr.targetPath;
                                                                var stime = dataArr.tstamp;
                                                                var db1 = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                                                db1.transaction(function(tx) { 
                                                                    tx.executeSql('INSERT OR REPLACE INTO aboutUsGallery (aboutGalleryImages,timeStamp) VALUES("'+path+ '","'+stime+'")',successID);
                                                                });
                                                                function successID(){

                                                                }
                                                                function errID(tx, err){
                                                                    
                                                                }
                                                            }
                                                        })
                                                    }
                                                });
                                            });
                                            
                                           
                                        });
                                }else{
                                    FunctionVideo();
                                }
                                }
                                //video save
                                function FunctionVideo()
                                {
                                initStatus++;
                                swal({
                                  title: text+" Video",
                                  text: initStatus+"/6",
                                  showConfirmButton: false
                                });
                                var vdo = localStorage.getItem("updationvido");
                                if (vdo == 'vdo') {
                                    $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/branbox.php', {branboxVariable:'video',businessId:'1'},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
                                    .success(function(data){ 
                                        var delArr = [];
                                        var videoArr = [];
                                        var videoDelArr = [];
                                        var videoAjax = [];
                                        var counterVideo = 0;
                                        videoAjax = data.videoUrl;
                                        var db1 = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                        db1.transaction(function(tx){
                                            tx.executeSql('CREATE TABLE IF NOT EXISTS video (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, timeStamp TIMESTAMP)');
                                            tx.executeSql("SELECT * FROM  video", [], function(tx, results) { 
                                                if(results.rows.length > 0)
                                                { 
                                                    for(var i=0; i < results.rows.length;i++)
                                                    { 
                                                        videoArr.push(results.rows.item(i).timeStamp);
                                                    }
                                                    $.each(videoAjax, function(key, value) { 
                                                        videoDelArr.push(value.createdTime);
                                                    })
            
                                                        $.each(videoAjax, function(key, value) {
                                                        var inx = $.inArray(value.createdTime, videoArr);
                                                        if(inx < 0){
                                                            var url = value.videoUrl;
                                                            var cTime = value.createdTime;
                                                            var filename =url.split("/").pop();
                                                            var targetPath = cordova.file.externalRootDirectory+"Branbox/gallery/"+ filename;
                                                            var trustHosts = true
                                                            var options = {};
                                                            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                                .then(function(result) {
                                                                    counterVideo++;
                                                                    if(videoAjax.length == counterVideo)
                                                                    {
                                                                        localStorage.setItem("updationvido","vdo_old");
                                                                        closeApp();
                                                                    }
                                                                }, function(error) {
                                                                }, function (progress) {
                                                                    $timeout(function () {
                                                                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                })
                                                              });
                                                            tx.executeSql('INSERT OR REPLACE INTO video (url,timeStamp) VALUES("' + targetPath + '","' + cTime + '")',successID);
                                                        }
                                                    });
                                                    for(var j=0; j<videoArr.length;j++)
                                                    {
                                                        var date = videoArr[j];
                                                        var arrIndex = $.inArray(date, videoDelArr);
                                                        if(arrIndex < 0)
                                                        {
                                                            tx.executeSql('SELECT * FROM video WHERE timeStamp="'+date+'"', [], function(tx, results) { 
                                                            var imageUrl = results.rows.item(0).images;
                                                            tx.executeSql('DELETE FROM video WHERE timeStamp="'+date+'"',successID);       
                                                            
                                                            })
                                                        }
                                                    }
            
                                                }else{
                                                    $.each(videoAjax, function(key, value) {
                                                        var url = value.videoUrl;
                                                        var cTime = value.createdTime;
                                                        var filename =url.split("/").pop();
                                                        var targetPath = cordova.file.externalRootDirectory+"Branbox/video/"+ filename;
                                                        var trustHosts = true
                                                        var options = {};
                                                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                          .then(function(result) {
                                                            counterVideo++;
                                                            var dataArr = {targetPath : targetPath, tstamp: cTime};
                                                            vdoInsert.resolve(dataArr);
                                                            if(videoAjax.length == counterVideo)
                                                            {
                                                                localStorage.setItem("updationvido","vdo_old");
                                                                closeApp();
                                                            }

                                                          }, function(error) {
                                                            // Error
                                                            // alert(JSON.stringify(error));
                                                          }, function (progress) {
                                                            $timeout(function () {
                                                              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                            })
                                                          });
                                                            var vdoInsert = $q.defer();
                                                            vdoInsert.promise.then(success)
                                                            function success(dataArr){
                                                                var path = dataArr.targetPath;
                                                                var stime = dataArr.tstamp;
                                                                var db1 = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                                                db1.transaction(function(tx) { 
                                                                    tx.executeSql('INSERT OR REPLACE INTO video (url,timeStamp) VALUES("' + path + '","' + stime + '")',successID);
                                                                });
                                                                function successID(){

                                                                }
                                                            }
                                                        
                                                    }) 
                                                }//else end
                                            })
                                        })//database connection end
                                    });
                                }else{
                                    closeApp();
                                }
                                }
                                //video end
                                
                                function successID(){
                                  return true;
                                }

                                function closeApp()
                                {
                                    if (firsttimeLoading=="new") {
                                            
                                            localStorage.setItem("firsttimeLoading","old");
                                            $cordovaDialogs.alert("Please Open Next time", 'Initialization Completed!', 'OK')
                                            .then(function() {
                                                     
                                            });
                                            ionic.Platform.exitApp()
                                            $ionicLoading.hide();
                                        }
                                }
                                


                                // var gallery = $q.defer();
                                // var video = $q.defer();
                                // var abtusGaly = $q.defer();
                                // var menus = $q.defer();
                                // var subMenus = $q.defer();
                                // var subMenusItem = $q.defer();
                                // // video.promise.then(success) 
                                // var all = $q.all([gallery.promise, video.promise, abtusGaly.promise,menus.promise, subMenus.promise, subMenusItem.promise]);
                                // all.then(success)
                                // function success(data){
                                //     alert(data);
                                //     if (firsttimeLoading=="new") {
                                //         //setTimeout(function(){
                                //                 localStorage.setItem("firsttimeLoading","old");
                                //                 $cordovaDialogs.alert("Please Open Next time", 'Initialization Completed!', 'OK')
                                //                 .then(function() {
                                                         
                                //                 });
                                //                 ionic.Platform.exitApp()
                                //                 $ionicLoading.hide();
                                //               ; 
                                //         //},5000);
                                //         }
                                // } 
                                
                        }
                                localStorage.setItem("InterNetConnection","yes");
                                
            
                                 var androidConfig = {
                                          "senderID": "500706511162",
                                          "ecb": "notificationReceived"
                                        };
            
                                document.addEventListener("deviceready", function(){
                                    $cordovaPush.register(androidConfig).then(function(result) {
                                        //alert('You are registered for get latest notification');
                                      // Success
                                    }, function(err) {
                                        //alert(err);
                                      // Error
                                    })
                                    $cordovaPush.unregister(options).then(function(result) {
                                          //alert(result);
                                        }, function(err) {
                                          //alert(err);
                                        })
            
                                }, false);
                                    
                           
            
                        }
                            else{
                                    var netConnection=localStorage.getItem("InterNetConnection");
                                    if(netConnection!="yes")
                                    {   
                                        alert(" Initialization Error.. Please Connect Internet");
                                        ionic.Platform.exitApp();
                                    }
                                    
                            }
                
            }

        });
})





.config(['$routeProvider','$stateProvider', function($routeProvider,$stateProvider) {
  $routeProvider
    .when('/menu',
        {
            templateUrl: 'templates/menu.html',
            controller: 'MenuController'
        })
   .when('/subMenu/=:id',
        {
            templateUrl: 'templates/subMenu.html',
            controller: 'SubMenuController'
        })
   .when('/subMenuOption/=:id',
        {
            templateUrl: 'templates/items.html',
            controller: 'SubMenuItemController'
        })
   .when('/items/=:menuId=:subMenuId',
        {
            templateUrl: 'templates/items.html',
            controller: 'SubMenuItemController'
        })
   .when('/addTocartpage',
        {
            templateUrl: 'templates/addItemTocart.html',
            controller: 'AddToCartCtrl'
        })
    .when('/contactForm',
        {
            templateUrl: 'templates/contactForm.html',
            controller: 'contactCtrl'
        })
    .when('/location',
        {
            templateUrl: 'templates/location.html',
            controller: 'locationCtrl'
        })
   .when('/myProfile',
        {
            controller: 'myProfileDetail',
            templateUrl: 'templates/myProfile.html'
        })
    .when('/login',
        {
            templateUrl: 'templates/login.html',
            controller: 'authentication'
        })

    .when('/register',
        {
            templateUrl: 'templates/register.html',
            controller: 'registerForm'
        })
    .when('/forgotPassword',
        {
            templateUrl: 'templates/forgotPassword.html',
            controller: 'ForgotPassCtrl'
        })
    .when('/latestOffers',
        {
            templateUrl: 'templates/latestOffer.html',
            //controller: 'DashCtrl'
        })
    .when('/gallery',
        {
            templateUrl: 'templates/gallery.html',
            controller: 'gallery'
        })
    .when('/aboutUs',
        {
            templateUrl: 'templates/aboutUs.html',
            controller: 'aboutUs'
        })
    .when('/aboutGallery',
        {
            templateUrl: 'templates/aboutGallery.html',
            controller: 'aboutUs'  
        })
    .when('/contactUs',
        {
            templateUrl: 'templates/contactUs.html',
            controller: 'aboutUs'  
        })
    .when('/timeDelivery',
        {
            templateUrl: 'templates/timeDelivery.html',
            controller: 'timeDelivery'
        })
    .when('/message',
        {
            templateUrl: 'templates/message.html',
            controller: 'MenuController'
        })
     .when('/tableBooking',
        {
            templateUrl: 'templates/tableBooking.html',
            //controller: 'registerForm'
        })
     .when('/myProfile',
        {
            controller: 'myProfileDetail',
            templateUrl: 'templates/myProfile.html'
        })
    .otherwise('/menu');

}]);

window.notificationReceived = function (notification) {
    //alert(notification.event);
        switch(notification.event) {
            case 'registered':
                if (notification.regid.length > 0 ) {
                 // prompt("Copy to clipboard", notification.regid);
                localStorage.setItem("regid",notification.regid);
                var regid = localStorage.getItem("regid");
                }
                break;
            case 'message':
                localStorage.setItem("notificationMessage",notification.message);
                var token=notification.message;
                    var tokenNo=token.split(":");
                    //alert(tokenNo[0]);
                    if(tokenNo[0]=="Your Table Token No")
                    {
                        
                        localStorage.setItem("tokenNumber",tokenNo[1]);
                        localStorage.setItem("showoToken","yes");
                        var now = moment().format("DD-MM-YYYY");
                        localStorage.setItem("tokenDate",now);
                       
                        swal("This is your token Number!", token);
                        //swal({   
                        //    title: "This is your token Number!",   
                        //    text: token,  
                        //    confirmButtonColor: "#DD6B55",   
                        //    confirmButtonText: "OK!!!!",  
                        //});
                    }
                    else if (tokenNo[0]=="Your table number is") {
                        
                        localStorage.setItem("tableNumber",tokenNo[1]);
                        var now = moment().format("DD-MM-YYYY");
                        
                        swal("This is Your table number!", token);
                        //swal({   
                        //    title: "This is Your table number!",   
                        //    text: token,  
                        //    confirmButtonColor: "#DD6B55",   
                        //    confirmButtonText: "OK!!!!",  
                        //});
                    }
                    else if (tokenNo[0]=="Avilable Updates are") {
                        
                        var updation=tokenNo[1].split(",");
                        
                        for(var i=0; i<updation.length;i++)
                        {
                                if (updation[i]=='mnu'){
                                        localStorage.setItem("updationMnu",updation[i]);
                                        localStorage.setItem("firsttimeLoading","new");
                                        var firsttimeLoading=localStorage.getItem("firsttimeLoading");
                                        //alert(updation[i]);
                                        //alert(firsttimeLoading);
                                }
                                else if (updation[i]=='cat'){
                                        //alert(updation[i]);
                                        localStorage.setItem("updationCat",updation[i]);
                                        localStorage.setItem("firsttimeLoading","new");
                                }
                                else if (updation[i]=='itm'){
                                        localStorage.setItem("updationItm",updation[i]);
                                        localStorage.setItem("firsttimeLoading","new");
                                        //alert(updation[i]);
                                }
                                else if (updation[i]=='abt') {
                                        localStorage.setItem("updationAbt",updation[i]);
                                        localStorage.setItem("firsttimeLoading","new");
                                        //alert(updation[i]);
                                }
                                else if (updation[i]=='gal') {
                                        localStorage.setItem("updationGal",updation[i]);
                                        localStorage.setItem("firsttimeLoading","new");
                                        //alert(updation[i]);
                                }
                                else if (updation[i]=='set') {
                                        localStorage.setItem("updationSet",updation[i]);
                                        localStorage.setItem("firsttimeLoading","new");
                                        //alert(updation[i]);
                                }
                                else if (updation[i]=='loc') {
                                        localStorage.setItem("updationLoc",updation[i]);
                                        localStorage.setItem("firsttimeLoading","new");
                                        //alert(updation[i]);
                                }
                        }
                    }
                    else
                    {
                        swal("General Message", token);
                        //swal({
                        //       title: token,
                        //       timer: 5000,
                        //       showConfirmButton: false 
                        //   });
                        
                    }
                break;

            case 'error':
                alert('GCM error = ' + notification.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    };