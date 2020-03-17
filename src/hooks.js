import { useEffect } from 'react'

import { useStore } from 'lib/hooks'

import {
  list_pra_messages,
  list_pra_numbers,
  list_pra_plans,
  list_pra_projects,
} from './actions'

export function useMessages () {
  const [ state, dispatch ] = useStore(),
        { list } = state,
        { messages } = list

  useEffect( () => {
    dispatch(list_pra_messages())
  }, [])

  return messages
}

export function useNumbers () {
  const [ state, dispatch ] = useStore(),
        { list } = state,
        { numbers } = list

  useEffect( () => {
    dispatch(list_pra_numbers())
  }, [])

  return numbers
}

export function usePlans () {
  const [ state, dispatch ] = useStore(),
        { list } = state,
        { plans } = list

  useEffect( () => {
    dispatch(list_pra_plans())
  }, [])

  return plans
}

export function useProjects () {
  const [ state, dispatch ] = useStore(),
        { list } = state,
        { projects } = list

  useEffect( () => {
    dispatch(list_pra_projects())
  }, [])

  return projects
}
