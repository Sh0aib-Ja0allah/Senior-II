import { Button, Stack } from '@mui/material'
import React from 'react'

function NavBar() {
  return (
    <Stack direction='row' spacing={3} sx={{justifyContent: 'center'}} >
      <Button variant="outlined" size="small" color='success' href='/' >Home</Button>
      <Button variant="outlined" size="small" color='success' href='patients-list' >Patients List</Button>
      <Button variant="outlined" size="small" color='success' href='add-patient' >Add Patient</Button>
      <Button variant="outlined" size="small" color='success' href='users-list' >Users List</Button>
      <Button variant="outlined" size="small" color='success' href='add-user' >Add User</Button>
      <Button variant="outlined" size="small" color='success' href='about' >About Us</Button>
    </Stack>
  )
}

export default NavBar