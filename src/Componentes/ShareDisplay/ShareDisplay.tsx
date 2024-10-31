import React from "react";

interface AcaoDisplayProps {
    logoUrl: string;
    symbol: string;
    shortName: string;
    currency: string;
    regularMarketPrice: number;
    regularMarketDayRange: string;
    regularMarketDayHigh: number;
}

const AcaoDisplay: React.FC<AcaoDisplayProps> = ({
                                                     logoUrl,
                                                     symbol,
                                                     shortName,
                                                     currency,
                                                     regularMarketPrice,
                                                     regularMarketDayRange,
                                                     regularMarketDayHigh,
                                                 }) => {
    return (
        <div className="p-5 border border-gray-300 rounded-lg shadow-md flex flex-col justify-between h-full">
            <div className="flex items-center mb-4">
                <img
                    src={logoUrl}
                    alt={shortName}
                    className="w-24 h-24 rounded-full mr-4"
                />
                <h2 className="text-xl font-bold">{symbol}</h2>
            </div>
            <div className="text-left ml-2 flex-1">
                <p><strong>Nome:</strong> {shortName}</p>
                <p><strong>Moeda:</strong> {currency}</p>
                <p><strong>Preço:</strong> {regularMarketPrice.toFixed(2)} R$</p>
                <p><strong>Variação do dia:</strong> {regularMarketDayRange} R$</p>
                <p><strong>Maior preço hoje:</strong> {regularMarketDayHigh} R$</p>
            </div>
        </div>
    );
};

export default AcaoDisplay;