import { useState } from "react";
import { generate, validate } from "gerador-validador-cpf";
import "../styles/geradorCPF.css";

function maskCPF(value: string) {
  const onlyNums = value.replace(/\D/g, "").slice(0, 11);
  return onlyNums
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

const GeradorCPF = () => {
  const [cpf, setCpf] = useState("");
  const [pontuado, setPontuado] = useState(true);
  const [inputCpf, setInputCpf] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pasted, setPasted] = useState(false);
  
  const handleValidate = () => {
    setValid(validate(inputCpf));
  };

  const gerar = () => {
    setCpf(generate({ format: pontuado }));
    setValid(null);
    setCopied(false);
    setGenerated(true);
    setTimeout(() => setGenerated(false), 1200);
  };

  const handleCopy = () => {
    if (cpf) {
      navigator.clipboard.writeText(cpf);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputCpf(maskCPF(text));
      setPasted(true);
      setTimeout(() => setPasted(false), 1200);
    } catch {
      alert("Não foi possível acessar a área de transferência.");
    }
  };

  return (
    <div className="cpf-generator-container">
      <div className="cpf-generator-card">
        <h2 className="cpf-generator-title">Gerador de CPF</h2>
        <div className="cpf-generator-checkbox">
          <input
            type="checkbox"
            checked={pontuado}
            onChange={() => setPontuado((v) => !v)}
            id="pontuacao"
          />
          <label htmlFor="pontuacao">Incluir pontuação</label>
        </div>
        <button
          className="cpf-generator-btn"
          onClick={gerar}
          type="button"
          disabled={generated}
        >
          {!generated ? (
            <>
              <span className="btn-icon">🔄</span>
              Gerar CPF
            </>
          ) : (
            <span className="cpf-btn-check" title="Gerado!">✔️</span>
          )}
        </button>
        <div className="cpf-generator-output-group">
          <input
            type="text"
            value={cpf}
            readOnly
            className="cpf-generator-output"
            placeholder="CPF gerado aparecerá aqui"
          />
          <button
            className="cpf-copy-btn"
            onClick={handleCopy}
            disabled={!cpf || copied}
            title="Copiar CPF"
            type="button"
          >
            {!copied ? (
              <span className="btn-icon">📋</span>
            ) : (
              <span className="cpf-btn-check" title="Copiado!">✔️</span>
            )}
          </button>
        </div>
        <div className="cpf-validator-label-group">
          <span className="cpf-validator-title">Validar CPF</span>
          <button
            className="cpf-paste-btn"
            type="button"
            onClick={handlePaste}
            title="Colar CPF"
            disabled={pasted}
          >
            {!pasted ? (
              <span className="btn-icon">📍</span>
            ) : (
              <span className="cpf-btn-check" title="Colado!">✔️</span>
            )}
          </button>
        </div>
        <input
          type="text"
          value={inputCpf}
          onChange={e => setInputCpf(maskCPF(e.target.value))}
          className="cpf-validator-input"
          placeholder="Digite um CPF para validar"
          maxLength={14}
        />
        <button className="cpf-validator-btn" onClick={handleValidate}>
          Validar CPF
        </button>
        {valid !== null && (
          <div className={`cpf-validator-result ${valid ? "valid" : "invalid"}`}>
            {valid ? "CPF válido!" : "CPF inválido!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeradorCPF;
