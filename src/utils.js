import { outro } from '@clack/prompts'
import colors from 'picocolors'

export function exitProgram ({ code = 0, message = 'No se ha realizado la conversión, prueba de nuevo' } = {}) {
  outro(colors.yellow(message))
  process.exit(code)
}
