import React from 'react'
import { Box, Button, Card, Flex, FormControl, Input } from '@chakra-ui/react'
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { SiConvertio } from "react-icons/si";
import { TbArrowsExchange2 } from "react-icons/tb";
import { CgArrowsExchangeAltV } from "react-icons/cg";

import TokenDropdown from '../Dropdown/TokenDropdown';


const Convert = () => {
    return (
        <>
            <Flex w={'container.xxl'} gap={10} direction={'column'} alignItems={'center'} justifyContent={'start'} my={20} marginTop={'50px'} minH={'70vh'}>
                <Flex
                    maxW={{ base: "100%", lg: '90%', xl: "90%" }}
                    minW={{ base: "100%", sm: '90%', lg: '90%', xl: "90%" }}
                    direction={'column'}
                    gap={8}
                >

                    {/* <Flex gap={2} bg={'red.100'} p={2} color={'black'}>
                        <Box mt={1} color={'red'}>

                            <AiOutlineExclamationCircle />
                        </Box>
                        <Flex >
                            <Box as='p' fontWeight={400} color={'gray'} >

                                Conversions are currently unstable. Please stay patient, Paxful's team is actively working to resolve it as soon as possible.

                            </Box>
                        </Flex>
                    </Flex> */}
                    <Card w={'full'} p={4}  >
                        <Flex w={'full'} direction={{ base: 'column', lg: 'row' }} my={5} >

                            {/* Convert from start */}

                            <Flex flex={4.8} direction={'column'} gap={5} p={4}  >
                                <Flex justifyContent={'space-between'} w={'full'} gap={2}>

                                    <Box>You are converting</Box>
                                    <Box textAlign={'end'}>Available : 0</Box>
                                </Flex>
                                <Flex justifyContent={'space-between'} direction={{ base: 'column-reverse', sm: 'row' }} alignItems={'center'} w={'full'} gap={2}>
                                    <Flex flex={1.2}>

                                        <FormControl>
                                            <Input p={0} fontWeight={'700'} fontSize={'30px'} placeholder='Enter Amount' size={{ base: 'none', md: 'lg' }} border={'none'} _hover={{ border: 'none' }} _focus={{ boxShadow: 'none' }}></Input>
                                        </FormControl>
                                    </Flex>
                                    <Flex flex={.8} w={'full'}>

                                        <TokenDropdown />
                                    </Flex>
                                </Flex>
                                <Box>

                                    <Button colorScheme='orange' size={'sm'}>
                                        min 0.000017774
                                    </Button>
                                </Box>

                            </Flex>
                            {/* Convert from End */}
                            <Flex flex={.4} justifyContent={'center'} alignItems={'center'} color={'orange.500'} >
                                <Flex display={{ base: 'none', lg: 'flex' }}>

                                    <TbArrowsExchange2 size={30} />
                                </Flex>
                                <Flex display={{ base: 'flex', lg: 'none' }}>

                                    <CgArrowsExchangeAltV size={30} />
                                </Flex>
                            </Flex>


                            {/* Convert to start */}
                            <Flex flex={4.8} direction={'column'} gap={5} p={4}>
                                <Flex justifyContent={'space-between'} w={'full'} gap={2}>

                                    <Box>You will  receive</Box>
                                    <Box textAlign={'end'}>Available : 0</Box>
                                </Flex>
                                <Flex justifyContent={'space-between'} w={'full'} gap={2} direction={{ base: 'column-reverse', sm: 'row' }}>
                                    <Flex flex={1.2}>

                                        <FormControl>
                                            <Input p={0} fontWeight={'700'} fontSize={'30px'} placeholder='Enter Amount' size={'lg'} border={'none'} _hover={{ border: 'none' }} _focus={{ boxShadow: 'none' }}></Input>
                                        </FormControl>
                                    </Flex>
                                    <Flex flex={.8}>

                                        <TokenDropdown />
                                    </Flex>
                                </Flex>


                            </Flex>
                            {/* Convert to End */}
                        </Flex>
                        <Flex w={'full'} borderTop={'1px solid #dcdcdc'} p={4}  >
                            <Flex mt={5} w={'full'}>
                                <Flex w={'full'} justifyContent={'space-between'} wrap={'wrap'} gap={5} >

                                    <Flex gap={4}>
                                        <Box >
                                            <SiConvertio size={30} color='orange' />
                                        </Box>
                                        <Flex direction={'column'} fontSize={{ base: '12px', sm: '14px', md: '16px' }} >
                                            <Box>Exchange Rate : 1 BTC = 8547521.2145 USDT</Box>
                                            <Box fontSize={'12px'}>Refressing Time</Box>
                                        </Flex>

                                    </Flex>
                                    <Flex>

                                        <Button px={10} size={{ base: 'sm', md: 'md' }}>Convert</Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>

                    </Card>
                </Flex>
            </Flex>
        </>

    )
}

export default Convert