module.exports = function()
{
	//TODO make this work for multiple inputs in one form group.  Such as city, state, zip
	return {
		restrict: 'A',
		priority:-1, //run after label adds a wrapper
		compile:function(elem, attrs)
		{
			elem.removeAttr('error')

			var input = elem.find('input')

			if ( ! input[0])
			{
				input = elem.find('select')
			}

			if ( ! input[0])
			{
				input = elem.find('textarea')
			}

			var error = input.after('<span class="help-block" style="margin:0 0 -15px 0">&nbsp;</span>').next()

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