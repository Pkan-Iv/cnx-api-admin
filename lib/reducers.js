import { CreateReducer } from './factories'

export const ActionReducer = CreateReducer( '', (s, p) => p.type )(
  // Without mutators, always return type (descriptor) from payload (p) as response !
)
