import React from "react";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, useColorModeValue, Heading, useBreakpointValue, Button, Stack, Menu, MenuButton, Avatar, MenuList, MenuItem, Box, useColorMode } from "@chakra-ui/react";

const Navbar: React.FC = () => {

    // CHAKRA UI
    const { colorMode, toggleColorMode } = useColorMode();
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname;

    return (
        <header>
            {/* NAVBAR */}
            <Box>
                <Flex py={2} px={4} alignItems={'center'} justifyContent={'space-between'} as="header" zIndex={200} position="fixed"
                    bg={useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(26, 32, 44, 0.8)')} backdropFilter="saturate(180%) blur(5px)" w="100%" borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.900')}>
                    <Box>

                        <Flex alignItems={'center'}>

                            <Heading
                                as={NextLink}
                                href="/"
                                size='md'
                                mr={5}
                                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                                color={useColorModeValue('gray.800', 'white')}>
                                Saya Montessori
                            </Heading>

                            <Button as={NextLink} color='teal' variant='ghost' href='/parent'>
                                Padres
                            </Button>
                            <Button as={NextLink} color='teal' variant='ghost' href='/student'>
                                Estudiantes
                            </Button>
                        </Flex>
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={4}>


                            <Button variant={'ghost'} onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <MenuItem>Account Settings</MenuItem>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </header>
    );
}

export default Navbar;