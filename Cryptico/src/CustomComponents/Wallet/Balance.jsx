import { Box, Button, Card, Divider, Flex, Heading, Icon, Image, Menu, MenuButton, MenuList, MenuItem, Circle, Modal, ModalOverlay, ModalContent, ModalFooter, useDisclosure, ModalHeader, ModalCloseButton, ModalBody, ButtonGroup, Tag, ScaleFade, Fade, Tooltip, FormControl, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { LuEqualApproximately } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TbSend } from "react-icons/tb";

import { SiConvertio } from "react-icons/si";
import { BsArrowBarDown, BsThreeDots } from "react-icons/bs";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { RiArrowRightDownLine } from "react-icons/ri";
import { BsBoxArrowInUpRight, BsBoxArrowInDownRight } from "react-icons/bs";
import { IoWarningOutline } from 'react-icons/io5';
import { MdArrowRightAlt, MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import { FaArrowRightFromBracket, FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import CreateWallet, { gradientButtonStyle } from './CreateWallet';
import { useAccount } from '../../Context/AccountContext';
import WalletQR from './WalletQR';
import { useWalletStore } from '../Store/useWalletStore';
import { useCryptoOption } from '../Store/CryptoOption';

const Balance = () => {
    const navigate = useNavigate()
    const { web3wallet, handleGetWeb3Wallet } = useAccount();
    const [isloading, setLoading] = useState(true);
    const setWeb3wallet = useWalletStore((state) => state.setWeb3wallet);
    useEffect(() => {
        if (web3wallet) {
            setWeb3wallet(web3wallet);
        }
    }, [web3wallet])
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);

        }, 2000);
    })
    useEffect(() => {
        handleGetWeb3Wallet();
    }, [])
    const cryptoOption = useCryptoOption();
    const data = web3wallet?.data || {}

    const count = Object.keys(data).length;


    return (
        <Flex w={'container.xxl'} gap={10} direction={'column'} alignItems={'center'} justifyContent={'center'} my={20} marginTop={'50px'}>
            <Flex
                maxW={{ base: "100%", lg: '100%', xl: "100%" }}
                minW={{ base: "100%", sm: '100%', lg: '100%', xl: "100%" }}
                direction={'column'}
                gap={8}
            >




                {/* Button With card start */}

                <Flex w={'full'} justifyContent={'space-between'} direction={{ base: 'column', lg: 'row' }} gap={8} >

                    <Card w={{ base: '100%', lg: '30%' }}>
                        <Flex justifyContent={'space-between'}  >

                            <Flex direction={'column'} gap={2} p={4} flex={1}>
                                <Box>
                                    Total Holding
                                </Box>
                                <Heading size={'md'}>0 BTC</Heading>
                                <Flex alignItems={'center'} gap={2}>
                                    <LuEqualApproximately />
                                    <Box as='span'> 0 INR</Box>
                                </Flex>
                            </Flex>

                            <Flex flex={1} justifyContent={'end'} p={4}>
                                <AiOutlineExclamationCircle />
                            </Flex>
                        </Flex>

                    </Card>
                    {/* RightSideButton */}

                    <Flex alignItems={'end'}   >
                        <Button sx={gradientButtonStyle} w={'full'} colorScheme='orange' px={20}> Buy Crypto Directly</Button>
                    </Flex>
                </Flex>

                {/* Button With card End */}

                {/* Dashboard first start */}

                <Flex>
                    <Card w={'100%'} p={4}>
                        <Flex justifyContent={'space-between'}>

                            <Heading size={'md'}>Assets</Heading>
                            <CreateWallet />
                        </Flex>

                        {/* Bellow Assets */}
                        {
                            isloading ?
                                <Heading size={'lg'} alignSelf={'center'} fontSize={'14px'} mt={10} color={'gray.500'}>Loading...</Heading>
                                :
                                count > 0 ?
                                    <Flex p={4} gap={2} direction={'column'} >
                                        {/* TableHeading start -------------------------------------------------------------------------------------------------------------- */}
                                        {
                                            count > 0 &&
                                            <Flex w={'full'} p={2} gap={10} >
                                                <Flex flex={1.2} color={'gray'} direction={'column'} gap={10}>
                                                    <Flex fontSize={'12px'}>
                                                        <Flex flex={1}  >
                                                            <Box ml={10}>
                                                                Currency
                                                            </Box>
                                                        </Flex>
                                                        <Flex flex={.5} justifyContent={{ base: 'end', xl: 'center' }} mr={{ base: 10, xl: 0 }} >Balance</Flex>
                                                        <Flex flex={.5} justifyContent={'center'} w={'full'} display={{ base: 'none', xl: 'flex' }} > In INR</Flex>
                                                    </Flex>
                                                </Flex>
                                                <Flex flex={.8} color={'green'} gap={20} justifyContent={'space-between'} direction={'column'} display={{ base: 'none', md: 'flex' }} >

                                                </Flex>
                                            </Flex>
                                        }

                                        {/* TableHeading End -------------------------------------------------------------------------------------------------------*/}

                                        {
                                            cryptoOption.map((item, optionIndex) => (
                                                item.status &&


                                                <Flex key={optionIndex} w={'full'} p={2} gap={10}>
                                                    <Flex flex={1.2} color={'gray'} direction={'column'} >

                                                        {/* Left Side Table Data */}
                                                        <Flex borderRight={{ base: '0', md: '1px solid #dcdcdc' }}  >


                                                            <Flex flex={1} gap={2} direction={'column'} justifyContent={'space-between'}  >

                                                                <Flex gap={0}>

                                                                    <Box display={'flex'} pt={1} width={'40px'} height={'40px'}>
                                                                        <Image boxSize={5} src={item.logo} alt={item.name} />

                                                                    </Box>
                                                                    <Flex direction={'column'}>

                                                                        <Flex gap={2}>
                                                                            <Heading size={'md'}>
                                                                                {item.shrotName}
                                                                            </Heading>
                                                                            <Box display={'flex'} alignItems={'center'} as='span' color={'gray.300'} fontWeight={500}>
                                                                                {item.name}
                                                                            </Box>
                                                                        </Flex>
                                                                        <Box>{item.pricePerCoin}</Box>
                                                                    </Flex>
                                                                </Flex>

                                                            </Flex>
                                                            <Flex flex={.5} justifyContent={'center'} alignItems={{ base: 'end', xl: 'center' }} direction={'column'} mr={{ base: 0, md: 10, xl: 0 }}>

                                                                <Flex gap={2}>
                                                                    <Flex direction={'column'} textAlign={'end'}>

                                                                        <Box fontWeight={600} color={'black'}>
                                                                            {item.blc}
                                                                        </Box>
                                                                        <Flex gap={1} display={{ base: 'flex', xl: 'none' }} >
                                                                            <Box pt={1}>
                                                                                <LuEqualApproximately />
                                                                            </Box>
                                                                            {`  ${item.INR} INR`}
                                                                        </Flex>
                                                                    </Flex>
                                                                    <Flex display={{ base: 'flex', md: 'none' }}>

                                                                        <ThreeDotMenu2 option={item.actions} />
                                                                    </Flex>

                                                                </Flex>


                                                            </Flex>
                                                            <Flex flex={.5} justifyContent={'center'} alignItems={'center'} direction={'column'} gap={1} fontSize={'12px'} display={{ base: 'none', xl: 'flex' }}>

                                                                <Flex>

                                                                    <Box pt={1}>
                                                                        <LuEqualApproximately />
                                                                    </Box>
                                                                    {item.INR}
                                                                </Flex>

                                                            </Flex>
                                                        </Flex>
                                                        {/* Left Side Table Data End */}
                                                    </Flex>


                                                    {/* Right side Table Data Start */}
                                                    <Flex flex={.8} justifyContent={{ md: 'space-between', lg: 'space-around' }} display={{ base: 'none', md: 'flex' }}  >
                                                        {item.send}

                                                        {item.receive}

                                                        {
                                                            cryptoStatus.map((item, index) => (
                                                                <React.Fragment key={index}>

                                                                    <Flex key={index} cursor={'pointer'} direction={'column'} onClick={() => navigate(item.to)} >
                                                                        <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}>{item.icon}</Flex>
                                                                        <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>{item.name}</Flex>
                                                                        <Flex>

                                                                        </Flex>

                                                                    </Flex>
                                                                </React.Fragment>
                                                            ))
                                                        }
                                                        {item.threedots}

                                                    </Flex>
                                                    {/* Right side Table Data End */}

                                                </Flex>







                                            ))
                                        }

                                    </Flex>
                                    :
                                    <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} gap={2} mt={50} mb={5}>
                                        <Image opacity={0.6} boxSize={10} src='/imagelogo/Fa6SolidWallet.png'></Image>
                                        <Heading size={'sm'} color={'gray.300'}>oops! no wallet exist</Heading>
                                    </Flex>

                        }

                    </Card>

                </Flex>
                {/* Dashboard first end */}

                <Flex>
                    <LatestTransactions />
                </Flex>

            </Flex>

        </Flex>
    )
}


