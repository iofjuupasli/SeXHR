Webservice.js
=============

A simple Web service wrapper library.

I got kind of tired relying on JQuery all the time to make any HTTP requests using JavaScript. I decided to build this tiny, simple JavaScript library which can be used to call Web services using HTTP GET or HTTP POST.

It probably sucks, but it works. :D

Want to know how to use it? Pretty simple, check.

	function Test_GET(){
		var webService = new WebService("<url_goes_here>");

		webService.httpGET(function (result) {
			alert(result);
		}, function (error){
			alert(error);
		});
	}
	
	function Test_POST(){
		var webService = new WebService("<url_goes_here>");
		var object = { FirstName: 'Foo', LastName: 'Bar' };

		webService.httpPOST(JSON.stringify(object), function (result) {
			alert(result);
		}, function (error){
			alert(error);
		});
	}
