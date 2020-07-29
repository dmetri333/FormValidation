# FormValidation

FormValidation is a lightweight form validation library. Used to help validate your client side html forms. It is written in JavaScript.

## Download

Download the latest formValidation.js from the dist.

## Example

```JavaScript
<form novalidate>
  <label for="name">Email address</label>
  <input type="text" name="" value="" required />
</form>

<script type="text/javascript">
    new FormValidation(document.querySelector('form'));
</script>
```
Set the ```novalidate``` attribute on your ```form``` to prevent the browser's default validation.

## Usage

Add the ```required``` attribute to your ```<input>```, ```<select>```, and ```<textarea>``` tags: 
```HTML
<input type="text" name="" value="" required />
```

Enable form validation via JavaScript:
```JavaScript
new FormValidation(document.querySelector('form'));
```

## Options

Options to validate a field are passed via data attributes. Append the option name to ```data-```, as in ```data-notempty="true"```.  To validate a field on multiple options, you can add as many attributes to a single field as you like.

#### notempty

Adding notempty attribute will check if the field is empty. No attribute value is required.
```HTML
<input type="text" name="" value="" required data-notempty="" />
```

#### isnumber

Adding isnumber attribute will check if the field is a number. No attribute value is required.
```HTML
<input type="text" name="" value="" required data-isnumber="" />
```

#### minlength

Adding minlength attribute will check if the field length is equal to or greater then the provided value. Set the attribute value to be the minimum character length.
```HTML
<input type="text" name="" value="" required data-minlength="10" />
```

#### email

Adding email attribute will check if the field is formated as an email. No attribute value is required.
```HTML
<input type="text" name="" value="" required data-email="" />
```

#### match

Adding match attribute will check if the value is equal to another field's value. Set the attribute value as a selector that would return the matching feild.
```HTML
<input type="password" id="password1" name="" value="" required />
<input type="password" id="password2" name="" value="" required data-match="#password1" />
```

#### defaultselect

Adding defaultselect attribute will check if the feild value does not equal the attribute value. 
```HTML
<select required data-defaultselect="-1">
  <option value="-1">Select...</option>
  <option value="1">Some Option</option>
  <option value="2">Some Other Option</option>
</select>
```

#### checked

Adding the data-checked attribute will check if the checkbox has been checked off. No attribute value is required.
```HTML
<input type="checkbox" name="" value="" required data-checked="" />
```

#### Custom (Make your own)

FormValidation is fully customizable, you can add your own validation data attribute checks and use them.
Use the method ```addValidation``` to extend the basic functionality.

In the below example we create "maxlength" validation. The function needs to return "true" if the feilds input passes and "false" if the input value fails the test.
```JavaScript
var formValidation = new FormValidation('form');
formValidation.addValidation('maxlength', function(element, methodName, options) {
  return (element.value.length <= options);
});
```
Use the new validation test like this:
```HTML
<input type="text" name="" value="" required data-maxlength="10" />
```

## Validation Responses
When any field in your form fails a check, we prevent the form from submitting.  
When a field fails any one of its checks, we run the default validation response on that field. The default validation error response is adding an "invalid" class to the element. On subsequent validation attempts, if the field passes all tests, we remove the "invalid" class.

**WAIT!!!** - You don't need to change all your markup to use FromValidation.  
Everyone likes to create their own form markup and having to change it, just to you use a validation plugin, is a pain. The option exists to create your own validation responses. 

For example, bootstrap form markup has different validation class names and requires the class to be added to the element's parent.
This example shows you how to create that validation response:
```JavaScript
var formValidation = new FormValidation(document.querySelector('form'));
formValidation.addResponse('bootstrap', function(element, fieldResponses) { 
	let parent = element.parentNode;
	parent.classList.remove('has-error');
	for (let method in fieldResponses) {
		if (!fieldResponses[method]) {
			parent.classList.add('has-error');
			break;
		}	   
	}
});
```
How to use it:
```HTML
<input type="text" name="" value="" required data-notempty="" data-response="bootstrap" />
```
You can create as many different responses as you like, and use any one you like on each field.

## Inline Validation
If you want to validate your form but wish to run some other javascript before submitting or you do not want to submit the form at all, you can run the validation method. Form Validation will run all the checks, perform the validation responses and add a result data attribute to the form. The result data attribute will contain a true/false value representing the pass/fail validation result.
```JavaScript
var formValidation = new FormValidation(document.querySelector('form'));
if (!formValidation.runValidation()) {
	return false;
}
```
