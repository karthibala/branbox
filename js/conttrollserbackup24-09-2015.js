angular.module('starter.controllers', [])


.controller('DashCtrl', function($scope,$ocLazyLoad) {

    setTimeout(function(){
     // window.location="index1.html";
      //$location.path('/menu');
    },5000);
  })
.controller('contactCtrl', function($scope,$http,$location) {

    $("#sidebar").removeClass("toggled");
  $("#menu-trigger").removeClass("open");
   localStorage.setItem("splash", 1);
  
    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/branbox.php', {branboxVariable:'contactUs',businessId:'6'},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
    .success(function(data) {      
        $scope.PhonenumberCall=data['phoneNumber1'];
        $scope.name = '<div class="contactUsName">' +data['brandName']+','+ '</div>'; 
          $scope.companyName = '<div class="contactUsAdd">' +data['companyName']+','+ '</div>'; 
          $scope.address1 = '<div class="contactUsAdd">' +data['address1']+','+ '</div>'; 
          $scope.address2 = '<div class="contactUsAdd">' +data['address2']+','+ '</div>'; 
          $scope.city = '<div class="contactUsAdd">' +data['city']+','+ '</div>'; 
          $scope.state = '<div class="contactUsAdd">' +data['state']+','+ '</div>'; 
          $scope.country = '<div class="contactUsAdd">' +data['country']+','+ '</div>'; 
          $scope.postalCode = '<div class="contactUsAdd">' +data['postalCode']+','+ '</div>'; 
          $scope.phoneNumber = '<div class="contactUsAdd">' +data['phoneNumber1']+','+ '</div>'; 
          $scope.email = '<div class="contactUsAdd">' +data['email1']+','+ '</div>'; 
          $scope.website = '<div class="contactUsAdd">' +data['website']+','+ '</div>'; 
    }).error(function(){         
      $scope.error = "server Error";     
     });
    

    $scope.sendFeedBack=function()
    { 
      var id = localStorage.getItem("id");
      if(id==null)
      {
          swal({   
                          title: "Unable to Send Feed Back",   
                          text: "Please log in",   
                          timer: 2000,   
                          showConfirmButton: false 
                      });
          $location.path('/login');
      }
      else{


        var name=$("#username").val();
        var email=$("#email").val();
        var feedMessage=$("#feedbackMessage").val();
        var useremail= localStorage.getItem("email");
        if(name=="")
      {
          swal({   
              title: "Please Enter Your  Name ",   
              text: "Its Required",   
              timer: 2000,   
              showConfirmButton: false 
          });
          return false;
      }
      if(email=="" || email!=useremail)
      {
          swal({   
              title: "Please Enter Logged Your Email Id ",   
              text: "Its Required",    
              timer: 2000,   
              showConfirmButton: false 
          });
          return false;
      }
      if(feedMessage=="")
      {
          swal({   
              title: "Please Give FeedBack",   
              text: "Its Required",   
              timer: 2000,   
              showConfirmButton: false 
          });
          return false;
      }

      
        var businessId=localStorage.getItem("businessId");
       
        //var id=localStorage.getItem("id");
       
        var feedback={name:name,email:email,userId:id,feedbackMessage:feedMessage,bussId:businessId};
        console.log(feedback);
         $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxFeedBack.php',feedback,{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
          .success(function(data) {   
            console.log(data.success);
            if(data.success="success")
            {
              swal({   
                  title: "FeedBack Send Successfully",   
                //  text: "Please log in",   
                  timer: 2000,   
                  showConfirmButton: false 
              });
               $location.path('/menu');
            }
            
            
            }).error(function(){         
            $scope.error = "server Error";     
           });
      }

    }



  })

.controller('locationCtrl', function($scope, $http) {
  localStorage.setItem("splash", 1);
    $("#sidebar").removeClass("toggled");
    $("#menu-trigger").removeClass("open");
    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/branbox.php',{'branboxVariable':'location', businessId:'1'},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} }).success(function(data){
      $scope.LocationData=data;
      $scope.initialize(data);
    }).error(function(){
        $scope.data = "error DataBase";
    });
  //initialize map
  $scope.initialize = function(data) {
    var infowindow = new google.maps.InfoWindow({disableAutoPan: true})
    var mapOptions = {
        center: new google.maps.LatLng(data[0]['latitude'], data[0]['longitude']),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("locationMap"), mapOptions);
    for (var i = 0; i < data.length; i++) {
      var image = 'img/logo.jpg';
      var marker = new google.maps.Marker({
        map: map,
        // icon: image,
        position: new google.maps.LatLng (data[i]['latitude'], data[i]['longitude'])
      });

      var content = "Business Name:"+data[i]['branchname']+"... Address: "+data[i]['city']+","+data[i]['state']+","+data[i]['country'];     
      google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
        return function() {
           infowindow.setContent(content);
           infowindow.open(map,marker);
        };
      })(marker,content,infowindow)); 
    } 
    $scope.locationMap = map;
  };

  $scope.selectAction=function(data)
  {
     
      var index=$(".location").val();
      if(index=="all")
      {
        $scope.initialize(data); 
      }
      var infowindow = new google.maps.InfoWindow({disableAutoPan: true})
      var mapOptions = {
        center: new google.maps.LatLng(data[index]['latitude'], data[index]['longitude']),
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.SATELLITE 
    };
 
      var map = new google.maps.Map(document.getElementById("locationMap"), mapOptions);
      var marker = new google.maps.Marker({
        map: map,
        // icon: image,
        position: new google.maps.LatLng (data[index]['latitude'], data[index]['longitude'])
      });
      var content = "Business Name:"+data[index]['branchname']+"... Address: "+data[index]['city']+","+data[index]['state']+","+data[index]['country'];     
      google.maps.event.addListener(map,'tilesloaded', (function(marker,content,infowindow){ 
        return function() {

           infowindow.setContent(content);

           infowindow.open(map,marker);
        };
      })(marker,content,infowindow)); 

      google.maps.event.addListener(marker, 'click', function() {
         infowindow.setContent(content);
        infowindow.open(map,marker);
          });
     // alert("completed");
  }




})




.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


