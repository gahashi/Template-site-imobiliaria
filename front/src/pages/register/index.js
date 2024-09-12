import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Divider,
  Checkbox,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  InputAdornment,
  FormControlLabel as MuiFormControlLabel,
  Grid,
  TextField
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import InputMask from 'react-input-mask'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useSettings } from 'src/@core/hooks/useSettings'
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import axios from 'axios'
import toast from 'react-hot-toast'
import { letraString } from 'src/functions/letraString'
import themeConfig from 'src/configs/themeConfig'

const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const baseRegister = {
  nome: '',
  cpf: '',
  cep: '',
  email: '',
  telefone: '',
  senha: ''
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(baseRegister)
  const [erro, setErro] = useState({})

  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const verificarCampos = () => {
    const newErrors = {}
    if (formData.nome.length === 0) newErrors.nome = 'Campo obrigatório'
    if (formData.cpf.length === 0) newErrors.cpf = 'Campo obrigatório'
    if (formData.email.length === 0) newErrors.email = 'Campo obrigatório'
    if (formData.telefone.length === 0) newErrors.telefone = 'Campo obrigatório'
    if (formData.senha.length === 0) newErrors.senha = 'Campo obrigatório'
    if (formData.cep.length === 0) newErrors.cep = 'Campo obrigatório'

    setErro(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const chamadaApi = async () => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/add/corretor', formData)
      toast.success("Registrado com sucesso!")
      console.log(response)
    } catch (error) {
      if (error.response) {
        const status = error.response.status
        if (status === 400) {
          toast.error("Solicitação inválida: " + error.response.data.message)
        } else if (status === 404) {
          toast.error("Recurso não encontrado: " + error.response.data.message)
        } else if (status === 500) {
          toast.error("Erro interno do servidor: " + error.response.data.message)
        } else {
          toast.error("Erro na resposta da API: " + error.response.data.message)
        }
      } else if (error.request) {
        toast.error("Nenhuma resposta recebida do servidor.")
      } else {
        toast.error("Erro ao configurar a requisição: " + error.message)
      }
    }
  }

  const formatarFormData=()=>{
    setFormData({ ...formData,
      cep: letraString(formData.cep),
      cpf: letraString(formData.cpf),
      telefone: letraString(formData.telefone),
     })

  }



  const handleSubmit = (e) => {
    e.preventDefault()

    if (verificarCampos()) {
      formatarFormData()
      chamadaApi()
    }
  }

  return (
    <Box className='content-center' sx={{ backgroundColor: 'background.paper' }}>
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
              <strong style={{color: theme.palette.primary.main}}> {themeConfig.templateName}</strong>
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Cadastro de corretor </Typography>
            </Box>
            <form autoComplete='off' onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    size='small'
                    fullWidth
                    label='Nome'
                    name='nome'
                    placeholder='Nome do corretor'
                    value={formData.nome}
                    onChange={handleChange}
                    error={!!erro.nome}
                    helperText={erro.nome}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type='email'
                    size='small'
                    fullWidth
                    label='Email'
                    name='email'
                    placeholder='Digite o email'
                    value={formData.email}
                    onChange={handleChange}
                    error={!!erro.email}
                    helperText={erro.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputMask mask='999.999.999-99' value={formData.cpf} onChange={handleChange}>
                    {() => (
                      <TextField
                        size='small'
                        fullWidth
                        label='CPF'
                        name='cpf'
                        error={!!erro.cpf}
                        helperText={erro.cpf}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size='small'
                    fullWidth
                    label='CEP'
                    name='cep'
                    placeholder='Digite o CEP'
                    value={formData.cep}
                    onChange={handleChange}
                    error={!!erro.cep}
                    helperText={erro.cep}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputMask mask='(99) 9 9999-9999' value={formData.telefone} onChange={handleChange}>
                    {() => (
                      <TextField
                        size='small'
                        type='tel'
                        fullWidth
                        label='Telefone'
                        name='telefone'
                        error={!!erro.telefone}
                        helperText={erro.telefone}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Senha'
                    type={showPassword ? 'text' : 'password'}
                    name='senha'
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={!!erro.senha}
                    helperText={erro.senha}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                    Registrar
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>Já possui uma conta?</Typography>
                <Typography component={LinkStyled} href='/login'>
                  Entrar
                </Typography>
              </Box>
              <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`
                }}
              >
                ou
              </Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
