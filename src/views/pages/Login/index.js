import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'

import Swal from 'sweetalert2'
import api from '../../../services/api'
import Copyright from '../../../components/Copyright'
import useStyles from '../../assets/styles/auth'
import { saveToken, localUser } from '../../../services/auth'
import { useHistory } from 'react-router-dom'

export default function SignInSide() {
  const classes = useStyles()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/login', {
        usuario,
        password,
      })
      saveToken(response.data.token)
      localUser(response.data.user)

      if (response.data.user) history.push('/dashboard/home')
    } catch (response) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.data.error,
      })
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <div className={classes.icon} />

          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email ou CPF"
              name="email"
              autoComplete="email"
              autoFocus
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />

            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Enviar
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href=""
                  onClick={() => history.push('/register')}
                  variant="body2"
                >
                  {'Não tem uma conta? Registre-se'}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
