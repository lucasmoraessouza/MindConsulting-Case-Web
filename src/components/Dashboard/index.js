import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ListSubheader from '@material-ui/core/ListSubheader'
import AssignmentIcon from '@material-ui/icons/Assignment'

import { Switch, withRouter, Route, useHistory } from 'react-router-dom'
import { routes } from '../../routes'
import { logout, getUser } from '../../services/auth'
import api from '../../services/api'
import Copyright from '../Copyright'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    display: 'flex',
    backgroundColor: 'grey',
  },
  toolbar: {
    backgroundColor: 'DarkRed',
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    color: 'white',
    backgroundColor: 'DarkRed',
    display: 'flex',
    background: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    color: 'white',
    marginRight: 36,
  },
  menuButtonHidden: {
    color: 'white',
    display: 'none',
  },
  title: {
    color: 'white',
    flexGrow: 1,
  },
  drawerPaper: {
    backgroundColor: 'lightgrey',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    backgroundColor: 'lightgrey',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    color: 'white',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    backgroundColor: 'lightgrey',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  user: {
    fontSize: 12,
  },
  userImage: {
    borderRadius: '50%',
    width: 45,
    height: 45,
    marginRight: 5,
  },
}))

export default function Dashboard(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const { location } = props
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('')
  const [user, setUser] = useState({})
  const history = useHistory()
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const user = getUser()
    setLevel(user.level)
    setUser(user)
    if (user.level == 1) {
      routes.user.map((route) => {
        if (route.path === location.pathname) {
          setTitle(route.title)
        }
      })
    } else if (user.level == 999) {
      routes.admin.map((route) => {
        if (route.path === location.pathname) {
          setTitle(route.title)
        }
      })
    }
  }, [title, location.pathname])

  useEffect(() => {
    handleAuth()
  }, [])

  async function handleAuth() {
    try {
      const response = await api.get('/admin/authenticated')
      if (response.data.valid === true) return

      handleLogout()
    } catch (err) {}
  }

  const handleLogout = () => {
    logout()
    history.push('/login')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
          {user.image === 'null' ? (
            <img className={classes.userImage} src="../image/anonimo.jpg" />
          ) : (
            <img
              className={classes.userImage}
              src={`http://192.168.0.13:4000/upload/${user.image}`}
            />
          )}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.user}
          >
            {user.name} - {user.cpf} <br />{' '}
            {user.level == 1 ? 'Usuário Comum' : 'Administrador'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {level == 1
            ? routes.user.map((route, index) => {
                if (route.title)
                  return (
                    <ListItem
                      button
                      key={index}
                      onClick={() => history.push(route.path)}
                    >
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={route.title} />
                    </ListItem>
                  )
              })
            : routes.admin.map((route, index) => {
                if (route.title)
                  return (
                    <ListItem
                      button
                      key={index}
                      onClick={() => history.push(route.path)}
                    >
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={route.title} />
                    </ListItem>
                  )
              })}
        </List>

        <Divider />
        <div>
          <ListSubheader inset>Ações</ListSubheader>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {level == 1
                  ? routes.user.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        exact
                        component={route.component}
                      />
                    ))
                  : routes.admin.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        exact
                        component={route.component}
                      />
                    ))}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}
