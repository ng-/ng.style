module.exports = function()
{
	var id = 0

	return {
		restrict: 'A',
		compile:function(elem, attrs)
		{
			var label = angular.element('<label class="control-label" for="label'+id+'">'+attrs.label+'</label>')

			elem.removeAttr('label').prepend(label)

			var input = elem.find('input')

			if ( ! input[0])
			{
				input = elem.find('select')
			}

			if ( ! input[0])
			{
				input = elem.find('textarea')
			}

			input.attr('id', 'label'+id++).attr('placeholder', attrs.label).wrap('<div />')

			attrs.class.replace(/col-(xs|sm|md|lg)-(\d+)/g, function(match, prefix, cols)
			{
				elem.removeClass(match)

				label.addClass('col-'+prefix+'-2')

				input.parent().addClass('col-'+prefix+'-'+(cols-2))
			})
		}
	}
}