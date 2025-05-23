import {
    Avatar, AvatarBadge, Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, InputGroup, InputRightAddon, Link,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Divider,
    ButtonGroup,
    Tag,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    Textarea,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiFillExclamationCircle, AiOutlineExclamationCircle, AiOutlineQuestion, AiOutlineQuestionCircle } from 'react-icons/ai'
import { BiDislike, BiLike } from 'react-icons/bi'
import { LuSquareArrowOutUpRight } from 'react-icons/lu'
import { MdCheck, MdStar, MdStarOutline } from 'react-icons/md'
import { useOffer } from '../../Context/OfferContext'
import { useUser } from '../../Context/userContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { color } from 'framer-motion'
import { useTradeData } from '../DataContext/TradeDataContext'
import { useTradeProvider } from '../../Context/TradeContext'
import { useOtherDetail } from '../../Context/otherContext'

const BuyOffer = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUser();
    const { setTradeData } = useTradeData();
    const { handleTradeInitiate } = useTradeProvider();
    const { priceRef } = useOtherDetail();
    const data = location.state?.data;
    const [assetValue, setAssetValue] = useState();
    setTradeData(data);
    useEffect(() => {
        localStorage.setItem('chatUser', JSON.stringify(data));
    }, [data])
    const [amount, setAmount] = useState(data?.min_trade_limit);


    useEffect(() => {
        const assetPriceInINR = priceRef.current?.[data?.cryptocurrency === 'binance' ? 'binancecoin' : data?.cryptocurrency]?.inr;
        convertINRToAsset(amount, assetPriceInINR);
    }, [assetValue, amount]);
    function convertINRToAsset(amount, assetPriceInINR) {
        if (!amount || !assetPriceInINR || assetPriceInINR === 0) {
            setAssetValue(0);
            return;
        }
        const assetAmount = amount / assetPriceInINR;
        setAssetValue(parseFloat(assetAmount.toFixed(8)));
    }


    const initiateDto = {
        ad_id: data?.crypto_ad_id,
        amount: amount,
        currency: 'inr',
        assetValue: assetValue,
        trade_type: 'buy',
    }
    console.log("data", data);
    const handleBuy = () => {
        handleTradeInitiate(initiateDto);
        navigate('/tradeStart');

    };



    return (
        <>
            {
                (user?.user_id === data?.user?.user_id) ?
                    <>
                        <Alert
                            status='warning'
                            variant='subtle'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                            height='500px'
                            mt={55}
                        >
                            <AlertIcon boxSize='40px' mr={0} />
                            <AlertTitle mt={4} mb={1} fontSize='xl'>
                                Oops Sorry !
                            </AlertTitle>
                            <AlertDescription maxWidth='sm' fontWeight={500}>
                                You can not trade with yourself
                            </AlertDescription>
                        </Alert>
                    </>
                    :

                    <Flex className='main' mt={20} direction={'column'} alignItems={'center'} gap={10} minH={'92vh'} alignSelf={'center'}
                        maxW={{ base: "90%", lg: '90%', xl: "65%" }}
                        minW={{ base: "90%", sm: '90%', lg: '90%', xl: "65%" }}
                    >
                        {/* <Flex position={'relative'} top={70} w={'80%'} alignSelf={'center'}><Heading color={'white'} textAlign={'center'}>Sell Bitcoin with IMPS Transfer (INR) — Safe payment and own Acc</Heading> </Flex> */}

                        <Flex className='sub-main'
                            direction={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            border={'1px solid #ffedd5'}
                            borderRadius={4}
                            bg={'white'}
                            w={'full'}
                            mt={10}
                            boxShadow={'lg'}
                        //   position={'relative'}
                        //    top={100}
                        >


                            <Flex direction={'column'} gap={10} w={'full'} p={5}   >
                                <Box fontWeight={700} fontSize={'24px'} alignSelf={'center'}>How much do you want to Buy</Box>
                                <form>
                                    <Flex gap={5} direction={{ base: 'column', lg: 'row' }}>

                                        <FormControl>
                                            <FormLabel>I will pay</FormLabel>
                                            <InputGroup border={'1px solid #ffedd5'} borderRadius={4} _hover={{ boxShadow: 'md' }}>

                                                <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} border={'none'} focusBorderColor='#ffedd5' _focus={{ boxShadow: 'none' }} _hover={{ border: 'none' }} />
                                                <InputRightAddon bg={'white'} color={'orange.500'} border={'none'} fontWeight={500}>INR</InputRightAddon>

                                            </InputGroup>
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>and recive</FormLabel>
                                            <InputGroup border={'1px solid #ffedd5'} borderRadius={4} _hover={{ boxShadow: 'md' }}>

                                                <Input type="number" placeholder="Enter amount" value={assetValue  ?? ""} border={'none'} focusBorderColor='#ffedd5' _focus={{ boxShadow: 'none' }} _hover={{ border: 'none' }} />
                                                <InputRightAddon bg={'white'} color={'orange.500'} border={'none'} fontWeight={500}>{AssetNameMap[data.cryptocurrency]}</InputRightAddon>

                                            </InputGroup>
                                        </FormControl>
                                    </Flex>
                                    <Flex gap={4} alignItems={'center'} my={5}>
                                        <AiOutlineExclamationCircle />
                                        <Box>you get <b>1452.00</b> worth of Bitcoin</Box>
                                    </Flex>
                                    <Button borderRadius={4} w={'full'} bg={'orange.300'} _hover={{ bg: 'orange.100' }} onClick={handleBuy}>Buy Now</Button>
                                </form>

                                <Flex alignSelf={'center'} flexWrap={'wrap'}>
                                    Reserve Bitcoin for this trade and start live chat with &nbsp;
                                    <Link textDecoration={'underline'} color={'orange.300'}>{data?.user?.username}</Link>
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex className='second-section'
                            direction={'column'}
                            w={'full'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        // mt={10}
                        >


                            <Flex gap={10} w={'full'} direction={{ base: 'column', lg: 'row' }}   >
                                <Flex flex={1}>
                                    <AboutOffer data={data} />

                                </Flex>
                                <Flex flex={1}>
                                    <AboutSeller data={data} />

                                </Flex>
                            </Flex>
                        </Flex>
                        <OfferTerms />
                        <Feedback />
                        <Problem />
                    </Flex>
            }


        </>
    )
}



