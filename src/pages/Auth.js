import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Auth = () => {
  <Container style={{ height: 'calc(100vh - 113px)', overflowY: 'auto' }}>
    <Grid item xs={ 12 }>
      <Grid container>
        <Grid item xs={ 6 }>
          <Typography component="span" variant="h5">Rapor Kinerja AR</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Container>
}

export default Auth