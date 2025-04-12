export const logger = {
  info: (message: string, ...optionalParams: any[]): void => {
    console.info(timestamp() + ' [INFO] ' + message, ...optionalParams)
  },
  debug: (message: string, ...optionalParams: any[]): void => {
    console.debug(timestamp() + ' [DEBUG] ' + message, ...optionalParams)
  },
  warn: (message: string, ...optionalParams: any[]): void => {
    console.warn(timestamp() + ' [WARN] ' + message, ...optionalParams)
  },
  error: (message: string, ...optionalParams: any[]): void => {
    console.error(timestamp() + ' [ERROR] ' + message, ...optionalParams)
  }
}

function timestamp(): string {
  return new Date().toISOString()
}
