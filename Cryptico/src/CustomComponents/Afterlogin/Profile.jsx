import React from 'react'
import {
    Box, Button, Card,  Flex, Grid, GridItem, Heading, 
     useColorModeValue,
    Avatar
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
import CryptoAccordion from '../Accordian/CryptoAccordion';
import { IoEyeOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";


const Profile = () => {
    return (
        <>
            <Flex w={'container.xxl'} justifyContent={'center'} alignItems={'center'} my={10} >
                <Flex w={'70%'} direction={'column'} gap={5}>
                    <Grid templateColumns={'repeat(4,1fr)'} gap={5}>
                        <GridItem colSpan={1} >
                            <Card borderRadius={0} p={4}>
                                <Flex alignItems={'center'} justifyContent={'center'} direction={'column'} gap={5}>
                                    <Avatar name='Mukesh rai' size={'xl'}></Avatar>

                                    <Button colorScheme='orange' rightIcon={<MdModeEdit />}> Change Profile Picture</Button>
                                </Flex>
                            </Card>

                        </GridItem>
                        <GridItem colSpan={3}  >
                            <Card width={'full'} h={'full'} p={4} borderRadius={'none'}>
                                <Flex>

                                    <Flex direction={'column'} gap={4} color={'gray'}>
                                        <Heading size={'lg'}> User_Name</Heading>
                                        <Box>Trus:Block</Box>
                                        <Flex> <IoEyeOutline /> &nbsp;Seen 21 our ago</Flex>
                                        <Flex gap={10}>
                                            <Box> Positive</Box>
                                            <Box> Negative</Box>
                                        </Flex>

                                    </Flex>
                                    <Flex>

                                    </Flex>
                                </Flex>
                            </Card>

                        </GridItem>
                    </Grid>

                    <Grid templateColumns={{ base: 'repeat(1,1fr)', sm: 'repeat(1,1fr)', md: 'repeat(1,1fr)', lg: 'repeat(1,1fr)', xl: 'repeat(4, 1fr)' }} rowGap={4} gap={{ xl: 5 }} w={'100%'} >
                        <GridItem colSpan={1} bg={''}  >
                            <Flex width={'full'} gap={{ base: 5, xl: 5 }} direction={{ base: 'column', md: 'row', lg: 'row', xl: 'column' }}>
                                <Flex w={'full'} direction={'column'}>
                                    <Card boxShadow={'lg'} borderRadius={0} border={'1px solid #dcdcdc'}>

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
                                                    <Flex gap={5}>
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



export default Profile
