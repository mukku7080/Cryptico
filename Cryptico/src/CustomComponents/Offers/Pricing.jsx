import {
    Flex, Heading, Radio, Box, Grid, GridItem, Button, InputGroup, InputLeftElement, Input, InputRightElement, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputRightAddon,
    InputLeftAddon
} from '@chakra-ui/react'
import { AiOutlineExclamationCircle } from "react-icons/ai";

import React, { useState } from 'react'

const Pricing = () => {
    return (
        <Flex direction={'column'} gap={10}>
            <Heading size={'md'}>Trade Pricing</Heading>
            <Heading size={'sm'}>Choose Bitcoin rate you want to use</Heading>
            <Flex gap={5} direction={{ base: 'column', xl: 'row' }} >

                <Flex gap={1} border={'1px solid #dcdcdc'} direction={'column'} p={2} minW={{ base: 'auto', sm: '300px' }} borderRadius={5} >
                    <Radio size='md' name='1' colorScheme='orange' value='2' >
                        Market Price

                    </Radio>
                    <Box display={'flex'} alignItems={'center'} color={'gray'} fontSize={'14px'} pl={6}>Your offer’s selling price will change according to the market price of Bitcoin.</Box>

                </Flex>
                <Flex gap={1} border={'1px solid #dcdcdc'} direction={'column'} p={2} minW={{ base: 'auto', sm: '300px' }} borderRadius={5} >
                    <Radio size='md' name='1' colorScheme='orange' value='2' >
                        Fixed Price

                    </Radio>
                    <Box display={'flex'} alignItems={'center'} color={'gray'} fontSize={'14px'} pl={6}>Your offer’s selling price is locked when you create it, and won’t change with the market price.</Box>

                </Flex>
            </Flex>
            <TradeLimit />
            <Offermargin />
            <TimeLimit />



        </Flex>
    )
}


const TradeLimit = () => {
    const [isfixedprice, setFixedPrice] = useState(true);

    return (
        <Grid templateColumns={{ base: 'repeat(1,1fr)', lg: 'repeat(5,1fr)' }} border={'1px solid #dcdcdc'} borderLeft={{ base: '1px solid #dcdcdc', lg: 0 }} p={2}>
            <GridItem colSpan={2} p={2}  >
                <Flex direction={'column'} gap={5} justify={'center'} alignItems={'center'} my={{ md: 10 }}>
                    <Heading size={'md'}>Offer Trades Limit</Heading>
                    <Button size={'sm'} variant={'outline'} px={8} onClick={() => setFixedPrice((prev) => !prev)}>{isfixedprice ? "use range" : "use fixed amount"}</Button>
                </Flex>
            </GridItem>
            <GridItem colSpan={3} borderLeft={{ base: 0, lg: '1px solid #dcdcdc' }} borderTop={{ base: '1px solid #dcdcdc', lg: 0 }} p={2}>
                <Flex justifyContent={'center'} alignItems={'center'} gap={5} direction={'column'} px={4} my={10}  >
                    <Flex gap={10} w={'full'} direction={{ base: 'column', xl: 'row' }}>
                        <Flex direction={'column'} flex={1} borderRadius={5}>
                            <Box>
                                minimum
                            </Box>
                            <InputGroup >
                                <Input borderRadius={5} placeholder='type...' ></Input>
                                <InputRightAddon bg={'transparent'} borderRadius={5} >
                                    <Box>INR</Box>
                                </InputRightAddon>
                            </InputGroup>
                        </Flex>
                        <Flex direction={'column'} flex={1} borderRadius={5}>
                            <Box>
                                maximum
                            </Box>
                            <InputGroup >
                                <Input borderRadius={5} placeholder='type...'  ></Input>
                                <InputRightAddon bg={'transparent'} borderRadius={5}>
                                    <Box>INR</Box>
                                </InputRightAddon>
                            </InputGroup>
                        </Flex>
                    </Flex>



                    <Flex bg={'orange.50'} border={'1px solid orange'} p={2} color={'gray'} gap={2} borderRadius={5}>
                        <AiOutlineExclamationCircle size={30} />
                        If the minimum you set in your currency drops below 3.00 USD in value, we’ll prompt the buyers to pick an amount worth at least 3.00 USD to proceed with the trade.
                    </Flex>

                </Flex>

            </GridItem>
        </Grid>
    )
}



