import styled from 'styled-components'

const LoginArea = styled.div`
  background: #666;
`

const LonginImage = styled.div`
  background-image: url(/login-image.svg);
  background-size: cover;
  height: 100vh;
  width: 50vw;
`

function Login() {
  return (
    <>
      <LoginArea>LOGIN</LoginArea>
      <LonginImage />
    </>
  )
}

export default Login
