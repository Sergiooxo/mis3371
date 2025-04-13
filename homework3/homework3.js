 /*
Program name: homework3.js
Author: Sergio Gonzalez
Date created: 1st March, 2025 
Date last edited: 13th April, 2025
Version: 1.5
Description: Js will be coded here
*/

// Date
const d = new Date();
let text = d.toLocaleDateString();
document.getElementById("today").innerHTML = text;

//Live Slider
function updateSliderValue(value) 
    {
        document.getElementById("sliderValue").textContent = `${value}`;
    }
//REVIEW BUTTON Getting User Input Data
    //referenced professors code: https://profjake.w3spaces.com/MIS3371/homework3.js
function getcustomerinformation() {
  var formcontents = document.getElementById("registration"); // Get the form by its ID
  var formoutput = "<table class='output'><th>Requested Information</th><th>Customer Input</th>";
  
  // Loop through all form elements
  for (var i = 0; i < formcontents.length; i++) {
    var element = formcontents.elements[i];
    var datatype = element.type; // Get the type of the element (text, radio, checkbox, etc.)

    // Skip certain types of inputs (button, submit, reset)
    if (datatype === "button" || datatype === "submit" || datatype === "reset") {
      continue;
    }

    // Handle different input types
    switch (datatype) {
      case "checkbox":
        if (element.checked) { // If the checkbox is checked
          formoutput += "<tr><td align='right'>" + element.name + "</td>";
          formoutput += "<td style='text-align: right;' class='outputdata'>Checked</td></tr>";
        }
        break;

      case "radio":
        if (element.checked) { // If a radio button is selected
          formoutput += "<tr><td align='right'>" + element.name + "</td>";
          formoutput += "<td style='text-align: right;' class='outputdata'>" + element.value + "</td></tr>";
        }
        break;

      default:
        // For text, email, and other input types
        if (element.value) { // Only show the input if it has a value
          formoutput += "<tr><td align='right'>" + element.name + "</td>";
          formoutput += "<td style='text-align: right;' class='outputdata'>" + element.value + "</td></tr>";
        }
        break;
    }
  }

  // Close the table tag
  formoutput += "</table>";

  // Insert the generated table into the "outputformdata" div
  document.getElementById("outputformdata").innerHTML = formoutput;
}