const AboutOffer = ({ data }) => {
    return (
        <>
            <Flex direction={'column'} gap={4} w={'full'}>
                <Heading size={'md'}>
                    About this offer
                </Heading>
                <Flex border={'1px solid #ffedd5'} boxShadow={'lg'} direction={'column'} bg={'white'} borderRadius={4} >
                    <Flex direction={'column'} w={'full'} p={4} >
                        <Flex alignItems={'center'} gap={2} color={'#757576'} >

                            Seller rate
                            <MdStarOutline />
                        </Flex>
                        <Box fontSize={'18px'} fontWeight={700}>8,078,400.587 INR <Box as='span' color={'gray'}>•12% above market</Box> </Box>
                    </Flex>

                    <Flex direction={'column'} w={'full'} bg={'orange.50'} p={4}>
                        <Flex alignItems={'center'} gap={2} color={'#757576'}>

                            Buy limits
                            <MdStarOutline />
                        </Flex>
                        <Box fontSize={'18px'} fontWeight={700}><Box as='span' color={'gray'}>Min</Box> {data?.min_trade_limit}- <Box as='span' color={'gray'}>Max</Box> {data?.max_trade_limit}</Box>
                    </Flex>

                    <Flex>

                        <Flex direction={'column'} p={4} >
                            <Flex alignItems={'center'} gap={2} color={'#757576'}>

                                Trade time limit
                                <AiOutlineQuestionCircle />
                            </Flex>
                            <Box fontSize={'18px'} fontWeight={700}>{data?.offer_time_limit} min</Box>
                        </Flex>
                        <Flex direction={'column'} p={4} >
                            <Flex alignItems={'center'} gap={2} color={'#757576'}>

                                Cryptico fee
                                <AiOutlineQuestionCircle />
                            </Flex>
                            <Box fontSize={'18px'} fontWeight={700}>{data?.offer_margin}</Box>
                        </Flex>

                    </Flex>


                </Flex>
            </Flex>
        </>
    )
}



