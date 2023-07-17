import { Accordion, AccordionDetails, AccordionSummary, Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ImageIcon from '@mui/icons-material/Image'
import WorkIcon from '@mui/icons-material/Work'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'

// My API getting data link:
// axios.get('https://localhost:7030/api/User')

function UsersList() {
  
  const [users, setUsers] = useState([])
  const [expanded, setExpanded] = useState(false);
  
  // when the component mount useEffect() hook.
  useEffect(() => {
    axios.get('https://localhost:7030/api/User')
    .then(response => {
      console.log(response.data)
      setUsers(response.data)
    })
    .catch(error => {
      console.error(error)
    })
  })
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  return (
    <Stack direction='column' spacing={2}>
      <Accordion elevation={10} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Name: user.name</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction='row' spacing={3} width='50%'>
            <img
            src="https://th.bing.com/th/id/R.1cbb98eb48f3c79a6eb8a8dbaa659147?rik=kCSsvCtt7aqdoQ&pid=ImgRaw&r=0"
            alt="Accordion Image"
            style={{ marginRight: '1rem', width: '50%', borderRadius: '50px', height: '100%'}}
            />
            <Stack direction='row' width='50%'>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Work" secondary="Jan 7, 2014" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>
              </List>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
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