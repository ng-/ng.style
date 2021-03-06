# ng.style: beautiful html

with angular came declarative html, now ng.style makes it beautiful. This module requires twitter bootstrap's css to be included in your application. Although the example below contains a lot of whitespace, ng.style - unlike many templating engines - is not whitespace sensitive.

## example
```html
<div
	label="Name"
	.form-group
	.col-xs-12>
	<input
		name="name"
		type="text"
		model="user.name"
		required>
</div>
<div
	label="Email"
	error="Must be a valid email"
	.form-group
	.col-xs-12>
	<input
		name="email"
		type="email"
		model="user.email"
		required>
</div>
<div
	label="Password"
	error="Must be at least 6 characters"
	.form-group
	.col-xs-12>
	<input
		name="password"
		type="password"
		model="user.password"
		minlength="6"
		required>
	<label .col-xs-3></label>
	<input
		name="confirm"
		type="password"
		model="user.confirm"
		minlength="6"
		required>
</div>
```
## shorthand

- **angular**

	Get rid of the `ng-` prefix for angular directives

	```html
	<div click="fn()"></div>
	```
	becomes
	```html
	<div ng-click="fn()"></div>
	```

- **html**

	`<br 4>` becomes `<br><br><br><br>`

	`<nbs 3>` becomes `&nbsp;&nbsp;&nbsp;`

- **css**

	Use css style syntax directly in your html

	`<div .class1 .class2></div>` becomes `<div class="class1 class2"></div>`

	`<div #id1 #id2></div>` becomes `<div id="id1 id2"></div>`

	`<div style:1 style:2></div>` becomes `<div style="style:1; style:2"></div>`

- **javascript**

	js style comments are removed from the template

	```html
	//	inline comments will be removed

	/*
		block comments will be removed
	*/

	<!-- html comments will remain untouched -->
	```

- **bootstrap**

	Get rid of bootstrap's redundant classes.  For example, eliminate `class="btn"`

	```html
	<div class="btn-default"></div>
	```
	becomes
	```html
	<div class="btn btn-default"></div>
	```

## alerts
In your templates
```html
<alerts></alerts>
```

In your controllers
```javascript
ng.module('myProject').controller('myCtrl', function(alert)
{
	alert.info('I am a blue alert')
	alert.danger('I am a red alert')
	alert.success('I am will show on the next page rather than the current one', true)
})
```
Available methods are `info`, `success`, `warning`, `danger`.  These methods take two arguments: the alert's message, and truthy/falsy if the message should be flashed. By default, alerts appear instantly.  Flashed messages, however, appear on the next page (e.g., route change) rather than the current page.

An additional helper, `alert.clear(all)` will clear all alerts on the current page.  If `all` is truthy, the flash messages on the next page will be cleared as well.

## file inputs
Inputs with type=file cannot be styled with css.  ng.style automatically makes these inputs invisible and moves all their attributes over a new button that can be styled.  The new button's onclick event will be set to activate the invisible file input.

```html
<input type="file"class="btn btn-danger btn-lg col-xs-5" value="Next Item">
```
becomes

```html
<input type="file" style="display:none;">

<input type="button" class="btn btn-danger btn-lg col-xs-5" value="Next Item">

```

## form groups

Bootstraps form groups are painful and involve a lot of redundant code. ng.style's form-group directive will
- add the form-control class to child inputs
- add an inline help-blocl if an error attribute is present
- add a label and placeholder if a label attribute is present

```html
<div class="form-group" label="Password" error="Must be at least 6 characters">
	<input type="password" model="password" minlength="6">
</div>
```
would become
```html
<div class="form-group" ng-class="password.$invalid && 'has-error'">
	<label for="label1">Password</label>
	<input id="label1" placeholder="Password" type="password" model="password" minlength="6">
	<span class="help-block">
		{{ password.$invalid ? "Must be at least 6 characters" : "&nbsp;"}}
	</span>
</div>
```
#### 0.0.0-rc2
- Changed from run to a config to ensure that it is run before ng.template transform

#### 0.0.0-rc1
- Initial commit

## todos
- Feel free to email adam.kircher@gmail.com with suggestions!
- Add aliases for other redundant bootstrap classes besides `class="btn"`

## related projects
- [ng](https://github.com/ng-/ng): angular reimagined
- [ng.seed](https://github.com/ng-/ng.seed): create a modular ng application using npm packages
- [ng.data](https://github.com/ng-/ng.data): simple getter/setter for data persistence
- ng.cql: realtime cassandra database syncing
- [ng.auth](https://github.com/ng-/ng.auth): example authentication using ng interceptors
- [ng.crud](https://github.com/ng-/ng.crud): example demonstrating a simple crud application using ng.seed
