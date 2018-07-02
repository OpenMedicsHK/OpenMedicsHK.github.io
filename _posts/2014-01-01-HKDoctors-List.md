---
layout: post
title: 香港醫生網地圖
desc: 由香港醫生網提供的醫生資料，包括資歷、應診地址、收費等。
tags: [醫療服務地圖]
img: HKPCMAP.jpg
level: 第二級
---

<!-- Google Maps API javascript -->

<script type="text/javascript">

var tableid = '1mCZGFOft_K1umKeqIVFuSPcCFfSiooX_TEFoJGEL'; //the table id
var map;
var mapDiv;
var storedResponse;

/* INITIALIZE - initialize the map and geocoder */

function authenticated(){ google.maps.event.addDomListener(window, 'load', initialize); }



  function changePosition(position){

    if (position){
      map.setZoom(13);
      map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    }
    
  }
  
function initialize() {
  mapDiv = document.getElementById('map_canvas');
  map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(22.38269281766774, 114.10987863448963), //the center lat and long
    zoom: 11, //zoom
    mapTypeId: google.maps.MapTypeId.ROADMAP //the map style
  });
   var viewport = document.querySelector("meta[name=viewport]");
   viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
   mapDiv.style.width = '100%';
   mapDiv.style.height = '500px';
  
   var layer = new google.maps.FusionTablesLayer({
      map: map,
      heatmap: { enabled: false },
      query: {
        select: "col6",
        from: "1mCZGFOft_K1umKeqIVFuSPcCFfSiooX_TEFoJGEL",
        where: ""
      },
      options: {
        styleId: 2,
        templateId: 2
      }
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(changePosition, function(e){ });
    }
}

</script>
<script type="text/javascript" src="https://maps.google.com/maps/api/js?key=AIzaSyAm_dMcHD1az_PJ3HNyEH1A-ED-EvzUunE&callback=authenticated&v=3"></script>
  <div id="map_canvas"></div>
