SeXHR
=====

Ajax is way sexy, mang.

This is a fork of [Francois Laubscher's](http://djfranzwa.co.za/) nifty [Webservice.js](https://github.com/djfranzwa/Webservice.js), a simple XMLHttpRequest wrapper that eases interactions with all kinds of HTTP services.

SeXHR was optimised with the [Closure Compiler](https://developers.google.com/closure/compiler/) and is 855 bytes gzipped or 2.28KB uncompressed.

Example usage:

```html
<script src="SeXHR.min.js"></script>
<script>
    var xhr = new SeXHR();
    //Or `new sexhr();`

    xhr.request({
        url: "http://www.example.com/",
        success: function(res) {
            console.log(res)
        },
        error: function(err) {
            console.error(err)
        }
    });

    xhr.request({
        url: "http://www.example.com/",
        method: "post",
        json: true,
        headers: { "Accept": "application/json" },
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