//BLOCK ONE - BLOCK ONE
//First Name ADVACED EDITING
function validateFirstName() 
{
    let firstNameInput = document.getElementById("first_name");
    let firstNameMessage = document.getElementById("firstname_message");
    let firstNamePattern = /^[A-Za-z'-]{1,30}$/;

    if (!firstNamePattern.test(firstNameInput.value)) 
    {
        firstNameMessage.innerHTML = "* First name can contain letters, apostrophes, and dashes only (1 to 30 characters).<br>";
        return false;
    } 
    else 
    {
        firstNameMessage.innerHTML = "";
        return true;
    }
}

//M.I ADNVACED EDITING
function validateMiddleInitial() 
{
    let middleInitialInput = document.getElementById("middle_initial");
    let middleInitialMessage = document.getElementById("middle_initial_message");
    let middleInitialPattern = /^[A-Za-z]?$/;

    if (!middleInitialPattern.test(middleInitialInput.value)) 
    {
        middleInitialMessage.innerHTML = "* Middle initial must be a single letter or blank.<br>";
        return false;
    } 
    else 
    {
        middleInitialMessage.innerHTML = "";
        return true;
    }
}   
// Last Name ADVANCED EDITING
function validateLastName() 
{
    let lastNameInput = document.getElementById("last_name");
    let lastNameMessage = document.getElementById("last_name_message");
    let lastNamePattern = /^[A-Za-z'2-5-]{1,30}$/;

    if (!lastNamePattern.test(lastNameInput.value)) 
    {
        lastNameMessage.innerHTML = "* Last name can contain letters, apostrophes, numbers (2-5), and dashes only (1 to 30 characters).<br>";
        return false;
    } else 
    {
        lastNameMessage.innerHTML = "";
        return true;
    }
}

//validation on input for extra validataion in realtime
document.getElementById("first_name").oninput = function() 
{
    this.setCustomValidity('');
    validateFirstName();
};

document.getElementById("middle_initial").oninput = function() 
{
    this.setCustomValidity('');
    validateMiddleInitial();
};

document.getElementById("last_name").oninput = function() 
{
    this.setCustomValidity('');
    validateLastName();
};

// Validation for DOB cant be 120 in the past or be in the furture ADVANCED EDITING
function validateDateOfBirth() 
{
    let dateInput = document.getElementById("selectdate");
    let dateMessage = document.getElementById("date_message");
    let currentDate = new Date();
    let inputDate = new Date(dateInput.value);
    let minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 120);

    if (inputDate > currentDate) 
    {
        dateMessage.innerHTML = "* Date cannot be in the future.";
        return false;
    } else if (inputDate < minDate) 
    {
        dateMessage.innerHTML = "* Date cannot be more than 120 years ago.";
        return false;
    } else {
        dateMessage.innerHTML = "";
        return true;
    }
}

//validates message accordingly
document.getElementById("selectdate").oninput = function() 
{
    this.setCustomValidity('');
    validateDateOfBirth();
};

// Validate SSN format ADVANCED EDITING
function validateSSN() 
{
    let ssnInput = document.getElementById("ssn");
    let ssnMessage = document.getElementById("ssn_message");
    let ssnPattern = /^\d{3}-\d{2}-\d{4}$/;

    if (!ssnPattern.test(ssnInput.value)) 
    {
        ssnMessage.innerHTML = "* Numbers only, dashes added automatically.";
        return false;
    } 
    else 
    {
        ssnMessage.innerHTML = "";  
        return true;
    }
}

// Automatically format SSN as user types to include dashes. 
    //Idea from: https://stackoverflow.com/questions/6981487/insert-hyphens-in-javascript
function autoFormatSSN(event) 
{
    let ssnField = document.getElementById("ssn");
    let ssnValue = ssnField.value;

    
    ssnValue = ssnValue.replace(/\D/g, '');

    
    if (ssnValue.length > 3 && ssnValue.length <= 5) 
    {
        ssnValue = ssnValue.replace(/(\d{3})(\d{0,2})/, '$1-$2');
    } 
    else if (ssnValue.length > 5) 
    {
        ssnValue = ssnValue.replace(/(\d{3})(\d{2})(\d{0,4})/, '$1-$2-$3');
    }  
    ssnField.value = ssnValue;

    validateSSN();
}

document.getElementById("ssn").oninput = autoFormatSSN;

//BLOCK TWO - BLOCK TWO (CONTACT INFO)
//Email validation and format. ADVANCED EDITING
function validateEmail() 
{
    let emailInput = document.getElementById("email");
    let emailMessage = document.getElementById("email_message");
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    
    if (!emailPattern.test(emailInput.value)) //checks to make sure the email matches up to the format I asked for.
    {
        emailMessage.innerHTML = "* Input must follow email format (e.g., name@domain.tld format).";
        return false;
    } else {
        emailMessage.innerHTML = "";  // Clear any validation message if any.
        return true;
    }
}
//Idea from the following sites: https://www.w3schools.com/jsref/jsref_substring.asp
    //https://stackoverflow.com/questions/30058927/format-a-phone-number-as-a-user-types-using-pure-javascript
//Phone number validation and format. ADVANCED EDITING
function formatPhoneNumber() 
{
    let phoneInput = document.getElementById("phonenumber");
    let phoneMessage = document.getElementById("phone_message");
 
    let phoneNumber = phoneInput.value.replace(/\D/g, ''); //allows only for numbers

    
    if (phoneNumber.length <= 3) //sets the format for 10 digits and also the dashes as 000-000-0000
    {
        phoneInput.value = phoneNumber.substring(0, 3);
    } else if (phoneNumber.length <= 6) 
    {
        phoneInput.value = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3, 6);
    } else {
        phoneInput.value = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, 10);
    }

    
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/; //checks the phone number format and displays the error message if invalid.
    if (!phonePattern.test(phoneInput.value)) 
    {
        phoneMessage.innerHTML = "* Input must follow format; dashes added automatically (e.g., 000-000-0000).";
    } else 
    {
        phoneMessage.innerHTML = "";  // Clears the error message one the user inputs the proper format.
    }
}