const AboutSeller = ({ data }) => {
    return (
        <>
            <Flex direction={'column'} gap={4} w={'full'}>
                <Heading size={'md'}>
                    About this seller
                </Heading>
                <Flex border={'1px solid #ffedd5'} boxShadow={'lg'} direction={'column'} bg={'white'} borderRadius={4}>
                    <Flex w={'full'} p={4} gap={4} >
                        <Flex alignItems={'center'} gap={2}>

                            {
                                data?.user ?
                                    <Avatar border={'1px solid #dcdcdc'} name={data?.user?.name ? data?.user?.name : data?.user?.email} src={data?.user.profile_image} size={'md'}>
                                        <AvatarBadge boxSize='1em' bg={data?.user?.login_status === 'login' ? 'green.200' : 'orange.200'} ></AvatarBadge>
                                    </Avatar>
                                    :
                                    <Spinner size={'xl'} />
                            }


                        </Flex>
                        <Flex direction={'column'}>

                            <Flex as={Link} href='/profile' alignItems={'center'} gap={2}>{data?.user?.username} <LuSquareArrowOutUpRight /></Flex>
                            <Flex gap={2} flexWrap={'wrap'} justifyContent={'space-between'}>
                                {
                                    data?.user?.login_status === 'login' ?
                                        <Box fontWeight={500} fontSize={'16px'} color={'green'}>{data?.user?.last_seen_at}</Box>
                                        :
                                        <Box color={'gray'}>{timeAgo(data?.user?.last_login)}</Box>
                                }
                                <Box px={2} bg={'orange.300'} w={'60px'} borderRadius={5} fontSize={'14px'}>badge</Box>
                            </Flex>
                        </Flex>
                    </Flex>


                    <Flex bg={'orange.50'}>

                        <Flex direction={'column'} p={4} >
                            <Heading size={'sm'} fontWeight={400} color={'#757576'}>Negative Feedback</Heading>
                            <Flex alignItems={'center'} gap={2}>

                                <BiDislike color='red' />
                                45
                            </Flex>
                        </Flex>
                        <Flex direction={'column'} p={4} >
                            <Heading fontWeight={400} size={'sm'} color={'#757576'}>Negative Feedback</Heading>
                            <Flex alignItems={'center'} gap={2}>
                                <BiLike color='green' />
                                45
                            </Flex>
                        </Flex>

                    </Flex>


                    <Flex>

                        <Flex direction={'column'} p={4} >
                            <Flex alignItems={'center'} fontWeight={500} gap={1} color={data?.user?.id_verified ? 'green.500' : 'red.500'}><MdCheck /> ID Verified</Flex>
                            <Flex alignItems={'center'} fontWeight={500} gap={1} color={data?.user?.email_verified ? 'green.500' : 'red.500'}> <MdCheck />Email Verified</Flex>
                        </Flex>
                        <Flex direction={'column'} p={4} >
                            <Flex alignItems={'center'} fontWeight={500} gap={1} color={data?.user?.address_verified_at ? 'green' : 'red.500'}><MdCheck /> Address Verified</Flex>
                            <Flex alignItems={'center'} fontWeight={500} gap={1} color={data?.user?.number_verified_at ? 'green.500' : 'red.500'}> <MdCheck />Phone Verified</Flex>

                        </Flex>

                    </Flex>

                    <Flex direction={'column'} w={'full'} bg={'orange.50'} p={4}>
                        <Flex alignItems={'center'} gap={2} color={'#757576'}>

                            Average trade speed
                            <AiOutlineQuestionCircle />
                        </Flex>
                        <Box fontSize={'18px'} fontWeight={700}>2 min </Box>
                    </Flex>

                </Flex>
            </Flex>
        </>
    )
}


