// Script
export const selectOutputExtension = (readFileExtension) => {
  if (!['csv', 'json'].includes(readFileExtension)) {
    throw new Error('need pass correct extension please: csv or json');
  }
  return readFileExtension === 'csv' ? 'json' : 'csv';
};


export const extensionsList =[
  { value: 'json', label: 'JSON' },
  { value: 'csv', label: 'CSV' },
]