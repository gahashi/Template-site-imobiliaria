import { Card, CardContent, CardHeader, Grid, TextField, MenuItem, Button, Typography, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import InputMask from 'react-input-mask'
import AddFilerForm from './addFilerForm'
import { useTheme } from '@emotion/react'
import AddContrato from './addContrato'
import CardImovel from '../cardImovel'
import { Box } from '@mui/system'
import { formatarValor } from 'src/functions/formatarvalores'
import { quartosOptions } from 'src/functions/quartosOptions'
import { tipoImovelOptions } from 'src/functions/tipoImovelOptions'
import { tipoTransacaoOptions } from 'src/functions/tipoTransacaoOptions'
import { alugar } from 'src/functions/alugar'
import { realParaFloat } from 'src/functions/realParaFloat'

const FormularioCadastrarImovel = () => {
  const theme = useTheme()

  const [formData, setFormData] = useState({
    tipoTransacao: [],
    tipoImovel: '',
    nomeCondominio: '',
    valorCondominio: '',
    cep: '',
    rua: '',
    bairro: '',
    areaTotal: '',
    areaUtil: '',
    quartos: {},
    files: [],
    andares: 1,
    valorImovel: '',
    valorAluguel: '',
    alugar: false,
    fileContrato: []
  })

  const [formUser, setFormUser] = useState({
    nome: '',
    telephone: '',
    email: ''
  })

  const [errors, setErrors] = useState({})

  const handleChangeUser = e => {
    const { name, value } = e.target
    setFormUser({ ...formUser, [name]: value })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleQuartosChange = (event, newValue) => {
    const newQuartos = {}
    newValue.forEach(quarto => {
      newQuartos[quarto] = formData.quartos[quarto] || ''
    })
    setFormData({ ...formData, quartos: newQuartos })
  }

  const handleQuartoQuantidadeChange = (e, quarto) => {
    const { value } = e.target
    setFormData({
      ...formData,
      quartos: { ...formData.quartos, [quarto]: value }
    })
  }

  const handleTipoTransacaoChange = (event, newValue) => {
    setFormData({ ...formData, tipoTransacao: newValue })
  }

  const converterValoresEnvio = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      areaTotal: realParaFloat(prevFormData.areaTotal),
      areaUtil: realParaFloat(prevFormData.areaUtil),
      valorAluguel: realParaFloat(prevFormData.valorAluguel),
      valorCondominio: realParaFloat(prevFormData.valorCondominio),
      valorImovel: realParaFloat(prevFormData.valorImovel)
    }))
  }

  useEffect(() => {
    console.log('useefect-->> ', formData)
  }, [formData])

  const handleSubmit = e => {
    converterValoresEnvio()
    console.log(formData)
    e.preventDefault()
    const newErrors = {}
    if (formData.tipoTransacao.length === 0) newErrors.tipoTransacao = 'Campo obrigatório'
    if (!formData.tipoImovel) newErrors.tipoImovel = 'Campo obrigatório'
    if (!formData.cep) newErrors.cep = 'Campo obrigatório'
    if (!formData.rua) newErrors.rua = 'Campo obrigatório'
    if (!formData.andares) newErrors.andares = 'Campo obrigatório'
    if (!formData.bairro) newErrors.bairro = 'Campo obrigatório'
    if (!formUser.nome) newErrors.nome = 'Campo obrigatório'
    if (!formUser.telephone) newErrors.telephone = 'Campo obrigatório'
    if (!formUser.email) newErrors.email = 'Campo obrigatório'
    if (formData.tipoTransacao.includes('alugar') && !formData.alugar) newErrors.alugar = 'Campo obrigatório'
    if (formData.tipoTransacao.includes('alugar') && !formData.valorAluguel)
      newErrors.valorAluguel = 'Campo obrigatório'
    if (
      formData.tipoTransacao.includes('alugar') ||
      (formData.tipoTransacao.includes('Vender') && !formData.valorImovel)
    )
      newErrors.valorImovel = 'Campo obrigatório'
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Processar o formulário
      console.log('Form data:', formData, '\n ', formUser)
    }
  }

  function handleChangeValor(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: formatarValor(value) })
  }

  return (
    <>
      <Card>
        <CardHeader title='Cadastre seu imóvel' />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AddFilerForm formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} my={3}>
                <Typography variant='h6'>
                  <strong>Tipo de imovel</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomAutocomplete
                  size='small'
                  multiple
                  options={tipoTransacaoOptions}
                  value={formData.tipoTransacao}
                  onChange={handleTipoTransacaoChange}
                  renderInput={params => (
                    <TextField
                      size='small'
                      {...params}
                      variant='outlined'
                      label='Tipo de Transação'
                      placeholder='Escolher Tipo de Transação'
                      error={!!errors.tipoTransacao}
                      helperText={errors.tipoTransacao}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  size='small'
                  select
                  fullWidth
                  label='Tipo de Imóvel'
                  name='tipoImovel'
                  value={formData.tipoImovel}
                  onChange={handleChange}
                  error={!!errors.tipoImovel}
                  helperText={errors.tipoImovel}
                >
                  {tipoImovelOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={formData.tipoTransacao.includes('Alugar') ? 3 : 6}>
                <TextField
                  size='small'
                  fullWidth
                  label='Valor Imovel'
                  name='valorImovel'
                  placeholder='R$ 0,00'
                  value={formData.valorImovel}
                  onChange={handleChangeValor}
                />
              </Grid>
              {formData.tipoTransacao.includes('Alugar') && (
                <>
                  <Grid item xs={12} md={3}>
                    <TextField
                      size='small'
                      fullWidth
                      label='Valor aluguel'
                      name='valorAluguel'
                      placeholder='R$ 0,00'
                      value={formData.valorAluguel}
                      onChange={handleChangeValor}
                      error={!!errors.valorAluguel}
                      helperText={errors.valorAluguel}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      size='small'
                      select
                      fullWidth
                      label='Alugar'
                      name='alugar'
                      value={formData.alugar}
                      onChange={handleChange}
                      error={!!errors.alugar}
                      helperText={errors.alugar}
                    >
                      {alugar.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}
              {formData.tipoImovel === 'Condomínio' && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      size='small'
                      fullWidth
                      label='Nome do Condomínio'
                      name='nomeCondominio'
                      value={formData.nomeCondominio}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      size='small'
                      fullWidth
                      label='valorImovel do Condomínio'
                      name='valorCondominio'
                      value={formData.valorCondominio}
                      onChange={handleChangeValor}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} my={3}>
                <Typography variant='h6'>
                  <strong>Endereço</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputMask mask='99999-999' value={formData.cep} onChange={handleChange}>
                  {() => (
                    <TextField
                      size='small'
                      fullWidth
                      label='CEP'
                      name='cep'
                      error={!!errors.cep}
                      helperText={errors.cep}
                    />
                  )}
                </InputMask>
              </Grid>{' '}
              <Grid item xs={12} md={4}>
                <TextField
                  size='small'
                  fullWidth
                  label='Bairro'
                  name='bairro'
                  value={formData.bairro}
                  onChange={handleChange}
                  error={!!errors.bairro}
                  helperText={errors.bairro}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size='small'
                  fullWidth
                  label='Rua'
                  name='rua'
                  value={formData.rua}
                  onChange={handleChange}
                  error={!!errors.rua}
                  helperText={errors.rua}
                />
              </Grid>
              <Grid item xs={12} my={3}>
                <Typography variant='h6'>
                  <strong>Tamanho do imovel</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size='small'
                  fullWidth
                  type='number'
                  label='Área Total (m²)'
                  name='areaTotal'
                  value={formData.areaTotal}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size='small'
                  fullWidth
                  type='number'
                  label='Área Útil (m²)'
                  name='areaUtil'
                  value={formData.areaUtil}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size='small'
                  fullWidth
                  type='number'
                  defaultValue={formData.andares}
                  label='Andares'
                  name='andares'
                  value={formData.andares}
                  onChange={handleChange}
                  error={!!errors.andares}
                  helperText={errors.andares}
                />
              </Grid>
              <Grid item xs={12} my={3}>
                <Typography variant='h6'>
                  <strong>Especificações do imovel</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomAutocomplete
                  multiple
                  options={quartosOptions}
                  value={Object.keys(formData.quartos)}
                  onChange={handleQuartosChange}
                  renderInput={params => (
                    <TextField
                      size='small'
                      {...params}
                      variant='outlined'
                      label='Cômodos'
                      placeholder='Adicionar Cômodo'
                    />
                  )}
                />
              </Grid>
              {Object.keys(formData.quartos).map((quarto, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <TextField
                    size='small'
                    fullWidth
                    label={`qtd ${quarto}`}
                    value={formData.quartos[quarto]}
                    onChange={e => handleQuartoQuantidadeChange(e, quarto)}
                  />
                </Grid>
              ))}
              <Grid item xs={12} my={3}>
                <Typography variant='h6'>
                  <strong>Informações de contato</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size='small'
                  fullWidth
                  label='Nome'
                  name='nome'
                  value={formUser.nome}
                  onChange={handleChangeUser}
                  error={!!errors.nome}
                  helperText={errors.nome}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputMask mask='(99) 9 9999-9999' value={formUser.telephone} onChange={handleChangeUser}>
                  {() => (
                    <TextField
                      size='small'
                      type='tel'
                      fullWidth
                      label='telefone'
                      name='telephone'
                      error={!!errors.telephone}
                      helperText={errors.telephone}
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size='small'
                  fullWidth
                  type='email'
                  label='Email'
                  name='email'
                  value={formUser.email}
                  onChange={handleChangeUser}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <AddContrato formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button type='submit' variant='contained'>
                  Cadastrar Imóvel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default FormularioCadastrarImovel
