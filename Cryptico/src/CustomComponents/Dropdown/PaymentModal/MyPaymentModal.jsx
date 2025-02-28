import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    InputGroup,
    Input,
    InputRightElement,
    InputLeftElement,
    Heading,
    Flex,
    Box,
    Image,
    Icon,
    useColorModeValue
} from '@chakra-ui/react'
import { RiSearchLine } from "react-icons/ri";
import { PiBankLight, PiCurrencyCircleDollarThin, PiMoneyThin, PiGameControllerLight, PiPaypalLogoThin } from "react-icons/pi";
import { CiWallet, CiCreditCard2, CiGift } from "react-icons/ci";
import { FaGooglePay } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';
export const MyPaymentModal = () => {
        const bgColor = useColorModeValue("orange.50", "gray.900");
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [searchTerm, setSearchTerm] = useState("");
    const filteredIndianOptions = IndianpaymentOptions.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            <Button variant={'outline'} bg={'transparent'} _hover={{ bg: 'transparent' }} onClick={onOpen} rightIcon={<RxHamburgerMenu />} display={'flex'} justifyContent={'space-between'} fontWeight={400} fontSize={'14px'}>Select Payment Method</Button>

            <Modal isOpen={isOpen} size={'2xl'} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent maxW={'70%'}>
                    <ModalHeader>Available Payment Methods</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Flex direction={'column'} bg={bgColor} w={'100%'} p={4} borderRadius={5} mb={8}>

                            <FormControl>
                                <InputGroup  >
                                    <InputLeftElement><RiSearchLine /></InputLeftElement>
                                    <Input placeholder='Search here..' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} focusBorderColor="orange.100" // Changes border color on focus
                                        _hover={{ borderColor: "orange.100" }}>

                                    </Input>
                                </InputGroup>
                            </FormControl>
                            <Flex flexWrap={'wrap'} gap={10} >
                                {
                                    paymentOptions.map((data, index) => (
                                        <Flex flex={1} key={index} direction={'column'} mt={4} justifyContent={'center'} alignItems={'center'}  h={'100px'}>
                                            {data.icon}
                                            <Box as='p' fontWeight={400} fontSize={'16px'} textAlign={'center'}>{data.name}</Box>
                                            <Box as='p' fontWeight={400} color={'gray'} fontSize={'11px'}>CHOICE : 5</Box>
                                        </Flex>

                                    ))
                                }


                            </Flex>
                        </Flex>
                        <Heading fontWeight={500} size={'md'} mb={8}>Popular In India</Heading>
                        <Flex w={'100%'} p={4} borderRadius={5} gap={{ base: 5, md: 5, lg: 10 }} wrap={'wrap'}  >

                            {filteredIndianOptions.length > 0 ? (
                                filteredIndianOptions.map((data, index) => (
                                    <Flex key={index} justifyContent={'start'} alignItems={'center'} gap={2} border={'1px solid #dcdcdc'} p={2} w={{ base: '100%', sm: '45%', md: '30%' }} borderRadius={5} cursor={'pointer'}>
                                        {data.icon}
                                        <Box>{data.name}</Box>
                                    </Flex>
                                ))
                            ) : (
                                <Box>No results found</Box>
                            )}
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='orange' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const paymentOptions = [
    {
        id: 1,
        name: 'Bank Transfer',
        icon: <PiBankLight size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 2,
        name: 'Debit/Credit Card',
        icon: <CiCreditCard2 size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 3,
        name: 'Fift Card',
        icon: <CiGift size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 4,
        name: 'Digital Currency',
        icon: <PiCurrencyCircleDollarThin size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 5,
        name: 'Cash Payment',
        icon: <PiMoneyThin size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 5,
        name: 'Wallet',
        icon: <CiWallet size={50} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    }

]


const IndianpaymentOptions = [
    {
        id: 1,
        name: 'IMPS Transfer',
        icon: <PiBankLight size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 2,
        name: 'Payment Online Wallet',
        icon: <CiWallet size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 3,
        name: 'Google Pay',
        icon: <FaGooglePay size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 4,
        name: 'Game Items',
        icon: <PiGameControllerLight size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 5,
        name: 'PhonePe',
        icon: <CiWallet size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    },
    {
        id: 5,
        name: 'PayPal',
        icon: <PiPaypalLogoThin size={30} />,
        imgSrc: 'https://cdn-icons-png.flaticon.com/512/2111/2111352.png'
    }

]