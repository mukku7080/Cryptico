import React from 'react'

import {
    Box, Button, Card, Flex, Grid, GridItem, Heading,
    Tooltip, Menu, MenuButton, MenuItem, MenuList,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Divider,
    Switch,
    flexbox,
    Avatar,
    calc

} from '@chakra-ui/react';
import { FaArrowTrendUp, FaRegThumbsDown } from "react-icons/fa6";

import { FaCheck } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { useState } from 'react';
import PaymentDropdown from '../Dropdown/PaymentDropdown';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';
import { MdDoubleArrow } from "react-icons/md";
import OfferLocation from '../Dropdown/OfferLocation';
import TraderLocation from '../Dropdown/TraderLocation';
import { MyPaymentModal } from '../Dropdown/PaymentModal/MyPaymentModal';
import { Link } from 'react-router-dom';
import TokenDropdown from '../Dropdown/TokenDropdown';
import BuySellWithNotification from './BuySellWithNotification';

const Sell = () => {
    // const [isDisabled, setIsDisabled] = useState(true); // Switch state
    const array = [1, 2, 3, 4, 5, 6];


    return (
        <>
            <Flex maxW={'container.xxl'} justifyContent={'center'} alignItems={'center'} paddingTop={20} minH={'90vh'} direction={'column'} >
                <Flex
                    maxW={{ base: "90%", lg: '98%', xl: "90%" }}
                    minW={{ base: "90%", sm: '90%', lg: '90%', xl: "none" }}
                    w={'100%'}
                    gap={5}
                    // mt={{ base: 20, lg: 10 }}
                    direction={{ base: 'column', lg: 'row' }}

                >
                    {/* Left Side nav column */}

                    <Flex flex={{ lg: .6, xl: .4 }}
                        width={'full'}
                        gap={{ base: 5, xl: 5 }}
                        direction={{ base: 'column', md: 'row', lg: 'row', xl: 'column' }}
                        position={'sticky'}
                        top={'80px'}  // Adjust based on navbar height if any
                        height="calc(100vh - 60px)"

                    >
                        <Flex w={'full'} direction={'column'}>
                            <Card boxShadow={'lg'}
                                borderRadius={5}
                                border={'1px solid #dcdcdc'}
                                h={{ md: 'full', xl: 'auto' }}
                                p={{ base: 4, sm: 4, md: 6, xl: 4 }}
                                gap={5}>


                                <TokenDropdown />
                                <Flex gap={4} color={'gray'}>
                                    <Box>1 BTC = 458254.23 INR</Box>
                                    <Box display={'flex'} alignItems={'center'}>

                                        <FaArrowTrendUp />
                                    </Box>
                                </Flex>
                                {/* <PaymentDropdown /> */}
                                <MyPaymentModal />

                                {/* currency type input */}
                                {/* <CurrencyDropdown /> */}
                                <Flex justifyContent={'space-between'} border={'1px solid #dcdcdc'} borderRadius={5} display={'flex'} alignItems={'center'} >
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
                                        {/* <Flex alignItems={'center'}>
                                                    <Switch colorScheme='orange' onChange={() => setIsDisabled((prev) => !prev)} />

                                                </Flex> */}
                                    </Flex>
                                    <TraderLocation />

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

                                    <Button borderRadius={5} variant={'solid'} justifyContent={'space-between'} colorScheme={'orange'} rightIcon={<MdDoubleArrow />}>Find Offers</Button>


                                </Flex>
                            </Card>


                        </Flex>


                    </Flex>

                    {/* Left Side nav column end */}


                    {/* RightSide start */}

                    <Flex flex={{ lg: 1.4, xl: 1.6 }} direction={'column'} gap={5} overflowY={'auto'} >
                        <Card borderRadius={5} gap={5} p={2} >
                            <Flex direction={'column'} py={5} px={2} gap={5}>

                                <Heading size={'lg'}>Sell Bitcoin (BTC).</Heading>
                                <Box as='p' fontWeight={500} color={'gray'} fontSize={'18px'}>Sell your Bitcoin and get paid via over 500 payment methods, including bank transfers, online wallets, and gift cards.</Box>
                                <Flex direction={'column'}>

                                    <Box bg={'orange.500'} fontWeight={500} borderTopRadius={'4px'} p={2}>Promoted Offers</Box>
                                    <Button display={'flex'} width={'120px'} variant={'outline'} alignSelf={'end'} colorScheme='orange' size={'sm'} borderRadius={'none'} leftIcon={<AiOutlineExclamationCircle />}>Take Tour</Button>
                                </Flex>

                                <Flex>
                                    <Flex direction={'column'} w={'full'} borderLeft={'1px solid #dcdcdc'} borderRight={'1px solid #dcdcdc'} borderTop={'none'} borderBottomRadius={5} >

                                        {/* Table Heading */}

                                        <Flex w={'full'} bg={'gray.200'} p={4} fontWeight={500} gap={10}>

                                            <Flex flex={1} >
                                                <Box>Sell to</Box>
                                            </Flex>
                                            <Flex flex={2} >
                                                <Box display={{ base: 'none', md: 'flex' }}>get paid with</Box>
                                            </Flex>
                                            <Flex flex={1} display={{ base: 'none', md: 'flex' }} justifyContent={'end'} >
                                                <Box display={{ base: 'none', md: 'flex' }} textAlign={'end'}>Avg. trade speed</Box>
                                            </Flex>
                                            <Flex flex={2} gap={4}>

                                                <Flex flex={1} justifyContent={'end'} gap={3} wrap={{ base: 'wrap', xl: 'nowrap' }}>
                                                    <Box textAlign={'end'}>Price per Bitcoin</Box>


                                                    <Menu >
                                                        <MenuButton
                                                            as={Button}
                                                            size='sm'
                                                            display={'flex'}
                                                            justifyContent={'space-between'}
                                                            rightIcon={<MdKeyboardArrowDown />}
                                                        >
                                                            Sort by
                                                        </MenuButton>
                                                        <MenuList borderRadius={0}>
                                                            {
                                                                sortby.map((data, index) => (

                                                                    <MenuItem key={index} _hover={{ bg: 'blue.100' }}>{data.lable}</MenuItem>
                                                                ))
                                                            }
                                                        </MenuList>
                                                    </Menu>


                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        {/* Table Heading End */}



                                        {/* Offer Details */}




                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />


                                    </Flex>
                                </Flex>
                            </Flex>

                        </Card>
                        <Card borderRadius={0}>

                        </Card>


                    </Flex>

                    {/* RightSide end */}


                </Flex>
            </Flex>
        </>

    )
}






