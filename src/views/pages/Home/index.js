import React from 'react'
import useStyles from './style'

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.div}>
      <h1> Bem vindo ao Mind Case!</h1>
      <img src="../image/mind-bear.png" />
    </div>
  )
}
