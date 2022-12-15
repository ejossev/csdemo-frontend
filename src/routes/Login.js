import React, { useState, useContext, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, getLoggedUser } from "../utils/Auth"
import { SIGNUP_URL } from "../utils/Apis"

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
import Checkbox from '@mui/material/Checkbox';



export default function Login({ allProducts }) {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [errorMsg, setErrorMsg] = useState("")
  const [update, setUpdate] = useState(false)


  useEffect(() => {
    setUser(getLoggedUser()) 
    window.addEventListener('storage', (event) => {
      setUser(getLoggedUser())   
    });
  }, [])

  const redirectIfLogged = useCallback(() => {
    if (!!user?.username)
      navigate("/")
  }, [user, navigate])


  const handleLogin = useCallback(async (event) => {
    event.preventDefault()
    if (event.currentTarget.register.checked) {
      let res = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: event.currentTarget.username.value, 
          password: event.currentTarget.password.value })
      })
    
      if (res.status == 200) {
        navigate("/")
      } else {
        setErrorMsg("Error signing up")
      }
    } else {
      setUpdate(true)
      const rv = await login(
        event.currentTarget.username.value,
        event.currentTarget.password.value
      )
      if (!rv) {
        setErrorMsg("Error logging in")
      } else {
        navigate("/")
      }
    }

  }, [setUpdate])


  return (
    <>
      <Container sx={{ mt: 6 }}>
        <Grid container justifyContent="center" spacing={2} alignItems="center">
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
              <Grid
                container
                alignItems="left"
                justifyContent="left"
              >
                <Grid item sx={{ display: { xs: 'none', md: 'flex' } }} alignItems="center">
                  <Checkbox label="register" name="register"/>
                </Grid>
                <Grid item sx={{ display: { xs: 'none', md: 'flex' } }} alignItems="center">
                  <Typography variant ="body">Create new account</Typography>
                </Grid>
              </Grid>
              
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
