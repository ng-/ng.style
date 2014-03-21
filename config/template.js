//To understand this you must understand how ng's template transform works
//since it steals the server's templates and puts them on the client
//we just need to modify the server's templates with our regexs first

exports.server = function($routeProvider)
{
	var when = $routeProvider.when

	$routeProvider.when = function(path, route)
	{
		//split on < or > when not inside single or double quotes
		//http://stackoverflow.com/questions/6462578/alternative-to-regex-match-all-instances-not-inside-quotes
		///[<>](?=(?:[^']*'[^']*')*[^']*$)(?=(?:[^"]*"[^"]*")*[^"]*$)/ however this doesn't allow for "label's"
		//so we need to escape all of the <> within quotes first before splitting the html then unescape at end
		route.template = route.template.replace(/("|')(.*?)[^\\]\1/g, function(quote)
		{
			return quote.replace(/>/g, '&gte;').replace(/</g, '&lte;')
		})

		var split = route.template.split(/<|>/)

		for (var j in split)
		{
			var regex = text

			if (j%2)
			{
				regex = tags

				split[j] = '<'+split[j]+'>'
			}

			for (var k in regex)
			{
				split[j] = split[j].replace(regex[k][0], regex[k][1])
			}
		}

		route.template = split.join('').replace(/&gte;/g, '>').replace(/&lte;/g, '<')

		when(path, route)

		return this
	}
}

//TODO make this a provider where you can register additional regex
//TODO add ng-class and other directives that have html counterparts

//Do stuff inside of element tags
var tags =
[
	//Add ng- prefix
	[/([ <"'\n\t])view/, 		'$1ng-view'],
	[/([ <"'\n\t])if/, 			'$1ng-if'],
	[/([ <"'\n\t])controller/,	'$1ng-controller'],
	[/([ <"'\n\t])disabled/, 	'$1ng-disabled'],
	[/([ <"'\n\t])transclude/,	'$1ng-transclude'],
	[/([ <"'\n\t])include/, 	'$1ng-include'],
	[/([ <"'\n\t])repeat/, 		'$1ng-repeat'],
	[/([ <"'\n\t])model/, 		'$1ng-model'],
	[/([ <"'\n\t])click/, 		'$1ng-click'],
	[/([ <"'\n\t])options/, 	'$1ng-options'],
	[/([ <"'\n\t])minlength/, 	'$1ng-minlength'],
	[/([ <"'\n\t])maxlength/, 	'$1ng-maxlength'],
	[/([ <"'\n\t])pattern/, 	'$1ng-pattern'],

	//CSS shorthand
	[/[\s\S]*/, 					cssClass],
	[/[\s\S]*/, 					cssStyle],
	[/[\s\S]*/, 					cssId],

	//HTML helpers
	[/<br.* (\d+).*>/, 	br], 						//<br 3> will make <br><br><br>
	[/<nbs.* (\d+).*>/, 	nbs], 					//<nbs 3> will make &nbsp;&nbsp;&nbsp;

	//Bootstrap helper
	[/btn-(default|primary|success|info|warning|danger)/, 'btn btn-$1']
]

//Do stuff outside of element tags
var text =
[
	//Make html comments use the same syntax as javascript
	[/\/\/.*/g,				''],  					//Strip out single-line comments
	[/\/\*[\s\S]*?\*\//g, 	''],      				//Strip out block comments
]

function br(all, num) { return Array( +num + 1 ).join('<br />')}

function nbs(all, num){ return Array( +num + 1 ).join('&nbsp;')}

function cssClass(e)
{
	var classes = []

	e = e.replace(/[\n\t ]\.[\w-]+/g, function(c)
	{
		classes.push(c.slice(2)); return ''
	})

	classes = classes.join(' ')

	return classes ? e.replace('>', ' class="'+classes+'">') : e
}

function cssStyle(e)
{
	var styles  = []

	e = e.replace(/[\w-]+:[\w-\d%#]+(?=(?:[^']*'[^']*')*[^']*$)(?=(?:[^"]*"[^"]*")*[^"]*$)/g, function(s)
	{
		styles.push(s); return ''
	})

	styles = styles.join('; ')

	return styles ? e.replace('>', ' style="'+styles+'">') : e
}

function cssId(e)
{
	var ids = []

	e = e.replace(/[\n\t ]#[\w-]+/g, function(i)
	{
		ids.push(i.slice(2)); return ''
	})

	ids = ids.join(' ')

	return ids ? e.replace('>', ' id="'+ids+'">') : e
}
