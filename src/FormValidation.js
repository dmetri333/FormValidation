/**
 * FormValidation v1.0
 * Website - https://github.com/dmetri333/FormValidation
 * Licensed under Apache License (https://github.com/dmetri333/FormValidation/blob/master/LICENSE)
 */
class FormValidation {

	constructor(element, options) {
		this.element = element;
		this.options = this.extend({}, FormValidation.DEFAULTS, typeof options == 'object' && options);
		
		this.bindEvents();
	}

	bindEvents() {
		if (this.element && this.options.eventType == 'submit') {
			this.element.addEventListener(this.options.eventType, (event) => {
				if (!this.runValidation()) {
					event.preventDefault();
					return false;
				}
			});	
		}
	}

	runValidation() {
		let issue = false;
		let inputs = this.element ? this.element.querySelectorAll('[required]') : [];
		
		for (let i = 0; i < inputs.length; i++) {
			let fieldResponses = [];
			let data = inputs[i].dataset;
			for (let methodName in data) {
				let options = data[methodName];

				if (this.options.validationMethods[methodName] && methodName != 'response') {
					let response = this.options.validationMethods[methodName](inputs[i], methodName, options);
					fieldResponses[methodName] = response;
					if (!response) {
						issue = true;
					}
				}
			}

			let responseName = data.response ? data.response : 'addInvalidClass';
			if (this.options.responseMethods[responseName]) {
				this.options.responseMethods[responseName](inputs[i], fieldResponses);
			}
		}

		return !issue;
	}
	
	addValidation(methodName, method) {
		this.options.validationMethods[methodName] = method;
	}

	addResponse(methodName, method) {
		this.options.responseMethods[methodName] = method;
	}

	extend(out) {
		out = out || {};
	  
		for (let i = 1; i < arguments.length; i++) {
			let obj = arguments[i];
	  
			if (!obj)
				continue;
	  
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (typeof obj[key] === 'object') {
						if (obj[key] instanceof Array == true)
							out[key] = obj[key].slice(0);
						else
							out[key] = this.extend(out[key], obj[key]);
					} else {
						out[key] = obj[key];
					}
				}
			}
		}
	  
		return out;
	}
	
}

FormValidation.DEFAULTS = {

	validationMethods : {
		notempty : function(element, methodName, options) {
			return (element.value.trim() !== '');
		},
		isnumber : function(element, methodName, options) {
			return /^\d+$/.test(element.value);
		},
		minlength : function(element, methodName, options) {
			return (element.value.length >= options);
		},
		email : function(element, methodName, options) {
			return (element.value.search(/^([a-zA-Z0-9_.\-+'])+@([a-zA-Z0-9_.\-])+\.([a-zA-Z])+([a-zA-Z])+/) != -1);
		},
		match : function(element, methodName, options) {
			return (element.value == document.querySelector(options).value);
		},
		defaultselect : function(element, methodName, options) {
			return (element.value != options);
		},
		checked : function(element, methodName, options) {
			return element.checked;
		}
	},

	responseMethods : {
		addInvalidClass : function(element, fieldResponses) {
			element.classList.remove('invalid');
			for (var method in fieldResponses) {
				if (!fieldResponses[method]) {
					element.classList.add('invalid');
					break;
				}
			}
		}
	},
	
	eventType: 'submit'
};

export default FormValidation;
