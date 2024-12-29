import { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

// COMPONENTS
import { Box, Container } from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  BannerImage,
  FormComponent,
  Logo,
  StyledH1,
  StyledP,
} from '@/components'

// HOOKS
import { useFormValidation, usePost } from '@/hooks'

// UTILS
import { jwtExpirationDateConverter, pxToRem } from '@/utils'

// TYPES
import { DecodedJWT, MessageProps, LoginData, LoginPostData } from '@/types'

function Login() {
  const navigate = useNavigate()

  // Configuração dos inputs do formulário
  const inputs = [
    { type: 'email', placeholder: 'Email' },
    { type: 'password', placeholder: 'Senha' },
  ]

  // Hook personalizado para chamadas de API
  const { data, loading, error, postData } = usePost<LoginData, LoginPostData>(
    'login',
    true
  )

  // Hook para gerenciamento do formulário
  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  // Mensagem de erro ou sucesso
  const handleMessage = (): MessageProps => {
    if (!error) return { msg: '', type: 'success' }
    switch (error) {
      case 401:
        return { msg: 'Email e/ou senha inválidos', type: 'error' }
      default:
        return {
          msg: 'Não foi possível realizar a operação. Entre em contato com nosso suporte.',
          type: 'error',
        }
    }
  }

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Tentando logar com:', formValues)
    await postData({
      email: String(formValues[0]),
      password: String(formValues[1]),
    })
  }

  useEffect(() => {
    if (data?.jwt_token) {
      try {
        const decoded: DecodedJWT = jwtDecode(data.jwt_token)
        const expirationDate = jwtExpirationDateConverter(decoded.exp)

        Cookies.set('Authorization', data.jwt_token, {
          expires: expirationDate,
          secure: true,
        })

        console.log('Token armazenado:', data.jwt_token)
        console.log('Data de Expiração:', expirationDate)

        navigate('/home')
      } catch (err) {
        console.error('Erro ao decodificar o JWT:', err)
      }
    }
  }, [data, navigate])

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ alignItems: 'center', display: 'flex', height: '100vh' }}
        >
          <Container maxWidth="sm">
            {/* Logo */}
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <Logo height={41} width={100} />
            </Box>

            {/* Título e descrição */}
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <StyledH1>Bem-vindo</StyledH1>
              <StyledP>Digite sua senha e email para logar</StyledP>
            </Box>

            {/* Formulário */}
            <FormComponent
              inputs={inputs.map((input, index) => ({
                ...input,
                value: formValues[index] || '',
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(String(index), e.target.value),
              }))}
              buttons={[
                {
                  className: 'primary',
                  disabled: !formValid || loading,
                  type: 'submit',
                  onClick: handleSubmit,
                  children: loading ? 'Aguarde...' : 'Login',
                },
              ]}
              message={handleMessage()}
            />
          </Container>
        </Grid>

        {/* Imagem lateral (apenas em telas maiores) */}
        <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <BannerImage />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
