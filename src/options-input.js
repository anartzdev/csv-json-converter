import {
    text,
    select,
  } from '@clack/prompts';
import colors from 'picocolors';
import { extensionsList, selectOutputExtension } from './extension.js';

const selectConversionFilesNumber = async () =>
  await select({
    message: colors.cyan('Selecciona el número de ficheros a convertir:'),
    options: [
      { value: '1', label: '1' },
      { value: '+1', label: 'Más de uno' },
    ],
  });

const selectInputOutputFormats = async() => {
    const output = await select({
        message: colors.cyan('¿A qué formato quieres convertir el contenido?'),
        options: extensionsList
      });
      
    const input = selectOutputExtension(output);
    return {
        input,
        output
    }
}
  

  export { selectConversionFilesNumber, selectInputOutputFormats };