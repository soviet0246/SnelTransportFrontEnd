function generateTabelData(id, name, street, houseNumber, postCode, city,
		phone, fax) {
	var htmlToReturn = "<tr>";
	htmlToReturn += "<td>" + id + "</td>";
	htmlToReturn += "<td>" + name + "</td>";
	htmlToReturn += "<td>" + street + "</td>";
	htmlToReturn += "<td>" + houseNumber + "</td>";
	htmlToReturn += "<td>" + postCode + "</td>";
	htmlToReturn += "<td>" + city + "</td>";
	htmlToReturn += "<td>" + phone + "</td>";
	htmlToReturn += "<td>" + fax + "</td>";
	return htmlToReturn;
}

$(document)
		.ready(
				$
						.ajax({
							type : "GET",
							dataType : "json",
							contentType : "application/json",
							url : "http://localhost:1234/customers/customers",
						})
						.then(
								function(data) {
									var htmlToPlace = "<table id=\"tbl\" border=\"1\" style=\"width: 100%;\"><tr><td>ID</td><td>Name</td><td>Street</td><td>HouseNumber</td><td>PostCode</td><td>City</td><td>Telephone</td><td>Fax</td></tr>";

									Object
											.keys(data)
											.forEach(
													function(key) {
														htmlToPlace += generateTabelData(
																data[key].customer_id,
																data[key].customer_name,
																data[key].customer_street,
																data[key].customer_housenumber,
																data[key].customer_postcode,
																data[key].customer_city,
																data[key].customer_tel_number,
																data[key].customer_fax_number);
													});

									htmlToPlace += "</table>";

									$("#tableDiv").html(htmlToPlace);
								}));