import { useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { GetFromStore } from './utils'

export function useCanvas (runtimes = []) {
  const ref = useRef(),
        [ context, setContext ] = useState( null ),
        [ frame, setFrame ] = useState( null )

  function render() {
    const { height, width } = ref.current
    context.clearRect( 0, 0, width, height )

    runtimes.forEach(
      (runtime) => runtime( context, ref.current )
    )

    requestAnimationFrame( render )
  }

  useEffect( () => {
    if (context === null) {
      setContext(ref.current.getContext( '2d' ))
    }
  }, [ context ])

  useEffect( () => {
    if (context !== null) {
      setFrame(requestAnimationFrame( render ))

      return () => {
        cancelAnimationFrame( frame )
      }
    }
  })

  return ref
}

export function useDraggable ({ x = 0, y = 0 }) {
  const ref = useRef(),
        [ coords, setCoords ] = useState({ x, y }),
        [ delta, setDelta ] = useState({ x: null, y: null }),
        [ dragged, setDragged ] = useState( false )

  const [ button, mouse, isOver ] = useMouse( ref.current )

  useEffect( () => {
    if (button === 0 && isOver) {
      setDragged( true )
    }
    else {
      setDelta({ x: null, y: null })
      setDragged( false )
    }
  }, [ button, isOver ])

  useEffect( () => {
    if (dragged && isOver) {
      if (delta.x === null && delta.y === null) {
        setDelta({
          x: mouse.x - coords.x,
          y: mouse.y - coords.y
        })      
      }
      else {
        setCoords({
          x: mouse.x - delta.x,
          y: mouse.y - delta.y
        })
      }
    }
  }, [ delta, dragged, isOver, mouse ])

  return [ coords, dragged, ref ]
}

export function useEventListener({
  callback = null,
  element = window,
  event = null
} = {}) {
  useEffect( () => {
    if (!( element && element.addEventListener ))
      return;

    const listener = (e) => callback( e )

    element.addEventListener( event, listener )

    return () => {
      element.removeEventListener( event, listener )
    }
  }, [ event, element ])
}

export function useKey (element = window) {
  const [ key, setKey ] = useState( null )

  const down = useCallback( (e) => {
    setKey( e.keyCode )
  }, [ key ])

  const up = useCallback( () => {
    setKey( null )
  }, [ key ])

  useEventListener({ callback: down, element, event: 'keydown' })
  useEventListener({ callback: up, element, event: 'keyup' })

  return key
}

export function useMouse (element = window) {
  const [ button, setButton ] = useState( null ),
        [ coords, setCoords ] = useState({ x: 0, y: 0 }),
        [ isOver, setIsOver ] = useState( false )

  const down = useCallback( (e) => {
    setButton( e.button )
  })

  const move = useCallback( ({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY })
  })

  const out = useCallback( (e) => {
    setIsOver( false )
    setButton( null )
  })

  const over = useCallback( (e) => {
    setIsOver( true )
  })

  const up = useCallback( () => {
    setButton( null )
  })

  useEventListener({ callback: down, element, event: 'mousedown' })
  useEventListener({ callback: move, element, event: 'mousemove' })
  useEventListener({ callback: out, element, event: 'mouseout' })
  useEventListener({ callback: over, element, event: 'mouseover' })
  useEventListener({ callback: up, element, event: 'mouseup' })

  return [ button, coords, isOver ]
}

export function useDimensions () {
  const ref = useRef(),
        [ dimensions, setDimensions ] = useState( {} )

  useEffect( () => {
    setDimensions(
      ref.current.getBoundingClientRect().toJSON()
    )
  })

  return [ ref, dimensions ]
}

export function useScreenSize () {
  const [ height, setHeight] = useState( window.innerHeight )
  const [ width, setWidth ] = useState( window.innerWidth )

  const handleResize = () => {
    setHeight( window.innerHeight )
    setWidth( window.innerWidth )
  }

  useEffect(() => {
    window.addEventListener( 'resize', handleResize )

    return () => {
      window.removeEventListener( 'resize', handleResize )
    }
  })

  return [ height, width ]
}

export function useScrollToBottom (reagents = null, margin = 0) {
  const ref = useRef(),
        [ scrollHeight, setScrollHeight ] = useState( 0 )

  function shouldScrollToBottom (node) {
    const { height } = node.getBoundingClientRect().toJSON()

    return (
      (height + margin) !== node.scrollHeight &&
      (node.scrollTop + node.offsetHeight) >= scrollHeight
    )
  }

  useEffect( () => {
    const node = ref.current

    if (shouldScrollToBottom( node )) {
      node.scrollTop = node.scrollHeight
      setScrollHeight( node.scrollHeight )
    }
  }, reagents )

  return ref
}

export function useStore () {
  const dispatch = useDispatch(),
        state = useShallowEqualSelector( (s) => s )

  return [ state, dispatch ]
}

export function useStoreProperty (property) {
  return useSelector(GetFromStore( property ))
}

export function useShallowEqualSelector (selector) {
  return useSelector( selector, shallowEqual )
}
