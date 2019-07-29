import isEqual from 'react-fast-compare'

/**
 * Note that both props and state are processed the same - as a result if you only
 * want to check state changes you can use the first 3 arguments.
 * 
 * Similarly when checking both state and props it doesn't matter whether you
 * provide the state related args first or the prop related args first.
 * 
 * @param {*} props
 * @param {*} nextProps
 * @param {*} propNames
 * @param {*} state
 * @param {*} nextState
 * @param {*} stateNames
 */
export function havePropsOrStateChanged(props = {}, nextProps = {}, propNames = [], state = {}, nextState = {}, stateNames = []) {
  let shouldRender = false
  propNames.forEach(name => {
    shouldRender = shouldRender || !isEqual(props[name], nextProps[name])
  })

  if (!shouldRender) {
    stateNames.forEach(name => {
      shouldRender = shouldRender || !isEqual(state[name], nextState[name])
    })
  }

  return shouldRender
}


export function arePropsOrStateStillUndefined(props = {}, nextProps = {}, propNames = [], state = {}, nextState = {}, stateNames = []) {
  let wasDefined = true
  let isDefined = true
  propNames.forEach(name => {
    wasDefined = wasDefined && props[name]
    isDefined = isDefined && nextProps[name]
  })

  if (!wasDefined && !isDefined) {
    stateNames.forEach(name => {
      wasDefined = wasDefined && state[name]
      isDefined = isDefined && nextState[name]
    })
  }

  return !wasDefined && !isDefined
}