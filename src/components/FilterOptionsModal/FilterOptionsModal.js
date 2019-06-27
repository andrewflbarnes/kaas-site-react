import React from 'react'
import Modal from 'react-bootstrap/Modal'
import FilterOptions from '../FilterOptions'

export function RawFilterOptionsModal({ onHide, onFilterActivated, show }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <FilterOptions onFilterActivated={onFilterActivated} />
      </Modal.Body>
    </Modal>
  )
}

const FilterOptionsModal = React.memo(RawFilterOptionsModal)

export default FilterOptionsModal