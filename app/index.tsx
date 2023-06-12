import { Center, Icon, Text } from 'native-base'
import { Fontisto } from '@expo/vector-icons'

import Logo from '../src/assets/logo.svg'
import { Button } from '../src/components/Button'
import { useAuth } from '../src/hooks/useAuth'

export default function App() {
  const { signIn, isUserLoading } = useAuth()

  return (
    <Center flex={1} p={7}>
      <Logo width={212} height={40} />

      <Button
        title="ENTRAR COM GOOGLE"
        type="SECONDARY"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: 'white' } }}
        onPress={signIn}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  )
}
