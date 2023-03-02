import { csvToJSON } from './csv.js';
import fs from 'fs';
const createCSV = (data) => {
  const convertData = extractAllJsonValues(JSON.parse(data));
  console.log(convertData);
  let csv = `key,value`;
  convertData.forEach((item) => {
    csv = csv + `\n${item.key},${item.value}`;
  });

  console.log(csv);
  createFile(csv, 'csv');
};

const createJSON = (data) => {
  const jsonFormat = csvToJSON(data);
  createFile(jsonFormat, 'json');
};

const createFile = (data, extension) => {
  // TODO check if CSV / JSON folders exist
  fs.writeFileSync(`./${new Date().toISOString()}_file.${extension}`, data);
};

const createFileResult = (outputExtension, rawdata) => {
  if (!['csv', 'json'].includes(outputExtension)) {
    throw new Error('need pass correct extension please: csv or json');
  }
  const dataStr = String(rawdata);
  outputExtension !== 'csv' ? createCSV(dataStr) : createJSON(dataStr);
};


export { createCSV, createFile, createFileResult, createJSON};