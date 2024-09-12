export const formatarValor = valor => {
  if (typeof valor !== 'string') return ''

  const valorNumerico = Number(valor.replace(/\D/g, '')) / 100
  if (isNaN(valorNumerico)) return ''

  return valorNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
