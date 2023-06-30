import { Button } from '@mui/material';
import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

function ErrorElement() {
  const navigate = useNavigate()
  const error = useRouteError()
  console.log("this" + error);
  return (
    <div >
      <h1> {"" + error}</h1>
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </div>
  )
}

export default ErrorElement