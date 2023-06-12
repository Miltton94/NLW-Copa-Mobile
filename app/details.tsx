import { useLocalSearchParams } from 'expo-router'
import { HStack, VStack, useToast } from 'native-base'
import { Share } from 'react-native'

import { Header } from '../src/components/Header'
import { Loading } from '../src/components/Loading'
import { PoolCardProps } from '../src/components/PoolCard'

import { useEffect, useState } from 'react'
import { api } from '../src/services/api'
import { PoolHeader } from '../src/components/PoolHeader'
import { EmptyMyPoolList } from '../src/components/EmptyMyPoolList'
import { Option } from '../src/components/Option'
import { Guesses } from '../src/components/Guesses'

interface Params {
  id: string
}

export default function Details() {
  const { id } = useLocalSearchParams() as unknown as Params

  const [isLoading, setIsLoading] = useState(false)
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>(
    {} as PoolCardProps,
  )
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>(
    'guesses',
  )

  const toast = useToast()

  async function fetchPoolDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${id}`)

      setPoolDetails(response.data.pool)
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível buscar os detalhes bolão',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPoolDetails()
  }, [id])

  async function handleShareCode() {
    await Share.share({
      message: `Participe do bolão ${poolDetails.title} com o código ${poolDetails.code}`,
    })
  }

  return (
    <VStack flex={1}>
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleShareCode}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {poolDetails._count?.participants > 0 ? (
            <VStack flex={1} px={5}>
              <PoolHeader data={poolDetails} />

              <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                <Option
                  title="Seus palpites"
                  isSelected={optionSelected === 'guesses'}
                  onPress={() => setOptionSelected('guesses')}
                />
                <Option
                  title="Ranking do grupo"
                  isSelected={optionSelected === 'ranking'}
                  onPress={() => setOptionSelected('ranking')}
                />
              </HStack>

              <Guesses
                key={poolDetails.id}
                poolId={poolDetails.id}
                code={poolDetails.code}
              />
            </VStack>
          ) : (
            <EmptyMyPoolList code={poolDetails.code} />
          )}
        </>
      )}
    </VStack>
  )
}
