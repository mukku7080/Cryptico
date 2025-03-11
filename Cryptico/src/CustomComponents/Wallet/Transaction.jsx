import { Box, Button, Card, Divider, Flex, Heading, Icon, Image, Menu, MenuButton, MenuList, MenuItem, Circle } from '@chakra-ui/react'
import React from 'react'
import { LuEqualApproximately } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TbSend } from "react-icons/tb";

import { SiConvertio } from "react-icons/si";
import { BsArrowBarDown, BsThreeDots } from "react-icons/bs";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { RiArrowRightDownLine } from "react-icons/ri";
import { BsBoxArrowInUpRight, BsBoxArrowInDownRight } from "react-icons/bs";
import TokenDropdown from '../Dropdown/TokenDropdown';

const Transaction = () => {


    return (
        <Flex w={'container.xxl'} gap={10} direction={'column'} alignItems={'center'} justifyContent={'start'} my={20} marginTop={'50px'} minH={'86vh'}>
            <Flex
                maxW={{ base: "100%", lg: '100%', xl: "100%" }}
                minW={{ base: "100%", sm: '100%', lg: '100%', xl: "100%" }}
                direction={'column'}
                gap={8}
            >
                <Flex ml={4} width={{ base: '90%', sm: '35%', md: '25%', lg: '20%' }}  >

                    <TokenDropdown />
                </Flex>

                <LatestTransactions />

                <Button variant={'outline'} w={'full'}> veiw all transactions</Button>

            </Flex>

        </Flex>
    )
}

const LatestTransactions = () => {
    const arr = [1, 2]

    return (
        <>
            <Flex w={'100%'} p={4} direction={'column'} gap={10}>
                <Heading size={'md'}> Finished Transactions</Heading>
                <Card w={'full'}>

                    <Flex w={'full'} p={{ base: 2, sm: 2 }} color={'gray'} direction={'column'} gap={3}>
                        {/* Heading start */}
                        <Flex w={'full'} fontSize={'12px'} fontWeight={500} mb={3} mt={5}>
                            <Flex flex={1.4} gap={10}>
                                <Flex flex={.8}> <Box ml={{ base: 10, sm: 16 }} >TRANSACTION</Box></Flex>
                                <Flex flex={1.2} display={{ base: 'none', md: 'Flex' }} ml={3}>DETAILS</Flex>
                            </Flex>
                            <Flex flex={.6}>
                                <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                    <Flex display={{ base: 'none', lg: 'flex' }}>STATUS</Flex>
                                    <Flex><Box display={'flex'} justifyContent={'end'} pr={4} >AMOUNT</Box></Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        {/* Heading End */}

                        {/* Data Part start */}
                        {
                            arr.map(() => (
                                <>

                                    <Flex w={'full'} bg={'white'} p={{ base: 3, sm: 4 }}>
                                        <Flex flex={1.4} gap={10}>
                                            <Flex flex={.8}>
                                                <Flex gap={{ base: 1, sm: 5 }}>
                                                    <Box pt={1}> <Circle bg={'orange'} p={2}><BsBoxArrowInDownRight /></Circle></Box>
                                                    <Flex direction={'column'} >
                                                        <Box>Recived</Box>
                                                        <Box fontSize={'12px'}>{new Date().toLocaleString()}</Box>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                            <Flex display={{ base: 'none', md: 'Flex' }} direction={'column'} flex={1.2} gap={2}>
                                                Sent To : 0x1234567890
                                                <Flex display={{ base: 'flex', lg: 'none' }}>

                                                    <Button variant={'outline'} size={'sm'} colorScheme='green'>Completed</Button>
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                        <Flex flex={.6} >
                                            <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                                <Flex display={{ base: 'none', lg: 'Flex' }}>
                                                    <Button variant={'outline'} size={'sm'} colorScheme='green'>Completed</Button>
                                                </Flex>
                                                <Flex>
                                                    <Flex direction={'column'} textAlign={'end'}  >
                                                        <Box alignItems={'end'}  >-0.000000254 BTC</Box>
                                                        <Box alignItems={'end'} fontSize={'12px'} >-0.73 BTC</Box>
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
            </Flex>
        </>
    )
}








export default Transaction