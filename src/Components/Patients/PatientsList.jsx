import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Dialog, Grid, IconButton, Slide, Stack, Toolbar, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import '../Users/User.css'
import CloseIcon from '@mui/icons-material/Close'
import Process from './Process'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})

function PatientsList() {

  const [patients, setPatients] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState(false)
  const [Name, setName] = useState("")
  
  // when the component mount useEffect() hook.
  useEffect(() => {
    axios.get('https://localhost:7062/api/Patient')
    .then(response => {
      // console.log("Patient List",response.data)
      setPatients(response.data)
    })
    .catch(error => {
      console.error(error)
    })
  }, [])
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text,
  }))

  const handleClickOpen = (Name) => {
    setName(Name)
    // console.log("Patient Name: ", Name)
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Stack direction='column' spacing={2}>
        {
            patients && patients.length > 0 ?
            patients.map((item) => (
              <Accordion id={item.id} key={item.name} elevation={10} expanded={expanded === item.id} onChange={handleChange(item.id)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id={item.id}
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>Name: {item.name}</Typography>
                </AccordionSummary>

                <AccordionDetails >
                  <Stack 
                  display='flex'
                  direction='row'
                  justifyContent='space-evenly'
                  alignItems='center'
                  spacing={3} 
                  width='100%'
                  >
                  <div className="UserImageContainer">
                    <img 
                    className='UserImage'
                    src={
                      item.photo ===  "" ? "https://th.bing.com/th/id/OIP.64GEkhZ7oG2up_WZ-E2lRgHaE8?pid=ImgDet&rs=1" : item.photo
                    }
                    alt='User Profile.'
                    />
                  </div>
                  <Grid container spacing={8}>
                    <Grid item xs={6}>
                      <Item>
                        <Typography >Email:</Typography>
                        <Typography >{item.email}</Typography>
                      </Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Item>
                        <Typography >Phone Number:</Typography>
                        <Typography >{item.phoneNumber}</Typography>
                      </Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Item>
                        <Typography >Patient disease:</Typography>
                        <Typography >{item.disease}</Typography>
                      </Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Item align= 'center'>
                        {/* <Button color='success' variant='contained' onClick={handleClickOpen(item.name)}> */}
                        <Button color='success' variant='contained' onClick={() => handleClickOpen(item.name)}>
                          Start a healing process
                        </Button>
                      </Item>
                    </Grid>
                  </Grid>
                  </Stack>
                </AccordionDetails>
              </Accordion>

            ))
            : 'There is no data.'
          }
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
              Starting a patient healing process for {Name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {/* Pass the patient name as a prop to the Process component */}
        <Process patientName={Name} />
      </Dialog>
  </>
  )
}

export default PatientsList