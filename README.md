KO Binding Selector - Knockout.js plugin
======

This module makes to enable binding-overloading from Knockout.js.
Selector plugin provides selector of binding by custom-condition.

##Binding-Selector?

For example if you want to bind your data with jQuery Mobile Widget and it has same api name as KO's built-in binding name.
Sure, you can solve it by changing a name of Widget's binding or override built-ins to new bindings.

But if you give new binding names for your custom bindings,
it will cause to conflict for that you descript binding when writing binding actions in html code.

if you decide to override bindings instead of built-ins, It will works fine.
but you can't use built-ins even if you want to use it.

Selector plugin makes to enable adding bindings and its executable condition under same name.
When KO meets binding syntax, selector try to find a binding has matched condition and executes it.

##Dependency

Binding-Selector requires Knockout JavaScript library (c) Steven Sanderson - http://knockoutjs.com/

##Usage

###Scripts order

this code should be loaded after knockout.js. so, insert this script after knockout.js included.

  
  <script type="text/javascript" src="knockout.js"></script>
	<script type="text/javascript" src="bindingselector.js"></script>


###Adding custom binding with binding selector

	// sample binding overloading : check node type & alert
	ko.bindingSelector.add(
		"text",
		{
			"update": function (element, valueAccessor) {
				var value = ko.utils.unwrapObservable(valueAccessor() || {});
				element.innerText = value + ": THIS is SPAN TAG";
			}
		},
		function( element ) {
			if ( element.tagName == "SPAN" )
				return true;
		}
	);

	ko.bindingSelector.add(
		"text",
		{
			"update": function (element, valueAccessor) {
				var value = ko.utils.unwrapObservable(valueAccessor() || {});
				element.innerText = value + ": THIS is DIV TAG";
			}
		},
		function( element ) {
			if ( element.tagName == "DIV" )
				return true;
		}
	);

###Setting or changing default.

When using ko.bindingSelector.add() and there is no condition, default binding handler will be changed to new one.

	ko.bindingSelector.add(
		"text",
		{
			"update": function (element, valueAccessor) {
				var value = ko.utils.unwrapObservable(valueAccessor() || {});
				element.innerText = value + ": THIS binding will be default binding.";
			}
		}
	);

##Basic Example

Adding 2 custom 'text' bindings that have different behavior by its element type.

###HTML

	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
			<title>Binding Selector Sample</title>
			<script type="text/javascript" src="./knockout-latest.js"></script>
			<script type="text/javascript" src="../src/bindingselector.js"></script>
			<script type="text/javascript" src="./main.js"></script>
		</head>
		<body id="root" onLoad="onLoad()">
			<span data-bind="text: message"></span>
			<div data-bind="text: message"></div>
			<p data-bind="text: message"></p>
		</body>
	</html>

###Javascript

    // sample binding overloading : check node type & alert
	ko.bindingSelector.add(
		"text",
		{
			"update": function (element, valueAccessor) {
				var value = ko.utils.unwrapObservable(valueAccessor() || {});
				element.innerText = value + ": THIS is SPAN TAG";
			}
		},
		function( element ) {
			if ( element.tagName == "SPAN" )
				return true;
			return false;
		}
	);

	ko.bindingSelector.add(
		"text",
		{
			"update": function (element, valueAccessor) {
				var value = ko.utils.unwrapObservable(valueAccessor() || {});
				element.innerText = value + ": THIS is DIV TAG";
			}
		},
		function( element ) {
			if ( element.tagName == "DIV" )
				return true;
			return false;
		}
	);

	function onLoad()
	{
		var viewModel = {
			message: "Hello, bindings"
		};

		ko.applyBindings( viewModel );
	}

##No default handler

When binding is called and can not find matched condition, binding will be ignored.
  
	// add currency binding for 'kr-won'
	ko.bindingSelector.add(
		"currency",
		{
			"update": function (element, valueAccessor) {
				var value = ko.utils.unwrapObservable(valueAccessor() || {});
				element.innerText = value + ": THIS binding will be default binding.";
			}
		},
		function( element ) {
			if ( element.unit =- "won" )  // kr
			return true;
		}
	);

	// add currency binding for 'us-dollar'
	ko.bindingSelector.add(
		"currency",
		{
			"update": function (element, valueAccessor) {
				var value = ko.utils.unwrapObservable(valueAccessor() || {});
				element.innerText = value + ": THIS binding will be default binding.";
			}
		},
		function( element ) {
			if ( element.unit =- "dollars" )  // us
				return true;
		}
	);

	// binding selector can not find a binding has matched condition.
	// so, binding will be ignored.
	<span data-bind="currency: amounts" unit="$"></span>

##License
* MIT - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

##DISCUSSION