//author Pravinkumar on 20/8/2015
.controller('aboutUs', function($scope,$http) {
  localStorage.setItem("splash", 1);
  $("#sidebar").removeClass("toggled");
  $("#menu-trigger").removeClass("open");
  var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);  
  db.transaction(function(tx){
    tx.executeSql('SELECT * FROM  aboutUs',[], function (tx, results){
      for(var i=0; i<results.rows.length; i++){
        $('#title').html('<div class="pmbb-header"><h2> <i class="md md-equalizer m-r-5"></i>'+ results.rows.item(i).title +'</h2></div><div class="pmbb-body p-l-30"><div class="pmbb-view" >'+ results.rows.item(i).description +'</div><br></div>');
      }
    });
  });
  
  db.transaction(function(tx){
    tx.executeSql('SELECT * FROM  aboutUsImage',[], function (tx, results){
      for(var i=0; i<results.rows.length; i++){
        $('#images').html('<img class="img-responsive" src='+ results.rows.item(i).image +'>');
      }
    });
  });

  db.transaction(function(tx){
    tx.executeSql('SELECT * FROM  aboutUsGallery',[], function (tx, results){
      for(var i=0;i<results.rows.length-1;i++){    
        $('#lightbox').append('<div class="col-md-3 col-sm-4 col-xs-6" data-src='+ results.rows.item(i).aboutGalleryImages +' ><div class="lightbox-item p-item"><img src='+ results.rows.item(i).aboutGalleryImages + ' class="animated flip"></div></div>'); 
        console.log($('#lightbox'));
        if(i >= results.rows.length-2){
          $('.lightbox').lightGallery({
            enableTouch: true
          });
        }
      }
    });
  });
})
.controller('gallery', function($scope,$http) {
  localStorage.setItem("splash", 1);
    $("#sidebar").removeClass("toggled");
  $("#menu-trigger").removeClass("open");
    var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
    db.transaction(function(tx){
      tx.executeSql('SELECT * FROM  gallery',[], function (tx, results){
        //alert(results.rows.length);
      for(var i=0;i<results.rows.length;i++){      
        $('#lightbox').append('<div class="col-md-3 col-sm-4 col-xs-6" data-src='+ results.rows.item(i).images +' ><div class="lightbox-item p-item"> <img src='+ results.rows.item(i).images + ' class="animated flip"></div></div>'); 
        if(i >= results.rows.length-1){
          $('.lightbox').lightGallery({
                    enableTouch: true
                });
          }

      }
    })
    })
    db.transaction(function(tx){
      tx.executeSql('SELECT * FROM  video',[], function (tx, results){
      for(var i=0;i<results.rows.length;i++){
        $('#videoUrl').append('<video style="height: 100%; width: 100%" poster="img/profile-menu.png" controls="controls" preload="auto" data-setup="{}"> <source type="video/mp4" src="'+ results.rows.item(i).url +'" /> </video>');

      }
    })
    })
})
.controller('MenuController', function($scope,$http,$location,alertmsg) {
    //alert('test');
    localStorage.setItem("splash", 0);
    $("#sidebar").removeClass("toggled");
    $("#menu-trigger").removeClass("open");
    $scope.useremail= localStorage.getItem("email");
    $scope.loggedIn=localStorage.getItem("loggedIn");
    $scope.userName= localStorage.getItem("userName");
    $scope.userId= localStorage.getItem("id");
    

      

        var businessId=1;
         $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxOffers.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
            .success(function (json) {
               console.log(json);
                 $scope.OffersData=json.rows;
                 $scope.countOffers=json.rows.length;
                 console.log($scope.countOffers);
              }).error(function(){  

                });

            $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxColorSettings.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
            .success(function (colorSettings) {
                  $scope.colorSetting=colorSettings.rows;
                  $scope.HeaderColor=colorSettings.rows[0]['headerColor'];
                  $scope.HeaderLogo=colorSettings.rows[0]['favIcon'];
                  $scope.SideHeaderLogo=colorSettings.rows[0]['bannerImage'];
                  $scope.currencyFormat=colorSettings.rows[0]['currencyFormat'];
                   localStorage.setItem("currencyFormat", $scope.currencyFormat);
              }).error(function(){  
                });

            setInterval(function(){

                $scope.TokenNumber=localStorage.getItem("tokenNumber");
                if($scope.TokenNumber!=null)
                {

                    $scope.FeedBackcount=1;
                }

               
            },3000);
          var getMessage={
              id:businessId,
              useremail:$scope.useremail,
              userId:$scope.userId,
              message:'message'
          }

    if($scope.useremail!="" && $scope.userName!="")
    {
      $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxGetMessage.php',getMessage, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
            .success(function (json) {
               console.log(json);
               if(json.error=="error")
               {
                  
                  $scope.FeedBackcount=null;
               }
               else
               {  
                
                  $scope.FeedBackMessage=json.rows;
                  $scope.FeedBackcount=json.rows.length;
                  //console.log(countOffers11);
                  console.log($scope.FeedBackMessage);
               }
                 
              }).error(function(){
          });
    }
      $scope.sendResponse=function()
      {
        
        $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxFeedBackStatus.php',$scope.FeedBackMessage, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
        .success(function (colorSettings) {
            console.log($scope.FeedBackMessage);
            console.log(colorSettings);
          }).error(function(){  
        });
      }
        $("*#dropdownClose2").click(function () {

     $scope.countOffers=null;
    $(this).removeClass("open");
});

        var json_arr=[];
    var menuDetails=[];
   // Menus from server and sync here.....
    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxMenu.php',{bussId: businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      .success(function (json) {
        var ajaxlength = json.rows.length;
        //alert(ajaxlength);
         $scope.MenuData= json.rows;

          
          
        
         // console.log($scope.MenuData);
      }).error(function(){  
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
            db.transaction(function(tx){
                tx.executeSql('SELECT * FROM menu',[], function (tx, results)
                {

                    var itemLength = results.rows.length;
                    var menudatas=results.rows;
                    for(var i = 0; i < itemLength; i++)
                    {
                       
                      var row = menudatas.item(i);
                      var obj = {id:row.id,businessId:row.businessId,name:row.name,image:row.image,position:row.position,status:row.status,online:row.online};
                      json_arr.push(obj);
                    }
                    $scope.MenuData=json_arr;
                    console.log($scope.MenuData);
                });
            });

       });
// //alert("local image");
    
      
      //$scope.menuData=alertmsg.all();
      // alert($scope.menuData);
      // console.log($scope.menuData);
  
      
      
        
           

})

