import { StyledH2, StyledSpan } from '@/components'
import { Avatar, Box } from '@mui/material'
import { pxToRem } from '@/utils'
import { AvatarsListProps } from '@/types'

function AvatarsList(props: AvatarsListProps) {
  return (
    <>
      {props.listData.map((item, index) => (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            padding: `${pxToRem(12)} 0 `,
            key: { index },
          }}
        >
          <Box>
            <Avatar
              alt={item.name}
              src={item.avatar}
              sx={{
                width: pxToRem(48),
                height: pxToRem(48),
                marginRight: pxToRem(16),
              }}
            ></Avatar>
          </Box>
          <Box>
            <StyledH2>{item.name}</StyledH2>
            <StyledSpan>{item.subtitle}</StyledSpan>
          </Box>
        </Box>
      ))}
    </>
  )
}
export default AvatarsList