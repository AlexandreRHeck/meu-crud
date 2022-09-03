import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
  }  // components do chakra UI para uso
  from "@chakra-ui/react";
  import { useState } from "react";
  
  const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");   //Inicia om dados de ediçao se nao entra vazio
    const [CPF, setCPF] = useState(dataEdit.CPF || ""); //Entra com dados de ediçao se nao entra vazio
    const [datNasc, setDatNasc] = useState(dataEdit.datNasc || "");
    const [sexo, setSexo] = useState(dataEdit.sexo || "");
    const [endereco, setEndereco] = useState(dataEdit.endereco || "");
    
  
    const handleSave = () => {
      if (!name || !CPF) return;
  
      if (cpfAlreadyExists()) {
        return alert("CPF já cadastrado!");
      }
  
      if (Object.keys(dataEdit).length) {
        data[dataEdit.index] = { name,CPF,datNasc,sexo,endereco };
      }
  
      const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), { name,CPF,datNasc,sexo,endereco }]
        : [...(data ? data : [])];
  
      localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
  
      setData(newDataArray);
  
      onClose();
    };
  
    const cpfAlreadyExists = () => {
      if (dataEdit.CPF !== CPF && data?.length) {       // Verifica cpf existente se nao estiver editando o proprio cpf
      }
  
      return false;
    };
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastro de Clientes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl display="flex" flexDir="column" gap={4}>
                <Box>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    type="text"
                    value={CPF}
                    onChange={(e) => setCPF(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Data Nascimento</FormLabel>
                  <Input
                    type="text"
                    value={datNasc}
                    onChange={(e) => setDatNasc(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>sexo</FormLabel>
                  <Input
                    type="text"
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>endereco</FormLabel>
                  <Input
                    type="text"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                  />
                </Box>
              </FormControl>
            </ModalBody>
  
            <ModalFooter justifyContent="start">
              <Button colorScheme="green" mr={3} onClick={handleSave}>
                SALVAR
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                CANCELAR
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalComp;