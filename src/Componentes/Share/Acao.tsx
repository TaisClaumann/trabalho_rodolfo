import React, { useEffect, useState } from "react";
import { ShareProps } from "../../Interfaces/ShareProps";
import { getAcaoPorCodigo } from "../../Servicos/MercadoFacilAPI";

const Acao: React.FC<ShareProps> = ({ symbol }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;

    const fetchData = async () => {
      try {
        const response:any = await Promise.race([
          getAcaoPorCodigo(symbol),
          new Promise((_resolve, reject) => {
            timer = setTimeout(() => {
              reject(new Error("Tempo limite excedido (5 segundos)"));
            }, 5000);
          }),
        ]);

        clearTimeout(timer); 
        setData(response.data);
        setLoading(false);
      } catch (err:any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();

    return () => clearTimeout(timer);
  }, [symbol]);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <img src={data?.logourl} alt={data?.shortName} style={{ width: "100px", height: "100px", borderRadius: "50%", marginRight: "20px" }} />
        <h2>{data?.longName}</h2>
      </div>  
      <div style={{ textAlign: "left", marginLeft: "10px"}}>
          <p><strong>Nome:</strong> {data?.shortName}</p>
          <p><strong>Moeda:</strong> {data?.currency}</p>
          <p><strong>Preço:</strong> {data?.regularMarketPrice} R$</p>
        <p><strong>Variação do dia:</strong> {data?.regularMarketDayRange} R$</p>
        <p><strong>Maior preço hoje:</strong> {data?.regularMarketDayHigh} R$</p>
        </div>
      </div>
  );  
};

export default Acao;