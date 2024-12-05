import { useFieldArray, useForm } from "react-hook-form";
import { CriarUsuario } from "../../Servicos/MercadoFacilAPI";

interface InputFieldProps {
    id: string;
    label: string;
    register: any;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, register, type = "text" }) => (
    <div>
        <label htmlFor={id} className="block mb-1">{label}</label>
        <input
            id={id}
            {...register}
            type={type}
            className="w-full p-2 border rounded"
        />
    </div>
);

const Usuario = () => {
    const { register, handleSubmit, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "addresses"
    });

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            await CriarUsuario(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Dados de Acesso */}
                <fieldset className="border p-4 rounded-lg">
                    <legend className="text-lg font-semibold">Dados de Acesso do Usuário</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField id="name" label="Nome" register={register("name")} />
                        <InputField id="email" label="Email" register={register("email")} />
                        <InputField id="password" label="Senha" register={register("password")} type="password" />
                        <InputField id="role" label="Role" register={register("role")} />
                    </div>
                </fieldset>

                {/* Endereços */}
                <div className="border p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Endereços</h2>
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b pb-4">
                            {[
                                { id: "street", label: "Rua" },
                                { id: "number", label: "Número" },
                                { id: "complement", label: "Complemento" },
                                { id: "neighborhood", label: "Vizinhança" },
                                { id: "city", label: "Cidade" },
                                { id: "state", label: "Estado" },
                                { id: "country", label: "País" },
                                { id: "zipCode", label: "CEP" },
                                { id: "district", label: "Bairro" },
                            ].map(({ id, label }) => (
                                <InputField
                                    key={id}
                                    id={`${id}-${index}`}
                                    label={label}
                                    register={register(`addresses[${index}].${id}`)}
                                />
                            ))}

                            <button
                                type="button"
                                className="mt-2 bg-red-600 text-white rounded px-4 py-2"
                                onClick={() => remove(index)}
                            >
                                Remover Endereço
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-gray-600 text-white rounded px-4 py-2"
                        onClick={() => append({})}
                    >
                        Adicionar Endereço
                    </button>
                </div>

                <button type="submit" className="bg-green-600 text-white rounded px-4 py-2 mt-4">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Usuario;
