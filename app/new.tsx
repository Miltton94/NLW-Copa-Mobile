import { Text, Heading, VStack, useToast } from 'native-base'
import { Header } from '../src/components/Header'

import Logo from '../src/assets/logo.svg'
import { Input } from '../src/components/Input'
import { Button } from '../src/components/Button'
import { useState } from 'react'
import { api } from '../src/services/api'

export default function New() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function handleCreatePool() {
    if (!title.trim()) {
      return toast.show({
        title: 'Preencha o nome do bolão',
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    try {
      setIsLoading(true)

      await api.post('/pools', { title: title.toUpperCase() })

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })

      setTitle('')
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Erro ao criar bolão',
        placement: 'top',
        bgColor: 'green.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <Header title="Cria novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input
          placeholder="Qual o nome do seu bolão"
          mb={2}
          value={title}
          onChangeText={setTitle}
        />

        <Button
          title="Criar meu bolão"
          onPress={handleCreatePool}
          isLoading={isLoading}
          disabled={isLoading}
          _loading={{ _spinner: { color: 'white' } }}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}
