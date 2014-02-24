module.exports = function()
{
	return {
		restrict: 'A',
		compile: function(elem, attrs)
		{
			//Need to do this in compile since angular already has a template for "type"
			if ('camera' == attrs.type)
			{
				elem.replaceWith('<input type="file" capture="camera">')

				for (var i in elem[0].attributes)
				{
					elem.attr(i, attrs[i])
				}
			}

			return function(scope, elem, attrs)
			{
				if ('file' == elem.attr('type'))
				{
					//console.log(elem, attrs)
					elem.after('<input type="button" class="'+attrs.class+'" style="'+attrs.style+'" value="'+attrs.value+'">')

					elem.next().on('click', elem[0].click.bind(elem[0]))

					elem.removeAttr('class').removeAttr('style').css('display', 'none')

				}
			}
		}
	}
}