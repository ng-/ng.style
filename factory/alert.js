module.exports = function($rootScope)
{
	//Init values for initial page load
	var next = []
	$rootScope.alerts = []

	//Update these values on every route change
	$rootScope.$on('$routeChangeStart', function()
	{
		$rootScope.alerts = next; next = []
	})

	function add(type, msg, flash)
	{
		alert =
		{
			type	: type,
			msg	: msg,
		   close	: function(i) { $rootScope.alerts.splice(i, 1) }
		}

		//Do we store the alert in flash for next page load or show immediately
		flash ? next.unshift(alert) : $rootScope.alerts.unshift(alert)
	}

	//API: four type of errors and function to close all displayed alerts
	return {
		info		: function (msg, flash) { add('info', msg, flash) }
	,	success	: function (msg, flash) { add('success', msg, flash) }
	,	warning	: function (msg, flash) { add('warning', msg, flash) }
	,	danger	: function (msg, flash) { add('danger'  , msg, flash) }
	,	clear    : function(all) { $rootScope.alerts = []; if (all) next = [] }
	}
}