const Offermargin = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Grid templateColumns={{ base: 'repeat(1,1fr)', lg: 'repeat(5,1fr)' }} border={'1px solid #dcdcdc'} borderLeft={{ base: '1px solid #dcdcdc', lg: 0 }} p={2}>
                <GridItem colSpan={2} p={2}>
                    <Flex direction={'column'} gap={5} justify={'center'} alignItems={'center'} my={10}>
                        <Heading size={'md'}>Offer margin</Heading>
                        {/* <Button size={'sm'} variant={'outline'} px={8} onClick={() => setShow((prev) => !prev)}>Advance</Button> */}
                    </Flex>
                </GridItem>
                <GridItem colSpan={3} borderLeft={{ base: 0, lg: '1px solid #dcdcdc' }} borderTop={{ base: '1px solid #dcdcdc', lg: 0 }}>
                    <Flex justifyContent={'center'} alignItems={'center'} gap={5} direction={'column'} px={4} my={10} >

                        <FormControl>
                            <FormLabel>Amount</FormLabel>
                            <InputGroup >
                                <InputLeftAddon bg={'transparent'} >%</InputLeftAddon>

                                <NumberInput borderRadius={0} >
                                    <NumberInputField borderLeftRadius={0} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </InputGroup>
                        </FormControl>


                        <Flex bg={'orange.50'} border={'1px solid orange'} p={2} color={'gray'} gap={2} borderRadius={5}>

                            <AiOutlineExclamationCircle size={30} />You can find out more about our margin limits here
                            Lorem ipsum dolor sit amet.
                        </Flex>
                        <Flex direction={'column'} gap={3} color={''}>
                            <Box>
                                Current Bitcoin market price:<b> 8,038,658.22 INR</b>

                            </Box>
                            <Box>
                                I will get <b>108%</b> of IMPS Transfer value through <b>Cryptico</b> on Last price point.
                                So for every <b>263.00 INR</b>   worth of Bitcoin you sell (your minimum trade limit), you will receive an<b>0.00 INR</b>   in return.
                            </Box>
                        </Flex>

                    </Flex>

                </GridItem>
            </Grid>
        </>
    )
}



const TimeLimit = () => {
    const [isfixedprice, setFixedPrice] = useState(true);

    return (
        <Grid templateColumns={{ base: 'repeat(1,1fr)', lg: 'repeat(5,1fr)' }} border={'1px solid #dcdcdc'} borderLeft={{ base: '1px solid #dcdcdc', lg: 0 }} p={2} >
            <GridItem colSpan={2} p={2}>
                <Flex direction={'column'} gap={5} justify={'center'} alignItems={'center'} my={10}>
                    <Heading size={'md'}>Offer Trades Limit</Heading>
                    <Button size={'sm'} variant={'outline'} px={8} onClick={() => setFixedPrice((prev) => !prev)}>{isfixedprice ? "use range" : "use fixed amount"}</Button>
                </Flex>
            </GridItem>
            <GridItem colSpan={3} borderLeft={{ base: 0, lg: '1px solid #dcdcdc' }} borderTop={{ base: '1px solid #dcdcdc', lg: 0 }}>
                <Flex justifyContent={'center'} alignItems={'center'} gap={5} direction={'column'} px={4} my={10}  >
                    <FormControl>
                        <InputGroup >
                            <InputLeftAddon bg={'transparent'} borderRightRadius={0}>minutes</InputLeftAddon>

                            <NumberInput borderRadius={0} min={30} max={90} >
                                <NumberInputField borderLeftRadius={0} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </InputGroup>
                    </FormControl>


                    <Box >
                        This is how much time your trade partner has to make the payment and click Paid before the trade is automatically canceled.
                    </Box>





                </Flex>

            </GridItem>
        </Grid>
    )
}
export default Pricing