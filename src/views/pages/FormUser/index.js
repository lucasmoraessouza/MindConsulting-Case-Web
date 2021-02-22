import React, { useState, useEffect } from 'react'
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
import EditIcon from '@material-ui/icons/Edit'
import Swal from 'sweetalert2'

import api from '../../../services/api'
import { getUser, localUser } from '../../../services/auth'

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
  const [disable, setDisable] = useState(true)
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    handleChange()
  }, [])

  const handleChange = async () => {
    try {
      const user = await getUser()
      const response = await api.get(`/user/${user.id}`)
      console.log(response)
      setName(response.data.user.name)
      setCpf(response.data.user.cpf)
      setEmail(response.data.user.email)
    } catch (err) {}
  }

  const handleEdit = () => {
    setDisable(false)
  }

  const handleRefresh = async () => {
    setDisable(true)
    const user = await getUser()
    const response = await api.put(`/user/${user.id}`, {
      name,
      cpf,
      email,
    })
    Swal.fire('Atualizado com sucesso.')
    const newUser = { ...user, name: name, cpf: cpf, email: email }
    localUser(newUser)
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
            Perfil Usuário
            <EditIcon className={classes.editIcon} onClick={handleEdit} />
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
                    disabled={disable}
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
                    disabled={disable}
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
                    disabled={disable}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
              </Grid>
            </React.Fragment>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={disable}
                onClick={handleRefresh}
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
