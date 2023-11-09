'use client'
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  StackDivider,
  Text,
  Heading
} from '@chakra-ui/react'
import {
  FiFileText,
  FiGrid,
  FiHelpCircle,
  FiMoreVertical,
  FiPieChart,
  FiSearch,
  FiSettings
} from 'react-icons/fi'
import { SidebarButton } from '@/components/SidebarButton'
import { Router } from 'next/router'
import React from 'react'
import NextLink from 'next/link'

export type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Flex as="section" minH="100vh">
      <Stack
        flex="1"
        maxW={{ base: 'full', sm: 'xs' }}
        py={{ base: '6', sm: '8' }}
        px={{ base: '4', sm: '6' }}
        bg="bg.accent.default"
        color="fg.accent.default"
        borderRightWidth="1px"
        justifyContent="space-between"
      >
        <Stack spacing="8">
          <Heading size="md">SERVICE LENSE</Heading>
          <InputGroup>
            <InputLeftElement>
              <Icon as={FiSearch} color="fg.accent.muted" fontSize="lg" />
            </InputLeftElement>
            <Input placeholder="Search" variant="filled.accent" />
          </InputGroup>
          <Stack spacing="1">
            <NextLink href="/" passHref legacyBehavior>
              <SidebarButton leftIcon={<FiGrid />}>Dashboard</SidebarButton>
            </NextLink>
            <SidebarButton leftIcon={<FiPieChart />}>Analysis</SidebarButton>
            <NextLink href="/lenses" passHref legacyBehavior>
              <SidebarButton leftIcon={<FiFileText />}>Lenses</SidebarButton>
            </NextLink>
          </Stack>
        </Stack>
        <Stack
          spacing="4"
          divider={<StackDivider borderColor="bg.accent.subtle" />}
        >
          <Box />
          <Stack spacing="1">
            <SidebarButton leftIcon={<FiHelpCircle />}>
              Help Center
            </SidebarButton>
            <SidebarButton leftIcon={<FiSettings />}>Settings</SidebarButton>
          </Stack>
          <HStack spacing="3" justify="space-between">
            <HStack spacing="3">
              <Avatar boxSize="10" src="https://i.pravatar.cc/300" />
              <Box>
                <Text textStyle="sm" fontWeight="medium">
                  John Doe
                </Text>
                <Text textStyle="sm" color="fg.accent.muted">
                  john@chakra-ui.com
                </Text>
              </Box>
            </HStack>
            <IconButton
              variant="tertiary.accent"
              icon={<FiMoreVertical />}
              aria-label="Open Menu"
            />
          </HStack>
        </Stack>
      </Stack>
    </Flex>
  )
}
