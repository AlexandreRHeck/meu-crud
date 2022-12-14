import { EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import { Input } from '@chakra-ui/react'

const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();  // controle modal
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const [buscaNome, setBuscaNome] = useState({});  

 

  const isMobile = useBreakpointValue({   //hooks chakra-ui
    base: true,
    lg: false,
  });

  useEffect(() => {                                               //Carrego os dados localStorage
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    setData(db_costumer);
  }, [setData]);


      {/*
  const handleSearch = (buscaNome) =>{                          //  handleSearch =======Parte guardada para começar a fazer filter======
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

      setData(db_costumer)
  }  
      */}

  const handleRemove = (CPF) => {
    const newArray = data.filter((item) => item.CPF !== CPF);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
        <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>

    {/* =======Parte guardada para começar a fazer filter======
                
       <Input
        value={buscaNome}
        onChange={(e) => handleSearch(e.target.value)} 

        placeholder='Digite o nome do Paciente para Consulta'
        align="center"
        justify="center"
        fontSize="20px"
        fontFamily="poppins"
      /> 
    */}


      
        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">   
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  CPF
                </Th>
                <Th maxW={isMobile ? 16 : 135} fontSize="20px">
                  Nascimento
                </Th>
                <Th maxW={isMobile ? 5 : 90} fontSize="20px">
                  Sexo
                </Th>
                <Th maxW={isMobile ? 5 : 135} fontSize="20px">
                  ENDERECO
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, CPF, datNasc,sexo,endereco }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{CPF}</Td>
                  <Td maxW={isMobile ? 16 : 135}>{datNasc}</Td>      
                  <Td maxW={isMobile ? 5 : 90}>{sexo}</Td>
                  <Td maxW={isMobile ? 5 : 135}>{endereco}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={25}
                      onClick={() => [
                        setDataEdit({ name, CPF,datNasc,sexo,endereco, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={25}
                      onClick={() => handleRemove(CPF)}  // Removendo por CPF assim sendo usuario uninco por cpf
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          
          
        
        />
      )}
    </Flex>
  );
};

export default App;