const OfferList = () => {
    return (
        <Flex w={'full'} p={4} borderBottom={'1px solid #dcdcdc'} borderBottomRadius={5} direction={'column'} gap={5} >
            {/* Row1 */}
            <Flex w={'full'} gap={{ base: 2, sm: 10 }}>

                {/* Buy from */}
                <Flex direction={'column'} flex={1}  >
                    <Flex gap={2} justifyContent={'start'} alignItems={{ base: 'start', sm: 'center' }} direction={{ base: 'column', sm: 'row' }}>
                        <Avatar border={'1px solid white'} name='M' size="sm" src='' />
                        <Box>

                            <Heading fontWeight={500} size={'sm'}>Bit_Traders</Heading>
                            <Heading fontWeight={500} size={'xs'}>Trades 804</Heading>
                        </Box>

                    </Flex>

                    <Flex gap={2} p={2}>
                        <Flex gap={2} wrap={'wrap'}>

                            <Box color={'green'} display={'flex'} alignItems={'center'} gap={2}>

                                <FaRegThumbsUp />
                                <Box> 5421</Box>

                            </Box>
                            <Box color={'red.500'} display={'flex'} alignItems={'center'} gap={2}>

                                <FaRegThumbsDown />
                                <Box> 54</Box>

                            </Box>
                        </Flex>
                    </Flex>


                </Flex>

                {/* Pay With */}
                <Flex direction={'column'} flex={2} display={{ base: 'none', md: 'flex' }} gap={3}>
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
                    <Flex gap={2} flexWrap={'wrap'} >
                        <Box p={1} fontSize={'14px'} bg={'gray.200'}>receipt req. </Box>
                        <Box p={1} fontSize={'14px'} bg={'gray.200'}>photo id req. </Box>
                        <Box p={1} fontSize={'14px'} bg={'gray.200'}>no third parties </Box>
                    </Flex>
                </Flex>
                {/* Trade speed */}
                <Flex flex={1} display={{ base: 'none', md: 'flex' }} justifyContent={'end'}>
                    <Flex gap={2} color={'gray'} justifyContent={'end'}>
                        <Box display={'flex'} mt={1} alignItems={'start'} justifyContent={'center'} gap={2}>
                            2 min
                            <Box mt={1}>

                                <MdOutlineWatchLater />
                            </Box>

                        </Box>
                    </Flex>
                </Flex>

                {/* pricePerBitcoin */}
                <Flex flex={2} justifyContent={'end'} alignItems={'start'}>
                    <Flex direction={'column'} justifyContent={'end'} alignContent={'flex-end'} alignItems={'end'} gap={2}>

                        <Heading size={'md'} textAlign={'end'}>9,199,002.07 INR</Heading>
                        <Flex gap={3} fontSize={'14px'} textAlign={'end'}>
                            <Flex display={'flex'} alignItems={'center'} gap={1}>
                                <Flex gap={2} alignItems={'center'}>
                                    <Box as='span'>

                                        1 USD=0.93 USD of BTC

                                        <Flex gap={2} alignItems={'center'} color={'green'} justifyContent={'end'} textAlign={'end'}>

                                            <FaArrowTrendUp />
                                            <Box>8%</Box>
                                            <Box>
                                                <Tooltip label='Current Market Price Indicator' fontSize='md' color={'gray'} placement={'bottom'} bg={'white'} p={4}>
                                                    <Box as='span'>

                                                        <AiOutlineExclamationCircle />
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Flex>



                            </Flex>


                        </Flex>


                    </Flex>


                </Flex>
            </Flex>

            {/* Row2 */}
            <Flex w={'full'} gap={{ base: 2, sm: 10 }} bg={'orange.50'} py={2}  >

                {/* Buy from */}
                <Flex direction={'column'} flex={1}  >

                    <Flex fontSize={'14px'} gap={1} justifyContent={'start'} alignItems={'start'} color={'gray'} px={2}>
                        <Box w={'20px'} h={'20px'}>

                            <Flex boxSize={3} mt={1} bg={'orange.400'} borderRadius={'50%'}></Flex>
                        </Box>
                        Seen 1 minute ago
                    </Flex>


                </Flex>

                {/* Pay With */}


                <Flex direction={'row'} flex={2} display={{ base: 'none', md: 'flex' }} gap={3} fontSize={'14px'} color={'gray'} bg={'red.100'} p={1}>

                    <Box as='span'  >
                        <Flex gap={2} justifyContent={'start'} alignItems={'start'} >
                            <Flex mt={1} >

                                <AiOutlineExclamationCircle color='orange' />
                            </Flex>

                            <Box as='span' >
                                <Link >
                                    <Box as='span' textDecoration={'underline'} color={'black'}>

                                        Show your full name
                                    </Box>
                                </Link>

                                <Box as='span' textDecoration={'none'}>

                                    &nbsp; to buy cryptocurrency from devuhari
                                </Box>
                            </Box>
                        </Flex>
                    </Box>

                </Flex>
                {/* Trade speed */}
                <Flex flex={1}>

                </Flex>


                {/* pricePerBitcoin */}
                <Flex flex={2} justifyContent={'end'} alignItems={'center'}>
                    <Flex direction={'column'} justifyContent={'end'} alignContent={'flex-end'} alignItems={'end'} gap={2} pr={2}>


                        <Flex gap={4} flexWrap={'wrap'} justifyContent={'end'} alignItems={'center'}>
                            <Flex direction={'column'} fontSize={'13px'}>

                                <Box textAlign={'end'}>

                                    Min purchase: 4,000 INR
                                </Box>
                                <Box textAlign={'end'}>

                                    Max purchase: 33,297 INR
                                </Box>
                            </Flex>
                            <Flex alignItems={'center'} gap={2} >
                                <Button size={'sm'} variant='outline' bg={'transparent'}><CiStar /></Button>
                                <Button size={'sm'} bg={'orange'}>Buy</Button>
                            </Flex>

                        </Flex>
                    </Flex>


                </Flex>
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


const sortby = [
    { lable: 'Price:Lowest to Highest' },
    { lable: 'Price:Highest to Lowest' },
    { lable: 'Avg. Trade Speed: Fastest to Slowest' },
    { lable: 'Avg. Trade Speed: Fastest to Slowest' },
]
export default Sell