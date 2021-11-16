import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers, deleteUser } from '../redux/actions';
import { useNavigate } from "react-router-dom"
//TABELAS
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//BOTÕES
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Home = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const { users } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente deletar o cadastro deste funcionário?")) {
      dispatch(deleteUser(id))
    }
  }

  let deducao = "";
  let salBase = "";
  let irrf = "";

  return (
    <div>
      <div>
        <Button variant="contained" onClick={() => navigate("/adduser")}>Adicionar Cadastro</Button>
        <hr />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell align="center">CPF</StyledTableCell>
              <StyledTableCell align="center">Salário</StyledTableCell>
              <StyledTableCell align="center">Desconto</StyledTableCell>
              <StyledTableCell align="center">Dependentes</StyledTableCell>
              <StyledTableCell align="center">Dedução</StyledTableCell>
              <StyledTableCell align="center">Salário Base IR</StyledTableCell>
              <StyledTableCell align="center">Desconto IRRF</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          {users && users.map((user) => (
            deducao = user.dependentes * 164.57,
            //salBase = user.salario - deducao,
            salBase = user.salario - user.desconto - 164.57 * user.dependentes,
            irrf = parseInt(salBase < 1903.98 ? 0 : (
              salBase >= 1903.99 && salBase <= 2826.65 ? salBase * 7.5 % -142.80 :
                (salBase >= 2826.66 && salBase <= 3751.05 ? salBase * 15 % -354.80 :
                  (salBase >= 3751.06 && salBase <= 4664.68 ? salBase * 15 % -636.13 :
                    (salBase > 4664.69 ? salBase * 27.5 % -869.36 : ''))))),
            <TableBody>
              <StyledTableRow key={user.id}>
                <StyledTableCell align="left">{user.nome}</StyledTableCell>
                <StyledTableCell align="center">{user.cpf}</StyledTableCell>
                <StyledTableCell align="center">{user.salario.toFixed(2)}</StyledTableCell>
                <StyledTableCell align="center">{user.desconto}</StyledTableCell>
                <StyledTableCell align="center">{user.dependentes}</StyledTableCell>
                <StyledTableCell align="center">{deducao.toFixed(2)}</StyledTableCell>
                <StyledTableCell align="center">{salBase.toFixed(2)}</StyledTableCell>
                <StyledTableCell align="center">{irrf.toFixed(2)}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup variant="contained" aria-label="outlined button group">
                    <Button color="primary" onClick={() => navigate(`/edituser/${user.id}`)}>Editar</Button>
                    <Button color="error" onClick={() => handleDelete(user.id)}>Deletar</Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;