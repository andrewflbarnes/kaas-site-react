import React from 'react'
import { useKeycloak } from 'react-keycloak';

// Mobile device navbar which expands to a desktop navbar at the md breakpoint
// The somewhat convoluted layout ensures
// - correct center alignment in mobile layout
// - correct collapse transitioning in mobile layout
// - correct start/end alignment in desktop layout
const AdministrationDashboard = React.memo(() => {
  const { keycloak } = useKeycloak()
  return (
    <>
      {keycloak.authenticated
        ? <h1>Authorised</h1>
        : <h1>Unauthorised - please login</h1>
      }
    </>
  )
})

export default AdministrationDashboard