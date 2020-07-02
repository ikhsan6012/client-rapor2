import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'

const Login = () => {
  return(
    <Container style={{ height: 'calc(100vh - 113px)', overflowY: 'auto' }}>
      <Grid item xs={ 12 }>
        <Grid container>
          <Grid item xs={ 6 }>
            <Card>
              <CardHeader>
                Login
              </CardHeader>
              <CardContent>

              </CardContent>
              <CardActions>

              </CardActions>
            </Card> 
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login