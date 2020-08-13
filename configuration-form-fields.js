import { hasField } from './utils';

export const defaultFormFields = [
  { name: 'Respondent Email', required: true, id: 'email', valueTooltip: 'Survey Respondent Email', valuePlaceholder: '', validate: _validateStringValue },
  { name: 'Respondent Phone Number', required: true, id: 'phone-number', valueTooltip: 'Survey Respondent Phone Number', valuePlaceholder: '', validate: _validateStringValue },
  { name: 'Respondent First Name', required: true, id: 'first-name', valueTooltip: 'Survey Respondent First Name', valuePlaceholder: '', validate: _validateStringValue },
  { name: 'Respondent Last Name', required: true, id: 'last-name', valueTooltip: 'Survey Respondent Last Name', valuePlaceholder: '', validate: _validateStringValue },
  { name: 'Destination Location', required: true, id: 'destination-location', valueTooltip: 'Destination Latitude and Longitude', valuePlaceholder: '', validate: _validateStringValue },
  { name: 'Origin Location', required: false, id: 'origin-location', valueTooltip: 'Origin Latitude and Longitude', valuePlaceholder: '', validate: _validateStringValue },
  { name: 'Passenger Count', required: false, id: 'origin-location', valueTooltip: 'Origin Latitude and Longitude', valuePlaceholder: '', validate: _validateStringValue }
];

export function validateFormFieldValues(formFields) {
  return formFields.every(formField => {
    let isFormFieldValid = true;

    // Only validate required fields or optional fields with validations and values
    if(_shouldFormFieldBeValidated(formField)) {
      isFormFieldValid = formField.validate(formField.value);
    }

    return isFormFieldValid;
  });
}

export function hydrateFormFieldsWithSavedValues(requestBody, formFields) {
  formFields.forEach(formField => {
    if(hasField(requestBody, formField.id)) {
      formField.value = requestBody[formField.id];
    }
  });
  return formFields;
}

function _shouldFormFieldBeValidated(field) {
  let shouldBeValidated = false;

  // Run validation on required form fields
  if(hasField(field, 'required') && field.required === true) {
    shouldBeValidated = true;

  // Run validation on optional form fields that support validation and have a value
  } else if(hasField(field, 'validate') && hasField(field, 'value') && field.value.length > 0) {
    shouldBeValidated = true;
  }
  return shouldBeValidated;
}

function _validateStringValue(formInputValue) {
  return typeof formInputValue === 'string';
}
