// JQuery Setup
(function($) {
var wajs = require('wajs')
"use strict"; // Start of use strict
console.log(window);

//wolfram alpha js API
var waAppId = '8LWE32-V3GQQ9W69R';
var waClient = new wajs(waAppId);
var queryString = ['Shriners Hospitals for Children','university of michigan hospital', 'new york hospital','london hospital'];
var setData = 0;
var finalData = 0;

for(var j = 0;j<queryString.length;j++){
  waClient.query(queryString[j]).then(function(qr) {
    setData = qr.toJson();
    console.log('going');
    var locationArray = [];
    finalData = JSON.parse(setData);
    console.log(finalData);
    for(var i=0;i<Object.keys(finalData).length;i++){
      console.log('going');
      if(finalData.pod[i].title == "Map"){
        locationArray[i] = finalData.pod[i].infos['0'].info['0'].link['0'].url;
        console.log(locationArray[i]);
        return locationURL(locationArray[i]);
      }
    }
  });
}
function locationURL(url){
  console.log('going');
  var readLength = url.length - breakpoint;
  var longitude = 0;
  var latitude = 0;
  var breakpoint = url.indexOf('%');
  for(var i=breakpoint;i>0;i--){
    console.log('going');
    if(url.charAt(i-1)=='='){
      longitude = url.substring(i,breakpoint);
        for(var i=breakpoint+3;i<url.length;i++){
          console.log('going');
          if(url.charAt(i)=='&'){
            latitude = url.substring(breakpoint+3,i);
            console.log(latitude);
            console.log(longitude);
            return latitude, longitude;
          }
        }
    }
  }
}

//
$(document).ready(function(){
    $(this).scrollTop(0);
});
$("#select1").focus(function(){
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
