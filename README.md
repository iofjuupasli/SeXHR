SeXHR
=====

> "Ajax is way sexy, mang." said everyone, everywhere, always.

SeXHR is a pretty-damn-small XMLHttpRequest wrapper that supports custom HTTP methods and headers, HTTP authentication, automatic JSON response parsing and request timeout.

#####Browser Support

It should be noted that I haven't spent any time analysing which browsers this library supports. Lazy, I know. Sue me :P. So, if your target browser doesn't support XMLHttpRequest's `addEventListener` interface, then it's likely this won't work.

#####Usage example:

```html
<script src="sexhr.min.js"></script>
<script>
    var xhr = new sexhr;

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
            console.error(err)
        }
    });
</script>
```

#####Contributors
[Ant Cosentino](http://antino.co.za/)
[Francois Laubscher](http://djfranzwa.co.za/)
[ushis](http://ushi.wurstcase.net/)
