import React, { useState, useContext, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, getLoggedUser } from "../utils/Auth"

import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Fade from '@mui/material/Fade'
import SvgIcon from '@mui/material/SvgIcon'
import Collapse from '@mui/material/Collapse'
import { ButtonUnstyled } from "@mui/base";


export default function Login({ allProducts }) {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [errorMsg, setErrorMsg] = useState("")
  const [update, setUpdate] = useState(false)


  useEffect(() => {
    setUser(getLoggedUser()) 
    console.log("setting listener")
    window.addEventListener('storage', (event) => {
      console.log("listener called")
      setUser(getLoggedUser())   
    });
  }, [])

  const redirectIfLogged = useCallback(() => {
    console.log(user)
    console.log(getLoggedUser())
    if (!!user?.username)
      navigate("/")
  }, [user, navigate])


  const handleLogin = useCallback(async (event) => {
    event.preventDefault()
    setUpdate(true)
    const rv = await login(
      event.currentTarget.username.value,
      event.currentTarget.password.value
    )
    console.log(rv)
    if (!rv) {
      setErrorMsg("Error logging in")
    } else {
      navigate("/")
    }
  }, [setUpdate])


  return (
    <>
      <Container sx={{ mt: 6 }}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item>
            <Typography variant="h5" fontWeight={500}>
              Log in
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 4, mb: 5 }} />
        <Grid container spacing={4} padding={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <form onSubmit={handleLogin}>
              <TextField
                placeholder="Username"
                fullWidth
                label="username"
                name="username"
              />
              <TextField
                placeholder="***"
                fullWidth
                label="password"
                name="password"
                type="password"
              />
              <Button type="submit" variant="outlined">
                Submit
              </Button>
            </form>
          </Grid>
          <Collapse in={!!errorMsg} unmountOnExit>
            <Alert severity="error">
              {errorMsg}
            </Alert>
          </Collapse>   
        </Grid>
      </Container>
    </>
  );
}
