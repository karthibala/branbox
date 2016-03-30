var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);

angular.module('starter.services', [])
// .factory('MenuDbData', function() {
//           var json_arr=[];
//     //var menuDetails=[];
//     var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
//     db.transaction(function(tx){
//          tx.executeSql('SELECT * FROM menu',[], function (tx, results)
//                 {

//                     var itemLength = results.rows.length;

//                     var menudatas=results.rows;
//                     for(var i = 0; i < itemLength; i++)
//                     {
//                       var row = menudatas.item(i);
//                       var obj = {id:row.id,businessId:row.businessId,name:row.name,image:row.image,position:row.position,status:row.status,online:row.online};
//                       json_arr.push(obj);
//                     }
//                     //$scope.OrderedItems=json_arr;
//                     //console.log($scope.OrderedItems);
//                 });

//           //menuDetails=$scope.OrderedItems;
//     });

//   return {
//     all: function() {
//       return json_arr;
//     },
//     remove: function(chat) {
//       json_arr.splice(json_arr.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < json_arr.length; i++) {
//         if (json_arr[i].id === parseInt(chatId)) {
//           return json_arr[i];
//         }
//       }
//       return null;
//     }
//   };
// })
.service('alertmsg', function($http,$q) {

     this.notify =function(from, align, icon, type, animIn, animOut,message){
                $.growl({
                    icon: icon,
                    message: message,
                    url: ''
                },{
                        element: 'body',
                        type: "inverse",
                        allow_dismiss: true,
                        placement: {
                                from: from,
                                align: align
                        },
                        offset: {
                            x: 20,
                            y: 85
                        },
                        spacing: 10,
                        z_index: 1031,
                        delay: 3000,
                        timer: 500,
                        url_target: '_blank',
                        mouse_over: false,
                        animate: {
                                enter: animIn,
                                exit: animOut
                        },
                        icon_type: 'class',
                        template: '<div data-growl="container" class="alert" role="alert">' +
                                        '<button type="button" class="close" data-growl="dismiss">' +
                                            '<span aria-hidden="true">&times;</span>' +
                                            '<span class="sr-only">Close</span>' +
                                        '</button>' +
                                        '<span data-growl="icon"></span>' +
                                        '<span data-growl="title"></span>' +
                                        '<span data-growl="message"></span>' +
                                        '<a href="#" data-growl="url"></a>' +
                                    '</div>'
                });
            }
         this.Offers =function()
         {
          //alert("gobi");
          var offers=[];
          var businessId=1;
            $http.post('http://www.appnlogic.com/branboxAppAdmin/branboxAdminUi/ajaxOffers.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
            .success(function (json) {
              // offers.push(json.rows);
                
                var deferred = $q.defer();
                deferred.resolve(json.rows);
                return deferred.promise;

              }).error(function(){  
            alert("server Error");
          });
         }

    //       var json_arr=[];
    // //var menuDetails=[];
    // var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
    // db.transaction(function(tx){
    //      tx.executeSql('SELECT * FROM menu',[], function (tx, results)
    //             {

    //                 var itemLength = results.rows.length;

    //                 var menudatas=results.rows;
    //                 for(var i = 0; i < itemLength; i++)
    //                 {
    //                   var row = menudatas.item(i);
    //                   var obj = {id:row.id,businessId:row.businessId,name:row.name,image:row.image,position:row.position,status:row.status,online:row.online};
    //                   json_arr.push(obj);
    //                 }
    //                 //$scope.OrderedItems=json_arr;
    //                 //console.log($scope.OrderedItems);
    //             });

    //       //menuDetails=$scope.OrderedItems;
    // });
    // return {
    //     all: function() {
    //       return json_arr;
    //     },
    //     remove: function(chat) {
    //       json_arr.splice(json_arr.indexOf(chat), 1);
    //     },
    //     get: function(chatId) {
    //       for (var i = 0; i < json_arr.length; i++) {
    //         if (json_arr[i].id === parseInt(chatId)) {
    //           return json_arr[i];
    //         }
    //       }
    //       return null;
    //     }
    // };

  })

.service('TodosService', function($q) {
           
     var menudata=[];      
  return {
        all: function() {
            
              
                 db.transaction(function(tx){
                    tx.executeSql('SELECT * FROM menu',[], function (tx, results)
                    {
                        var itemLength = results.rows.length;
   
                        var menudatas=results.rows;
                        for(var i = 0; i < itemLength; i++)
                        {
                            var row = menudatas.item(i);
                            menudata.push(row);
                        }
                        
                    });
                 });
                        
            return menudata;
        }
       
    };
})
.directive('imageonload', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    //call the function that was passed
                    //alert(attrs.imageonload);
                    scope.$apply(attrs.imageonload);
                });
            }
        };
    })
