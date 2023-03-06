import { csvToJSON } from './csv.js';
import { extractAllJsonValues } from './json.js';
import fs from 'fs';
import { getOutputFilename } from './utils.js';


const createCSV = (data, name) => {
  const convertData = extractAllJsonValues(JSON.parse(data));
  console.log(convertData);
  let csv = `key,value`;
  convertData.forEach((item) => {
    csv = csv + `\n${item.key},${item.value}`;
  });

  console.log(csv);
  createFile(csv, 'csv', name);
};

const createJSON = (data, name) => {
  const jsonFormat = csvToJSON(data);
  createFile(jsonFormat, 'json', name);
};

const createFile = (data, extension, fileName) => {
  // TODO check if CSV / JSON folders exist
  fs.writeFileSync(`./${fileName}.${extension}`, data);
};

const createFileResult = (outputExtension, rawdata, name) => {
  if (!['csv', 'json'].includes(outputExtension)) {
    throw new Error('need pass correct extension please: csv or json');
  }
  const dataStr = String(rawdata);
  outputExtension === 'csv' ? createCSV(dataStr, name) : createJSON(dataStr, name);
  console.log('CREATE FILE =====>', name.concat(`.${outputExtension}`));
};

const executeConversion = (outputFormat, fileReference) => {
  const rawdata = fs.readFileSync( fileReference );
  const outputLocation = getOutputFilename(fileReference);
  createFileResult(outputFormat, rawdata, outputLocation);
}


export { createCSV, createFile, createFileResult, createJSON, executeConversion};