import React, { useState } from "react";
import ShareComponent from "../../Componentes/Share/Acao";
import B3Logo from "../../assets/B3.png";
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

const Share = () => {
  const [codigoAcao, setCodigoAcao] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputCodigo = event.target.value.toUpperCase();
    if (/^[A-Z]{4}[0-9]+$/.test(inputCodigo)) {
      setCodigoAcao(inputCodigo);
      setError(null);
    } else {
      setCodigoAcao(inputCodigo);
      setError("Código de ação inválido. Por favor, insira um código válido.");
    }
  };

  return (
    <div className="pagina-inicial">
      <img
        src={B3Logo}
        alt="Logo B3"
        style={{ width: "600px", borderRadius: "5px", marginBottom: "100px" }}
      />
      <div className="acao-input">
        <label htmlFor="codigoAcao"><b>Código da Ação:</b></label>
        <InputText
          id="codigoAcao"
          style={{ width: "800px" }}
          placeholder="Digite o código da ação (Exemplo: PETR4, BOVA11)"
          value={codigoAcao}
          onChange={handleChange}
        />
        {error && <Message severity="error" text={error} />}
      </div>
      {codigoAcao && !error && <ShareComponent symbol={codigoAcao} />}
    </div>
  );
};

export default Share;
