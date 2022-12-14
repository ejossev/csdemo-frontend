import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { Link, useNavigate } from "react-router-dom";

import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Collapse from '@mui/material/Collapse'

import { SMOOTHY_URL_BASE } from "../utils/Apis"
import { authorizedFetch } from "../utils/Auth"


import styled from '@mui/material/styles/styled'

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("")
  const [smoothie, setSmoothie] = useState(null)
  console.log(id)

  const handleEdit = async (e) => {
    e.preventDefault()
    const body = JSON.stringify({
      name: e.currentTarget.name.value,
      description: e.currentTarget.description.value,
      nutritions: e.currentTarget.nutritions.value
    })


    let res
    try {
      if (!id) {
        res = await authorizedFetch(
          SMOOTHY_URL_BASE, 
          {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body
          }
        )
      } else {
        res = await authorizedFetch(
          SMOOTHY_URL_BASE + "/" + id,
          {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body
          }
        )
      }
      navigate("/")
      window.scrollTo(0, 0)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchSmoothie = useCallback(async () => {
    if (!id)
      return
    try {
      const res = await fetch(SMOOTHY_URL_BASE + "/" + id)
      const smoothie = await res.json()
      setSmoothie(smoothie)
      console.log(smoothie)
    } catch (error) {
      console.error(error)
    }
  }, [setSmoothie, id])

  useEffect(() => {
    fetchSmoothie()
  }, [id, fetchSmoothie])

  return ( 
    <Container sx={{ mt: 6 }}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item>
          <Typography variant="h5" fontWeight={500}>
            Enter new details
            {smoothie?.name && (` for item "${smoothie.name}"`)}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 4, mb: 5 }} />
      <Grid container spacing={4} padding={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <form onSubmit={handleEdit}>
            <TextField
              placeholder="Name"
              fullWidth
              label="name"
              name="name"
            />
            <TextField
              placeholder="Description"
              fullWidth
              multiline
              rows={4}
              label="description"
              name="description"
            />
            <TextField
              placeholder="Nutritions"
              fullWidth
              multiline
              rows={4}
              label="nutritions"
              name="nutritions"
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
  )
}