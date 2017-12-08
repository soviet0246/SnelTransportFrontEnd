function generatesSelectOption(value, textToDislpay) {
	return "<option value=\"" + value + "\">" + textToDislpay + "</option>";
}
$(document)
		.ready(
				$("#addOrderSubmitButton").on('click', function(event) {
							event.preventDefault();
							console.log("Hello World");
							var dateTime = new Date($("#dateOrder").val());
							var jsonData = {
								customer_id : $("#customerId").val(),
								order_type : $("#orderType").val(),

								dateAndTimeOrderMade : [
										dateTime.getFullYear(),
										dateTime.getMonth(),
										dateTime.getDate(),
										dateTime.getHours(),
										dateTime.getMinutes(),
										dateTime.getSeconds(),
										dateTime.getMilliseconds() ],
								orderReceived : false,
								orderDelivered : false
							};
							jsonData = JSON.stringify(jsonData);
							console.log(jsonData);
							$.ajax({
								type : "POST",
								dataType : "json",
								contentType : "application/json",
								url : "http://localhost:1234/orders/order/add",
								data : jsonData

							}).then(function(data) {
								console.log(jsonData);
							});

						}),

				$
						.ajax({
							type : "GET",
							dataType : "json",
							contentType : "application/json",
							url : "http://localhost:1234/articles/articles",
						})
						.then(
								function(data) {
									var htmlToPlace = "<label for=\"article_id\">Artikel:</label>";
									htmlToPlace += "<select name=\"article_id\" form=\"addOrder\" id=\"article_id\">";

									Object
											.keys(data)
											.forEach(
													function(key) {
														htmlToPlace += generatesSelectOption(
																data[key].article_id,
																data[key].article_name);
													});

									htmlToPlace += "</select>";
									$("#articlePlaceHolder").html(htmlToPlace);
								}),

				$
						.ajax({
							type : "GET",
							dataType : "json",
							contentType : "application/json",
							url : "http://localhost:1234/customers/customers",
						})
						.then(
								function(data) {
									var htmlToPlace = "<label for=\"customerId\">Customer:</label>";
									htmlToPlace += "<select name=\"customerId\" form=\"addOrder\" id=\"customerId\">";

									Object
											.keys(data)
											.forEach(
													function(key) {
														htmlToPlace += generatesSelectOption(
																data[key].customer_id,
																data[key].customer_name);
													});

									htmlToPlace += "</select>";
									$("#customerPlaceHolder").html(htmlToPlace);
								}));