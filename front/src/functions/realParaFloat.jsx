export const realParaFloat = valor => {
  if (typeof valor !== 'string') return 0

  // Remove qualquer caractere que não seja dígito, vírgula ou sinal de menos
  const cleanedValue = valor.replace(/[^\d,-]/g, '')

  // Substitui vírgulas por pontos para tratar a parte decimal
  const normalizedValue = cleanedValue.replace(',', '.')

  // Converte para float
  const valorNumerico = parseFloat(normalizedValue)

  // Verifica se a conversão foi bem-sucedida
  if (isNaN(valorNumerico)) return 0

  return valorNumerico
}
