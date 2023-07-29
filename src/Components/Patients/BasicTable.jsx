import React, {useEffect, useState} from 'react'
import axios from 'axios'
// Material UI Table Imports
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function BasicTable() {
  
  const [users, setUsers] = useState([])

  // when the component mount useEffect() hook.
  useEffect(() => {
    axios.get('https://localhost:7062/api/Order')
    .then(response => {
      console.log("Orders API Data: \n", response.data)
      setUsers(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Patient Name</TableCell>
            <TableCell align="left">Medicine Type</TableCell>
            <TableCell align="center">First time</TableCell>
            <TableCell align="center">First Amount</TableCell>
            <TableCell align="center">Second time</TableCell>
            <TableCell align="center">Second Amount</TableCell>
            <TableCell align="center">Third time</TableCell>
            <TableCell align="center">Third Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          users && users.length > 0 ?
          users.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.patientName}
              </TableCell>
              <TableCell align="left">{item.boxMedicineType}</TableCell>
              <TableCell align="center">{item.firstStartTimeInHours < 10 ? "0" + item.firstStartTimeInHours : item.firstStartTimeInHours} : {item.firstStartTimeInMinute < 10 ? "0" + item.firstStartTimeInMinute : item.firstStartTimeInMinute} </TableCell>
              <TableCell align="center">{item.firstAmount}</TableCell>
              <TableCell align="center">{item.secondStartTimeInHours < 10 ? "0" + item.secondStartTimeInHours : item.secondStartTimeInHours} : {item.secondStartTimeInMinute < 10 ? "0" + item.secondStartTimeInMinute : item.secondStartTimeInMinute}</TableCell>
              <TableCell align="center">{item.secondAmount}</TableCell>
              <TableCell align="center">{item.thirdStartTimeInHours < 10 ? "0" + item.thirdStartTimeInHours : item.thirdStartTimeInHours} : {item.thirdStartTimeInMinute < 10 ? "0" + item.thirdStartTimeInMinute : item.thirdStartTimeInMinute}</TableCell>
              <TableCell align="center">{item.thirdAmount}</TableCell>
            </TableRow>
          ))
          : 'There is no data.'
        }
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}