export type UnitCategory = 'length' | 'mass' | 'volume' | 'temperature';

export interface UnitDefinition {
  id: string;
  label: string;
}

export const UNITS: Record<UnitCategory, UnitDefinition[]> = {
  length: [
    { id: 'mm', label: 'Milímetros' },
    { id: 'cm', label: 'Centímetros' },
    { id: 'm', label: 'Metros' },
    { id: 'km', label: 'Quilômetros' },
    { id: 'in', label: 'Polegadas' },
    { id: 'ft', label: 'Pés' },
    { id: 'mi', label: 'Milhas' },
  ],
  mass: [
    { id: 'mg', label: 'Miligramas' },
    { id: 'g', label: 'Gramas' },
    { id: 'kg', label: 'Quilogramas' },
    { id: 'oz', label: 'Onças' },
    { id: 'lb', label: 'Libras' },
  ],
  volume: [
    { id: 'ml', label: 'Mililitros' },
    { id: 'l', label: 'Litros' },
    { id: 'gal', label: 'Galões (US)' },
    { id: 'cup', label: 'Xícaras (US)' },
  ],
  temperature: [
    { id: 'c', label: 'Celsius' },
    { id: 'f', label: 'Fahrenheit' },
    { id: 'k', label: 'Kelvin' },
  ],
};

const LENGTH_TO_METERS: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  mi: 1609.344,
};

const MASS_TO_GRAMS: Record<string, number> = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  oz: 28.349523125,
  lb: 453.59237,
};

const VOLUME_TO_LITERS: Record<string, number> = {
  ml: 0.001,
  l: 1,
  gal: 3.785411784,
  cup: 0.2365882365,
};

function convertLinear(value: number, from: string, to: string, table: Record<string, number>) {
  return (value * table[from]) / table[to];
}

function celsiusToUnit(celsius: number, unit: string): number {
  if (unit === 'c') return celsius;
  if (unit === 'f') return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

function unitToCelsius(value: number, unit: string): number {
  if (unit === 'c') return value;
  if (unit === 'f') return ((value - 32) * 5) / 9;
  return value - 273.15;
}

export function convertUnit(
  value: number,
  from: string,
  to: string,
  category: UnitCategory,
): number {
  if (from === to) return value;

  switch (category) {
    case 'length':
      return convertLinear(value, from, to, LENGTH_TO_METERS);
    case 'mass':
      return convertLinear(value, from, to, MASS_TO_GRAMS);
    case 'volume':
      return convertLinear(value, from, to, VOLUME_TO_LITERS);
    case 'temperature':
      return celsiusToUnit(unitToCelsius(value, from), to);
    default:
      return value;
  }
}
