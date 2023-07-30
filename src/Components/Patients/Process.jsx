import { AppBar, Button, Dialog, IconButton, Slide, Stack, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import BasicTable from './BasicTable'
import CloseIcon from '@mui/icons-material/Close'
import OrderForm from './OrderForm'
function Process({ patientName }) {

  const [Box, setBox] = useState('not Selected')
  const Box1 = '4e8fbadf3d5'
  const Box2 = 'e8fbadf3d50'
  const Box3 = '8fbadf3d501'
  
  const handleButtonClick = (Box) => {
    setBox(Box)
    setOpen(true)
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  })

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
    setBox('')
  }
  
  // console.log("patient name from process component: \n", patientName)
  // console.log('button clicked,\n', "Box ID:", Box)
  
  return (
    <Stack >
        <Stack sx={{marginTop: '50px', marginLeft: '50px'}} direction='column' spacing={5}>
            <Typography variant='h5'>Select a box to start a process from it:</Typography>
            <Stack direction='row' justifyContent='start' width='100%' spacing={3}>
              <Button variant='contained' color='success' size='medium' onClick={() => handleButtonClick(Box1)}>Box 1</Button>
              <Button variant='contained' color='success' size='medium' onClick={() => handleButtonClick(Box2)}>Box 2</Button>
              <Button variant='contained' color='success' size='medium' onClick={() => handleButtonClick(Box3)}>Box 3</Button>
            </Stack>
            <hr style={{width: '96%'}} />
        </Stack>
        <Stack direction='column' spacing={3} sx={{marginTop: '50px',}}>
            <Typography sx={{marginLeft: '50px'}} variant='h5'>Orders History:</Typography>
            <BasicTable />
        </Stack>
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#1b5e20' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Order Data:
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <OrderForm PK={Box} patientName={patientName} />
      </Dialog>
    </Stack>
  )
}

export default Process