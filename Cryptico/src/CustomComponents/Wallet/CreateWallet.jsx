import { Box, Button, Flex, Heading, Icon, Image, Modal, ModalOverlay, ModalContent, ModalFooter, useDisclosure, ModalHeader, ModalCloseButton, ModalBody, ButtonGroup, FormControl, Input, FormLabel, IconButton, InputRightElement, InputGroup, InputRightAddon } from '@chakra-ui/react'
import React, { useState } from 'react'

import { TbSend } from "react-icons/tb";

import { FaArrowRightFromBracket, FaArrowRightLong } from 'react-icons/fa6';
import { SelectToken } from './Balance';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useAuth } from '../../Context/AuthContext';


const CreateWallet = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [headername, setHeaderName] = useState(cryptoOption[0].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[0].logo);
    const resetState = () => {
        setHeaderName(cryptoOption[0].name);
        setHeaderLogo(cryptoOption[0].logo);
    }
    return (
        <>

            {/* <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 5, md: 0 }} onClick={onOpen}  >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><TbSend /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Send</Flex>

            </Flex> */}
            <Button onClick={onOpen}>
                Create Wallet
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src={headerlogo} boxSize={5}></Image>
                            {headername} Wallet

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={5} my={10}>

                            <SelectToken index={0} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} />


                            <Flex p={2} bg={'green.50'} borderRadius={5} fontWeight={700} color={'green'}>
                                Verify your password to procced with wallet creation.

                            </Flex>
                            <PasswordVerification />

                            {/* <Flex direction={'column'} bg={'gray.100'} borderRadius={5} py={4}>

                                <Flex justifyContent={'space-between'} p={4} >
                                    <Heading size={'md'}>Send to </Heading>
                                    <ButtonGroup size={'sm'} >
                                        <Button colorScheme='orange' fontSize={'12px'}>Address</Button>
                                        <Button fontSize={'12px'}>Cryptico Address</Button>
                                    </ButtonGroup>

                                </Flex>
                                <FormControl p={4} borderRadius={5}>
                                    <Input fontWeight={'700'} px={0} py={5} border={'none'} _hover={{ border: 'none' }} _focus={{ boxShadow: 'none' }} placeholder='Paste or Enter wallet address here '></Input>
                                </FormControl>
                            </Flex> */}


                            {/* <FormControl isDisabled bg={'gray.100'}>
                                <Input fontSize={'22px'} fontWeight={700} py={10} placeholder='Amount to send'></Input>
                            </FormControl> */}
                            {/* <Button fontWeight={600} fontSize={'18px'} _hover={{ bg: 'gray.100' }} bg={'gray.100'} p={10} isDisabled >
                                <Flex gap={2} alignItems={'center'} justifyContent={'center'}>
                                    Continue
                                    <FaArrowRightLong />
                                </Flex>
                            </Button> */}
                        </Flex>
                    </ModalBody>

                </ModalContent>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Button>Save</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

const PasswordVerification = () => {
    const [password, setPassword] = useState('');
    const { handlePasswordMatch, passwordmatch } = useAuth();
    const [showpassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {

            const res = await handlePasswordMatch(password);
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
            setPassword('');
        }

    }

    return (
        <Flex direction={'column'} gap={3}>
            <FormControl isRequired>
                <FormLabel>password</FormLabel>
                <InputGroup>

                    <Input name="password" value={password} type={showpassword ? "text" : "password"} _focus={{ boxShadow: '0px', border: '0px' }} onChange={(e) => setPassword(e.target.value)} />

                    <InputRightElement >
                        <IconButton
                            bg={'transparent'}
                            h="1.75rem"
                            size=""
                            // border={'1px solid #c05621'}
                            px={4}
                            py={3}
                            onClick={() => setShowPassword((prev) => !prev)}
                            icon={true ? <IoMdEye /> : <IoMdEyeOff />}
                            aria-label="Toggle Password Visibility"
                            _hover={{ bg: 'transparent' }}
                        />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Flex justifyContent={'space-between'}>
                {
                    passwordmatch?.passwordVerified === true ?
                        <Box color={'green'} fontWeight={700}>{passwordmatch?.message}</Box>
                        :
                        <Box color={'red'} fontWeight={700}>{passwordmatch?.message}</Box>
                }
                <Button isLoading={isLoading} loadingText='wait' onClick={handleClick} alignSelf={'end'} size={'sm'} variant={'outline'} w={'80px'}>Verify</Button>
            </Flex>
        </Flex>
    )
}

const cryptoOption = [
    { name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' },
    { name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' },
    { name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040' },
]
export default CreateWallet;