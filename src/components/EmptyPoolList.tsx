import { Row, Text, Pressable } from 'native-base'
import { Link } from 'expo-router'

export function EmptyPoolList() {
  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {'\n'} nenhum bolão, que tal
      </Text>

      <Link href="/find" asChild>
        <Pressable>
          <Text
            textDecorationLine="underline"
            color="yellow.500"
            textDecoration="underline"
          >
            buscar um por código
          </Text>
        </Pressable>
      </Link>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        ou
      </Text>

      <Link href="/new" asChild>
        <Pressable>
          <Text textDecorationLine="underline" color="yellow.500">
            criar um novo
          </Text>
        </Pressable>
      </Link>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  )
}
