# FormValidation

FormValidation is a lightweight JavaScript form validation jquery plugin.

## Download

Download the latest jquery.formValidation.js or jquery.formValidation.min.js.
Include it in your source after jQuery.

## CSS

There is no additional css required to use the plugin.

## Example

```JavaScript
<form novalidate>
  <label for="name">Email address</label>
  <input type="text" name="" value="" required />
</form>

<script type="text/javascript">
  $(document).ready(function() {
    $("form").formValidation();
  });
</script>
```
You'll want to set ```novalidate``` attribute on your form to prevent the browsers default validation.

## Usage

Enable form validation via JavaScript:
```JavaScript
$("form").formValidation();
```

Add the ```required``` attribute to your ```<input>```, ```<select>```, and ```<textarea>``` tags: 
```HTML
<input type="text" name="" value="" required />
```

## Options

Options to validate a field are passed via data attributes. Append the option name to ```data-```, as in ```data-notempty="true"```.  To validate a field on multiple options, you can add as many options to a single feild as you like.

#### notempty

Adding notempty attribute will check if the field is empty. No value is required.
```HTML
<input type="text" name="" value="" required data-notempty="" />
```

#### isnumber

Adding isnumber attribute will check if the field is a number. No value is required.
```HTML
<input type="text" name="" value="" required data-isnumber="" />
```

#### minlength

Adding minlength attribute will check if the field length is equal to or greater then the provided value. Set the value to be the minimum character length.
```HTML
<input type="text" name="" value="" required data-minlength="10" />
```

#### email

Adding email attribute will check if the field is formated as a email. No value is required.
```HTML
<input type="text" name="" value="" required data-email="" />
```

#### match

Adding match attribute will check if the value is equal to another field. Set the value as a selector that would return the other feild.
```HTML
<input type="password" id="password1" name="" value="" required data-match="#password2" />
<input type="password" id="password2" name="" value="" required />
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

#### Custom (Make your own)

FormValidation is fully customizable, you can add your own validation data attribute checks and use them.
Use the method ```addValidation``` to extend the basic functionality.

In the below example we create "maxlength". Your function needs to return "true" if the feilds input passes and "false" if something is wrong with the input.
```JavaScript
$("form").formValidation("addValidation", "maxlength", function(element, methodName, options) {
  return (element.val().length <= options);
});
```
Then you can use it like this:
```HTML
<input type="text" name="" value="" required data-maxlength="10" />
```

## Validation Responses
When any field in your form fails a check, we prevent the form from submitting.
When a field fails any one of its checks, we run the default validation response on that field. Which is adding a "invalid" class to the element. Once the field passes all its checks we remove the class.

**WAIT!!!** - Dont change all your markup for us.
We understand that people like to create their own form markup and having to change it, just to you use a validation plugin, is a pain. So we give you the option to create your own validation responses. 

For example, bootstrap form markup has diffrent class names and requires the class to be on its parent.
This example shows you how to create that validation responses:
```JavaScript
$("form").formValidation("addResponse", "bootstrap", function(element, fieldResponses) { 
	$parent = element.parents(".form-group");
	$parent.removeClass("has-error");
	for (var method in fieldResponses) {
		if (!fieldResponses[method]) {
			$parent.addClass("has-error");
			break;
		}	   
	}
});
```
How to use it:
```HTML
<input type="text" name="" value="" required data-notempty="" data-response="bootstrap" />
```
You can create as many diffrent responses as you like, and use anyone you like on each field.

