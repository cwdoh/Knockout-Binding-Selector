// KO Binding Selector - Knockout.js plugin 
//
// Author : Changwook Doh - changwook.doh@gmail.com
//
// this module write for binding-overloading of knockout.js
// 	In case of jQuery Mobile Widget, they have api name as built-in binding name.
//	This module provide selector of binding by custom-condition.
//
// This module is tested with ...
//	Knockout JavaScript library v2.1.0rc2
//	(c) Steven Sanderson - http://knockoutjs.com/
//	License: MIT (http://www.opensource.org/licenses/mit-license.php)
//
// CAUTION :
//	1. this code should be loaded after knockout.js. so, insert this script after knockout.js included.
//	2. if you don't set condition, default binding handler will be changed to new one.
//	3. if there's exist matched binding handler and no matched function called, handler-call will be ignored.
//
(function() {
	var _BindingSelectorModule = function() {
		var thiz = this;
		var waitQueue = [];
		
		// check knockout initialized.
		var isKoInitialized = function() {
			// cwdoh: need better solution.
			if (typeof ko !== "undefined" && ko.bindingHandlers) return true;
			return false;
		};
		
		// binding selector
		var bindingSelector = function() {
			// { condition, handler }, ...
			var map = [];
			var defaultHandler = function() {};
			
			var applyBinding = function()
			{
				var params = Array.prototype.slice.call(arguments);
				// get '1st param', callback
				var callback = params.pop();
				
				// search handler that approve condition.
				for ( key in map ) {
					// condition must be 'function' only.
					var condition = map[key].condition;
					if ( typeof condition == "function" ) {
						// if condition check is passed...
						if ( condition.apply( null, params ) ) {
							// get handler
							var handler = map[key].handler;
							
							// if callback exists- 'init' or 'update', call it.
							if ( callback in handler )
								handler[callback].apply( null, params );
						
							return;
						}
					}
				}
				
				// if no handler, call default handler
				if ( callback in defaultHandler )
					defaultHandler[callback].apply( null, params );
			};
			
			return {
				"init": function() {
					var params = Array.prototype.slice.call(arguments);
					params.push("init");
					
					applyBinding.apply(null, params);
				},
				
				"update": function() {
					var params = Array.prototype.slice.call(arguments);
					params.push("update");
				
					applyBinding.apply(null, params);
				},
				
				"add": function( handler, condition ) {
					if ( condition ) {
						// add new binding handler with its condition
						map.push( { "condition": condition, "handler":handler } );
					}
					else {
						// set default handler
						defaultHandler = handler;
					}
				}
			};
		};
		
		// add binding
		var addBindingHandler = function( binding, handler, condition ) {
			// cwdoh;  makes selector for binding-overloading.
			var _addBindingHandler = function(binding, handler, condition) {
				var _bindingHandler = ko.bindingHandlers[binding];
				var _hasSelector = _bindingHandler && _bindingHandler instanceof bindingSelector;
				var _selector = null;
				
				// if 'binding' is not exists,
				if ( !_bindingHandler ) {
					// create new selector
					_selector = new bindingSelector();
				}
				// elif there's no selector
				else if ( _hasSelector == false ) {
					// create new selector
					_selector = new bindingSelector();
					// add default handler
					_selector.add( _bindingHandler, null );										
				}
				// in other cases
				else {
					// get selector
					_selector = _bindingHandler;
				}
				
				// add new handler.
				_selector.add( handler, condition );
				
				// set binding-selector to ko.bindingHandlers
				ko.bindingHandlers[binding] = _selector;
			};
			
			var addBindingsFromWaitQueue = function() {
				if (!isKoInitialized()) return;
				waitQueue.timer = undefined;
				
				// initialize bindings from wait-queue
				while (waitQueue.length > 0) {
					_addBindingHandler.apply(null, waitQueue.shift());
				}
				
				// after KO initialization, change addBindingHandler function from queue-operation to direct-adding.
				addBindingHandler = _addBindingHandler;
			};

			waitQueue.push(arguments);
			
			addBindingsFromWaitQueue();
		};
		
		thiz.add = function(binding, handler, condition) {
			addBindingHandler(binding, handler, condition);
		};
		
		thiz.has = function(binding, funk) {
			if (typeof ko.bindingHandlers[binding] != undefined) {
				if (funk in ko.bindingHandlers[binding] ) return true;
			}
			return false;
		};
		
		// cwdoh; if v is false, KO will ignore unmatched binding exception.
		thiz.enableException = function( v ) {
			if ( !v ) {
				// save original parseBindingsString()
				if ( !thiz._parseBindingsString ) {
					thiz._parseBindingsString = ko.bindingProvider.prototype.parseBindingsString;
				}
				
				// define new parseBindingsString()
				ko.bindingProvider.prototype.parseBindingsString = function(bindingsString, bindingContext) {
					try {
						return thiz._parseBindingsString(bindingsString, bindingContext);
					}
					catch (e) {
						console.log( "bindingSelector module force to ignore unmatched exception.")
					}
				};
			}
			else if ( thiz._parseBindingsString ) {
				ko.bindingProvider.prototype.parseBindingsString = thiz._parseBindingsString;
			}
		}
	};
	
	// export symbol
	ko.bindingSelector = new _BindingSelectorModule();
})();

