import React from 'react';
import Button from 'react-bootstrap/Button'
import { func } from 'prop-types'

const propTypes = {
  onClick: func.isRequired
}

const LoginButton = React.memo(({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      size='sm'
      variant='outline-primary'
    >
      Login
    </Button>
  )
})

LoginButton.propTypes = propTypes

export default LoginButton;