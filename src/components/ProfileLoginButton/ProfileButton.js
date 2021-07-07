import React from 'react';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import { func, string } from 'prop-types'

const propTypes = {
  onClick: func.isRequired,
  username: string.isRequired
}

const ProfileButton = React.memo(({ username, onClick }) => {
  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="outline-primary" className='d-flex py-0 px-1 align-items-center' size='sm' href='#profile'>
        <i className="material-icons md-48">account_circle</i>
        <span className="d-none d-md-flex">&nbsp;{username}</span>
      </Button>
    
      <Dropdown.Toggle
        split
        variant="outline-primary"
        size='sm'
      />
    
      <Dropdown.Menu
        alignRight
        className='bg-dark'
      >
        <Dropdown.Item
          className='text-primary'
          eventKey="profile"
          href='#profile'
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          className='text-primary'
          onClick={onClick}
          eventKey="logout"
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
})

ProfileButton.propTypes = propTypes

export default ProfileButton;