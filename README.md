WebService.js
=============

This is a fork of [Francois Laubscher's](http://djfranzwa.co.za/) nifty [Webservice.js](https://github.com/djfranzwa/Webservice.js), a simple XMLHttpRequest wrapper that eases interactions with all kinds of HTTP services.

Example usage:

```html
<script src="WebService.js"></script>
<script>
    var ws = new WebService();

    ws.request({
        url: "http://www.example.com/",
        success: function(res) {
            console.log(res)
        },
        error: function(err) {
            console.error(err)
        }
    });

    ws.request({
        url: "http://www.example.com/",
        method: "post",
        json: true,
        headers: { 'Accept': 'application/json' },
        timeout: 5000,
        body: new FormData(document.getElementById("create-form")),
        success: function(res) {
        	console.log("parsed response", res.json)
        },
        error: function(err) {
            console.log(err)
        }
    });
</script>
```