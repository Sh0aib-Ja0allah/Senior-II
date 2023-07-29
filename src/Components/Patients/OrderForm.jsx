import { Autocomplete, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
// Firebase imports:
import {db} from '../../firebase'
import {uid} from 'uid'
import {
  // set, 
  ref, 
  onValue, 
  // remove, 
  update
} from 'firebase/database'
import BasicTable from './BasicTable'

function OrderForm({PK, patientName}) {

  console.log('PK from order comp:', PK)
  console.log('Patient name from Order form:', patientName)

    const [FirstStartTimeInMinute, setFirstStartTimeInMinute] = useState(0)
    const [FirstStartTimeInHours, setFirstStartTimeInHours] = useState(0)
    const [FirstAmount, setFirstAmount] = useState(0)
    const [SecondStartTimeInMinute, setSecondStartTimeInMinute] = useState(0)
    const [SecondStartTimeInHours, setSecondStartTimeInHours] = useState(0)
    const [SecondAmount, setSecondAmount] = useState(0)
    const [ThirdStartTimeInMinute, setThirdStartTimeInMinute] = useState(0)
    const [ThirdStartTimeInHours, setThirdStartTimeInHours] = useState(0)
    const [ThirdAmount, setThirdAmount] = useState(0)
    const [BoxMedicineType, setBoxMedicineType] = useState(' ')
    const [VacuumBoxNum, setVacuumBoxNum] = useState(' ')
    const [PatientName, setPatientName] = useState(patientName)

    const [orders, setOrders] = useState([])
    const [isEdited, setIsEdited] = useState(false)
    // const [tempUuid, setTempUuid] = useState("")
  
    const handleSubmit = (e) => {
      const data = {
        "FirstStartTimeInMinute" : FirstStartTimeInMinute,
        "FirstStartTimeInHours" : FirstStartTimeInHours,
        "FirstAmount" : FirstAmount,
        "SecondStartTimeInMinute" : SecondStartTimeInMinute,
        "SecondStartTimeInHours" : SecondStartTimeInHours,
        "SecondAmount" : SecondAmount,
        "ThirdStartTimeInMinute" : ThirdStartTimeInMinute,
        "ThirdStartTimeInHours" : ThirdStartTimeInHours,
        "ThirdAmount" : ThirdAmount,
        "BoxMedicineType" : BoxMedicineType,
        "PatientName" : PatientName,
        "VacuumBoxNum": VacuumBoxNum
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
      setBoxMedicineType('')
      setFirstStartTimeInMinute(0)
      setFirstStartTimeInHours(0)
      setFirstAmount(0)
      setSecondStartTimeInMinute(0)
      setSecondStartTimeInHours(0)
      setSecondAmount(0)
      setThirdStartTimeInMinute(0)
      setThirdStartTimeInHours(0)
      setThirdAmount(0)
    })
    .catch((error) => {
        console.log(error.message)
    })
   } // end handleSubmit function.
  
  //  Realtime Firebase codes:
  // Write on Realtime Firebase:
  // const writeOnDatabase = () => {
  //   const uuid = uid()

  //   set(ref(db, `/${uuid}`), {
  //       FirstStartTimeInMinute,
  //       FirstStartTimeInHours,
  //       FirstAmount,
  //       SecondStartTimeInMinute,
  //       SecondStartTimeInHours,
  //       SecondAmount,
  //       ThirdStartTimeInMinute,
  //       ThirdStartTimeInHours,
  //       ThirdAmount,
  //       VacuumBoxNum,
  //       uuid,
  //   })
  //   console.log("Data written successfully")
  // }

  // Read from Realtime Firebase:
  useEffect(() => {
    onValue(ref(db), snapshot => {
        const data = snapshot.val()
        if(data !== null){
            Object.values(data).map(order => setOrders(oldArray => [...oldArray, order]))
        }
        console.log("Firebase Data: \n",data)
    })
  }, [])
  
  // Update the Realtime Firebase:
  // const handleUpdate = (order) => {
  //   setIsEdited(true)
  //   // setTempUuid(order.uuid)
  //   setFirstStartTimeInMinute(order.FirstStartTimeInMinute)
  //   setFirstStartTimeInHours(order.FirstStartTimeInHours)
  //   setFirstAmount(order.FirstAmount)
  //   setSecondStartTimeInMinute(order.SecondStartTimeInMinute)
  //   setSecondStartTimeInHours(order.FirstStartTimeInHours)
  //   setSecondAmount(order.SecondAmount)
  //   setThirdStartTimeInMinute(order.ThirdStartTimeInMinute)
  //   setThirdStartTimeInHours(order.ThirdStartTimeInHours)
  //   setThirdAmount(order.ThirdAmount)
  //   setVacuumBoxNum(order.VacuumBoxNum)

  //   console.log("Data updated successfully")
  // }
  const handleSubmitChange = () => {
    update(ref(db, `/${PK}`), {
        uuid: PK,
        FirstStartTimeInMinute,
        FirstStartTimeInHours,
        FirstAmount,
        SecondStartTimeInMinute,
        SecondStartTimeInHours,
        SecondAmount,
        ThirdStartTimeInMinute,
        ThirdStartTimeInHours,
        ThirdAmount,
        VacuumBoxNum,
    })

    setIsEdited(!isEdited)
    window.location.reload()
}
   
   const BoxMedicineTypeOptions = [
    "",
    "Paracetamol",
    "Ibuprofen",
    "Aspirin",
    'Cough Syrup',
    'Cold Drops',
    'Fever Elixir',
    'Sore Throat Solution',
    'Flu Relief Liquid',
    'Allergy Syrup',
    'Nausea Potion',
    'Digestive Tonic',
    'Headache Elixir',
    'Antacid Solution',
    'Painkiller Drops',
    'Antiemetic Elixir',
    'Sleep Aid Liquid',
    'Decongestant Syrup',
    'Heartburn Potion',
    'Children Elixir',
    'Stomach Soother',
    'Antihistamine Solution',
    'Motion Sickness Potion',
    'Soothing Wash'
   ]
   
    // Callback function to handle selected Box Medicine Type value
    const handleBoxMedicineTypeChange = (value) => {
      setBoxMedicineType(value); // Update the state with the selected value
    }

   const VacuumBoxOptions = [
    "",
    "Box 1",
    "Box 2",
    "Box 3"
   ]

  useEffect(() => {
    if (PK === '4e8fbadf3d5') {
      setVacuumBoxNum('Box 1');
    } else if (PK === 'e8fbadf3d50') {
      setVacuumBoxNum('Box 2');
    } else {
      setVacuumBoxNum('Box 3');
    }
  }, [])
   
  console.log('Box Num : \n', VacuumBoxNum)
    // Callback function to handle selected Vacuum Box value
    const handleVacuumBoxChange = (value) => {
      setVacuumBoxNum(value); // Update the state with the selected value
    }

    return (
      <form action="" onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(event)
        handleSubmitChange()
        // writeOnDatabase()
      }}>
        <Stack 
            direction='column'
            sx={{
            marginTop: '50px',
            alignItems: 'center',
            height: '100vh',
            }}
            spacing={4}
        >
            <Stack direction='row' spacing={4}>
              <Autocomplete
                disablePortal
                sx={{ width: '30ch' }}
                options={BoxMedicineTypeOptions}
                value={BoxMedicineType} // Set the value of the Autocomplete to the state value
                onChange={(event, value) => handleBoxMedicineTypeChange(value)} // Call the callback function on change
                renderInput={(params) => (
                  <TextField
                    value={BoxMedicineType}
                    onChange={(e) => setBoxMedicineType(e.target.value)}
                    required
                    {...params}
                    label="Box Medicine Type"
                  />
                )}
              />
              <Autocomplete
                disablePortal
                sx={{ width: '30ch' }}
                disabled
                options={VacuumBoxOptions}
                value={VacuumBoxNum} // Set the value of the Autocomplete to the state value
                onChange={(event, value) => handleVacuumBoxChange(value)} // Call the callback function on change
                renderInput={(params) => (
                  <TextField
                    value={VacuumBoxNum}
                    onChange={(e) => setVacuumBoxNum(e.target.value)}
                    required
                    {...params}
                    label="Vacuum Box"
                  />
                )}
              />
              {PK === '4e8fbadf3d5' && <Typography width='30ch' textAlign='left' variant='body1' color='black'>
                Remained Quantity: Box 1
              </Typography>}
              {PK === 'e8fbadf3d50' && <Typography width='30ch' textAlign='left' variant='body1' color='black'>
                Remained Quantity: Box 2
              </Typography>}
              {PK === '8fbadf3d501' && <Typography width='30ch' textAlign='left' variant='body1' color='black'>
                Remained Quantity: Box 3
              </Typography>}
              
            </Stack>
            <Stack direction='row' spacing={4} >
              <TextField value={FirstStartTimeInMinute} onChange={(e) => setFirstStartTimeInMinute(e.target.value)} label='First Start Time In Minute' required size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
              <TextField value={FirstStartTimeInHours} onChange={(e) => setFirstStartTimeInHours(e.target.value)} label='First Start Time In Hours' required size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
              <TextField 
                InputProps={{
                    endAdornment: <InputAdornment position="end">ML</InputAdornment>,
                }} 
                value={FirstAmount} 
                onChange={(e) => setFirstAmount(e.target.value)}
                label='First Amount' size='medium' required sx={{width: '30ch'}} 
                variant='outlined' color='success' type='number'
              />
            </Stack>
            <Stack direction='row' spacing={4} >
              <TextField value={SecondStartTimeInMinute} onChange={(e) => setSecondStartTimeInMinute(e.target.value)} label='Second Start Time In Minute' size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
              <TextField value={SecondStartTimeInHours} onChange={(e) => setSecondStartTimeInHours(e.target.value)} label='Second Start Time In Hours' size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
              <TextField 
                InputProps={{
                    endAdornment: <InputAdornment position="end">ML</InputAdornment>,
                }} 
                value={SecondAmount} 
                onChange={(e) => setSecondAmount(e.target.value)} 
                label='Second Amount' size='medium' sx={{width: '30ch'}} 
                variant='outlined' color='success' type='number'
              />
            </Stack>
            <Stack direction='row' spacing={4} >
              <TextField value={ThirdStartTimeInMinute} onChange={(e) => setThirdStartTimeInMinute(e.target.value)} label='Third Start Time In Minute' size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
              <TextField value={ThirdStartTimeInHours} onChange={(e) => setThirdStartTimeInHours(e.target.value)} label='Third Start Time In Hours' size='medium' sx={{width: '30ch'}} variant='outlined' color='success' type='number'/>
              <TextField 
                InputProps={{
                    endAdornment: <InputAdornment position="end">ML</InputAdornment>,
                }} 
                value={ThirdAmount} 
                onChange={(e) => setThirdAmount(e.target.value)} 
                label='Third Amount' size='medium' sx={{width: '30ch'}} 
                variant='outlined' color='success' type='number'
              />
            </Stack>
            <Stack direction='row' spacing={4} >
            </Stack>
            <Stack direction='row' display='flex' width='68%' justifyContent='start'>
              <Button type='submit' color='success' variant='contained' size='large'>
                  Submit
              </Button>
            </Stack>
            <BasicTable />
        </Stack>
      </form>
    )
}

export default OrderForm