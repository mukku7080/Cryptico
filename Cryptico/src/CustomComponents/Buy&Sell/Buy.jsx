import React from 'react'

import {
    Box, Button, Card, Flex, Grid, GridItem, Heading,
    useColorModeValue,
    Avatar,
    Link,
    Badge,
    Tooltip, Menu, MenuButton, MenuItem, MenuList,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Divider,
    Switch,
    InputLeftElement

} from '@chakra-ui/react';
import { FaArrowTrendUp } from "react-icons/fa6";

import { FaPhoneAlt, FaEnvelope, FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from 'react';
import PaymentDropdown from '../Dropdown/PaymentDropdown';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';
import { MdDoubleArrow } from "react-icons/md";
import OfferLocation from '../Dropdown/OfferLocation';
import TraderLocation from '../Dropdown/TraderLocation';

const Buy = () => {
    const [isDisabled, setIsDisabled] = useState(true); // Switch state
    const [option, setOption] = useState(cryptoOption[0].name);
    const [logo, setlogo] = useState(cryptoOption[0].logo);

    return (
        <>
            <Flex w={'container.xxl'} justifyContent={'center'} alignItems={'center'} my={10} >
                <Flex w={{ base: '95%', md: '90%', lg: '80%', xl: '70%' }} direction={'column'} gap={5}>
                    <Grid templateColumns={{ base: 'repeat(1,1fr)', sm: 'repeat(1,1fr)', md: 'repeat(1,1fr)', lg: 'repeat(1,1fr)', xl: 'repeat(4, 1fr)' }} rowGap={4} gap={{ xl: 5 }} w={'100%'} >
                        {/* Left Side nav column */}

                        <GridItem colSpan={1} bg={''}  >
                            <Flex width={'full'} gap={{ base: 5, xl: 5 }} direction={{ base: 'column', md: 'row', lg: 'row', xl: 'column' }}>
                                <Flex w={'full'} direction={'column'}>
                                    <Card boxShadow={'lg'} borderRadius={0} border={'1px solid #dcdcdc'} h={{ md: 'full', xl: 'auto' }} p={8} gap={5}>

                                        <Menu >

                                            <MenuButton as={Button} variant={'outline'} display={{ base: 'none', md: 'flex' }}  borderRadius={0} border={'1px solid #dcdcdc'} rightIcon={<MdKeyboardArrowDown />}  >
                                                <Flex gap={2}>
                                                    <Image boxSize={5} src={logo}></Image>
                                                    {option}
                                                </Flex>

                                            </MenuButton>
                                            <MenuList borderRadius={0} p={2} >
                                                {cryptoOption.map((data, index) => (
                                                    <>
                                                        <MenuItem key={index} onClick={() => {
                                                            setOption(data.name);
                                                            setlogo(data.logo);
                                                        }} gap={3} _hover={{ bg: "blue.100" }}><Image boxSize={5} src={data.logo}></Image>{data.name}</MenuItem>
                                                    </>
                                                ))}

                                            </MenuList>
                                        </Menu>
                                        <Flex gap={4} color={'gray'}>
                                            <Box>1 BTC = 458254.23 INR</Box>
                                            <Box display={'flex'} alignItems={'center'}>

                                                <FaArrowTrendUp />
                                            </Box>
                                        </Flex>
                                        <PaymentDropdown />

                                        {/* currency type input */}
                                        {/* <CurrencyDropdown /> */}
                                        <Flex justifyContent={'space-between'} border={'1px solid #dcdcdc'} >
                                            <InputGroup>

                                                <Input placeholder='Enter Amount'
                                                    border={'none'}
                                                    _hover={{ border: "none" }}
                                                    _focus={{ boxShadow: "none", border: "none" }}

                                                ></Input>
                                                {
                                                    false &&
                                                    <InputRightElement>
                                                        <Button><MdKeyboardArrowDown /></Button>
                                                    </InputRightElement>
                                                }
                                            </InputGroup>
                                            <CurrencyDropdown />
                                        </Flex>


                                        <Divider />

                                        {/* LocationFilter */}

                                        <Flex direction={'column'} gap={5}>
                                            <Flex gap={2}>
                                                <Box>Offer Location</Box>
                                                <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                                            </Flex>
                                            <OfferLocation />


                                            <Flex gap={2} justifyContent={'space-between'}>
                                                <Flex gap={2}>
                                                    <Box>Trader Location</Box>
                                                    <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                                                </Flex>
                                                <Flex alignItems={'center'}>
                                                    <Switch colorScheme='orange' onChange={() => setIsDisabled((prev) => !prev)} />

                                                </Flex>
                                            </Flex>
                                            <TraderLocation isDisabled={isDisabled} />

                                            <Flex gap={2} justifyContent={'space-between'}>
                                                <Flex gap={2}>
                                                    <Box>Recently active traders</Box>
                                                    <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                                                </Flex>
                                                <Flex alignItems={'center'}>
                                                    <Switch colorScheme='orange' />

                                                </Flex>
                                            </Flex>
                                            <Flex gap={2} justifyContent={'space-between'}>
                                                <Flex gap={2}>
                                                    <Box>Verified offers</Box>
                                                    <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                                                </Flex>
                                                <Flex alignItems={'center'}>
                                                    <Switch colorScheme='orange' />

                                                </Flex>
                                            </Flex>

                                            <Button borderRadius={0} variant={'solid'} justifyContent={'space-between'} colorScheme={'orange'} rightIcon={<MdDoubleArrow />}>Find Offers</Button>


                                        </Flex>
                                    </Card>


                                </Flex>

                            </Flex>

                        </GridItem>
                        {/* Left Side nav column end */}

                        <GridItem colSpan={3} bg={''}>
                            <Flex w={'full'} direction={'column'} gap={5}>
                                <Card borderRadius={0} gap={5} p={2}>

                                    {/* <CryptoAccordion title={'Active Offers'} btn1={'Buy Crypto'} btn2={'Sell Crypto'} isOptionButton={true} /> */}
                                    <Heading size={'lg'}>Buy BitCoin (BTC)</Heading>
                                    <Box as='p' fontWeight={500} color={'gray'} fontSize={'18px'}>Buy Bitcoin with over 500 payment methods to choose from, including bank transfers, online wallets, and gift cards.</Box>
                                    <Flex direction={'column'}>

                                        <Box bg={'orange.500'} fontWeight={500} borderTopRadius={'4px'} p={2}>Promoted Offers</Box>
                                        <Button display={'flex'} width={'120px'} variant={'outline'} alignSelf={'end'} colorScheme='orange' borderRadius={'none'} leftIcon={<AiOutlineExclamationCircle />}>Take Tour</Button>
                                    </Flex>

                                    <Flex>
                                        <Flex direction={'column'} w={'full'} borderLeft={'1px solid #dcdcdc'} borderRight={'1px solid #dcdcdc'} borderTop={'none'}>

                                            {/* Table Heading */}

                                            <Flex w={'full'} bg={'gray.200'} p={4}>

                                                <Flex flex={1} >
                                                    <Box>Buy From</Box>
                                                </Flex>
                                                <Flex flex={1} >
                                                    <Box>Pay With</Box>
                                                </Flex>
                                                <Flex flex={1} >
                                                    <Box>Avg. trade speed</Box>
                                                </Flex>
                                                <Flex flex={1}>
                                                    <Flex>

                                                        <Box>Price per Bitcoin</Box>
                                                    </Flex>
                                                    <Flex flex={1} justifyContent={'end'}>
                                                        <Box>sort by</Box>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                            {/* Table Heading End */}



                                            {/* Offer Details */}
                                            <Flex w={'full'} p={4} borderBottom={'1px solid #dcdcdc'}>

                                                {/* Buy from */}
                                                <Flex direction={'column'} flex={1} >
                                                    <Box>
                                                        Forever1145
                                                    </Box>
                                                    <Flex gap={2} p={2}>
                                                        <Box color={'green'} display={'flex'} alignItems={'center'}>

                                                            <FaRegThumbsUp />
                                                        </Box>
                                                        <Box> 5421</Box>
                                                    </Flex>
                                                    <Box>Seen 1 minute ago</Box>


                                                </Flex>

                                                {/* Pay With */}
                                                <Flex direction={'column'} flex={1} >
                                                    <Flex fontWeight={600} gap={2}>
                                                        <Box>
                                                            Bhim
                                                        </Box>
                                                        <Flex border={'1px solid green'} color={'green'} px={2} fontSize={'10px'} fontWeight={'bold'} gap={2} justifyContent={'center'} alignItems={'center'}>
                                                            <FaCheck />
                                                            <Box as='span'>

                                                                VERIFIED
                                                            </Box>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex color={'gray'}> Only For Indian Traders</Flex>
                                                </Flex>
                                                {/* Trade speed */}
                                                <Flex flex={1} >
                                                    <Flex gap={2} color={'gray'}>
                                                        <Box as='span'>2 min</Box>
                                                        <Box display={'flex'} mt={1} alignItems={''} justifyContent={'center'}>

                                                            <MdOutlineWatchLater />
                                                        </Box>
                                                    </Flex>
                                                </Flex>

                                                {/* pricePerBitcoin */}
                                                <Flex flex={1}>
                                                    <Flex direction={'column'} justifyContent={'end'} alignContent={'flex-end'} alignItems={'end'}>

                                                        <Heading size={'md'}>9,199,002.07 INR</Heading>
                                                        <Flex gap={2}>
                                                            <Box>1 USD=0.93 USD of BTC</Box>
                                                            <Flex display={'flex'} alignItems={'center'}>
                                                                <FaArrowTrendUp />
                                                                <Box>8%</Box>
                                                                <Box>
                                                                    <Tooltip label='hi its me' fontSize='md' placement={'bottom'} bg={'gray.200'}>
                                                                        <Box as='span'>

                                                                            <AiOutlineExclamationCircle />
                                                                        </Box>
                                                                    </Tooltip>
                                                                </Box>


                                                            </Flex>


                                                        </Flex>

                                                        <Flex gap={1}>
                                                            <Flex direction={'column'}>

                                                                <Box>

                                                                    Min purchase: 4,000 INR
                                                                </Box>
                                                                <Box>

                                                                    Max purchase: 33,297 INR
                                                                </Box>
                                                            </Flex>
                                                            <Flex alignItems={'center'}>
                                                                <Button size={'sm'} bg={'orange'}>Buy</Button>
                                                            </Flex>

                                                        </Flex>
                                                    </Flex>


                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Card>
                                <Card borderRadius={0}>

                                    {/* <CryptoAccordion title={'Feedback'} btn1={'From Crypto Buyers'} btn2={'From Crypto Sellers'} /> */}
                                </Card>


                            </Flex>

                        </GridItem>
                    </Grid>

                </Flex>
            </Flex>
        </>

    )
}

const cryptoOption = [
    { name: 'Bitcoin',  logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' },
    { name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' },
    { name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040' },
]
export default Buy