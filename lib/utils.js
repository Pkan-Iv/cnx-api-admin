import { Factories } from 'fpu'

export const GetFromStore = (name) => (state) => state[ name ]
export const MergeObject = Factories.reduce( (a, b) => ({ ...a, ...b }) )
