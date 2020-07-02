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
import Button from '@material-ui/core/Button'

import { getRequest } from '../functions/request'
import { formatNumber } from '../functions/formats'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {
    fontSize: 12
  },
  tableHead: {
    fontSize: 12,
    lineHeight: '1rem'
  },
  tableRow: {
    fontSize: 12,
    lineHeight: '1.5rem'
  },
  bold: {
    fontWeight: 'bold'
  }
}))

const getColor = skor => {
  let color = ''
  if(skor >= 100) color = 'green'
  else if(skor >= 90) color = 'blue'
  else if(skor >= 80) color = 'orange'
  else color = 'red'
  return color
}

const RaporAr = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [lastUpdate, setLastUpdate] = useState(null)
  const [kpp, setKpp] = useState(null)

  useEffect(() => {
    getRequest('rapor', { method: 'boxplot', KD_KPP: kpp })
      .then(res => {
        setData(res.data)
        setLastUpdate(new Date(res.lastUpdate).toLocaleDateString('ID', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        }))
      })
  }, [kpp])

  const handleKppClick = e => {
    e.preventDefault()
    setData([])
    const kpp = e.currentTarget.dataset.kpp
    setKpp(kpp)
  }

  const handleBackClick = () => {
    setData([])
    setKpp(null)
  }

  const renderData = (data, classes) => {
    let listAr = Object.keys(data)
    listAr.sort((a, b) => {
      if(data[a].RANKING < data[b].RANKING) return -1
      if(data[a].RANKING > data[b].RANKING) return 1
      return 0
    })
    
    const dataRender = listAr.length 
      ? listAr.map((ar, i) => {
        return(<tr key={ i } className={ classes.tableRow }>
          <td align="center">{ data[ar].RANKING }</td>
          <td>{ data[ar].NAMA_AR }</td>
          <td>{ !kpp
            ? <a href={ data[ar].KPP.KD_KANTOR } data-kpp={ data[ar].KPP.KD_KANTOR } onClick={ handleKppClick }>{ data[ar].KPP.NM_KANTOR }</a>
            : data[ar].KPP.NM_KANTOR }
          </td>
          <td align="center" style={{ color: getColor(data[ar].TOTAL_SKOR_AKHIR) }}>{ formatNumber(data[ar].TOTAL_SKOR_AKHIR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].SP2DK.JUMLAH) }</td>
          <td align="center" style={{ color: getColor(data[ar].SP2DK.SKOR )}}>{ formatNumber(data[ar].SP2DK.SKOR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].SP2DK.SKOR_AKHIR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].LHP2DK.JUMLAH) }</td>
          <td align="center" style={{ color: getColor(data[ar].LHP2DK.SKOR )}}>{ formatNumber(data[ar].LHP2DK.SKOR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].LHP2DK.SKOR_AKHIR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].LHP2DK_BERKUALITAS.JUMLAH) }</td>
          <td align="center" style={{ color: getColor(data[ar].LHP2DK_BERKUALITAS.SKOR )}}>{ formatNumber(data[ar].LHP2DK_BERKUALITAS.SKOR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].LHP2DK_BERKUALITAS.SKOR_AKHIR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].POTENSI_AKHIR.NILAI) }</td>
          <td align="center" style={{ color: getColor(data[ar].POTENSI_AKHIR.SKOR )}}>{ formatNumber(data[ar].POTENSI_AKHIR.SKOR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].POTENSI_AKHIR.SKOR_AKHIR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].REALISASI_POTENSI.WP.JUMLAH) }</td>
          <td align="center" style={{ color: getColor(data[ar].REALISASI_POTENSI.WP.SKOR )}}>{ formatNumber(data[ar].REALISASI_POTENSI.WP.SKOR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].REALISASI_POTENSI.WP.SKOR_AKHIR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].REALISASI_POTENSI.REALISASI.NILAI) }</td>
          <td align="center" style={{ color: getColor(data[ar].REALISASI_POTENSI.REALISASI.SKOR )}}>{ formatNumber(data[ar].REALISASI_POTENSI.REALISASI.SKOR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].REALISASI_POTENSI.REALISASI.SKOR_AKHIR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].STP.JUMLAH.JUMLAH) }</td>
          <td align="center" style={{ color: getColor(data[ar].STP.JUMLAH.SKOR )}}>{ formatNumber(data[ar].STP.JUMLAH.SKOR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].STP.JUMLAH.SKOR_AKHIR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].STP.NILAI.NILAI) }</td>
          <td align="center" style={{ color: getColor(data[ar].STP.NILAI.SKOR )}}>{ formatNumber(data[ar].STP.NILAI.SKOR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].STP.NILAI.SKOR_AKHIR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].NON_GALPOT.JUMLAH) }</td>
          <td align="center" style={{ color: getColor(data[ar].NON_GALPOT.SKOR )}}>{ formatNumber(data[ar].NON_GALPOT.SKOR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].NON_GALPOT.SKOR_AKHIR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].VISIT.JUMLAH) }</td>
          <td align="center" style={{ color: getColor(data[ar].VISIT.SKOR )}}>{ formatNumber(data[ar].VISIT.SKOR, 2) }</td>
          <td align="center">{ formatNumber(data[ar].VISIT.SKOR_AKHIR, 2) }</td>
        </tr>)
      })
    : <tr><td colSpan="34">Sedang Mengambil Data...</td></tr>
    return dataRender
  }

  return(
    <Container style={{ height: 'calc(100vh - 113px)', overflowY: 'auto' }}>
      <Grid item xs={ 12 }>
        <Grid container>
          <Grid item xs={ 6 }>
            <Typography component="span" variant="h5">Rapor Kinerja AR</Typography>
          </Grid>
          <Grid item xs={ 6 } align="right">
            <Typography component="span" variant="button" mr={ 5 }>{ lastUpdate }</Typography>
            { kpp
              ? <Button variant="contained" color="primary" style={{ marginLeft: 10 }} onClick={ handleBackClick }>Kembali</Button>
              : '' }
          </Grid>
        </Grid>
        <Paper className={ classes.paper } square={ false }>
          <Table className={ classes.table }>
            <TableHead>
              <TableRow>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } rowSpan="3" align="center">Rank</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } rowSpan="3" align="center" style={{ minWidth: 150 }}>Nama AR</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } rowSpan="3" align="center" style={{ minWidth: 100 }}>KPP</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } rowSpan="3" align="center">Total Skor Akhir</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } rowSpan="2" colSpan="3" align="center">SP2DK (10%)</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } rowSpan="2" colSpan="3" align="center">LHP2DK (5%)</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } rowSpan="2" colSpan="3" align="center">LHP2DK Berkualitas (15%)</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } rowSpan="2" colSpan="3" align="center">Potensi Akhir (15%)</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } colSpan="6" align="center">Realisasi Potensi (25%)</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } colSpan="6" align="center">STP (20%)</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } rowSpan="2"colSpan="3" align="center">Non Galpot (5%)</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } rowSpan="2"colSpan="3" align="center">Visit (5%)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } colSpan="3" align="center">WP (30%)</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } colSpan="3" align="center">Nilai (70%)</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } colSpan="3" align="center">Jumlah (30%)</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } colSpan="3" align="center">Nilai (70%)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Jumlah</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor Akhir</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Jumlah</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor Akhir</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Jumlah</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor Akhir</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Nilai</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor Akhir</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Jumlah</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor Akhir</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Nilai</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor Akhir</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Jumlah</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor Akhir</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Nilai</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor Akhir</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Jumlah</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor Akhir</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Jumlah</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor</TableCell>
                <TableCell className={ classes.bold + ' ' + classes.tableHead } align="center">Skor Akhir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { renderData(data, classes) }
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Container>
  )
}

export default RaporAr