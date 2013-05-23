KO Binding Selector - Knockout.js plugin
======

* Author : Chang W. Doh

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

##CAUTION

* this code should be loaded after knockout.js. so, insert this script after knockout.js included.
* if you don't set condition, default binding handler will be changed to new one.
* if there's exist matched binding handler and no matched function called, handler-call will be ignored.

##License
* License: MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

##DISCUSSION
