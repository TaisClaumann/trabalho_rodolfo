import React, { useEffect, useState } from "react";
import { buscarAcoes } from "../../Servicos/MercadoFacilAPI";
import AcaoDisplay from '../ShareDisplay/ShareDisplay';

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

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) return <div className="flex items-center justify-center h-full"><span className="text-lg text-gray-500">Loading ...</span></div>;
  if (error) return <div className="flex items-center justify-center h-full"><span className="text-lg text-red-500">Error: {error}</span></div>;

  const totalPages = Math.ceil(totalRecords / resultsByPage);

  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Lista de Ações</h1>
        <div className="flex flex-wrap justify-between">
          {acoes.map((acao) => (
              <div key={acao.symbol} className="flex-1 min-w-[200px] max-w-[calc(25%-20px)] mb-4 mx-2">
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

        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <button
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              Anterior
            </button>
            <span className="flex items-center">{page + 1} de {totalPages}</span>
            <button
                disabled={page >= totalPages - 1}
                onClick={() => onPageChange(page + 1)}
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${page >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
  );
};

export default ShareList;