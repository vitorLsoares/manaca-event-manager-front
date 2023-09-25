import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


import UserService from '../service/user';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(() => ({
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [userForCheck, setUserForCheck] = useState(null);

  const getUserForCheck = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const id = formData.get('guestId');
    
    UserService.update(id, {inviteCheck: true}).then(({ data }) => {
        setUserForCheck(data?.updateUser);
    });
  };

  useEffect(() => {
    UserService.getAll().then(({ data }) => {
        setUsers(data?.listUsers?.items);
    });
  }, [userForCheck]);
  

  return (
    <>
        <Box component="form" noValidate onSubmit={getUserForCheck}>
          {userForCheck && (
            <div style={{ marginBottom: '20px' }}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="success">
                  <AlertTitle>Sucesso</AlertTitle>
                  Bem Vindo ao Evento Manacá <strong>{userForCheck.name}</strong> &mdash;
                  Sua Localização é <strong>{userForCheck.eventPosition}</strong>
                </Alert>
              </Stack>
            </div>
          )}
          <div style={{display: 'flex', gap:'20px'}}>
              <TextField
                  autoComplete="given-name"
                  name="guestId"
                  fullWidth
                  id="guestId"
                  label="Id do Convidado"
                  sx={{ input: { color: 'white' }, width:'400%' }}
                  autoFocus
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
              >
                  Buscar Convidado
              </Button>
          </div>
        </Box>
        <br />
        <br />
        <div className="container-list">
        <h3 style={{color:"white"}}>{`Total de convidados ${users.length}`}</h3>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Posição no Evento</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((row, id) => (
                <StyledTableRow key={row.name} style={{background:row.inviteCheck && '#98FB98'}}>
                  <StyledTableCell>{id+1}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                      {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.eventPosition}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    </>
  );
}