export const ThreeDotMenu1 = ({ btnName }) => {
    const navigateTo = useNavigate()
    return (

        <Menu>
            <MenuButton alignSelf={'start'}>
                <BsThreeDots />
            </MenuButton>
            <MenuList borderRadius={0} >
                <MenuItem onClick={() => {
                    navigateTo('/buy');

                }}>Buy {btnName}</MenuItem>
                <MenuItem onClick={() => { navigateTo('/sell') }}>Sell {btnName}</MenuItem>
            </MenuList>
        </Menu>

    )
}
export const ThreeDotMenu2 = ({ option }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const navigate = useNavigate();
    return (

        <Menu>
            <MenuButton>
                <PiDotsThreeCircleVerticalThin size={30} />
            </MenuButton>
            <MenuList borderRadius={0} >
                {
                    option.map((item, index) => (
                        <React.Fragment key={index}>
                            <MenuItem key={index}
                                onClick={() => {
                                    navigate(item.to);
                                }} >
                                <Flex cursor={'pointer'} gap={5} >

                                    {item.action}



                                    <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}>{item.icon}</Flex>
                                    <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>{item.name}</Flex>

                                </Flex>
                            </MenuItem>
                        </React.Fragment>
                    ))
                }

            </MenuList>
        </Menu>

    )
}



