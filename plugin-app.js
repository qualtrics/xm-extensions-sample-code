import React, { useState } from 'react';
import merge from 'lodash.merge';
import { ConfigurationForm } from './configuration-form';
import { getDefaultTaskDefinition, formatConnection, formatFormData } from './outbound-http-request-task-definition';
import { addCustomPipedTextOptions } from './custom-piped-text-options';

import './plugin-app.scss';

export function PluginApp(props) {
  const client = props.client;
  const [ taskDefinition, setTaskDefinition ] = useState(_loadTaskDefinition);

  // Main Event Handler
  client.onSave(saveTaskDefinition);

  // Custom Piped Text
  addCustomPipedTextOptions(client.context.pipedText);

  // React Component
  return (
    <div className='plugin-app'>
      <ConfigurationForm
        client={client}
        toggleSaveButtonState={toggleSaveButtonState}
        savedFormFields={taskDefinition.formFields}
        prepareFormFieldsForSaving={prepareFormFieldsForSaving}
      >
      </ConfigurationForm>
    </div>
  );

  function saveTaskDefinition() {
    const newTaskDefinition = { ...taskDefinition };

    // Step 1 - Conditionally attach a connection - see 'Setting Up Authentication' guide in docs for more details
    const credentialId = client.getAvailableConnections().credentialId;
    if(credentialId) {
      newTaskDefinition.connection = formatConnection(credentialId);
    }

    // Step 2 - Merge dynamic form key-value pairs with static request body parameters
    merge(newTaskDefinition.body, formatFormData(taskDefinition.formFields));

    // This may be unnecessary, but it feels like the right thing to do :)
    setTaskDefinition(newTaskDefinition);

    // Step 3 - Return the task definition object for persistance into backend
    return newTaskDefinition;
  }

  function prepareFormFieldsForSaving(formFields) {
    const newTaskDefinition = { ...taskDefinition };
    newTaskDefinition.formFields = formFields;
    setTaskDefinition(newTaskDefinition);
  }

  function toggleSaveButtonState(isFormValid) {
    if(isFormValid) {
      client.enableSaveButton();
    } else {
      client.disableSaveButton();
    }
  }

  function _loadTaskDefinition() {
    if(client.isSavedTask()) {
      return client.getConfig();
    }
    return getDefaultTaskDefinition();
  }
}
