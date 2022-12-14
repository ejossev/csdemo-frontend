import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'

import styled from '@mui/material/styles/styled'


const SmoothieImageOverlay = styled('div', { shouldForwardProp: (prop) => prop !== 'hovering' })(
  ({ theme, hovering }) => ({
    height: '100%',
    width: '100%',
    position: 'absolute',
    transition: 'all 0.3s',
    top: 0,
    zIndex: 2,
    background: `rgba(20, 20, 22, 0.3)`,
    ...(hovering ? { opacity: 1 } : { opacity: 0 }),
  })
)

const SmoothieImageContainer = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  aspectRatio: '5 / 6',
  position: 'relative',
  borderRadius: 14,
  overflow: 'hidden',
}))

const SmoothieImage = styled('img', { shouldForwardProp: (prop) => prop !== 'hovering' })(
  ({ theme, hovering }) => ({
    objectFit: 'cover',
    userSelect: 'none',
    height: '100%',
    width: '100%',
    transition: 'transform 1s',
    ...(hovering ? { transform: 'scale(1.1)' } : {}),
  })
)


const SmoothieCard = ({
  name,
  description,
  id,
  onClick,
  onClickPurchase,
  sx,
  ...props
}) => {
  const [hovering, setHovering] = useState(false)

  const image = `smoothie${id%3}.jpg`

  const handleBeginHover = () => {
    setHovering(true)
  }

  const handleEndHover = () => {
    setHovering(false)
  }

  const handleClickImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClick(e)
  }

  const handleClickPurchase = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClickPurchase(e)
  }

  return (
    <Paper
      variant="plain"
      sx={{ cursor: 'pointer', ...sx }}
      onClick={handleClick}
      onMouseEnter={handleBeginHover}
      onMouseLeave={handleEndHover}
      {...props}
    >
      <Box sx={{ padding: 1 }}>
        <SmoothieImageContainer sx={{ cursor: 'default' }} onClick={handleClickImage}>
          <SmoothieImageOverlay hovering={hovering}> 
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                height="100%"
                padding={2}
              >
              <Grid item>
                <Button
                  size="large"
                  fullWidth
                  startIcon={
                    <SvgIcon>
                      <use xlinkHref="#icon-wallet" />
                    </SvgIcon>
                  }
                  onClick={handleClickPurchase}
                  disabled={false}
                >
                  Purchase
                </Button>
              </Grid>
            </Grid>
          </SmoothieImageOverlay>
          <SmoothieImage src={image} hovering={hovering} />
        </SmoothieImageContainer>
        <Grid container padding={2} spacing={1} justifyContent="space-between">
          <Grid item xs={12} zeroMinWidth>
            <Grid container wrap="nowrap" justifyContent="space-between" spacing={1}>
              <Grid item zeroMinWidth>
                <Typography variant="h6" color="text.primary" noWrap textOverflow="ellipsis">
                  {name}
                </Typography>
              </Grid>
              <Grid item>
                <Chip variant="outlined" color="secondary" label={`${5} CHF`} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} zeroMinWidth>
            <Typography variant="body1" noWrap>
              {description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider orientation="horizontal" sx={{ my: 2 }} />
          </Grid>
          {/* <Grid item xs={12}>
            <Grid container spacing={1}>
              {!!footerContent && (
                <Grid item flexGrow={1}>
                  {footerContent}
                </Grid>
              )}
              <Grid item>
                <Chip variant="outlined" label={`${stock} in stock`} />
              </Grid>
              <Grid item>
                <Chip variant="status" color={statusColor} label={status} />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Box>
    </Paper>

  )

}

SmoothieCard.defaultProps = {
  name: '',
  description: '',
  id: 1,
  sx: {},
  onClick: () => {},
  onClickPurchase: () => {},
}

SmoothieCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  sx: PropTypes.object,
  onClick: PropTypes.func,
  onClickPurchase: PropTypes.func,
}

export default SmoothieCard
