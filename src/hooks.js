import { useEffect } from 'react'

import { useStore } from 'lib/hooks'
import { get_languages, get_projects, get_types } from './actions'

export function useLanguages () {
  const [ state, dispatch ] = useStore(),
        { list } = state,
        { languages } = list

  useEffect( () => {
    dispatch(get_languages())
  }, [])

  return languages
}

export function useProjects () {
  const [ state, dispatch ] = useStore(),
        { list } = state,
        { projects } = list

  useEffect( () => {
    dispatch(get_projects())
  }, [])

  return projects
}

export function useTypes () {
  const [ state, dispatch ] = useStore(),
        { list } = state,
        { types } = list

  useEffect( () => {
    dispatch(get_types())
  }, [])

  return types
}
