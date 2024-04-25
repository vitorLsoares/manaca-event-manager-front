import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserService from '../service/user'

export default function CreateUserForm({ setParentState }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
        name: data.get('name'),
        email: data.get('email'),
        eventPosition: data.get('eventPosition'),
        barCode: data.get('barCode'),
        inviteCheck: false,
    };

    UserService.create(user).then(({ data }) => {
        setParentState(data?.createUser);
    });
  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" color="primary">
            Criar um Convidado
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  sx={{ input: { color: 'white' } }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  sx={{ input: { color: 'white' } }}
                  name="eventPosition"
                  label="Posição no Evento"
                  type="eventPosition"
                  id="eventPosition"
                  autoComplete="eventPosition"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  sx={{ input: { color: 'white' } }}
                  name="barCode"
                  label="BarCode"
                  type="barCode"
                  id="barCode"
                  autoComplete="barCode"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar
            </Button>
          </Box>
        </Box>
      </Container>
  );
}