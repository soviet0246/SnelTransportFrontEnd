$(document).ready(
		function() {
			$("#addOrderSubmitButton").click(
					function(event) {
						event.preventDefault();
						var dateTime = new Date($("#dateOrder").val());
						var jsonData = {
							customer_id : $("#customerId").val(),
							order_type : $("#orderType").val(),

							dateAndTimeOrderMade : [ dateTime.getFullYear(),
									dateTime.getMonth(), dateTime.getDate(),
									dateTime.getHours(), dateTime.getMinutes(),
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

					});

		});