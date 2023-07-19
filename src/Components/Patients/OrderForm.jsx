import { Autocomplete, Button, Stack, TextField } from '@mui/material'
import React, {useState} from 'react'
import axios from 'axios'

function OrderForm() {

    const [FirstStartTimeInMinute, setFirstStartTimeInMinute] = useState(0)
    const [FirstStartTimeInHours, setFirstStartTimeInHours] = useState(0)
    const [SecondStartTimeInMinute, setSecondStartTimeInMinute] = useState(0)
    const [SecondStartTimeInHours, setSecondStartTimeInHours] = useState(0)
    const [ThirdStartTimeInMinute, setThirdStartTimeInMinute] = useState(0)
    const [ThirdStartTimeInHours, setThirdStartTimeInHours] = useState(0)
    const [BoxMedicineType, setBoxMedicineType] = useState(' ')
    const [Amount, setAmount] = useState(0)
  
    const handleSubmit = (e) => {
      const data = {
        "FirstStartTimeInMinute" : FirstStartTimeInMinute,
        "FirstStartTimeInHours" : FirstStartTimeInHours,
        "SecondStartTimeInMinute" : SecondStartTimeInMinute,
        "SecondStartTimeInHours" : SecondStartTimeInHours,
        "ThirdStartTimeInMinute" : ThirdStartTimeInMinute,
        "ThirdStartTimeInHours" : ThirdStartTimeInHours,
        "BoxMedicineType" : BoxMedicineType,
        "Amount" : Amount,
      }
      e.preventDefault()
        axios
        .post('https://localhost:7062/api/Order', data, {
          headers: {
            'Accept': 'application/json',
            // 'Access-Control-Allow-Origin': 'http://localhost:3000'
          }
        })
        .then((response) => {
          axios.get('https://localhost:7062/api/Order')
          console.log(response.data)
          // Reset the state variables to empty strings after submit.
          setFirstStartTimeInMinute(0)
          setFirstStartTimeInHours(0)
          setBoxMedicineType('')
          setSecondStartTimeInMinute(0)
          setSecondStartTimeInHours(0)
          setThirdStartTimeInMinute(0)
          setThirdStartTimeInHours(0)
          setAmount(0)
        })
        .catch((error) => {
            console.log(error.message)
        })
   } // end handleSubmit function.
  
   const BoxMedicineTypeOptions = [
    "",
    "Paracetamol",
    "Ibuprofen",
    "Aspirin"
   ]

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
            <TextField value={FirstStartTimeInMinute} onChange={(e) => setFirstStartTimeInMinute(e.target.value)} label='First Start Time In Minute' required size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
            <TextField value={FirstStartTimeInHours} onChange={(e) => setFirstStartTimeInHours(e.target.value)} label='First Start Time In Hours' required size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
          </Stack>
          <Stack direction='row' spacing={4} >
            <TextField value={SecondStartTimeInMinute} onChange={(e) => setSecondStartTimeInMinute(e.target.value)} label='Second Start Time In Minute' size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
            <TextField value={SecondStartTimeInHours} onChange={(e) => setSecondStartTimeInHours(e.target.value)} label='Second Start Time In Hours' size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
          </Stack>
          <Stack direction='row' spacing={4} >
            <TextField value={ThirdStartTimeInMinute} onChange={(e) => setThirdStartTimeInMinute(e.target.value)} label='Third Start Time In Minute' size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
            <TextField value={ThirdStartTimeInHours} onChange={(e) => setThirdStartTimeInHours(e.target.value)} label='Third Start Time In Hours' size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
          </Stack>
          <Stack direction='row' spacing={4} >
              <Autocomplete
                disablePortal
                sx={{ width: '30ch' }}
                value={BoxMedicineType}
                options={BoxMedicineTypeOptions}
                onChange={(e) => setBoxMedicineType(e.target.value)}
                renderInput={(params) => <TextField required {...params} label="Box Medicine Type" />}
              />
            {/* <TextField value={BoxMedicineType} onChange={(e) => setBoxMedicineType(e.target.value)} label='Box Medicine Type' required size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='text'/> */}
            <TextField value={Amount} onChange={(e) => setAmount(e.target.value)} label='Amount' size='medium' required sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
          </Stack>
          <Stack direction='row' display='flex' width='45%' justifyContent='start'>
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

export default OrderForm