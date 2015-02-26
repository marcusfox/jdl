// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
	var pluginName = "jPaginator",
                    defaults = {
                        method: 'ajax',                                             // ajax|other
                        ajaxObj: {
                            type: 'GET',                                        // POST|GET|PUT|DELETE
                            url: '',                                           // *
                            contentType: 'application/json; charset=utf-8',            // *
                            dataType: 'json',                                       // *
                            async: true,                                         // true|false
                            success: function (s) { console.log('success', s); },  // custom handler
                            error: function (e) { console.log('error', e); }     // custom handler
                        },
                        mappings: undefined,
                        autoLoad: true,
                        pageSize: 10
                    },
                    pageMin = 0,
                    pageMax = 10,
                    cached = {}
		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
		    // future instances of the plugin
				this.settings = $.extend({}, defaults, options);
				this.settings.ajaxObj = $.extend({}, defaults.ajaxObj, options.ajaxObj);
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
				    // call them like so: this.yourOtherFunction(this.element, this.settings).
				    if (this.settings.autoLoad) {
				        this.load();
				    }
				},
				load: function () {
				    // some logic
				    var ao = this.settings.ajaxObj;
				    ao.context = this;
				    if (cached[ao.url]) {
				        this.display(cached[ao.url]);
				    } else {
				        ao.success = function (data) {
				            cached[ao.url] = data;
				            this.display(data)
				        };
				        $.ajax(ao);
				    }
				},
				display: function (datas) {
				    console.log(this, cached);
				    var cnt = 0;
				    var rowTemplate = "<tr>";
				    for (var c in datas[0]) {
				        rowTemplate += "<td>{" + cnt + "}</td>";
				        cnt++;
				    }
				    rowTemplate += "</tr>";
				    var plugin = this;
				    var mappings = this.settings.mappings;
				    $(plugin.element).find('tbody tr').remove();
				    $.each(datas, function (i, data) {
				        if (i >= pageMin && i < pageMax) {
				            var row = rowTemplate;
				            for (var x in data) {
				                var cellIndex = 0;
				                if (mappings) {
				                    var index = $(plugin.element).find('th').filter(function () { return $(this).text() == mappings[x]; }).index();
				                    //console.log("Replacing {" + index + "} with '" + data[x] + "'.");
				                    row = row.replace("{" + index + "}", data[x]);
				                } else {
				                    row = row.replace("{" + cellIndex + "}", data[x]);
				                    cellIndex++;
				                }
				            }
				            $(plugin.element).append(row);
				        }
				    });
				    if (pageMin > 0 || pageMax < datas.length) {
				        var row = "<tr>";

				        if (pageMin > 0) {
				            row += "<td><button type='button' class='prevBtn btn btn-info pull-left'>Prev</button></td>";
				        } else {
				            row += "<td></td>";
				        }

				        row += "<td class='text-center'>Showing " + (pageMin+1) + " - " + pageMax + " of " + datas.length + "</td>";

				        if (pageMax < datas.length) {
				            row += "<td><button type='button' class='nextBtn btn btn-info pull-right'>Next</button></td>";
				        } else {
				            row += "<td></td>";
				        }

				        row += "</tr>";
				        $(plugin.element).append(row);

				        $(plugin.element).find('.nextBtn').bind('click', {plugin: this}, this.nextPage);
				        $(plugin.element).find('.prevBtn').bind('click', {plugin: this}, this.prevPage);
				    }
				},
				nextPage: function (e) {
				    e.preventDefault();
				    pageMin += e.data.plugin.settings.pageSize;
				    pageMax += e.data.plugin.settings.pageSize;
				    e.data.plugin.load();
				},
				prevPage: function (e) {
				    e.preventDefault();
		            pageMin -= e.data.plugin.settings.pageSize;
		            pageMax -= e.data.plugin.settings.pageSize;
		            e.data.plugin.load();
		        }
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
