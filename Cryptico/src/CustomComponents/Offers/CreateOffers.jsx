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
    useBreakpointValue,
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
import { MyPaymentModal } from '../Dropdown/PaymentModal/MyPaymentModal';
import Pricing from './Pricing';
import OtherSettings from './OtherSettings';



const CreateOffers = () => {
    const [page, setPage] = useState(0);
    const pages = [<PaymentSection />, <Pricing />, <OtherSettings />];

    const nextPage = () => {
        if (page < pages.length - 1) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };




    return (
        <>
            <Flex W={'container.xxl'} justifyContent={'center'} alignItems={'center'} marginTop={'54px'}>


                <Flex
                    maxW={{ base: "90%", lg: '90%', xl: "90%" }}
                    minW={{ base: "90%", sm: '90%', lg: '90%', xl: "90%" }}
                    mt={{ base: 20, lg: 10 }}

                >
                    <Flex w={'100%'} direction={{ base: 'column', lg: 'row' }} >
                        <Flex borderRight={{ base: 0, lg: '1px solid #dcdcdc' }} flex={1.2} width={{ base: '100%', lg: '50%' }} direction={'column'} p={{ base: 2, sm: 4, md: 6, lg: 8, xl: 10 }} gap={10}  >

                            <Heading size={'lg'}>Create an Offer to Sell Bitcoin</Heading>
                            <Steper step={page} />


                            {pages[page]}


                        </Flex>


                        {/* Right side Section start */}
                        <Flex flex={.8} width={{ base: '100%', lg: '50%' }} my={{ base: 10, sm: 0 }}>
                            <Flex w={'full'} direction={'column'} gap={5}
                                sx={
                                    {
                                        "@media screen and (max-width: 350px)": {
                                            maxW: "300px",
                                        },
                                    }

                                }
                            >
                                <Flex direction={'column'} gap={5} py={{ base: 2, sm: 10 }} px={{ base: 4, lg: 10 }}>
                                    <Heading size={'md'}>About This Step</Heading>
                                    <Flex> Start creating your offer by selecting the cryptocurrency you want to trade, whether or not you want to buy or sell, and the payment method you want to use.</Flex>
                                    <Flex gap={5} >
                                        <Button variant={'outline'} _hover={{bg:'orange.50'}} border={'1px solid #dcdcdc'} onClick={prevPage} disabled={page === 0}>Previous Step</Button>
                                        {
                                            (page === pages.length - 1) ?

                                                <Button variant={'outline'} colorScheme='orange'  >Create Offers</Button>
                                                :
                                                <Button variant={'outline'} colorScheme='orange' onClick={nextPage} >Next Step</Button>
                                        }
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

function Steper({ step }) {
    // const { activeStep } = useSteps({
    //     index: step,
    //     count: steps.length,
    // })

    const orientation = useBreakpointValue({ base: "vertical", xl: "horizontal" });

    return (
        <Stepper size={'sm'} orientation={orientation} index={step}


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
                        <StepTitle fontSize={'22px'}>{step.title}</StepTitle>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}



const PaymentSection = () => {
    const [value, setValue] = React.useState('1')//Radio button
    const [isShow, setShow] = useState(true);
    return (

        <Flex direction={'column'} gap={10}>
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
                    <MyPaymentModal />

                </Flex>

                {isShow &&

                    <Flex w={'400px'} direction={'column'} gap={5}>
                        <Heading size={'sm'}>Prefered Currency</Heading>

                        <Flex justifyContent={'space-between'} alignItems={'center'} border={'1px solid #dcdcdc'} >
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
    )
}
const cryptoOption = [
    { name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' },
    { name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' },
    { name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040' },
];
export default CreateOffers