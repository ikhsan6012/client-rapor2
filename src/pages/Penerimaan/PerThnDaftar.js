import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'

import { postRequest } from '../../functions/request'
import { formatUpdate, formatNumber } from '../../functions/formats'
import { mutatePenerimaan } from '../../functions/mutateData'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  bold: {
    fontWeight: 'bold'
  }
}))

const PerThnDaftar = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [updatedAt, setUpdatedAt] = useState(null)

  useEffect(() => {
    postRequest('penerimaan', { PID: 2 })
      .then(res => {
        setData(mutatePenerimaan(res.data.DATA))
        setUpdatedAt(formatUpdate(res.data.TGL_UPDATE))
      })
      .catch(err => console.log(err))
  }, [])

  return(
    <Container style={{ height: 'calc(100vh - 113px)', overflowY: 'auto' }}>
      <Grid item xs={ 12 }>
        <Grid container>
          <Grid item xs={ 6 }>
            <Typography component="span" variant="h5">Penerimaan Per Tahun Daftar</Typography>
          </Grid>
          <Grid item xs={ 6 } align="right">
            <Typography component="span" variant="button">{ updatedAt }</Typography>
          </Grid>
        </Grid>
        <Paper className={ classes.paper } square={ false }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={ classes.bold } rowSpan="2" align="center" style={{ width: 36 }}>Kode KPP</TableCell>
                <TableCell className={ classes.bold } rowSpan="2" align="center" style={{ width: 138, minWidth: 138 }}>Nama KPP</TableCell>
                <TableCell className={ classes.bold } rowSpan="2" align="center">Target</TableCell>
                <TableCell className={ classes.bold } rowSpan="2" align="center">Realisasi</TableCell>
                <TableCell className={ classes.bold } rowSpan="2" align="center">Capaian (%)</TableCell>
                <TableCell className={ classes.bold } colSpan="3" align="center">Tahun Daftar</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={ classes.bold } align="center">2018</TableCell>
                <TableCell className={ classes.bold } align="center">2019</TableCell>
                <TableCell className={ classes.bold } align="center">TLTB</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.map(d => {
                return (
                  <TableRow key={ d.NAMA_KPP }>
                    { d.KD_KPP ? (<>
                      <TableCell align="center">{ d.KD_KPP }</TableCell>
                      <TableCell>{ d.NAMA_KPP }</TableCell>
                    </>) : (
                      <TableCell align="center" colSpan="2">{ d.NAMA_KPP }</TableCell>
                    )}
                    <TableCell align="right">{ formatNumber(d.TARGET) }</TableCell>
                    <TableCell align="right">{ formatNumber(d.realisasi) }</TableCell>
                    <TableCell 
                      align="center" 
                      style={{ color: d.capaianColor }}
                    >{ formatNumber(d.capaian, 2) }</TableCell>
                    <TableCell align="right">{ formatNumber(d['2018']) }</TableCell>
                    <TableCell align="right">{ formatNumber(d['2019']) }</TableCell>
                    <TableCell align="right">{ formatNumber(d['TLTB']) }</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Container>
  )
}

export default PerThnDaftar