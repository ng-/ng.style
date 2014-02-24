module.exports = function()
{
	//Todo make filtering options based on attributes such as "display success alerts only" "make warning alerts closeable"
	return {
		restrict: 'EA',
		template: '<div ng-repeat="alert in alerts" class="alert alert-{{alert.type}}"><button class="close" ng-click="alert.close($index)">&times;</button>{{alert.msg}}</div>',
	}
}