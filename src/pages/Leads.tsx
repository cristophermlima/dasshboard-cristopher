/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useState, useEffect } from 'react'
import {
  CardComponent,
  CustomTable,
  FormComponent,
  Header,
  StyledH2,
  StyledButton,
  StyledSpan,
  StyledP,
} from '@/components'
import { Grid, Container } from '@mui/material'
import { useFormValidation, useGet, usePost, useDelete } from '@/hooks'
import { InputProps, LeadsData, LeadsPostData, MessageProps } from '@/types'

function Leads() {
  const {
    data: createLeadsData,
    loading: createLeadsLoading,
    error: createLeadsError,
    postData: createLeadsPostData,
  } = usePost<LeadsData, LeadsPostData>('leads/create', true)
  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
    getData: getLeads,
  } = useGet<LeadsData[]>('leads')
  const { deleteData: leadsDeleteData, loading: leadsDeleteLoading } =
    useDelete('profile/delete')

  const inputs: InputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]

  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formValid) return

    await createLeadsPostData({
      name: formValues['name'] || '',
      email: formValues['email'] || '',
      phone: formValues['phone'] || '',
    })
  }

  const handleDelete = async (id: number) => {
    const isConfirmed = confirm('Tem certeza que deseja excluir seu lead?')
    if (!isConfirmed) return

    try {
      await leadsDeleteData({ params: { id } })
      alert('Lead deletado com sucesso!')
    } catch {
      alert(
        'Não foi possível realizar a operação. Entre em contato com o nosso suporte.'
      )
    }
  }

  const [createMessage, setCreateMessage] = useState<MessageProps>({
    type: 'success',
    msg: '',
  })

  const clearMessage = () => {
    setTimeout(() => setCreateMessage({ type: 'success', msg: '' }), 3000)
  }

  useEffect(() => {
    if (createLeadsData?.id) {
      setCreateMessage({ msg: 'Lead criado com sucesso', type: 'success' })
      getLeads()
      clearMessage()
    } else if (createLeadsError) {
      setCreateMessage({
        msg: 'Não foi possível realizar a operação. Entre em contato com nosso suporte.',
        type: 'error',
      })
    }
  }, [createLeadsData, createLeadsError])

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={7}>
            <CardComponent>
              {!leadsError && !leadsLoading ? (
                leadsData?.length ? (
                  <CustomTable
                    headers={['Nome', 'Email', 'Telefone', '']}
                    rows={leadsData.map((lead) => [
                      <StyledP key={`name-${lead.id}`}>{lead.name}</StyledP>,
                      <StyledP key={`email-${lead.id}`}>{lead.email}</StyledP>,
                      <StyledP key={`phone-${lead.id}`}>{lead.phone}</StyledP>,
                      <StyledButton
                        key={`delete-${lead.id}`}
                        className="borderless-alert"
                        onClick={() => handleDelete(lead.id)}
                        disabled={leadsDeleteLoading}
                      >
                        Excluir
                      </StyledButton>,
                    ])}
                  />
                ) : (
                  <StyledSpan>Sem leads cadastrados</StyledSpan>
                )
              ) : (
                <StyledSpan>Erro ao carregar leads</StyledSpan>
              )}
            </CardComponent>
          </Grid>
          <Grid item xs={12} sm={5}>
            <CardComponent>
              <StyledH2 className="mb-1">Cadastrar Leads</StyledH2>
              <FormComponent
                inputs={inputs.map((input) => {
                  if (!input.name) return input // Ignora inputs inválidos
                  return {
                    ...input,
                    value: formValues[input.name] || '',
                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(input.name!, e.target.value),
                  }
                })}
                buttons={[
                  {
                    className: 'primary',
                    disabled: !formValid || createLeadsLoading,
                    type: 'submit',
                    onClick: handleSubmit,
                    children: 'Cadastrar lead',
                  },
                ]}
                message={createMessage}
              />
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Leads