export const LatestTransactions = () => {
    const { transaction } = useAccount();
    console.log(transaction);
    const [isloading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    })



    const arr = [1, 2]

    return (
        <>
            <Card w={'100%'} p={4}>
                <Heading size={'md'}> Latest Transactions</Heading>

                {

                    isloading ? <Heading size={'sm'} color={'gray'} alignSelf={'center'}>
                        Loading...
                    </Heading> :
                        transaction?.data?.length > 0 ?
                            <Flex w={'full'} p={{ base: 2, sm: 8 }} color={'gray'} direction={'column'} gap={10}>
                                {/* Heading start */}

                                <Flex Flex w={'full'} fontSize={'12px'} fontWeight={500}>
                                    <Flex flex={1.4} gap={10}>
                                        <Flex flex={.8}> <Box ml={12} >TRANSACTION</Box></Flex>
                                        <Flex flex={1.2} display={{ base: 'none', md: 'Flex' }} ml={0}>DETAILS</Flex>
                                    </Flex>
                                    <Flex flex={.6}>
                                        <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                            <Flex display={{ base: 'none', lg: 'flex' }}>STATUS</Flex>
                                            <Flex><Box display={'flex'} justifyContent={'end'} >AMOUNT</Box></Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                {/* Heading End */}

                                {/*  Data Part start */}
                                {

                                    transaction?.data?.length > 0 ?
                                        transaction?.data.map((item, index) => (
                                            <Flex w={'full'} key={index}>
                                                <Flex flex={1.4} gap={10}>
                                                    <Flex flex={.8}>
                                                        <Flex gap={5}>
                                                            <Box pt={1}> <Circle bg={'orange'} p={2}><BsBoxArrowInDownRight /></Circle></Box>
                                                            <Flex direction={'column'}>
                                                                <Box>{item.method === 'receive' ? "received" : 'Send'}</Box>
                                                                <Box fontSize={'12px'}>{new Date(Number(item.date_time) * 1000).toLocaleString('en-GB')}</Box>

                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex display={{ base: 'none', md: 'Flex' }} direction={'column'} flex={1.2} gap={2}>
                                                        <Box maxW={'250px'}>

                                                            {
                                                                item.method === "receive" ? `receive from ${item.from_address}` : `send to ${item.from_address}`
                                                            }
                                                        </Box>
                                                        <Flex display={{ base: 'flex', lg: 'none' }}>

                                                            <Button variant={'outline'} size={'sm'} colorScheme={item.status === 'success' ? 'green' : 'red'}>{item.status}</Button>

                                                        </Flex>

                                                    </Flex>
                                                </Flex>
                                                <Flex flex={.6} >
                                                    <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                                        <Flex display={{ base: 'none', lg: 'Flex' }}>
                                                            <Button variant={'outline'} size={'sm'} colorScheme={item.status === 'success' ? 'green' : 'red'}>{item.status}</Button>
                                                        </Flex>
                                                        <Flex>
                                                            <Flex direction={'column'} textAlign={'end'}  >
                                                                <Box alignItems={'end'}  >{`${item.paid_amount} ${item.asset}`}</Box>
                                                                {/* <Box alignItems={'end'} fontSize={'12px'} >-0.73 BTC</Box> */}
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        ))
                                        :
                                        <Flex w={'full'} justifyContent={'center'} alignItems={'center'}>

                                            <Image boxSize={120} src='https://2.bp.blogspot.com/-X9sVvOD0hrs/W5cz8WKyknI/AAAAAAAAEKI/s6mNIUQdsy4KGnCgtF1VSZlnj237ArxawCLcBGAs/s1600/not%2Bfound.gif'></Image>
                                        </Flex>
                                }
                                {/* Data Part End */}

                            </Flex>
                            :
                            <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} gap={2} mt={50} mb={5} p={4}>
                                <Image opacity={0.6} boxSize={10} src='/imagelogo/HugeiconsExchange03.png'></Image>
                                <Heading size={'sm'} color={'gray.300'}>No Transaction Found</Heading>
                            </Flex>
                }

            </Card>
        </>
    )
}





