import React from 'react'

export function RawScoreHeader({ h1, h2, h3, h4, h5, name, onClick = () => {}}) {
  let element
  if (h1) {
    element=<h1 onClick={onClick}>{name}</h1>
  } else if (h2) {
    element=<h2 onClick={onClick}>{name}</h2>
  } else if (h3) {
    element=<h3 onClick={onClick}>{name}</h3>
  } else if (h4) {
    element=<h4 onClick={onClick}>{name}</h4>
  } else if (h5) {
    element=<h5 onClick={onClick}>{name}</h5>
  } else {
    element=<h6 className="mt-1 mb-0 col-12" onClick={onClick}>{name}</h6>
  }

  return element
}

const ScoreHeader = React.memo(RawScoreHeader)

export default ScoreHeader