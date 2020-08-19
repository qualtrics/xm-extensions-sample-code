import React, { useState } from 'react';
import { TaskFields, FieldItem } from '@qualtrics/plugin-ui-react';
import { defaultFormFields, validateFormFieldValues, hydrateFormFieldsWithSavedValues } from './configuration-form-fields';

export function ConfigurationForm(props) {
  const [ formFields, setFormFields ] = useState(_loadFormFields);
  const values = [ ...formFields ];

  return (
    <TaskFields
      pipedTextItems={props.client.context.pipedText}
      onFieldInputChange={onFieldValueChange}
      values={values} >

      {formFields.map(option => {
        return (
          <FieldItem
            name={option.name}
            key={option.id}
            id={option.id}
            required={option.required}
            valuePlaceholder={option.valuePlaceholder}
            valueTooltip={option.valueTooltip} >
          </FieldItem>
        );
      })
      }
    </TaskFields>
  );

  function _loadFormFields() {
    if(props.client.isNewTask()) {
      return defaultFormFields;
    }
    return hydrateFormWithSavedValues(props.client.getConfig().body, defaultFormFields);
  }

  function onFieldValueChange(fieldId, value, event) {
    const fieldIndex = formFields.findIndex(field => {
      return field.id === fieldId;
    });

    if(fieldIndex === -1) {
      return;
    }

    const newFormFields = [ ...formFields ];
    newFormFields[fieldIndex].value = value;
    setFormFields(newFormFields);
    const canSaveForm = validateFormFieldValues(formFields);
    if(canSaveForm) {
      props.prepareFormFieldsForSaving(formFields);
    }
    props.toggleSaveButtonState(canSaveForm);
  }
}

