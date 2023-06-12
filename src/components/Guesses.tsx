import { useToast, FlatList } from 'native-base'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

import { Game, GameProps } from './Game'
import { Loading } from './Loading'
import { EmptyMyPoolList } from './EmptyMyPoolList'

interface GuessesProps {
  poolId: string
  code: string
}

export function Guesses({ poolId, code }: GuessesProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingGuess, setIsLoadingGuess] = useState(false)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  const toast = useToast()

  async function fetchGames() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${poolId}/games`)

      setGames(response.data.games)
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
    fetchGames()
  }, [poolId])

  async function handleGuessConfirm(GameId: string) {
    try {
      setIsLoadingGuess(true)

      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Preencha todos os campos',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      await api.post(`/pools/${poolId}/games/${GameId}/guesses`, {
        firstTeamPoints: parseInt(firstTeamPoints),
        secondTeamPoints: parseInt(secondTeamPoints),
      })

      toast.show({
        title: 'Palpite enviado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })

      setFirstTeamPoints('')
      setSecondTeamPoints('')
      fetchGames()
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível enviar o palpite',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoadingGuess(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          key={item.id}
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
          isLoadingGuess={isLoadingGuess}
        />
      )}
      _contentContainerStyle={{ pb: 20 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  )
}
