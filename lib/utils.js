import { Factories } from 'fpu'

export const MergeObject = Factories.reduce( (a, b) => ({ ...a, ...b }) )
