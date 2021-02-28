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
  const [password, setPassword] = useState('')
  const [file, setFile] = useState({})
  const [preview, setPreview] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    handleChange()
  }, [])

  const handleUpload = async (file) => {
    setFile(file[0])
    setDisable(false)
    setPreview(URL.createObjectURL(file[0]))
    console.log(preview)
  }

  const handleChange = async () => {
    try {
      const user = await getUser()
      const response = await api.get(`/user/${user.id}`)
      setName(response.data.user.name)
      setCpf(response.data.user.cpf)
      setEmail(response.data.user.email)
      setPassword(response.data.user.password)
      setImage(response.data.user.image)
    } catch (err) {}
  }

  const handleEdit = () => {
    setDisable(false)
  }

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  const handleRefresh = async () => {
    setDisable(true)

    const user = await getUser()
    let imageUser = ''

    if (file.name) {
      const data = new FormData()
      data.append('file', file, file.name)
      const response = await api.put(`/image/${user.id}`, data)
      imageUser = response.data.image
    }

    const newCpf = cpf.replace(/[^0-9s]/g, '')
    console.log(newCpf)

    if (password !== undefined) {
      await api.put(`/user/${user.id}`, {
        name,
        cpf: newCpf,
        email,
        password,
      })
    } else {
      await api.put(`/user/${user.id}`, {
        name,
        cpf: newCpf,
        email,
      })
    }

    Swal.fire('Atualizado com sucesso.')
    let newUser
    if (imageUser !== '') {
      newUser = {
        ...user,
        name: name,
        cpf: cpf,
        email: email,
        image: imageUser,
      }
    } else {
      newUser = {
        ...user,
        name: name,
        cpf: cpf,
        email: email,
      }
    }
    localUser(newUser)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Perfil Usuário
            <EditIcon className={classes.editIcon} onClick={handleEdit} />
          </Typography>
          <React.Fragment>
            <React.Fragment>
              <div className={classes.divImage}>
                {preview !== '' ? (
                  <img className={classes.image} src={preview} />
                ) : image !== 'null' ? (
                  <img
                    className={classes.image}
                    src={`http://192.168.0.13:4000/upload/${image}`}
                  />
                ) : (
                  <img className={classes.image} src="../image/anonimo.jpg" />
                )}
                <label for="selecao-arquivo" className={classes.label}>
                  Alterar imagem
                </label>
                <input
                  id="selecao-arquivo"
                  type="file"
                  className={classes.buttonFile}
                  onChange={(e) => handleUpload(e.target.files)}
                />
              </div>
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
                    value={cpfMask(cpf)}
                    onChange={(e) => setCpf(cpfMask(e.target.value))}
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
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    disabled={disable}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