.controller('SubMenuController', function($scope,$http,$location) {
    $("#sidebar").removeClass("toggled");
  $("#menu-trigger").removeClass("open");

  localStorage.setItem("splash", 1);
    var businessId=1;
   var url = $location.url();
    var temp = url.split("=");
    var getMenuId=temp[1];
    var json_arr=[];
    $scope.SubMenuData='';
    //var getMenuId=11;

          //Menus from server and sync here.....

     $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxSubMenuWithItem.php',{bussId:businessId,menuId:getMenuId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      .success(function (json) {
       
        var ajaxlength = json.rows.length;
       

         $scope.SubMenuData= json.rows;
          //console.log($scope.SubMenuData);
      }).error(function(){ 
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                db.transaction(function(tx){
                    tx.executeSql('SELECT * FROM subMenu where menuId="'+getMenuId+'" ',[], function (tx, results)
                    {
                        var itemLength = results.rows.length;
                        //alert(itemLength);
                        var menudatas=results.rows;
                        for(var i = 0; i < itemLength; i++)
                        {
                            var row = menudatas.item(i);
                            //var obj = {id:row.id,businessId:row.businessId,menuId:row.menuId,name:row.name,image:row.image,position:row.position,status:row.status,online:row.online};
                            $('#submebu').append('<div class="listview"><a href="#items/='+row.menuId+'='+row.id+'" class="lv-item"><div class="media"><div class="pull-left p-relative"><img alt="" src="'+row.image+'" class="lv-img-sm"></div><div class="media-body"><div class="lv-title" id="menu-size">'+row.name+'</div><small class="lv-small">'+row.name+'Categories</small></div></div></a></div>');
                            //json_arr.push(obj);
                            //alert(row.name);
                        }
                        //$scope.SubMenuData=json_arr;
                        alert($scope.SubMenuData);
                        //console.log($scope.SubMenuData);
                    });
                });
          //alert("server Error");
       });

        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                db.transaction(function(tx){
                    tx.executeSql('SELECT * FROM subMenu where menuId="'+getMenuId+'" ',[], function (tx, results)
                    {
                        var itemLength = results.rows.length;
                        //alert(itemLength);
                        var menudatas=results.rows;
                        for(var i = 0; i < itemLength; i++)
                        {
                            var row = menudatas.item(i);
                            var obj = {id:row.id,businessId:row.businessId,menuId:row.menuId,name:row.name,image:row.image,position:row.position,status:row.status,online:row.online};
                           // $('#submebu').append('<div class="listview"><a href="#items/='+row.menuId+'='+row.id+'" class="lv-item"><div class="media"><div class="pull-left p-relative"><img alt="" src="'+row.image+'" class="lv-img-sm"></div><div class="media-body"><div class="lv-title" id="menu-size">'+row.name+'</div><small class="lv-small">'+row.name+'Categories</small></div></div></a></div>');
                            json_arr.push(obj);
                            //alert(row.name);
                            if(i==itemLength)
                            {

                                return false;
                            }
                        }
                        //return false;
                        $scope.SubMenuData=json_arr;
                        alert($scope.SubMenuData);
                        //console.log($scope.SubMenuData);
                    });
                });

      $scope.goback=function()
      {
        window.history.back();
      }

     //alert(getMenuId);
     


})
.controller('SubMenuItemController', function($scope,$http,$location,alertmsg) {
  $("#sidebar").removeClass("toggled");
  $("#menu-trigger").removeClass("open");


    localStorage.setItem("cartCount", 0);
    localStorage.setItem("businessId", 1);
    var db = window.openDatabase("branboxnew", "1.0", "branbox New", 200 * 1024 * 1024);
        db.transaction(function(tx){
            // tx.executeSql('DROP TABLE IF EXISTS orderitems');
            // tx.executeSql('DROP TABLE IF EXISTS orderingredients');
            // tx.executeSql('DROP TABLE IF EXISTS orderitemingredients');
            tx.executeSql('CREATE TABLE IF NOT EXISTS orderitems (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, itemName TEXT, image TEXT, price TEXT, subTotal TEXT, quantity TEXT,tax TEXT,offers TEXT,orderType TEXT)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS orderingredients (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, ingId INTEGER,ingredients TEXT,price TEXT, ingredientsYN TEXT, extras TEXT)'); 
            tx.executeSql('CREATE TABLE IF NOT EXISTS orderitemingredients (id INTEGER PRIMARY KEY AUTOINCREMENT,itemStorageId INTEGER, businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER,userId INTEGER, ingId INTEGER, ingredients TEXT, price TEXT, ingredientsYN TEXT, extras TEXT)');                                   
        
    });



  localStorage.setItem("splash", 1);

  $scope.useremail= localStorage.getItem("email");
  $scope.userid= localStorage.getItem("id");
  $scope.userName= localStorage.getItem("userName");
  $scope.currency=localStorage.getItem("currencyFormat");


    var businessId=1;
    var url = $location.url();
    var url = $location.url();
    var temp = url.split("=");
    var menuId=temp[1];
    var subMenuId=temp[2];
    //var getMenuId=11;
    var ingredients=[];

          //Menus from server and sync here.....
     $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxSubMenu.php',{bussId:businessId,menuId:menuId,subMenuId:subMenuId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      .success(function (json) {
       
        var ajaxlength = json.rows.length;
        // console.log( json.rows[0].menuId);
        // console.log( json.rows[0].subMenuId);
        // console.log( json.rows[0].id);
         for(var i=0; i<ajaxlength;i++)
         {
            $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxIngredients.php',{bussId:businessId,menuId:json.rows[i].menuId,subMenuId:json.rows[i].subMenuId,itemId:json.rows[i].id}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
            .success(function (jsonIng) {
                //alert(jsonIng.rows.length);
                for(var i = 0; i < jsonIng.rows.length; i++) {
                    var row = jsonIng.rows[i];
                    var obj = {id:row.id,businessId: row.businessId,menuId:row.menuId,subMenuId:row.subMenuId,itemId:row.itemId,ingredients:row.ingredients,price:row.price,category:row.category};
                   console.log(obj);
                    ingredients.push(obj);
                }

                //ingredients.push(jsonIng.rows);

            });

         }
         
         $scope.SubMenuItemIngredientsData=ingredients;
         //console.log($scope.SubMenuItemIngredientsData);
         $scope.SubMenuItemData= json.rows;
          //console.log($scope.SubMenuItemData);
      }).error(function(){  
         // alert("server Error");
       });


              // var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
              // db.transaction(function(tx){
              //  // tx.executeSql('DROP TABLE IF EXISTS ordertable');
              //     tx.executeSql('DELETE FROM ordertable');
              //     tx.executeSql('CREATE TABLE IF NOT EXISTS orderitems (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER, itemName TEXT, image TEXT, price TEXT, subTotal TEXT, quantity TEXT, garnish TEXT,tax TEXT,offers TEXT)');

              //     tx.executeSql('CREATE TABLE IF NOT EXISTS orderingredients (id INTEGER PRIMARY KEY AUTOINCREMENT,businessId INTEGER ,menuId INTEGER, subMenuId INTEGER,itemId INTEGER, ingId INTEGER, ingredientsYN TEXT, extras TEXT)');                  
              //   //tx.executeSql('INSERT OR REPLACE INTO ordertable (businessId,menuId,subMenuId,itemId,itemName,image,subTotal,quantity,garnish,tax,offers)VALUES ("23","34","6634","23","34","6634","23","34","6634","23","34")',successID);
              //    function successID(){
              //        return true;
              //    }

              //   });
               
      $scope.goback=function()
      {
        //alert();
        window.history.back();
      }

      // $scope.goToCart=function()
      // {
      //    $location.path('/addTocart');
      // }

    $scope.minus=function(val,index,item)
    {
      console.log(item);
      // alert();
     var total=$("#quantity"+index).val();
    // alert(total);
     total--;
      if (total>=1)
      {
         
          var price=item.price *total;
         // alert(price);
          $("#quantity"+index).val(total);
          $("#price"+index).html(price);
          $("#addtocart"+index).val(total);
      }
      else{
          var price=item.price*1;
          $("#price"+index).html(price);
        }
    }

    $scope.plus=function(val,index,item)
    {
      var total= $("#quantity"+index).val();
        if (total>=1)
        {
         
            total++;
            var price=item.price *total;
              $("#quantity"+index).val(total);
              $("#price"+index).html(price);
              $("#addtocart"+index).val(total);
          
        }
    }

    $scope.addToCart=function(val,index,json)
    {


            var email = localStorage.getItem("id");
            if(email==null)
            {
                swal({   
                                title: "Unable to Order",   
                                text: "Please log in",   
                                timer: 2000,   
                                showConfirmButton: false 
                            });
                $location.path('/login');
            }
            else
            {
              //localStorage.setItem("cartCount", 0);
              //alert();
              $scope.cartCountGet= localStorage.getItem("cartCount");
            var quantity= $("#quantity"+index).val();
              $("#cartCount").html($scope.cartCountGet);
              var nFrom = $(this).attr('data-from');
              var nAlign = "center";
              var nIcons = $(this).attr('data-icon');
              var nType = $(this).attr('data-type');
              var nAnimIn = $(this).attr('data-animation-in');
              var nAnimOut = $(this).attr('data-animation-out');
              var message= quantity+"\t"+json.name+" Added to The Cart ";
            
             var userid= localStorage.getItem("id");
             var ingPrice=0;
              var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                    db.transaction(function(tx){
                      tx.executeSql('SELECT * FROM orderitems where itemId="'+json.id+'"  and  orderType="order"  ',[], function (tx, results)
                      {

                        tx.executeSql('SELECT * FROM orderingredients',[], function (tx, results)
                        {

                          var itemLength = results.rows.length;
                          var menudatas=results.rows;
                          
                              for(var i = 0; i < itemLength; i++) 
                              {
                                  var row = menudatas.item(i);
                                 // console.log(row.price);
                                 ingPrice+=parseFloat(row.price);
                              }
                                var miniTotal=parseFloat(json.price)+ingPrice;
                                //console.log(miniTotal);
                                var subtotalValue=miniTotal * quantity;
                                subtotalValue=subtotalValue.toFixed(1);
                                //console.log(json);
                                  //var subtotalValue=ingPrice+price;
                                  //console.log(subtotalValue);
                            var itemLength = results.rows.length;
                            tx.executeSql('INSERT OR REPLACE INTO orderitems (businessId,menuId,subMenuId,itemId,userId,itemName,image,price,subTotal,quantity,tax,offers,orderType)VALUES("'+json.businessId+'","'+json.menuId+'","'+json.subMenuId+'","'+json.id+'","'+userid+'","'+json.name+'","'+json.image+'","'+miniTotal+'","'+subtotalValue+'","'+quantity+'","'+json.tax+'","'+json.offers+'","order")',successID,function(tx, sql_res) {
                    
                            var itemLastInsertId = sql_res.insertId;
                             // alert(itemLastInsertId);
                            tx.executeSql('SELECT * FROM orderingredients',[], function (tx, results)
                            {
                                 var IngredientsDate=results.rows;
                                 console.log(IngredientsDate);

                                  var itemLength = results.rows.length;
                                  var menudatas=results.rows;
                                  //alert(itemLength);
                                    //alert(results.rows.item(0).subMenuName);
                                  for(var i = 0; i < itemLength; i++) {
                                      var row = menudatas.item(i);
                                      //console.log(row );
                                      tx.executeSql('INSERT OR REPLACE INTO orderitemingredients (itemStorageId,businessId,menuId,subMenuId,itemId,userId,ingId,ingredients,price,ingredientsYN,extras)VALUES("'+itemLastInsertId+'","'+row.businessId+'","'+row.menuId+'","'+row.subMenuId+'","'+row.itemId+'","'+row.userId+'","'+row.ingId+'","'+row.ingredients+'", "'+row.price+'","'+row.ingredientsYN+'","'+row.extras+'")',successID);
                                      //var obj = {id:row.id,businessId: row.businessId,menuId:row.menuId,subMenuName:row.subMenuName,image:row.image,position:row.position,status:row.status,online:row.online,createdTime:row.createdTime};
                                     // json_arr.push(obj);
                                  }  

                                 
                                  //tx.executeSql('INSERT OR REPLACE INTO orderitemingredients (businessId,menuId,subMenuId,itemId,ingId,ingredientsYN,extras)VALUES("'+json.businessId+'","'+json.menuId+'","'+json.subMenuId+'","'+json.itemId+'","'+json.id+'","'+data+'","")',successID);
                                  tx.executeSql('DELETE FROM orderingredients');   
                                 
                                  $('#FormValidation'+index)[0].reset();
                                  $(".IngDetails1").val("YES");
                            });
                              function successID(){
                                  return true;
                              }
                           });
                              
                        });


                        
                            $("#addtocart"+index).removeClass("bgm-bluegray");
                            $("#addtocart"+index).addClass("bgm-green");

                           alertmsg.notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut,message);
                           var data=localStorage.getItem("cartCount");
                              data++;
                              //alert(data);
                              localStorage.setItem("cartCount",data);
                               $scope.cartCountGet= data;
                            //localStorage.removeItem("cartCount");
                            $("#cartCount").html(data);
                            //$scope.cartCountGet=cartCountValue;
                            console.log($scope.cartCountGet);
                          
                         // }
                       
                      });
                        function successID(){
                            return true;
                        }

                        
                    });

          }
          
      };

       $scope.savecYesno=function(event,json,index)
       {
          var data= $("#IngDetails"+index).val();
          var userId = localStorage.getItem("id");
          //console.log(json);
          
          if(data=="NO")
          {
            $("#IngDetails"+index).val("YES");
            $("#notes"+index).val("");
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
              db.transaction(function(tx){

                 tx.executeSql('DELETE FROM orderingredients where ingId="'+json.id+'"',successID);
                  function successID(){
                      return true;
                  }
              })
              
            
          } 
          else
          {
            $("#IngDetails"+index).val("NO");
            
              var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
              db.transaction(function(tx){
                tx.executeSql('SELECT * FROM orderingredients where ingId="'+json.id+'"',[], function (tx, results)
                {
                  var itemLength = results.rows.length;
                  var menudatas=results.rows;
                   if(itemLength==1 )
                   {
                      tx.executeSql('UPDATE  orderingredients SET ingredientsYN="'+data+'" WHERE ingId="'+json.id+'" ',successID);
                       
                   }
                   else
                   {
                      tx.executeSql('INSERT OR REPLACE INTO orderingredients (businessId,menuId,subMenuId,itemId,userId,ingId,ingredients,price,ingredientsYN,extras)VALUES("'+json.businessId+'","'+json.menuId+'","'+json.subMenuId+'","'+json.itemId+'","'+userId+'","'+json.id+'","'+json.ingredients+'","'+json.price+'","'+data+'","")',successID);                     
                     
                   }
                 
                });
                  function successID(){
                      return true;
                  }
              });
          }
     }

     $scope.saveExtra=function(event,json,index)
     {
          var data= $(event.target).val();
          //alert(json.id);
          //console.log(json);
          var userId = localStorage.getItem("id");
          var YN=$("#IngDetails"+index).val();
          
          if(YN=="NO")
          {
              
              var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
              db.transaction(function(tx){
                tx.executeSql('SELECT * FROM orderingredients where ingId="'+json.id+'"',[], function (tx, results)
                {
                  var itemLength = results.rows.length;
                  //alert(itemLength);
                  var menudatas=results.rows;
                   if(itemLength==1 )
                   {
                      tx.executeSql('UPDATE  orderingredients SET extras="'+data+'" WHERE ingId="'+json.id+'" ',successID);
                       
                   }
                   else
                   {
                      tx.executeSql('INSERT OR REPLACE INTO orderingredients (businessId,menuId,subMenuId,itemId,userId,ingId,ingredients,price,ingredientsYN,extras)VALUES("'+json.businessId+'","'+json.menuId+'","'+json.subMenuId+'","'+json.itemId+'","'+userId+'","'+json.id+'","'+json.ingredients+'","'+json.price+'","YES","'+data+'")',successID);                     
                   }
                 
                });
                  function successID(){
                      return true;
                  }
              });
            }
            else
            {
                $(event.target).val("");
            }
      }







            
           



})

