import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { SMOOTHY_URL_BASE } from "../utils/Apis"
import { changeCart, getCart } from '../utils/Cart'
import { getLoggedUser } from "../utils/Auth";


import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'

import styled from '@mui/material/styles/styled'


const SmoothieImageOverlay = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
  transition: 'all 0.3s',
  top: 0,
  zIndex: 2,
}))

const SmoothieImageContainer = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  aspectRatio: '5 / 6',
  position: 'relative',
  borderRadius: 14,
  overflow: 'hidden',
}))

const SmoothieImage = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  userSelect: 'none',
  height: '100%',
  width: '100%',
}))


export default function Smoothie() {
  const { id } = useParams()
  const [smoothie, setSmoothie] = useState({})
  const [user, setUser] = useState({})
  const [isAdmin, setAdmin] = useState(false)
  const image = `/smoothie${id%3}.jpg`
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  const fetchSmoothie = useCallback(async () => {
    try {
      const res = await fetch(SMOOTHY_URL_BASE + "/" + id)
      const smoothie = await res.json()
      setSmoothie(smoothie)
    } catch (error) {
      console.error(error)
    }
  }, [setSmoothie, id])

  const handleClickPurchase = useCallback(
    (e) => {
      e.preventDefault()
      var newCart = cart || []
      newCart.push({id: smoothie.id, name: smoothie.name})
      changeCart(newCart)
  }, [cart])

  const handleClickEdit = useCallback(
    (e) => {
      e.preventDefault()
      navigate(`/edit/${id}`)
  }, [cart])

  const updateCallback = useCallback(() => {
    setCart(getCart())
    const user = getLoggedUser()
    setUser(user)
    setAdmin(user?.roles.length > 0 && user.roles[0] === 'ROLE_ADMIN')
  }, [setCart, setUser, setAdmin])

  useEffect(() => {
    fetchSmoothie()
    updateCallback()
    window.addEventListener('storage', updateCallback);
    return () => {
      window.removeEventListener('storage', updateCallback)
    }
  }, [setCart, setUser, setAdmin, fetchSmoothie, updateCallback])

  return (
    <>
      <Container sx={{ mt: 8, mb: 4 }}>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} md={7}>
            <Box>
              <SmoothieImageContainer>
                {/* <SmoothieImageOverlay>
                  
                </SmoothieImageOverlay> */}
                
                <SmoothieImage src={image} />
              </SmoothieImageContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ mt: { xs: 2, md: 0 } }}>
              <Typography variant="h3">{smoothie?.name}</Typography>
              <Grid item>
                <Chip variant="outlined" label={`CHF 5`} />
                <Chip variant="outlined" label={`In stock`} color="secondary"/>
              </Grid>
              <Divider orientation="horizontal" sx={{ height: 40 }} />
              <Typography variant="h6">Description:</Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={500}
                sx={{ my: 4 }}
              >
                {smoothie?.description}
              </Typography>
              <Typography variant="h6">Nutrition values:</Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight={500}
                sx={{ my: 4 }}
              >
                {smoothie?.nutritions}
              </Typography>
              <Button
                size="large"
                onClick={handleClickPurchase}
                startIcon={
                  <SvgIcon fontSize="small">
                    <use xlinkHref="#icon-wallet" />
                  </SvgIcon>
                }
              >
                Purchase now
              </Button>
              { isAdmin && (
                <Button
                  size="large"
                  onClick={handleClickEdit}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <use xlinkHref="#icon-wallet" />
                    </SvgIcon>
                  }
                >
                  EDIT
                </Button>
              )}
            </Box>
          </Grid>
          


        </Grid>


      </Container>
    
    
    
    </>
  )
}