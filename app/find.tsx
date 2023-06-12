import { Heading, VStack, useToast } from 'native-base'
import { Header } from '../src/components/Header'

import { Input } from '../src/components/Input'
import { Button } from '../src/components/Button'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { api } from '../src/services/api'
import { useRouter } from 'expo-router'

export default function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
  const toast = useToast()

  const { replace } = useRouter()

  async function handleJoinPool() {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        return toast.show({
          title: 'Digite o código do bolão',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      await api.post('/pools/join', { code })

      toast.show({
        title: 'Você entrou no bolão com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      })

      setCode('')
      replace('/pools')
    } catch (error: unknown) {
      console.log(error)
      setIsLoading(false)

      if (
        error instanceof AxiosError &&
        error.response?.data?.message === 'Pool not found'
      ) {
        return toast.show({
          title: 'Bolão não encontrado',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      if (
        error instanceof AxiosError &&
        error.response?.data?.message === 'User already joined pool'
      ) {
        return toast.show({
          title: 'Você já está participando deste bolão',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      toast.show({
        title: 'Erro ao buscar bolão',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <VStack flex={1}>
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          textAlign="center"
          mb={8}
        >
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          placeholder="Qual o código do bolão?"
          mb={2}
          autoCapitalize="characters"
          value={code}
          onChangeText={setCode}
        />

        <Button
          title="BUSCAR BOLÃO"
          disabled={isLoading}
          isLoading={isLoading}
          _loading={{ _spinner: { color: 'white' } }}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  )
}
