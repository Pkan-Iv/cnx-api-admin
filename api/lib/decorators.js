import Microtime from 'microtime'

export function Chronomize (name, callback) {
  return (...args) => {
    const begin = Microtime.now(),
          result = callback( ...args ),
          duration = Microtime.now() - begin

    console.log( `${name} ${duration}us` )
    return result
  }
}
