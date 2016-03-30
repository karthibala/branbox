var baseUrl='http://localhost/branboxAdmin/';
angular.module('starter.controllers', [])

.controller('contactCtrl', function($scope,$http,$location) {
    localStorage.setItem("menuUrl","contact");
    $("#sidebar").removeClass("toggled");
  $("#menu-trigger").removeClass("open");
  $scope.addressDtails=[];
  
      var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
        db.transaction(function(tx){
        tx.executeSql('SELECT * FROM  businessDetails',[], function (tx, results){
          
            var itemLength = results.rows.length;
            $scope.$apply(function(){
                $scope.addressDtails=results.rows.item(0);
            })
                
        });
    });
    $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/branbox.php', {branboxVariable:'contactUs',businessId:'6'},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
    .success(function(data) {      
        $scope.PhonenumberCall=data['phoneNumber1'];
        $scope.name = '<div class="contactUsName">' +data['brandName']+','+ '</div>'; 
    }).error(function(){         
      $scope.error = "server Error";     
     });
  })

.controller('locationCtrl', function($scope, $http,$cordovaNetwork) {
    localStorage.setItem("menuUrl","locationCtrl");
    if($cordovaNetwork.isOnline()){
        $scope.locationshow=true;
    }
    else{
        $scope.locationshow=false;
    }
    $("#sidebar").removeClass("toggled");
    $("#menu-trigger").removeClass("open");
    $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/branbox.php',{'branboxVariable':'location', businessId:'1'},{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} }).success(function(data){
        $scope.LocationData=data.rows;
        //console.log($scope.LocationData);
        //alert("datat");
        //alert($scope.locationshow);
        $scope.initialize(data.rows);
    }).error(function(){
    });
    
  //initialize map
    $scope.initialize = function(data) {
        //alert(data[0]['latitude']);
        var infowindow = new google.maps.InfoWindow({disableAutoPan: true})
        var mapOptions = {
            center: new google.maps.LatLng(data[0]['latitude'], data[0]['longitude']),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        //alert(data[0]['latitude']);
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
    }
    var json_arr=[];
    $scope.LocalLocationData=[];
    var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
    db.transaction(function(tx){
    tx.executeSql('SELECT * FROM  location',[], function (tx, results){
        //alert(results.rows.length);
        var itemLength = results.rows.length;
        var menudatas=results.rows;
        for(var i = 0; i < itemLength; i++)
        {
          var row = menudatas.item(i);
          json_arr.push(row);
        }
       $scope.LocationData=json_arr;
    });

    });
})


//author Pravinkumar on 20/8/2015
.controller('aboutUs', function($scope,$http,$cordovaDialogs) {
        localStorage.setItem("menuUrl","aboutUs");
		
		/* PhotoSwipe PLugin Script Start */
		
		(function() {
		localStorage.setItem("menuUrl","GalleryView");
		var initPhotoSwipeFromDOM = function(gallerySelector) {

			var parseThumbnailElements = function(el) {
			    var thumbElements = el.childNodes,
			        numNodes = thumbElements.length,
			        items = [],
			        el,
			        childElements,
			        thumbnailEl,
			        size,
			        item;

			    for(var i = 0; i < numNodes; i++) {
			        el = thumbElements[i];

			        // include only element nodes 
			        if(el.nodeType !== 1) {
			          continue;
			        }

			        childElements = el.children;

			        size = el.getAttribute('data-size').split('x');

			        // create slide object
			        item = {
						src: el.getAttribute('href'),
						w: parseInt(size[0], 10),
						h: parseInt(size[1], 10),
						author: el.getAttribute('data-author')
			        };

			        item.el = el; // save link to element for getThumbBoundsFn

			        if(childElements.length > 0) {
			          item.msrc = childElements[0].getAttribute('src'); // thumbnail url
			          if(childElements.length > 1) {
			              item.title = childElements[1].innerHTML; // caption (contents of figure)
			          }
			        }


					var mediumSrc = el.getAttribute('data-med');
		          	if(mediumSrc) {
		            	size = el.getAttribute('data-med-size').split('x');
		            	// "medium-sized" image
		            	item.m = {
		              		src: mediumSrc,
		              		w: parseInt(size[0], 10),
		              		h: parseInt(size[1], 10)
		            	};
		          	}
		          	// original image
		          	item.o = {
		          		src: item.src,
		          		w: item.w,
		          		h: item.h
		          	};

			        items.push(item);
			    }

			    return items;
			};

			// find nearest parent element
			var closest = function closest(el, fn) {
			    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
			};

			var onThumbnailsClick = function(e) {
			    e = e || window.event;
			    e.preventDefault ? e.preventDefault() : e.returnValue = false;

			    var eTarget = e.target || e.srcElement;

			    var clickedListItem = closest(eTarget, function(el) {
			        return el.tagName === 'A';
			    });

			    if(!clickedListItem) {
			        return;
			    }

			    var clickedGallery = clickedListItem.parentNode;

			    var childNodes = clickedListItem.parentNode.childNodes,
			        numChildNodes = childNodes.length,
			        nodeIndex = 0,
			        index;

			    for (var i = 0; i < numChildNodes; i++) {
			        if(childNodes[i].nodeType !== 1) { 
			            continue; 
			        }

			        if(childNodes[i] === clickedListItem) {
			            index = nodeIndex;
			            break;
			        }
			        nodeIndex++;
			    }

			    if(index >= 0) {
			        openPhotoSwipe( index, clickedGallery );
			    }
			    return false;
			};

			var photoswipeParseHash = function() {
				var hash = window.location.hash.substring(1),
			    params = {};

			    if(hash.length < 5) { // pid=1
			        return params;
			    }

			    var vars = hash.split('&');
			    for (var i = 0; i < vars.length; i++) {
			        if(!vars[i]) {
			            continue;
			        }
			        var pair = vars[i].split('=');  
			        if(pair.length < 2) {
			            continue;
			        }           
			        params[pair[0]] = pair[1];
			    }

			    if(params.gid) {
			    	params.gid = parseInt(params.gid, 10);
			    }

			    return params;
			};

			var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
			    var pswpElement = document.querySelectorAll('.pswp')[0],
			        gallery,
			        options,
			        items;

				items = parseThumbnailElements(galleryElement);

			    // define options (if needed)
			    options = {

			        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

			        getThumbBoundsFn: function(index) {
			            // See Options->getThumbBoundsFn section of docs for more info
			            var thumbnail = items[index].el.children[0],
			                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
			                rect = thumbnail.getBoundingClientRect(); 

			            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
			        },

			        addCaptionHTMLFn: function(item, captionEl, isFake) {
						if(!item.title) {
							//captionEl.children[0].innerText = '';
							return false;
						}
						//captionEl.children[0].innerHTML = item.title +  '<br/><small>Photo: ' + item.author + '</small>';
						return true;
			        },
					
			    };


			    if(fromURL) {
			    	if(options.galleryPIDs) {
			    		// parse real index when custom PIDs are used 
			    		// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
			    		for(var j = 0; j < items.length; j++) {
			    			if(items[j].pid == index) {
			    				options.index = j;
			    				break;
			    			}
			    		}
				    } else {
				    	options.index = parseInt(index, 10) - 1;
				    }
			    } else {
			    	options.index = parseInt(index, 10);
			    }

			    // exit if index not found
			    if( isNaN(options.index) ) {
			    	return;
			    }



				var radios = document.getElementsByName('gallery-style');
				for (var i = 0, length = radios.length; i < length; i++) {
				    if (radios[i].checked) {
				        if(radios[i].id == 'radio-all-controls') {

				        } else if(radios[i].id == 'radio-minimal-black') {
				        	options.mainClass = 'pswp--minimal--dark';
					        options.barsSize = {top:0,bottom:0};
							options.captionEl = false;
							options.fullscreenEl = false;
							options.shareEl = false;
							options.bgOpacity = 0.85;
							options.tapToClose = true;
							options.tapToToggleControls = false;
				        }
				        break;
				    }
				}

			    if(disableAnimation) {
			        options.showAnimationDuration = 0;
			    }

			    // Pass data to PhotoSwipe and initialize it
			    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

			    // see: http://photoswipe.com/documentation/responsive-images.html
				var realViewportWidth,
				    useLargeImages = false,
				    firstResize = true,
				    imageSrcWillChange;

				gallery.listen('beforeResize', function() {

					var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
					dpiRatio = Math.min(dpiRatio, 2.5);
				    realViewportWidth = gallery.viewportSize.x * dpiRatio;


				    if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
				    	if(!useLargeImages) {
				    		useLargeImages = true;
				        	imageSrcWillChange = true;
				    	}
				        
				    } else {
				    	if(useLargeImages) {
				    		useLargeImages = false;
				        	imageSrcWillChange = true;
				    	}
				    }

				    if(imageSrcWillChange && !firstResize) {
				        gallery.invalidateCurrItems();
				    }

				    if(firstResize) {
				        firstResize = false;
				    }

				    imageSrcWillChange = false;

				});

				gallery.listen('gettingData', function(index, item) {
				    if( useLargeImages ) {
				        item.src = item.o.src;
				        item.w = item.o.w;
				        item.h = item.o.h;
				    } else {
				        item.src = item.m.src;
				        item.w = item.m.w;
				        item.h = item.m.h;
				    }
				});

			    gallery.init();
			};

			// select all gallery elements
			var galleryElements = document.querySelectorAll( gallerySelector );
			for(var i = 0, l = galleryElements.length; i < l; i++) {
				galleryElements[i].setAttribute('data-pswp-uid', i+1);
				galleryElements[i].onclick = onThumbnailsClick;
			}

			// Parse URL and open gallery if it contains #&pid=3&gid=1
			var hashData = photoswipeParseHash();
			if(hashData.pid && hashData.gid) {
				openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
			}
		};

		initPhotoSwipeFromDOM('.demo-gallery');

	})();
		
		/* PhotoSwipe PLugin Script Ends */
		
		
		
        $("#sidebar").removeClass("toggled");
        $("#menu-trigger").removeClass("open");
        $scope.aboutGallery=[];
        var json_gal=[];
        $scope.aboutUsGallery=[];
        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
        db.transaction(function(tx){
        tx.executeSql('SELECT * FROM  businessDetails',[], function (tx, results){
            var itemLength = results.rows.length;
            $scope.$apply(function(){
                $scope.addressDtails=results.rows.item(0);
            })
        });
    });
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM  aboutUs',[], function (tx, results){
            for(var i=0; i<results.rows.length; i++){
                $('#title').html('<div class="pmbb-header"><h2> <i class="md md-equalizer m-r-5"></i>'+ results.rows.item(i).title +'</h2></div><div class="pmbb-body p-l-30"><div class="pmbb-view" >'+ results.rows.item(i).description +'</div><br></div>');
            }
        });
    });
  
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM  aboutUs',[], function (tx, results){
            for(var i=0; i<results.rows.length; i++){
                $('#images').html('<img class="img-responsive" src='+ results.rows.item(i).image +'>');
            }
        });
  });

    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM  aboutUsGallery',[], function (tx, results){
            //alert(results.rows.length);
            for(var i=0;i<results.rows.length;i++){
                
                var galdatas=results.rows;
                var row = galdatas.item(i);
                json_gal.push(row);
                //$('#lightbox').append('<div class="col-md-3 col-sm-4 col-xs-6" data-src='+ results.rows.item(i).aboutGalleryImages +' ><div class="lightbox-item p-item"><img src='+ results.rows.item(i).aboutGalleryImages + ' class="animated flip"></div></div>');
				$('#lightbox').append('<a href='+ results.rows.item(i).aboutGalleryImages +' data-size="1600x1600" data-med='+ results.rows.item(i).aboutGalleryImages +' data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main"><img src='+ results.rows.item(i).aboutGalleryImages +' alt="" width="150px"; height="150px"; /></a>'); 
				
                if(i >= results.rows.length-1){
                    //alert(i);
                  $('.lightbox').lightGallery({
                    enableTouch: true
                  });
                }
            }
            $scope.$apply(function() {
                  $scope.aboutGallery=json_gal;
                  // $('.lightbox').lightGallery({
                  //  enableTouch: true
                  //});
              });
        });
    });
  
    $scope.sendFeedBack=function()
    {
        
        var id = localStorage.getItem("id");
        if(id ==null)
        {
            
            $cordovaDialogs.alert('Please log in', 'Unable to Send Feed Back', 'OK')
            .then(function() {
            });
            
            //swal({   
            //                title: "Unable to Send Feed Back",   
            //                text: "Please log in",   
            //                timer: 2000,   
            //                showConfirmButton: false 
            //            });
            $location.path('/login');
        }
        else
        {
            var name=$("#username").val();
            var email=$("#email").val();
            var feedMessage=$("#feedbackMessage").val();
            var useremail= localStorage.getItem("email");
            if(name=="")
            {
                $cordovaDialogs.alert('Its Required', 'Please Enter Your  Name', 'OK')
            .then(function() {
            });
              //swal({   
              //    title: "Please Enter Your  Name ",   
              //    text: "Its Required",   
              //    timer: 2000,   
              //    showConfirmButton: false 
              //});
              return false;
            }
            if(email=="" || email!=useremail)
            {
                $cordovaDialogs.alert('Its Required', 'Please Enter Logged Your Email Id ', 'OK')
            .then(function() {
            });
                //swal({   
                //    title: "Please Enter Logged Your Email Id ",   
                //    text: "Its Required",    
                //    timer: 2000,   
                //    showConfirmButton: false 
                //});
                return false;
            }
            if(feedMessage=="")
            {
                $cordovaDialogs.alert('Its Required', 'Please Give FeedBack', 'OK')
            .then(function() {
            });
                //swal({   
                //    title: "Please Give FeedBack",   
                //    text: "Its Required",   
                //    timer: 2000,   
                //    showConfirmButton: false 
                //});
                return false;
            }
    
          
            var businessId=localStorage.getItem("businessId");
           
            var feedback={name:name,email:email,userId:id,feedbackMessage:feedMessage,bussId:businessId};
            console.log(feedback);
            $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxFeedBack.php',feedback,{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
            .success(function(data) {   
                console.log(data.success);
                if(data.success=="success")
                {
                    $cordovaDialogs.alert('FeedBack Send Successfully', 'Success', 'OK')
                    .then(function() {
                    });
                    //swal({
                    //    title: "FeedBack Send Successfully",   
                    //    timer: 2000,   
                    //    showConfirmButton: false 
                    //});
                    $location.path('/menu');
                }
            })
            .error(function(){         
                $scope.error = "server Error";     
            });
        }

    }
})


