$(function(){
	var customerName;
	function fillCustomersTableRow(customer, dateAndTime, delivered, received, type, orderId ){
	return "<tr><td>"+ customer +"</td><td>"+ dateAndTime+"</td><td>"+delivered+"</td><td>"+received+"</td><td>"+type+"</td><td><button class=\"deleteOrderButton\" type=\"button\" data-id=\""+orderId+"\">Delete order</button></td></tr>";	
	};

	function callback(response) {
		customerName = response;
		  //use return_first variable here
		};
		
		function getDateTime(year, month, date, hours, minutes, seconds, miliseconds){
			var dateTime = new Date();
			
			dateTime.setFullYear(year);
			dateTime.setMonth(month);
			dateTime.setDate(date);
			dateTime.setHours(hours);
			dateTime.setMinutes(minutes);
			dateTime.setSeconds(seconds);
			dateTime.setMilliseconds(miliseconds);
			
			return dateTime
		}

	function getCustomerName(customerID){
		$.ajax({
			async: false,
			type : "GET",
			dataType : "json",
			contentType : "application/json",
			url : "http://localhost:1234/customers/customer/" + customerID,
			success: function (result){
				callback(result["customer_name"]) ;
			}
		});
	};
	
	
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json",
			url : "http://localhost:1234/orders/orders",
		}).then(function(data) {
			Object.keys(data).
			forEach(function(key) {
				
				getCustomerName(data[key].customer_id);
				var dateTime = getDateTime(data[key].order_date_time[0], data[key].order_date_time[1], data[key].order_date_time[2], data[key].order_date_time[3], data[key].order_date_time[4], data[key].order_date_time[5], data[key].order_date_time[6]);
				$( "#tableBodyToAppend" ).append( fillCustomersTableRow(customerName, dateTime, data[key].order_delivered, data[key].order_received, data[key].order_type, data[key].order_id));
			});
		});
		
		$( '#tableBodyToAppend' ).delegate('.deleteOrderButton', 'click', function(event){
			event.preventDefault();
			var orderId = $(this).attr('data-id');
			var closestTRElement = $(this).closest('tr');
			
			$.ajax({
				type : "DELETE",
				dataType : "json",
				contentType : "application/json",
				url : "http://localhost:1234/orders/order/" + orderId ,
			}).then(function(result){
				closestTRElement.remove();
			});
			
		});
})