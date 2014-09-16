// Generated by CoffeeScript 1.8.0

/*
=============================================
Author: Ant Cosentino
Date: 2014-07-20
Description: XMLHttpRequest wrapper utility
=============================================
 */

(function() {
  var SeXHR,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  SeXHR = (function() {
    function SeXHR() {
      this.kill = __bind(this.kill, this);
      this.req = __bind(this.req, this);
    }

    SeXHR.prototype.xhr = new XMLHttpRequest;

    SeXHR.prototype.req = function(args) {
      var key, opts, val, _ref, _ref1, _ref10, _ref11, _ref12, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      opts = {
        url: (_ref = args.url) != null ? _ref : null,
        method: (_ref1 = args.method) != null ? _ref1 : "get",
        json: (_ref2 = args.json) != null ? _ref2 : null,
        body: (_ref3 = args.body) != null ? _ref3 : null,
        mime: (_ref4 = args.mime) != null ? _ref4 : null,
        timeout: (_ref5 = args.timeout) != null ? _ref5 : 0,
        headers: (_ref6 = args.headers) != null ? _ref6 : null,
        username: (_ref7 = args.username) != null ? _ref7 : null,
        password: (_ref8 = args.password) != null ? _ref8 : null,
        async: (_ref9 = args.async) != null ? _ref9 : true,
        success: (_ref10 = args.success) != null ? _ref10 : null,
        error: (_ref11 = args.success) != null ? _ref11 : null
      };
      if (typeof opts.success === "function") {
        if (typeof opts.error === "function") {
          this.xhr.addEventListener("abort", function(e) {
            console.log("[SeXHR] Request aborted.");
            return opts.success({
              abort: true
            });
          }, false);
          this.xhr.addEventListener("error", function(e) {
            console.log("[SeXHR] Request error.");
            return opts.error({
              error: true
            });
          }, false);
          this.xhr.addEventListener("load", function(e) {
            var response;
            console.log("[SeXHR] Request loaded.");
            response = {
              text: this.responseText,
              status: this.statusCode,
              headers: this.getAllResponseHeaders().split("\n")
            };
            if (opts.json) {
              response.json = JSON.parse(response.text);
            }
            if (response.status > 99 && response.status < 400) {
              return opts.success(response);
            } else {
              return opts.error(response);
            }
          }, false);
          this.xhr.addEventListener("loadstart", function(e) {
            return console.log("[SeXHR] Request initiated.");
          }, false);
          this.xhr.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
              return console.log("[SeXHR] Request progress: " + ((e.loaded / e.total) * 100) + "% (" + e.loaded + " bytes / " + e.total + " bytes)");
            }
          }, false);
          this.xhr.addEventListener("timeout", function(e) {
            console.log("[SeXHR] Request timed out.");
            return opts.error({
              timeout: true
            });
          }, false);
          this.xhr.addEventListener("loadend", function(e) {
            return console.log("[SeXHR] Request completed.");
          }, false);
          if (opts.url) {
            if (opts.username && opts.password) {
              this.xhr.open(opts.method, opts.url, opts.async, opts.username, opts.password);
            } else {
              this.xhr.open(opts.method, opts.url, opts.async);
            }
            if (opts.timeout > 0) {
              if (opts.async) {
                this.xhr.timeout = opts.timeout;
              }
            }
            if (opts.headers != null) {
              _ref12 = opts.headers;
              for (key in _ref12) {
                val = _ref12[key];
                this.xhr.setRequestHeader(key, val);
              }
            }
            if (opts.mime != null) {
              this.xhr.overrideMimeType(opts.mime);
            }
            this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            return this.xhr.send(opts.body);
          } else {
            return console.error("[SeXHR] Request `url` is undefined.");
          }
        } else {
          return console.error("[SeXHR] Request `error` handler is undefined.");
        }
      } else {
        return console.error("[SeXHR] Request `success` handler is undefined.");
      }
    };

    SeXHR.prototype.kill = function() {
      return this.xhr.abort();
    };

    return SeXHR;

  })();

  this.sexhr = SeXHR;

}).call(this);
