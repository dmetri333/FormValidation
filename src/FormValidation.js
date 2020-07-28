/**
 * FormValidation v1.0
 * Website - https://github.com/dmetri333/FormValidation
 * Licensed under Apache License (https://github.com/dmetri333/FormValidation/blob/master/LICENSE)
 */
class FormValidation {

	constructor(element, options) {
		this.$element = $(element);
		this.options = $.extend(true, {}, FormValidation.DEFAULTS, typeof options == 'object' && options);
		
		this.bindEvents();
	}

	bindEvents() {
		this.$element.on(this.options.eventType, () => {
			return this.runValidation();
		});
	}

	runValidation() {
		var that = this;
		var issue = false;
		this.$element.find('input[required], textarea[required], select[required]').each(function() {
			$this = $(this);
			var fieldResponses = [];
			var data = $this.data();
			$.each(data, function(methodName, options) {
				if (that.options.validationMethods[methodName] && methodName != 'response') {
					var response = that.options.validationMethods[methodName]($this, methodName, options);
					fieldResponses[methodName] = response;
					if (!response) {
						issue = true;
					}
				}
			});

			var responseName = $this.data('response') ? $this.data('response') : 'addInvalidClass';
			if (that.options.responseMethods[responseName]) {
				that.options.responseMethods[responseName]($this, fieldResponses);
			}
		});

		return !issue;
	}
	
	addValidation(methodName, method) {
		this.options.validationMethods[methodName] = method;
	}

	addResponse(methodName, method) {
		this.options.responseMethods[methodName] = method;
	}

}

FormValidation.DEFAULTS = {

	validationMethods : {
		notempty : function(element, methodName, options) {
			return ($.trim(element.val()) !== '');
		},
		isnumber : function(element, methodName, options) {
			return /^\d+$/.test(element.val());
		},
		minlength : function(element, methodName, options) {
			return (element.val().length >= options);
		},
		email : function(element, methodName, options) {
			return (element.val().search(/^([a-zA-Z0-9_.\-+'])+@([a-zA-Z0-9_.\-])+\.([a-zA-Z])+([a-zA-Z])+/) != -1);
		},
		match : function(element, methodName, options) {
			return (element.val() == $(options).val());
		},
		defaultselect : function(element, methodName, options) {
			return (element.val() != options);
		},
		checked : function(element, methodName, options) {
			return element.is(':checked');
		}
	},

	responseMethods : {
		addInvalidClass : function(element, fieldResponses) {
			element.removeClass('invalid');
			for (var method in fieldResponses) {
				if (!fieldResponses[method]) {
					element.addClass('invalid');
					break;
				}
			}
		}
	},
	
	eventType: 'submit'

};