export const Receive1 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [copied, setCopied] = useState(false);
    const { web3wallet } = useAccount();
    const handleCopy = () => {
        navigator.clipboard.writeText(web3wallet?.data?.bitcoin[0]?.wallet_address).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 5, md: 0 }} onClick={onOpen} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><RiArrowRightDownLine /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Receive</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src='https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' boxSize={5}></Image>
                            Receive Bitcoin

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={5}>
                            {/* <Flex direction={'column'}>
                                <ButtonGroup>
                                    <Button borderRadius={0} bg={'transparent'} _hover={{ bg: 'transparent', borderBottom: '1px solid black' }}>Bitcoin network</Button>
                                    <Button borderRadius={0} bg={'transparent'} _hover={{ bg: 'transparent', borderBottom: '1px solid black' }}>Lightning</Button>
                                </ButtonGroup>
                                <Divider />
                            </Flex> */}
                            <Flex my={7}>
                                <WalletQR walletAddress={web3wallet?.data?.bitcoin?.length > 0 ? web3wallet?.data?.bitcoin[0]?.wallet_address : 'No Bitcoin wallet address available'} />
                                {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}

                            </Flex>
                            <Heading size={'lg'}>Your Bitcoin address</Heading>
                            <Flex direction={'column'}>

                                <Box color={'gray'}>Use this address to deposit Bitcoin (BTC):</Box>
                                <Box fontWeight={500}>{web3wallet?.data?.bitcoin?.length > 0 ? web3wallet?.data?.bitcoin[0]?.wallet_address : 'No Bitcoin wallet address available'}</Box>
                            </Flex>
                            <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} hasArrow>
                                <Button mb={5} colorScheme='orange' w={'150px'} onClick={handleCopy}>Copy address</Button>
                            </Tooltip>

                        </Flex>
                    </ModalBody>

                    <ModalFooter bg={'red.100'} borderBottomRadius={5}>
                        <Flex direction={'column'} justifyContent={'center'} alignItems={'start'}>
                            {/* <Box ml={3} >

                                <IoWarningOutline size={30} color={'red.500'} />
                            </Box> */}
                            <Box p={4}>

                                <Box as='span' fontWeight={500}> Make sure to only send BTC through the selected network: Bitcoin.&nbsp;</Box>
                                Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                            </Box>
                        </Flex>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export const Receive2 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const address = '0xae2244e9bD6fC01b52d8E1b634eE5Db94eA6Ca48'
    const [copied, setCopied] = useState(false);
    const { web3wallet } = useAccount();
    const handleCopy = () => {
        navigator.clipboard.writeText(web3wallet?.data?.ethereum[0]?.wallet_address).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 5, md: 0 }} onClick={onOpen} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><RiArrowRightDownLine /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Receive</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src='https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' boxSize={5}></Image>
                            Receive Etherum

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex my={7} direction={'column'} gap={8}>

                            <Flex >
                                <WalletQR walletAddress={web3wallet?.data?.ethereum?.length > 0 ? web3wallet?.data?.ethereum[0]?.wallet_address : 'No Bitcoin wallet address available'} />

                                {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}

                            </Flex>
                            <Heading size={'lg'}>Your ERC-20 address</Heading>
                            <Flex direction={'column'}>

                                <Box color={'gray'}>Use this address to deposit Ethereum (ETH):</Box>
                                <Box fontWeight={500}>{web3wallet?.data?.ethereum?.length > 0 ? web3wallet?.data?.ethereum[0]?.wallet_address : 'No Bitcoin wallet address available'}</Box>
                            </Flex>
                            <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} hasArrow>
                                <Button mb={2} colorScheme='orange' w={'150px'} onClick={handleCopy}>Copy address</Button>
                            </Tooltip>

                        </Flex>
                    </ModalBody>

                    <ModalFooter bg={'red.100'} borderBottomRadius={5}>
                        <Flex direction={'column'} justifyContent={'center'} alignItems={'start'}>
                            <Box ml={3} >

                                <IoWarningOutline size={30} color={'red.500'} />
                            </Box>
                            <Box p={4}>

                                <Box as='span' fontWeight={500}>Make sure to only send ETH through the selected network: ERC-20.&nbsp; </Box>
                                Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                            </Box>
                        </Flex>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export const Receive3 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const address = '0xae2244e9bD6fC01b52d8E1b634eE5Db94eA6Ca48'
    const [copied, setCopied] = useState(false);
    const { web3wallet } = useAccount();
    const handleCopy = () => {
        navigator.clipboard.writeText(web3wallet?.data?.binance?.length > 0 ? web3wallet?.data?.binance[0]?.wallet_address : 'No Bitcoin wallet address available')
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch((err) => {
                console.error('Could not copy text: ', err);
            });
    }
    return (
        <>
            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 5, md: 0 }} onClick={onOpen} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><RiArrowRightDownLine /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Receive</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    {/* <Flex bg={'gray.100'} p={2} alignItems={'center'} justifyContent={'space-between'}> */}
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src='https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' boxSize={5}></Image>
                            Receive USDC

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    {/* </Flex> */}
                    <ModalBody>
                        <Flex my={7} direction={'column'} gap={8}>

                            <Flex >
                                <WalletQR walletAddress={web3wallet?.data?.binance?.length > 0 ? web3wallet?.data?.binance[0]?.wallet_address : 'No Bitcoin wallet address available'} />

                                {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}

                            </Flex>
                            <Heading size={'lg'}>Your ERC-20 address</Heading>
                            <Flex direction={'column'}>

                                <Box color={'gray'}>Use this address to deposit USDC (USDC):</Box>
                                <Box fontWeight={500}>{web3wallet?.data?.binance?.length > 0 ? web3wallet?.data?.binance[0]?.wallet_address : 'No Bitcoin wallet address available'}</Box>
                            </Flex>
                            <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} hasArrow>
                                <Button mb={2} colorScheme='orange' w={'150px'} onClick={handleCopy}>Copy address</Button>
                            </Tooltip>


                        </Flex>
                    </ModalBody>

                    <ModalFooter bg={'red.100'} borderBottomRadius={5}>
                        <Flex direction={'column'} justifyContent={'center'} alignItems={'start'}>
                            <Box ml={3} >

                                <IoWarningOutline size={30} color={'red.500'} />
                            </Box>
                            <Box p={4}>

                                <Box as='span' fontWeight={500}>Make sure to only send USDC through the selected network: ERC-20. &nbsp; </Box>
                                Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                            </Box>
                        </Flex>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export const Receive4 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [istron, setTron] = React.useState(false)
    const [active, setActive] = React.useState('eth')
    const addressTron = 'TFk4Ee97s4cPqebEeUY5kbDfPgqiRfR6X9'
    const addressEth = '0xae2244e9bD6fC01b52d8E1b634eE5Db94eA6Ca48'
    const [copied, setCopied] = useState(false);
    const { web3wallet } = useAccount();

    const handleCopyTron = () => {
        navigator.clipboard.writeText().then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleCopyEth = () => {
        navigator.clipboard.writeText(web3wallet?.data?.ethereum?.length > 0 ? web3wallet?.data?.ethereum[1]?.wallet_address : 'No Bitcoin wallet address available').then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 5, md: 0 }} onClick={onOpen} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><RiArrowRightDownLine /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Receive</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src='https://cryptologos.cc/logos/thumbs/tether.png?v=040' boxSize={5}></Image>
                            Receive USDT

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={5}>
                            <Flex direction={'column'}>
                                <ButtonGroup gap={2}>

                                    <Button
                                        p={0}
                                        borderBottom={active === 'eth' ? '1px solid black' : '0px'}
                                        borderRadius={0}
                                        bg={'transparent'}
                                        _hover={{ bg: 'transparent' }}
                                        onClick={() => {
                                            setTron(false);
                                            setActive('eth');
                                        }
                                        }
                                    >
                                        Ethereum network
                                    </Button>
                                    <Button
                                        gap={2}
                                        p={0}
                                        borderBottom={active === 'tron' ? '1px solid black' : '0px'}
                                        borderRadius={0} bg={'transparent'}
                                        _hover={{ bg: 'transparent' }}
                                        onClick={() => {
                                            setTron(true)
                                            setActive('tron');
                                        }
                                        }>TRON network <Tag bg={'orange.100'} >cheaper</Tag>

                                    </Button>
                                </ButtonGroup>
                                <Divider />
                            </Flex>
                            {
                                istron ?

                                    <Flex my={5} direction={'column'} gap={7}>

                                        <Flex>
                                            <WalletQR walletAddress={web3wallet?.data?.ethereum?.length > 0 ? web3wallet?.data?.ethereum[1]?.wallet_address : 'No Bitcoin wallet address available'} />

                                            {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}

                                        </Flex>
                                        <Heading size={'lg'}>Your TRC-20 address</Heading>
                                        <Flex direction={'column'}>

                                            <Box color={'gray'}>Use this address to deposit Tether (USDT):</Box>
                                            <Box fontWeight={500}>{addressTron}</Box>
                                        </Flex>
                                        <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} hasArrow>
                                            <Button mb={5} colorScheme='orange' w={'150px'} onClick={handleCopyTron}>Copy address</Button>
                                        </Tooltip>
                                    </Flex>
                                    :

                                    <Flex my={5} direction={'column'} gap={7}>

                                        <Flex >
                                            {/* <Image src='/imagelogo/Qr.png' boxSize={150}></Image> */}
                                            <WalletQR walletAddress={web3wallet?.data?.ethereum?.length > 0 ? web3wallet?.data?.ethereum[1]?.wallet_address : 'No Bitcoin wallet address available'} />

                                        </Flex>
                                        <Heading size={'lg'}>Your ERC-20 address</Heading>
                                        <Flex direction={'column'}>

                                            <Box color={'gray'}>Use this address to deposit Ethereum (ETH):</Box>
                                            <Box fontWeight={500}>{web3wallet?.data?.ethereum?.length > 0 ? web3wallet?.data?.ethereum[1]?.wallet_address : 'No Bitcoin wallet address available'}</Box>
                                        </Flex>
                                        <Tooltip label={copied ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={200} hasArrow>

                                            <Button mb={2} colorScheme='orange' w={'150px'} onClick={handleCopyEth}>Copy Address</Button>
                                        </Tooltip>


                                    </Flex>

                            }

                        </Flex>
                    </ModalBody>

                    <ModalFooter bg={'red.100'} borderBottomRadius={5}>
                        <Flex direction={'column'} justifyContent={'center'} alignItems={'start'}>
                            {
                                istron ?

                                    <Box p={4}>

                                        <Box as='span' fontWeight={500}> Make sure to only send USDT through the selected network: TRC-20.&nbsp;</Box>
                                        Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                                    </Box>
                                    :
                                    <Box p={4}>

                                        <Box as='span' fontWeight={500}> Make sure to only send USDT through the selected network: ERC-20.&nbsp;</Box>
                                        Sending incompatible cryptocurrencies or sending through a different network may result in irreversible loss.
                                    </Box>

                            }

                        </Flex>

                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export const Send1 = () => {
    const cryptoOption = useCryptoOption();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [headername, setHeaderName] = useState(cryptoOption[0].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[0].logo);
    const resetState = () => {
        setHeaderName(cryptoOption[0].name);
        setHeaderLogo(cryptoOption[0].logo);
    }
    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 5, md: 0 }} onClick={onOpen}  >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><TbSend /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Send</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src={headerlogo} boxSize={5}></Image>
                            Send {headername}

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={10} my={10}>
                            <Flex as={Button} py={8} w={'full'} borderRadius={5} bg={'gray.100'} _hover={{ bg: 'gray.100' }} justifyContent={'space-between'}  >
                                <Flex gap={2}>
                                    <Image boxSize={5} src='/imagelogo/bitcoin-btc-logo.png'></Image>
                                    Bitcoin
                                </Flex>
                                <MdKeyboardArrowRight />

                            </Flex>

                            {/* <SelectToken index={0} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} /> */}
                            <Flex direction={'column'} bg={'gray.100'} borderRadius={5} py={4}>

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
                            </Flex>


                            <FormControl isDisabled bg={'gray.100'}>
                                <Input fontSize={'22px'} fontWeight={700} py={10} placeholder='Amount to send'></Input>
                            </FormControl>
                            <Button fontWeight={600} fontSize={'18px'} _hover={{ bg: 'gray.100' }} bg={'gray.100'} p={10} isDisabled >
                                <Flex gap={2} alignItems={'center'} justifyContent={'center'}>
                                    Continue
                                    <FaArrowRightLong />
                                </Flex>
                            </Button>
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



