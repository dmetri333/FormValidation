/**
 * FormValidation v1.0
 * Website - https://github.com/dmetri333/FormValidation
 * Licensed under Apache License (https://github.com/dmetri333/FormValidation/blob/master/LICENSE)
 */
(function($) {
	
	var FormValidation = function(element, options) {
		this.options = options;
		this.$element = $(element);
		
		this.$element.on(this.options.eventType, $.proxy(function(event) {
			return this.runValidation();
		}, this));
	};
	
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
				return (element.val().search(/^([a-zA-Z0-9_.\-+])+@([a-zA-Z0-9_.\-])+\.([a-zA-Z])+([a-zA-Z])+/) != -1);
			},
			match : function(element, methodName, options) {
				return (element.val() == $(options).val());
			},
			defaultselect : function(element, methodName, options) {
				return (element.val() != options);
			},
			checked : function(element, methodName, options) {
				return element.is(":checked");
			}
		},

		responseMethods : {
			addInvalidClass : function(element, fieldResponses) {
				element.removeClass("invalid");
				for ( var method in fieldResponses) {
					if (!fieldResponses[method]) {
						element.addClass("invalid");
						break;
					}
				}
			}
		},
		
		eventType: "submit"

	};

	FormValidation.prototype.runValidation = function() {
		
		var that = this;
		var issue = false;
		this.$element.find("input[required], textarea[required], select[required]").each(function() {
			$this = $(this);
			var fieldResponses = [];
			var data = $this.data();
			$.each(data, function(methodName, options) {
				if (that.options.validationMethods[methodName] && methodName != "response") {
					var response = that.options.validationMethods[methodName]($this, methodName, options);
					fieldResponses[methodName] = response;
					if (!response) {
						issue = true;
					}
				}
			});

			var responseName = $this.data("response") ? $this.data("response") : "addInvalidClass";
			if (that.options.responseMethods[responseName]) {
				that.options.responseMethods[responseName]($this, fieldResponses);
			}
		});

		return !issue;
	};
	
	FormValidation.prototype.addValidation = function(methodName, method) {
		this.options.validationMethods[methodName] = method;
	};

	FormValidation.prototype.addResponse = function(methodName, method) {
		this.options.responseMethods[methodName] = method;
	};
	
	function Plugin(option, methodName, method) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data("formValidation");
			var options = $.extend({}, FormValidation.DEFAULTS, $this.data(), typeof option == "object" && option);
			
			if (!data)
				$this.data("formValidation", (data = new FormValidation(this, options)));
			
			if (typeof option == "string") {
				if (option == "runValidation") {
					$this.data('result', data[option](methodName, method));
				} else {
					data[option](methodName, method);
				}
			}
		});
	}

	$.fn.formValidation = Plugin;
	$.fn.formValidation.Constructor = FormValidation;

})(jQuery);
