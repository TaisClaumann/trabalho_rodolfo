import React, { useEffect, useState } from "react";
import { ShareProps } from "../../Interfaces/ShareProps";
import { getAcaoPorCodigo } from "../../Servicos/MercadoFacilAPI";
import AcaoDisplay from "../ShareDisplay/ShareDisplay";

const Acao: React.FC<ShareProps> = ({ symbol }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;

    const fetchData = async () => {
      try {
        const data: any = await Promise.race([
          getAcaoPorCodigo(symbol),
          new Promise((_resolve, reject) => {
            timer = setTimeout(() => {
              reject(new Error("Tempo limite excedido (5 segundos)"));
            }, 5000);
          }),
        ]);

        clearTimeout(timer);
        setData(data);
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
    <AcaoDisplay
      logoUrl={data?.logourl}
      symbol={data?.symbol}
      shortName={data?.shortName}
      currency={data?.currency}
      regularMarketPrice={data?.regularMarketPrice}
      regularMarketDayRange={data?.regularMarketDayRange}
      regularMarketDayHigh={data?.regularMarketDayHigh}
    />
  ); 
};

export default Acao;