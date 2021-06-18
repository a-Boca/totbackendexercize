import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import axios from "axios"
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


function Reservations() {
    const classes = useStyles();
    const [fromDate,setFromDate] = useState(new Date('2014-08-18T00:00:00'))
    const [toDate,setToDate] = useState(new Date('2022-08-18T00:00:00'))
    const [tableData, setTableData] = useState()
    useEffect(() => {
        console.log("Value changed")
        console.log(fromDate.toISOString().substring(0,10))
        console.log(toDate.toISOString().substring(0,10))
        axios.get(`http://localhost:5000/reservation/${fromDate.toISOString().substring(0,10)}/${toDate.toISOString().substring(0,10)}`)
          .then((response) => {
            setTableData(response.data.data);
          }, (error) => {
            console.log(error);
          });
    }, [fromDate,toDate])
    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="center">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Start Date"
          value={fromDate}
          onChange={(date)=>setFromDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        &nbsp;
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="End Date"
          value={toDate}
          onChange={(date)=>setToDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    {
        tableData && (
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mail</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Table Id</TableCell>
                  <TableCell>Seats</TableCell>
                  <TableCell>Wants eat with strangers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow>
                    <TableCell align="left">{row.mail}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">{row.time}</TableCell>
                    <TableCell align="left">{row.table_id}</TableCell>
                    <TableCell align="left">{row.seats}</TableCell>
                    <TableCell align="left">{row.allow_strangers_people ? "Yes, user like strangers": "No, user don't like strangers"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
    }
      </>
    );
};
export default Reservations;