const Feedback = () => {
    const [showAll, setShowAll] = useState(false);
    const visibleTrades = showAll ? trades : trades.slice(0, 4);
    return (
        <>
            <Accordion allowToggle w={'full'} alignSelf={'center'} border={'1px solid #ffedd5'} boxShadow={'md'} defaultIndex={0} >
                <AccordionItem border={'none'}>
                    <h2>
                        <AccordionButton p={5} bg={'white'} _hover={{ bg: 'white' }}>
                            <Box as='span' flex='1' textAlign='left' fontWeight={700} fontSize={'20px'}>
                                Feedback on this offer
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel bg={'white'}
                    >
                        <ButtonGroup display={'flex'} justifyContent={'end'} w={'full'}>
                            <Button size={'sm'} borderRadius={0} bg={'transparent'} gap={2} fontSize={'12px'} _hover={{ bg: 'transparent', boxShadow: 'md' }}>All<Tag bg={'orange.300'}>2</Tag></Button>
                            <Button size={'sm'} borderRadius={0} bg={'transparent'} gap={2} fontSize={'12px'} _hover={{ bg: 'transparent', boxShadow: 'md' }}>Positive<Tag bg={'orange.300'}>2</Tag></Button>
                            <Button size={'sm'} borderRadius={0} bg={'transparent'} gap={2} fontSize={'12px'} _hover={{ bg: 'transparent', boxShadow: 'md' }}>Negative<Tag bg={'orange.300'}> 0</Tag></Button>
                        </ButtonGroup>
                        <Divider />
                        {
                            visibleTrades.map((data, index) => (
                                <>
                                    <Flex key={index} gap={{ base: 5, sm: 20 }} p={4} borderBottom={'1px solid #eef1f6'} bg={index % 2 === 0 ? 'white' : 'orange.50'} _hover={{ boxShadow: 'lg', mb: '20px', transition: "all 0.3s ease-in-out" }} direction={{ base: 'column', sm: 'row' }}>
                                        <Flex justifyContent={'space-between'}>
                                            <Flex gap={4}>

                                                <Flex alignItems={'start'} gap={2}  >

                                                    <Avatar name={data.userName}>
                                                        <AvatarBadge boxSize='1em' bg='green.500' ></AvatarBadge>
                                                    </Avatar>
                                                </Flex>
                                                <Flex direction={'column'}>

                                                    <Flex minW={'150px'}>{data.userName} </Flex>
                                                    <Flex gap={2} direction={'column'} fontSize={'12px'}>
                                                        {new Date().toLocaleString()}
                                                        <Flex p={1} bg={'#dff9dc'} borderRadius={5} w={'100px'} fontSize={'14px'} gap={2} alignItems={'center'} display={{ base: 'none', sm: 'flex' }}><BiLike color='green' />{data.sentiment}</Flex>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                            <Box display={{ base: 'flex', sm: 'none' }} color={'green.500'}>

                                                <BiLike />
                                            </Box>
                                        </Flex>
                                        <Flex w={'full'}>
                                            <Flex direction={{ base: 'row', sm: 'column' }} justify={{ base: 'space-between', sm: 'start' }} w={'full'} gap={1} >
                                                <Flex gap={2}><Box fontWeight={500}>{data.platform}</Box> <Box as='span' px={2} pt={.5} bg={'gray.100'} borderRadius={5} fontSize={'12px'}>{data.currency}</Box></Flex>
                                                <Box color={'#757576'} >{data.comment}</Box>
                                            </Flex>
                                        </Flex>

                                    </Flex>
                                </>
                            ))
                        }


                        <Flex w={'full'} alignItems={'center'} justifyContent={'center'} mt={5}>
                            {trades.length > 4 &&
                                <Button bg={'transparent'} _hover={{ bg: 'transparent', boxShadow: 'lg' }} onClick={() => setShowAll(!showAll)}>{showAll ? "Show less" : "Show more "}</Button>
                            }

                        </Flex>

                    </AccordionPanel>
                </AccordionItem>


            </Accordion>
        </>
    )
}



