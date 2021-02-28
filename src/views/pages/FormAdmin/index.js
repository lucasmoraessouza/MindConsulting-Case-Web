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
  const [preview, setPreview] = useState('')
  const [image, setImage] = useState('')
  const [file, setFile] = useState({})

  useEffect(() => {
    handleChange()
  }, [])

  const handleUpload = async (file) => {
    setFile(file[0])
    setPreview(URL.createObjectURL(file[0]))
    console.log(preview)
  }

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  const handleUpdate = async () => {
    const newCpf = cpf.replace(/[^0-9s]/g, '')
    const id = getId()
    const response = await api.put(`/user/${id}`, {
      name,
      cpf: newCpf,
      email,
      level,
    })

    if (file.name) {
      const data = new FormData()
      data.append('file', file, file.name)
      const response = await api.put(`/image/${id}`, data)
    }
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
      setImage(response.data.user.image)
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
