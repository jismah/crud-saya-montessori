import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Spinner,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Heading,
  SimpleGrid,
  Center,
  useBreakpointValue,
  Input,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Home: NextPage = () => {

  // VARIABLES
  const [data, setData] = useState([]);
  const [inputedData, setInputedData] = useState({
    identityCard: "",
    name: "",
    lastName1: "",
    telephone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  // CHAKRA UI
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData = async () => {
    const res = await fetch('/api/parent/getData');
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  const handleCreateData = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/parent/createData', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identityCard: inputedData.identityCard,
        name: inputedData.name,
        lastName1: inputedData.lastName1,
        telephone: inputedData.telephone,
        email: inputedData.email,
      })
    });
    const json = await res.json();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Saya Montessori | CRUD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          px={4}>
          <Flex h={14} alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={useColorModeValue('gray.800', 'white')}>
                Logo
              </Text>
            </Box>

            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={4}>
                <Button onClick={toggleColorMode}>
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
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </header>

      <main>
        <>
          <Box p={3}>
            {/* LOADER */}
            <Center>
              {loading ?
                <Spinner size='xl' />
                : null}
            </Center>


            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>


              {/* DATA LIST PARENTS */}
              {data.map(({ id, name, identityCard, email }) => {
                return (
                  <Card boxShadow='xs'>
                    <CardHeader>
                      <Heading size='md'>{name}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>Su Identificacion es <strong>{identityCard}</strong>, y su correo es <strong>{email}</strong></Text>
                    </CardBody>
                    <CardFooter>
                      <Button variant='outline'>Ver Detalles</Button>
                    </CardFooter>
                  </Card>

                )
              })}
            </SimpleGrid>

            <Box pt={3}>
              <form onSubmit={handleCreateData}>

                <FormControl>
                  <FormLabel>Identity Card</FormLabel>
                  <Input type="text" onChange={(e) => setInputedData({ ... inputedData, identityCard: e.target.value})} />
                </FormControl>

                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" onChange={(e) => setInputedData({ ... inputedData, name: e.target.value})} />
                </FormControl>

                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" onChange={(e) => setInputedData({ ... inputedData, lastName1: e.target.value})} />
                </FormControl>

                <FormControl>
                  <FormLabel>Telephone</FormLabel>
                  <Input type="text" onChange={(e) => setInputedData({ ... inputedData, telephone: e.target.value})} />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" onChange={(e) => setInputedData({ ... inputedData, email: e.target.value})} />
                </FormControl>

              </form>
            </Box>
          </Box>
        </>

      </main >
    </div >
  )
}

export default Home
