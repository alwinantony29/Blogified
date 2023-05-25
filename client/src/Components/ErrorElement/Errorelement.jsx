import { Button } from '@mui/material';
import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

function Errorelement() {
  const navigate = useNavigate()
  const error = useRouteError()
  console.log(error);
  return (
    <div>
      {error.data}
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </div>
  )
}

export default Errorelement