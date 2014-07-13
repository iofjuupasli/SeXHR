// =============================================
// Author: Ant Cosentino
// Date: 2014-07-02
// Description: XMLHttpRequest wrapper utility
// =============================================

(function(win) {
    function SeXHR() {

        var self = this,
            xhr = new XMLHttpRequest;

        self.req = function req(args) {
            var opts = {
                url: (args.hasOwnProperty("url")) ? args.url : "",
                method: (args.hasOwnProperty("method")) ? args.method : "get",
                json: (args.hasOwnProperty("json")) ? args.json : false,
                body: (args.hasOwnProperty("body")) ? args.body : null,
                mime: (args.hasOwnProperty("mime")) ? args.mime : "",
                timeout: (args.hasOwnProperty("timeout")) ? args.timeout : 0,
                headers: (args.hasOwnProperty("headers")) ? args.headers : undefined,
                username: (args.hasOwnProperty("username")) ? args.username : "",
                password: (args.hasOwnProperty("password")) ? args.password : "",
                async: (!args.hasOwnProperty("async")) ? true : args.async,
                success: (args.hasOwnProperty("success")) ? args.success : undefined,
                error: (args.hasOwnProperty("error")) ? args.error : undefined
            };

            if (typeof opts.success === "function") {

                if (typeof opts.error === "function") {
                    xhr.addEventListener(
                        "abort",
                        function(e) {
                            console.log("[SeXHR]: Request aborted");
                            opts.success({ abort: true });
                        },
                        false
                    );
                    xhr.addEventListener(
                        "error",
                        function(e) {
                            console.error("[SeXHR]: Request error");
                            opts.error({ error: true });
                        },
                        false
                    );
                    xhr.addEventListener(
                        "load",
                        function(e) {
                            console.log("[SeXHR]: Request loaded");
                            var response = {
                                text: xhr.responseText,
                                status: xhr.status,
                                headers: xhr.getAllResponseHeaders().split("\n")
                            };

                            if (response.status > 100 && response.status < 400) {

                                if (opts.json) {
                                    response.json = JSON.parse(response.text);
                                }
                                opts.success(response);
                            } else {
                                opts.error(response);
                            }
                        },
                        false
                    );
                    xhr.addEventListener(
                        "loadstart",
                        function(e) {
                            console.log("[SeXHR]: Request initiated");
                        },
                        false
                    );
                    xhr.addEventListener(
                        "progress",
                        function(e) {
                            if (e.lengthComputable) {
                                console.log("[SeXHR]: Request progress " + ((e.loaded / e.total) * 100) + "% (" + e.loaded + " bytes / " + e.total + " bytes)");
                            }
                        },
                        false
                    );
                    xhr.addEventListener(
                        "timeout",
                        function(e) {
                            console.log("[SeXHR]: Request timed out");
                            opts.error({ timeout: true });
                        },
                        false
                    );
                    xhr.addEventListener(
                        "loadend",
                        function(e) {
                            console.log("[SeXHR]: Request completed");
                        },
                        false
                    );

                    if (opts.url !== "") {

                        if (opts.username && opts.password) {
                            xhr.open(opts.method, opts.url, opts.async, opts.username, opts.password);
                        } else {
                            xhr.open(opts.method, opts.url, opts.async);
                        }

                        if (opts.headers) {
                            var headers = Object.keys(opts.headers);

                            for (var header in headers) {
                                xhr.setRequestHeader(headers[header], opts.headers[headers[header]]);
                            }
                        }

                        if (opts.mime !== "") {
                            xhr.overrideMimeType(opts.mime);
                        }

                        if (opts.timeout > 0) {

                            if (opts.async === true) {
                                xhr.timeout = opts.timeout;
                            } else {
                                console.error("[SeXHR]: In accordance with the XMLHttpRequest specification, a timeout duration can only be specified for asynchronous requests.");
                            }
                        }
                        xhr.send(opts.body);
                    } else {
                        console.error("[SeXHR]: No request URL given");
                    }
                } else {
                    console.error("[SeXHR]: No request `error` handler given");
                }
            } else {
                console.error("[SeXHR]: No request `success` handler given");
            }
        },
        self.kill = function kill() {

            xhr.abort();
        },
        self.request = self.req,
        self.cancel = self.kill;
    }
    win.SeXHR = SeXHR;
    win.sexhr = SeXHR;
})(window);
