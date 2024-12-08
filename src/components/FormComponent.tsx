import styled from 'styled-components'
import { StyledButton, StyledInput } from '@/components'
import { FormComponentProps } from '@/types' // Certifique-se de que esses tipos estão corretos
import { pxToRem } from '@/utils'

// Estilo do formulário
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${pxToRem(16)};
`

// Componente principal
function FormComponent(props: FormComponentProps) {
  const { inputs, buttons, message } = props

  return (
    <StyledForm>
      {/* Renderiza os campos de entrada */}
      {inputs.map((inputProps, index) => (
        <StyledInput key={index} {...inputProps} />
      ))}

      {/* Renderiza os botões */}
      {buttons.map((buttonProps, index) => (
        <StyledButton key={index} {...buttonProps} />
      ))}

      {/* Renderiza a mensagem, se houver */}
      {message && (
        <div
          style={{
            color: message.type === 'error' ? 'red' : 'green',
          }}
        >
          {message.msg}
        </div>
      )}
    </StyledForm>
  )
}

export default FormComponent
