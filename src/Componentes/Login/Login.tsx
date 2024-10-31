import { useState } from "react";
import { LoginData } from "../../Interfaces/LoginData";
import { LoginAPI } from "../../Servicos/MercadoFacilAPI";

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
            } else {
                alert('Falha no login');
            }
        } catch (e) {
            console.error('Falha no login' + e);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={loginData.email}
                        onChange={handleLogin}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
                    <input
                        id="senha"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleLogin}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;