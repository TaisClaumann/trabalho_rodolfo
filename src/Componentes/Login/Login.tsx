import { useState } from "react";
import { LoginData } from "../../Interfaces/LoginData";
import { LoginAPI } from "../../Servicos/MercadoFacilAPI";

interface InputFieldProps {
    id: string;
    name: string;
    type: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    name,
    type,
    label,
    value,
    onChange,
    required = false
}) => (
    <div className="mb-6">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="mt-2 block w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required={required}
        />
    </div>
);

const Login = () => {
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: ""
    });

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await LoginAPI(loginData);
            if (response.data && response.status === 200) {
                sessionStorage.setItem("token", response.data.token);
                alert("Login realizado com sucesso!");
            } else {
                alert("Falha no login");
            }
        } catch (e) {
            console.error("Falha no login: ", e);
            alert("Erro ao realizar login.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-8 text-center text-purple-600">
                    Acesse sua conta
                </h2>

                <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={loginData.email}
                    onChange={handleLogin}
                    required
                />

                <InputField
                    id="password"
                    name="password"
                    type="password"
                    label="Senha"
                    value={loginData.password}
                    onChange={handleLogin}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-200 shadow-md"
                >
                    Entrar
                </button>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Não tem uma conta?{" "}
                    <a href="/register" className="text-purple-600 hover:underline">
                        Registre-se
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
