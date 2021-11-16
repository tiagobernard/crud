import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUser, updateUser } from "../redux/actions";
//FORMULÁRIO
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const Edituser = () => {
    const [state, setState] = useState({
        nome: "",
        cpf: "",
        salario: "",
        desconto: "",
        dependentes: "",
    });

    const [error, setError] = useState("");
    let { id } = useParams();
    const { user } = useSelector((state) => state.data);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const { nome, cpf, salario, desconto, dependentes } = state;

    useEffect(() => {
        dispatch(getSingleUser(id))
    }, []);

    useEffect(() => {
        setState({ ...user });
    }, [user]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !cpf || !salario || !desconto || !dependentes) {
            setError("Favor preencher todos os campos");
        } else {
            dispatch(updateUser(state, id));
            navigate("/");
            setError("");
        }
    };

    return (
        <div>
            <h3 className="text-center">Editar cadastro de funcionário</h3>
            <Button variant="contained" color="secondary" onClick={() => navigate("/")}>Voltar</Button>
            <hr />
            {error && <div class="alert alert-danger" role="alert">{error} </div>}
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="Nome" value={nome || ""} name="nome" type="text"
                    onChange={handleInputChange} />
                <TextField id="outlined-basic" label="CPF" value={cpf || ""} name="cpf" type="text"
                    onChange={handleInputChange} />
                <TextField id="outlined-basic" label="Salário" value={salario || ""} name="salario" type="text"
                    onChange={handleInputChange} />
                <TextField id="outlined-basic" label="Desconto" value={desconto || ""} name="desconto" type="text"
                    onChange={handleInputChange} />
                <TextField id="outlined-basic" label="Dependentes" value={dependentes || ""} name="dependentes" type="number"
                    onChange={handleInputChange} />
                <br />
                <Button variant="contained" style={{ marginTop: "10px" }} className="btn btn-primary" type="submit"
                    onChange={handleInputChange}>Editar</Button>
            </form>
        </div>

    )
}

export default Edituser;
