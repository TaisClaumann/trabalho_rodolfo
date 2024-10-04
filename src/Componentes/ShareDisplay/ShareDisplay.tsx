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
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        height: "100%", 
        display: "flex",
        flexDirection: "column", 
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <img
          src={logoUrl}
          alt={shortName}
          style={{ width: "100px", height: "100px", borderRadius: "50%", marginRight: "20px" }}
        />
        <h2>{symbol}</h2>
      </div>
      <div style={{ textAlign: "left", marginLeft: "10px", flex: 1 }}>
        <p><strong>Nome:</strong> {shortName}</p>
        <p><strong>Moeda:</strong> {currency}</p>
        <p><strong>Preço:</strong> {regularMarketPrice} R$</p>
        <p><strong>Variação do dia:</strong> {regularMarketDayRange} R$</p>
        <p><strong>Maior preço hoje:</strong> {regularMarketDayHigh} R$</p>
      </div>
    </div>
  );
};

export default AcaoDisplay;