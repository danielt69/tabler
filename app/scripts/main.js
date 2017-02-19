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

  // Your custom JavaScript goes here

  //helpers
  function handleDrop(e) {
    // e.stopPropagation();
    // e.preventDefault();
    var files = e;
    var i,f;
    for (i = 0, f = files[i]; i != files.length; ++i) {
      var reader = new FileReader();
      var name = f.name;
      reader.onload = function(e) {
        var data = e.target.result;

        /* if binary string, read with type 'binary' */
        var workbook = XLSX.read(data, {type: 'binary'});

        // var sheet_name_list = workbook.SheetNames;
        // sheet_name_list.forEach(function(y) { /* iterate through sheets */
        //   var worksheet = workbook.Sheets[y];
        //   var json = XLSX.utils.sheet_to_json(worksheet);
        // });
        window.workbook = workbook;
		if ($('.radio.active input').val() == 'table') {
			tableBuilder(workbook);
		} else if ($('.radio.active input').val() == 'html') {
			htmlBuilder(workbook);
		} else if ($('.radio.active input').val() == 'json') {
			jsonBuilder(workbook);
		}
      };
      reader.readAsBinaryString(f);
    }
  } 

  var simpleTabs = function(aaa,bbb) { // aaa = tabs, bbb = section that links to tab
    aaa.each(function(index, value) {
        $(this).on('click.tab', function(e) {
            $(this).addClass('active').siblings().removeClass('active');
            bbb[index] && bbb.removeClass('active').eq(index).addClass('active');            
        });
    });
  }

  function tableBuilder(workbook) {

    var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) { /* iterate through sheets */
		var worksheet = workbook.Sheets[y];
		var json = XLSX.utils.sheet_to_json(worksheet);

	    var _wrapper_start = $('form.option.table .wrapper_start').val()           || '<table class="table table-hover table-responsive"><tbody>';
	    var _wrapper_end = $('form.option.table .wrapper_end').val()             || '</table></tbody>';
	    var _tableHeading_row_open = $('form.option.table .tableHeading_row_open').val()   || '<tr>';
	    var _tableHeading_row_close = $('form.option.table .tableHeading_row_close').val()  || '</tr>';
	    var _tableHeading_th_open = $('form.option.table .tableHeading_th_open').val()    || '<th>';
	    var _tableHeading_th_close = $('form.option.table .tableHeading_th_close').val()   || '</th>';
	    var _tableBody_row_open = $('form.option.table .tableBody_row_open').val()      || '<tr>';
	    var _tableBody_row_close = $('form.option.table .tableBody_row_close').val()     || '</tr>';
	    var _tableBody_td_open = $('form.option.table .tableBody_td_open').val()       || '<td>';
	    var _tableBody_td_close = $('form.option.table .tableBody_td_close').val()      || '</td>';

	    var htmlTable = '';

	    var tableHeading = _tableHeading_row_open;
	    $.each(json[0], function( index, value ) {
	      tableHeading += _tableHeading_th_open + index + _tableHeading_th_close;
	    });
	    tableHeading += _tableHeading_row_close;

	    var tableBody = '';
	    for (var i = 0; i < json.length; i++) {
	      tableBody += _tableBody_row_open;
	      $.each(json[i], function( index, value ) {
	        tableBody += _tableBody_td_open + value + _tableBody_td_close;
	      });
	      tableBody += _tableBody_row_close;
	    }

	    htmlTable = _wrapper_start + tableHeading + tableBody + _wrapper_end;
	    $('.output').append(htmlTable);
    });
  }

  function htmlBuilder
(json) {
  	var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) { /* iterate through sheets */
		var worksheet = workbook.Sheets[y];
		var json = XLSX.utils.sheet_to_json(worksheet);
	    var _wrapper_start = $('form.option.html .wrapper_start').val()           || '<section class="compare_table">';
	    var _wrapper_end = $('form.option.html .wrapper_end').val()             || '</section>';
	    var _rowTemplate = '';
	    var htmlTable = '';

	    htmlTable = _wrapper_start + _rowTemplate + _wrapper_end;
	    $('.output').append(htmlTable);
    });
  }

  function jsonBuilder(json) {
  	var sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach(function(y) { /* iterate through sheets */
		var worksheet = workbook.Sheets[y];
		var json = XLSX.utils.sheet_to_json(worksheet);
    	$('.output').append(JSON.stringify(window.workbook));
	});
  }

  //code
$( document ).ready(function() {


  $("html").on("dragover", function(event) {
      event.preventDefault();  
      event.stopPropagation();
      $(this).addClass('dragging');
  }).on("dragleave", function(event) {
      event.preventDefault();  
      event.stopPropagation();
      $(this).removeClass('dragging');
  }).on("drop", function(event) {
    if(event.originalEvent.dataTransfer){
        if(event.originalEvent.dataTransfer.files.length) {
            event.preventDefault();
            event.stopPropagation();
            /*UPLOAD FILES HERE*/
            $('.output').html('')
            handleDrop(event.originalEvent.dataTransfer.files);
        }   
    }
    $(this).removeClass('dragging');
  });


  simpleTabs($('.radio'),$('form.option'));
  $('.radio input').on('click.build', function(e) {
    if (window.workbook) {
      $('.output').html('');
      if ($(this).val() == 'table') {
        tableBuilder(window.workbook);
      } else if ($(this).val() == 'html') {
        htmlBuilder(window.workbook);
      } else if ($(this).val() == 'json') {
        jsonBuilder(window.workbook);
      }     
    }
  });

});

  
})();
