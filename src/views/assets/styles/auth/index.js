import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#060709",
  },
  image: {
    backgroundImage:
      "url(https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/13076649_981146701954370_5671262148080029750_n.jpg?_nc_cat=106&ccb=2&_nc_sid=174925&_nc_ohc=Z198F4ZtQC8AX8I0zyV&_nc_ht=scontent.fsod2-1.fna&oh=4e2d844da8b2174d6ac4463cf3906400&oe=603AB128)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  paper: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "black",
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "red",

    "&:hover": {
      backgroundColor: "black",
    },
  },
  icon: {
    backgroundImage:
      "url(https://mindconsulting.com.br/wp-content/uploads/2020/01/bear-png-440x440.png)",
    width: 80,
    height: 80,
    zIndex: 2,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

export default useStyles;
