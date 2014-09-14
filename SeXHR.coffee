###
=============================================
Author: Ant Cosentino
Date: 2014-07-20
Description: XMLHttpRequest wrapper utility
=============================================
###

class SeXHR
    xhr: new XMLHttpRequest
    req: (args) =>
        opts =
            url: args.url ? null
            method: args.method ? "get"
            json: args.json ? null
            body: args.body ? null
            mime: args.mime ? null
            timeout: args.timeout ? 0
            headers: args.headers ? null
            username: args.username ? null
            password: args.password ? null
            async: args.async ? true
            success: args.success ? null
            error: args.success ? null

        if typeof opts.success is "function"

            if typeof opts.error is "function"
                @xhr.addEventListener "abort", (e) ->
                    console.log "[SeXHR] Request aborted."
                    opts.success(abort: true)
                , false
                @xhr.addEventListener "error", (e) ->
                    console.log "[SeXHR] Request error."
                    opts.error(error: true)
                , false
                @xhr.addEventListener "load", (e) ->
                    console.log "[SeXHR] Request loaded."
                    response =
                        text: @responseText
                        status: @statusCode
                        headers: @getAllResponseHeaders().split "\n"
                    response.json = JSON.parse response.text if opts.json
                    if response.status > 99 and response.status < 400 then opts.success response else opts.error response
                , false
                @xhr.addEventListener "loadstart", (e) ->

                    console.log "[SeXHR] Request initiated."
                , false
                @xhr.addEventListener "progress", (e) ->

                    console.log "[SeXHR] Request progress: #{(e.loaded / e.total) * 100}% (#{e.loaded} bytes / #{e.total} bytes)" if e.lengthComputable
                , false
                @xhr.addEventListener "timeout", (e) ->
                    console.log "[SeXHR] Request timed out."
                    opts.error(timeout: true)
                , false
                @xhr.addEventListener "loadend", (e) ->

                    console.log "[SeXHR] Request completed."
                , false

                if opts.url

                    if opts.username and opts.password
                        @xhr.open opts.method, opts.url, opts.async, opts.username, opts.password
                    else
                        @xhr.open opts.method, opts.url, opts.async

                    if opts.timeout > 0
                        @xhr.timeout = opts.timeout if opts.async

                    @xhr.setRequestHeader key, val for key, val of opts.headers if opts.headers?
                    @xhr.overrideMimeType opts.mime if opts.mime?
                    @xhr.setRequestHeader 'X-Requested-With', 'XMLHttpRequest'
                    @xhr.send opts.body
                else
                    console.error "[SeXHR] Request `url` is undefined."
            else
                console.error "[SeXHR] Request `error` handler is undefined."
        else
            console.error "[SeXHR] Request `success` handler is undefined."
    kill: =>
        @xhr.abort()
@sexhr = SeXHR