//BLOCK THREE - BLOCK THREE (ADDRESS)
//State:"Add a NULL initial value for State so the user MUST choose a valid value"
function validateState() {
    const stateSelect = document.getElementById('state');
    const stateMessage = document.getElementById('state_message');

    if (stateSelect.value === '') 
    {
        stateMessage.innerHTML = '* Please select a valid state.'; //Message displayed if no state slected.
        return false;  //This invalidates form submission if user has yet to select a state
    } else 
    {
        stateMessage.innerHTML = '';  
        return true;  //Once state selected allow submission
    }
}

function validateAddressLine1() 
  {
    const input = document.getElementById("adressline1").value.trim();
    const message = document.getElementById("adressline1_message");

    if (input === "") 
      {
        message.textContent = "Address Line 1 is required.";
      } 
    else if (input.length < 2 || input.length > 30) 
      {
        message.textContent = "Must be between 2 and 30 characters.";
      } 
    else 
      {
        message.textContent = "";
      }
  }

function validateAddressLine2() 
  {
    const input = document.getElementById("adressline2optional").value.trim();
    const message = document.getElementById("adressline2optional_message");

    if (input !== "" && (input.length < 2 || input.length > 30)) 
      {
      message.textContent = "Must be between 2 and 30 characters.";
      } 
    else 
      {
        message.textContent = "";
      }
  }

function validateCity() 
  {
    const input = document.getElementById("city").value.trim();
    const message = document.getElementById("city_message");

    if (input === "") 
      {
        message.textContent = "City is required.";
      } 
    else if (input.length < 2 || input.length > 30)   
      {
        message.textContent = "Must be between 2 and 30 characters.";
      } 
    else 
      {
        message.textContent = "";
      }
  }


    //truncate occurs after you input the the '-' + 4 digits, if you input 5 digits only then no truncate occurs.
function validateZipCode() {
    const zipInput = document.getElementById("zipcode");
    const zipMessage = document.getElementById("zipcode_message");

    let zipValue = zipInput.value.replace(/[^0-9-]/g, ''); //again allows only digits but also hyphens this time
    zipInput.value = zipValue;

    if (zipValue.length > 9) 
    {
        let zipOnlyDigits = zipValue.replace(/[^0-9]/g, ''); //trucate begins, checks the zipe+4 format. Then truncate to 5 digits removing hyphen as well.
        zipOnlyDigits = zipOnlyDigits.slice(0, 5);
        zipInput.value = zipOnlyDigits; //displasy the newly truncated value
    
        zipMessage.innerHTML = '';
    }

    if (zipValue.replace(/[^0-9]/g, '').length === 5) 
    {
        zipMessage.innerHTML = '';
    } else 
    {
        zipMessage.innerHTML = '* Zip code must be 5 digits.';
    }
}

//User id and password formatting and alerts
    //User Id format and validation
function validateUserId() 
{
    //gather user id and message element 
  const userIdInput = document.getElementById('userid');
  const userIdMessage = document.getElementById('userid_message');
  let userId = userIdInput.value.replace(/\s+/g, '').toLowerCase();

    //reviews the legnth min 5 and max 30 char
      //if criteria not met, then display the following messages listed below
  if (/[^a-z0-9_-]/.test(userId) || userId.length < 5 || userId.length > 20 || /^[0-9]/.test(userId))
  {
    userIdMessage.innerHTML = "* User ID cannot start with a number.<br>* It must be 5–20 characters and only include letters, numbers, underscores, and dashes. No spaces.";
    userIdMessage.style.color = "red";
    userIdMessage.classList.remove('success');
    userIdInput.value = userId.replace(/[^a-z0-9_-]/g, ''); //charcaters not valid are removed from the input field to meet criteria
    return false;
  }
    //if validation passes then display the message below
  userIdMessage.innerHTML = "* User ID is valid!";
  userIdMessage.classList.add('success');
  userIdMessage.style.color = "green";
  userIdInput.value = userId;
  return true;
}

  //may be redundant to have this code, i changed the typ to password in html to obscure the value, might leave for reassurance,.
function maskPassword(fieldId) 
{
  let field = document.getElementById(fieldId);
  let value = field.value;
  field.value = '*'.repeat(value.length);
}