export const OfferTerms = () => {
    return (
        <>
            <Flex direction={'column'} w={'full'} gap={5}>
                <Heading size={'md'} fontWeight={700}>Offer Terms</Heading>

                <Flex border={'1px solid #ffedd5'} boxShadow={'lg'} p={4} direction={'column'} w={'full'} alignSelf={'center'} mb={10} gap={5} bg={'white'} borderRadius={4}>

                    {
                        tradeRules.map((data, index) => (

                            <Flex gap={2} fontSize={'16px'}><Tag bg={'orange.300'} boxSize={5}>{index}</Tag>{data}</Flex>
                        ))
                    }
                    <Box fontSize={'16px'}>🚫 if any suspicious thing i can ask to cancel the trade anytime....🚫</Box>

                </Flex>
            </Flex>
        </>
    )
}



const Problem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <>




            <>
                <Button onClick={onOpen} colorScheme='red' variant={'outline'}>Report a problem</Button>


                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Report a problem</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>type</FormLabel>
                                {/* <Input ref={initialRef} placeholder='First name' /> */}
                                <Select placeholder='Select the exact problem' >
                                    <option value='option1'>Outside escrow</option>
                                    <option value='option2'>Bad offer term</option>
                                    <option value='option3'>Obivious scam</option>
                                    <option value='option3'>Negotiation</option>
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea>

                                </Textarea>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose} colorScheme='blue' mr={3}>
                                Close
                            </Button>
                            <Button bg={'orange.300'} _hover={{ bg: 'orange.300' }}>Report</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>


        </>
    )
}




// convert time to time ago
export function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString?.replace(' ', 'T')); // ensures correct parsing
    const seconds = Math.floor((now - past) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }
    return "just now";
}



const trades = [
    {
        userName: "Mukesh rai",
        dateTime: "3/18/2025, 2:56:55 PM",
        sentiment: "Positive",
        platform: "Bhim",
        currency: "USD",
        comment: "Good Trade"
    },
    {
        userName: "Arya Thakur",
        dateTime: "3/18/2025, 2:56:55 PM",
        sentiment: "Positive",
        platform: "paytm",
        currency: "INR",
        comment: "Trusted and fast"
    },
    {
        userName: "Chandresh",
        dateTime: "3/18/2025, 2:56:55 PM",
        sentiment: "Positive",
        platform: "paytm",
        currency: "INR",
        comment: "Trusted and fast"
    },
    {
        userName: "ting tong",
        dateTime: "3/18/2025, 2:56:55 PM",
        sentiment: "Positive",
        platform: "paytm",
        currency: "INR",
        comment: "Trusted and fast"
    },
    {
        userName: "ping pong",
        dateTime: "3/18/2025, 2:56:55 PM",
        sentiment: "Positive",
        platform: "paytm",
        currency: "INR",
        comment: "Trusted and fast"
    },
    {
        userName: "ding dong",
        dateTime: "3/18/2025, 2:56:55 PM",
        sentiment: "Positive",
        platform: "paytm",
        currency: "INR",
        comment: "Trusted and fast"
    },
];

const tradeRules = [
    "Buyer needs to share a photo ID (selfie may be required).",
    "Mobile number verification is required first; after that, details will be shared.",
    "No third-party payments are accepted.",
    "Payment screenshot is also needed."
];
export const AssetNameMap = {
    bitcoin: 'BTC',
    ethereum: 'ETH',
    binance: 'BNB',
    tether: 'USDT'
}
export default BuyOffer