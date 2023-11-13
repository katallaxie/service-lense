'use client'

import {
  Box,
  Circle,
  Flex,
  Stack,
  useColorModeValue as mode
} from '@chakra-ui/react'
import {
  BiBuoy,
  BiCog,
  BiCommentAdd,
  BiCreditCard,
  BiSolidTruck,
  BiHome,
  BiNews,
  BiPurchaseTagAlt,
  BiRecycle,
  BiRedo,
  BiUserCircle,
  BiWallet
} from 'react-icons/bi'
import { AccountSwitcher } from './AccountSwitcher'
import { NavGroup } from './NavGroup'
import { NavItem } from './NavItem'

export type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <Box w="64" bg="gray.900" color="white" fontSize="sm">
          <Flex h="full" direction="column" px="4" py="4">
            <AccountSwitcher />
            <Stack spacing="8" flex="1" overflow="auto" pt="8">
              <Stack spacing="1">
                <NavItem active icon={<BiHome />} label="Get Started" />
                <NavItem icon={<BiCommentAdd />} label="Inbox" />
              </Stack>

              <NavGroup label="Workloads">
                <NavItem
                  href="/workloads"
                  icon={<BiSolidTruck />}
                  label="Workloads"
                />
              </NavGroup>

              <NavGroup label="Lenses">
                <NavItem
                  href="/lenses"
                  icon={<BiCreditCard />}
                  label="Lenses"
                />
              </NavGroup>

              <NavGroup label="Architecture">
                <NavItem icon={<BiNews />} label="Repository" />
              </NavGroup>
            </Stack>
            <Box>
              <Stack spacing="1">
                <NavItem subtle icon={<BiCog />} label="Settings" />
                <NavItem
                  subtle
                  icon={<BiBuoy />}
                  label="Help & Support"
                  endElement={<Circle size="2" bg="blue.400" />}
                />
              </Stack>
            </Box>
          </Flex>
        </Box>
        <Box bg={mode('white', 'gray.800')} flex="1" p="6">
          <Box
            w="full"
            h="full"
            rounded="lg"
            color={mode('gray.200', 'gray.700')}
          >
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