.controller('gallery', function($scope,$http) {
    
    //alert("Gallery view");
     localStorage.setItem("menuUrl","gallery");
	 
	 
	 (function() {

		var initPhotoSwipeFromDOM = function(gallerySelector) {

			var parseThumbnailElements = function(el) {
			    var thumbElements = el.childNodes,
			        numNodes = thumbElements.length,
			        items = [],
			        el,
			        childElements,
			        thumbnailEl,
			        size,
			        item;

			    for(var i = 0; i < numNodes; i++) {
			        el = thumbElements[i];

			        // include only element nodes 
			        if(el.nodeType !== 1) {
			          continue;
			        }

			        childElements = el.children;

			        size = el.getAttribute('data-size').split('x');

			        // create slide object
			        item = {
						src: el.getAttribute('href'),
						w: parseInt(size[0], 10),
						h: parseInt(size[1], 10),
						author: el.getAttribute('data-author')
			        };

			        item.el = el; // save link to element for getThumbBoundsFn

			        if(childElements.length > 0) {
			          item.msrc = childElements[0].getAttribute('src'); // thumbnail url
			          if(childElements.length > 1) {
			              item.title = childElements[1].innerHTML; // caption (contents of figure)
			          }
			        }


					var mediumSrc = el.getAttribute('data-med');
		          	if(mediumSrc) {
		            	size = el.getAttribute('data-med-size').split('x');
		            	// "medium-sized" image
		            	item.m = {
		              		src: mediumSrc,
		              		w: parseInt(size[0], 10),
		              		h: parseInt(size[1], 10)
		            	};
		          	}
		          	// original image
		          	item.o = {
		          		src: item.src,
		          		w: item.w,
		          		h: item.h
		          	};

			        items.push(item);
			    }

			    return items;
			};

			// find nearest parent element
			var closest = function closest(el, fn) {
			    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
			};

			var onThumbnailsClick = function(e) {
			    e = e || window.event;
			    e.preventDefault ? e.preventDefault() : e.returnValue = false;

			    var eTarget = e.target || e.srcElement;

			    var clickedListItem = closest(eTarget, function(el) {
			        return el.tagName === 'A';
			    });

			    if(!clickedListItem) {
			        return;
			    }

			    var clickedGallery = clickedListItem.parentNode;

			    var childNodes = clickedListItem.parentNode.childNodes,
			        numChildNodes = childNodes.length,
			        nodeIndex = 0,
			        index;

			    for (var i = 0; i < numChildNodes; i++) {
			        if(childNodes[i].nodeType !== 1) { 
			            continue; 
			        }

			        if(childNodes[i] === clickedListItem) {
			            index = nodeIndex;
			            break;
			        }
			        nodeIndex++;
			    }

			    if(index >= 0) {
			        openPhotoSwipe( index, clickedGallery );
			    }
			    return false;
			};

			var photoswipeParseHash = function() {
				var hash = window.location.hash.substring(1),
			    params = {};

			    if(hash.length < 5) { // pid=1
			        return params;
			    }

			    var vars = hash.split('&');
			    for (var i = 0; i < vars.length; i++) {
			        if(!vars[i]) {
			            continue;
			        }
			        var pair = vars[i].split('=');  
			        if(pair.length < 2) {
			            continue;
			        }           
			        params[pair[0]] = pair[1];
			    }

			    if(params.gid) {
			    	params.gid = parseInt(params.gid, 10);
			    }

			    return params;
			};

			var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
			    var pswpElement = document.querySelectorAll('.pswp')[0],
			        gallery,
			        options,
			        items;

				items = parseThumbnailElements(galleryElement);

			    // define options (if needed)
			    options = {

			        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

			        getThumbBoundsFn: function(index) {
			            // See Options->getThumbBoundsFn section of docs for more info
			            var thumbnail = items[index].el.children[0],
			                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
			                rect = thumbnail.getBoundingClientRect(); 

			            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
			        },

			        addCaptionHTMLFn: function(item, captionEl, isFake) {
						if(!item.title) {
							captionEl.children[0].innerText = '';
							return false;
						}
						captionEl.children[0].innerHTML = item.author +  '<br/><small>' + item.title + '</small>';
						return true;
			        },
					
			    };


			    if(fromURL) {
			    	if(options.galleryPIDs) {
			    		// parse real index when custom PIDs are used 
			    		// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
			    		for(var j = 0; j < items.length; j++) {
			    			if(items[j].pid == index) {
			    				options.index = j;
			    				break;
			    			}
			    		}
				    } else {
				    	options.index = parseInt(index, 10) - 1;
				    }
			    } else {
			    	options.index = parseInt(index, 10);
			    }

			    // exit if index not found
			    if( isNaN(options.index) ) {
			    	return;
			    }



				var radios = document.getElementsByName('gallery-style');
				for (var i = 0, length = radios.length; i < length; i++) {
				    if (radios[i].checked) {
				        if(radios[i].id == 'radio-all-controls') {

				        } else if(radios[i].id == 'radio-minimal-black') {
				        	options.mainClass = 'pswp--minimal--dark';
					        options.barsSize = {top:0,bottom:0};
							options.captionEl = false;
							options.fullscreenEl = false;
							options.shareEl = false;
							options.bgOpacity = 0.85;
							options.tapToClose = true;
							options.tapToToggleControls = false;
				        }
				        break;
				    }
				}

			    if(disableAnimation) {
			        options.showAnimationDuration = 0;
			    }

			    // Pass data to PhotoSwipe and initialize it
			    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

			    // see: http://photoswipe.com/documentation/responsive-images.html
				var realViewportWidth,
				    useLargeImages = false,
				    firstResize = true,
				    imageSrcWillChange;

				gallery.listen('beforeResize', function() {

					var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
					dpiRatio = Math.min(dpiRatio, 2.5);
				    realViewportWidth = gallery.viewportSize.x * dpiRatio;


				    if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
				    	if(!useLargeImages) {
				    		useLargeImages = true;
				        	imageSrcWillChange = true;
				    	}
				        
				    } else {
				    	if(useLargeImages) {
				    		useLargeImages = false;
				        	imageSrcWillChange = true;
				    	}
				    }

				    if(imageSrcWillChange && !firstResize) {
				        gallery.invalidateCurrItems();
				    }

				    if(firstResize) {
				        firstResize = false;
				    }

				    imageSrcWillChange = false;

				});

				gallery.listen('gettingData', function(index, item) {
				    if( useLargeImages ) {
				        item.src = item.o.src;
				        item.w = item.o.w;
				        item.h = item.o.h;
				    } else {
				        item.src = item.m.src;
				        item.w = item.m.w;
				        item.h = item.m.h;
				    }
				});

			    gallery.init();
			};

			// select all gallery elements
			var galleryElements = document.querySelectorAll( gallerySelector );
			for(var i = 0, l = galleryElements.length; i < l; i++) {
				galleryElements[i].setAttribute('data-pswp-uid', i+1);
				galleryElements[i].onclick = onThumbnailsClick;
			}

			// Parse URL and open gallery if it contains #&pid=3&gid=1
			var hashData = photoswipeParseHash();
			if(hashData.pid && hashData.gid) {
				openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
			}
		};

		initPhotoSwipeFromDOM('.demo-gallery');

	})();
	 
    // window.open('test.html', '_blank', 'location=no'); return false;
    
    //$('.lightbox').lightGallery({
    //        enableTouch: true
    //});
   // $('#lightgallery').lightGallery();
    //var $lg = $('.lightgallery');
    //$lg.lightGallery({
    //    pager: true
    //});
    //var data = $lg.data('lightGallery');
    //
    //$lg.on('onAferAppendSlide.lg', function (event, index) {
    //    var classToAdd = data.$items.eq(index).attr('data-custom-class');
    //    data.$slide.eq(index).find('.lg-image').addClass(classToAdd);
    //});
    
    
    
    //localStorage.setItem("menuUrl","gallery");
    ////window.open('gallery.html');
    //window.open('gallery.html', '_blank', 'location=no'); return false;
    //$("#sidebar").removeClass("toggled");
    //$("#menu-trigger").removeClass("open");
    //var json_arr=[];
    //var json_gal=[];
    //$scope.albumData=[];
    //$scope.galData=[];
    //var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
    //db.transaction(function(tx){
        
       //tx.executeSql("SELECT * FROM  gallery", [], function(tx, results) {
       //     //alert("album->"+results.rows.length);
       //     var galdatas=results.rows;
       //     for(var i = 0; i < results.rows.length; i++)
       //     {
       //         
       //         var row = galdatas.item(i);
       //         json_gal.push(row);
       //     }
       //     $scope.$apply(function() {
       //         $scope.galData=json_gal;
       //     });
       // });
        
        //tx.executeSql('SELECT * FROM  album where status="ON"',[], function (tx, results){
        //    //alert(results.rows.length+" Length of the album")
        //   // alert(results.rows.length=" album length ");
        //    var albumdatas=results.rows;
        //     for(var i = 0; i < results.rows.length; i++)
        //        {
        //            
        //            var row = albumdatas.item(i);
        //            json_arr.push(row);
        //        }
        //      $scope.$apply(function() {
        //          $scope.albumData=json_arr;
        //      });
        //            for(var j=0; j < results.rows.length; j++)
        //            {
        //                var row = results.rows.item(j);
        //                //$('#lightboxdown').append('<h2 class="text-center" style="background:#579960;color:#fff">'+results.rows.item(j).galName+'</h2>');
        //                //$('#lightboxdown').append('<h2 class="text-center" style="background:#579960;color:#fff">'+row.galName+'</h2><div class=" clearfix photos" ><div class="lightbox"><div id="lightbox">');
        //                tx.executeSql('SELECT g.*, a.galName  FROM  gallery g INNER JOIN album a ON g.galId= a.galId where g.galId="'+row.galId+'"',[], function (tx, res){
        //                //alert(res.rows.length);
        //                if(res.rows.length>0)
        //                {       
        //                        for(var i=0;i<res.rows.length;i++){
        //                            //$('#lightbox').append('<div class="col-md-3 col-sm-4 col-xs-6" data-src='+ res.rows.item(0).images +' ><div class="lightbox-item p-item"> <img alt="images" src='+ res.rows.item(0).images + ' class="animated flip"></div></div>'); 
        //                            
        //                            //$('.lightbox').lightGallery({
        //                            //        enableTouch: true
        //                            //});
        //                            //if(i >= res.rows.length-1){
        //                            //   
        //                            //}
        //                        }
        //                        
        //                        
        //                }
        //                
        //                })
        //                if(j ==(results.rows.length-1)){
        //                    $('.lightbox').lightGallery({
        //                            enableTouch: true
        //                    });
        //                }
        //            }
        //});
        
        //tx.executeSql('SELECT * FROM  album where status="ON"',[], function (tx, results){
        //    for(var j=0; j < results.rows.length; j++)
        //    {
        //        var row = results.rows.item(j);
        //      
        //        tx.executeSql('SELECT g.*, a.galName  FROM  gallery g INNER JOIN album a ON g.galId= a.galId where g.galId="'+row.galId+'"',[], function (tx, res){
        //         
        //        if(res.rows.length>0)
        //        { 
        //            //if (res.rows.item(0).galId==row.galId) {
        //                //code
        //             // alert('SELECT * FROM  gallery where galId='+row.galId);
        //                $('#lightbox').append('<h2 class="text-center" style="background:#579960;color:#fff">'+res.rows.item(0).galName+'</h2>');
        //                for(var i=0;i<res.rows.length;i++){      
        //                    $('#lightbox').append('<div class="col-md-3 col-sm-4 col-xs-6" data-src='+ res.rows.item(i).images +' ><div class="lightbox-item p-item"> <img alt="images" src='+ res.rows.item(i).images + ' class="animated flip"></div></div>'); 
        //                    if(i == res.rows.length-1){
        //                        $('.lightbox').lightGallery({
        //                            enableTouch: true
        //                        });
        //                    }
        //                }
        //                 $('#lightbox').append('<br>');
        //           // }
        //        }
        //        })
        //    }
        //});
        
        
        //db.transaction(function(tx){
        //    tx.executeSql('SELECT * FROM gallery AS G JOIN album AS A ON G.galId=A.galId where A.status="ON"',[], function (tx, results){
        //        //alert(results.rows.length);
        //        for(var i=0;i<results.rows.length;i++){
        //            var galdatas=results.rows;
        //            var row = galdatas.item(i);
        //            json_gal.push(row);
        //            $('#lightbox').append('<div class="col-md-3 col-sm-4 col-xs-6" data-src='+ results.rows.item(i).images +' ><div class="lightbox-item p-item"><img src='+ results.rows.item(i).images + ' class="animated flip"></div></div>'); 
        //            if(i >= results.rows.length-1){
        //                //alert(i);
        //              $('.lightbox').lightGallery({
        //                enableTouch: true
        //              });
        //            }
        //        }
        //        $scope.$apply(function() {
        //              $scope.images=json_gal;
        //          });
        //    });
        //});
        
        
        
        
        //Working Gallery Start
        //db.transaction(function(tx){
        //    tx.executeSql('SELECT * FROM  gallery',[], function (tx, results){
        //        for(var i=0;i<results.rows.length;i++){      
        //            $('#lightbox').append('<div class="col-md-3 col-sm-4 col-xs-6" data-src='+ results.rows.item(i).images +' ><div class="lightbox-item p-item"> <img alt="images" src='+ results.rows.item(i).images + ' class="animated flip"></div></div>'); 
        //            if(i >= results.rows.length-1){
        //                $('.lightbox').lightGallery({
        //                    enableTouch: true
        //                });
        //            }
        //        }
        //    })
        //})
        //db.transaction(function(tx){
        //    tx.executeSql('SELECT * FROM  video',[], function (tx, results){
        //        for(var i=0;i<results.rows.length;i++){
        //            $('#videoUrl').append('<video style="height: 100%; width: 100%" poster="img/profile-menu.png" controls="controls" preload="auto" data-setup="{}"> <source type="video/mp4" src="'+ results.rows.item(i).url +'" /> </video>');
        //        }
        //    })
        //})
        //Working Gallery End
       
   // })
    //function successID(){
    //    return true;
    //}
    //db.transaction(function(tx){
    //    tx.executeSql('SELECT * FROM  video',[], function (tx, results){
    //        for(var i=0;i<results.rows.length;i++){
    //            $('#videoUrl').append('<video style="height: 100%; width: 100%" poster="img/profile-menu.png" controls="controls" preload="auto" data-setup="{}"> <source type="video/mp4" src="'+ results.rows.item(i).url +'" /> </video>');
    //        }
    //    })
    //})
})
.controller('MenuController', function($scope,$http,$location,alertmsg,$ionicPopup,$cordovaNetwork,$cordovaDialogs) {
    localStorage.setItem("menuUrl","MenuController");
    $("#sidebar").removeClass("toggled");
    $("#menu-trigger").removeClass("open");
    $scope.useremail= localStorage.getItem("email");
    $scope.loggedIn=localStorage.getItem("loggedIn");
    $scope.userName= localStorage.getItem("userName");
    $scope.userId= localStorage.getItem("id");
    
    $scope.subMenuOption= localStorage.getItem("subMenuOption");
    
    if ($scope.subMenuOption=="NO") {
        //alert($scope.subMenuOption+" subMenuOption");
       $scope.subMenuOption="subMenuOption";
    }
    else{
        $scope.subMenuOption="subMenu";
        //alert($scope.subMenuOption+" subMenu");
    }
    var item_arr=[];
    var businessId= localStorage.getItem("businessId");
        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxOffers.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
        .success(function (json) {
            console.log(json);
            if (json.error=="error"){
                //alert("error");
                $("#dropdownClose2").hide();
                $scope.latestoffer=false;
                
                 var db = window.openDatabase("branboxnew", "1.0", "branbox12", 100 * 1024 * 1024);
                db.transaction(function(tx){
                    tx.executeSql('SELECT * FROM item where offerStatus="ON"',[], function (tx, results)
                    {
                        var itemLength = results.rows.length;
                        var items=results.rows;
                        for(var j = 0; j < itemLength; j++)
                        {
                            
                            tx.executeSql('UPDATE  item SET price="'+items.item(i).oldPrice+'", oldPrice="'+items.item(i).price+'", offerStatus="OFF" WHERE id="'+items.item(i).id+'" ',successID);
                        }
                        
                    });
                    function successID(){
                        return true;
                    }
                });
            }
            else
            {
                
                $("#countOffersClose").removeClass("hide");
                $scope.latestoffer=true;
                $scope.OffersData=json.rows; //Offer Data
                $scope.countOffers=json.rows.length;
                //alert($scope.countOffers+" offer Data");
                var ajaxlength = json.rowsItem.length;
                //alert(ajaxlength);
                 var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                    db.transaction(function(tx){
                      
                         for(var i=0; i < ajaxlength; i++){
                                tx.executeSql('UPDATE  item SET price="'+json.rowsItem[i]['price']+'", oldPrice="'+json.rowsItem[i]['oldPrice']+'", offerStatus="'+json.rowsItem[i]['offerStatus']+'" WHERE id="'+json.rowsItem[i]['id']+'"',successID);
                            }
                        function successID(){
                            return true;
                        }
                    });
               
                
            }
          })
        .error(function(){
        });
        
        
        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
        db.transaction(function(tx){
            tx.executeSql('SELECT * FROM colorSetting',[], function (tx, results)
            {
                var itemLength = results.rows.length;
                var menudatas=results.rows;
                 $scope.HeaderColor="";
                $scope.HeaderLogo="";
                $scope.SideHeaderLogo="";
                $scope.currencyFormat="";
                $scope.signInImage="";
                $scope.needCartConcept="";
                $scope.HeaderColor=localStorage.getItem("HeaderColor");
                $scope.HeaderLogo=menudatas.item(0).HeaderLogo;
                $scope.SideHeaderLogo=menudatas.item(0).SideHeaderLogo;
                $scope.currencyFormat=menudatas.item(0).currencyFormat;
                $scope.signInImage=menudatas.item(0).signInImage;
                $scope.needCartConcept=menudatas.item(0).needCartConcept;
               
                localStorage.setItem("currencyFormat", $scope.currencyFormat);
                localStorage.setItem("signInImage", $scope.signInImage);
                localStorage.setItem("needCartConcept", menudatas.item(0).needCartConcept);
                //alert($scope.needCartConcept+" Local2");
                var subMenuOption=menudatas.item(0).HeaderLogo;
                localStorage.setItem("subMenuOption",subMenuOption);
                if (subMenuOption=="NO") {
                    //alert($scope.subMenuOption+" subMenuOption");
                    $scope.$apply(function() {
                        $scope.subMenuOption="subMenuOption";
                    });
                   
                }
                else{
                    $scope.$apply(function() {
                       $scope.subMenuOption="subMenu";
                    });
                    
                    //alert($scope.subMenuOption+" subMenu");
                }
                
            });
            
            tx.executeSql('SELECT * FROM Sidemenu',[], function (tx, results)
            {
                var itemLength = results.rows.length;
                var menudatas=results.rows;
                $scope.sideMenuData=menudatas.item(0);
                $scope.sideMenuFont=menudatas.item(0).sideMenuFont;
                $scope.sideMenuBackColor=menudatas.item(0).sideMenuBackColor;
                $scope.sideMenufontColor=menudatas.item(0).sideMenufontColor;
                //alert($scope.sideMenufontColor+" Local");
                 //alert($scope.sideMenuData.sideMenuFont+" DB");
               //alert($scope.sideMenuData.sideMenuBackColor+" directly");
               //alert($scope.sideMenuData.sideMenuFont+" directly");
                $scope.$apply(function() {
                    $scope.sideMenuData=menudatas.item(0);
                    //alert($scope.sideMenuData.needSideMenu);
                });
                
            });
            
        });
        
        

        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxColorSettings.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
        .success(function (colorSettings) {
            $scope.colorSetting=colorSettings.rows;
            $scope.HeaderColor=colorSettings.rows[0]['headerColor'];
            $scope.HeaderLogo=colorSettings.rows[0]['favIcon'];
            $scope.SideHeaderLogo=colorSettings.rows[0]['bannerImage'];
            $scope.currencyFormat=colorSettings.rows[0]['currencyFormat'];
            $scope.needCartConcept=colorSettings.rows[0]['needCartConcept'];
            //alert(colorSettings.rows[0]['needCartConcept']+" Server");
            localStorage.removeItem("needCartConcept");
            //alert(localStorage.getItem("needCartConcept")+" Local");
            localStorage.setItem("needCartConcept", $scope.needCartConcept);
            localStorage.setItem("currencyFormat", $scope.currencyFormat);
            
           // alert(localStorage.getItem("needCartConcept")+" Server");
            var subMenuOption=colorSettings.rows[0]['subMenuOption'];
            localStorage.setItem("subMenuOption",subMenuOption);
            if (subMenuOption=="NO") {
                //alert($scope.subMenuOption+" subMenuOption");
                $scope.$apply(function() {
                    $scope.subMenuOption="subMenuOption";
                });
               
            }
            else{
                $scope.$apply(function() {
                   $scope.subMenuOption="subMenu";
                });
                
                //alert($scope.subMenuOption+" subMenu");
            }
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
            db.transaction(function(tx){
               // alert("inside");
                tx.executeSql('UPDATE colorSetting SET needCartConcept="'+$scope.needCartConcept+'" where businessId="'+businessId+'"',successID);
               // tx.executeSql('UPDATE colorSetting SET currencyFormat="'+$scope.currencyFormat+'", HeaderColor="'+$scope.HeaderColor+'", pickupTime="'+colorSettings.rows[0]['pickupTime']+'",deliveryTime="'+colorSettings.rows[0]['deliveryTime']+'",startTime="'+colorSettings.rows[0]['startTime']+'",closeTime="'+colorSettings.rows[0]['closeTime']+'",subMenuOption="'+colorSettings.rows[0]['subMenuOption']+'",cartCaption="'+colorSettings.rows[0]['closeTime']+'",needCartConcept="'+colorSettings.rows[0]['needCartConcept']+'" where businessId="'+businessId+'"',successID);
               // alert('UPDATE colorSetting SET currencyFormat="'+$scope.currencyFormat+'",HeaderColor="'+$scope.HeaderColor+'",pickupTime="'+colorSettings.rows[0]['pickupTime']+'",deliveryTime="'+colorSettings.rows[0]['deliveryTime']+'",startTime="'+colorSettings.rows[0]['startTime']+'",closeTime="'+colorSettings.rows[0]['closeTime']+'",subMenuOption="'+colorSettings.rows[0]['subMenuOption']+'",cartCaption="'+colorSettings.rows[0]['closeTime']+'",needCartConcept="'+colorSettings.rows[0]['needCartConcept']+'" where businessId="'+businessId+'"');
                       //alert('UPDATE colorSetting SET needCartConcept="'+colorSettings.rows[0]['needCartConcept']+'" where businessId="'+businessId+'"');
                //tx.executeSql('SELECT * FROM colorSetting',[], function (tx, results)
                //{
                //    alert(results.rows.length)
                //    var itemLength = results.rows.length;
                //    var menudatas=results.rows;
                //    alert(menudatas.item(0).needCartConcept+"  From DB");
                //});
                
            });
            
            
        }).error(function(){  
        });
        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/getSideMenuSettings.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
        .success(function (data) {
               
                var datas=[];
                //alert(data.rows.length);
                 datas= data.rows[0];
                $scope.sideMenuFont=data.rows[0].sideMenuFont;
                $scope.sideMenuBackColor=data.rows[0].sideMenuBackColor;
                $scope.sideMenufontColor=data.rows[0].sideMenufontColor;
                //alert($scope.sideMenufontColor+" Server");
               //alert(datas.sideMenuFont+" directly");
               //alert(datas.sideMenuBackColor+" directly");
               //alert(datas.sideMenuFont+" directly");
                $scope.sideMenuData=datas;
              //$scope.$apply(function() {
              //      $scope.sideMenuData=datas;
              //  });
              //alert($scope.sideMenuData.sideMenuBackColor+" in menu");
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
            db.transaction(function(tx){
                tx.executeSql('DROP TABLE IF EXISTS Sidemenu');
                tx.executeSql('CREATE TABLE IF NOT EXISTS Sidemenu (id INTEGER, businessId INTEGER,needSideMenu TEXT,sideMenufontColor TEXT,sideMenuFont TEXT,sideMenuBackColor TEXT,menuCaption1 TEXT,menuCaption2 TEXT,menuCaption3 TEXT,menuCaption4 TEXT,menuCaption5 TEXT,menuCaption6 TEXT,menuCaption7 TEXT,menuCaption8 TEXT,menuStatus1 TEXT,menuStatus2 TEXT,menuStatus3 TEXT,menuStatus4 TEXT,menuStatus5 TEXT,menuStatus6 TEXT,menuStatus7 TEXT,menuStatus8 TEXT,menuIcon1 TEXT,menuIcon2 TEXT,menuIcon3 TEXT,menuIcon4 TEXT,menuIcon5 TEXT,menuIcon6 TEXT,menuIcon7 TEXT,menuIcon8 TEXT)');
                
                   
                    tx.executeSql('INSERT OR REPLACE INTO Sidemenu (id , businessId ,needSideMenu ,sideMenufontColor ,sideMenuFont ,sideMenuBackColor ,menuCaption1 ,menuCaption2,menuCaption3,menuCaption4,menuCaption5,menuCaption6,menuCaption7,menuCaption8,menuStatus1,menuStatus2,menuStatus3,menuStatus4,menuStatus5,menuStatus6,menuStatus7,menuStatus8,menuIcon1,menuIcon2,menuIcon3,menuIcon4,menuIcon5,menuIcon6,menuIcon7,menuIcon8) VALUES("1","'+datas.businessId+'","' +datas.needSideMenu+'","'+datas.sideMenufontColor+'","'+datas.sideMenuFont+'","'+datas.sideMenuBackColor+'","'+datas.menuCaption1+'","'+datas.menuCaption2+'","'+datas.menuCaption3+'","'+datas.menuCaption4+'","'+datas.menuCaption5+'","'+datas.menuCaption6+'","'+datas.menuCaption7+'","'+datas.menuCaption8+'","'+datas.menuStatus1+'","'+datas.menuStatus2+'","'+datas.menuStatus3+'","'+datas.menuStatus4+'","'+datas.menuStatus5+'","'+datas.menuStatus6+'","'+datas.menuStatus7+'","'+datas.menuStatus8+'","'+datas.menuIcon1+'","'+datas.menuIcon2+'","'+datas.menuIcon3+'","'+datas.menuIcon4+'","'+datas.menuIcon5+'","'+datas.menuIcon6+'","'+datas.menuIcon7+'","'+datas.menuIcon8+'")',successID);
                    
                  });
            
        }).error(function(){
               // alert("error unable to connect");
        });
        
        
                
        
        $scope.TokenNumber=localStorage.getItem("tokenNumber");
        var tokenDate=localStorage.getItem("tokenDate");
        if($scope.TokenNumber!=null)
        {
            $scope.FeedBackcount=1;
            $(".showtoken").removeClass("hide");
            $("#dropdownCount1").show();
        }
        var getMessage={
            id:businessId,
            useremail:$scope.useremail,
            userId:$scope.userId,
            message:'message'
        }
    
    if($scope.useremail!="" && $scope.userName!="")
    {
        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxGetMessage.php',getMessage, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
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
                 console.log($scope.FeedBackMessage);
             }
        }).error(function(){
        });
    }
    $scope.sendResponse=function()
    {
        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxFeedBackStatus.php',$scope.FeedBackMessage, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
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
      var db = window.openDatabase("branboxnew", "1.0", "branbox12", 100 * 1024 * 1024);
            db.transaction(function(tx){
                tx.executeSql('SELECT * FROM menu',[], function (tx, results)
                {
                    var itemLength = results.rows.length;
                    var menudatas=results.rows;
                    for(var i = 0; i < itemLength; i++)
                    {
                      var row = menudatas.item(i);
                      json_arr.push(row);
                    }
                $scope.$apply(function() {
                    $scope.MenuData=json_arr;
                });
                    console.log($scope.MenuData);
                });
                tx.executeSql('DELETE FROM orderitems');
                tx.executeSql('DELETE FROM orderingredients');
                tx.executeSql('DELETE FROM orderitemingredients');
            });
           
           if (localStorage.getItem("firsttime")==null) {
           
            $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxMenu.php',{bussId: businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                .success(function (json) {
                  var ajaxlength = json.rows.length;
                   $scope.MenuData= json.rows;
                   localStorage.setItem("firsttime",1);
                });
            }
        function successID(){
            return true;
        }
})

