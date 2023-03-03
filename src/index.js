import {
  intro,
  outro,
  text,
  select,
  isCancel
} from '@clack/prompts'
import colors from 'picocolors'
import { exitProgram } from './utils.js';

import path from 'path';
import fs from 'fs';
import shelljs from 'shelljs';
import { extensionsList, selectOutputExtension } from './extension.js';
import { createFileResult } from './create.js';
import glob from 'glob';

intro(
  colors.inverse(` Asistente para la conversión JSON => CSV y viceversa `)
);

const conversionFiles = await select({
  message: colors.cyan('Selecciona el número de ficheros a convertir:'),
  options: [
    { value: '1', label: '1' },
    { value: '+1', label: 'Más de uno' },
  ]
});

if (isCancel(conversionFiles)) exitProgram()

console.log(conversionFiles);

const outputFormat = await select({
  message: colors.cyan('¿A qué formato quieres convertir el contenido?'),
  options: extensionsList
});

const selectFormat = selectOutputExtension(outputFormat);

console.log(colors.bgBlue(`Select format file(s) is ${selectFormat}`))

if (isCancel(outputFormat)) exitProgram()

console.log(outputFormat);

let pathQuestionText = '';
if (conversionFiles === '1') {
  pathQuestionText = 'Introduce la ruta relativa de la ubicación del fichero:';
} else {
  pathQuestionText = 'Introduce la ruta relativa del directorio de los ficheros a seleccionar:'
}
const file = await text({
  message: colors.cyan(pathQuestionText),
  validate: (value) => {
    if (value.length === 0) {
      return colors.red('El path no puede estar vacío')
    }
  }
})

if (isCancel(file)) exitProgram()

console.log(file);

if (conversionFiles === '1') {
  console.log(shelljs.pwd().stdout);

  let rawdata = fs.readFileSync(
    path.join(shelljs.pwd().stdout, `${file}.${selectFormat}`)
  );

  createFileResult(outputFormat, rawdata);
} else {
  const dirpath = path.join(shelljs.pwd().stdout, file)
  console.log(dirpath);
  
  const getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
  };
  getDirectories(dirpath, function (err, res) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(res);
      const txtFiles = res.filter(el => path.extname(el) === `.${selectFormat}`);
      console.log(txtFiles)

      txtFiles.map((file) => {
        const outputLocation = file.replace(shelljs.pwd().stdout, '').replace('.csv', '').replace('.json', '').replace('/', '').split('/').join('_');
        console.log(colors.bgYellow(outputLocation));
        let rawdata = fs.readFileSync(
          path.join(`${file}`)
        );
        console.log(String(rawdata), selectFormat, outputFormat);

      
        createFileResult(outputFormat, rawdata, outputLocation);
      })
    }
  });

    
    
}
  



outro(
  colors.green('✔️ Conversión realizada con éxito. ¡Gracias por usar el asistente!')
)
