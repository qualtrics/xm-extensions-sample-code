// CAUTION - customize piped text at your own risk as the values and structure may be (however unlikely) subject to change
export function addCustomPipedTextOptions(defaultPipedTextOptions) {
  const panelPipedTextIndexPosition = 5;
  const afterEmailIndexPosition = 3;
  const howManyElementsToRemove = 0;
  const recipientPhoneNumberPipedTextOption =
    {
      label: 'Recipient Phone Number',
      value: {
        locator: '${m://Phone}'
      }
    };

  defaultPipedTextOptions[panelPipedTextIndexPosition]
    .submenu
    .items
    .splice(
      afterEmailIndexPosition,
      howManyElementsToRemove,
      recipientPhoneNumberPipedTextOption
    );

  return defaultPipedTextOptions;
}
