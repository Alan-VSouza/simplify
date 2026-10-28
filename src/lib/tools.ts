import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import {
  FaKey,
  FaFileCode,
  FaFont,
  FaRulerCombined,
  FaCalculator,
  FaMapMarkerAlt,
  FaIdCard,
  FaCoins,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

export interface Tool {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  path: string;
  icon: IconType;
  tags: string[];
  offline: boolean;
  Component: LazyExoticComponent<ComponentType>;
}

export const tools: Tool[] = [
  {
    id: 'cpf-cnpj',
    name: 'Gerador e Validador de CPF/CNPJ',
    shortDescription: 'Gere e valide documentos para testes.',
    description:
      'Gera CPFs e CNPJs válidos para uso em testes, com máscara automática, cópia com um clique e validação de documentos existentes.',
    path: '/ferramentas/cpf-cnpj',
    icon: FaIdCard,
    tags: ['documentos', 'brasil', 'validação'],
    offline: true,
    Component: lazy(() => import('../tools/cpf-cnpj/CpfCnpjTool')),
  },
  {
    id: 'cep',
    name: 'Consulta de CEP',
    shortDescription: 'Busque endereços pelo CEP via ViaCEP.',
    description:
      'Consulta o endereço completo a partir de um CEP brasileiro, usando a API pública e gratuita do ViaCEP.',
    path: '/ferramentas/cep',
    icon: FaMapMarkerAlt,
    tags: ['documentos', 'brasil', 'endereço'],
    offline: false,
    Component: lazy(() => import('../tools/cep/CepTool')),
  },
  {
    id: 'currency-converter',
    name: 'Conversor de Moedas',
    shortDescription: 'Converta valores entre moedas com taxas atualizadas.',
    description:
      'Converte valores entre moedas usando taxas de câmbio públicas e atualizadas, sem necessidade de chave de API.',
    path: '/ferramentas/conversor-moedas',
    icon: FaCoins,
    tags: ['finanças', 'conversor'],
    offline: false,
    Component: lazy(() => import('../tools/currency-converter/CurrencyConverterTool')),
  },
  {
    id: 'interest-calculator',
    name: 'Calculadora de Juros Compostos e Financiamento',
    shortDescription: 'Simule investimentos e financiamentos (Price/SAC).',
    description:
      'Calcula o crescimento de um investimento com juros compostos e simula financiamentos pelas tabelas Price e SAC, com gráfico de evolução.',
    path: '/ferramentas/juros-financiamento',
    icon: FaCalculator,
    tags: ['finanças', 'calculadora'],
    offline: true,
    Component: lazy(() => import('../tools/interest-calculator/InterestCalculatorTool')),
  },
  {
    id: 'password-generator',
    name: 'Gerador de Senhas Seguras',
    shortDescription: 'Crie senhas fortes e aleatórias.',
    description:
      'Gera senhas seguras usando a Web Crypto API, com opções de tamanho e tipos de caracteres e indicador de força.',
    path: '/ferramentas/gerador-senhas',
    icon: FaKey,
    tags: ['segurança', 'gerador'],
    offline: true,
    Component: lazy(() => import('../tools/password-generator/PasswordGeneratorTool')),
  },
  {
    id: 'unit-converter',
    name: 'Conversor de Unidades',
    shortDescription: 'Converta comprimento, massa, volume e temperatura.',
    description:
      'Converte valores entre unidades de comprimento, massa, volume e temperatura.',
    path: '/ferramentas/conversor-unidades',
    icon: FaRulerCombined,
    tags: ['conversor', 'utilidades'],
    offline: true,
    Component: lazy(() => import('../tools/unit-converter/UnitConverterTool')),
  },
  {
    id: 'text-counter',
    name: 'Contador de Caracteres e Palavras',
    shortDescription: 'Conte caracteres, palavras e tempo de leitura.',
    description:
      'Conta caracteres, palavras, frases e estima o tempo de leitura de um texto em tempo real.',
    path: '/ferramentas/contador-texto',
    icon: FaFont,
    tags: ['texto', 'utilidades'],
    offline: true,
    Component: lazy(() => import('../tools/text-counter/TextCounterTool')),
  },
  {
    id: 'json-formatter',
    name: 'Formatador e Validador de JSON',
    shortDescription: 'Formate, valide e minifique JSON.',
    description: 'Formata, valida e minifica documentos JSON, apontando erros de sintaxe.',
    path: '/ferramentas/formatador-json',
    icon: FaFileCode,
    tags: ['desenvolvimento', 'utilidades'],
    offline: true,
    Component: lazy(() => import('../tools/json-formatter/JsonFormatterTool')),
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function searchTools(query: string, category: string | null): Tool[] {
  const normalizedQuery = query.trim().toLowerCase();

  return tools.filter((tool) => {
    const matchesCategory = !category || tool.tags.includes(category);
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    return (
      tool.name.toLowerCase().includes(normalizedQuery) ||
      tool.shortDescription.toLowerCase().includes(normalizedQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    );
  });
}

export function getAllTags(): string[] {
  return Array.from(new Set(tools.flatMap((tool) => tool.tags))).sort();
}