export const Send2 = () => {
    const cryptoOption = useCryptoOption();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [headername, setHeaderName] = useState(cryptoOption[1].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[1].logo);
    const resetState = () => {
        setHeaderName(cryptoOption[1].name);
        setHeaderLogo(cryptoOption[1].logo);
    }
    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 5, md: 0 }} onClick={onOpen} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><TbSend /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Send</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>


                            <Image src={headerlogo} boxSize={5}></Image>
                            Send {headername}

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={10} my={10}>

                            <SelectToken index={1} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} />
                            <Flex direction={'column'} bg={'gray.100'} borderRadius={5} py={4}>

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
                            </Flex>


                            <FormControl isDisabled bg={'gray.100'}>
                                <Input fontSize={'22px'} fontWeight={700} py={10} placeholder='Amount to send'></Input>
                            </FormControl>
                            <Button fontWeight={600} fontSize={'18px'} _hover={{ bg: 'gray.100' }} bg={'gray.100'} p={10} isDisabled >
                                <Flex gap={2} alignItems={'center'} justifyContent={'center'}>
                                    Continue
                                    <FaArrowRightLong />
                                </Flex>
                            </Button>
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
export const Send3 = () => {
    const cryptoOption = useCryptoOption();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [headername, setHeaderName] = useState(cryptoOption[2].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[2].logo);
    const resetState = () => {
        setHeaderName(cryptoOption[2].name);
        setHeaderLogo(cryptoOption[2].logo);
    }
    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 5, md: 0 }} onClick={onOpen} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><TbSend /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Send</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>


                            <Image src={headerlogo} boxSize={5}></Image>
                            Send {headername}

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={10} my={10}>

                            <SelectToken index={2} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} />
                            <Flex direction={'column'} bg={'gray.100'} borderRadius={5} py={4}>

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
                            </Flex>


                            <FormControl isDisabled bg={'gray.100'}>
                                <Input fontSize={'22px'} fontWeight={700} py={10} placeholder='Amount to send'></Input>
                            </FormControl>
                            <Button fontWeight={600} fontSize={'18px'} _hover={{ bg: 'gray.100' }} bg={'gray.100'} p={10} isDisabled >
                                <Flex gap={2} alignItems={'center'} justifyContent={'center'}>
                                    Continue
                                    <FaArrowRightLong />
                                </Flex>
                            </Button>
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

