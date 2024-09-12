export const valorParaReal = valor => {
  let valorNumerico

  if (typeof valor === 'string') {
    valorNumerico = parseFloat(valor.replace(',', '.'))
  } else if (typeof valor === 'number') {
    valorNumerico = valor
  } else {
    return ''
  }

  if (isNaN(valorNumerico)) return ''

  return valorNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
