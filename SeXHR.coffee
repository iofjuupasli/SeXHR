###
=============================================
Author: Ant Cosentino
Date: 2014-09-25
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
            done: args.done ? null

        if typeof opts.done is "function"
            @xhr.addEventListener "abort", (e) ->
                console.log "[SeXHR] Request aborted."
                opts.done null, { abort: true }
            , false
            @xhr.addEventListener "error", (e) ->
                console.log "[SeXHR] Request error."
                opts.done { error: true }, null
            , false
            @xhr.addEventListener "load", (e) ->
                console.log "[SeXHR] Request loaded."
                response =
                    text: @responseText
                    status: @statusCode
                    headers: @getAllResponseHeaders().split "\n"
                response.json = JSON.parse response.text if opts.json
                opts.done null, response
            , false
            @xhr.addEventListener "loadstart", (e) ->

                console.log "[SeXHR] Request initiated."
            , false
            @xhr.addEventListener "progress", (e) ->

                console.log "[SeXHR] Request progress: #{(e.loaded / e.total) * 100}% (#{e.loaded} bytes / #{e.total} bytes)" if e.lengthComputable
            , false
            @xhr.addEventListener "timeout", (e) ->
                console.log "[SeXHR] Request timed out."
                opts.done { timeout: true }, null
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
                throw "[SeXHR] Request `url` is undefined."
        else
            throw "[SeXHR] Request `done` or `success` and `error` handlers have not been defined."
    kill: =>
        @xhr.abort()
@sexhr = SeXHR
