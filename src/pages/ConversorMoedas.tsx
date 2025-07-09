import React, { useState, useEffect } from "react";
import "../styles/conversorMoedas.css";

const moedas = [
  { code: "BRL", nome: "Real Brasileiro" },
  { code: "USD", nome: "Dólar Americano" },
  { code: "EUR", nome: "Euro" },
  { code: "GBP", nome: "Libra Esterlina" },
  { code: "JPY", nome: "Iene Japonês" },
  { code: "ARS", nome: "Peso Argentino" },
];

const API_KEY = "fca_live_L7EzOb73yLvB5SmmUXSmJAo0We4R126sZJs3y1AO";

const ConversorMoedas: React.FC = () => {
  const [from, setFrom] = useState("BRL");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState("");
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const url = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.data) {
          const ratesObj: { [key: string]: number } = {};
          Object.keys(data.data).forEach((code) => {
            ratesObj[code] = data.data[code].value;
          });
          setRates(ratesObj);
        } else {
          setRates({});
        }
      } catch {
        setRates({});
      }
      setLoading(false);
    };

    fetchRates();

    const interval = setInterval(fetchRates, 3 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      rates &&
      rates[from] !== undefined &&
      rates[to] !== undefined &&
      amount
    ) {
      const taxa = rates[to] / rates[from];
      const converted = (parseFloat(amount) * taxa).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      });
      setResult(converted);
    } else {
      setResult("");
    }
  }, [rates, from, to, amount]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setResult("");
  };

  return (
    <div className="conversor-page-bg">
      <div className="conversor-container">
        <h2 className="conversor-title">Conversor de Moedas</h2>
        <div className="conversor-form">
          <div className="conversor-row">
            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="conversor-input"
              placeholder="Valor"
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="conversor-select"
            >
              {moedas.map((m) => (
                <option key={m.code} value={m.code}>
                  {m.code} - {m.nome}
                </option>
              ))}
            </select>
            <button
              className="conversor-swap"
              onClick={handleSwap}
              title="Inverter moedas"
              type="button"
            >
              ⇄
            </button>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="conversor-select"
            >
              {moedas.map((m) => (
                <option key={m.code} value={m.code}>
                  {m.code} - {m.nome}
                </option>
              ))}
            </select>
          </div>
          <button className="conversor-btn" type="button" disabled>
            Converter
          </button>
          <div className="conversor-resultado">
            {result && (
              <p>
                {amount} {from} ={" "}
                <strong>
                  {result} {to}
                </strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversorMoedas;
