import React from 'react'

export function RawFilterDisplay({ filters }) {
  const filterNames = Object.keys(filters)
    .filter(name => filters[name])

  return (
    <div>
      <span className="mx-2">Filters{ filterNames.length ? '' : ' : None' }</span>
      { filterNames.map(f => (
        <span key={f}>
          <span>-></span>
          <span className="mx-2"> {f.charAt(0).toUpperCase() + f.slice(1)} : {filters[f]}</span>
        </span>
      ))}
    </div>
  )
}

const FilterDisplay = React.memo(RawFilterDisplay)

export default FilterDisplay