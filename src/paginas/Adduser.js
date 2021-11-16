import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/actions";
//FORMULÁRIO
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const Adduser = () => {
    const [state, setState] = useState({
        nome: "",
        cpf: "",
        salario: "",
        desconto: "",
        dependentes: "",
    });

    const [error, setError] = useState("");

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const { nome, cpf, salario, desconto, dependentes } = state;

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !cpf || !salario || !desconto || !dependentes) {
            setError("Favor preencher todos os campos");
        } else {
            dispatch(addUser(state));
            navigate("/");
            setError("");
        }
    };

    return (
        <div>
            <h3 className="text-center">Adicionar cadastro de funcionário</h3>
            <Button variant="contained" color="secondary" onClick={() => navigate("/")}>Voltar</Button>
            <hr />
            {error && <div class="alert alert-danger" role="alert">{error} </div>}
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="Nome" value={nome} name="nome" type="text"
                    onChange={handleInputChange} />
                <TextField id="outlined-basic" label="CPF" value={cpf} name="cpf" type="text"
                    onChange={handleInputChange} />
                <TextField id="outlined-basic" label="Salário" value={salario} name="salario" type="text"
                    onChange={handleInputChange} />
                <TextField id="outlined-basic" label="Desconto" value={desconto} name="desconto" type="text"
                    onChange={handleInputChange} />
                <TextField id="outlined-basic" label="Dependentes" value={dependentes} name="dependentes" type="number"
                    onChange={handleInputChange} />
                <br />
                <Button variant="contained" style={{ marginTop: "10px" }} className="btn btn-primary" type="submit"
                    onChange={handleInputChange}>Cadastrar</Button>
            </form>
        </div>
    )
}

export default Adduser;
