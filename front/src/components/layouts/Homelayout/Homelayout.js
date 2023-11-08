import React from 'react'
import { Outlet } from 'react-router-dom'

const Homelayout = () => {
  return (
    <main
      className="d-flex flex-direction-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh"
      }}
    >
      <Outlet />
    </main>
  )
}

export default Homelayout
