import { Button } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Lenses() {
  return (
    <main>
      <NextLink href="/lenses/add" passHref>
        <Button as="a">Upload</Button>
      </NextLink>
    </main>
  )
}
