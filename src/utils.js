export function CreateHandler (handler, property) {
  return (event) => handler( event, property )
}

export const Filters = {
  not: {
    undefined ({ label }) {
      return label !== undefined
    }
  }
}
