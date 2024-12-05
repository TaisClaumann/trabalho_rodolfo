import React, { useEffect, useState } from "react";
import { getAcaoPorCodigo } from "../../Servicos/MercadoFacilAPI";
import AcaoDisplay from "../ShareDisplay/ShareDisplay";
import { AcaoProps } from "../../Interfaces/AcaoProps";

const ShareFavList: React.FC = () => {
  const [acoes, setAcoes] = useState<AcaoProps[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const resultsByPage = 8;
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  const handleToggleFavorite = (symbol: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(symbol)
        ? prevFavorites.filter((fav) => fav !== symbol)
        : [...prevFavorites, symbol];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  useEffect(() => {
    const fetchAcoes = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedAcoes: AcaoProps[] = [];

        for (const f of favorites) {
          const data = await getAcaoPorCodigo(f);

          if (!data || Object.keys(data).length === 0) {
            setError("Ação não encontrada");
            return;
          }
          fetchedAcoes.push(data);
        }

        setAcoes(fetchedAcoes);
        setTotalRecords(fetchedAcoes.length);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) fetchAcoes();
  }, [favorites]);

  const onPageChange = (newPage: number) => setPage(newPage);

  if (loading)
    return <StatusMessage message="Carregando..." type="loading" />;
  if (error)
    return <StatusMessage message={`Erro: ${error}`} type="error" />;

  const totalPages = Math.ceil(totalRecords / resultsByPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">Lista de Ações Favoritas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {acoes.map((acao) => (
          <div key={acao.symbol} className="flex justify-center">
            <AcaoDisplay
              symbol={acao.symbol}
              logourl={acao.logourl}
              shortName={acao.shortName}
              currency={acao.currency}
              regularMarketPrice={acao.regularMarketPrice}
              regularMarketDayRange={acao.regularMarketDayRange}
              regularMarketDayHigh={acao.regularMarketDayHigh}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.includes(acao.symbol)}
            />
          </div>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

const StatusMessage: React.FC<{ message: string; type: "loading" | "error" }> = ({ message, type }) => {
  const textColor = type === "loading" ? "text-gray-500" : "text-red-500";
  return (
    <div className="flex items-center justify-center h-full">
      <span className={`text-lg ${textColor}`}>{message}</span>
    </div>
  );
};

const Pagination: React.FC<{
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}> = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex space-x-2 items-center">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          Anterior
        </button>
        <span className="text-lg text-gray-700">
          {page} de {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
            page >= totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default ShareFavList;
