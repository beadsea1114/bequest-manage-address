import { Box, createTheme, Link, ThemeProvider, Typography } from '@mui/material';
import { Container } from '@mui/system';
import logo from './logo.svg';
import AddressList from './features/address/components/AddressList';
import AddAddressDialog from './features/address/components/AddAddressDialog';
import CustomAlert from './features/alert/CustomAlert';
import SelectedAddress from './features/address/components/SelectedAddress';
import SearchAddressDialog from './features/address/components/SearchAddressDialog';

const theme = createTheme({
  typography: {
    fontFamily: [`"HCo Gotham SSm"`, "sans-serif"].join(","),
    fontSize: 14,
    h1: {
      fontWeight: 600
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box color="#343a40">
        <Box component="nav" bgcolor={"white"} sx={{ py: 2.5 }}>
          <Container maxWidth="lg">
            <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
              <Link href="#"><img src={logo} alt="Bequest" /></Link>
              <SelectedAddress />
            </Box>
          </Container>
        </Box>
        <Box component="main" bgcolor={"#f6f5ea"}>
          <Container maxWidth="lg">
            <Box paddingTop={5} paddingBottom={2}>
              <Typography variant="h1" fontSize={"3.5rem"} align="center">Find your address in the book.</Typography>
              <Typography variant="h3" fontSize={"2.875rem"} align="center" marginTop={2} fontFamily={'"Amithen",sans-serif'}>
                No address found?
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} paddingBottom={3}>
              <SearchAddressDialog />
              <AddAddressDialog />
            </Box>
            <Box bgcolor={"white"} padding={2}>
              <AddressList />
            </Box>
          </Container>
        </Box>
        <CustomAlert />
      </Box>
    </ThemeProvider>
  );
}

export default App;
