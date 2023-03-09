import { NextPage } from 'next';
import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorMode,
  Spinner,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  ButtonGroup,
  IconButton,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

const Parent: NextPage = () => {

  // VARIABLES
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [inputedData, setInputedData] = useState({
    id: "",
    identityCard: "",
    name: "",
    lastName1: "",
    lastName2: "",
    telephone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  const toast = useToast();

  // CHAKRA UI
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // GET DATA TO LOAD ARRAY
  const fetchData = async () => {
    const res = await fetch('/api/parent/getData');
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  // CREATE DATA
  const handleCreateData = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editMode) {
      handleUpdateDate()
      onClose()
    } else {
      const res = await fetch('/api/parent/createData', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identityCard: inputedData.identityCard,
          name: inputedData.name,
          lastName1: inputedData.lastName1,
          lastName2: inputedData.lastName2,
          telephone: inputedData.telephone,
          email: inputedData.email,
        })
      });
      const json = await res.json();

      setInputedData({
        id: "",
        identityCard: "",
        name: "",
        lastName1: "",
        lastName2: "",
        telephone: "",
        email: "",
      })

      toast({
        title: 'Registro Creado!',
        description: "Se creo el registro correctamente.",
        status: 'success',
        position: 'bottom-right',
        duration: 4000,
        isClosable: true,
      })
    }
    setEditMode(false)
    fetchData();
  }

  // EDIT DATA
  const handleEditData = async (id: string, name: string, lastName1: string, lastName2: string, identityCard: string, telephone: string, email: string) => {
    setInputedData({ id, name, lastName1, lastName2, identityCard, telephone, email })
    onOpen()
    console.log(id, name, lastName1, lastName2, identityCard, telephone, email)
    setEditMode(true);
  }

  const handleUpdateDate = async () => {
    const res = await fetch('/api/parent/updateData', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: inputedData.id,
        identityCard: inputedData.identityCard,
        name: inputedData.name,
        lastName1: inputedData.lastName1,
        lastName2: inputedData.lastName2,
        telephone: inputedData.telephone,
        email: inputedData.email,
      })
    });
    const json = await res.json();
    console.log(json)
    onClose()
    setEditMode(false)
    fetchData()
  }

  // DELETE DATA
  const handleDeleteData = async (id: string) => {
    const res = await fetch('/api/parent/deleteLogicData', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    const json = await res.json()
    toast({
      title: 'Registro Eliminado!',
      description: "Se elimino el registro correctamente.",
      status: 'success',
      position: 'bottom-right',
      duration: 4000,
      isClosable: true,
    })
    fetchData();
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
      <main>
        <>
          {/* CONTAINER */}
          <Box px={2}>
            <Flex justifyContent={'right'}>
              <Button onClick={onOpen} size='sm' leftIcon={<AddIcon />} variant={'outline'}>
                Nuevo Padre
              </Button>

              {/* MODAL CREATE & EDIT */}
              <Modal
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <form onSubmit={handleCreateData}>
                    <ModalHeader>Nuevo Padre</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                      <FormControl mb={2}>
                        <FormLabel>Cedula</FormLabel>
                        <Input value={inputedData.identityCard || ""} type="text" onChange={(e) => setInputedData({ ...inputedData, identityCard: e.target.value })} />
                      </FormControl>

                      <FormControl mb={2}>
                        <FormLabel>Nombre</FormLabel>
                        <Input value={inputedData.name || ""} type="text" onChange={(e) => setInputedData({ ...inputedData, name: e.target.value })} />
                      </FormControl>

                      <FormControl mb={2}>
                        <FormLabel>Apellido</FormLabel>
                        <Input value={inputedData.lastName1 || ""} type="text" onChange={(e) => setInputedData({ ...inputedData, lastName1: e.target.value })} />
                      </FormControl>

                      <FormControl mb={2}>
                        <FormLabel>Segundo Apellido</FormLabel>
                        <Input value={inputedData.lastName2 || ""} type="text" onChange={(e) => setInputedData({ ...inputedData, lastName2: e.target.value })} />
                      </FormControl>

                      <FormControl mb={2}>
                        <FormLabel>Telefono</FormLabel>
                        <Input value={inputedData.telephone || ""} type="text" onChange={(e) => setInputedData({ ...inputedData, telephone: e.target.value })} />
                      </FormControl>

                      <FormControl mb={2}>
                        <FormLabel>Email</FormLabel>
                        <Input value={inputedData.email || ""} type="email" onChange={(e) => setInputedData({ ...inputedData, email: e.target.value })} />
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button type='submit' colorScheme='teal' mr={3}>
                        Agregar
                      </Button>
                      <Button variant={'ghost'} onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
            </Flex>


            {loading ?
              <Center>
                <Spinner color='teal' size='xl' />
              </Center>
              : <Box pt={4}>
                <TableContainer>
                  <Table variant='striped'>
                    <Thead>
                      <Tr>
                        <Th isNumeric>ID</Th>
                        <Th>Cedula</Th>
                        <Th>Nombre Completo</Th>
                        <Th>Telefono</Th>
                        <Th>Email</Th>
                        <Th>Acciones</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.map(({ id, name, lastName1, lastName2, identityCard, telephone, email }) => {
                        return (
                          <Tr key={id}>
                            <Td isNumeric>{id}</Td>
                            <Td>{identityCard}</Td>
                            <Td>{name} {lastName1} {lastName2}</Td>
                            <Td>{telephone}</Td>
                            <Td>{email}</Td>
                            <Td>
                              <ButtonGroup variant='ghost' spacing='1'>
                                <IconButton colorScheme='blue' icon={<ViewIcon />} aria-label='Show'></IconButton>
                                <IconButton onClick={() => handleEditData(id, name, lastName1, lastName2, identityCard, telephone, email)} colorScheme='green' icon={<EditIcon />} aria-label='Edit'></IconButton>
                                <IconButton onClick={() => handleDeleteData(id)} icon={<DeleteIcon />} colorScheme='red' aria-label='Delete'></IconButton >
                              </ButtonGroup>
                            </Td>
                          </Tr>
                        )
                      })
                      }
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th isNumeric>ID</Th>
                        <Th>Cedula</Th>
                        <Th>Nombre Completo</Th>
                        <Th>Telefono</Th>
                        <Th>Email</Th>
                        <Th>Acciones</Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Box>}
          </Box>
        </>

      </main>
    </div>
  )
}

export default Parent;