import { Grid } from '@mui/material'
import CardImovel from 'src/components/cardImovel'

const Imoveis = () => {
  const imoveis = [
    {
      tipoTransacao: ['Vender', 'alugar'],
      tipoImovel: 'Condomínio',
      nomeCondominio: 'Nova vida',
      valorCondominio: '20090',
      cep: '88285000',
      rua: '',
      bairro: '',
      areaTotal: 60,
      areaUtil: 23.5,
      andares: 2,
      valorImovel: '30000000',
      valorAluguel: '100000',
      alugar: 'Por mes',
      quartos: {
        dormitorios: 3,
        suites: 1,
        banheiro: 2,
        vagasGaragem: 2
      },
      files: [
        { name: 'casa1', path: '/test/img/casa1.jpg' },
        { name: 'casa2', path: '/test/img/casa2.jpg' }
      ]
    },
    {
      tipoTransacao: ['Vender'],
      tipoImovel: 'Casa',
      nomeCondominio: '',
      valorCondominio: '',
      cep: '88285000',
      rua: '',
      bairro: '',
      areaTotal: 30,
      areaUtil: 13.8,
      andares: 1,
      valorImovel: '250000',
      alugar: false,
      quartos: {
        quarto: 3,
        suite: 1,
        banheiro: 2,
        vagasGaragem: 2
      },
      files: [
        { name: 'casa1', path: '/test/img/casa1.jpg' },
        { name: 'casa2', path: '/test/img/casa2.jpg' }
      ]
    }
  ]

  return (
    <>
      <Grid container spacing={3}>
        {imoveis.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <CardImovel imoveis={item} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Imoveis
