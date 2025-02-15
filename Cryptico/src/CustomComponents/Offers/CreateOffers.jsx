import {
    Flex,
    Heading,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box,
    Button,
    Image,
    Radio,
    RadioGroup,
    Input,
    InputGroup,
    InputRightElement,
    border, Grid, GridItem, Card
} from '@chakra-ui/react'
import React, { useState } from 'react'
import CurrencyDropdown from '../Dropdown/CurrencyDropdown'
import { MdKeyboardArrowDown } from "react-icons/md";
import PaymentDropdown from '../Dropdown/PaymentDropdown';
import NestedDropdown from '../Dropdown/NestedDropdown';
import OfferLocation from '../Dropdown/OfferLocation';
import { FaPhoneAlt, FaEnvelope, FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import CryptoAccordion, { Mybadge } from '../Accordian/CryptoAccordion';
import { IoEyeOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaTwitter, FaFacebook } from "react-icons/fa";



const CreateOffers = () => {
    const [value, setValue] = React.useState('1')//Radio button
    const [isShow, setShow] = useState(true);



    return (
        <>
            <Flex W={'container.xxl'} justifyContent={'center'} alignItems={'center'} my={10}>


                <Flex
                    minW={{ base: '95%', md: '90%', lg: '80%', xl: '70%' }}
                    maxW={{ base: '95%', md: '90%', lg: '80%', xl: '70%' }}
                >
                    <Flex w={'100%'} direction={{ base: 'column', md: 'row' }} >
                        <Flex width={{ base: '100%', md: '50%' }} direction={'column'} p={{ base: 2, sm: 4, md: 6, lg: 8, xl: 10 }} gap={10}>

                            <Heading size={'md'}>Create an Offer to Sell Bitcoin</Heading>
                            <Steper />
                            <Heading size={'md'}>Choose Your Crypto Currency</Heading>
                            <Flex gap={5} flexWrap={{ base: 'wrap', lg: 'wrap' }}>

                                {cryptoOption.map((data, index) => (

                                    <Flex key={index} border={'1px solid #dcdcdc'}>

                                        <Button leftIcon={<Image boxSize={5} src={data.logo}></Image>} >{data.name}</Button>
                                    </Flex>
                                ))}
                            </Flex>
                            <Heading size={'md'}>What Would You Like to Do ?</Heading>
                            <RadioGroup onChange={setValue} value={value}>
                                <Flex gap={5} direction={'column'}>

                                    <Flex gap={2} >
                                        <Radio size='md' name='1' colorScheme='orange' value='1' >
                                        </Radio>
                                        <Box>Sell BitCoin </Box>
                                        <Box display={'flex'} alignItems={'center'} color={'gray'} fontSize={'12px'}> * Your offer will be listed on the Buy Bitcoin page</Box>

                                    </Flex>
                                    <Flex gap={2} >
                                        <Radio size='md' name='1' colorScheme='orange' value='2' >
                                        </Radio>
                                        <Box>Buy BitCoin </Box>
                                        <Box display={'flex'} alignItems={'center'} color={'gray'} fontSize={'12px'}> * Your offer will be listed on the Sell Bitcoin page</Box>

                                    </Flex>
                                </Flex>

                            </RadioGroup>


                            <Heading size={'md'}>Payment Method</Heading>



                            <Flex direction={''} gap={5} flexWrap={{ base: 'wrap', lg: 'nowrap' }}  >
                                <Flex w={'400px'} direction={'column'} gap={5}>
                                    <Heading size={'sm'}>PAYMENT METHOD</Heading>

                                    <PaymentDropdown />
                                </Flex>

                                {isShow &&

                                    <Flex w={'400px'} direction={'column'} gap={5}>
                                        <Heading size={'sm'}>Prefered Currency</Heading>

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
                                    </Flex>
                                }

                            </Flex>
                            <Flex >

                                <OfferLocation />
                            </Flex>
                        </Flex>
                        <Flex width={{ base: '100%', md: '50%' }}>
                            <Flex w={'full'} direction={'column'} gap={5}
                                sx={
                                    {
                                        "@media screen and (max-width: 350px)": {
                                            maxW: "300px",
                                        },
                                    }

                                }
                            >
                                <Flex h={'100vh'} direction={'column'} gap={5} p={10}>
                                    <Heading size={'md'}>About This Step</Heading>
                                    <Flex> Start creating your offer by selecting the cryptocurrency you want to trade, whether or not you want to buy or sell, and the payment method you want to use.</Flex>
                                    <Flex gap={5} >
                                        <Button variant={'outline'} colorScheme='gray'>Previous Step</Button>
                                        <Button variant={'outline'} colorScheme='orange'>Next Step</Button>
                                    </Flex>
                                </Flex>
                            </Flex>

                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}



const steps = [
    { title: 'Payment Method', description: 'Contact Info' },
    { title: 'Pricing', description: 'Date & Time' },
    { title: 'OterSetting', description: 'Select Rooms' },
]

function Steper() {
    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    return (
        <Stepper index={activeStep}

            orientation='vertical'
        >
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        {/* <StepDescription>{step.description}</StepDescription> */}
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}

const cryptoOption = [
    { name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' },
    { name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' },
    { name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040' },
];
export default CreateOffers