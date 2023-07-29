import { Stack, Typography } from '@mui/material'
import React from 'react'

function About() {
  return (
    <Stack direction='column'  justifyContent='center' spacing={5}>
      <Stack spacing={3} alignItems='center'>
        <Typography sx={{textAlign: 'start', fontWeight: 'bold'}} width='75%' variant='h4'>
          ABOUT US:
        </Typography>
        <Typography variant='h6' width='75%'>
          In this page you will see some of information about our hardware system, It's connection some knowledge about the interface,
          Screens, Drug medical boxes and the danger places.
        </Typography>
      </Stack>

      <Stack direction='column' spacing={3} alignItems='center'>
        <Typography variant='h6' width='75%'>
          In the down below Image you will see the current status and data for every box, and in the LCD you will see the current date and time.
        </Typography>
        <img style={{width: '1100px', height: '700px'}} src='/assets/1.jpg' alt=''/>
      </Stack>
      
      <Stack direction='column' spacing={3} alignItems='center'>
        <Typography variant='h6' width='75%'>
          In the down below Image you will see the top view of the hardware system and how we connect the components.
        </Typography>
        <img style={{width: '1100px', height: '700px'}} src='/assets/2.jpg' alt=''/>
      </Stack>
    </Stack>
  )
}

export default About