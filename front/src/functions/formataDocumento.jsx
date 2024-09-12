export const formatarDocumento = documento => {
  // Remove caracteres não numéricos
  documento = documento.replace(/\D/g, '')

  // Verifica o comprimento do documento
  if (documento.length === 11) {
    // Formata CPF
    return documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  if (documento.length === 14) {
    // Formata CNPJ
    return documento.replace(/(\d{2})(\d{3})(\d{3})\/(\d{4})-(\d{2})/, '$1.$2.$3/$4-$5')
  } else {
    // Retorna o documento sem formatação se não tiver 11 ou 14 dígitos
    return documento
  }
}
