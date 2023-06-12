import { FlatList, Icon, VStack, useToast } from 'native-base'
import { Button } from '../src/components/Button'
import { Header } from '../src/components/Header'

import { Octicons } from '@expo/vector-icons'
import { Link, useFocusEffect, useRouter } from 'expo-router'
import { useState, useCallback } from 'react'
import { api } from '../src/services/api'

import { Loading } from '../src/components/Loading'
import { PoolCard, PoolCardProps } from '../src/components/PoolCard'
import { EmptyPoolList } from '../src/components/EmptyPoolList'

export default function Pools() {
  const [isLoading, setIsLoading] = useState(false)
  const [pools, setPools] = useState<PoolCardProps[]>()
  const { push } = useRouter()

  const toast = useToast()

  async function fetchPools() {
    try {
      setIsLoading(true)

      const response = await api.get('/pools')
      setPools(response.data.pools)
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Erro ao buscar bolões',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools()
    }, []),
  )

  return (
    <VStack flex={1}>
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Link href="/find" asChild>
          <Button
            title="BUSCAR BOLÃO POR CÓDIGO"
            leftIcon={
              <Icon as={Octicons} name="search" color="black" size="md" />
            }
          />
        </Link>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() =>
                push({ pathname: 'details', params: { id: item.id } })
              }
            />
          )}
          px={5}
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{ pb: 20 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  )
}
