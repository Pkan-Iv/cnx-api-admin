import { useEffect } from 'react'

import { useStore } from 'lib/hooks'

import {
  list_pra_acls,
  list_pra_messages,
  list_pra_numbers,
  list_pra_plans,
  list_pra_projects,
  list_pra_resources,
  list_pra_roles
} from './actions'

function useList (resource, getter) {
  const [ state, dispatch ] = useStore(),
        { list } = state

  useEffect( () => {
    dispatch(getter())
  }, [])

  return list[ resource ]
}

export function useAcls () {
  return useList( 'acls', list_pra_acls )
}

export function useMessages () {
  return useList( 'messages', list_pra_messages )
}

export function useNumbers () {
  return useList( 'numbers', list_pra_numbers )
}

export function usePlans () {
  return useList( 'plans', list_pra_plans )
}

export function useProjects () {
  return useList( 'projects', list_pra_projects )
}

export function useResources () {
  return useList( 'resources', list_pra_resources )
}

export function useRoles () {
  return useList( 'roles', list_pra_roles )
}
