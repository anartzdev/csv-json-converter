#!/usr/bin/env node



// TODO Add all imports that use witj principal options from library root

// Example (after remove)

export const sum = (first: number, second: number): number => first + second;

import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

import shelljs from 'shelljs';
import { ObjectProperties } from './object-properties';

/////////////////////////////////////////////////////////////////////////////////////
// Object properties (./object-properties/index)




//////////////////////////////////////////////////////////////////////////////////////
// JSON file (./json/index)
// To use in convert JSON to CSV

// Extract values of path in different levels
function extractKeysInsideObjectProperties(o: any, path = ''): any {
  if (!o || typeof o !== 'object') return path;
  return Object.keys(o).map((key) =>
    extractKeysInsideObjectProperties(
      o[key],
      path ? [path, key].join('.') : key
    )
  );
}

// Extract all values complete paths to take info
export const objectPaths = (o: object) => {
  return extractKeysInsideObjectProperties(o).toString().split(',');
};

/**
 * 
 * @param json All JSON Info
 * @returns Array with objects that take key and value properties
 * <{
    key: string;
    value: string;
  }>
 */
export const extractAllJsonValues = (json: any) => {
  console.log(json);
  console.log(objectPaths(json))
  return objectPaths(json).map((item: any) => {
    return {
      key: item,
      value: ObjectProperties.getObjectProperty(json, item),
    };
  });
};


// CSV file (./csv/index)


export function csvToJSON(csv: string) {
  var lines = csv.split('\n');

  let jsonObject = {};
  for (var i = 1; i < lines.length; i++) {
    // Take key option and next all text.
    var currentline = lines[i].split(',', 2);
    // console.log('209', currentline);

    // const keys = currentline[0].split('.');
    ObjectProperties.setObjectProperty(
      jsonObject,
      currentline[0],
      currentline[1]
    );
  }

  //return result; //JavaScript object
  return JSON.stringify(jsonObject); //JSON
}



// Script
const selectOutputExtension = (readFileExtension: 'csv' | 'json') => {
  return readFileExtension === 'csv' ? 'json' : 'csv';
};

const createCSV = (data: string) => {
  const convertData = extractAllJsonValues(JSON.parse(data));
  console.log(convertData);
  let csv = `key,value`;
  convertData.forEach((item: { key: string; value: string }) => {
    csv = csv + `\n${item.key},${item.value}`;
  });

  console.log(csv);
  createFile(csv, 'csv');
};

const createJSON = (data: string) => {
  const jsonFormat = csvToJSON(data);
  createFile(jsonFormat, 'json');
};

const createFile = (data: string, extension: string) => {
  // TODO check if CSV / JSON folders exist
  fs.writeFileSync(
    `./${new Date().toISOString()}_file.${extension}`,
    data
  );
};

const createFileResult = (outputExtension: 'csv' | 'json', rawdata: Buffer) => {
  const dataStr = String(rawdata);
  outputExtension !== 'csv' ? createCSV(dataStr) : createJSON(dataStr);
};

const getExtractFormatData = (outputFormat: string) => {
  return outputFormat === 'csv' ? 'json' : 'csv';
};

const QUESTIONS = [
  {
    name: 'output',
    type: 'list',
    message: '¿A qué formato quieres convertir?',
    choices: [
      { value: 'json', name: 'JSON' },
      { value: 'csv', name: 'CSV' },
    ],
  },
  {
    name: 'file',
    type: 'input',
    message: '¿Cuál es el nombre del fichero?',
  },
];

inquirer.prompt(QUESTIONS).then((answers) => {
  const outputFormat = answers['output'];
  const file = answers['file'];
  console.log(answers);
  console.log(shelljs.pwd().stdout);

  let rawdata = fs.readFileSync(
    path.join(shelljs.pwd().stdout, `${file}.${getExtractFormatData(outputFormat)}`)
  );

  createFileResult(selectOutputExtension(outputFormat), rawdata);
});