.controller('AddToCartCtrl', function($scope,$http,$location,alertmsg) {

  $('.time-picker').datetimepicker({
            format: 'LT'
        });
 
    

        $('.date-picker').datetimepicker({
            format: 'DD/MM/YYYY'
        });


  localStorage.setItem("splash", 1);
  $scope.useremail= localStorage.getItem("email");
  $scope.userName= localStorage.getItem("userName");
  $scope.userid= localStorage.getItem("id");

  $scope.date= localStorage.getItem("delvDate");
  $scope.time= localStorage.getItem("delvTime");
  $scope.currency=localStorage.getItem("currencyFormat");
  //alert($scope.userName);
    $scope.totalAmount="";
    $scope.IngredientsData= "";
     $scope.FinalOrderData="";
     //$scope.OrderedItems="";
     $scope.timedDelivery="";
     var json_arr =  []; 
     var json_arrIng=[]; 
        $("#orderdata").hide();
       $("#someHide").hide();
       // swal({   
       //            title: "Loading...",   
       //            text: "Please Wait",   
       //            timer: 7000,   
       //            showConfirmButton: false 
       //          });


   
        // setTimeout(function(){
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
              db.transaction(function(tx){
                  tx.executeSql('SELECT * FROM orderitems',[], function (tx, results)
                  {

                    var itemLength = results.rows.length;

                    var menudatas=results.rows;
                    for(var i = 0; i < itemLength; i++)
                    {
                      var row = menudatas.item(i);
                      var obj = {id:row.id,businessId:row.businessId,menuId:row.menuId,subMenuId:row.subMenuId,itemId:row.itemId,userId:row.userId,itemName:row.itemName,image:row.image,price:row.price,quantity:row.quantity,subTotal:row.subTotal,orderType:row.orderType};
                      json_arr.push(obj);
                    }  
                    $scope.OrderedItems=json_arr;
                    //console.log($scope.OrderedItems);
                  });
              });

            $scope.showData=function(json)
            {
                $("#orderdata").show();
                $("#hideButton").hide();
                
                $("#foodSow").hide();
            }
             $scope.showIngredients=function(json)
            {
                $("#someHide").show();
            }
            
        // },5000)
   

        $scope.modelBox=function(id)
        {
            console.log($scope.OrderedItems);
            $scope.hashvalue= $scope.OrderedItems[0].$$hashKey;
          //alert(id);
          $scope.OrderedIngItems="";
          $scope.ingCountShow="";
           var json_arrIng=[]; 
           var count=0;
          var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
          db.transaction(function(tx)
          {
            tx.executeSql('SELECT * FROM orderitemingredients WHERE itemStorageId="'+id+'"',[], function (tx, results)
            {
              var ingredientsDatas=results.rows;
              var itemLengthIng = results.rows.length;
              for(var i = 0; i < itemLengthIng; i++) 
              {
                  var row = ingredientsDatas.item(i);
                  var objIng = {id:row.id,itemStorageId:row.itemStorageId,businessId:row.businessId,menuId:row.menuId,subMenuId:row.subMenuId,itemId:row.itemId,userId:row.userId,ingId:row.ingId,ingredient:row.ingredients,ingPrice:row.price,ingYN:row.ingredientsYN,notes:row.extras};
                  json_arrIng.push(objIng);
                  count=count+1;
                  $scope.ingCountShow=count;

              }
            });
                $scope.OrderedIngItems=json_arrIng;
                console.log($scope.ingCountShow);
                console.log($scope.OrderedIngItems);
          });
          $("#exampleModal").modal("show");
        }

        $scope.saveExtra=function(event,id)
        {
            var data= $(event.target).val();
            console.log($scope.OrderedItems);
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
            db.transaction(function(tx){
                tx.executeSql('UPDATE  orderitemingredients SET extras="'+data+'" WHERE id="'+id+'" ',successID);
                function successID(){
                    return true;
                }
            });
            return true;
        }

        $scope.showing=function()
        {
            //console.log($scope.OrderedItems);
        }
        // $scope.removeBtu=function(id)
        // {
        //       console.log($scope.OrderedItems);
        //     alert(id);

        //     return;
        // }
        $scope.removeOrderItemIng=function(index,OrderedItems,json,id) 
        {
            // var val=1;
            // var index=2;
            // order=OrderedItems;
            // $scope.getsubtotal(val,index,order);
            // console.log(json);
            // alert(id);
           // $scope.OrderedItems=angular.copy(OrderedItems);

            //console.log($scope.OrderedItems);
            var itemIndex=json.itemStorageId-1;
            var ingPrice=parseFloat(json.ingPrice);
            var itemQuan=parseFloat(OrderedItems[itemIndex].quantity);
            //var IngTotPrice=ingPrice*itemQuan;
            var itemPrice=parseFloat(OrderedItems[itemIndex].price)-ingPrice;
            var itemSubTotal=itemPrice*itemQuan;
                itemSubTotal=itemSubTotal.toFixed(1);
            //console.log(itemIndex+","+ingPrice+","+itemQuan+","+itemPrice+","+itemSubTotal);

            // $scope.OrderedItems[itemIndex].price=itemPrice;
            // $scope.OrderedItems[itemIndex].quantity=itemQuan;
            // $scope.OrderedItems[itemIndex].subTotal=itemSubTotal;


                        // console.log($scope.OrderedItem);
                       
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
            db.transaction(function(tx){
                tx.executeSql('UPDATE  orderitems SET quantity="'+itemQuan+'", price="'+itemPrice+'", subTotal="'+itemSubTotal+'"  WHERE id="'+json.itemStorageId+'" and orderType="order" ',successID);
                tx.executeSql('DELETE FROM orderitemingredients where id="'+id+'"',successID);
                
              });

              function successID(){
                      return true;
                  }
            $scope.OrderedItems.splice(itemIndex,1,{
                //$$hashKey:$scope.hashvalue,
                id:$scope.OrderedItems[itemIndex].id,
                businessId:$scope.OrderedItems[itemIndex].businessId,
                itemId:$scope.OrderedItems[itemIndex].itemId,
                subMenuId:$scope.OrderedItems[itemIndex].subMenuId,
                menuId:$scope.OrderedItems[itemIndex].menuId,
                userId:$scope.OrderedItems[itemIndex].userId,
                itemName:$scope.OrderedItems[itemIndex].itemName,
                price:itemPrice,
                image:$scope.OrderedItems[itemIndex].image,
                quantity: itemQuan,
                subTotal: itemSubTotal,
                orderType:$scope.OrderedItems[itemIndex].orderType

            }); 

          $scope.OrderedIngItems.splice(index,1);
       
          //console.log($scope.OrderedItems);
           $scope.getTotal();

        }

       

        $scope.removeOrder = function(index,order) {
            console.log(order);
            var nFrom = "top";
            var nAlign = "center";
            var nIcons = "fa fa-comments";
            var nType = "inverse";
            var nAnimIn ="animated bounceIn";
            var nAnimOut ="animated bounceOut";
            var message=order.quantity+" "+order.itemName+" Deleted From the Cart";
            
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
             db.transaction(function(tx){
                  tx.executeSql('DELETE FROM orderitems where id="'+order.id+'"',successID);
                  tx.executeSql('DELETE FROM orderitemingredients where itemStorageId="'+order.id+'"',successID)
                 
              });
              function successID(){
                      return true;
                  }
          $scope.OrderedItems.splice(index,1);
          alertmsg.notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut,message);
           //alert(order.itemId);
        };

        $scope.getTotal = function(){
          //alert("call from");
          // console.log("call");
            var total = 0;
            var length= $scope.OrderedItems.length;

            for(var i = 0; i < length; i++){
                var product = $scope.OrderedItems[i];
                total += parseFloat(product.subTotal);
                //alert(product.subTotal);
            }
            $scope.totalAmount=total;
            if (total==0) {
              $("#food").hide();
            };
            return total;
        };

        $scope.getsubtotal = function(val,index,order){

          console.log($scope.OrderedItems);
            //alert();
            // var quantity=$("#quantity").val();
          var quantity=$(val.target).val() ;
          if(quantity=="" || quantity=="0")
          {
            
              $("#quantity").val(0);
              $("#subTotal").val(0);
          }
          else
          {
             //console.log(order[0]);
            var data= angular.copy($scope.OrderedItems);
           // console.log(data);
            var price=$scope.OrderedItems[index].price;
            
            var ingPrice=0;
            //alert($scope.OrderedItems[index].orderType);
              //alert($scope.OrderedItems[index].itemId);
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
              db.transaction(function(tx){
                  // tx.executeSql('SELECT * FROM orderitemingredients where itemStorageId="'+$scope.OrderedItems[index].id+'" ',[], function (tx, results)
                  // {
                  //   var itemLength = results.rows.length;
                  //   var menudatas=results.rows;
                    
                        // for(var i = 0; i < itemLength; i++) 
                        // {
                        //     var row = menudatas.item(i);
                        //     console.log(row);
                        //    ingPrice+=parseFloat(row.price);
                        // }

                        // alert(ingPrice);
                        // var miniTotal=parseFloat(price)+ingPrice;
                        // if(ingPrice!=0)
                        // {
                            // alert(miniTotal);
                            $scope.SumOfSubtotal = quantity*parseFloat(price);  
                        //     alert($scope.SumOfSubtotal);
                        // }
                        // else{
                        //     $scope.SumOfSubtotal = quantity*price;  
                        // }
                        



                        $scope.OrderedItems.splice(index,1,{
                            id:$scope.OrderedItems[index].id,
                            businessId:$scope.OrderedItems[index].businessId,
                            itemId:$scope.OrderedItems[index].itemId,
                            subMenuId:$scope.OrderedItems[index].subMenuId,
                            menuId:$scope.OrderedItems[index].menuId,
                            userId:$scope.OrderedItems[index].userId,
                            itemName:$scope.OrderedItems[index].itemName,
                            price:$scope.OrderedItems[index].price,
                            image:$scope.OrderedItems[index].image,
                            quantity: quantity,
                            subTotal: $scope.SumOfSubtotal,
                            orderType:$scope.OrderedItems[index].orderType

                        }); 
                            console.log($scope.OrderedItems);
                            $scope.getTotal();
                  // });

                tx.executeSql('SELECT * FROM orderitems where itemId="'+$scope.OrderedItems[index].itemId+'" and orderType="order"',[], function (tx, results)
                {
                  var itemLength = results.rows.length;
                   if(itemLength==1 )
                    {
                      tx.executeSql('UPDATE  orderitems SET quantity="'+quantity+'" ,subTotal="'+$scope.SumOfSubtotal+'"  WHERE itemId="'+$scope.OrderedItems[index].itemId+'" and orderType="order" ',successID);
                      //alert("updated");
                    }
                    else
                    {
                      tx.executeSql('UPDATE  orderitems SET quantity="'+quantity+'" ,subTotal="'+$scope.SumOfSubtotal+'"  WHERE itemId="'+$scope.OrderedItems[index].itemId+'" and orderType="offer" ',successID);
                    }
                });





                  function successID(){
                      return true;
                  }

                });
            
          }
        };

        $scope.getFood=function(orderData){
          var json_arr =  []; 
          var finaldata=[];
           var SearchDate = moment().format("DD/M/YYYY")
           
              var delvDate = $('#deliveryDate').val();           
              var delvTime = $('#deliveryTime').val();  

              var new_value=moment(delvDate, 'DD/M/YYYY').format('YYYY/MM/DD');
              var after = moment(SearchDate, 'DD/M/YYYY').format('YYYY/MM/DD');
             
              if(delvDate=="" || new_value<after)
              {


                swal({   
                  title: "Please Give Valid Date!! ",   
                  text: "It is Required!",   
                  timer: 2000,   
                  showConfirmButton: false 
                });
                return false
              }

              if(delvTime=="")
              {
                swal({   
                  title: "Please Give Time for Delivery.",   
                  text: " It is Required!",   
                  timer: 2000,   
                  showConfirmButton: false 
                });
                return false
              }
              localStorage.setItem("delvDate", delvDate);
              localStorage.setItem("delvTime", delvTime);

         
            
          var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
              db.transaction(function(tx){
                tx.executeSql('SELECT * FROM orderitemingredients',[], function (tx, results)
                {
                  var itemLength = results.rows.length;
                  var ingredientsDatas=results.rows;
                  if(itemLength>0)
                  {
                    for(var i = 0; i < itemLength; i++) {
                          var row = ingredientsDatas.item(i);
                          var obj = {id:row.id,itemStorageId:row.itemStorageId,businessId:row.businessId,menuId:row.menuId,subMenuId:row.subMenuId,itemId:row.itemId,userId:row.userId,ingId:row.ingId,ingYN:row.ingredientsYN,notes:row.extras};
                          json_arr.push(obj);
                      }
                       $scope.additionalData=json_arr;

                  }
                  else
                  {
                     $scope.additionalData="empty";

                  }
                      
                 
                });
                
              });

                var date= localStorage.getItem("delvDate");
                var time= localStorage.getItem("delvTime");
                var currencyFormat=localStorage.getItem("currencyFormat")
                $scope.FinalOrderData=orderData;
                
                setTimeout(function(){  
                  finaldata.push($scope.FinalOrderData);
                  finaldata.push($scope.additionalData);
                  if(date!="" && time!="")
                  {
                    $scope.TimedDelevery={date:date,time:time,currencyFormat:currencyFormat};
                    finaldata.push($scope.TimedDelevery);
                  }
                 
                  console.log(finaldata);
                  //return false;
                  $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ordertableData.php',finaldata, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                    .success(function (json) {
                     
                      console.log(json);
                      if(json.data=="success")
                      {
                        localStorage.setItem("delvDate","");
                        localStorage.setItem("delvTime","");
                         swal({
                            title: "Order Send Successfully!",   
                            text: "Food Will Reach Soon",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });

                              var db = window.openDatabase("branboxnew", "1.0", "branbox New", 200 * 1024 * 1024);
                                  db.transaction(function(tx){
                                        tx.executeSql('DELETE FROM orderitems');
                                       tx.executeSql('DELETE FROM orderingredients');  
                                  });
                                   localStorage.removeItem("cartCount");
                          //window.location="mainpage.html";
                         $location.path('/menu');
                      }
                     console.log(json);
                    }).error(function(){  
                       // alert("server Error");
                     });
                  }, 1000);
                    

                


        };


         


     $scope.goback=function()
      {
        window.history.back();
      }


       // $('#food').click(function(){
       //          swal({   
       //              title: "Conformation",   
       //              text: " item order completed!",   
       //              type: "warning",   
       //              showCancelButton: true,   
       //              confirmButtonColor: "#04bb1c",   
       //              confirmButtonText: "Yes, Ordered!",   
       //              cancelButtonText: "No, cancel!",   
       //              closeOnConfirm: false,   
       //              closeOnCancel: false 
       //          }, function(isConfirm){   
       //              if (isConfirm) {  

       //                  swal("Send!", "Order send Successfully :)", "success");   



       //              } else {     
       //                  swal("Cancelled", "Order canceled :(", "error");   
       //              } 
       //          });
       //      });



})

