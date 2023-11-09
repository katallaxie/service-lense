import { Button, ButtonProps } from '@chakra-ui/react'

export const SidebarButton = (props: ButtonProps) => (
  <Button
    as="a"
    variant="tertiary.accent"
    justifyContent="start"
    iconSpacing="3"
    {...props}
  />
)
