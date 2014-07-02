// =============================================
// Author: Ant Cosentino
// Date: 2014-07-02
// Description: XMLHttpRequest wrapper utility
// =============================================

(function(win) {
    function SeXHR() {

        var self = this;

        self.xhr = new XMLHttpRequest();

        self.request = function request(options) {

            var args = {
                url: (options.hasOwnProperty("url")) ? options.url : "",
                method: (options.hasOwnProperty("method")) ? options.method : "get",
                json: (options.hasOwnProperty("json")) ? options.json : false,
                body: (options.hasOwnProperty("body")) ? options.body : null,
                timeout: (options.hasOwnProperty("timeout")) ? options.timeout : 0,
                headers: (options.hasOwnProperty("headers")) ? options.headers : undefined,
                username: (options.hasOwnProperty("username")) ? options.username : "",
                password: (options.hasOwnProperty("password")) ? options.password : "",
                async: (!options.hasOwnProperty("async")) ? true : options.async,
                success: (options.hasOwnProperty("success")) ? options.success : undefined,
                error: (options.hasOwnProperty("error")) ? options.error : undefined
            };

            if (typeof args.success === "function") {

                if (typeof args.error === "function") {

                    self.xhr.addEventListener(
                        "abort",
                        function(e) {
                            console.log("[SeXHR]: Request aborted");
                            args.success({
                                aborted: true
                            });
                        },
                        false
                    );

                    self.xhr.addEventListener(
                        "error",
                        function(e) {
                            console.error("[SeXHR]: Request error");
                            args.error({
                                error: true
                            });
                        },
                        false
                    );

                    self.xhr.addEventListener(
                        "load",
                        function(e) {
                            var response = {
                                text: self.xhr.responseText,
                                status: self.xhr.status
                            };

                            if (args.json) {
                                response.json = JSON.parse(self.xhr.responseText);
                            }

                            console.log("[SeXHR]: Request loaded");

                            if (response.status > 100 && response.status < 400) {
                                args.success(response);
                            } else {
                                args.error(response);
                            }
                        },
                        false
                    );

                    self.xhr.addEventListener(
                        "loadstart",
                        function(e) {
                            console.log("[SeXHR]: Request initiated");
                        },
                        false
                    );

                    self.xhr.addEventListener(
                        "progress",
                        function(e) {
                            var percentage;
                            if (e.lengthComputable) {
                                percentage = (e.loaded / e.total) * 100;
                                console.log("[SeXHR]: Request progress " + percentage + "% (" + e.loaded + " bytes / " + e.total + " bytes)");
                            }
                        },
                        false
                    );

                    self.xhr.addEventListener(
                        "timeout",
                        function(e) {
                            console.log("[SeXHR]: Request timed out");
                            args.error({
                                timeout: true
                            });
                        },
                        false
                    );

                    self.xhr.addEventListener(
                        "loadend",
                        function(e) {
                            console.log("[SeXHR]: Request complete");
                        },
                        false
                    );

                    if (args.url !== "") {

                        if (args.username && args.password) {
                            self.xhr.open(args.method, args.url, args.async, args.username, args.password);
                        } else {
                            self.xhr.open(args.method, args.url, args.async);
                        }

                        if (args.headers) {
                            var headers = Object.keys(args.headers);

                            for (var header in headers) {
                                self.xhr.setRequestHeader(headers[header], args.headers[headers[header]]);
                            }
                        }

                        if (args.timeout > 0 && args.async === true) {
                            self.xhr.timeout = args.timeout;
                        }

                        self.xhr.send(args.body);
                    } else {
                        console.error("[SeXHR]: No request URL given");
                    }
                } else {
                    console.error("[SeXHR]: No request `error` handler given");
                }
            } else {
                console.error("[SeXHR]: No request `success` handler given");
            }
        };

        self.abort = function abort(args) {
            if (args.length === 1 && typeof args[0] === "number") {
                window.setTimeout(self.xhr.abort(), args[0]);
            } else {
                self.xhr.abort();
            }
        };
    }

    SeXHR.prototype.request = function request(options) {
        this.request(options);
    };

    SeXHR.prototype.cancel = function cancel() {
        this.abort(arguments);
    };
    win.SeXHR = SeXHR;
    win.sexhr = SeXHR;
})(window);
