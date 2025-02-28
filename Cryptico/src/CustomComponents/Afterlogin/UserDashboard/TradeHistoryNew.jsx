import React from 'react'
import { Box, Button, Card, Flex, Grid, GridItem, Heading, Image, Link, useColorModeValue } from '@chakra-ui/react'
import { MdOutlineContentCopy } from "react-icons/md";
import { LuUpload } from "react-icons/lu";
import UserDrware from '../../Drwares/UserDrware';

const TradeHistoryNew = () => {
    const bgcolor = useColorModeValue('gray.100', 'gray.700');





    return (
        <>
            <Flex direction={'column'} borderRadius={5} gap={4} bg={'transparent'} >
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={4}>


                    {/* First card */}
                    <GridItem>
                        <Card border={'1px solid #dcdcdc'} p={4} h={'100%'}>
                            <Flex direction={'column'} alignItems={'start'} gap={4}>
                                <Heading size={'sm'}>Wallet</Heading>
                                <Flex direction={'column'} gap={0}>

                                    <Box fontSize={'14px'}>Total Balance</Box>
                                    <Box fontWeight={500}>475145.25 <Box as='span' fontSize={'12px'}>INR</Box></Box>
                                </Flex>
                                <Flex gap={5}>
                                    {cryptoOption.map((data, index) => (
                                        <>
                                            <Image src={data.logo} boxSize={5} mt={1}></Image>
                                        </>
                                    ))}
                                </Flex>
                                <Flex w={'full'} justifyContent={'center'} alignItems={'center'} mt={5}>

                                    <Button w={'full'} colorScheme='orange' size={'sm'}> Go to Wallet</Button>
                                </Flex>
                            </Flex>

                        </Card>
                    </GridItem>
                    {/* Second Card */}
                    <GridItem>
                        <Card border={'1px solid #dcdcdc'} p={4} h={'100%'}>
                            <Flex direction={'column'} alignItems={'start'} gap={4}>
                                <Heading size={'sm'}>Explore P2P Marketplace</Heading>
                                <Flex direction={'column'} gap={0}>

                                    <Box >Online users: <Box as='span' fontWeight={500}>40256</Box></Box>
                                    <Box >Users offers: <Box as='span' fontWeight={500}>464001</Box></Box>
                                    <Box >Trade 24h volume: <Box as='span' fontWeight={500}>40256 USD</Box></Box>
                                    <Box >Total liquidity: <Box as='span' fontWeight={500}>40256 USD</Box></Box>
                                </Flex>

                                <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'} mt={5}>

                                    <Button colorScheme='orange' size={'sm'}> Buy Crypto</Button>
                                    <Button colorScheme='orange' size={'sm'}> Sell Crypto</Button>
                                </Flex>
                            </Flex>

                        </Card>
                    </GridItem>
                    {/* Third Card */}
                    <GridItem>
                        <Card border={'1px solid #dcdcdc'} p={4} h={'100%'}>
                            <Flex direction={'column'} alignItems={'start'} gap={4}>
                                <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>

                                    <Heading size={'sm'}>My Badges</Heading>
                                    <Heading size={'sm'} color={'gray'}>No Badges</Heading>
                                </Flex>
                                <Flex direction={'column'} gap={5}>
                                    {
                                        badge.map((data, index) => (


                                            <Flex key={index} gap={5}>
                                                <Image boxSize={5} src={data.logo}></Image>
                                                <Box>{data.name}</Box>
                                            </Flex>
                                        ))
                                    }



                                </Flex>

                                <Flex w={'full'} justifyContent={'end'} alignItems={'end'} mt={5}>

                                    <Button w={'full'} colorScheme='orange' size={'sm'}> View your badges</Button>
                                </Flex>
                            </Flex>

                        </Card>
                    </GridItem>
                </Grid>
                <Flex gap={5} direction={{base:'column',md:'row'}}>
                    <Flex flex={1}>
                        <Card w={'full'}>
                            <Flex direction={'column'} justifyContent={'space-between'} h={'100%'}>

                                <Flex w={'full'} justifyContent={'space-between'} p={4}>

                                    <Heading size={'sm'}>My Offers</Heading>
                                    <Heading size={'sm'}>Active Offers: 5</Heading>
                                </Flex>

                                <Flex w={'full'} justifyContent={'space-between'} p={4}>
                                    <Image width={20} height={16} src='/imagelogo/cryptico.png'></Image>
                                    <Flex alignItems={'end'}>

                                        <Button colorScheme='orange' size={'sm'}> View all offers</Button>
                                    </Flex>
                                </Flex>
                            </Flex>

                        </Card>
                    </Flex>
                    <Flex flex={1}>
                        <Card w={'full'}>
                            <Flex w={'full'} justifyContent={'space-between'} p={4}>

                                <Heading size={'sm'}>Rewards</Heading>
                                <Heading size={'sm'}>254781 Seats</Heading>
                            </Flex>

                            <Flex w={'full'} justifyContent={'space-between'} p={4} wrap={'wrap'} gap={2}>
                                <Flex gap={2}>
                                    <Image boxSize={20} src='https://www.bybitglobal.com/common-static/fhs/bybit-home-new/qrCode.png?quality=70&format=webp&resize=width/150'></Image>
                                    <Flex >
                                        invite a friend using this link and get revenue share  and bonuses.

                                    </Flex>
                                </Flex>
                                <Flex alignItems={'end'}>
                                    <Button colorScheme='orange' size={'sm'}> View all Rewards</Button>
                                </Flex>
                            </Flex>


                        </Card>
                    </Flex>
                </Flex>




            </Flex>
        </>
    )
}

const cryptoOption = [
    { name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' },
    { name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' },
    { name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040' },
]
const badge = [
    { name: 'Vendor', logo: '/imagelogo/businessman.png' },
    { name: 'Power Trader', logo: '/imagelogo/flash.png' },
    { name: 'Expert Trader', logo: '/imagelogo/badge.png' },
]


export default TradeHistoryNew