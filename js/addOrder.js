var customerSelectHTML;
var articleSelectHTML;
var orderDetailsToRepeat = "<div class=\"form-group\"><label for=\"quantityArticle\">Quantitijd van besteld Artikel:</label> <input type=\"number\" class=\"quantityArticle\" id=\"quantityArticle\"> <br></div>";

function generatesSelectOption(value, textToDislpay) {
	return "<option value=\"" + value + "\">" + textToDislpay + "</option>";
}
$(document)
		.ready(
				$('#dateOrder').attr('value',
						new Date().toISOString().substring(0, 16)),
				$
						.ajax({
							type : "GET",
							dataType : "json",
							contentType : "application/json",
							url : Util.URL_JAVA + Util.URL_ALL_ARTICLES,
						})
						.then(
								function(data) {
									var htmlToPlace = "<label for=\"article_id\">Artikel:</label>";
									htmlToPlace += "<select class=\"article_id\" name=\"article_id\" form=\"addOrder\" id=\"article_id\">";

									Object
											.keys(data)
											.forEach(
													function(key) {
														htmlToPlace += generatesSelectOption(
																data[key].article_id,
																data[key].article_name);
													});

									htmlToPlace += "</select>";
									articleSelectHTML = htmlToPlace;
									$("#articlePlaceHolder").html(htmlToPlace);
								}),

				$
						.ajax({
							type : "GET",
							dataType : "json",
							contentType : "application/json",
							url : Util.URL_JAVA + Util.URL_ALL_CUSTOMERS,
						})
						.then(
								function(data) {
									var htmlToPlace = "<label for=\"customerId\">Customer:</label>";
									htmlToPlace += "<select class=\"customerID\" name=\"customerId\" form=\"addOrder\" id=\"customerId\">";

									Object
											.keys(data)
											.forEach(
													function(key) {
														htmlToPlace += generatesSelectOption(
																data[key].customer_id,
																data[key].customer_name);
													});

									htmlToPlace += "</select>";
									customerSelectHTML = htmlToPlace;
									$("#customerPlaceHolder").html(htmlToPlace);
									$("orderDetailsToRepeat").html()
								}),

				$('#addOrderSubmitButton')
						.on(
								'click',
								function(event) {
									event.preventDefault();
									var articleIds = [];
									var articleNames = [];
									var quantities = [];
									var orderDetailsJsonTemporary = [];
									var jsonObject = {};

									$(".article_id")
											.each(
													function(i) {
														articleIds
																.push($(
																		"option:selected",
																		this)
																		.val());
														articleNames
																.push($(
																		"option:selected",
																		this)
																		.text());
													});

									$(".quantityArticle").each(function(i) {
										quantities.push($(this).val());
									});

									var dateTime = new Date($("#dateOrder")
											.val());
									jsonObject.order_id = null;
									jsonObject.customer_id = $("#customerId")
											.val();
									jsonObject.order_type = $("#orderType")
											.val();
									jsonObject.order_date_time = [
											dateTime.getFullYear(),
											// dateTime.getMonth(),
											1, 
											dateTime.getDate(),
											dateTime.getHours(),
											dateTime.getMinutes(),
											dateTime.getSeconds(),
											dateTime.getMilliseconds() ];
									jsonObject.order_received = false;
									jsonObject.order_delivered = false;

									var tmpOrderDetailArray = [];

									for (i = 0; i < articleIds.length; i++) {
										var tmpOrderDetailObject = {};
										tmpOrderDetailObject.order = null;
										tmpOrderDetailObject.article = {
											articleType : null,
											article_id : articleIds[i],
											article_name : articleNames[i],
											article_price : 101.45,
											article_color : "GEEN"
										};
												tmpOrderDetailObject.quantity = quantities[i],
												tmpOrderDetailObject.order_detail_id = null

										tmpOrderDetailArray
												.push(tmpOrderDetailObject);
									}
									jsonObject.order_details = tmpOrderDetailArray;

									var jsonData = JSON.stringify(jsonObject);
									$
											.ajax(
													{
														type : "POST",
														dataType : "json",
														contentType : "application/json",
														url : Util.URL_JAVA
																+ Util.URL_ADD_ORDER,
														data : jsonData

													}).then(function(data) {
											});

								}),

				$('#addOrderNewArticleButton').on(
						'click',
						function(event) {
							event.preventDefault();
							$("#orderDetailsToRepeat").append(
									articleSelectHTML + orderDetailsToRepeat);
							console.log(articleSelectHTML);
							console.log(orderDetailsToRepeat);

						}));