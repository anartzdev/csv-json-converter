// Script
export const selectOutputExtension = (readFileExtension) => {
  if (!['csv', 'json'].includes(readFileExtension)) {
    throw new Error('need pass correct extension please: csv or json');
  }
  return readFileExtension === 'csv' ? 'json' : 'csv';
};

export const getExtractFormatData = (outputFormat) => {
  if (!['csv', 'json'].includes(outputFormat)) {
    throw new Error('need pass correct extension please: csv or json');
  }
  return outputFormat === 'csv' ? 'json' : 'csv';
};
