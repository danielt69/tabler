/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }
//##############################################################################################################################//
  // Your custom JavaScript goes here

  //helpers
  // function handleDrop(img) {
  //   // e.stopPropagation();
  //   // e.preventDefault();
  //   // window.img = img[0];
  //   console.log(img);
  //   var c = document.getElementById("main");
  //   var ctx = c.getContext("2d");
  //   var image = img;
  //   ctx.drawImage(image,0,0);
  // } 


// document.getElementById('imageinput').addEventListener('change', function(event) {
//     var myCanvas = document.getElementById("main");
//     var ctx = myCanvas.getContext('2d');
//     var img = new Image();
//     img.onload = function(){
//         myCanvas.width = img.width;
//         myCanvas.height = img.height;
        
//         ctx.drawImage(img, 0, 0);
        
//         // console.log(myCanvas.toDataURL('image/jpeg'));
//     };
    
//     img.src = URL.createObjectURL(event.target.files[0]);
// });
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function dlCanvas() {
  var dt = $('canvas')[0].toDataURL();
  /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
  this.href = dt;
  this.download = $('canvas').data().name;
};


function handleFiles(files) {
    var file = files[0];
    var myCanvas = document.getElementById("main");
    $(myCanvas).data().name = file.name;
    var ctx = myCanvas.getContext('2d');
    var img = new Image();
    img.onload = function(){
        myCanvas.width = img.width;
        myCanvas.height = (img.width*img.height)/img.width;
        ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
        // console.log(myCanvas.toDataURL('image/jpeg'));
    };
    // var img = document.createElement("img");

    img.file = file;
    
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
    // $("#main").after('<img src="' + $("#main")[0].toDataURL('image/jpeg') + '" title="' + file.name + '">');

    // imgSet(file);
    $('svg').remove();
    $('#dl').removeClass('disabled');
}

function imgSet(){
  var str = $('input.form-control').val() || '100, 200, 400, 800';
  var set = str.replace(" ","").split(',');
  for (var i = 0; i < set.length; i++) {
    set[i] = parseInt(set[i]);
  }
  set = set.sort();
  return set;
}
//   for (var i = 0; i < set.length; i++) {
//     // set[i]
//     var canvas = document.getElementById("main");
//     var oldCanvas = canvas.toDataURL();
//     var img = new Image();
//     img.src = oldCanvas;
//     img.onload = function (){
//         canvas.width = set[i];
//         myCanvas.height = (set[i]*img.height)/img.width;
//         ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
//     }
//     // mycanvas.id = "canvas"+"_"+set[i];
//     // document.body.appendChild(mycanvas);

//     var name = file.name+"_"+set[i];
//     var ctx = myCanvas.getContext('2d');
//     img.onload = function(){
//         myCanvas.width = set[i];
//         myCanvas.height = (set[i]*img.height)/img.width;
//         ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
//     };
//     img.file = file;
//     img.src = myCanvas.toDataURL('image/jpeg');
//     $('.output').append(img);
//   }
// }

  //code
$( document ).ready(function() {

  $('html').on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
    e.stopPropagation();
    e.preventDefault();
  })
  .on('dragover dragenter', function() {
    $(this).addClass('dragging');
  })
  .on('dragleave dragend drop', function() {
    $(this).removeClass('dragging');
  })
  .on('drop', function(e) {
    // debugger;
    var dt = e.originalEvent.dataTransfer;
    var files = dt.files;
    handleFiles(files);
  });


  document.getElementById("dl").addEventListener('click', dlCanvas, false);


});

  
})();
