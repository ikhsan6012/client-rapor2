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

import { getRequest } from '../../functions/request'
import { mutatePenerimaan } from '../../functions/mutateData'
import { formatNumber, capitalizedEachWord } from '../../functions/formats'

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

const Tagging = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [updateInfo, setUpdateInfo] = useState(null)

  useEffect(() => {
    getRequest('persil', { t: 5 })
      .then(res => {
        setData(mutatePenerimaan(res.tagging, 'tagging'))
        setUpdateInfo(res.updateInfo.tagging)
      })
  }, [])

  return(
    <Container style={{ height: 'calc(100vh - 113px)', overflowY: 'auto' }}>
      <Grid item xs={ 12 }>
        <Grid container>
          <Grid item xs={ 6 }>
            <Typography component="span" variant="h5">Geo Tagging</Typography>
          </Grid>
          <Grid item xs={ 6 } align="right">
            <Typography component="span" variant="button">{ updateInfo }</Typography>
          </Grid>
        </Grid>
        <Paper className={ classes.paper } square={ false }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={ classes.bold } rowSpan="2" align="center" style={{ width: 138, minWidth: 138 }}>Nama KPP</TableCell>
                <TableCell className={ classes.bold } rowSpan="2" align="center">Capaian (%)</TableCell>
                <TableCell className={ classes.bold } colSpan="4" align="center">Semester I</TableCell>
                <TableCell className={ classes.bold } colSpan="4" align="center">Semester II</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={ classes.bold } align="center">Target</TableCell>
                <TableCell className={ classes.bold } align="center">Realisasi</TableCell>
                <TableCell className={ classes.bold } align="center">Capaian (%)</TableCell>
                <TableCell className={ classes.bold } align="center">Capaian (Max 60%)</TableCell>
                <TableCell className={ classes.bold } align="center">Target</TableCell>
                <TableCell className={ classes.bold } align="center">Realisasi</TableCell>
                <TableCell className={ classes.bold } align="center">Capaian (%)</TableCell>
                <TableCell className={ classes.bold } align="center">Capaian (40%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.map(d => {
                return (
                  <TableRow key={ d.NAMA_KPP }>
                    <TableCell>{ capitalizedEachWord(d.NAMA_KPP) }</TableCell>
                    <TableCell align="right" style={{ color: d.capaianColor }}>{ formatNumber(d.capaian, 2) }</TableCell>
                    <TableCell align="right">{ formatNumber(d.SMT1.TARGET) }</TableCell>
                    <TableCell align="right">{ formatNumber(d.SMT1.REALISASI) }</TableCell>
                    <TableCell align="right">{ formatNumber(d.SMT1.capaian1, 2) }</TableCell>
                    <TableCell align="right">{ formatNumber(d.SMT1.capaian2, 2) }</TableCell>
                    <TableCell align="right">{ formatNumber(d.SMT2.TARGET) }</TableCell>
                    <TableCell align="right">{ formatNumber(d.SMT2.REALISASI) }</TableCell>
                    <TableCell align="right">{ formatNumber(d.SMT2.capaian1, 2) }</TableCell>
                    <TableCell align="right">{ formatNumber(d.SMT2.capaian2, 2) }</TableCell>
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

export default Tagging