export const Send4 = () => {
    const cryptoOption = useCryptoOption();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [headername, setHeaderName] = useState(cryptoOption[3].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[3].logo);
    const resetState = () => {
        setHeaderName(cryptoOption[3].name);
        setHeaderLogo(cryptoOption[3].logo);
    }
    return (
        <>

            <Flex cursor={'pointer'} direction={{ base: 'row', md: 'column' }} gap={{ base: 5, md: 0 }} onClick={onOpen} >
                <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}><TbSend /></Flex>
                <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>Send</Flex>

            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>


                            <Image src={headerlogo} boxSize={5}></Image>
                            Send {headername}

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={10} my={10}>

                            <SelectToken index={3} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} />
                            <Flex direction={'column'} bg={'gray.100'} borderRadius={5} py={4}>

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
                            </Flex>


                            <FormControl isDisabled bg={'gray.100'}>
                                <Input fontSize={'22px'} fontWeight={700} py={10} placeholder='Amount to send'></Input>
                            </FormControl>
                            <Button fontWeight={600} fontSize={'18px'} _hover={{ bg: 'gray.100' }} bg={'gray.100'} p={10} isDisabled >
                                <Flex gap={2} alignItems={'center'} justifyContent={'center'}>
                                    Continue
                                    <FaArrowRightLong />
                                </Flex>
                            </Button>
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