//password validaton and requirments 
  //the values of password, user id and confirm password are obtained as well as their messages
    //idea for password matching: https://stackoverflow.com/questions/25899694/comparing-form-input-values 
    //https://stackoverflow.com/questions/12058081/comparing-two-input-fields 
function validatePasswords() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;
  const passwordMessage = document.getElementById('password_message');
  const confirmPasswordMessage = document.getElementById('confirm_password_message');
  const userId = document.getElementById('userid').value;

  let errors = []; //the array is created to hold error messages if any is available 

      //simple password length check
  if (password.length < 8 || password.length > 30) 
  {
    errors.push("Password must be between 8 and 30 characters.");
  }
      //another check but this time for the criteria of uppercase, lowercase, number and special character
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#%^&*()\-_+=\/><.,`~]/.test(password)) 
  {
    errors.push("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
  }
      //as per instructions, avoid double quotes and checks to makes sure there arent any
  if (/["]/.test(password)) 
  {
    errors.push('Password cannot contain quotes ("").');
  }
      //reviews to make sure User id does not equal password, if so then error/invalid
  if (password.includes(userId)) 
  {
    errors.push("Password cannot be the same as or contain part of your User ID.");
  }
      //makes sure both password fields match
  if (password !== confirmPassword) 
  {
    errors.push("Passwords do not match.");
  }

  if (errors.length > 0) //errormessages will begin dsiplaying 
  {
    passwordMessage.innerHTML = errors.join("<br>");
    passwordMessage.style.color = "red";
    passwordMessage.classList.remove('success'); //remove success message in invalid
  } else 
  {
    passwordMessage.innerHTML = "* Password is valid!";  //remove errors and display message
    passwordMessage.style.color = "green";
    passwordMessage.classList.add('success');
  }

  if (password === confirmPassword) 
  {
    confirmPasswordMessage.innerHTML = "* Passwords match!";
    confirmPasswordMessage.style.color = "green";
    confirmPasswordMessage.classList.add('success');
  } else 
  {
    confirmPasswordMessage.innerHTML = "Passwords do not match.";
    confirmPasswordMessage.style.color = "red";
    confirmPasswordMessage.classList.remove('success');
  }

  //if the password does not equal userid then remove the following error message
  if (!password.includes(userId)) 
  {
    const index = errors.indexOf("Password cannot be the same as or contain part of your User ID.");
    if (index > -1) 
    {
      errors.splice(index, 1);
      passwordMessage.innerHTML = "* Password is valid!";
      passwordMessage.style.color = "green";
      passwordMessage.classList.add('success');
    }
  }

// Add event listener for the Validate button (input type)
document.getElementById('validateButton').addEventListener('click', function(event) {
  const formIsValid = validateForm();
  if (!formIsValid) {
    event.preventDefault();
  }
});

// Function that validates the form and controls Submit button visibility
function validateEverything() {
  console.log("Validate button clicked");

  // Run all validation functions and collect the results
  const isValid =
    validateFirstName() &&
    validateMiddleInitial() &&
    validateLastName() &&
    validateDateOfBirth() &&
    validateSSN() &&
    validateEmail() &&
    validatePhone() &&
    validateAddressLine1() &&
    validateAddressLine2() && // Optional? Adjust if not required
    validateCity() &&
    validateState() &&
    validateZipCode() &&
    validateUserId() &&
    validatePasswords();

  if (isValid) {
    document.getElementById("submitButton").style.display = "inline-block";
  } else {
    alert("There are errors in the form. Please correct them before submitting.");
    document.getElementById("submitButton").style.display = "none";
  }
}

// Final validation on actual form submission
document.getElementById("registration").addEventListener("submit", function(event) {
  const isValid =
    validateFirstName() &&
    validateMiddleInitial() &&
    validateLastName() &&
    validateDateOfBirth() &&
    validateSSN() &&
    validateEmail() &&
    validatePhone() &&
    validateAddressLine1() &&
    validateAddressLine2() && // Optional?
    validateCity() &&
    validateState() &&
    validateZipCode() &&
    validateUserId() &&
    validatePasswords();

  if (!isValid) {
    event.preventDefault();
    alert("Please correct the highlighted errors before submitting the form.");
  } else {
    formatPhoneNumber(); // Optional: format before submit
  }
});