import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import '../Users/User.css'
import CloseIcon from '@mui/icons-material/Close'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function PatientsList() {

  const [patients, setPatients] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState(false)
  
  // when the component mount useEffect() hook.
  useEffect(() => {
    axios.get('https://localhost:7062/api/Patient')
    .then(response => {
      console.log(response.data)
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

  const handleClickOpen = () => {
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
                        <Typography >Password:</Typography>
                        <Typography >{item.password}</Typography>
                      </Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Item>
                        <Typography >Patient disease:</Typography>
                        <Typography >{item.disease}</Typography>
                      </Item>
                    </Grid>
                    {/* <Grid item xs={6}>
                      <Item>
                      <Typography >Id:</Typography>
                      <Typography >{item.id}</Typography>
                      </Item>
                    </Grid> */}
                    <Grid item xs={6}>
                      <Item align= 'center'>
                        <Button variant='contained' onClick={handleClickOpen}>
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
      <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      > 
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Modal title
      </BootstrapDialogTitle>
      <DialogContent dividers>
        test
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  </>
  )
}

export default PatientsList