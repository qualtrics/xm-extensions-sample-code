export default function getDefaultTaskDefinition() {
  return {
    url: 'https://www.example.com',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {},
  };
}

export function formatConnection(credentialId) {
  return {
    id: credentialId,
    paramFormat: 'header',
    paramName: 'Authorization',
    paramTemplate: 'Bearer %s'
  };
}

export function formatFormData(formFields) {
  const formattedFormData = {};

  formFields.forEach(formField => {
    if(Object.prototype.hasOwnProperty.call(formField, 'value') && formField.value) {
      formattedFormData[formField.id] = formField.value;
    }
  });

  return formattedFormData;
}

export function hydrateFormWithSavedValues(requestBody, formFields) {
  formFields.forEach(formField => {
    if(Object.prototype.hasOwnProperty.call(requestBody, formField.name)) {
      formField.value = requestBody[formField.name];
    }
  });

  return formFields;
}

