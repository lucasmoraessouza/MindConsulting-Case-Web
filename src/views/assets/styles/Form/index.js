import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  editIcon: {
    marginLeft: 20,
    color: 'grey',
  },
  image: {
    borderRadius: '50%',
    width: 100,
    height: 100,
  },
  divImage: {
    margin: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonFile: {
    display: 'none',
  },
  label: {
    margin: 10,
    color: 'blue',
    cursor: 'pointer',
  },
}))

export default useStyles
