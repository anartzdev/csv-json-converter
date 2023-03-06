import { outro } from '@clack/prompts'
import colors from 'picocolors';
import shelljs from 'shelljs';

export function exitProgram ({ code = 0, message = 'No se ha realizado la conversión, prueba de nuevo' } = {}) {
  outro(colors.yellow(message))
  process.exit(code)
}

export const getOutputFilename = (fileReference) => {
  return fileReference.replace(shelljs.pwd().stdout, '')
  .replace('.csv', '')
  .replace('.json', '')
  .replace('/', '')
  .split('/')
  .join('_');
}
