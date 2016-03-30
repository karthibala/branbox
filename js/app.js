// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova','ngRoute', 'starter.controllers','starter.services','ngSanitize'])

.run(function($ionicPlatform, $ionicPopup,$cordovaPush,$rootScope,$http,$cordovaSQLite,$cordovaFileTransfer,$cordovaFile,$cordovaNetwork,$timeout,$ionicLoading,$cordovaDialogs,$q) {
        $ionicPlatform.ready(function($scope,$location) {
                
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
                      /*  else if (menuUrl=="GalleryView") {
							alert("Gallery view");
							$scope.state.go('gallery');
							//$location.path('/gallery');
							//window.history.back();
							//$ionicViewService.getBackView().go();
                            localStorage.setItem("menuUrl","gallery");
                            
                        } */
						else if (menuUrl=="gallery") {
							window.history.back();
							//$ionicViewService.getBackView().go();
                           // localStorage.setItem("menuUrl","MenuController");
                            
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
                
                        var initStatus = 0;
                        localStorage.setItem("cartCount", 0);
                        localStorage.setItem("businessId",1);
                        var businessId= localStorage.getItem("businessId");
                        
                        
                        
                                       
                        var firsttimeInitilaization=localStorage.getItem("firsttimeInitilaization");
                        if (firsttimeInitilaization==null)
                        {
                                
                                localStorage.setItem("firsttimeLoading","new");
                                localStorage.setItem("InitialLoading","initial");
                                localStorage.setItem("updationMnu","mnu_old");
                                localStorage.setItem("updationCat","cat_old");
                                localStorage.setItem("updationSet","set_old");
                                localStorage.setItem("updationItm","itm_old");
                                localStorage.setItem("updationLoc","loc_old");
                                localStorage.setItem("updationGal","gal_old");
                                localStorage.setItem("updationAbt","abt_old");
                                localStorage.setItem("updationvido","vdo_old");
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
                                        //var text = 'Initializing';
                                        localStorage.setItem("firsttimeLoadingShow","data");
                                }   /*
                                else if (firsttimeLoading=="new"){
                                    var text = 'Updating';
                                         //alert(firsttimeLoading);
                                         $ionicLoading.show({
                                            template: 'Update process is on Progress... After that App will closed Automatically..  Please Open Next time',
                                         });
                                } */
                        
                                var InitialLoading=localStorage.getItem("InitialLoading");
                                if (InitialLoading=="initial")
                                {
                                    
                                    localStorage.setItem("InstallingDate","2016-02-13");
                                    localStorage.setItem("InstallingDateTime",'2016-02-13 07:59:50');
                                    
                                    var current= moment().format("YYYY-MM-DD");
                                    //localStorage.setItem("notUpdate",current);
                                    localStorage.setItem("notUpdate","2016-03-6");
                                   // alert(current+"-> current form signe init");
                                    
                                    //SQLite_Storage();
                                    
                                    //var currentDate  = moment().format("YYYY-MM-DD");
                                    //if (currentDate=="2016-02-13") {
                                    //    localStorage.setItem("nextUpdatedDate","2016-02-10");
                                    //}
                                    
                                    
                                //}
                                //
                                //function SQLite_Storage(){
                                    //alert("SQLite_Storage");
                                    var data = [];
                                    
                                    data[0] ={"id":"11","businessId":"1","name":"Main Courses","image":"img/menu/20160106162751.png","position":"1","status":"ON","online":"ON","menuchild":"ON"};
                                    data[1] ={"id":"16","businessId":"1","name":"Appetizers","image":"img/menu/20160106163434.png","position":"2","status":"ON","online":"ON","menuchild":"ON"};
                                    data[2] ={"id":"17","businessId":"1","name":"Dessert","image":"img/menu/20160106163531.png","position":"3","status":"ON","online":"ON","menuchild":"ON"};
                                    data[3] ={"id":"19","businessId":"1","name":"Drinks","image":"img/menu/20160106163635.png","position":"4","status":"ON","online":"ON","menuchild":"ON"};
                                    //data[4] ={"id":"83","businessId":"1","name":"Chicken Fryied","image":"img/menu/20160106163743.png","position":"5","status":"ON","online":"ON","menuchild":"OFF"};
                                    var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                                    /* Menu */
                                    db.transaction(function(tx){
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS menu (sNo INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER, businessId INTEGER, name TEXT, image TEXT, position TEXT, status TEXT, online TEXT,menuchild TEXT)');
                                        //alert("data->"+data.length);
                                        for(var i=0; i<data.length; i++){
                                            //alert("menu->"+data[i].id);
                                            tx.executeSql('INSERT OR REPLACE INTO menu (id,businessId, name,image, position, status, online,menuchild) VALUES("'+ data[i].id +'","'+ data[i].businessId +'","'+ data[i].name +'","'+ data[i].image +'","'+ data[i].position +'","'+ data[i].status +'","'+ data[i].online +'","'+ data[i].menuchild +'");',successID);
                                        }
                                        tx.executeSql("SELECT * FROM  menu", [], function(tx, results) {
                                            //alert("SELECT QUERY");
                                            //alert("menu->"+results.rows.item(2).sNo);
                                        });
                                    }); 
                                    /* SubMenu */
                                    var subMenuData = [];
                                    subMenuData[0] ={"id":"4","businessId":"1","menuId":"16","name":"Soups","image":"img/submenu/20160106165403.png","position":"1","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[1] ={"id":"24","businessId":"1","menuId":"16","name":"Cannellini-Bruschetta","image":"img/submenu/20160106165519.png","position":"11","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[2] ={"id":"25","businessId":"1","menuId":"16","name":"Radish-Anchovy Canapes","image":"img/submenu/20160106165555.png","position":"12","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[3] ={"id":"26","businessId":"1","menuId":"19","name":"stuffed-cinnamon-donuts","image":"img/submenu/20160106165258.png","position":"13","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[4] ={"id":"28","businessId":"1","menuId":"19","name":"Apple Pie","image":"img/submenu/20160106165333.png","position":"14","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[5] ={"id":"29","businessId":"1","menuId":"17","name":"Painkiller","image":"img/submenu/20160106165147.png","position":"15","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[6] ={"id":"30","businessId":"1","menuId":"17","name":"Coffee","image":"img/submenu/20160106165229.png","position":"16","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[7] ={"id":"31","businessId":"1","menuId":"16","name":"Bacon Wrapped Dates","image":"img/submenu/20160106165628.png","position":"17","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[8] ={"id":"32","businessId":"1","menuId":"16","name":"Buffalo Wings","image":"img/submenu/20160106165801.png","position":"18","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[9] ={"id":"33","businessId":"1","menuId":"16","name":"Calimari","image":"img/submenu/20160106163935.png","position":"19","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[10] ={"id":"8","businessId":"1","menuId":"11","name":"Meals","image":"img/submenu/20160106164101.png","position":"2","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[11] ={"id":"9","businessId":"1","menuId":"11","name":"BreakFast","image":"img/submenu/20160106164238.png","position":"3","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[12] ={"id":"10","businessId":"1","menuId":"11","name":"Chicken Gravy","image":"img/submenu/20160106164324.png","position":"4","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[13] ={"id":"11","businessId":"1","menuId":"11","name":"Dinner","image":"img/submenu/20160106164437.png","position":"5","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[14] ={"id":"2","businessId":"1","menuId":"11","name":"Briyani","image":"img/submenu/20160106164524.png","position":"6","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[15] ={"id":"12","businessId":"1","menuId":"19","name":"Ice Cream","image":"img/submenu/20160106164612.png","position":"7","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[16] ={"id":"21","businessId":"1","menuId":"17","name":"Drinks Strawberry","image":"img/submenu/20160106164824.png","position":"8","status":"ON","online":"ON","submenuchiled":"ON"};
                                    subMenuData[17] ={"id":"22","businessId":"1","menuId":"84","name":"Gobi Food1","image":"img/submenu/20160106165013.png","position":"9","status":"ON","online":"ON","submenuchiled":"ON"};
                                    db.transaction(function(tx){
                                        //alert(subMenuData.length)
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS subMenu (sNo INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER, businessId INTEGER, menuId INTEGER, name TEXT, image TEXT, position TEXT, status TEXT, online TEXT,submenuchiled TEXT)');
                                        for(var i=0; i<subMenuData.length; i++){
                                            tx.executeSql('INSERT OR REPLACE INTO subMenu (id,businessId,menuId, name,image, position, status, online,submenuchiled) VALUES("' + subMenuData[i].id + '","' + subMenuData[i].businessId + '","'+subMenuData[i].menuId+ '","' + subMenuData[i].name + '","' + subMenuData[i].image + '","' + subMenuData[i].position + '", "' + subMenuData[i].status +'", "' + subMenuData[i].online +'", "' + subMenuData[i].submenuchiled +'")',successID);
                                        }
                                        tx.executeSql("SELECT * FROM  subMenu", [], function(tx, results) {
                                           // alert("SELECT QUERY");
                                            //alert("Sub menu->"+results.rows.item(5).sNo);
                                        });
                                    });
                                    /* colorSetting */
                                    db.transaction(function(tx){
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS colorSetting (sNo INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER, businessId INTEGER,currencyFormat TEXT,HeaderColor TEXT,HeaderLogo TEXT,SideHeaderLogo TEXT,pickupTime TEXT,deliveryTime TEXT,startTime TEXT,closeTime TEXT,subMenuOption TEXT,cartCaption TEXT,signInImage TEXT,needCartConcept TEXT)');
                                        tx.executeSql('INSERT OR REPLACE INTO colorSetting (id,businessId,currencyFormat,HeaderColor,HeaderLogo,SideHeaderLogo,pickupTime,deliveryTime,startTime,closeTime,subMenuOption,cartCaption,signInImage,needCartConcept) VALUES("1","1","AED","#e32626","img/settings/1454153647.jpg","img/settings/1450805148.jpg","00:40","00:55","11:00 AM","12:00 AM","YES","Order","img/settings/1452939622.jpg","YES")',successID);
                                      // alert("color setting form local");
                                        localStorage.setItem("subMenuOption","YES");
                                        localStorage.setItem("pickupTime","00:40");
                                        localStorage.setItem("deliveryTime","00:55");
                                        localStorage.setItem("startTime","11:00 AM");
                                        localStorage.setItem("closeTime","12:00 AM");
                                        localStorage.setItem("cartCaption","Order");
                                        localStorage.setItem("HeaderColor","#e32626");
                                        //
                                        //var colorSetting=colorSettings.rows;
                                        //var HeaderColor=colorSettings.rows[0]['headerColor'].toString();
                                        //localStorage.setItem("HeaderColor",HeaderColor);
                                        //var HeaderLogo=colorSettings.rows[0]['favIcon'];
                                        //var SideHeaderLogo=colorSettings.rows[0]['bannerImage'];
                                        //var currencyFormat=colorSettings.rows[0]['currencyFormat'];
                                        //var deliveryTime=colorSettings.rows[0]['deliveryTime'];
                                        //var pickupTime=colorSettings.rows[0]['pickupTime'];
                                        //var startTime=colorSettings.rows[0]['startTime'];
                                        //var closeTime=colorSettings.rows[0]['closeTime'];
                                        //var cartCaption=colorSettings.rows[0]['cartCaption'];
                                        //
                                        //var signInImage=colorSettings.rows[0]['signInImage'];
                                        //var needCartConcept=colorSettings.rows[0]['needCartConcept'];
                                        //
                                        //var subMenuOption=colorSettings.rows[0]['subMenuOption'];
                                        //
                                        //localStorage.setItem("subMenuOption",subMenuOption);
                                        //localStorage.setItem("pickupTime",pickupTime);
                                        //localStorage.setItem("deliveryTime",deliveryTime);
                                        //localStorage.setItem("startTime",startTime);
                                        //localStorage.setItem("closeTime",closeTime);
                                        //localStorage.setItem("cartCaption",cartCaption);
                                        
                                        //tx.executeSql("SELECT * FROM  colorSetting", [], function(tx, results) {
                                            //alert("SELECT QUERY");
                                            //alert("colorSetting->"+results.rows.length);
                                        //});
                                    });
                                    /* Sidemenu */
                                    var sideMenuData = [];
                                    db.transaction(function(tx){
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS Sidemenu (sNo INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER, businessId INTEGER,needSideMenu TEXT,sideMenufontColor TEXT,sideMenuFont TEXT,sideMenuBackColor TEXT,menuCaption1 TEXT,menuCaption2 TEXT,menuCaption3 TEXT,menuCaption4 TEXT,menuCaption5 TEXT,menuCaption6 TEXT,menuCaption7 TEXT,menuCaption8 TEXT,menuStatus1 TEXT,menuStatus2 TEXT,menuStatus3 TEXT,menuStatus4 TEXT,menuStatus5 TEXT,menuStatus6 TEXT,menuStatus7 TEXT,menuStatus8 TEXT,menuIcon1 TEXT,menuIcon2 TEXT,menuIcon3 TEXT,menuIcon4 TEXT,menuIcon5 TEXT,menuIcon6 TEXT,menuIcon7 TEXT,menuIcon8 TEXT)');
                                        tx.executeSql('INSERT OR REPLACE INTO Sidemenu (id , businessId ,needSideMenu ,sideMenufontColor ,sideMenuFont ,sideMenuBackColor ,menuCaption1 ,menuCaption2,menuCaption3,menuCaption4,menuCaption5,menuCaption6,menuCaption7,menuCaption8,menuStatus1,menuStatus2,menuStatus3,menuStatus4,menuStatus5,menuStatus6,menuStatus7,menuStatus8,menuIcon1,menuIcon2,menuIcon3,menuIcon4,menuIcon5,menuIcon6,menuIcon7,menuIcon8) VALUES("0000000000","1","YES","#1a5e5a","Times New Roman Bold","#ffffff","Sign In","My Profile","Menus Items","Latest Offers","Table Booking","About Us","Locations","Gallery","YES","YES","YES","NO","NO","YES","YES","YES","md-person","md-person","md-restaurant-menu","md-wallet-giftcard","md-store-mall-directory","md-home","md-location-on","md-photo-library")',successID);
                                        tx.executeSql("SELECT * FROM  Sidemenu", [], function(tx, results) {
                                            //alert("SELECT QUERY");
                                            //alert("Sidemenu->"+results.rows.length);
                                        });
                                    });
                                    /* item */
                                    var itemData = [];
                                    itemData[0] = {"id":"6","businessId":"1","menuId":"19","subMenuId":"12","name":"Vanilla","image":"img/item/20151223142500.png","price":"15.00","tax":"0","offers":"0","positions":"1","status":"ON","online":"OFF","oldPrice":"","offerStatus":"NOT"};
                                    itemData[1] = {"id":"19","businessId":"1","menuId":"19","subMenuId":"28","name":"Apple Pie","image":"img/item/20151223160545.png","price":"15.00","tax":"0","offers":"0","positions":"10","status":"ON","online":"ON","oldPrice":"3455","offerStatus":"OFF"};
                                    itemData[2] = {"id":"20","businessId":"1","menuId":"17","subMenuId":"29","name":"Painkiller","image":"img/item/20151223160610.png","price":"119.00","tax":"0","offers":"0","positions":"11","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[3] = {"id":"21","businessId":"1","menuId":"17","subMenuId":"30","name":"black coffee","image":"img/item/20151223160648.png","price":"14.00","tax":"0","offers":"0","positions":"12","status":"ON","online":"ON","oldPrice":"","offerStatus":"NOT"};
                                    itemData[4] = {"id":"22","businessId":"1","menuId":"17","subMenuId":"30","name":"decaffeinated coffee","image":"img/item/20151223160724.png","price":"27.00","tax":"0","offers":"0","positions":"13","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[5] = {"id":"23","businessId":"1","menuId":"11","subMenuId":"8","name":"Full Meals","image":"img/item/20151223160823.png","price":"34.00","tax":"0","offers":"0","positions":"14","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[6] = {"id":"24","businessId":"1","menuId":"11","subMenuId":"8","name":"fish kulambu ","image":"img/item/20151223160848.png","price":"39.00","tax":"0","offers":"0","positions":"15","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[7] = {"id":"25","businessId":"1","menuId":"11","subMenuId":"9","name":" Full Breakfast Buffet","image":"img/item/20151223160937.png","price":"135.00","tax":"0","offers":"0","positions":"16","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[8] = {"id":"26","businessId":"1","menuId":"11","subMenuId":"10","name":"Spicy Chicken in Tomato Gravy","image":"img/item/20151223161632.png","price":"140.00","tax":"0","offers":"0","positions":"17","status":"ON","online":"ON","oldPrice":"","offerStatus":"OFF"};
                                    itemData[9] = {"id":"27","businessId":"1","menuId":"11","subMenuId":"11","name":"special dinner ","image":"img/item/20151223161721.png","price":"124.00","tax":"0","offers":"0","positions":"18","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[10] = {"id":"28","businessId":"1","menuId":"16","subMenuId":"31","name":"Stuffed with Blue Cheese","image":"img/item/20151223161805.png","price":"124.00","tax":"0","offers":"0","positions":"19","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[11] = {"id":"4","businessId":"1","menuId":"17","subMenuId":"21","name":"fish","image":"img/item/20151223161832.png","price":"100.00","tax":"5151","offers":"232","positions":"2","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[12] = {"id":"29","businessId":"1","menuId":"16","subMenuId":"32","name":"Potato Skins","image":"img/item/20151223161947.png","price":"83.00","tax":"0","offers":"0","positions":"20","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[13] = {"id":"30","businessId":"1","menuId":"16","subMenuId":"33","name":"Nachos","image":"img/item/20151223162109.png","price":"46.00","tax":"0","offers":"0","positions":"21","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[14] = {"id":"31","businessId":"1","menuId":"11","subMenuId":"9","name":"rava idli","image":"img/item/20151223142358.png","price":"80.00","tax":"1.0","offers":"chutney","positions":"22","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[15] = {"id":"5","businessId":"1","menuId":"11","subMenuId":"2","name":"Chicken Briyani","image":"img/item/20151223162209.png","price":"124.00","tax":".5%","offers":"34","positions":"3","status":"ON","online":"ON","oldPrice":"150.30","offerStatus":"ON"};
                                    itemData[16] = {"id":"2","businessId":"1","menuId":"11","subMenuId":"2","name":"Prawn biryani","image":"img/item/20151223162248.png","price":"100.40","tax":"566","offers":"33","positions":"4","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[17] = {"id":"11","businessId":"1","menuId":"16","subMenuId":"4","name":"Snake Soup","image":"img/item/20151223162325.png","price":"200.00","tax":"200","offers":"500","positions":"5","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[18] = {"id":"3","businessId":"1","menuId":"11","subMenuId":"2","name":"mutton briyani","image":"img/item/20151223162406.png","price":"511.65","tax":"10","offers":"23125","positions":"6","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[19] = {"id":"16","businessId":"1","menuId":"16","subMenuId":"24","name":"Spiced-Olives","image":"img/item/20151223162425.png","price":"12.00","tax":"0","offers":"0","positions":"7","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[20] = {"id":"17","businessId":"1","menuId":"16","subMenuId":"25","name":"Radish-Anchovy Canapes","image":"img/item/20151223162443.png","price":"10.00","tax":"0","offers":"0","positions":"8","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    itemData[21] = {"id":"18","businessId":"1","menuId":"19","subMenuId":"26","name":"Stuffed Cinnamon Donuts","image":"img/item/20151223162512.png","price":"123.00","tax":"0","offers":"0","positions":"9","status":"ON","online":"ON","oldPrice":null,"offerStatus":"NOT"};
                                    db.transaction(function(tx){
                                        tx.executeSql('DROP TABLE IF EXISTS item');
                                        tx.executeSql('DROP TABLE IF EXISTS orderitems');
                                        tx.executeSql('DROP TABLE IF EXISTS orderingredients');
                                        tx.executeSql('DROP TABLE IF EXISTS orderitemingredients');
                                        
                                        //tx.executeSql('DROP TABLE IF EXISTS myordereditems');
                                        //tx.executeSql('DROP TABLE IF EXISTS ordereddates');
                                        
                                       // tx.executeSql('CREATE TABLE IF NOT EXISTS item (sNo INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER, businessId INTEGER,menuId INTEGER,subMenuId INTEGER,name TEXT,image TEXT,price TEXT,oldPrice TEXT,tax TEXT,offers TEXT,positions TEXT, status TEXT, online TEXT,offerStatus TEXT)');
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS orderitems (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, itemName TEXT, image TEXT, price TEXT, subTotal TEXT, quantity TEXT,tax TEXT,offers TEXT,orderType TEXT)');
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS orderingredients (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, ingId INTEGER,ingredients TEXT,price TEXT, ingredientsYN TEXT, extras TEXT)'); 
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS orderitemingredients (id INTEGER PRIMARY KEY AUTOINCREMENT,itemStorageId INTEGER, businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, ingId INTEGER, ingredients TEXT, price TEXT, ingredientsYN TEXT, extras TEXT)');                                   
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS myordereditems (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, itemName TEXT, image TEXT, price TEXT, subTotal TEXT, quantity TEXT,tax TEXT,offers TEXT,orderType TEXT,orderedDate TEXT,orderRefDate TEXT)');
                                                
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS item (sNo INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER, businessId INTEGER,menuId INTEGER,subMenuId INTEGER,name TEXT,image TEXT,price TEXT,oldPrice TEXT,tax TEXT,offers TEXT,positions TEXT, status TEXT, online TEXT,offerStatus TEXT)');
                                        for(var k=0; k<itemData.length; k++){
                                            tx.executeSql('INSERT OR REPLACE INTO item (id,businessId,menuId,subMenuId,name,image,price,oldPrice,tax,offers,positions,status,online,offerStatus) VALUES("'+itemData[k].id+'","'+itemData[k].businessId+'","'+itemData[k].menuId+'","'+itemData[k].subMenuId+'","'+itemData[k].name+'","'+itemData[k].image+'","'+ itemData[k].price+'","'+ itemData[k].oldPrice+'","'+ itemData[k].tax+'","'+itemData[k].offers+'","'+itemData[k].positions+'", "'+itemData[k].status+'", "'+itemData[k].online+'", "'+itemData[k].offerStatus+'")',successID);
                                        }
                                        //tx.executeSql("SELECT * FROM  item", [], function(tx, results) {
                                        //    //alert("SELECT QUERY");
                                        //    //alert("item->"+results.rows.length);
                                        //});
                                    });

                                    /* itemings */
                                    var itemingsData = [];
                                    itemingsData[0] ={"id":"5","businessId":"1","menuId":"11","subMenuId":"2","itemId":"2","ingredients":"Rice","price":"0.00","category":"base","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[1] ={"id":"6","businessId":"1","menuId":"11","subMenuId":"2","itemId":"2","ingredients":"Prawn","price":"0.00","category":"base","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[2] ={"id":"7","businessId":"1","menuId":"11","subMenuId":"2","itemId":"2","ingredients":"oil","price":"0.00","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[3] ={"id":"8","businessId":"1","menuId":"11","subMenuId":"2","itemId":"2","ingredients":"ginger","price":"0.00","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[4] ={"id":"9","businessId":"1","menuId":"11","subMenuId":"2","itemId":"3","ingredients":"rice","price":"0","category":"base","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[5] ={"id":"10","businessId":"1","menuId":"11","subMenuId":"2","itemId":"3","ingredients":"oil","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[6] ={"id":"11","businessId":"1","menuId":"11","subMenuId":"2","itemId":"5","ingredients":"chicken","price":"0.00","category":"base","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[7] ={"id":"12","businessId":"1","menuId":"11","subMenuId":"2","itemId":"5","ingredients":"Rice","price":"0.00","category":"base","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[8] ={"id":"13","businessId":"1","menuId":"11","subMenuId":"2","itemId":"5","ingredients":"oil","price":"0.00","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[9] ={"id":"14","businessId":"1","menuId":"11","subMenuId":"2","itemId":"5","ingredients":"onion","price":"2.00","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[10] ={"id":"15","businessId":"1","menuId":"17","subMenuId":"4","itemId":"4","ingredients":"fish","price":"0","category":"base","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[11] ={"id":"16","businessId":"1","menuId":"17","subMenuId":"4","itemId":"4","ingredients":"onion","price":"0","category":"base","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[12] ={"id":"17","businessId":"1","menuId":"19","subMenuId":"12","itemId":"6","ingredients":"Caramel Sauce","price":"5","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[13] ={"id":"18","businessId":"1","menuId":"19","subMenuId":"12","itemId":"6","ingredients":"Chocolate Sauce","price":"5","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[14] ={"id":"20","businessId":"1","menuId":"11","subMenuId":"2","itemId":"2","ingredients":"More prawn","price":"34.00","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[15] ={"id":"25","businessId":"1","menuId":"16","subMenuId":"24","itemId":"16","ingredients":"olive oil","price":"12","category":"base","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[16] ={"id":"26","businessId":"1","menuId":"16","subMenuId":"25","itemId":"17","ingredients":"rinsed anchovies","price":"0","category":"base","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[17] ={"id":"27","businessId":"1","menuId":"19","subMenuId":"26","itemId":"18","ingredients":"buttered cinnamon sugar","price":"10","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[18] ={"id":"28","businessId":"1","menuId":"19","subMenuId":"28","itemId":"19","ingredients":"grandma","price":"1","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[19] ={"id":"29","businessId":"1","menuId":"17","subMenuId":"29","itemId":"20","ingredients":"Painkiller","price":"23","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[20] ={"id":"30","businessId":"1","menuId":"17","subMenuId":"30","itemId":"22","ingredients":"sugar","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[21] ={"id":"31","businessId":"1","menuId":"11","subMenuId":"8","itemId":"23","ingredients":"additional rice","price":"5","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[22] ={"id":"32","businessId":"1","menuId":"11","subMenuId":"8","itemId":"23","ingredients":"rice","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[23] ={"id":"33","businessId":"1","menuId":"11","subMenuId":"8","itemId":"23","ingredients":"sambar","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[24] ={"id":"34","businessId":"1","menuId":"11","subMenuId":"8","itemId":"24","ingredients":"Fish","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[25] ={"id":"35","businessId":"1","menuId":"11","subMenuId":"8","itemId":"24","ingredients":"Additional fish","price":"12","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[26] ={"id":"36","businessId":"1","menuId":"11","subMenuId":"9","itemId":"25","ingredients":"Bread","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[27] ={"id":"37","businessId":"1","menuId":"11","subMenuId":"9","itemId":"25","ingredients":"juice","price":"15","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[28] ={"id":"38","businessId":"1","menuId":"11","subMenuId":"10","itemId":"26","ingredients":"Spicy Chicken ","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[29] ={"id":"39","businessId":"1","menuId":"11","subMenuId":"10","itemId":"26","ingredients":"Tomato Gravy","price":"21","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[30] ={"id":"40","businessId":"1","menuId":"11","subMenuId":"11","itemId":"27","ingredients":"chicken","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[31] ={"id":"41","businessId":"1","menuId":"16","subMenuId":"31","itemId":"28","ingredients":"Stuffed with Blue Cheese","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[32] ={"id":"42","businessId":"1","menuId":"16","subMenuId":"32","itemId":"29","ingredients":"choice of bacon","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[33] ={"id":"43","businessId":"1","menuId":"16","subMenuId":"33","itemId":"30","ingredients":"artichoke","price":"0","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[34] ={"id":"44","businessId":"1","menuId":"11","subMenuId":"9","itemId":"31","ingredients":"rava","price":"30","category":"base","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[35] ={"id":"45","businessId":"1","menuId":"11","subMenuId":"9","itemId":"31","ingredients":"ghee","price":"10","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[36] ={"id":"46","businessId":"1","menuId":"11","subMenuId":"9","itemId":"31","ingredients":"cashew nuts","price":"50","category":"default","ingredients YN":"","limts":"","extras":""};
                                    itemingsData[37] ={"id":"47","businessId":"1","menuId":"11","subMenuId":"9","itemId":"31","ingredients":"coriander leaves","price":"5","category":"addon","ingredients YN":"","limts":"","extras":""};
                                    db.transaction(function(tx){
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS itemings (sNo INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER, businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,ingredients TEXT, price TEXT, category TEXT)');
                                        for(var l=0; l<itemingsData.length; l++){
                                            tx.executeSql('INSERT OR REPLACE INTO itemings(id,businessId,menuId,subMenuId,itemId,ingredients,price,category) VALUES("'+itemingsData[l].id+'","'+itemingsData[l].businessId+'","'+itemingsData[l].menuId+'","'+itemingsData[l].subMenuId+'","'+itemingsData[l].itemId+'","'+itemingsData[l].ingredients+'","'+itemingsData[l].price+'","'+itemingsData[l].category+'")',successID);
                                        }
                                        //tx.executeSql("SELECT * FROM  itemings", [], function(tx, results) {
                                        //    //alert("SELECT QUERY");
                                        //    //alert("itemings->"+results.rows.length);
                                        //});
                                    });
                                    /* businessDetails */
                                    db.transaction(function(tx){
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS businessDetails (businessId INTEGER, brandName TEXT,companyName TEXT,address1 TEXT,address2 TEXT,city TEXT,state TEXT,country TEXT,postalCode TEXT,phoneNumber1 TEXT,phoneNumber2 TEXT,email1 TEXT,email2 TEXT,website TEXT,latitude TEXT,longitude TEXT)');
                                        tx.executeSql('INSERT INTO businessDetails(businessId, brandName,companyName,address1,address2,city,state,country,postalCode,phoneNumber1,phoneNumber2,email1,email2,website,latitude,longitude) VALUES ("1","Branbox Restaurant","Branbox","Bajanai Madam Street","Ellaipillaichavady","puducherry","puducherry","india","605005","0413-2200566","0123456789","admin@branbox.com","info@branbox.com","www.branbox.com","0","0")',successID);
                                        tx.executeSql("SELECT * FROM  businessDetails", [], function(tx, results) {
                                            //alert("SELECT QUERY");
                                            //alert("businessDetails->"+results.rows.length);
                                        });
                                    });
                                    /* location */
                                    var locationData = [];
                                    locationData[0] ={"id":"23","businessId":"1","branchname":"Branbox  1","country":" India","state":" Puducherry","city":" Vazhakulam","latitude":"11.9451622","longitude":"79.83466479999993","image":"img/location/1444140342_1_location.jpg","status":"ON"};
                                    locationData[1] ={"id":"24","businessId":"1","branchname":"Branbox 34","country":"Sharjah - United Arab Emirates","state":null,"city":null,"latitude":"25.3223269","longitude":"55.51364330000001","image":"img/location/1444235348_1_location.jpg","status":"ON"};
                                    locationData[2] ={"id":"25","businessId":"1","branchname":"Dubai Branch","country":"Al Maktoum Road - Dubai - United Arab Emirates","state":null,"city":null,"latitude":"25.259933","longitude":"55.32276839999997","image":"img/location/1445843572_1_location.jpg","status":"ON"};
                                    db.transaction(function(tx){
                                        var locationData = [];
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS location (sNo INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER,businessId INTEGER,branchname TEXT,country TEXT,state TEXT,city TEXT,latitude TEXT,longitude TEXT,image TEXT,status TEXT)');
                                        for(var m=0; m<locationData.length; m++){
                                            tx.executeSql('INSERT OR REPLACE INTO location (id,businessId,branchname,country,state,city,latitude,longitude,image,status) VALUES("'+locationData[m].id+'","'+locationData[m].businessId+'","'+locationData[m].branchname+'","'+locationData[m].country+'","'+locationData[m].state+'","'+locationData[m].city+'","'+ locationData[m].latitude+'","'+ locationData[m].longitude+'","'+targetPath+'","'+locationData[m].status+'")',successID);
                                        }
                                        //tx.executeSql("SELECT * FROM  location", [], function(tx, results) {
                                        //    //alert("SELECT QUERY");
                                        //    //alert("location->"+results.rows.length);
                                        //});
                                    });
                                    /* album */
                                    var albumData = [];
                                    albumData[0] ={"galId":"1","businessId":"1","galName":"Menu","status":"ON"};
                                    albumData[1] ={"galId":"7","businessId":"1","galName":"item","status":"ON"};
                                    db.transaction(function(tx){
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS album (sNo INTEGER PRIMARY KEY AUTOINCREMENT, galId INTEGER, businessId INTEGER,galName TEXT,status TEXT)');
                                       // alert("hiii"+ albumData.length);
                                        for (var a=0;a<albumData.length;a++){
                                            tx.executeSql('INSERT INTO album(galId, businessId,galName,status) VALUES ("'+albumData[a].galId+'","'+albumData[a].businessId+'","'+albumData[a].galName+'","'+albumData[a].status+'")',successID);
                                        }
                                        //tx.executeSql("SELECT * FROM  album", [], function(tx, results) {
                                        //    //alert("SELECT QUERY");
                                        //    //alert("album->"+results.rows.length);
                                        //});
                                    });
                                    /* gallery */
                                    var galleryData = [];
                                    galleryData[0] ={"id":"60","businessId":"1","galId":"1","name":"20151217144730.png","size":"","link":"img/gallery/20151217144730.png","active":"ON","createdTime":"2016-01-29 15:20:21"};
                                    galleryData[1] ={"id":"62","businessId":"1","galId":"7","name":"20160128155446.png","size":"","link":"img/gallery/20160128155446.png","active":"ON","createdTime":"2016-02-08 14:51:56"};
                                    galleryData[2] ={"id":"63","businessId":"1","galId":"1","name":"20160128155446.png","size":"","link":"img/gallery/OliviaFront.jpg","active":"ON","createdTime":"2016-02-08 14:51:56"};
                                    db.transaction(function(tx){
                                        //alert("galleryData "+galleryData.length);
                                        //tx.executeSql('CREATE TABLE IF NOT EXISTS gallery (sNo INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER PRIMARY KEY AUTOINCREMENT,galId INTEGER, images TEXT, timeStamp TEXT)');
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS gallery (id INTEGER PRIMARY KEY AUTOINCREMENT,galId INTEGER, images TEXT, timeStamp TIMESTAMP)');
                                        //alert("galleryData "+galleryData.length);
                                        for(var q=0; q<galleryData.length; q++){
                                                tx.executeSql('INSERT OR REPLACE INTO gallery (galId,images,timeStamp) VALUES("'+galleryData[q].galId+'","' +galleryData[q].link+ '","' +galleryData[q].createdTime+ '")',successID);
                                        }
                                        tx.executeSql("SELECT * FROM  gallery", [], function(tx, results) {
                                            //alert("SELECT QUERY");
                                            //alert("gallery->"+results.rows.length);
                                        });
                                    });
                                    /* Video */
                                    var videoGalleryData = [];
                                    videoGalleryData[0]={"id":"6","businessId":"1","videoName":"big_buck_bunny.mp4","videoUrl":"img/videos/big_buck_bunny.mp4","status":"ON","createdTime":"2015-10-23 09:43:59","modified_date":"2016-02-13 08:01:38"};
                                    db.transaction(function(tx){
                                        //alert("galleryData "+videoGalleryData.length);
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS video (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, timeStamp TIMESTAMP)');
                                        //alert("VideoData-> "+videoGalleryData.length);
                                        for(var q=0; q<videoGalleryData.length; q++){
                                             //tx.executeSql('INSERT OR REPLACE INTO video (url,timeStamp) VALUES("' + targetPath + '","' + cTime + '")',successID);
                                                tx.executeSql('INSERT OR REPLACE INTO video (url,timeStamp) VALUES("'+videoGalleryData[q].videoUrl+'","' +videoGalleryData[q].createdTime+ '")',successID);
                                        }
                                        tx.executeSql("SELECT * FROM  video", [], function(tx, results) {
                                           // alert("SELECT QUERY");
                                            //alert("video->"+results.rows.length);
                                        });
                                    });
                                    
                                    /* aboutUs */
                                    db.transaction(function(tx){
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS aboutUs (id INTEGER PRIMARY KEY AUTOINCREMENT, businessId INTEGER, title TEXT, description TEXT, image TEXT, timeStamp TIMESTAMP)');
                                        tx.executeSql('INSERT OR REPLACE INTO aboutUs (businessId, title, description,image,timeStamp) VALUES("1","Hotel Le Cafe","In Pondicherry beach","img/aboutUs/20151216175401.png","2015-12-16 17:58:10")',successID);
                                        tx.executeSql("SELECT * FROM  aboutUs", [], function(tx, results) {
                                            //alert("SELECT QUERY");
                                            //alert("aboutUs->"+results.rows.length);
                                        });
                                    });
                                    /* aboutUsGallery */
                                    var aboutUsGalleryData = [];
                                    aboutUsGalleryData[0] ={"id":"6","businessId":"1","imageName":"20151216175854.png","imageUrl":"img/aboutGallery/20151216175854.png","createdTime":"2015-12-16 17:59:04"};
                                    aboutUsGalleryData[1] ={"id":"13","businessId":"1","imageName":"20151216174527.png","imageUrl":"img/aboutGallery/20151216174527.png","createdTime":"2015-12-16 17:45:59"};
                                    aboutUsGalleryData[2] ={"id":"14","businessId":"1","imageName":"20151216174542.png","imageUrl":"img/aboutGallery/20151216174542.png","createdTime":"2015-12-16 17:45:59"};
                                    db.transaction(function(tx){
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS aboutUsGallery (id INTEGER PRIMARY KEY AUTOINCREMENT,  aboutGalleryImages TEXT, timeStamp TIMESTAMP)');
                                        for(var n=0; n<aboutUsGalleryData.length; n++){
                                            tx.executeSql('INSERT OR REPLACE INTO aboutUsGallery (aboutGalleryImages,timeStamp) VALUES("'+ aboutUsGalleryData[n].imageUrl +'","'+ aboutUsGalleryData[n].createdTime +'")',successID);
                                        }
                                        tx.executeSql("SELECT * FROM  aboutUsGallery", [], function(tx, results) {
                                            
                                            //alert("aboutUsGallery->"+results.rows.length);
                                                var firsttimeLoading=localStorage.getItem("firsttimeLoading");
                                                //alert(firsttimeLoading);
                                                //localStorage.setItem("InitialLoading","old");
                                                //localStorage.setItem("firsttimeLoading","old");
                                                $timeout( function(){
                                                    $cordovaDialogs.confirm('Please Open Next time', 'Initialization Completed!', ['OK','Thank you'])
                                                    .then(function(buttonIndex) {
                                                        //alert("SELECT QUERY");
                                                        localStorage.setItem("InitialLoading","old");
                                                        localStorage.setItem("firsttimeLoading","old");
                                                        if (buttonIndex==1 || buttonIndex==2 ) {
                                                            ionic.Platform.exitApp();
                                                             //$ionicLoading.hide();
                                                        }
                                                    });
                                                }, 1000);
                                                //if (firsttimeLoading=="new") {
                                                //    
                                                //
                                                //       
                                                //        $cordovaDialogs.alert("Please Open Next time", 'Initialization Completed!', 'OK')
                                                //        .then(function() {
                                                //                         
                                                //        });
                                                //        
                                                //}
                                        });
                                    });
                                    /* video */
                                    db.transaction(function(tx){
                                        var videoData = [];
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS video (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, timeStamp TIMESTAMP)');
                                    });

                                }
                        }

           else  if($cordovaNetwork.isOnline())
            {
                        var initStatus = 0;
                        localStorage.setItem("cartCount", 0);
                        localStorage.setItem("businessId",1);
                        var businessId= localStorage.getItem("businessId");     
						var firsttimeLoading= "new";       
                        if (firsttimeLoading=="new")
                        {
							FunctionMenu();
							function FunctionMenu()
							{
								initStatus++;
							   //alert("updationMnu");
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
														//alert("menu done");
														FunctionSubMenu();
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
										}
									});
								}).error(function(){  
									// open(location, '_self').close(); 
									// alert("server Error");
								});
								//Menu page end
								
								
							}
							//FunctionSubMenu();
							function FunctionSubMenu()
							{
								initStatus++;
								//Sub Menu page Start
								$http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxGetAllData.php',{bussId: businessId,nav:"subMenu"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
								.success(function (data) {
									var ajaxlength = data.rows.length;
									var counterMenu = 0;
									var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
									db.transaction(function(tx){
										tx.executeSql('DROP TABLE IF EXISTS subMenu');
										tx.executeSql('CREATE TABLE IF NOT EXISTS subMenu (id INTEGER, businessId INTEGER, menuId INTEGER, name TEXT, image TEXT, position TEXT, status TEXT, online TEXT,submenuchiled TEXT)');
										
										for(var i=0; i < ajaxlength; i++){
			
											var url = data.rows[i]['image'];
											var filename =url.split("/").pop();
											var targetPath = cordova.file.externalRootDirectory+"Branbox/SubMenu/"+ filename;
											var trustHosts = true
											var options = {};
											$cordovaFileTransfer.download(url, targetPath, options, trustHosts)
											  .then(function(result) {
												counterMenu++;
												if(ajaxlength == counterMenu)
												{
													//alert("SubMenu done");
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
			
										}
									});
									
								}).error(function(){  
									// open(location, '_self').close(); 
									// alert("server Error");
								});
								//Sub Menu page end
							
							}
                                
							//Color Settings Start..
							Colorsetting();
							function Colorsetting(){
								$http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxColorSettings.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
								.success(function (colorSettings) {
									var ajaxlength = colorSettings.rows.length;
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
									var needCartConcept=colorSettings.rows[0]['needCartConcept'];
									var signInImage=colorSettings.rows[0]['signInImage'];
									var subMenuOption=colorSettings.rows[0]['subMenuOption'];
									
									localStorage.setItem("subMenuOption",subMenuOption);
									localStorage.setItem("pickupTime",pickupTime);
									localStorage.setItem("deliveryTime",deliveryTime);
									localStorage.setItem("startTime",startTime);
									localStorage.setItem("closeTime",closeTime);
									localStorage.setItem("cartCaption",cartCaption);
								   // alert(HeaderColor+"Header Color"+currencyFormat+"Format");
									var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
									db.transaction(function(tx){
									   // tx.executeSql('DROP TABLE IF EXISTS colorSetting');
									   // tx.executeSql('CREATE TABLE IF NOT EXISTS colorSetting (id INTEGER, businessId INTEGER,currencyFormat TEXT,HeaderColor TEXT,HeaderLogo TEXT,SideHeaderLogo TEXT,pickupTime TEXT,deliveryTime TEXT,startTime TEXT,closeTime TEXT,cartCaption TEXT)');
										
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
											
											tx.executeSql('INSERT OR REPLACE INTO colorSetting (id,businessId,currencyFormat,HeaderColor,HeaderLogo,SideHeaderLogo,pickupTime,deliveryTime,startTime,closeTime,cartCaption) VALUES("1","'+businessId+'","' +currencyFormat+'","'+HeaderColor+'","'+targetPath1+'","'+targetPath2+'","'+pickupTime+'","'+deliveryTime+'","'+startTime+'","'+closeTime+'","'+cartCaption+'")',successID);
										  });
									
								}).error(function(){  
			
								});
							}
							//Color Settings End..
							//Item Data Start..
							//FunctionSubMenuItem();
							function FunctionSubMenuItem()
							{
								initStatus++;
								$http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxGetAllData.php',{bussId: businessId,nav:"item"}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
									.success(function (data) {
										var ajaxlength = data.rows.length;
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
														//alert("item done");
														location();
													}
												  }, function(error) {
												  }, function (progress) {
													$timeout(function () {
													  $scope.downloadProgress = (progress.loaded / progress.total) * 100;
													})
												  });
												tx.executeSql('INSERT OR REPLACE INTO item (id,businessId,menuId,subMenuId,name,image,price,oldPrice,tax,offers,positions,status,online,offerStatus) VALUES("'+data.rows[i].id+'","'+data.rows[i].businessId+'","'+data.rows[i].menuId+'","'+data.rows[i].subMenuId+'","'+data.rows[i].name+'","'+targetPath+'","'+ data.rows[i].price+'","'+ data.rows[i].oldPrice+'","'+ data.rows[i].tax+'","'+data.rows[i].offers+'","'+data.rows[i].positions+'", "'+data.rows[i].status+'", "'+data.rows[i].online+'", "'+data.rows[i].offerStatus+'")',successID);
											   
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
									var ajaxlength = jsonIng.rows.length;
									var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
									db.transaction(function(tx){
										tx.executeSql('DROP TABLE IF EXISTS itemings');
										tx.executeSql('CREATE TABLE IF NOT EXISTS itemings (id INTEGER, businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,ingredients TEXT, price TEXT, category TEXT)');
									//alert(jsonIng.rows.length);
									// alert(jsonIng.rows.length+" outer Ing");
										for(var i = 0; i < jsonIng.rows.length; i++) {
											tx.executeSql('INSERT OR REPLACE INTO itemings(id,businessId,menuId,subMenuId,itemId,ingredients,price,category) VALUES("'+jsonIng.rows[i].id+'","'+jsonIng.rows[i].businessId+'","'+jsonIng.rows[i].menuId+'","'+jsonIng.rows[i].subMenuId+'","'+jsonIng.rows[i].itemId+'","'+jsonIng.rows[i].ingredients+'","'+jsonIng.rows[i].price+'","'+jsonIng.rows[i].category+'")',successID);
											counterMenuitem++;
											if(ajaxlength == counterMenuitem)
											{
												//alert("Item Ings");
											}
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
									var ajaxlength = business.rows.length;
									//alert("itemings--"+ajaxlength);
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
							}
							//Location Start..
							
                            function location(){
								$http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/branbox.php',{'branboxVariable':'location', businessId:'1'},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })
								.success(function(data){
									var ajaxlength=data.rows.length;
									var counterLocation = 0;
									if (ajaxlength==0) {
										$cordovaFile.removeDir(cordova.file.dataDirectory+"Branbox", "Locaion")
										.then(function (success) {
										  //alert("deleted")
										}, function (error) {
										  //alert("not deleted")
										});
									}
									var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
									db.transaction(function(tx){
										tx.executeSql('DROP TABLE IF EXISTS location');
										tx.executeSql('CREATE TABLE IF NOT EXISTS location (id INTEGER,businessId INTEGER,branchname TEXT,country TEXT,state TEXT,city TEXT,latitude TEXT,longitude TEXT,image TEXT,status TEXT)');
										for(var i=0; i < ajaxlength; i++){
											counterLocation++
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
											if(counterLocation == ajaxlength){
												//alert("Location Done");
												FunctionAboutGallery();
											}
										}
									});
								}).error(function(){
									  $scope.data = "error DataBase";
								})
							}
							//Location End
							
                            
							
							function FunctionAboutGallery()
							{
								initStatus++;
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
												//alert("about page-"+aboutSplitName.length);
												var aboutLen = aboutSplitName.length;
												for(var i=0;i < aboutSplitName.length;i++)
												{
													var url = imageUrl[i];
													var filename =url.split("/").pop();
													var targetPath = cordova.file.externalRootDirectory+"Branbox/Aboutus/"+ filename;
													var trustHosts = true
													var count = 0;
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
													count++;
													if(aboutLen = count){
														//alert("About Us done");
													}
													
												}
											}else{
												//alert("about else");
												$.each(aboutUsImage, function(key, value){
													//alert("values");
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
													  //alert("Else About Us Insert Page ");
													tx.executeSql('INSERT OR REPLACE INTO aboutUs (businessId, title, description,image,timeStamp) VALUES("'+value.businessId+'","'+value.title+'","'+value.description+'","'+targetPath+'","'+value.createdTime+'")',successID);
												})
											}     
										})
									});
									
									db.transaction(function(tx){
										tx.executeSql('DROP TABLE IF EXISTS aboutUsGallery');
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
																//alert("aboutUsGallery done");
																//FunctionVideo();
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
															//FunctionVideo();
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
							}
							
							
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
            //End of Updateion            
                                function successID(){
                                  return true;
                                }

                                //function closeApp()
                                //{
                                    if (firsttimeLoading=="new") {
                                            
                                            //localStorage.getItem("updationLength");
                                            localStorage.setItem("firsttimeLoading","old");
                                            //$cordovaDialogs.alert("Please Open Next time", 'Initialization Completed!', 'OK')
                                            //.then(function() {
                                            //         
                                            //});
                                            //ionic.Platform.exitApp()
                                            //$ionicLoading.hide();
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
                                    
                           
                        if($cordovaNetwork.isOnline())
                        {
							alert("Connect Internet");
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
            controller: 'latestOfferController'
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
     .when('/gallerypage',
        {
            controller: 'myProfileDetail',
            templateUrl: 'templates/galleryPage.html'
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
                        localStorage.setItem("updationLength",updation.length);
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