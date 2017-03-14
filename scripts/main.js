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
!function(){"use strict";function o(o){var n,r,i=o;for(n=0,r=i[n];n!=i.length;++n){var l=new FileReader;r.name;l.onload=function(o){var n=o.target.result,r=XLSX.read(n,{type:"binary"});window.workbook=r,"table"==$(".radio.active input").val()?t(r):"html"==$(".radio.active input").val()?a(r):"json"==$(".radio.active input").val()&&e(r)},l.readAsBinaryString(r)}}function t(o){var t=o.SheetNames;t.forEach(function(t){var a=o.Sheets[t],e=XLSX.utils.sheet_to_json(a),n=$("form.option.table .wrapper_start").val()||'<table class="table table-hover table-responsive"><tbody>',r=$("form.option.table .wrapper_end").val()||"</table></tbody>",i=$("form.option.table .tableHeading_row_open").val()||"<tr>",l=$("form.option.table .tableHeading_row_close").val()||"</tr>",s=$("form.option.table .tableHeading_th_open").val()||"<th>",c=$("form.option.table .tableHeading_th_close").val()||"</th>",d=$("form.option.table .tableBody_row_open").val()||"<tr>",v=$("form.option.table .tableBody_row_close").val()||"</tr>",p=$("form.option.table .tableBody_td_open").val()||"<td>",f=$("form.option.table .tableBody_td_close").val()||"</td>",u="",h=i;$.each(e[0],function(o,t){h+=s+o+c}),h+=l;for(var w="",b=0;b<e.length;b++)w+=d,$.each(e[b],function(o,t){w+=p+t+f}),w+=v;u=n+h+w+r,$(".output").append(u)})}function a(o){var t=workbook.SheetNames;t.forEach(function(o){var t=workbook.Sheets[o],a=(XLSX.utils.sheet_to_json(t),$("form.option.html .wrapper_start").val()||'<section class="compare_table">'),e=$("form.option.html .wrapper_end").val()||"</section>",n="",r="";r=a+n+e,$(".output").append(r)})}function e(o){var t=workbook.SheetNames;t.forEach(function(o){var t=workbook.Sheets[o];XLSX.utils.sheet_to_json(t);$(".output").append(JSON.stringify(window.workbook))})}var n=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));"serviceWorker"in navigator&&("https:"===window.location.protocol||n)&&navigator.serviceWorker.register("service-worker.js").then(function(o){o.onupdatefound=function(){if(navigator.serviceWorker.controller){var t=o.installing;t.onstatechange=function(){switch(t.state){case"installed":break;case"redundant":throw new Error("The installing service worker became redundant.")}}}}})["catch"](function(o){console.error("Error during service worker registration:",o)});var r=function(o,t){o.each(function(o,a){$(this).on("click.tab",function(a){$(this).addClass("active").siblings().removeClass("active"),t[o]&&t.removeClass("active").eq(o).addClass("active")})})};$(document).ready(function(){$("html").on("dragover",function(o){o.preventDefault(),o.stopPropagation(),$(this).addClass("dragging")}).on("dragleave",function(o){o.preventDefault(),o.stopPropagation(),$(this).removeClass("dragging")}).on("drop",function(t){t.originalEvent.dataTransfer&&t.originalEvent.dataTransfer.files.length&&(t.preventDefault(),t.stopPropagation(),$(".output").html(""),o(t.originalEvent.dataTransfer.files)),$(this).removeClass("dragging")}),r($(".radio"),$("form.option")),$(".radio input").on("click.build",function(o){window.workbook&&($(".output").html(""),"table"==$(this).val()?t(window.workbook):"html"==$(this).val()?a(window.workbook):"json"==$(this).val()&&e(window.workbook))})})}();
//# sourceMappingURL=main.js.map
