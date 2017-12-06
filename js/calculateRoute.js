var blaat = function() {

	function RouteXL_API_Connector() {

		this.tour = function(locations, success_callback, error_callback) {

			var request = jQuery.ajax({

				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "Basic "
							+ btoa("Ishant:SnelTransport"));
				},

				url : "https://api.routexl.nl/tour",
				method : "POST",
				dataType : "json",

				data : {
					locations : locations
				},

			});

			request.done(function(msg) {
				success_callback(msg);
			});

			request.fail(function(jqXHR, textStatus) {
				error_callback(textStatus);
			});

		};

	}

	var locations = [];

	locations[locations.length] = {
			'address' : 'Gouda, The Netherlands',
			'lat' : 52.0127622,
			'lng' : 4.711614200000001
		};
		
		locations[locations.length] = {
			'address' : 'Amsterdam, The Netherlands',
			'lat' : 52.3665123,
			'lng' : 4.8738249,
		};
		
		locations[locations.length] = {
			'address' : 'Maastricht, The Netherlands',
			'lat' : 50.877466,
			'lng' : 5.688267
		};
		
		locations[locations.length] = {
			'address' : 'Enschede, The Netherlands',
			'lat' : 52.2244851,
			'lng' : 6.868837
		};
		
		locations[locations.length] = {
			'address' : 'Gouda, The Netherlands',
			'lat' : 52.0127622,
			'lng' : 4.711614200000001,
			'restrictions' : {
				'ready' : 10,
				'due' : 120
			}
		};

	// Init API connector
	var r = new RouteXL_API_Connector();

	// Get the tour
	r.tour(locations, function(result) {
		var txt = "";
		// Success
		for (i = 0; i < result.count; i++) { 
		    txt += "Name " + result.route[i].name + "<br>";
		    txt += "Arrival " + result.route[i].arrival + "<br>";
		    txt += "Distance " + result.route[i].distance + "<br>";
		}
		
		$("#optimalRoutePresent").html(txt);
	}, function(error) {

		// // Error
		document.write(error);

	});
};