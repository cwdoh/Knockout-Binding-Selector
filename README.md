KO Binding Selector - Knockout.js plugin
=========================

This module makes to enable binding-overloading from Knockout.js.
Selector plugin provides selector of binding by custom-condition.

##Description

* License: MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
* Source - [http://www.github.com/cwdoh/Knockout-Binding-Selector](http://www.github.com/cwdoh/Knockout-Binding-Selector)
* Author : Changwook Doh - changwook.doh@gmail.com

##Requirements

This module needs Knockout JavaScript library (c) Steven Sanderson - http://knockoutjs.com/

##CAUTION

* this code should be loaded after knockout.js. so, insert this script after knockout.js included.
* if you don't set condition, default binding handler will be changed to new one.
* if there's exist matched binding handler and no matched function called, handler-call will be ignored.

##Binding-Selector?

For example if you want to bind your data with jQuery Mobile Widget and it has same api name as KO's built-in binding name.
Sure, you can solve it by changing a name of Widget's binding or override built-ins to new bindings.

But if you give new binding names for your custom bindings,
it will cause to conflict for that you descript binding when writing binding actions in html code.

if you decide to override bindings instead of built-ins, It will works fine.
but you can't use built-ins even if you want to use it.

Selector plugin makes to enable adding bindings and its executable condition under same name.
When KO meets binding syntax, selector try to find a binding has matched condition and executes it.
