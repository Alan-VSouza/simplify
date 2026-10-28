export interface Address {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export function sanitizeCep(value: string): string {
  return value.replace(/\D/g, '').slice(0, 8);
}

export function isValidCep(cep: string): boolean {
  return /^\d{8}$/.test(sanitizeCep(cep));
}

export function maskCep(value: string): string {
  const digits = sanitizeCep(value);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export async function fetchAddressByCep(cep: string): Promise<Address> {
  const digits = sanitizeCep(cep);
  if (!isValidCep(digits)) {
    throw new Error('CEP inválido. Digite 8 números.');
  }

  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  if (!response.ok) {
    throw new Error('Não foi possível consultar o CEP agora. Tente novamente.');
  }

  const data = (await response.json()) as ViaCepResponse;
  if (data.erro) {
    throw new Error('CEP não encontrado.');
  }

  return {
    cep: data.cep,
    street: data.logradouro,
    neighborhood: data.bairro,
    city: data.localidade,
    state: data.uf,
  };
}
