import React, { useEffect, useState } from "react";
import { buscarAcoes } from "../../Servicos/MercadoFacilAPI";
import { Paginator } from 'primereact/paginator';
import AcaoDisplay from '../ShareDisplay/ShareDisplay';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

interface Acao {
  symbol: string;
  logourl: string;
  shortName: string;
  currency: string;
  regularMarketPrice: number;
  regularMarketDayRange: string;
  regularMarketDayHigh: number;
}

const ShareList: React.FC = () => {
  const [acoes, setAcoes] = useState<Acao[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0); 
  const [page, setPage] = useState<number>(0); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const resultsByPage = 8;

  useEffect(() => {
    const fetchAcoes = async () => {
      try {
        setLoading(true);
        const data = await buscarAcoes(page, resultsByPage); 

        setAcoes(data.items); 
        setTotalRecords(data.totalCount); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcoes();
  }, [page, resultsByPage]);

  const onPageChange = (e: any) => {
    setPage(e.page); 
  };

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Ações</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {acoes.map((acao) => (
          <div key={acao.symbol} style={{ flex: '1 1 calc(25% - 20px)', margin: "10px" }}>
            <AcaoDisplay 
              symbol={acao.symbol} 
              logoUrl={acao.logourl} 
              shortName={acao.shortName}
              currency={acao.currency} 
              regularMarketPrice={acao.regularMarketPrice} 
              regularMarketDayRange={acao.regularMarketDayRange} 
              regularMarketDayHigh={acao.regularMarketDayHigh} 
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Paginator
          first={page * resultsByPage}
          rows={resultsByPage}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
          template="PrevPageLink PageLinks NextPageLink"
          className="p-jc-center"
        />
      </div>
    </div>
  );
};

export default ShareList;
