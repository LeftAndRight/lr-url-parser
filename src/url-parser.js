var URLParser = RootClass.extend(
    {
        // PUBLIC PROPERTIES
        /**
         * For URL http://www.google.com:99/section1/home?search=test&nullParam=#/anchor1 the parts are as follows:
         * anchor: /anchor1
         * query: search=test&nullParam=
         * file:
         * directory: /section1/home
         * path: /section1/home
         * relative: /section1/home?search=test&nullParam=#/anchor1
         * port: 99
         * host: www.google.com
         * password:
         * user:
         * userInfo:
         * authority: www.google.com:99
         * protocol: http
         * source: http://www.google.com:99/section1/home?search=test&nullParam=#/anchor1
         * queryKey.search: test
         * queryKey.nullParam:
         */
        anchor		: null,
        query		: null,
        file		: null,
        directory	: null,
        path		: null,
        relative	: null,
        port		: null,
        host		: null,
        password	: null,
        user		: null,
        userInfo	: null,
        authority	: null,
        protocol	: null,
        source		: null,
        queryKey	: null,


        /**
         * Rebuilds a URL from the parts
         * @param includeQuery {Boolean} Defaults to true, if false the query params are excluded
         * @param includeAnchor {Boolean} Defaults to true, if false the anchor is excluded
         * @returns {String}
         */
        rebuild : function(includeQuery, includeAnchor){
            return URLParser.rebuild(this, includeQuery, includeAnchor);
        },

        /**
         * Adds params to the queryKey property
         */
        addParams : function(params){
            for (var propName in params){
                this.queryKey[propName] = params[propName];
            }
            return this;
        }
    },
    {
        /*---------------------------------------------+
        | PUBLIC METHODS					           |
        +---------------------------------------------*/
        /**
         * Parses a URL into an instance of URLParser
         * returns {URLParser}
         */
        parse : function(url, strict) {
            if (strict == null) strict = false;
            var parts	= new URLParser();

            var key 	= ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];
            var	o   	= {
                q: {
                    name	: "queryKey",
                    parser	: /(?:^|&)([^&=]*)=?([^&]*)/g
                },
                parser: {
                    strict	: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose	:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                }
            };
            var m   	= o.parser[strict ? "strict" : "loose"].exec(url);
            var i   	= 14;
            while (i--) parts[key[i]] = m[i] || "";

            parts[o.q.name] = {};
            parts[key[12]].replace(o.q.parser, function ($0, $1, $2) {
                if ($1) parts[o.q.name][$1] = $2;
            });

            return parts;
        },

        /**
         * Rebuilds a URL from the parts
         * @param parts {URLParser} URLParser instance
         * @param includeQuery {Boolean} Defaults to true, if false the query params are excluded
         * @param includeAnchor {Boolean} Defaults to true, if false the anchor is excluded
         * @returns {String}
         */
        rebuild : function(parts, includeQuery, includeAnchor){
            var str	= (parts.protocol) ? parts.protocol + "://" : "";
            str		+= parts.host;
            str		+= parts.port ? ":" + parts.port : "";
            str		+= parts.path ? parts.path : "";
            if (parts.queryKey && (includeQuery == null || includeQuery == true)){
                var joined	= [];
                for (var key in parts.queryKey){
                    joined.push(key + "=" + parts.queryKey[key]);
                }
                if (joined.length > 0){
                    str	+= "?" + joined.join("&");
                }
            }
            if (parts.anchor != "" && (includeAnchor == null || includeAnchor == true)){
                str		+= "#" + parts.anchor;

            }
            return str;
        },

        /**
         * Adds params directly to a URL then returns it
         * @param url {String} The url to append to
         * @param params {Object} The params to add
         * @returns {String}
         */
        addParamsToURL : function(url, params){
            var parts = this.parse(url);
            for (var propName in params) parts.queryKey[propName] = params[propName];
            return this.rebuild(parts);
        },

        getParamsFromURL : function(url){
            var parts 	= this.parse(url);
            var has		= false;
            for (var propName in parts.queryKey) {
                has = true;
                break;
            }
            return has ? parts.queryKey : null;
        }
    }
);