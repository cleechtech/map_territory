$(document).ready(function(){

	// make map
	var center = { lat: 37.750854, lng: -122.432589 };
	var mapOptions = {
		center: new google.maps.LatLng(center.lat, center.lng),
		zoom: 16
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	// add search box
	var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));
	var markers = [];
	
	google.maps.event.addListener(searchBox, 'places_changed', function() {
    	var places = searchBox.getPlaces();

    	if (places.length == 0) {
      		return;
    	}
    	for (var i = 0, marker; marker = markers[i]; i++) {
      		marker.setMap(null);
    	}

    	// For each place, get the icon, place name, and location.
    	markers = [];
    	var bounds = new google.maps.LatLngBounds();
    	for (var i = 0, place; place = places[i]; i++) {
			var image = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};

			// Create a marker for each place.
			var marker = new google.maps.Marker({
				map: map,
				icon: image,
				title: place.name,
				position: place.geometry.location
			});

			markers.push(marker);

			bounds.extend(place.geometry.location);
    	}
		map.fitBounds(bounds);
	});
	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
	});

	// polygon and click listener
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