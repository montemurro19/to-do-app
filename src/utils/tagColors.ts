// Cores do arco-íris para as tags
const RAINBOW_COLORS = [
  '#ef4444', // Vermelho
  '#f97316', // Laranja
  '#eab308', // Amarelo
  '#22c55e', // Verde
  '#3b82f6', // Azul
  '#a855f7', // Roxo
  '#ec4899', // Rosa
  '#6b7280', // Cinza
  '#00CED1', // Turquesa
  '#FFD700', // Dourado
  '#FF4500', // Laranja Vermelho
  '#32CD32', // Verde Lima
  '#4169E1', // Azul Real
  '#8A2BE2', // Azul Violeta
  '#FF69B4', // Rosa Quente
  '#00FA9A', // Verde Primavera
  '#FF6347', // Tomate
  '#9370DB', // Violeta Médio
  '#20B2AA', // Mar Claro
  '#FF8C00', // Laranja Escuro
];

// Mapa para armazenar cores das tags
const tagColorMap = new Map<string, string>();

// Função para obter cor de uma tag (consistente)
export function getTagColor(tag: string): string {
  if (!tagColorMap.has(tag)) {
    const colorIndex = tagColorMap.size % RAINBOW_COLORS.length;
    tagColorMap.set(tag, RAINBOW_COLORS[colorIndex]);
  }
  return tagColorMap.get(tag)!;
}

// Função para obter todas as tags existentes
export function getAllExistingTags(): string[] {
  return Array.from(tagColorMap.keys());
}

// Função para limpar o mapa (útil para testes)
export function clearTagColors(): void {
  tagColorMap.clear();
} 