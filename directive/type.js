//TODO can we make this directive transclude type=text && number so that
//<input>I am a placeholder</input> becomes <input placeholder="I am a placeholder">
//<input
//		type="number"
//		model="tracking"
//		minlength="5"
//		maxlength="5"
//		required
//		.form-control
//	>
//		Last 5 digits of label's tracking #
//</input>
module.exports = function()
{
	return {
		restrict: 'A',
		//Can't add/remove attrs to file types for security reasons, so must create new inputs
		compile: function(elem, attrs)
		{
			var input = ''

			//Need to do this in compile since angular already has a template for "type"
			if ('camera' == attrs.type)
			{
				attrs.type = 'file'

				input += ' capture="camera"'
			}

			if ('file' == attrs.type)
			{
				//Angular doesn't support ng-change on file input elements and scope doesn't easily bind to onchange events
				if (attrs.onchange)
				{
					input += ' onchange="var scope = angular.element(this).scope(); scope.$apply(scope.'+attrs.onchange+')"'
				}

				elem.replaceWith('<input type="'+attrs.type+'"'+input+'>')
			}

			return function(scope, elem, attrs)
			{
				if ('file' == elem.attr('type'))
				{
					elem.after('<input type="button" class="'+attrs.class+'" style="'+attrs.style+'" value="'+attrs.value+'">')

					elem.next().on('click', elem[0].click.bind(elem[0]))

					elem.removeAttr('class').removeAttr('style').css('display', 'none')

				}
			}
		}
	}
}