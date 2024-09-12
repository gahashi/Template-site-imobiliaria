// ** React Imports
import React, { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/material/styles'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { Icon } from '@iconify/react'
import { Button } from '@mui/material'
import { width } from '@mui/system'

const BannerFotoImovel = ({ direction, fotos, tipoImovel }) => {
  // Define fotos como um array vazio por padrão
  const [opacities, setOpacities] = useState([])
  const isAutoScrollEnabled = useRef(true) // Referência para controlar a rolagem automática

  const theme = useTheme() // Acesso ao tema atual

  // ** Hook
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: fotos.length,
    rtl: direction === 'rtl',
    initial: 0, // Slide inicial (opcional)
    loop: true, // Habilitar o looping das imagens
    slideChanged(slider) {
      if (slider.details) {
        const newOpacities = Array.from(slider.details().slides).map(slide => slide.portion)
        setOpacities(newOpacities)
      }
    }
  })

  // Atualizar opacidades ao mudar as fotos
  useEffect(() => {
    if (instanceRef.current && instanceRef.current.details) {
      const initialOpacities = Array.from(instanceRef.current.details().slides).map(() => 1) // Inicializar todas as opacidades para 1 (totalmente visível)
      setOpacities(initialOpacities)
    }
  }, [fotos, instanceRef])

  // Funções para manipulação do slide
  const handleMouseEnter = () => {
    if (instanceRef.current && isAutoScrollEnabled.current) {
      instanceRef.current.next()
      isAutoScrollEnabled.current = false
      setTimeout(() => {
        isAutoScrollEnabled.current = true
      }, 5000)
    }
  }

  const handleTouchStart = () => {
    if (instanceRef.current) {
      instanceRef.current.next()
    }
  }

  const hexToRgba = (hex, opacity) => {
    let r = 0,
      g = 0,
      b = 0

    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16)
      g = parseInt(hex[2] + hex[2], 16)
      b = parseInt(hex[3] + hex[3], 16)
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16)
      g = parseInt(hex[3] + hex[4], 16)
      b = parseInt(hex[5] + hex[6], 16)
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box ref={sliderRef} className='keen-slider' sx={{ height: [200, 250, 395], overflow: 'hidden' }}>
        {fotos.map((item, idx) => (
          <Box
            key={idx}
            className='keen-slider__slide'
            sx={{ opacity: opacities[idx], position: 'relative' }}
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleTouchStart}
          >
            <div style={{ paddingBottom: '100%', overflow: 'hidden' }}>
              <img
                src={item.path}
                alt={item.name}
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </Box>
        ))}
        <Box sx={{ position: 'absolute', top: '10px', left: '10px', display: 'flex' }}>
          {tipoImovel.map(tipoImovel => (
            <Typography
              key={tipoImovel}
              variant='body2'
              sx={{
                color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Cor do texto baseada no tema
                background: hexToRgba(theme.palette.background.paper, 0.5),
                padding: '5px 10px',
                mr: 3,
                borderRadius: '5px',
                backdropFilter: 'blur(10px)', // Efeito de acrílico
                zIndex: 1
              }}
            >
              {tipoImovel}
            </Typography>
          ))}
        </Box>
        <FormControlLabel
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1
          }}
          control={
            <Checkbox
              checked={false}
              defaultChecked
              name='favorite'
              checkedIcon={<Icon icon='mdi:heart' fontSize={24} />}
              icon={<Icon icon='mdi:heart-outline' fontSize={24} />}
            />
          }
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          zIndex: 2,
          top: '50%',
          left: '10px'
        }}
      >
        <Icon
          icon='tabler:chevron-left'
          className='arrow arrow-left'
          onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
          width={24}
          sx={{
            cursor: 'pointer',
            color: '#fff'
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          zIndex: 2,
          top: '50%',
          right: '10px'
        }}
      >
        <Icon
          icon='tabler:chevron-right'
          className='arrow arrow-right'
          width={24}
          onClick={e => e.stopPropagation() || instanceRef.current?.next()}
          sx={{
            cursor: 'pointer',
            color: '#fff'
          }}
        />
      </Box>
    </Box>
  )
}

export default BannerFotoImovel
