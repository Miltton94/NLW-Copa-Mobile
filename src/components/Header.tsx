import { Text, HStack, Box } from 'native-base'
import { CaretLeft, Export } from 'phosphor-react-native'

import { ButtonIcon } from './ButtonIcon'
import { useRouter } from 'expo-router'

interface HeaderProps {
  title: string
  showBackButton?: boolean
  showShareButton?: boolean
  onShare?: () => void
}

export function Header({
  title,
  showBackButton = false,
  showShareButton = false,
  onShare,
}: HeaderProps) {
  const EmptyBoxSpace = () => <Box w={6} h={6} />
  const { push } = useRouter()

  return (
    <HStack
      w="full"
      h={24}
      bgColor="gray.800"
      alignItems="flex-end"
      pb={5}
      px={5}
    >
      <HStack w="full" alignItems="center" justifyContent="space-between">
        {showBackButton ? (
          <ButtonIcon icon={CaretLeft} onPress={() => push('/pools')} />
        ) : (
          <EmptyBoxSpace />
        )}

        <Text
          color="white"
          fontFamily="medium"
          fontSize="md"
          textAlign="center"
        >
          {title}
        </Text>

        {showShareButton ? (
          <ButtonIcon icon={Export} onPress={onShare} />
        ) : (
          <EmptyBoxSpace />
        )}
      </HStack>
    </HStack>
  )
}