export const SelectToken = ({ index, setHeaderName, setHeaderLogo }) => {
    const cryptoOption = useCryptoOption();
    const [option, setOption] = useState(cryptoOption[index].name);
    const [logo, setlogo] = useState(cryptoOption[index].logo);
    return (
        <>
            <Menu matchWidth >

                <MenuButton as={Button} py={8} w={'full'} borderRadius={5} bg={'gray.100'} rightIcon={<MdKeyboardArrowDown />} _hover={{ bg: 'gray.100' }}  >
                    <Flex gap={2}>
                        <Image boxSize={5} src={logo}></Image>
                        {option}
                    </Flex>

                </MenuButton>
                <MenuList borderRadius={0} p={2}  >
                    {cryptoOption.map((data, index) => (
                        <>
                            <MenuItem key={data.name} onClick={() => {
                                setOption(data.name);
                                setHeaderName(data.name);
                                setHeaderLogo(data.logo);
                                setlogo(data.logo);
                            }} gap={3} _hover={{ bg: "blue.100" }}><Image boxSize={5} src={data.logo}></Image>{data.name}</MenuItem>
                        </>
                    ))}

                </MenuList>
            </Menu>
        </>
    )
}

const cryptoOption1 = [
    { name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' },
    { name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' },
    { name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040' },
]
const cryptoStatus = [
    { name: 'Convert', icon: <SiConvertio />, to: 'convert' },
]

const cryptoStatus1 = [
    { name: 'Send', icon: <TbSend /> },
    { name: 'Receive', icon: <RiArrowRightDownLine /> },
    { name: 'Convert', icon: <SiConvertio /> },
    { name: 'Buy BTC', icon: <GoArrowDownLeft /> },
    { name: 'Sell BTC', icon: <GoArrowUpRight /> }
]

// const wallet = useWalletStore.getState().web3wallet;
// console.log(wallet);
// const cryptoOption = [
//     {
//         status: wallet?.data?.bitcoin ? true : false,
//         shrotName: 'BTC',
//         name: 'Bitcoin',
//         logo: '/imagelogo/bitcoin-btc-logo.png',
//         pricePerCoin: '1 BTC = 8,448,496.2999 INR',
//         blc: 0, INR: '0.00',
//         table: 'true',
//         receive: <Receive1 />,
//         send: <Send1 />,
//         threedots: <ThreeDotMenu1 btnName={'BTC'} />,

//         actions: [
//             { action: <Send1 /> },
//             { action: <Receive1 /> },
//             { name: 'Convert', icon: <SiConvertio />, to: 'convert' },
//             { name: 'Buy BTC', icon: <GoArrowDownLeft />, to: '/buy' },
//             { name: 'Sell BTC', icon: <GoArrowUpRight />, to: '/sell' }
//         ]
//     },
//     {
//         status: wallet?.data?.ethereum ? true : false,
//         shrotName: 'ETH',
//         name: 'Ethereum',
//         logo: '/imagelogo/ethereum-eth-logo.png',
//         pricePerCoin: '1 ETH = 8,448,496.2999 INR',
//         blc: 0, INR: '0.00',
//         table: 'true',
//         receive: <Receive2 />,
//         send: <Send2 />,
//         threedots: <ThreeDotMenu1 btnName={'ETH'} />,

//         actions: [
//             { action: <Send2 /> },
//             { action: <Receive2 /> },
//             { name: 'Convert', icon: <SiConvertio />, to: 'convert' },
//             { name: 'Buy ETH', icon: <GoArrowDownLeft />, to: '/buy' },
//             { name: 'Sell ETH', icon: <GoArrowUpRight />, to: '/sell' }
//         ]
//     },
//     {
//         status: wallet?.data?.binance ? true : false,
//         shrotName: 'BNB', name: 'Binance',
//         logo: '/imagelogo/bnb-bnb-logo.png',
//         pricePerCoin: '1 BNB = 8,448,496.2999 INR',
//         blc: 0, INR: '0.00',
//         receive: <Receive3 />, send: <Send3 />,
//         threedots: <ThreeDotMenu1 btnName={'USDC'} />,

//         actions: [
//             { action: <Send3 /> },
//             { action: <Receive3 /> },
//             { name: 'Convert', icon: <SiConvertio />, to: 'convert' },
//             { name: 'Buy USDC', icon: <GoArrowDownLeft />, to: '/buy' },
//             { name: 'Sell USDC', icon: <GoArrowUpRight />, to: '/sell' }
//         ]
//     },
//     {
//         status: true,
//         shrotName: 'USDT', name: 'Tether',
//         logo: '/imagelogo/tether-usdt-logo.png',
//         pricePerCoin: '1 USDT = 8,448,496.2999 INR',
//         blc: 0, INR: '0.00',
//         receive: <Receive4 />, send: <Send4 />,
//         threedots: <ThreeDotMenu1 btnName={'USDT'} />,
//         actions: [
//             { action: <Send4 /> },
//             { action: <Receive4 /> },
//             { name: 'Convert', icon: <SiConvertio />, to: 'convert' },
//             { name: 'Buy USDT', icon: <GoArrowDownLeft />, to: '/buy' },
//             { name: 'Sell USDT', icon: <GoArrowUpRight />, to: '/sell' }
//         ]
//     }
// ];


export default Balance