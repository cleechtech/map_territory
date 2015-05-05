$(document).ready(function(){

	// make map
	var center = { lat: 37.750854, lng: -122.432589 };
	var mapOptions = {
		center: new google.maps.LatLng(center.lat, center.lng),
		zoom: 16
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var shape = new google.maps.Polygon({});
	var shapeCoords = [];

	google.maps.event.addListener(map, 'click', function(e) {
		shape.setMap(null)
		var lat = e.latLng.lat();
    	var lng = e.latLng.lng();
    	var clickPoint = new google.maps.LatLng(lat, lng);

    	shapeCoords.push(clickPoint);

    	var marker = new google.maps.Marker({
	      position: clickPoint,
	      map: map
		});

    	shape = new google.maps.Polygon({
			paths: shapeCoords,
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35
		});

		shape.setMap(map);
	});
});