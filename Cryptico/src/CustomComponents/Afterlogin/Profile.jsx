import React from 'react'
import {
    Box, Button, Card, Flex, Grid, GridItem, Heading,
    useColorModeValue,
    Avatar,
    Link,
    Badge,

} from '@chakra-ui/react'

import { FaPhoneAlt, FaEnvelope, FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import CryptoAccordion, { Mybadge } from '../Accordian/CryptoAccordion';
import { IoEyeOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaTwitter, FaFacebook } from "react-icons/fa";



const Profile = () => {
    return (
        <>
            <Flex w={'container.xxl'} justifyContent={'center'} alignItems={'center'} my={10} >
                <Flex w={{ base: '95%', md: '90%', lg: '80%', xl: '70%' }} direction={'column'} gap={5}>
                    <Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(4,1fr)' }} rowGap={4} gap={{ md: 5 }}>


                        <GridItem colSpan={1} >
                            <Card borderRadius={0} p={6}>
                                <Flex alignItems={'center'} justifyContent={'center'} direction={'column'} gap={5}>
                                    <Avatar name='Mukesh rai' size={'xl'}></Avatar>

                                    <Button colorScheme='orange' rightIcon={<MdModeEdit />}> Change Profile Picture</Button>
                                </Flex>
                            </Card>

                        </GridItem>
                        <GridItem colSpan={3}  >
                            <Card width={'full'} h={'full'} p={4} borderRadius={'none'}>
                                <Flex justifyContent={'space-between'} alignItems={'center'} mx={2} direction={{ base: 'column', sm: 'row', md: 'row' }} gap={5}>

                                    <Flex direction={'column'} gap={4} color={'gray'} alignItems={{ base: 'center', sm: 'start' }} >
                                        <Heading size={'lg'}> User_Name</Heading>
                                        <Box>Trust:Block</Box>
                                        <Flex gap={3}>
                                            <Box display={'flex'} alignItems={'center'}>

                                                <IoEyeOutline />
                                            </Box>
                                            <Box as='p'>

                                                Seen 21 our ago
                                            </Box>
                                        </Flex>
                                        <Flex gap={5}  >
                                            <Box border={'1px solid #228B22'} py={2} px={5} position={'relative'} color={'#228B22'}>  Feedback
                                                <Box as='span' position={'absolute'} top={-3} right={-3} >

                                                    <Mybadge bgcolor={'#228B22'} />
                                                </Box>

                                            </Box>
                                            <Box border={'1px solid #B22222'} py={2} px={5} position={'relative'} color={'#B22222'}>

                                                Feedback
                                                <Box as='span' position={'absolute'} top={-3} right={-3} >

                                                    <Mybadge bgcolor={'#B22222'} />
                                                </Box>

                                            </Box>
                                        </Flex>

                                    </Flex>
                                    <Flex gap={5} direction={{ base: 'row', sm: 'column', lg: 'row' }}>
                                        {
                                            socialIcons.map((data, index) => (

                                                <Button key={index} as={Link} href={data.link} borderRadius={0} bg={data.color} >{data.icon}</Button>
                                            ))
                                        }

                                    </Flex>
                                </Flex>
                            </Card>

                        </GridItem>
                    </Grid>

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

                                <Flex w={'full'} direction={'column'}>
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

                                </Flex>
                            </Flex>

                        </GridItem>
                        {/* Left Side nav column end */}

                        <GridItem colSpan={3} bg={''}>
                            <Flex w={'full'} direction={'column'} gap={5}>
                                <Card borderRadius={0} gap={5}>

                                    <CryptoAccordion title={'Active Offers'} btn1={'Buy Crypto'} btn2={'Sell Crypto'} isOptionButton={true} />
                                </Card>
                                <Card borderRadius={0}>

                                    <CryptoAccordion title={'Feedback'} btn1={'From Crypto Buyers'} btn2={'From Crypto Sellers'} />
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

const socialIcons = [
    { name: "Twitter", icon: <FaTwitter color='white' />, link: "https://twitter.com", color: '#55acee' },
    { name: "Facebook", icon: <FaFacebook color='white' />, link: "https://facebook.com", color: '#3b5998' },
    { name: "Email", icon: <FaEnvelope color='white' />, link: "mailto:example@example.com", color: '#444444' }
];



export default Profile