.controller('SubMenuController', function($scope,$http,$location,$cordovaDialogs) {
    localStorage.setItem("menuUrl","SubMenuController");
    $("#sidebar").removeClass("toggled");
    $("#menu-trigger").removeClass("open");
    var businessId=1;
    var url = $location.url();
    var temp = url.split("=");
    var getMenuId=temp[1];
    var json_arr=[];
    $scope.SubMenuData='';
    var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
    db.transaction(function(tx){ 
        tx.executeSql('SELECT * FROM subMenu where menuId="'+getMenuId+'" ',[], function (tx, results)
        {
            var itemLength = results.rows.length;
            var menudatas=results.rows;
            for(var i = 0; i < itemLength; i++)
            {
                var row = menudatas.item(i);
                json_arr.push(row);
            }
          $scope.$apply(function() {
              $scope.SubMenuData=json_arr;
          });
        });
    });
        
    $scope.goback=function()
    {
        window.history.back();
    }
})
.controller('SubMenuItemController', function($scope,$http,$location,alertmsg,$cordovaNetwork,$cordovaDialogs) {
    localStorage.setItem("menuUrl","SubMenuItemController");
    $("#sidebar").removeClass("toggled");
    $("#menu-trigger").removeClass("open");
    localStorage.setItem("businessId", 1);
    $scope.useremail= localStorage.getItem("email");
    $scope.userid= localStorage.getItem("id");
    $scope.userName= localStorage.getItem("userName");
    $scope.currency=localStorage.getItem("currencyFormat");
    $scope.needCartConcept=localStorage.getItem("needCartConcept");
    //alert($scope.needCartConcept);
    $scope.locationshow=false;
    $scope.cartCountGet= localStorage.getItem("cartCount");
    $("#cartCount").html($scope.cartCountGet);
    var businessId=1;
    var url = $location.url();
    var url = $location.url();
    var temp = url.split("=");
    var menuId=temp[1];
    var subMenuId=temp[2];
    var ingredients=[];
    var json_arrIng=[];
    $scope.SubMenuItemData="";
    var json_arr=[];
    
    $scope.subMenuOption= localStorage.getItem("subMenuOption");
    
    if ($scope.subMenuOption=="NO") {
       
       var subMenuOptionQuyery='SELECT * FROM item where menuId="'+menuId+'" ';
    }
    else{
        
        var subMenuOptionQuyery='SELECT * FROM item where menuId="'+menuId+'" and subMenuId="'+subMenuId+'" ';
    }
    
    
    var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
    db.transaction(function(tx){ 
        tx.executeSql(subMenuOptionQuyery,[], function (tx, results)
        {
            var itemLength = results.rows.length;
           
            var menudatas=results.rows;
            for(var i = 0; i < itemLength; i++)
            {
                var row=menudatas.item(i);
                json_arr.push(row);
                
                tx.executeSql('SELECT * FROM itemings where itemId="'+menudatas.item(i).id+'" ',[], function (tx, resultsIng)
                {
                    var itemLengthIng = resultsIng.rows.length;
                     var InghData=resultsIng.rows;
                    for(var j = 0; j < itemLengthIng; j++)
                    {
                        var row=InghData.item(j);
                        json_arrIng.push(row);
                    }
                    $scope.$apply(function() {
                        $scope.SubMenuItemIngredientsData=json_arrIng;
                    });
                });
                $scope.$apply(function() {
                    $scope.SubMenuItemData= json_arr;
                });
            }
        });
      
        
        
    });
    
    $scope.goback=function()
    {
      window.history.back();
    }

    $scope.minus=function(val,index,item)
    {
      console.log(item);
     var total=$("#quantity"+index).val();
     total--;
      if (total>=1)
      {
         
          var price=item.price *total;
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
            if ($cordovaNetwork.isOffline()) {
                 $cordovaDialogs.alert('Please Connect With InterNet', 'Unable to Order', 'OK')
                    .then(function() {
                    });
                    
                //swal({   
                //                title: "Unable to Order",   
                //                text: "Please Connect With InterNet",   
                //                confirmButtonColor: "#DD6B55",   
                //                confirmButtonText: "OK!!!!",  
                //            });
                return false;
            }
            else if(email==null)
            {
                $cordovaDialogs.alert('Please sign in or create our account quickly to use your App', 'Sorry', 'OK')
                    .then(function() {
                    });
                    
                //swal({   
                //                title: "Unable to Order",   
                //                text: "Please log in",   
                //                timer: 2000,   
                //                showConfirmButton: false 
                //            });
                $location.path('/login');
            }
            else
            {
                $scope.locationshow=true;
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

                        tx.executeSql('SELECT * FROM orderingredients where itemId="'+json.id+'"',[], function (tx, results)
                        {

                          var itemLength = results.rows.length;
                          var menudatas=results.rows;
                          
                                for(var i = 0; i < itemLength; i++) 
                                {
                                  var row = menudatas.item(i);
                                 ingPrice+=parseFloat(row.price);
                                }
                                var miniTotal=parseFloat(json.price)+ingPrice;
                                var subtotalValue=miniTotal * quantity;
                                subtotalValue=subtotalValue;

                            var itemLength = results.rows.length;
                            tx.executeSql('INSERT OR REPLACE INTO orderitems (businessId,menuId,subMenuId,itemId,userId,itemName,image,price,subTotal,quantity,tax,offers,orderType)VALUES("'+json.businessId+'","'+json.menuId+'","'+json.subMenuId+'","'+json.id+'","'+userid+'","'+json.name+'","'+json.image+'","'+miniTotal+'","'+subtotalValue+'","'+quantity+'","'+json.tax+'","'+json.offers+'","order")',successID,function(tx, sql_res) {
                    
                            var itemLastInsertId = sql_res.insertId;
                            tx.executeSql('SELECT * FROM orderingredients where itemId="'+json.id+'"',[], function (tx, results)
                            {
                                 var IngredientsDate=results.rows;
                                 console.log(IngredientsDate);

                                  var itemLength = results.rows.length;
                                  var menudatas=results.rows;
                                  
                                  for(var i = 0; i < itemLength; i++) {
                                      var row = menudatas.item(i);
                                      tx.executeSql('INSERT OR REPLACE INTO orderitemingredients (itemStorageId,businessId,menuId,subMenuId,itemId,userId,ingId,ingredients,price,ingredientsYN,extras)VALUES("'+itemLastInsertId+'","'+row.businessId+'","'+row.menuId+'","'+row.subMenuId+'","'+row.itemId+'","'+row.userId+'","'+row.ingId+'","'+row.ingredients+'", "'+row.price+'","'+row.ingredientsYN+'","'+row.extras+'")',successID);
                                     
                                  }  

                                 
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
                            $("#quantity"+index).val(1);
                            setTimeout(function(){
                                $("#addtocart"+index).addClass("bgm-green");
                                $("#addtocart"+index).addClass("bgm-bluegray");
                            },300);
                           
                           alertmsg.notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut,message);
                           var data=localStorage.getItem("cartCount");
                              data++;
                              localStorage.setItem("cartCount",data);
                               $scope.cartCountGet= data;
                            $("#cartCount").html(data);
                            console.log($scope.cartCountGet);
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

.controller('AddToCartCtrl', function($scope,$http,$location,alertmsg,$ionicPlatform,$ionicLoading,$cordovaDatePicker,$cordovaDialogs,$cordovaCamera,$cordovaNetwork) {
    localStorage.setItem("menuUrl","AddToCartCtrl");
    $('.time-picker').datetimepicker({
        format: 'LT'
    });
 
    

    $('.date-picker').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $scope.deliveryTypeoptions=[{id:"d",name:"Delivery"},{id:"p",name:"Pick Up"}];
    $scope.startTime=localStorage.getItem("startTime");
    $scope.closeTime=localStorage.getItem("closeTime");
    $scope.cartCaption=localStorage.getItem("cartCaption");
    $scope.totalItemAdded=localStorage.getItem("cartCount");
    var pickupOrDelivery= localStorage.getItem("deliveryTime");
    var pickupTime= localStorage.getItem("pickupTime");
    //alert(pickupTime);
    localStorage.setItem("pickupOrDelivery",pickupOrDelivery);
    var SearchDate = moment().format("YYYY/M/DD");
    $('#deliveryDate').val(SearchDate);
   
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    if (minutes < 10)
    {
        minutes = "0" + minutes;
    }
    var suffix = "AM";
    if (hours >= 12)
    {suffix = "PM";hours = hours - 12;}
    
    if (hours == 0) {hours = 12;}
    var timeform=hours + ":" + minutes + " " + suffix;
    localStorage.setItem("CurrentTime",timeform);
    //alert(timeform);
    var mins = 0;
    var hrs = 0;
    
    
     var deliverytime= localStorage.getItem("pickupOrDelivery");
    //alert(deliverytime)
    t1 = deliverytime.split(':');
    mins = Number(t1[1]) + Number(minutes);
    minhrs = Math.floor(parseInt(mins / 60));
    hrs = Number(t1[0]) + Number(hours) + minhrs;
    //alert(hrs);
    mins = mins % 60;
  
    if (hrs > 12)
    {
        hrs = hrs - 12;
        if (suffix=="PM") {
            dddd = "AM";
        }
        else
        {
            dddd = "PM";
        }
    }
    else
    {
        dddd = suffix;
    }
    //alert(mins.toString().length)
    if (mins.toString().length==1) {
        mins="0"+mins;
    }
    var $time=hrs + ":" + mins+ " " + dddd;
    $('#deliveryTime').val($time);
    //alert($time);
    
    $scope.useremail= localStorage.getItem("email");
    $scope.userName= localStorage.getItem("userName");
    $scope.mobile= localStorage.getItem("mobile");
    $scope.address1=localStorage.getItem("address1");
    $scope.address2=localStorage.getItem("address2");
    $scope.city=localStorage.getItem("city");
    $scope.state=localStorage.getItem("state");
    $scope.country=localStorage.getItem("country");
    $scope.postalCode=localStorage.getItem("postalCode");
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
      
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
              db.transaction(function(tx){
                  tx.executeSql('SELECT * FROM orderitems',[], function (tx, results)
                  {
                    //alert("in");
                    var itemLength = results.rows.length;

                    var menudatas=results.rows;
                    for(var i = 0; i < itemLength; i++)
                    {
                      var row = menudatas.item(i);
                      //var obj = {id:row.id,businessId:row.businessId,menuId:row.menuId,subMenuId:row.subMenuId,itemId:row.itemId,userId:row.userId,itemName:row.itemName,image:row.image,price:row.price,quantity:row.quantity,subTotal:row.subTotal,orderType:row.orderType};
                      json_arr.push(row);
                      //alert(row.itemName);
                    }
                    $scope.$apply(function() {
                        $scope.OrderedItems=json_arr;
                        
                        $scope.OrderedItemsAgain=json_arr;
                        
                    });
                    //console.log($scope.OrderedItems);
                  });
              });

           //
           $scope.dataHide=function(){
            //alert($("#hidingData").html())
            $("#hidingData").remove();
           // alert();
           }
       $scope.getDeliveryType= function(delivery){
            //alert();
            var deliveryType=delivery.id;
            //alert(deliveryType);
            var currenttime= localStorage.getItem("CurrentTime");
            //alert(currenttime);
            var dataas=currenttime.split(" ");
            var finaltime=dataas[0].split(":");
            var apm=dataas[1];
            var hour=finaltime[0];
            
            var selectedDate=hour+":"+finaltime[1]+" "+apm;
            if (deliveryType=='p') {
                
                var pickupTime=localStorage.getItem("pickupTime");
                localStorage.setItem("pickupOrDelivery",pickupTime);
                 var date1=currenttime.toString();
                       //alert(pickupTime)
                        
                         var deliverytime= pickupTime;
                            t1 = deliverytime.split(':');
                            mins = Number(t1[1]) + Number(finaltime[1]);
                            minhrs = Math.floor(parseInt(mins / 60));
                            hrs = Number(t1[0]) + Number(hour) + minhrs;
                            //alert(hrs);
                            mins = mins % 60;
                            
                            if (hrs > 12)
                            {
                                hrs = hrs - 12;
                               // alert(hrs);
                                if (apm=="PM") {
                                    dddd = "AM";
                                }
                                else
                                {
                                    dddd = "PM";
                                }
                            }
                            else
                            {
                                dddd=apm;
                              
                            }
                            if (mins.toString().length==1) {
                                mins="0"+mins;
                            }
                            var $time=hrs + ":" + mins+ " " + dddd;
                            //alert($time)
                            $('#deliveryTime').val($time);
                            $("#deliveryTime").val($time);
            }
            else{
                var deliveryTime=localStorage.getItem("deliveryTime");
                localStorage.setItem("pickupOrDelivery",deliveryTime);
                
                //alert(deliveryTime)
                var deliverytime= deliveryTime;
                t1 = deliverytime.split(':');
                mins = Number(t1[1]) + Number(finaltime[1]);
                minhrs = Math.floor(parseInt(mins / 60));
                hrs = Number(t1[0]) + Number(hour) + minhrs;
                //alert(hrs);
                mins = mins % 60;
                
                if (hrs > 12)
                {
                    hrs = hrs - 12;
                   // alert(hrs);
                    if (apm=="PM") {
                        dddd = "AM";
                    }
                    else
                    {
                        dddd = "PM";
                    }
                }
                else
                {
                    dddd=apm;
                }
                if (mins.toString().length==1) {
                    mins="0"+mins;
                }
                var $time=hrs + ":" + mins+ " " + dddd;
                //alert($time)
                $('#deliveryTime').val($time);
                $("#deliveryTime").val($time);
                
                
            }
        }
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
                if (itemLengthIng>0) {
                  //$("#exampleModal").modal("show");
                  for(var i = 0; i < itemLengthIng; i++) 
                  {
                      var row = ingredientsDatas.item(i);
                      var objIng = {id:row.id,itemStorageId:row.itemStorageId,businessId:row.businessId,menuId:row.menuId,subMenuId:row.subMenuId,itemId:row.itemId,userId:row.userId,ingId:row.ingId,ingredient:row.ingredients,ingPrice:row.price,ingYN:row.ingredientsYN,notes:row.extras};
                      json_arrIng.push(objIng);
                      count=count+1;
                      $scope.ingCountShow=count;
    
                  }
                  $scope.$apply(function(){
                        $scope.OrderedIngItems=json_arrIng;
                  })
                }
                //else
                //{
                //    $cordovaDialogs.alert('', 'Nothing in Ingredients List', 'OK')
                //    .then(function() {
                //    });
                //}
            });
                //$scope.OrderedIngItems=json_arrIng;
                //console.log($scope.ingCountShow);
                //console.log($scope.OrderedIngItems);
          });
          
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
       
        $scope.removeOrderItemIng=function(index,itemIndexVAlue,OrderedItems,json,id) 
        {
             var itemIndex=itemIndexVAlue;
            //alert($scope.OrderedItems[itemIndexVAlue]['id']);
            //alert(itemIndex);
          
            var ingPrice=parseFloat(json.ingPrice);
            var itemQuan=parseFloat($scope.OrderedItems[itemIndex].quantity);
            //var IngTotPrice=ingPrice*itemQuan;
            var itemPrice=parseFloat($scope.OrderedItems[itemIndex].price)-ingPrice;
            var itemSubTotal=itemPrice*itemQuan;
                itemSubTotal=itemSubTotal.toFixed(1);
           
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
            
            // swal("Deleted!", order.quantity+" "+order.itemName+" Deleted From the Cart", "success");   
            $cordovaDialogs.confirm("Do you want to dlete "+ order.quantity+" "+order.itemName+" From the Cart", 'Item Delete', ['Cancel','Delete'])
                .then(function(buttonIndex) {
                    if (buttonIndex==2) {
                    
                        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                        db.transaction(function(tx){
                            tx.executeSql('DELETE FROM orderitems where id="'+order.id+'"',successID);
                            tx.executeSql('DELETE FROM orderitemingredients where itemStorageId="'+order.id+'"',successID)
                            
                        });
                        
                        $cordovaDialogs.alert(order.quantity+" "+order.itemName+" Deleted From the Cart", 'Item Deleted Successfully', 'OK')
                        .then(function() {
                        });
                        
                        $scope.OrderedItems.splice(index,1);
                        
                        var cartCountGet= localStorage.getItem("cartCount");
                        cartCountGet-=1;
                        if (cartCountGet>0) {
                            localStorage.setItem("cartCount",cartCountGet);
                            
                        }
                        else {
                            localStorage.setItem("cartCount",0);
                            $scope.totalItemAdded=0;
                        }
                    }
                });

            
            function successID(){
                return true;
            }
        };

        $scope.getTotal = function(){
             var total = 0;
            var length= $scope.OrderedItems.length;

            for(var i = 0; i < length; i++){
                var product = $scope.OrderedItems[i];
                total += parseFloat(product.subTotal);
                //alert(product.subTotal);
            }
            $scope.totalAmount=(total).toFixed(2);
            if (total==0) {
              $("#food").hide();
            };
            return total;
        };

        $scope.getsubtotal = function(val,index,order){

        console.log($scope.OrderedItems);
        var quantity=$(val.target).val() ;
        if(quantity=="" || quantity=="0")
        {
          
            $("#quantity"+index).val(0);
            $("#subTotal"+index).val(0);
        }
        else
        {
            var price=$scope.OrderedItems[index].price;
            var ingPrice=0;
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
              db.transaction(function(tx){
                 
                            $scope.SumOfSubtotal = (quantity*parseFloat(price)).toFixed(2);
                     
                       $scope.$apply(function() {
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
                            $scope.OrderedItemsAgain.splice(index,1,{
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
                            
                       });
                           // console.log($scope.OrderedItems);
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
        
        
        $scope.getDate=function(){
             var options = {
                    date: new Date(),
                    mode: 'date', // or 'time'
                    minDate: new Date(),
                    
                }
               
                $ionicPlatform.ready(function(){
                    $cordovaDatePicker.show(options).then(function(date){
                        //alert(date);
                         //$ionicLoading.hide();
                        var date1=date.toString();
                        var dataas=date1.split(" ");
                        var Month = ["Gobi","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                        var mon = Month.indexOf(dataas[1]); 
                        var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
                        $("#deliveryDate").val(selectedDate);
                    });
                })
            
        };
        $scope.getTime=function(){
             var options = {
                    date: new Date(),
                    mode: 'time', // or 'time'
                    minDate: new Date()
                    
                }
                $ionicPlatform.ready(function(){
                    $cordovaDatePicker.show(options).then(function(time){
                        var date1=time.toString();
                        var dataas=date1.split(" ");
                        var finaltime=dataas[4].split(":");
                        var apm;
                        var hour;
                        var mins = 0;
                        var hrs = 0;
                        if (finaltime[0]>12 ) {
                            apm='PM';
                            hour=finaltime[0]-12;
                        }
                        else{
                            apm='AM';
                            hour=finaltime[0];
                        }
                        
                        var selectedDate=hour+":"+finaltime[1]+" "+apm;
                        localStorage.setItem("CurrentTime",selectedDate);
                         var deliverytime= localStorage.getItem("pickupOrDelivery");
                            t1 = deliverytime.split(':');
                            mins = Number(t1[1]) + Number(finaltime[1]);
                            minhrs = Math.floor(parseInt(mins / 60));
                            hrs = Number(t1[0]) + Number(hour) + minhrs;
                            //alert(hrs);
                            mins = mins % 60;
                            
                            if (hrs > 12)
                            {
                                hrs = hrs - 12;
                               // alert(hrs);
                                if (apm=="PM") {
                                    dddd = "AM";
                                }
                                else
                                {
                                    dddd = "PM";
                                }
                            }
                            else
                            {
                                dddd=apm;
                              
                            }
                            if (mins.toString().length==1) {
                                mins="0"+mins;
                            }
                            var $time=hrs + ":" + mins+ " " + dddd;
                            
                            $('#deliveryTime').val($time);
                            //alert(deliverytime);
    
    
                        $("#deliveryTime").val($time);
                    });
                })
            
        };
        $scope.getFood=function(orderData){
          var json_arr =  []; 
          var finaldata=[];
           var SearchDate = moment().format("YYYY/MM/DD")
           
               
            
            var delvDate = $('#deliveryDate').val();           
            var delvTime = $('#deliveryTime').val();  
            var ampm1=delvTime.split(" ");
            var ampm=ampm1[1];
            //alert(ampm);
            var new_value=moment(delvDate, 'YYYY/M/DD').format('YYYY/MM/DD');
            //var after = moment(SearchDate, 'DD/M/YYYY').format('YYYY/MM/DD');
            //alert(new_value+" add "+after);
            var creatdate=new_value.split("/");
            createddate=creatdate[0]+""+creatdate[1]+""+creatdate[2];
            if(delvDate=="" || new_value<SearchDate)
            {

              $cordovaDialogs.alert('It is Required!', 'Please Give Valid Date!!', 'OK')
                  .then(function() {
                  });
              return false
            }
            //alert("start")
            var start = moment($scope.startTime, 'h:mm a');
            var end = moment($scope.closeTime, 'h:mm a');
            var mid = moment(delvTime, 'h:mm a');
            
            
            
            
            if(start.isBefore(mid))
            {
                if("pm"!=ampm)
                {
                    if(end.isAfter(mid))
                   {
                        $cordovaDialogs.alert('Change Your Timing!', 'Please Check Restaturant Open and Close time', 'OK')
                        .then(function() {
                        });
                        
                        return false
                    }
                }
                else if("pm"==ampm)
                {
                    if(end.isBefore(mid))
                   {
                        $cordovaDialogs.alert('Change Your Timing!', 'Please Check Restaturant Open and Close time', 'OK')
                        .then(function() {
                        });
                        
                        return false
                    }
                }
            }
            else if("pm"==ampm)
            {
                if(end.isAfter(mid))
               {
                    $cordovaDialogs.alert('Change Your Timing!', 'Please Check Restaturant Open and Close time', 'OK')
                    .then(function() {
                    });
                    
                    return false
                }
            }
            else if("pm"!=ampm)
            {
                if(end.isBefore(mid))
               {
                    $cordovaDialogs.alert('Change Your Timing!', 'Please Check Restaturant Open and Close time', 'OK')
                    .then(function() {
                    });
                    
                    return false
                }
            }
            
            

              if(delvTime=="")
              {
                $cordovaDialogs.alert('It is Required!', 'Please Give Time for Delivery.', 'OK')
                    .then(function() {
                    });
                    
                return false
              }
              
             
              //$scope.startTime=localStorage.getItem("startTime");
              //$scope.closeTime=localStorage.getItem("closeTime");
              
              
              
                localStorage.setItem("delvDate", delvDate);
                localStorage.setItem("delvTime", delvTime);
                $ionicLoading.show({
                    template: 'Orders are sending',
                });
    //My orders Start
                var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                db.transaction(function(tx){
                tx.executeSql('SELECT * FROM orderitems',[], function (tx, results)
                {
                    var itemLength = results.rows.length;
                    var ingredientsDatas=results.rows;
                  //  alert(itemLength);
                    if(itemLength>0)
                    {
                        for(var i = 0; i < itemLength; i++) {
                            var json = ingredientsDatas.item(i);
                            tx.executeSql('INSERT OR REPLACE INTO myordereditems (businessId,menuId,subMenuId,itemId,userId,itemName,image,price,subTotal,quantity,tax,offers,orderedDate,orderRefDate)VALUES("'+json.businessId+'","'+json.menuId+'","'+json.subMenuId+'","'+json.itemId+'","'+json.userId+'","'+json.itemName+'","'+json.image+'","'+json.price+'","'+json.subTotal+'","'+json.quantity+'","'+json.tax+'","'+json.offers+'","'+new_value+'","'+createddate+'")',successID);
                        }
                        tx.executeSql('SELECT * FROM ordereddates',[], function (tx, results)
                        {
                            var itemLength = results.rows.length;
                            if (itemLength==0) {
                                tx.executeSql('INSERT OR REPLACE INTO ordereddates (orderedDate,orderRefDate)VALUES("'+new_value+'","'+createddate+'")',successID);
                            }
                            else if (results.rows.item(itemLength-1).orderRefDate!= createddate) {
                                tx.executeSql('INSERT OR REPLACE INTO ordereddates (orderedDate,orderRefDate)VALUES("'+new_value+'","'+createddate+'")',successID);
                            }
                        });
                        
                    }
                    function successID(){
                        return true;
                    }
                });
              });
              
    //My orders End    
            
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
                  $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ordertableData.php',finaldata, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                    .success(function (json) {
                     
                      console.log(json);
                      if(json.data=="success")
                      {
                        $ionicLoading.hide();
                        var date= localStorage.getItem("delvDate");
                        var time= localStorage.getItem("delvTime");
                        var TodayDate = moment().format('YYYY/M/DD');
                        var TomorrowDate = moment().add(1,'days').format('YYYY/M/DD');
                        var new_value=moment(date, 'YYYY/M/DD').format('YYYY/MM/DD');
                       // var after = moment(SearchDate, 'DD/M/YYYY').format('YYYY/MM/DD');
                        //alert(new_value+" add "+after);
                        var textData='';
                        if(new_value==TodayDate){
                            textData="Your order should arrive at "+time+" today "+date;
                        }
                        else if(TomorrowDate==new_value){
                            textData="Your order should arrive at "+time+" tomorrow  "+date;
                        }
                        else{
                            textData="Your order should arrive at "+time+" on "+date;
                        }
                        
                        $cordovaDialogs.alert(textData, 'Order Send Successfully!', 'OK')
                        .then(function() {
                            localStorage.setItem("delvDate","");
                            localStorage.setItem("delvTime","");

                              var db = window.openDatabase("branboxnew", "1.0", "branbox New", 200 * 1024 * 1024);
                                  db.transaction(function(tx){
                                        tx.executeSql('DELETE FROM orderitems');
                                       tx.executeSql('DELETE FROM orderingredients');  
                                  });
                                   localStorage.removeItem("cartCount");
                                    $location.path('/menu');
                        });
                        //swal({
                        //    title: "Order Send Successfully!",   
                        //    text: textData,   
                        //    timer: 4000,   
                        //    showConfirmButton: false 
                        //});
                            
                          //window.location="mainpage.html";
                          //setTimeout(function(){
                          //  $location.path('/menu');
                          //},4000);
                          //
                      }
                     console.log(json);
                    }).error(function(){  
                       // alert("server Error");
                     });
                  }, 1000);
                    

            //alert(localStorage.getItem("customerimgSrc"));
            //alert(localStorage.getItem("ImageLivePath"));
            //alert(localStorage.getItem("ImageUpdated"));
           // if ($cordovaNetwork.isOffline()) {
           //     $cordovaDialogs.alert('Please Connect With InterNet', 'Unable to Order', 'OK')
           //        .then(function() {
           //        });
           //    return false;
           //}
           //var userId=localStorage.getItem("id");
           if (localStorage.getItem("ImageUpdated")=="notUpdated") {
                alert("Send image");
                var imageURI = localStorage.getItem("customerimgSrc");
                var options = new FileUploadOptions();
                options.fileKey = "file";
                //options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                options.fileName =localStorage.getItem("id");;
                options.mimeType = "image/jpeg";
                var params = new Object();
                options.params = params;
                options.chunkedMode = false;
                var ft = new FileTransfer();
                ft.upload(imageURI, "http://branboxadmin.elasticbeanstalk.com/branboxController/endUserUploadImage", win1, fail1, options, false);
           }
           else {
            alert("Not Send image");
           }
        };
        function win1(r) {
            alert("Response = " + r.response);
            localStorage.setItem("ImageLivePath", r.response);
            localStorage.setItem("ImageUpdated", "updated");
            localStorage.removeItem("ImgPath");
            
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
            db.transaction(function(tx){
                tx.executeSql('UPDATE enduser SET image="'+r.response+'" id="'+userId+'"',[],successID);
            });
            
        }
         
        function successID(){
            return true;
        }
        function fail1(error) {
           alert("error");
           alert("An error has occurred: Code = " + error.code);
           alert("upload error source " + error.source);
           alert("upload error target " + error.target);
        }

         


     $scope.goback=function()
      {
        window.history.back();
      }


       



})

//register form (ezhil)
.controller('registerForm', function($scope,$http,$location,$cordovaOauth,$ionicPlatform,$cordovaDatePicker,$cordovaDialogs) { 
    $("#sidebar").removeClass("toggled");
    $("#menu-trigger").removeClass("open");
    localStorage.setItem("splash", 1);
    localStorage.setItem("menuUrl","registerForm");
    $scope.signInImage=localStorage.getItem("signInImage");
    $scope.getDate=function(){
        var options = {
               date: new Date(),
               mode: 'date', // or 'time'
               minDate: new Date()
           }
           $ionicPlatform.ready(function(){
               $cordovaDatePicker.show(options).then(function(date){
                    var date1=date.toString();
                    var dataas=date1.split(" ");
                    var Month = ["Gobi","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    var mon = Month.indexOf(dataas[1]); 
                   //var mon;
                   //if (dataas[1]=='Jan'){mon='01';}else if (dataas[1]=='Feb'){mon='02';}else if (dataas[1]=='Mar'){mon='03';}else if (dataas[1]=='Apr'){mon='04';}else if (dataas[1]=='May'){mon='05';}else if (dataas[1]=='Jun'){mon='06';}else if (dataas[1]=='Jul'){mon='07';}else if (dataas[1]=='Aug'){mon='08';}else if (dataas[1]=='Sep'){mon='09';}else if (dataas[1]=='Oct'){mon='10';}else if (dataas[1]=='Nov'){mon='11';}else if (dataas[1]=='Dec'){mon='12';}
                   var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
                   $("#dob").val(selectedDate);
               });
           })
       
    };
    
    
    
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
            $cordovaDialogs.alert('It is Required!', 'Please fill Your Name.', 'OK')
                    .then(function() {
                    });
                    
             //swal({   
             //                   title: "Please fill Your Name.",   
             //                   // text: "",   
             //                   timer: 2000,   
             //                   showConfirmButton: false 
             //               });
             return false
        }
        if(!pattern.test(email))
        {
            $cordovaDialogs.alert('It is Required!', 'Please fill Valid Email.', 'OK')
                    .then(function() {
                    });
                    
             //swal({   
             //                   title: "Please fill Valid Email.",   
             //                   // text: "",   
             //                   timer: 2000,   
             //                   showConfirmButton: false 
             //               });
             return false
        }
        if(password=="")
        {
            $cordovaDialogs.alert('It is Required!', 'Please fill Password.', 'OK')
                    .then(function() {
                    });
                    
             //swal({   
             //                   title: "Please fill Password.",   
             //                   // text: "",   
             //                   timer: 2000,   
             //                   showConfirmButton: false 
             //               });
             return false
        }
    
        if(mobile=="")
        {
            $cordovaDialogs.alert('It is Required!', 'Please fill Mobile Number.', 'OK')
                    .then(function() {
                    });
                    
             //swal({   
             //                   title: "Please fill Mobile Number.",   
             //                   // text: "",   
             //                   timer: 2000,   
             //                   showConfirmButton: false 
             //               });
             return false
        }
    
        if(address1=="" || address2=="" || country=="" || state=="" || city=="" || code=="")  
        {
            $cordovaDialogs.alert('It is Required!', 'Please fill All Address fields.', 'OK')
                    .then(function() {
                    });
                    
             //swal({   
             //                   title: "Please fill All Address fields.",   
             //                   // text: "",   
             //                   timer: 2000,   
             //                   showConfirmButton: false 
             //               });
             return false
        }
          var regid = localStorage.getItem("regid");
    
        //
        //alert("out side");
         //var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
         //   db.transaction(function(tx){
         //       
         //       tx.executeSql('DROP TABLE IF EXISTS enduser');
         //       tx.executeSql('CREATE TABLE IF NOT EXISTS enduser (bussinessId INTEGER,fname TEXT,password TEXT,gender TEXT,dob TEXT,email TEXT,mobile TEXT,address1 TEXT,address2 TEXT,country TEXT,state TEXT,city TEXT,code TEXT,image TEXT)');
         //       //alert("inside");
         //       tx.executeSql('INSERT OR REPLACE INTO enduser (bussinessId,fname,password,gender,dob,email,mobile,address1,address2,country,state,city,code,image)VALUES("'+bussinessId+'","'+fname+'","'+password+'","'+gender+'","'+dob+'","'+email+'","'+mobile+'","'+address1+'","'+address2+'","'+country+'","'+state+'","'+city+'","'+code+'","")',successID);
         //               
         //       function successID(){
         //           return true;
         //       }
         //   });
        
        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/registerUser.php',{busId:bussinessId,fname:fname,password:password,gender:gender,dob:dob,email:email,mobile:mobile,address1:address1,address2:address2,country:country,state:state,city:city,code:code,regid:regid}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
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
                      //alert("alert");
                    },
                    error:function(error)
                    {
                      localStorage.setItem("email", email);
                      window.location="index.html";
                      localStorage.setItem("registered","yes");
                    }
    
                    
                 });
                //console.log(data);
                 $cordovaDialogs.alert('Verification Link attatched in registered E-Mail', 'Please Check Your Mail', 'OK')
                    .then(function() {
                    });
                  //swal({  
                  //        title: "Please Check Your Mail",   
                  //        text: "Verification Link attatched in registered Mail",   
                  //        timer: 5000,   
                  //        showConfirmButton: false 
                  //    });
    
        }).error(function(){ 
            
            alert("server Error");
          });
    
    }
    

})

//login authentication (ezhil)
.controller('authentication', function($scope,$http,$location,$cordovaOauth,$cordovaDialogs,$cordovaFileTransfer) {  
    $("#sidebar").removeClass("toggled");
    $("#menu-trigger").removeClass("open");
    localStorage.setItem("menuUrl","authentication");
    $scope.remember=localStorage.getItem("remember");
    $scope.registered=localStorage.getItem("registered");
    $scope.businessId=localStorage.getItem("businessId");
    $scope.usneMail=localStorage.getItem("email");
    
    $scope.signInImage=localStorage.getItem("signInImage");
    //alert($scope.signInImage);
    
    var businessId= localStorage.getItem("businessId");
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
        $cordovaDialogs.alert('', 'Please fill Valid Email.', 'OK')
                    .then(function() {
                    });
         
        return false
    }
    //alert(pass);
    if(password=="")
    {
        $cordovaDialogs.alert('', 'Please fill Password.', 'OK')
                    .then(function() {
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

    //var businessId= localStorage.getItem("businessId");
    $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxLogin.php',{password:password,email:email,AppId:AppId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
    .success(function (json) {
      var ajaxlength = json.length;
      
      console.log(json);
        if(ajaxlength==1)
        {
            
            var id = json[0]['id'];
            var email = json[0]['email'];
            var pass = json[0]['password'];
            var gender = json[0]['gender'];
            var dob = json[0]['dateOfBirth'];
            var mobile = json[0]['phoneNumber'];
            var userName  = json[0]['userName'];
            var address1 = json[0]['address1'];
            var address2 = json[0]['address2'];
            var city = json[0]['city'];
            var state = json[0]['state'];
            var country = json[0]['country'];
            var postalCode = json[0]['postalCode'];
            
            
            var url = json[0]['customerImage'];
            var filename =url.split("/").pop();
            var targetPath = cordova.file.externalRootDirectory+"Branbox/profilePicture/"+ filename;
            var trustHosts = true
            var options = {};
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
              .then(function(result) {
                    counterMenu++;
                    //test.resolve();
                    if(ajaxlength == counterMenu)
                    {
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
            //alert(json[0]['email']);
            var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
            db.transaction(function(tx){
                //alert("in");
                tx.executeSql('DROP TABLE IF EXISTS enduser');
                tx.executeSql('CREATE TABLE IF NOT EXISTS enduser(id INTEGER,bussinessId INTEGER,fname TEXT,password TEXT,gender TEXT,dob TEXT,email TEXT,mobile TEXT,address1 TEXT,address2 TEXT,country TEXT,state TEXT,city TEXT,code TEXT,image TEXT)');
                tx.executeSql('INSERT OR REPLACE INTO enduser (id,bussinessId,fname,password,gender,dob,email,mobile,address1,address2,country,state,city,code,image)VALUES("'+id+'","'+businessId+'","'+userName+'","'+pass+'","'+gender+'","'+dob+'","'+email+'","'+mobile+'","'+address1+'","'+address2+'","'+country+'","'+state+'","'+city+'","'+postalCode+'","'+targetPath+'")',successID);
            //    alert(id);
            //tx.executeSql('SELECT * FROM enduser ',[], function (tx, results)
            //{
            //    alert("In side tghe asdg ");
            //    var itemLength = results.rows.length;
            //    alert(itemLength);
            //    alert(results.rows.item(0).fname);
            //});
            //   
            //    
            //    alert(businessId);
            //    alert(userName);
            //    alert(pass);
            //    alert(gender);
            //    alert(dob);
            //    alert(email);
            //    alert(mobile);
            //    alert(address1);
            //    alert(address2);
            //    alert(country);
            //    alert(state);
            //    alert(city);
            //    alert(postalCode);
                
                function successID(){
                    return true;
                }
            });
            
           
            localStorage.setItem("customerimgSrc", targetPath);
            localStorage.setItem("password", pass);
            localStorage.setItem("email", email);
            localStorage.setItem("loggedIn", "YES");
            localStorage.setItem("id", id);
            localStorage.setItem("businessId", 1);
            localStorage.setItem("mobile",mobile );
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
            $cordovaDialogs.alert('Username or password is incorrect, please re-try or recover password.', 'Sorry', 'OK')
                    .then(function() {
                        $location.path('/login');
                        $("#password").val("");
                    });
            
        }
        $scope.SubMenuData= json.rows;

    }).error(function(){  
    });
    function successID(){
        return true;
    }
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
        $cordovaDialogs.alert('', 'Please fill Valid Email.', 'OK')
                    .then(function() {
                    });
         //swal({   
         //                   title: "Please fill Valid Email.",   
         //                   // text: "",   
         //                   timer: 2000,   
         //                   showConfirmButton: false 
         //               });
         return false
    }
    $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/AjaxForgotPassword.php',{bussId:$scope.businessId,email:email}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
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
                 //alert("alert");
                },
                error:function(error)
                {

                  window.location="index.html";
                }

                
              });
            //console.log(data);
            $cordovaDialogs.alert('Password Change link is attached..', 'Please Check Your Mail', 'OK')
                    .then(function() {
                    });
              //swal({  
              //        title: "Please Check Your Mail",   
              //        text: "Password Change link is attached..",   
              //        timer: 5000,   
              //        showConfirmButton: false 
              //    });



          }).error(function(){  
        //alert("server Error");
      });
    $("#exampleModal").modal("hide");
  }
    $scope.login = function() {
       
           $cordovaOauth.facebook("431062713751366", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
              localStorage.setItem("accessToken",result.access_token);
              if(result.access_token) {
                
                    $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: result.access_token, fields: "id,name,gender,email,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                          //alert(JSON.stringify(result.data));
                          var text = "";
                          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                          for( var i=0; i < 5; i++ ) {
                              text += possible.charAt(Math.floor(Math.random() * possible.length));
                          }
                              localStorage.setItem("password", text);
                              localStorage.setItem("email", JSON.stringify(result.data.email));
                              localStorage.setItem("loggedIn", "YES");
                              localStorage.setItem("id", JSON.stringify(result.data.id));
                              localStorage.setItem("businessId", 1);
                              localStorage.setItem("userName",JSON.stringify(result.data.name));
                              var fname = result.data.name; 
                              var password = text;
                              var gender = result.data.gender;
                              var dob = '';
                              var email = result.data.email;
                              var mobile = '';
                              var address1 = '';
                              var address2 = '';
                              var country = '';
                              var state = '';
                              var city = '';
                              var bussinessId="1";    
                              var code = '';
                              var regid =localStorage.getItem("regid");
                              $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/registerUser.php',{busId:bussinessId,fname:fname,password:password,gender:gender,dob:dob,email:email,mobile:mobile,address1:address1,address2:address2,country:country,state:state,city:city,code:code,regid:regid}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                              .success(function (data) {
                                    //alert(JSON.stringify(data));
                                    $.ajax({
                                        type: "POST",
                                        dataType:"json",
                                        data:{id:data.rows[0].id,bId:bussinessId,email:email,password:text},
                                        url: 'http://www.sedarspine.com/BranboxAppMail/registerUser.php',
                                        crossDomain:true,
                                        headers: {'Content-Type':'application/x-www-form-urlencoded'},
                                        success:function(json)
                                        {
                                                     
                                        },
                                        error:function(error)
                                        {
                                          localStorage.setItem("email", email);
                                          window.location="index.html";
                                          localStorage.setItem("registered","yes");
                                        }
                                    });
                                $cordovaDialogs.alert('Verification Link attatched in registered Mai', 'Please Check Your Mail', 'OK')
                                    .then(function() {
                                });
                              //swal({  
                              //        title: "Please Check Your Mail",   
                              //        text: "Verification Link attatched in registered Mail",   
                              //        timer: 10000,   
                              //        showConfirmButton: false 
                              //      }); 
                                

                      }).error(function(){ 
                          
                          alert("server Error");
                        });
                    }, function(error) {
                        alert("There was a problem getting your profile.  Check the logs for details.");
                        console.log(error);
                    });
              }else{
                  alert("Not signed in");
                  $location.path("/register");
              }

            }, function(error) {
                alert("There was a problem signing in!  See the console for logs");
                alert(error);
                console.log(error);
            });
    };
    $scope.Glogin = function() {
        $cordovaOauth.google("214375389987-57sm2h297h1m0seagaq8m3hsdlbi193i.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
          var data=null;
          $http.get("https://www.googleapis.com/oauth2/v1/userinfo", { params: { access_token: result.access_token, fields: data, format: "json" }})
          .then(function(result) {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for( var i=0; i < 5; i++ ) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                    localStorage.setItem("password", text);
                    localStorage.setItem("email", result.data.email);
                    localStorage.setItem("loggedIn", "YES");
                    localStorage.setItem("id", result.data.id);
                    localStorage.setItem("businessId", 1);
                    localStorage.setItem("userName",result.data.name);

                    var fname = result.data.name; 
                    var password = text;
                    var gender = result.data.gender;
                    var dob = ''; 
                    var email = result.data.email;
                    var mobile = '';
                    var address1 = '';
                    var address2 = '';
                    var country = '';
                    var state = '';
                    var city = '';
                    var bussinessId="1";    
                    var code = '';
                    var regid =localStorage.getItem("regid");
                    $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/registerUser.php',{busId:bussinessId,fname:fname,password:password,gender:gender,dob:dob,email:email,mobile:mobile,address1:address1,address2:address2,country:country,state:state,city:city,code:code,regid:regid}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                    .success(function (data) {
                          $.ajax({
                              type: "POST",
                              dataType:"json",
                              data:{id:data.rows[0].id,bId:bussinessId,email:email,password:text},
                              url: 'http://www.sedarspine.com/BranboxAppMail/registerUser.php',
                              crossDomain:true,
                              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                              success:function (json)
                              {
                                
                              },
                              error:function(error)
                              {
                                localStorage.setItem("email", email);
                                window.location="index.html";
                                localStorage.setItem("registered","yes");
                              }
                          });
                          $cordovaDialogs.alert('Verification Link attatched in registered Mai', 'Please Check Your Mail', 'OK')
                                    .then(function() {
                                });
                    //swal({  
                    //                  title: "Please Check Your Mail",   
                    //                  text: "Verification Link attatched in registered Mail",   
                    //                  timer: 10000,   
                    //                  showConfirmButton: false 
                    //              });
                      
              }).error(function(){ 
                  alert("server Error");
              });

          }, function(error) {
            alert("There was a problem getting your profile.  Check the logs for details.");
          });
        }, function(error) {
            console.log(error);
        });
    };
})
  
  .controller('latestOfferController', function($scope,$http,$location,alertmsg,$cordovaNetwork,$cordovaDialogs) {  
        var businessId=1;
        $scope.cartCountGet= localStorage.getItem("cartCount");
        $("#cartCount").html($scope.cartCountGet);
        localStorage.setItem("menuUrl","latestOfferController");
        //$scope.cartCount= localStorage.getItem("cartCount");
        $("#message").removeClass("open");
        $("#sidebar").removeClass("toggled");
        $("#menu-trigger").removeClass("open");
        $scope.userid= localStorage.getItem("id");
        $scope.latestOffers="";
        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/ajaxOffers.php',{bussId:businessId}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
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

        var userid= localStorage.getItem("id");
        if ($cordovaNetwork.isOffline()) {
            
            $cordovaDialogs.alert('Please Connect With InterNet', 'Unable to Order', 'OK')
            .then(function() {
            });
            return false;
            //swal({   
            //                title: "Unable to Order",   
            //                text: "Please Connect With InterNet",   
            //                confirmButtonColor: "#DD6B55",   
            //                confirmButtonText: "OK!!!!",  
            //            });
            
        }
        else if(userid==null)
        {
            $cordovaDialogs.alert('Please sign in or create our account quickly to use your App', 'Sorry', 'OK')
            .then(function() {
            });
            //swal({   
            //                title: "Unable to Order",   
            //                text: "Please log in",   
            //                timer: 2000,   
            //                showConfirmButton: false 
            //            });
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
.controller('timeDelivery', function($scope,$http,$cordovaDialogs) {  
      $("#sidebar").removeClass("toggled");
      $("#menu-trigger").removeClass("open");
      localStorage.setItem("splash", 1);

      $scope.save = function(){
         var delvDate = $('#deliveryDate').val();           
         var delvTime = $('#deliveryTime').val();  

         if(delvDate=="")
          {
            $cordovaDialogs.alert('It is Required!', 'Please Give Valid Date!! ', 'OK')
            .then(function() {
            });
               //swal({   
               //                   title: "Please Give Valid Date!! ",   
               //                   text: "It is Required!",   
               //                   timer: 2000,   
               //                   showConfirmButton: false 
               //               });
               return false
          }
         
          if(delvTime=="")
          {
            
            $cordovaDialogs.alert('It is Required!', 'Please Give Time for Delivery. ', 'OK')
            .then(function() {
            });
               //swal({   
               //                   title: "Please Give Time for Delivery.",   
               //                   text: " It is Required!",   
               //                   timer: 2000,   
               //                   showConfirmButton: false 
               //               });
               return false
          }
        localStorage.setItem("delvDate", delvDate);
        localStorage.setItem("delvTime", delvTime);
        window.location="index.html";
      }      

  })
//check Login User data


//Table Booking
.controller('tableBooking', function($scope,$http,$location,$ionicPlatform,$cordovaDatePicker,$cordovaDialogs) {
        var SearchDate = moment().format('YYYY/M/DD');
        localStorage.setItem("menuUrl","tableBooking");
        $("#bookDate").val(SearchDate);
        $scope.getDate=function(){
            var options = {
                   date: new Date(),
                   mode: 'date', // or 'time'
                   minDate: new Date()
               }
            $ionicPlatform.ready(function(){
                $cordovaDatePicker.show(options).then(function(date){
                    var date1=date.toString();
                    var dataas=date1.split(" ");
                    var Month = ["Gobi","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    var mon = Month.indexOf(dataas[1]); 
                    var selectedDate=dataas[3]+'/'+mon+'/'+dataas[2];
                    //alert(selectedDate);
                    $("#bookDate").val(selectedDate);
                });
            })
        };
        
        $scope.getTime=function(){
             var options = {
                    date: new Date(),
                    mode: 'time', // or 'time'
                    minDate: new Date()
                    
                }
                //$ionicPlatform.ready(function(){
                    $cordovaDatePicker.show(options).then(function(time){
                        //alert(time);
                        var date1=time.toString();
                        var dataas=date1.split(" ");
                        var finaltime=dataas[4].split(":");
                        var apm;
                        var hour;
                        if (finaltime[0]>12 ) {
                            apm='PM';
                            hour=finaltime[0]-12;
                        }
                        else{
                            apm='AM';
                            hour=finaltime[0];
                        }
                        
                        var selectedDate=hour+":"+finaltime[1]+" "+apm;
                        document.getElementById("bookTime").value=selectedDate;
                        //$("#bookTime").val(selectedDate);
                    });
                //})
            
        };
   $scope.save=function(){

     var email = localStorage.getItem("id");
      if(email==null)
      {
        $cordovaDialogs.alert('Please sign in or create our account quickly to use your App', 'Sorry', 'OK')
         //$cordovaDialogs.alert('Please log in', 'Unable to Book Table', 'OK')
         
            .then(function() {
            });
          //swal({   
          //                title: "Unable to Book Table",   
          //                text: "Please log in",   
          //                timer: 2000,   
          //                showConfirmButton: false 
          //            });

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

        var SearchDate = moment().format('YYYY/M/DD');
        var new_value=moment(bookDate, 'YYYY/M/DD').format('YYYY/MM/DD');
       // var after = moment(SearchDate, 'DD/M/YYYY').format('YYYY/MM/DD');
        //alert(new_value+" add "+after);
        if(bookDate=="" || new_value<SearchDate)
        {
            
            $cordovaDialogs.alert('It is Required!', 'Please Give Valid Date!!', 'OK')
            .then(function() {
            });
            
          //swal({   
          //  title: "Please Give Valid Date!! ",   
          //  text: "It is Required!",   
          //  timer: 2000,   
          //  showConfirmButton: false 
          //});
          return false
        }

        if(bookTime=="")
        {
            $cordovaDialogs.alert('It is Required!', 'Please Give Time for Booking.', 'OK')
            .then(function() {
            });
          //swal({   
          //  title: "Please Give Time for Booking.",   
          //  text: " It is Required!",   
          //  timer: 2000,   
          //  showConfirmButton: false 
          //});
          return false
        }

        if(mems=="Select")
        {
            $cordovaDialogs.alert('It is Required!', 'Please select Seats.', 'OK')
            .then(function() {
            });
          //swal({  
          //  title: "Please select Seats.",   
          //  text: " It is Required!",   
          //  timer: 2000,   
          //  showConfirmButton: false 
          //});
          return false
        }
            
        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
        db.transaction(function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS tablebooking (id INTEGER PRIMARY KEY AUTOINCREMENT, businessId INTEGER,bookDate TEXT,bookTime TEXT,mems TEXT)');
            //alert("Tabke");
            tx.executeSql('INSERT OR REPLACE INTO tablebooking (businessId,bookDate,bookTime,mems) VALUES("'+businessId+'","'+bookDate+'","'+bookTime+'","'+mems+'")',successID);
             //alert("Tabke sfgha hdf");
            tx.executeSql('select * from tablebooking',[], function (tx, results)
            {
                //alert(results.rows.length);
                
            });
        });   
        
          var booking={
            userId:userId,
           
            businessId:businessId,
            bookDate:bookDate,
            bookTime:bookTime,
            mems:mems,
           

            }
            $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/tablebooking.php',booking,{headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'} })     
    .success(function(data) {
         console.log(data);
         
            $cordovaDialogs.alert('Please Wait for response', 'Table Booking request send to Admin', 'OK')
            .then(function() {
            });
            //swal({   
            //              title: "Table Booking request send to Admin",   
            //              text: "Please Wait for response",   
            //              timer: 2000,   
            //              showConfirmButton: false 
            //          });

            $location.path('/menu');

            }).error(function(){  
        //alert("server Error");
      });
      }
    }
    function successID(){
                      return true;
                    }
  })


