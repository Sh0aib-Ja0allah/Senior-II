import { Accordion, AccordionDetails, AccordionSummary, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import './User.css'

// My API getting data link:
// axios.get('https://localhost:7030/api/User')

function UsersList() {
  
  const [users, setUsers] = useState([])
  const [expanded, setExpanded] = useState(false);
  
  // when the component mount useEffect() hook.
  useEffect(() => {
    axios.get('https://localhost:7062/api/User')
    .then(response => {
      console.log(response.data)
      setUsers(response.data)
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

  return (
    <Stack direction='column' spacing={2}>
      {
          users && users.length > 0 ?
          users.map((item) => (
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
                      <Typography >User type:</Typography>
                      <Typography >{item.userType}</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <Typography >Phone number:</Typography>
                      <Typography >{item.phoneNumber}</Typography>
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
  )
}

export default UsersList

/* 
 // Material UI Dialog methods:
  const handleClickOpenDelete = (id) => {
    setOpenDelete(true)
    axios.delete(`https://localhost:7030/api/User/${id}`)
    axios.get('https://localhost:7030/api/User')
  }
*/