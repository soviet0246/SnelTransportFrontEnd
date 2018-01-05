$(function(){

	var customerName;
	function fillCustomersTableRow(customer, dateAndTime, delivered, received, type, orderId ){
	return "<tr><td>"+ customer +"</td><td>"+ dateAndTime+"</td><td>"+delivered+"</td><td>"+received+"</td><td>"+type+"</td><td><button class=\"addOrderNewArticleButton\" type=\"button\" data-id=\""+orderId+"\">View details</button></td></tr>";	
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
			url : Util.URL_JAVA + Util.URL_SPECIFIC_CUSTOMER + customerID,
			success: function (result){
				callback(result["customer_name"]) ;
			}
		});
	};
	
	
		$.ajax({
			type : "GET",
			dataType : "json",
			contentType : "application/json",
			url : Util.URL_JAVA + Util.URL_ALL_ORDERS,
		}).then(function(data) {
			Object.keys(data).
			forEach(function(key) {
				
				getCustomerName(data[key].customer_id);
				var dateTime = getDateTime(data[key].order_date_time[0], data[key].order_date_time[1], data[key].order_date_time[2], data[key].order_date_time[3], data[key].order_date_time[4], data[key].order_date_time[5], data[key].order_date_time[6]);
				$( "#tableBodyToAppend" ).append( fillCustomersTableRow(customerName, dateTime, data[key].order_delivered, data[key].order_received, data[key].order_type, data[key].order_id));
			});
		});
		
		
				
		$('#tableBodyToAppend').delegate( '.addOrderNewArticleButton', 'click', function( event ){
			event.preventDefault();
			var order_id = $(this).attr('data-id');
			$('#tableBodyToAppend').fadeOut(300);
			$('#orderTable').fadeOut(300);
			$('#displaySpecificOrder').fadeIn(300);
			$.ajax({
				type : "GET",
				dataType : "json",
				contentType : "application/json",
				url : Util.URL_JAVA + Util.URL_SPECIFIC_ORDER + order_id,
				success: function(result){
					getCustomerName(result.customer_id);
					var dateTime = result.order_date_time;
						dateTime = getDateTime(dateTime[0], dateTime[1], dateTime[2], dateTime[3], dateTime[4], dateTime[5], dateTime[6]);
					var orderDetails = result.order_details;
						
					var htmlToPlace = "<table class=\"table\"><tr><th>Name</th><th>Value</th></tr>";
					
					htmlToPlace += "<tr><td>Order ID</td><td>"+result.order_id+"</td></tr>";
					htmlToPlace += "<tr><td>Customer name</td><td>"+customerName+"</td></tr>";
					htmlToPlace += "<tr><td>Date time</td><td>"+dateTime+"</td></tr>";
					htmlToPlace += "<tr><td>Order received</td><td>"+result.order_delivered+"</td></tr>";
					htmlToPlace += "<tr><td>Order delivered</td><td>"+result.order_received+"</td></tr>";
					htmlToPlace += "<tr><td>Order type</td><td>"+result.order_type+"</td></tr>";
					
					
					for (i = 0; i < orderDetails.length; i++) {
						
						htmlToPlace += "<tr><td>Article name</td><td>"+orderDetails[i].article.article_name+" (Quantity:"+orderDetails[i].quantity+")  </td></tr>";
//						htmlToPlace += "<tr><td>Article quantity</td><td>"+orderDetails[i].quantity+"</td></tr>";
					}
					htmlToPlace += "<tr><td>"
												+ " <button type=\"button\" class=\"orderOveriew\">Order overview</button>"
												+ "<button class=\"deleteOrder\" type=\"button\" data-id=\""
												+ result.order_id
												+ "\">Delete order</button>"
												+ "</td></tr>";
										htmlToPlace += "</table>";
					$( '#displaySpecificOrder' ).html( htmlToPlace );
				}
			})
			
			 
		});
			$('#displaySpecificOrder').delegate('.orderOveriew', 'click',
			function(event) {
				$('#tableBodyToAppend').fadeIn(300);
				$('#orderTable').fadeIn(300);
				$('#displaySpecificOrder').fadeOut(300);
			});
			
			$( '#displaySpecificOrder' ).delegate('.deleteOrder', 'click', function(event){
			event.preventDefault();
			var orderId = $(this).attr('data-id');
			//var closestTRElement = $(this).closest('tr');
			
			
			$.ajax({
				type : "DELETE",
				dataType : "json",
				contentType : "application/json",
				url : Util.URL_JAVA + Util.URL_SPECIFIC_ORDER + orderId ,
			}).then(function(result){
				//closestTRElement.remove();
			});
			
		});
});