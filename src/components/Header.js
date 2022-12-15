import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { isLoggedIn, getLoggedUser, logout } from "../utils/Auth";

import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import styled from '@mui/material/styles/styled'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import SvgIcon from '@mui/material/SvgIcon'
import { registerCartChangeCallback, getCart, changeCart } from "../utils/Cart";

const NavbarBox = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  userSelect: 'none',
  height: '110px',
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
  },
}))

const Header = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [isAdmin, setAdmin] = useState(false)
  const [cart, setCart] = useState([])

  const updateCallback = useCallback(() => {
    setCart(getCart())
    const user = getLoggedUser()
    setUser(user)
    setAdmin(user?.roles?.length > 0 && user.roles[0] === 'ROLE_ADMIN')
  }, [setUser, setCart, setAdmin])

  useEffect(() => {
    updateCallback()
    window.addEventListener('storage', updateCallback);
    return () => {
      window.removeEventListener('storage', updateCallback)
    }
  }, [setCart, setUser, setAdmin])

  const handleNavHome = (e) => {
    e.preventDefault()
    navigate('/')
    window.scrollTo(0, 0)
  }

  const handleNavLogin = (e) => {
    e.preventDefault()
    navigate('/login')
    window.scrollTo(0, 0)
  }

  const handleNavLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/login')
    window.scrollTo(0, 0)
  }

  const handleResetCart = (e) => {
    e.preventDefault()
    changeCart([])
  }

  const handleCreateNew = (e) => {
    e.preventDefault()
    navigate("/edit")
  }


  return (
    <NavbarBox>
      <Grid
          container
          padding={{ xs: 1, sm: 2 }}
          spacing={{ xs: 1, sm: 4 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href="/" onClick={handleNavHome}>
              Smoothies <span>☘</span>
            </Link>
          </Grid>
          <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Divider orientation="vertical" sx={{ height: 40 }} />
          </Grid>
          { !!user?.username ? (
            <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href="/logout" onClick={handleNavLogout}>
                Logout {user?.username} 
              </Link>
            </Grid>
          ) : (
            <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href="/login" onClick={handleNavLogin}>
                Signin/Signup
              </Link>
            </Grid>
          )}

          <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href="/" onClick={handleResetCart}>
              <span>“🛒”</span>Shopping cart 
              { cart?.length ? ( <> - {cart.length} items</>) : ( <> is empty </>)}
            </Link>
          </Grid>
          { (isAdmin) && (
            <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href="/" onClick={handleCreateNew}>
                Enter new smoothie
              </Link>
            </Grid>
          )}
          


        </Grid>     
    </NavbarBox>
  );
};

export default Header