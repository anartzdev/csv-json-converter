import { intro, outro, text, select, isCancel } from '@clack/prompts';
import colors from 'picocolors';
import { exitProgram, getOutputFilename } from './utils.js';

import path from 'path';
import fs from 'fs';
import shelljs from 'shelljs';
import {
  selectConversionFilesNumber,
  selectInputOutputFormats,
} from './options-input.js';
import { executeConversion } from './create.js';
import glob from 'glob';

intro(colors.inverse(` Asistente para la conversión JSON => CSV y viceversa `));

const conversionFiles = await selectConversionFilesNumber();

if (isCancel(conversionFiles)) exitProgram();

console.log(conversionFiles);

const {
  input: selectFormat,
  output: outputFormat,
} = await selectInputOutputFormats();

if (isCancel(outputFormat)) exitProgram();

console.log(outputFormat);

let pathQuestionText = '';
if (conversionFiles === '1') {
  pathQuestionText =
    'Introduce la ruta relativa de la ubicación del fichero + nombre fichero:';
} else {
  pathQuestionText =
    'Introduce la ruta relativa del directorio de los ficheros a seleccionar:';
}
const file = await text({
  message: colors.cyan(pathQuestionText),
  validate: (value) => {
    if (value.length === 0) {
      return colors.red('El path no puede estar vacío');
    }
  },
});

if (isCancel(file)) exitProgram();

if (conversionFiles === '1') {
  console.log(shelljs.pwd().stdout);

  const fileReference = `${shelljs.pwd().stdout}/${file}.${selectFormat}`;

  // See if the file exists
  if (fs.existsSync(fileReference)) {
    console.log(
      colors.bgYellow(
        `Abrimos el contenido del fichero antes convertirlo al formato ${outputFormat}:`
      )
    );
    console.log(colors.bgGreen(fileReference));

    /*const rawdata = fs.readFileSync(
      path.join(shelljs.pwd().stdout, `${file}.${selectFormat}`)
    );
    const outputLocation = getFileReference(fileReference);
    createFileResult(outputFormat, rawdata, outputLocation);*/

    executeConversion(
      outputFormat,
      path.join(shelljs.pwd().stdout, `${file}.${selectFormat}`)
    );
  } else {
    exitProgram({
      code: -1,
      message: `No existe el fichero ${fileReference}. No se puede efectuar la conversión de ${selectFormat} a ${outputFormat}`,
    });
  }
} else {
  const dirpath = path.join(shelljs.pwd().stdout, file);
  console.log(dirpath);

  const getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
  };
  getDirectories(dirpath, function (err, res) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(res);
      const txtFiles = res.filter(
        (el) => path.extname(el) === `.${selectFormat}`
      );
      // console.log(txtFiles);

      txtFiles.map((fileReference) => {
        if (fs.existsSync(fileReference)) {
          executeConversion(outputFormat, path.join(`${fileReference}`));
        }
      });
    }
  });
}

outro(
  colors.green(
    '✔️  Conversión realizada con éxito. ¡Gracias por usar el asistente!'
  )
);
