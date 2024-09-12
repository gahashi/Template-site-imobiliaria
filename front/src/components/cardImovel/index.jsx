import { Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import BannerFotoImovel from './bannerFotoImovel'
import { Box } from '@mui/system'
import { formatarValor } from 'src/functions/formatarvalores'
import CustomChip from 'src/@core/components/mui/chip'

const CardImovel = ({ imoveis }) => {
  return (
    <>
      <Card sx={{ minHeight: 500 }}>
        <BannerFotoImovel direction={'rtl'} fotos={imoveis.files} tipoImovel={imoveis.tipoTransacao} />
        <CardContent sx={{ pt: 1, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>{formatarValor(imoveis.valorImovel)}</Typography>
            <Typography>{imoveis.areaTotal}M²</Typography>
          </Box>
          {imoveis.tipoImovel.includes('Condomínio') && (
            <Typography>Condominio: {formatarValor(imoveis.valorCondominio)}</Typography>
          )}
          {imoveis.alugar && <Typography>{formatarValor(imoveis.valorAluguel) + ' ' + imoveis.alugar}</Typography>}
          <Box sx={{ m: 1, display: 'flex', justifyContent: 'start', flexWrap: 'wrap' }}>
            {imoveis.quartos.quarto && (
              <CustomChip size='small' sx={{ m: 1 }} label={'Quartos: ' + imoveis.quartos.quarto} />
            )}
            {imoveis.quartos.banheiro && (
              <CustomChip size='small' sx={{ m: 1 }} label={'Banheiros: ' + imoveis.quartos.banheiro} />
            )}
            {imoveis.quartos.vagasGaragem && (
              <CustomChip size='small' sx={{ m: 1 }} label={'Vagas garagem: ' + imoveis.quartos.vagasGaragem} />
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default CardImovel
