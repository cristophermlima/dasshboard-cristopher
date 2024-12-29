import { useState, useEffect } from 'react'
import { InputProps } from '@/types'

export const useFormValidation = (inputs: InputProps[]) => {
  // Garantindo que input.name seja sempre string
  const [formValues, setFormValues] = useState(
    inputs.reduce(
      (acc, input) => {
        if (input.name) {
          acc[input.name] = String(input.value || '') // Forçando o valor para string
        }
        return acc
      },
      {} as Record<string, string>
    )
  )
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    const allFieldsValid = inputs.every((input) => {
      const value = input.name ? formValues[input.name] : '' // Verificação adicional para input.name
      if (input.required && !value) {
        return false
      }
      if (input.type === 'email') {
        return /\S+@\S+\.\S+/.test(String(value))
      }
      if (input.type === 'password') {
        return String(value).length > 7
      }
      return true
    })
    setFormValid(allFieldsValid)
  }, [formValues, inputs])

  const handleChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Atualize o valor pela chave do nome
    }))
  }

  return { formValues, formValid, handleChange }
}
