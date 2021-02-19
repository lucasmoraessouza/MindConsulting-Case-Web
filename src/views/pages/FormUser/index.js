import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../assets/styles/Form";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mindconsulting.com.br/">
        Mind Consulting
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Checkout() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Mind Consulting
          </Typography>
        </Toolbar>
      </AppBar>
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="E-mail"
                    label="E-mail"
                    fullWidth
                    autoComplete="email"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Atualizar
              </Button>
            </div>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
