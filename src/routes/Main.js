import { Link, useNavigate } from "react-router-dom"
import React, { Component, useState, useCallback, useEffect } from "react"
import { SMOOTHIES_URL } from "../utils/Apis"
import SmoothieCard from "../components/SmoothieCard"

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

import { changeCart, getCart } from "../utils/Cart"


export default function Main() {
  const [smoothies, setSmoothies] = useState([])
  const navigate = useNavigate()
  const [cart, setCart] = useState([])

  const handleClickSmoothie = (id) => {
    navigate(`/smoothie/${id}`)
    window.scrollTo(0, 0)
  }

  const handleClickSmoothiePurchase = useCallback(
    (smoothie) => {
      var newCart = cart || []
      newCart.push({id: smoothie.id, name: smoothie.name})
      changeCart(newCart)
  }, [cart])

  const populateSmoothies = useCallback(
    async () => {
      try {
        const res = await fetch(SMOOTHIES_URL)
        const smoothies = await res.json()
        setSmoothies(smoothies)
      } catch (error) {
        console.error(error)
      }
    }, [setSmoothies]
  )

  const updateCallback = useCallback(() => {
    setCart(getCart())
  }, [setCart])

  useEffect(() => {
    populateSmoothies()
    setCart(getCart())
    window.addEventListener('storage', updateCallback);
    return () => {
      window.removeEventListener('storage', updateCallback)
    }
  }, [setCart, populateSmoothies])


  return (
    <>
      <Container sx={{ mt: 6 }}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item>
            <Typography variant="h5" fontWeight={500}>
              Discover our smoothies
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 4, mb: 5 }} />
        <Grid container spacing={4} padding={4} justifyContent="center">
          {smoothies.map((item, index) => (
            <Grid item key={`discover-item-${index}`} xs={12} sm={6} md={4}>
              <SmoothieCard
                name={item.name}
                description={item.description}
                id={item.id}
                onClick={() => handleClickSmoothie(item.id)}
                onClickPurchase={() => handleClickSmoothiePurchase(item)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

