import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Center, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useColorMode, useDisclosure, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { Component, useEffect, useState } from 'react';

const Student: NextPage = () => {

    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        lastName1: "",
        lastName2: "",
        status: "",
        parentId: ""
    });

    const [loading, setLoading] = useState(true);

    // CHAKRA UI
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // GET DATA TO LOAD ARRAY
    const fetchData = async () => {
        const res = await fetch('http://localhost:3000/api/students', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "e923ad05-f9a2-4a4e-887c-20cef3daefdc",
            },
        });
        const json = await res.json();
        setData(json);
        setLoading(false);
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
                                Nuevo Estudiante
                            </Button>

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
                                                <Th>Nombre</Th>
                                                <Th>Apellidos</Th>
                                                <Th>Estado</Th>
                                                <Th>Acciones</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {data.map(({ id, name, lastName1, lastName2, status }) => {
                                                return (
                                                    <Tr key={id}>
                                                        <Td isNumeric>{id}</Td>
                                                        <Td>{name}</Td>
                                                        <Td>{lastName1} {lastName2}</Td>
                                                        <Td>{status}</Td>
                                                        <Td>
                                                            <ButtonGroup variant='ghost' spacing='1'>
                                                                <IconButton colorScheme='blue' icon={<ViewIcon />} aria-label='Show'></IconButton>
                                                                {/* <IconButton onClick={() => handleEditData(id, name, lastName1, lastName2, identityCard, telephone, email)} colorScheme='green' icon={<EditIcon />} aria-label='Edit'></IconButton>
                                                                <IconButton onClick={() => handleDeleteData(id)} icon={<DeleteIcon />} colorScheme='red' aria-label='Delete'></IconButton> */}
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
                                                <Th>Nombre</Th>
                                                <Th>Apellidos</Th>
                                                <Th>Estado</Th>
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

export default Student;