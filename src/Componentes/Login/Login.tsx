import { useState } from "react";
import { LoginData } from "../../Interfaces/LoginData";
import { LoginAPI } from "../../Servicos/MercadoFacilAPI";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FloatLabel } from 'primereact/floatlabel';
import "./Login.css";

const Login = () => {
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    });

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    const handleSubmit = async (event: React.MouseEventHandler<HTMLButtonElement> | any) => {
        event.preventDefault();
        try {
            const response = await LoginAPI(loginData);
            if (response.data && response.status === 200) {
                alert('Login realizado com sucesso');
                sessionStorage.setItem('token', response.data.token);
                const testeRecuperaDado = sessionStorage.getItem('token');
                alert('Dado Recuperado do session storage: ' + testeRecuperaDado);
            }
            else {
                alert('Falha no login');
            }
        }
        catch (e) {
            console.error('Falha no login' + e);
        }
    }

    return (
        <div className="login-container">
            <form className="row">
                <div className="field col-12 mb-4">
                    <FloatLabel>
                        <InputText id="email" name="email" value={loginData.email} onChange={handleLogin} />
                        <label htmlFor="email">Email</label>
                    </FloatLabel>
                </div>
                <div className="field col-12 mb-4">
                    <FloatLabel>
                        <InputText id="senha" name="password" type="password" value={loginData.password} onChange={handleLogin} />
                        <label htmlFor="senha">Senha</label>
                    </FloatLabel>
                </div>
                <Button label="Entrar" onClick={handleSubmit} className=" p-mt-4" />
            </form>
        </div>
    );
}

export default Login;