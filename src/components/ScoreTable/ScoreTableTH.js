import React from 'react'
import { string, shape } from 'prop-types';

const propTypes = {
  text: string.isRequired,
  style: shape({
    width: string
  }),
  className: string,
}

const defaultProps = {
  style: {},
  className: ''
}

const ScoreTableTH = React.memo(({ text, style, className }) => {
  return (
    <th
      style={style}
      className={`${className} px-0`}>
      {text}
    </th>
  )
})

ScoreTableTH.propTypes = propTypes
ScoreTableTH.defaultProps = defaultProps

export default ScoreTableTH