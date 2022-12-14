
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab'
import SvgIcon from '@mui/material/SvgIcon'


const Footer = () => {
  return (
    <Box sx={{ width: '100%', position: 'relative', alignSelf: 'end' }}>
      <Divider />
      <Container sx={{ mt: 8, mb: 2 }}>
        <Grid container spacing={6} padding={2} justifyContent="space-between">
          <Grid item maxWidth={400}>
            <p>All Rights Reserved. Copyright © 2022</p>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Footer;
