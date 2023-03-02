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
import { getExtractFormatData, selectOutputExtension } from './extension.js';
import { createFileResult } from './create.js';

intro(
  colors.inverse(` Asistente para la conversión JSON => CSV y viceversa `)
)

const outputFormat = await select({
  message: colors.cyan('Selecciona el tipo de commit:'),
  options: [
    { value: 'json', label: 'JSON' },
    { value: 'csv', label: 'CSV' },
  ]
});

if (isCancel(outputFormat)) exitProgram()

console.log(outputFormat);

const file = await text({
  message: colors.cyan('Introduce la ruta relativa de la ubicación del fichero:'),
  validate: (value) => {
    if (value.length === 0) {
      return colors.red('El mensaje no puede estar vacío')
    }

    if (value.length > 250) {
      return colors.red('El mensaje no puede tener más de 250 caracteres')
    }
  }
})

if (isCancel(file)) exitProgram()

console.log(file);

  console.log(shelljs.pwd().stdout);

  let rawdata = fs.readFileSync(
    path.join(shelljs.pwd().stdout, `${file}.${getExtractFormatData(outputFormat)}`)
  );

  createFileResult(selectOutputExtension(outputFormat), rawdata);



outro(
  colors.green('✔️ Conversión realizada con éxito. ¡Gracias por usar el asistente!')
)
