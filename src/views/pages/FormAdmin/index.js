import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import useStyles from '../../assets/styles/Form'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { getId } from '../../../services/auth'
import api from '../../../services/api'
import Swal from 'sweetalert2'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mindconsulting.com.br/">
        Mind Consulting
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Checkout() {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [level, setLevel] = useState('')

  useEffect(() => {
    handleChange()
  }, [])

  const handleUpdate = async () => {
    const id = getId()
    const response = await api.put(`/user/${id}`, {
      name,
      cpf,
      email,
      level,
    })
    Swal.fire('Atualizado com sucesso.')
  }

  const handleChange = async () => {
    const id = getId()
    try {
      const response = await api.get(`/user/${id}`)
      setName(response.data.user.name)
      setEmail(response.data.user.email)
      setCpf(response.data.user.cpf)
      setLevel(response.data.user.level)
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        className={classes.appBar}
      ></AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Editar Cadastro
          </Typography>
          <React.Fragment>
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Dados
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="name"
                    name="Nome"
                    label="Nome"
                    fullWidth
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="cpf"
                    name="cpf"
                    label="CPF"
                    fullWidth
                    autoComplete="id"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="E-mail"
                    label="E-mail"
                    fullWidth
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="level"
                    name="Nível"
                    label="Nível"
                    fullWidth
                    autoComplete="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  />
                </Grid>
              </Grid>
            </React.Fragment>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleUpdate}
              >
                Atualizar
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  )
}
