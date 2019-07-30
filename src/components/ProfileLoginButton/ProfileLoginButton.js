import React from 'react';
import { useKeycloak } from 'react-keycloak'
import Button from 'react-bootstrap/Button'

const ProfileLoginButton = React.memo(() => {
  const { keycloak } = useKeycloak();

  let handleClick
  let text

  if (!keycloak.authenticated) {
    handleClick = () => keycloak.login()
    text = "Login"
  } else {
    handleClick = () => keycloak.logout()
    text = "Logout"
  }
  
  return (
    <Button
      onClick={handleClick}
      size='sm'
      variant='outline-primary'
    >
      {text}
    </Button>
  )
})

export default ProfileLoginButton;