//register form (ezhil)
.controller('registerForm', function($scope,$http,$location) {  
    $("#sidebar").removeClass("toggled");
  $("#menu-trigger").removeClass("open");
  localStorage.setItem("splash", 1);

  $scope.insertForm=function()
  {
    // for submitting form
    $scope.submitted = false;
   
      if ($scope.newUser.$valid) 
      {
        // Submit as normal
      } else {
        $scope.newUser.submitted = true;
      }
    var email = $("#email").val();
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    

    // for submitting form
    var fname = $("#fname").val(); 
    var password = $("#password").val();
    var gender = $("#gender").val();
    var dob = $("#dob").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var address1 = $("#address1").val();
    var address2 = $("#address2").val();
    var country = $("#country").val();
    var state = $("#state").val();
    var city = $("#city").val();
    var bussinessId="1";    
    var code = $("#postalCode").val();

    

    if(fname=="")
    {
         swal({   
                            title: "Please fill Your Name.",   
                            // text: "",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });
         return false
    }
    if(!pattern.test(email))
    {
         swal({   
                            title: "Please fill Valid Email.",   
                            // text: "",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });
         return false
    }
    if(password=="")
    {
         swal({   
                            title: "Please fill Password.",   
                            // text: "",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });
         return false
    }

    if(mobile=="")
    {
         swal({   
                            title: "Please fill Mobile Number.",   
                            // text: "",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });
         return false
    }

    if(address1=="" || address2=="" || country=="" || state=="" || city=="" || code=="")  
    {
         swal({   
                            title: "Please fill All Address fields.",   
                            // text: "",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });
         return false
    }
      var regid = localStorage.getItem("regid");

    //alert(gender); 

    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/registerUser.php',{busId:bussinessId,fname:fname,password:password,gender:gender,dob:dob,email:email,mobile:mobile,address1:address1,address2:address2,country:country,state:state,city:city,code:code,regid:regid}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
    //$http.post('http://www.sedarspine.com/BranboxAppMail/registerUser.php',{busId:bussinessId,fname:fname,password:password,gender:gender,dob:dob,email:email,mobile:mobile,address1:address1,address2:address2,country:country,state:state,city:city,code:code}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
    .success(function (data) {
        
        //console.log(data.rows[0].id);

            $.ajax({
                type: "POST",
                dataType:"json",
                data:{id:data.rows[0].id,bId:bussinessId,email:email},
                url: 'http://www.sedarspine.com/BranboxAppMail/registerUser.php',
                crossDomain:true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                success:function (json)
                {
                  alert("alert");
                },
                error:function(error)
                {
                  localStorage.setItem("email", email);
                  window.location="index.html";
                  localStorage.setItem("registered","yes");
                }

                
             });
            //console.log(data);
              swal({  
                      title: "Please Check Your Mail",   
                      text: "Verification Link attatched in registered Mail",   
                      timer: 5000,   
                      showConfirmButton: false 
                  });

    }).error(function(){ 
        
        alert("server Error");
      });

  }

})

//login authentication (ezhil)
.controller('authentication', function($scope,$http,$location) {  
    $("#sidebar").removeClass("toggled");
    $("#menu-trigger").removeClass("open");
    
    $scope.remember=localStorage.getItem("remember");
    $scope.registered=localStorage.getItem("registered");
    $scope.businessId=1;
    $scope.usneMail=localStorage.getItem("email");

    if($scope.remember=="YES")
    {
        $("#remember").attr("checked","checked");
        $scope.password=localStorage.getItem("password");
        // $('#email').val($scope.usneMail);
        // $('#password').val($scope.password);
    }
  $scope.loginAuthentication=function()
  {
    
    var password= $("#password").val();    
    var email= $("#email").val();  
    var AppId=localStorage.getItem("regid");
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
     
    if(!pattern.test(email))
    {
         swal({   
                            title: "Please fill Valid Email.",   
                            // text: "",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });
         return false
    }
    //alert(pass);
    if(password=="")
    {
         swal({   
                            // title: "It is Required!",   
                            title: "Please fill Password.",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });
         return false
    }
    if($("#remember").is(":checked"))
    {
        localStorage.setItem("remember","YES");
    }
    else
    {
      localStorage.setItem("remember","NO");
    }

    
    // alert(password);
     
    
    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxLogin.php',{password:password,email:email,AppId:AppId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
    .success(function (json) {
      var ajaxlength = json.length;
      // alert(ajaxlength);
      //console.log(json);
        if(ajaxlength==1)
        {
            var id = json[0]['id'];
            var email = json[0]['email'];
            var pass = json[0]['password'];
            var userName  = json[0]['userName'];
            var address1 = json[0]['address1'];
            var address2 = json[0]['address2'];
            var city = json[0]['city'];
            var state = json[0]['state'];
            var country = json[0]['country'];
            var postalCode = json[0]['postalCode'];

            localStorage.setItem("password", pass);
            localStorage.setItem("email", email);
            localStorage.setItem("loggedIn", "YES");
            localStorage.setItem("id", id);
            localStorage.setItem("businessId", 1);
            localStorage.setItem("userName",userName );
            localStorage.setItem("address1", address1);
            localStorage.setItem("address2", address2);
            localStorage.setItem("city",city );
            localStorage.setItem("state",state );
            localStorage.setItem("country", country);
            localStorage.setItem("postalCode",postalCode );

            window.location="index.html";
            // $location.path('/menu');
        }
        else
        {
            $location.path('/login');
            $("#password").val("");
        }
        $scope.SubMenuData= json.rows;

    }).error(function(){  
      });
  }

  $scope.forgotBox=function()
  {
      $("#exampleModal").modal("show");
  }
  $scope.sendMail=function()
  {

    var email=$("#forgotemail").val();
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    if(!pattern.test(email))
    {
         swal({   
                            title: "Please fill Valid Email.",   
                            // text: "",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });
         return false
    }
    $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/AjaxForgotPassword.php',{bussId:$scope.businessId,email:email}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      .success(function (json) {
          //$scope.forgotpassword=json.verificationCode;
          console.log(json);

            $.ajax({
                type: "POST",
                dataType:"json",
                data:{id:json.userId,verificationCode:json.verificationCode,bId:$scope.businessId,email:email},
                url: 'http://www.sedarspine.com/BranboxAppMail/forgetpassword.php',
                crossDomain:true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                success:function (json)
                {
                  alert("alert");
                },
                error:function(error)
                {

                  window.location="index.html";
                }

                
              });
            //console.log(data);
              swal({  
                      title: "Please Check Your Mail",   
                      text: "Password Change link is attached..",   
                      timer: 5000,   
                      showConfirmButton: false 
                  });



          }).error(function(){  
        //alert("server Error");
      });
    $("#exampleModal").modal("hide");
  }

})
  
  .controller('latestOfferController', function($scope,$http,$location,alertmsg) {  
        var businessId=1;
        localStorage.setItem("splash", 1);
        $scope.cartCountGet= localStorage.getItem("cartCount");
         $("#cartCount").html($scope.cartCountGet);
        $scope.cartCount= localStorage.getItem("cartCount");
      $("#message").removeClass("open");
      $("#sidebar").removeClass("toggled");
      $("#menu-trigger").removeClass("open");
      $scope.userid= localStorage.getItem("id");
      $scope.latestOffers="";
      $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxOffers.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
      .success(function (json) {
          $scope.latestOffers=json.rows;
          console.log($scope.latestOffers);
          }).error(function(){  
        //alert("server Error");
      });

    $scope.Add_toCart=function($event,$index,json)
    {

      // var cartCountValue=1;
      // alert(cartCountValue);
      var nFrom = "top";
      var nAlign = "center";
      var nIcons = "fa fa-comments";
      var nType = "inverse";
      var nAnimIn ="animated bounceIn";
      var nAnimOut ="animated bounceOut";
      var message="Item Added to The Cart";
      var message1="Go to Cart page and Update It";

      console.log(json);
        var userid= localStorage.getItem("id");
        if(userid==null)
        {
            swal({   
                            title: "Unable to Order",   
                            text: "Please log in",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });
            $location.path('/login');
        }
        else
        {
           var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
          db.transaction(function(tx){
            tx.executeSql('SELECT * FROM orderitems where itemId="'+json.itemId+'" and  orderType="offer" ',[], function (tx, results)
                {
                    var quantity=1;
                    var price=json.price;
                  var itemLength = results.rows.length;
                  var menudatas=results.resultsows;
                  if(itemLength==1 ){
                      tx.executeSql('UPDATE  orderitems SET quantity="'+quantity+'" ,subTotal="'+price+'"  WHERE itemId="'+json.itemId+'"  and orderType="offer" ',successID);
                      alertmsg.notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut,message1);
                   }
                   else
                   {
                     tx.executeSql('INSERT OR REPLACE INTO orderitems (businessId,menuId,subMenuId,itemId,userId,itemName,image,price,subTotal,quantity,tax,offers,orderType)VALUES("'+json.businessId+'","'+json.menuId+'","'+json.subMenuId+'","'+json.itemId+'","'+userid+'","'+json.name+'","'+json.image+'","'+json.price+'","'+json.price+'","1","0","0","offer")',successID);
                        
                      alertmsg.notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut,message);
                        var data=localStorage.getItem("cartCount");
                        data++;
                        
                        localStorage.setItem("cartCount",data);
                         $scope.cartCountGet= data;
                      
                      $("#cartCount").html(data);
                      
                      console.log($scope.cartCountGet);
                      
                        
                   }
                 
                });
                function successID(){
                    return true;
              }
            });

          

        }
        


    };

    $scope.getCount=function()
    {
      //setTimeout(function() {
         swal({   
                            title: "Item Adding to the Cart",   
                            text: "Please log in",   
                            timer: 2000,   
                            showConfirmButton: false 
                        });

        var data=localStorage.getItem("cartCount");
        console.log(data);
      //alert(data);
       return data;
      //},500)
      
    }




  })
.controller('timeDelivery', function($scope,$http) {  
      $("#sidebar").removeClass("toggled");
      $("#menu-trigger").removeClass("open");
      localStorage.setItem("splash", 1);

      $scope.save = function(){
         var delvDate = $('#deliveryDate').val();           
         var delvTime = $('#deliveryTime').val();  

         if(delvDate=="")
          {
               swal({   
                                  title: "Please Give Valid Date!! ",   
                                  text: "It is Required!",   
                                  timer: 2000,   
                                  showConfirmButton: false 
                              });
               return false
          }
         
          if(delvTime=="")
          {
               swal({   
                                  title: "Please Give Time for Delivery.",   
                                  text: " It is Required!",   
                                  timer: 2000,   
                                  showConfirmButton: false 
                              });
               return false
          }
        localStorage.setItem("delvDate", delvDate);
        localStorage.setItem("delvTime", delvTime);
        window.location="index.html";
      }      

  })
//check Login User data

//Table Booking
.controller('tableBooking', function($scope,$http,$location) {
        
        $('.time-picker').datetimepicker({
            format: 'LT'
        });
        $('.date-picker').datetimepicker({
            format: 'DD/M/YYYY'
        });

   $scope.save=function()
   {

     var email = localStorage.getItem("id");
      if(email==null)
      {
          swal({   
                          title: "Unable to Book Table",   
                          text: "Please log in",   
                          timer: 2000,   
                          showConfirmButton: false 
                      });

          $location.path('/login');


      }
      else
      {
        var useremail= localStorage.getItem("email");
        var userId= localStorage.getItem("id");
        var businessId=localStorage.getItem("businessId");
       
        var bookDate = $("#bookDate").val();
        var bookTime = $("#bookTime").val();
        var mems = $("#mems").val();

        var SearchDate = moment().format("DD/M/YYYY");
        var new_value=moment(bookDate, 'DD/M/YYYY').format('YYYY/MM/DD');
        var after = moment(SearchDate, 'DD/M/YYYY').format('YYYY/MM/DD');
       
        if(bookDate=="" || new_value<after)
        {

          swal({   
            title: "Please Give Valid Date!! ",   
            text: "It is Required!",   
            timer: 2000,   
            showConfirmButton: false 
          });
          return false
        }

        if(bookTime=="")
        {
          swal({   
            title: "Please Give Time for Booking.",   
            text: " It is Required!",   
            timer: 2000,   
            showConfirmButton: false 
          });
          return false
        }

        if(mems=="Select")
        {
          swal({  
            title: "Please select Seats.",   
            text: " It is Required!",   
            timer: 2000,   
            showConfirmButton: false 
          });
          return false
        }
      
      
          var booking={
            userId:userId,
           
            businessId:businessId,
            bookDate:bookDate,
            bookTime:bookTime,
            mems:mems,
           

            }
            $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/tablebooking.php',booking,{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
    .success(function(data) {
         console.log(data);

            swal({   
                          title: "Table Booking request send to Admin",   
                          text: "Please Wait for response",   
                          timer: 2000,   
                          showConfirmButton: false 
                      });

            $location.path('/menu');

            }).error(function(){  
        //alert("server Error");
      });
    
    
      }

      
    
   }
   
  })
