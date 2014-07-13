SeXHR
=====

> "Ajax is way sexy, mang." said everyone, everywhere, always.

This utility is a fork of [Francois Laubscher's](http://djfranzwa.co.za/) nifty [Webservice.js](https://github.com/djfranzwa/Webservice.js), a simple XMLHttpRequest wrapper that eases interactions with all kinds of HTTP services.

SeXHR is a (ninety percent, according to Git) rewritten version of Webservice.js that supports custom HTTP methods and headers, HTTP authentication, automatic JSON response parsing and request timeout.
It was optimised with the [Closure Compiler](https://developers.google.com/closure/compiler/) and is *902 bytes* gzipped or *2.33KB* uncompressed.

#####Browser Support

It should be noted that I haven't spent any time analysing which browsers this library supports. Lazy, I know, but I developed SeXHR with the future in mind. So, if your target browser doesn't support XMLHttpRequest's `addEventListener` interface, then it's likely this won't work.

Usage example:

```html
<script src="SeXHR.min.js"></script>
<script>
    var xhr = new SeXHR();
    //Or `new sexhr();`

    xhr.req({
        url: "http://www.example.com/",
        success: function(res) {
            console.log(res)
        },
        error: function(err) {
            console.error(err)
        }
    });

    xhr.req({
        url: "http://www.example.com/",
        method: "post",
        json: true,
        headers: { "Accept": "application/json" },
        timeout: 5000,
        body: new FormData(document.getElementById("some-form")),
        success: function(res) {
            console.log("parsed response", res.json)
        },
        error: function(err) {
            console.log(err)
        }
    });
</script>
```
