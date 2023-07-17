import React, { useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'

//axios is used to fetch and post api data.
import axios from 'axios'
// axios headers for api calling.
axios.defaults.headers.common['Accept'] = 'application/json'
// axios.defaults.headers.common['Origin'] = 'http://localhost:3000'

function AddPatient() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [disease, setDisease] = useState('')
  const [photo, setPhoto] = useState('')

  const handleSubmit = (e) => {
    const data = {
      "name" : name,
      "email" : email,
      "password" : password,
      "phone" : phone,
      "disease" : disease,
      "photo" : photo,
    }
    e.preventDefault()
      axios
      .post('https://localhost:7062/api/Patient', data, {
        headers: {
          'Accept': 'application/json',
          // 'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
      })
      .then((response) => {
        axios.get('https://localhost:7062/api/Patient')
        console.log(response.data)
        // Reset the state variables to empty strings after submit.
        setName('')
        setEmail('')
        setPassword('')
        setPhone('')
        setDisease('')
        setPhoto('')
      })
      .catch((error) => {
          console.log(error.message)
      })
 } // end handleSubmit function.

  return (
    <form action="" onSubmit={handleSubmit}>
      <Stack 
      direction='column'
        sx={{
          marginTop: '50px',
          // justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
        spacing={4}
      >
        <Stack direction='row' spacing={4} >
          <TextField value={name} onChange={(e) => setName(e.target.value)} label='Name' required size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='text'  />
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} label='Email' required size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='email'   />
        </Stack>
        <Stack direction='row' spacing={4} >
          <TextField value={password} onChange={(e) => setPassword(e.target.value)} label='Password' required size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='text'   />
          <TextField value={phone} onChange={(e) => setPhone(e.target.value)} label='Phone Number' required size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='text'   />
        </Stack>
        <Stack direction='row' spacing={4} >
          <TextField onChange={(e) => setDisease(e.target.value)} value={disease} label='Disease' required size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='text'   />
          <TextField onChange={(e) => setPhoto(e.target.value)} value={photo} label='Patient Photo URL' helperText= 'Optional field' size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='text'   />
        </Stack>
        <Stack direction='row' spacing={4}>
        <Button
          type='submit' color='success' variant='contained' size='large'
          sx={{my: '15px'}}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default AddPatient