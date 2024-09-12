import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { useTheme } from '@emotion/react'
import { useMediaQuery } from '@mui/material'

const AddContrato = ({ formData, setFormData }) => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFormData(prevData => ({
        ...prevData,
        files: [...acceptedFiles]
      }))
    },
    multiple: false // Permitir múltiplos arquivos
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = file => {
    setFormData(prevData => ({
      ...prevData,
      files: prevData.files.filter(i => i.name !== file.name)
    }))
  }

  const handleRemoveAllFiles = () => {
    setFormData(prevData => ({
      ...prevData,
      files: []
    }))
  }

  // Função para limitar o número de caracteres
  const limitarCaracteres = (texto, limite) => {
    if (texto.length > limite) {
      return texto.slice(0, limite) + '...' // Adiciona reticências ao final do texto truncado
    }
    return texto
  }

  const fileList = (formData.files || []).map(file => {
    const sizeInKB = Math.round(file.size / 100) / 10
    const sizeInMB = sizeInKB / 1000

    return (
      <ListItem
        key={file.name}
        sx={{
          justifyContent: 'space-between',
          border: `1.5px solid ${theme.palette.text.disabled} `,
          mb: 3,
          borderRadius: 1,
          overflow: 'hidden'
        }}
      >
        <div className='file-details'>
          <div className='file-preview'>{renderFilePreview(file)}</div>
          <Box>
            <Typography className='file-name'>{isMd ? file.name : limitarCaracteres(file.name, 18)}</Typography>
            <Typography className='file-size' variant='body2'>
              {sizeInKB > 1000 ? `${sizeInMB.toFixed(1)} mb` : `${sizeInKB.toFixed(1)} kb`}
            </Typography>
          </Box>
        </div>
        <IconButton onClick={() => handleRemoveFile(file)}>
          <Icon icon='tabler:x' fontSize={20} />
        </IconButton>
      </ListItem>
    )
  })

  return (
    <Box>
      <Button {...getRootProps({ className: 'dropzone' })}>adicionar contrato</Button>
      <Typography sx={{ color: 'text.secondary' }} fontSize={isMd ? 16 : 10}>
        Salve uma copia do seu contrato com seu cliente (doc, word, pdf jpng png etc...)
      </Typography>
      <Typography sx={{ color: 'text.secondary' }} fontSize={isMd ? 16 : 10}>
        Caso tenha que enviar +1 arquivo envie em arquivo .zip
      </Typography>
      {/* <Box sx={{ border: `1.5px solid ${theme.palette.text.disabled} `, py: 3, borderRadius: 1 }}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            sx={{
              mb: 8.75,
              width: 48,
              height: 48,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
            }}
          >
            <Icon icon='tabler:upload' fontSize='1.75rem' />
          </Box>
          <Typography variant='h4' sx={{ mb: 2.5 }} fontSize={isMd ? 24 : 18}>
            Adicione fotos do seu imovel
          </Typography>
          <Typography sx={{ color: 'text.secondary' }} fontSize={isMd ? 16 : 10}>
            (Click para adicionar fotos salvas no seu dispositivo)
          </Typography>
        </Box>
      </Box> */}
      {formData.files && formData.files.length ? (
        <Fragment>
          <Box>
            <List>{fileList}</List>
          </Box>
          {/* <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove todas as fotos
            </Button>
          </div> */}
        </Fragment>
      ) : null}
    </Box>
  )
}

export default AddContrato
