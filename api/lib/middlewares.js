export const ErrorMiddleware = () => (next) => (payload) => {
  try {
    next( payload )
  }
  catch (e) {
    console.error( e )
  }
}

export const LogMiddleware = () => (next) => (payload) => {
  const { type, reason } = payload

  if (type !== undefined) {
    const at = (new Date()).toISOString()

    if (reason === undefined) {
      console.log( at, type, Object.keys( payload ).filter(
        (key) => key !== 'type'
      ))
    }
    else {
      console.log( at, type, reason )
    }
  }

  next( payload )
}
