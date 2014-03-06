module.exports = function()
{
	var id = 0
	//TODO make this work for multiple inputs in one form group.  Such as city, state, zip
	return {
		restrict: 'C',
		compile:function(elem, attrs)
		{
			//Make sure these directives are not run twice
			elem.removeAttr('error').removeAttr('label')

			//Find the input that this group is wrapping
			var input = elem.find('input')

			if ( ! input[0])
			{
				input = elem.find('select')
			}

			if ( ! input[0])
			{
				input = elem.find('textarea')
			}

			input.addClass('form-control')

			if (attrs.label)
			{
				//Add a label before the element
				var label = ng.element('<label class="control-label" for="label'+id+'">'+attrs.label+'</label>')

				elem.prepend(label)

				//Add label's for=id to the input, add a placeholder, and wrap input in div
				input.attr('id', 'label'+id++).attr('placeholder', attrs.label).wrap('<div />')

				//Give the input's wrapper and it's label desired column sizes: label = 3, input = total - 3
				attrs.class.replace(/col-(xs|sm|md|lg)-(\d+)/g, function(match, prefix, cols)
				{
					elem.removeClass(match)

					label.addClass('col-'+prefix+'-3')

					input.parent().addClass('col-'+prefix+'-'+(cols-3))
				})
			}

			if (attrs.error)
			{
				//Now let's add an error message
				var error = input.after('<span class="help-block" style="margin:0 0 -15px 0">&nbsp;</span>').next()

				//The rest needs to be done in the link function
				return function()
				{
					var model = input.controller('ngModel')

					function listener()
					{
						if (model.$valid)
						{
							error.html('&nbsp;')

							elem.removeClass('has-error')
						}
						else
						{
							error.html(attrs.error)

							elem.addClass('has-error')
						}
					}

					input.on('input', listener)
					//input.on('change', listener) doesn't seem necessary
				}
			}
		}
	}
}