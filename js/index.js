// JQuery Setup
(function($) {
var wajs = require('wajs')
"use strict"; // Start of use strict
console.log(window);

//wolfram alpha API
var waAppId = '8LWE32-V3GQQ9W69R';
var waClient = new wajs(waAppId);
var queryString = 'university of michigan hospital';
var queryOptions = {
  format: 'plaintext',
  units: 'metric'
};
var setData = 0;
waClient.query(queryString).then(function(qr) {
  setData = qr.toJson();
  console.log(setData);
});

var locationArray = 0;
for(var i=0;i<setData.length;i++){
  if(setData['title'] == 'maps'){
    locationArray[i] = setData.title.infos.links['url'];
  }
}
 
function locationURL(url){
  var longitude = 0;
  var latitude = 0;
  var breakpoint = url.indexOf('%');
  for(var i=breakpoint;i<breakpoint;i--){
    if(url.indexOf(i)=='='){
      longitude = url.substring(i,breakpoint)
    }
  }
  for(var i=breakpoint+3;i>breakpoint;i++){
    if(url.indexOf(i)=='&'){
      latitude = url.substring(breakpoint+3,i);
    }
  }
  console.log(longitude,latitude);
}

locationURL("http://maps.google.com?ie=UTF8&z=12&t=k&ll=42.2848%2C-83.7318&q=42.2848%20N%2C%2083.7318%20W");


$(document).ready(function(){
    $(this).scrollTop(0);
});
$("#select1").focus(function(){
});



//check login
var loginLink = "mamba/api/checklogin";
var test = "test.json";
$.getJSON(loginLink, function(data) {
  var verifyLogin = data['logged-in'];
  console.log(verifyLogin);
  if (verifyLogin == true) {
    console.log(data);
    $('#logout').removeClass('hidden');
    $('#dashboard').removeClass('hidden');
    $('#login-button').addClass('hidden');
    $('#register-button').addClass('hidden');
  }
});

$(document).on('click', 'a.page-scroll', function(event) {
  var $anchor = $(this);
  $('html, body').stop().animate({
    scrollTop: ($($anchor.attr('href')).offset().top - 50)
  }, 1250, 'easeInOutExpo');
  event.preventDefault();
});

$('body').scrollspy({
  target: '.navbar-fixed-top',
  offset: 51
});

$('.navbar-collapse ul li a').click(function() {
  $('.navbar-toggle:visible').click();
});

$('#mainNav').affix({
  offset: {
    top: 100
  }
});

$(window).scroll(function(){
  if ($("#mainNav").offset().top >100){
    $('#mainNav').addClass('navbar-scroll');
    console.log('navbar scroll success');
  }
  else {
    $('#mainNav').removeClass('navbar-scroll');
    console.log('navbar scroll canceled');
  }
});
})(jQuery);
