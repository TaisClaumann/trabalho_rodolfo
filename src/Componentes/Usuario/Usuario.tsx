import { useFieldArray, useForm } from "react-hook-form";
import { CriarUsuario } from "../../Servicos/MercadoFacilAPI";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { FloatLabel } from 'primereact/floatlabel';
import './Usuario.css';

const Usuario = () => {

    const { register, handleSubmit, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "addresses"
    });

    const onSubmit = (data: any) => {
        console.log(data);
        try {
            CriarUsuario(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                
                {/* Dados de Acesso */}
                <Fieldset legend="Dados de Acesso do Usuário">
                    <div className="p-fluid grid">
                        <div className="col-12 md:col-6">
                            <FloatLabel>
                                <InputText id="name" {...register("name")} />
                                <label htmlFor="name">Nome</label>
                            </FloatLabel>
                        </div>
                        <div className="col-12 md:col-6">
                            <FloatLabel>
                                <InputText id="email" {...register("email")} />
                                <label htmlFor="email">Email</label>
                            </FloatLabel>
                        </div>
                        <div className="col-12 md:col-6">
                            <FloatLabel>
                                <InputText id="password" {...register("password")} type="password" />
                                <label htmlFor="password">Senha</label>
                            </FloatLabel>
                        </div>
                        <div className="col-12 md:col-6">
                            <FloatLabel>
                                <InputText id="role" {...register("role")} />
                                <label htmlFor="role">Role</label>
                            </FloatLabel>
                        </div>
                    </div>
                </Fieldset>

                <Accordion multiple={false}>
                    <AccordionTab header="Endereços" className="address-accordion">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-fluid grid">
                                <div className="col-12 md:col-6">
                                    <FloatLabel>
                                        <InputText id={`street-${index}`} {...register(`addresses[${index}].street`)} />
                                        <label htmlFor={`street-${index}`}>Rua</label>
                                    </FloatLabel>
                                </div>
                                <div className="col-12 md:col-6">
                                    <FloatLabel>
                                        <InputText id={`number-${index}`} {...register(`addresses[${index}].number`)} />
                                        <label htmlFor={`number-${index}`}>Número</label>
                                    </FloatLabel>
                                </div>
                                <div className="col-12 md:col-6">
                                    <FloatLabel>
                                        <InputText id={`complement-${index}`} {...register(`addresses[${index}].complement`)} />
                                        <label htmlFor={`complement-${index}`}>Complemento</label>
                                    </FloatLabel>
                                </div>
                                <div className="col-12 md:col-6">
                                    <FloatLabel>
                                        <InputText id={`neighborhood-${index}`} {...register(`addresses[${index}].neighborhood`)} />
                                        <label htmlFor={`neighborhood-${index}`}>Vizinhança</label>
                                    </FloatLabel>
                                </div>
                                <div className="col-12 md:col-6">
                                    <FloatLabel>
                                        <InputText id={`city-${index}`} {...register(`addresses[${index}].city`)} />
                                        <label htmlFor={`city-${index}`}>Cidade</label>
                                    </FloatLabel>
                                </div>
                                <div className="col-12 md:col-6">
                                    <FloatLabel>
                                        <InputText id={`state-${index}`} {...register(`addresses[${index}].state`)} />
                                        <label htmlFor={`state-${index}`}>Estado</label>
                                    </FloatLabel>
                                </div>
                                <div className="col-12 md:col-6">
                                    <FloatLabel>
                                        <InputText id={`country-${index}`} {...register(`addresses[${index}].country`)} />
                                        <label htmlFor={`country-${index}`}>País</label>
                                    </FloatLabel>
                                </div>
                                <div className="col-12 md:col-6">
                                    <FloatLabel>
                                        <InputText id={`zipCode-${index}`} {...register(`addresses[${index}].zipCode`)} />
                                        <label htmlFor={`zipCode-${index}`}>CEP</label>
                                    </FloatLabel>
                                </div>
                                <div className="col-12 md:col-6">
                                    <FloatLabel>
                                        <InputText id={`district-${index}`} {...register(`addresses[${index}].district`)} />
                                        <label htmlFor={`district-${index}`}>Bairro</label>
                                    </FloatLabel>
                                </div>
                                <Button type="button" label="Remover Endereço" className="p-button-danger mt-2 mb-5 " onClick={() => remove(index)} />
                            </div>
                        ))}
                        <Button type="button" label="Adicionar Endereço" className="p-button-secondary" onClick={() => append({})} />
                    </AccordionTab>
                </Accordion>
                <Button type="submit" label="Enviar" className="p-button-success mt-3" />
            </form>
        </div>
    );
};

export default Usuario;