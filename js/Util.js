/*globals Util */

function Util () {}
Util.URL_JAVA = "http://172.16.1.171:8080/sneltransport/";
Util.URL_CSHARP = "http://172.16.1.186/Service_Database_Connection/Service.svc/rest/" ;
Util.URL_ALL_ARTICLES = "/articles/articles"
Util.URL_ALL_ORDERS = "orders/orders";
Util.URL_SPECIFIC_ORDER = "orders/order/";
Util.URL_ADD_ORDER = "/orders/order/add";
Util.URL_ALL_CUSTOMERS = "customers/customers";
Util.URL_SPECIFIC_CUSTOMER = "customers/customer/";
Util.URL_OPTIMAL_ROUTE_GET = "GetOptimal";
Util.SHOW_STATUS = function statusToShow(status) {
	var stringToReturn = "Not delivered";

	if (status == true) {
		stringToReturn = "Delivered";
	}

	return stringToReturn;
}