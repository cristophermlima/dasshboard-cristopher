
import { Avatar, Box, Container } from '@mui/material'
import styled from 'styled-components'
import { pxToRem } from '@/utils'
import { Logo } from '@/components'
import { Link } from 'react-router-dom'

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.appBackground};
  border-bottom: ${pxToRem(1)} solid ${(props) => props.theme.appDefaultStroke};
  margin-bottom: ${pxToRem(37)}
  width: 100%;
`

import styled from 'styled-components'
import { Avatar, Box, Container } from '@mui/material'
import { pxToRem } from '@/utils'
import { Link } from 'react-router-dom'
import { Logo } from '@/components'

const StyledHeader = styled.header`
background-color:{( ${(props) => props.theme.appBackground};
border-bottom: ${pxToRem(1)} solid ${(props) => props.theme.appDefaultStroke};
border-bottom: ${pxToRem(37)}
width: 100%;
`
 f108850117795f3e25fcecc6eb5aef59f3aeb6c6
function Header() {
  return (
    <StyledHeader>
      <Container maxWidth="lg">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            height: pxToRem(64),
          }}
        >
          <Link to="/home">
            <Logo height={30} width={73}></Logo>
          </Link>
          <Link to="/perfil">
            <Avatar
              alt="DNC Avatar"
              src="/dnc-avatar.svg"
              sx={{ width: pxToRem(40), height: pxToRem(40) }}
            ></Avatar>
          </Link>
        </Box>
      </Container>
    </StyledHeader>
  )
}
<<<<<<< HEAD

=======
>>>>>>> f108850117795f3e25fcecc6eb5aef59f3aeb6c6
export default Header
