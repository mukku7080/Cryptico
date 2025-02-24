import { Box, Button, Card, Divider, Flex, Heading, Icon, Image, Menu, MenuButton, MenuList, MenuItem, Circle } from '@chakra-ui/react'
import React from 'react'
import { LuEqualApproximately } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TbSend } from "react-icons/tb";

import { SiConvertio } from "react-icons/si";
import { BsArrowBarDown, BsThreeDots } from "react-icons/bs";
import { RiArrowRightDownLine } from "react-icons/ri";
import { BsBoxArrowInUpRight, BsBoxArrowInDownRight } from "react-icons/bs";

const Wallet = () => {


    return (
        <Flex w={'container.xxl'} gap={10} direction={'column'} alignItems={'center'} justifyContent={'center'} my={20} marginTop={'50px'}>
            <Flex w={'80%'} direction={'column'} gap={8} mt={10}>

                {/* Buttton Group section */}
                <Flex direction={'column'}>

                    <Flex gap={10}>
                        {
                            walletButtons.map((item, index) => (
                                <Button key={index} bg={'transparent'} borderRadius={0} _hover={{ bg: 'transparent', borderBottom: '2px solid black' }}>
                                    {item.lable}
                                </Button>
                            ))
                        }

                    </Flex>
                    <Divider w={'full'} />
                </Flex>
                {/* Buttton Group section end */}

                {/* Button With card start */}

                <Flex w={'full'} justifyContent={'space-between'} >

                    <Card w={'30%'}>
                        <Flex justifyContent={'space-between'}>

                            <Flex direction={'column'} gap={2} p={4} flex={1}>
                                <Box>
                                    Total Holding
                                </Box>
                                <Heading size={'md'}>0 BTC</Heading>
                                <Flex alignItems={'center'} gap={3}>
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

                    <Flex alignItems={'end'} >
                        <Button colorScheme='orange' px={20}> Buy Crypto Directly</Button>
                    </Flex>
                </Flex>

                {/* Button With card End */}

                {/* Dashboard first start */}

                <Flex>
                    <Card w={'100%'} p={4}>
                        <Heading size={'md'}>Assets</Heading>

                        {/* Bellow Assets */}

                        <Flex p={4} gap={10} direction={'column'}>
                            {/* TableHeading start -------------------------------------------------------------------------------------------------------------- */}

                            <Flex w={'full'} p={2} gap={10} >
                                <Flex flex={1.2} color={'gray'} direction={'column'} gap={10}>
                                    <Flex fontSize={'12px'}>
                                        <Flex flex={1}  >
                                            <Box ml={9}>
                                                Currency
                                            </Box>
                                        </Flex>
                                        <Flex flex={.5} justifyContent={'center'} display={{ base: 'none', xl: 'flex' }}>Balance</Flex>
                                        <Flex flex={.5} justifyContent={'center'} > In INR</Flex>
                                    </Flex>
                                </Flex>
                                <Flex flex={.8} color={'green'} gap={20} justifyContent={'space-between'} direction={'column'}>

                                </Flex>
                            </Flex>
                            {/* TableHeading End -------------------------------------------------------------------------------------------------------*/}

                            {
                                cryptoOption.map((item, index) => (

                                    <Flex key={index} p={2} gap={10}>
                                        <Flex flex={1.2} color={'gray'} direction={'column'} >

                                            {/* Left Side Table Data */}
                                            <Flex borderRight={'1px solid #dcdcdc'}  >

                                                <Flex flex={1} gap={2}>
                                                    <Box display={'flex'} pt={1}>
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
                                                <Flex flex={.5} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                                                    <Box>{item.blc}</Box>
                                                    <Flex >
                                                        <Box pt={1}>
                                                            <LuEqualApproximately />
                                                        </Box>
                                                        {item.INR}
                                                    </Flex>
                                                </Flex>
                                                <Flex flex={.5} justifyContent={'center'} gap={1} fontSize={'12px'} display={{ base: 'none', xl: 'flex' }}>
                                                    <Box pt={1}>
                                                        <LuEqualApproximately />
                                                    </Box>
                                                    {item.INR}
                                                </Flex>
                                            </Flex>
                                            {/* Left Side Table Data End */}
                                        </Flex>


                                        {/* Right side Table Data Start */}
                                        <Flex flex={.8} gap={{ sm: 12, md: 15, lg: 20 }} justifyContent={'space-between'} >

                                            {
                                                cryptoStatus.map((item, index) => (
                                                    <>

                                                        <Flex key={index} cursor={'pointer'} direction={'column'} >
                                                            <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}>{item.icon}</Flex>
                                                            <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>{item.name}</Flex>

                                                        </Flex>
                                                    </>
                                                ))
                                            }


                                        </Flex>
                                        {/* Right side Table Data End */}

                                    </Flex>


                                ))
                            }

                        </Flex>
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


const MIte = () => {
    return (

        <Menu>
            <MenuButton>
                <BsThreeDots />
            </MenuButton>
            <MenuList borderRadius={0} >
                {/* {
                    cryptoStatus.map((item, index) => (
                        <>
                            <MenuItem key={index}>
                                <Flex cursor={'pointer'}  >
                                    <Flex display={'flex'} alignItems={'center'} justifyContent={'center'}>{item.icon}</Flex>
                                    <Flex fontSize={'12px'} color={'gray'} fontWeight={500}>{item.name}</Flex>

                                </Flex>
                            </MenuItem>
                        </>
                    ))
                } */}
                <MenuItem>Buy BTC</MenuItem>
                <MenuItem>Sell BTC</MenuItem>
            </MenuList>
        </Menu>

    )
}



const LatestTransactions = () => {
    const arr = [1, 2]

    return (
        <>
            <Card w={'100%'} p={4}>
                <Heading size={'md'}> Latest Transactions</Heading>
                <Flex w={'full'} p={8} color={'gray'} direction={'column'} gap={10}>
                    {/* Heading start */}
                    <Flex w={'full'} fontSize={'12px'} fontWeight={500}>
                        <Flex flex={1.4} gap={10}>
                            <Flex flex={.8}> <Box ml={8}>TRANSACTION</Box></Flex>
                            <Flex flex={1.2} display={{ base: 'none', md: 'Flex' }}>DETAILS</Flex>
                        </Flex>
                        <Flex flex={.6}>
                            <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                <Flex display={{ base: 'none', lg: 'flex' }}>STATUS</Flex>
                                <Flex><Box display={'flex'} justifyContent={'end'} >AMOUNT</Box></Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* Heading End */}

                    {/* Data Part start */}
                    {
                        arr.map(() => (
                            <>

                                <Flex w={'full'}>
                                    <Flex flex={1.4} gap={10}>
                                        <Flex flex={.8}>
                                            <Flex gap={5}>
                                                <Box pt={1}> <Circle bg={'orange'} p={2}><BsBoxArrowInDownRight /></Circle></Box>
                                                <Flex direction={'column'}>
                                                    <Box>Recived</Box>
                                                    <Box>{Date().toLocaleString()}</Box>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Flex display={{ base: 'none', md: 'Flex' }} direction={'column'} flex={1.2} gap={2}>
                                            Sent To : 0x1234567890
                                            <Flex display={{ base: 'flex', lg: 'none' }}>

                                                <Button variant={'outline'} size={'sm'} colorScheme='orange'>Completed</Button>
                                            </Flex>

                                        </Flex>
                                    </Flex>
                                    <Flex flex={.6} >
                                        <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                            <Flex display={{ base: 'none', lg: 'Flex' }}>
                                                <Button variant={'outline'} size={'sm'} colorScheme='orange'>Completed</Button>
                                            </Flex>
                                            <Flex>
                                                <Flex direction={'column'}  >
                                                    <Box alignItems={'end'}  >-0.000000254 BTC</Box>
                                                    <Box  alignItems={'end'} >-0.73 BTC</Box>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </>
                        ))
                    }
                    {/* Data Part End */}

                </Flex>
            </Card>
        </>
    )
}


const walletButtons = [
    { lable: 'Balance' },
    { lable: 'Lightining' },
    { lable: 'Transactions' },
    { lable: 'Address' },
    { lable: 'Convert' }
]
const cryptoOption = [
    { shrotName: 'BTC', name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040', pricePerCoin: '1 BTC = 8,448,496.2999 INR', blc: 0, INR: '0.00' },
    { shrotName: 'ETH', name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040', pricePerCoin: '1 ETH = 8,448,496.2999 INR', blc: 0, INR: '0.00' },
    { shrotName: 'USDC', name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040', pricePerCoin: '1 USDC = 8,448,496.2999 INR', blc: 0, INR: '0.00' },
    { shrotName: 'USDT', name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040', pricePerCoin: '1 USDT = 8,448,496.2999 INR', blc: 0, INR: '0.00' },
]
const cryptoStatus = [
    { name: 'Send', icon: <TbSend /> },
    { name: 'Receive', icon: <RiArrowRightDownLine /> },
    { name: 'Convert', icon: <SiConvertio /> },
    { name: '', icon: <MIte /> }
]



export default Wallet