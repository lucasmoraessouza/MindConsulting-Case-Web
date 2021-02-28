import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MaterialInput from '@material-ui/core/Input'

import Swal from 'sweetalert2'
import api from '../../../services/api'
import Copyright from '../../../components/Copyright'
import useStyles from '../../assets/styles/auth'
import { saveToken, localUser } from '../../../services/auth'
import { useHistory } from 'react-router-dom'
import InputMask from '../../../components/MaskedInput'

export default function Register() {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (name === '' || cpf === '' || email === '' || password === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Campo vazio',
        })
        return
      }

      if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, informe um E-MAIL válido!',
        })
        return
      }

      const newCpf = cpf.replace(/[^0-9s]/g, '')
      console.log(newCpf)
      const response = await api.post('/register', {
        name,
        cpf: newCpf,
        email,
        password,
      })
      saveToken(response.data.token)
      localUser(response.data.user)

      if (response.data.user) history.push('/dashboard/home')

      if (response.data.error) console.log(response.data.error)
    } catch (response) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.data.error,
      })
    }
  }
  const cpfMask = (value) => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <div className={classes.icon} />

          <Typography component="h1" variant="h5">
            CRIAR UMA CONTA
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="cpf"
              label="CPF"
              type="cpf"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(cpfMask(e.target.value))}
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
              Cadastrar
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
