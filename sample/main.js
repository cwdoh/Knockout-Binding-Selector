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