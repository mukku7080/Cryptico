import React from 'react'

import {
    Box, Button, Card, Flex, Grid, GridItem, Heading,
    useColorModeValue,
    Avatar,
    Link,
    Badge,

} from '@chakra-ui/react'
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiMiniArrowPath } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { MdOutlineFileDownload, MdKeyboardArrowRight, MdKeyboardArrowDown, MdOutlineContentCopy } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { PiChecks } from "react-icons/pi";
import { IoMenuOutline, IoCloseOutline, IoColorFilter } from "react-icons/io5";
import UserDrware from '../Drwares/UserDrware';
import { LuUpload } from "react-icons/lu";
import { FaPhoneAlt, FaEnvelope, FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import CryptoAccordion, { Mybadge } from '../Accordian/CryptoAccordion';
import { IoEyeOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
const Buy = () => {
    return (
        <>
            <Flex w={'container.xxl'} justifyContent={'center'} alignItems={'center'} my={10} >
                <Flex w={{ base: '95%', md: '90%', lg: '80%', xl: '70%' }} direction={'column'} gap={5}>
                    <Grid templateColumns={{ base: 'repeat(1,1fr)', sm: 'repeat(1,1fr)', md: 'repeat(1,1fr)', lg: 'repeat(1,1fr)', xl: 'repeat(4, 1fr)' }} rowGap={4} gap={{ xl: 5 }} w={'100%'} >
                        {/* Left Side nav column */}

                        <GridItem colSpan={1} bg={''}  >
                            <Flex width={'full'} gap={{ base: 5, xl: 5 }} direction={{ base: 'column', md: 'row', lg: 'row', xl: 'column' }}>
                                <Flex w={'full'} direction={'column'}>
                                    <Card boxShadow={'lg'} borderRadius={0} border={'1px solid #dcdcdc'} h={{ md: 'full', xl: 'auto' }}>

                                        <Box py={2} px={3} borderBottom={'1px solid #dcdcdc'} fontWeight={600} bg={'#f7f7f7'} w={'full'}>Verification</Box>
                                        {verificationStatus.map((data, index) => (
                                            <>
                                                <Box key={index} py={2} px={3}>
                                                    <Flex gap={5}>
                                                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>

                                                            {data.icon}
                                                        </Box>
                                                        <Box fontSize={'16px'}>{data.label}</Box>
                                                    </Flex>
                                                </Box>
                                            </>
                                        ))}
                                    </Card>


                                </Flex>

                                {/* <Flex w={'full'} direction={'column'}>
                                    <Card boxShadow={'lg'} border={'1px solid #dcdcdc'} borderRadius={0}>

                                        <Box py={2} px={3} borderBottom={'1px solid #dcdcdc'} fontWeight={600} bg={'#f7f7f7'} w={'full'}>Info</Box>
                                        {userDetails.map((data, index) => (
                                            <>
                                                <Box key={index} py={2} px={3}>
                                                    <Flex gap={5} justifyContent={'space-between'}>
                                                        <Box display={'flex'} fontWeight={550} justifyContent={'center'} alignItems={'center'}>

                                                            {data.label}
                                                        </Box>
                                                        <Box fontSize={'16px'}>{data.value}</Box>
                                                    </Flex>
                                                </Box>
                                            </>
                                        ))}
                                    </Card>

                                </Flex> */}
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

                                        <Box bg={'orange'} fontWeight={500} borderTopRadius={'4px'} p={2}>Promoted Offers</Box>
                                        <Button display={'flex'} variant={'outline'}>Take Tour</Button>
                                    </Flex>

                                    <Flex>
                                        <Flex direction={'column'} w={'full'} border={'1px solid #dcdcdc'} borderTop={'none'}>

                                            {/* Table Heading */}
                                            <Flex justifyContent={'space-between'} w={'full'} p={2} bgColor={'gray.200'}>
                                                <Flex gap={20} w={'30%'} justifyContent={'space-between'}>

                                                    <Box>Buy From</Box>
                                                    <Box>Pay With</Box>
                                                </Flex>
                                                <Flex gap={4} w={'70%'} justifyContent={'space-around'}>
                                                    <Box>Avg. trade speed</Box>
                                                    <Box>Price per Bitcoin</Box>
                                                    <Box>sort by</Box>
                                                </Flex>
                                            </Flex>
                                            {/* Table Heading End */}



                                            {/* Offer Details */}
                                            <Flex justifyContent={'space-between'} w={'full'} p={2}>
                                                <Flex gap={20} w={'35%'} justifyContent={'space-between'}>

                                                    {/* Buy from */}
                                                    <Flex direction={'column'}>
                                                        <Box>
                                                            Forever1145
                                                        </Box>
                                                        <Box>5254</Box>
                                                        <Box>Seen 1 minute ago</Box>


                                                    </Flex>

                                                    {/* Pay With */}
                                                    <Flex direction={'column'} justifyContent={'center'} >
                                                        <Flex>Bhim</Flex>
                                                        <Flex> Only For Indian Traders</Flex>
                                                    </Flex>
                                                </Flex>
                                                <Flex gap={4} w={'65%'} justifyContent={'space-around'}>
                                                    {/* Trade speed */}
                                                    <Flex>

                                                    </Flex>
                                                    <Flex>

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

const verificationStatus = [
    {
        label: "Phone Verified",
        icon: <FaPhoneAlt color="green" />
    },
    {
        label: "Email Verified",
        icon: <FaEnvelope color="green" />
    },
    {
        label: "Profile Verified",
        icon: <FaUserCircle color="green" />
    },
    {
        label: "Address Verified",
        icon: <FaMapMarkerAlt color="green" />
    },
]
const userDetails = [
    { label: "Location:", value: "India" },
    { label: "Languages:", value: "English (English)" },
    { label: "Trade Partners:", value: 20 },
    { label: "Trades:", value: 26 },
    { label: "Trade Volume (BTC):", value: "less than 10 BTC" },
    { label: "Trade Volume (ETH):", value: "0 ETH" },
    { label: "Trade Volume (USDT):", value: "0 USDT" },
    { label: "Trade Volume (USDC):", value: "0 USDC" },
    { label: "Trusted By:", value: 1 },
    { label: "Blocked By:", value: 0 },
    { label: "Has Blocked:", value: 0 },
    { label: "Joined:", value: "1 year ago" },
];
export default Buy