.controller('myProfileDetail', function($scope,$http,$ionicPlatform, $rootScope,$cordovaCamera,$cordovaSQLite,$cordovaDialogs,$cordovaNetwork,$location,$cordovaFile) {
   
    
    //alert("Html Gallery view ");
    
    
    
    //image upload
    localStorage.setItem("menuUrl","myProfileDetail");
    var json_array=[];
    var json_array1=[];
    var json_array2=[];
    var businessId= localStorage.getItem("businessId");
    var userId=localStorage.getItem("id");
    $scope.ordereedDatesStatus=false;
    $scope.tablebookingStatus=false;
    $scope.ordereedDates=[];
    $scope.tablebooking=[];
    
    $scope.$apply(function(){
        $scope.imgSrc =localStorage.getItem("customerimgSrc");
    });
    //alert(localStorage.getItem("customerimgSrc"));
    //alert(localStorage.getItem("ImageLivePath"));
    //alert(localStorage.getItem("ImageUpdated"));
    //$scope.imgSrc =localStorage.getItem("customerimgSrc");
    var userId=localStorage.getItem("id");
    $ionicPlatform.ready(function() {
        var options = {
            quality: 50,
            //destinationType: Camera.DestinationType.DATA_URL,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            //saveToPhotoAlbum: false
        };
        
        $scope.takePicture = function() {
            
            $cordovaCamera.getPicture(options).then(function(imageData) {
            onImageSuccess(imageData);
            function onImageSuccess(fileURI) {
            createFileEntry(fileURI);
            }
            
            function createFileEntry(fileURI) {
            window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }
            
            // 5
            function copyFile(fileEntry) {
            var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
            var newName = makeid() + name;
            newName=newName;
            
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
            fileEntry.copyTo(
            fileSystem2,
            newName,
            onCopySuccess,
            fail
            );
            },
            fail);
            }
            
            // 6
            function onCopySuccess(entry) {
                //alert(entry.nativeURL);
                //alert("gobi");
                localStorage.setItem("customerimgSrc",entry.nativeURL);
                $scope.$apply(function(){
                    $scope.imgSrc =entry.nativeURL;
                });
                if($cordovaNetwork.isOnline()){
                    //alert("online");
                    var imageURI = entry.nativeURL;
                    localStorage.setItem("ImageLivePath",entry.nativeURL);
                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    //options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                    options.fileName = userId;
                    options.mimeType = "image/jpeg";
                    var params = new Object();
                    options.params = params;
                    options.chunkedMode = false;
                    var ft = new FileTransfer();
                    ft.upload(imageURI, "http://branboxadmin.elasticbeanstalk.com/branboxController/endUserUploadImage", win1, fail1, options, false);
                }
                else{
                    localStorage.setItem("ImageLivePath",entry.nativeURL);
                    localStorage.setItem("ImageUpdated", "notUpdated");
                   // alert("Now off Line"+entry.nativeURL);
                    var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                    db.transaction(function(tx){
                        tx.executeSql('UPDATE enduser SET image="'+entry.nativeURL+'" id="'+userId+'"',[],successID);
                    });
                }
               
                
            }
            function win1(r) {
                //alert("Response = " + r.response);
                localStorage.setItem("ImageLivePath", r.response);
                localStorage.setItem("ImageUpdated", "updated");
                localStorage.removeItem("ImgPath");
                
                $cordovaFile.moveFile(entry.nativeURL, userId+".jpg", cordova.file.externalRootDirectory+"Branbox/profilePicture/")
                    .then(function (success) {
                        alert("success");
                      // success
                    }, function (error) {
                        alert("Error");
                        // error
                    });
      
                
                
                
                var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
                db.transaction(function(tx){
                    tx.executeSql('UPDATE enduser SET image="'+r.response+'" id="'+userId+'"',[],successID);
                });
                
            }
             
            function successID(){
                return true;
            }
            function fail1(error) {
               alert("error");
               alert("An error has occurred: Code = " + error.code);
               alert("upload error source " + error.source);
               alert("upload error target " + error.target);
            }
            function fail(error) {
            alert("fail: " + error.code);
            }
            
            function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            
            for (var i=0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
            }
            
            }, function(err) {
            console.log(err);
            });
            
            
            
            
            
        }
    });
        
        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
        db.transaction(function(tx){
            tx.executeSql('SELECT * FROM enduser ',[], function (tx, results)
            {
                var itemLength = results.rows.length;
                //alert(itemLength)
                $scope.$apply(function() {
                    $scope.profileDetails=results.rows.item(0);
                    $scope.imgSrc=results.rows.item(0).image;
                });
                //alert($scope.profileDetails.fname);
            });
            tx.executeSql('SELECT * FROM myordereditems',[], function (tx, results)
            {
                var itemLength = results.rows.length;
                
                for(var i = 0; i < itemLength; i++)
                {
                    var row = results.rows.item(i);
                    json_array.push(row);
                    $scope.ordereedDatesStatus=true;
                }
                $scope.$apply(function() {
                   $scope.orderedItemDetails=json_array;
                });
                //alert($scope.orderedItemDetails);
                //alert(itemLength+" Menu orders");
            });
            tx.executeSql('SELECT * FROM ordereddates',[], function (tx, results)
            {
                var itemLength = results.rows.length;
                for(var i = 0; i < itemLength; i++)
                {
                    var row = results.rows.item(i);
                    json_array2.push(row);
                    $scope.ordereedDatesStatus=true;
                }
                $scope.$apply(function() {
                    $scope.ordereedDates=json_array2;
                });
                //alert($scope.ordereedDates[0].orderRefDate);
            });
            
            tx.executeSql('SELECT * FROM tablebooking',[], function (tx, results)
            {
                var itemLength = results.rows.length;
                  
                    for(var i = 0; i < itemLength; i++)
                    {
                        var row = results.rows.item(i);
                        json_array1.push(row);
                        $scope.tablebookingStatus=true;
                    }
                    $scope.$apply(function(){
                        $scope.tablebooking=json_array1;
                    });
                    //alert($scope.tablebooking[0].orderRefDate);
                   
            });
            
            //alert("Completed");
            
        });
            
    $scope.removeItems=function(index,orderRefDate)
    {
        //alert(index+","+orderRefDate);
        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
            db.transaction(function(tx){
            tx.executeSql('DELETE FROM  ordereddates where orderRefDate="'+orderRefDate+'"',[],successID);
            tx.executeSql('DELETE FROM myordereditems where orderRefDate="'+orderRefDate+'"',[],successID);
        });
        //$scope.$apply(function(){
        
            $scope.ordereedDates.splice(index,1);
        //});
        if($scope.ordereedDates.length==0) {
            //$scope.$apply(function(){
                $scope.ordereedDatesStatus=false;
            //});
        }
        function successID(){
            return true;
        }
        
    }
    $scope.removeBooking=function(index,id)
    {
        //alert(index+","+id);
        var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
            db.transaction(function(tx){
            tx.executeSql('DELETE FROM tablebooking where id="'+id+'"',[],successID);
        });
        function successID(){
            return true;
        }
        
        $scope.tablebooking.splice(index,1);
        if($scope.tablebooking.length==0) {
            //$scope.$apply(function(){
                $scope.tablebookingStatus=false;
            //});
        }
    }
    
    //$("#updateedId input").change(function(){
    //    var namesTest = $(this).attr('name');
    //    alert(namesTest);
    //    $scope.orderedItemDetails[0].namesTest=$(this).val();
    //    alert($scope.orderedItemDetails[0].mobile);
    //});
    $scope.updateProfile = function(e) {
        var updateDetailData= {};
        var userId = localStorage.getItem("id");
        var businessId= localStorage.getItem("businessId");
        updateDetailData = {
            userId:userId
        }
        $(".updateContentDiv input").each(function() {
            var namesTest = $(this).attr('name');
            updateDetailData[namesTest]=$(this).val();
            //alert($(this).val());
            
        });
        
         updateDetailData['userId']=userId;
         //alert()
         updateDetailData['businessId']=businessId;
         var db = window.openDatabase("branboxnew", "1.0", "branbox Demo", 100 * 1024 * 1024);
            db.transaction(function(tx){
            tx.executeSql('UPDATE enduser SET fname="'+updateDetailData['fname']+'" ,email="'+updateDetailData['email']+'",mobile="'+updateDetailData['mobile']+'",dob="'+updateDetailData['dob']+'" ,address1="'+updateDetailData['address1']+'",address2="'+updateDetailData['address2']+'",city="'+updateDetailData['city']+'",state="'+updateDetailData['state']+'" where bussinessId="'+businessId+'" and id="'+userId+'"',[],successID);
            //alert(updateDetailData['dob']);
            tx.executeSql('SELECT * FROM enduser',[], function (tx, results)
            {
                
                var itemLength = results.rows.length;
                //alert(itemLength);
                $scope.$apply(function() {  
                    $scope.profileDetails=results.rows.item(0);
                });
                //alert($scope.profileDetails.fname);
            });
        });
        function successID(){
            return true;
        }
        $(".updateContentDiv").find('.pmb-block').removeClass('toggled');
        
        //swal("Success!", "Your Profile details are updated..!", "success");
        $http.post('http://branboxadmin.elasticbeanstalk.com/branboxApp/updateUserDetail.php', updateDetailData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
        .success(function (response) {
            $(".updateContentDiv").find('.pmb-block').removeClass('toggled');
        })
        .error(function(){  
            alert("server Error");
        });
       
    }
    $('body').on('click', '[data-pmb-action]', function(e){
        e.preventDefault();
        var d = $(this).data('pmb-action');
        
        if (d === "edit") {
            $(this).closest('.pmb-block').toggleClass('toggled');
        }
        
        if (d === "reset") {
            $(this).closest('.pmb-block').removeClass('toggled');
        }
    });
    
})

.controller('GalleryCtrl', function($scope, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

  $scope.allImages = [{
    src: 'img/pic1.jpg'
  }, {
    src: 'img/pic2.jpg'
  }, {
    src: 'img/pic3.jpg'
  }];

  $scope.zoomMin = 1;

  $scope.showImages = function(index) {
    $scope.activeSlide = index;
    $scope.showModal('templates/gallery-zoomview.html');
  };

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  $scope.updateSlideStatus = function(slide) {
    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };
});
