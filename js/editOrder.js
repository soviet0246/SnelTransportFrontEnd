$(function() {
	var customerName;
	var articleSelectHTML;
	var selectedOrder;
	
	function generateAriclesSelectPreSelected(idOfSelected){
		var select = false;
		$
		.ajax({
			async : false,
			type : "GET",
			dataType : "json",
			contentType : "application/json",
			url : "http://localhost:1234/articles/articles",
		})
		.then(
				function(data) {
					var select;
					var htmlToPlace = "<label for=\"article_id\">Artikel:</label>";
					htmlToPlace += "<select class=\"article_id\" name=\"article_id\" form=\"addOrder\" id=\""+idOfSelected+"\">";

					Object
							.keys(data)
							.forEach(
									function(key) {
										
										
										if(data[key].article_id == idOfSelected){
											console.log(" Linenumber 30");
											select = true;
										} else {
											select = false;
										}
										console.log(" Linenumber 34: " + generatesSelectOption(
												data[key].selected,
												data[key].article_name,
												select));

										htmlToPlace += generatesSelectOption(
												data[key].article_id,
												data[key].article_name,
												select);
									});

					htmlToPlace += "</select>";
					articleSelectHTML = htmlToPlace;
				});
		
	}
	
	function generatesSelectOption(value, textToDislpay , selected) {
		if(selected == false){
			return "<option value=\"" + value + "\">" + textToDislpay + "</option>";
		} else {
			console.log("editOrder 77: " +  selected);
			return "<option value=\"" + value + "\" >" + textToDislpay + "</option>";
		}
		
	};
	
	function fillCustomersTableRow(customer, dateAndTime, delivered, received,
			type, orderId) {
		return "<tr><td>"
				+ customer
				+ "</td><td>"
				+ dateAndTime
				+ "</td><td>"
				+ delivered
				+ "</td><td>"
				+ received
				+ "</td><td>"
				+ type
				+ "</td><td><button class=\"addOrderNewArticleButton\" type=\"button\" data-id=\""
				+ orderId + "\">Edit order</button></td></tr>";
	}
	;

	function callback(response) {
		customerName = response;
		// use return_first variable here
	};
	
	function callbackSelectedOrder(response) {
		selectedOrder = response;
		// use return_first variable here
	};

	function getDateTime(year, month, date, hours, minutes, seconds,
			miliseconds) {
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

	function getCustomerName(customerID) {
		$.ajax({
			async : false,
			type : "GET",
			dataType : "json",
			contentType : "application/json",
			url : "http://localhost:1234/customers/customer/" + customerID,
			success : function(result) {
				callback(result["customer_name"]);
			}
		});
	};
	
	function getSelectedOrder(orderID) {
		$.ajax({
			async : false,
			type : "GET",
			dataType : "json",
			contentType : "application/json",
			url : "http://localhost:1234/orders/order/" + orderID,
			success : function(result) {
				callbackSelectedOrder(result);
			}
		});
	};

	$.ajax({
		async : false,
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		url : "http://localhost:1234/orders/orders",
	}).then(
			function(data) {
				Object.keys(data).forEach(
						function(key) {

							getCustomerName(data[key].customer_id);
							var dateTime = getDateTime(
									data[key].order_date_time[0],
									data[key].order_date_time[1],
									data[key].order_date_time[2],
									data[key].order_date_time[3],
									data[key].order_date_time[4],
									data[key].order_date_time[5],
									data[key].order_date_time[6]);
							$("#tableBodyToAppend").append(
									fillCustomersTableRow(customerName,
											dateTime,
											data[key].order_delivered,
											data[key].order_received,
											data[key].order_type,
											data[key].order_id));
						});
			});
	
	function getFilledInOrderDetailFormPart (quantity, articleID){
		generateAriclesSelectPreSelected(articleID);
		return "<div class=\"form-group\">"+articleSelectHTML+"<label for=\"quantityArticle\">Quantitijd van besteld Artikel:</label> <input type=\"number\" class=\"quantityArticle\" id=\"quantityArticle\" value=\""+quantity+"\"> <br></div>";
	};
	
	$( '#tableBodyToAppend' ).delegate('.addOrderNewArticleButton', 'click', function(event){
		event.preventDefault();
		var orderId = $(this).attr('data-id');
		var closestTRElement = $(this).closest('tr');
		var htmlForm = $('#FormTemplate').html();	
		
		//#QUATRO
		
		$('#contentDiv').html(htmlForm);
//		$('#articlePlaceHolder').html(articleSelectHTML);
		
		getSelectedOrder(orderId);
		getCustomerName(selectedOrder["customer_id"]);
		$('#customerPlaceHolder').html('<h2>'+customerName+'</h2>');
		
		$.each( selectedOrder.order_details, function( key, value ) {
			  var tmpHtml = getFilledInOrderDetailFormPart(value.quantity, value.article.article_id);
			  $('#articlePlaceHolder').append(tmpHtml);
			  
			});
		
		
		
	});
	
	
});