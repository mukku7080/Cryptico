import {
    Box, Button, Card, Divider, Flex, Heading, Image, SlideFade, Switch, Tag, Text, useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BsExclamationCircle, BsEye } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdOutlineLocalOffer } from "react-icons/md";
import { useOffer } from "../../../Context/OfferContext";
import { id } from "ethers/lib/utils";
import { grayGradient } from "../../../Styles/Gradient";

const MyOffers = () => {
    const [status, setStatus] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const { myBuyOffer, mySellOffer, handleGetMyOffer, myOfferAnalytics } = useOffer();
    const [isSellOffer, setSellOffer] = useState(true);
    const queryParams = {
        txn_type: '',
        is_active: '',
        cryptocurrency: '',
        per_page: 10
    };


    const [changeErrors, setChangeErrors] = useState({});
    const { handlechangeActiveStatus } = useOffer()
    const [toggleStatesSell, setToggleStatesSell] = useState({});
    const [toggleStatesBuy, setToggleStatesBuy] = useState({});
    useEffect(() => {
        const activeStatusMapSell = {};
        const activeStatusMapBuy = {};
        mySellOffer?.forEach(item => {
            activeStatusMapSell[item.crypto_ad_id] = item.is_active;
        });
        setToggleStatesSell(activeStatusMapSell);
        myBuyOffer?.forEach(item => {
            activeStatusMapBuy[item.crypto_ad_id] = item.is_active;
        });
        setToggleStatesBuy(activeStatusMapBuy);
    }, [mySellOffer, myBuyOffer]);



    const handleBuySellOfferShow = async (offerType) => {
        if (offerType === 'sell') {
            setSellOffer(true);
            queryParams.txn_type = 'sell'
            await handleGetMyOffer(queryParams);

        }
        else {
            setSellOffer(false);
            queryParams.txn_type = 'buy'
            await handleGetMyOffer(queryParams);
        }

    }
    useEffect(() => {
        handleGetMyOffer(queryParams);
    }, []);

    return (
        <Card w={'full'}>

            <Heading size={'lg'} fontWeight={700} p={4}>Active Trades <Tag size={'lg'} bg={'green.200'}>3</Tag></Heading>
            <Flex direction={'column'} justifyContent={{ base: 'space-between', sm: 'none' }} borderRadius="md" overflow="hidden" w={'full'} gap={{ base: 10, sm: 8 }} p={4}>

                {/* Table Header */}
                <Flex bg="gray.200" p={3} fontWeight="bold" w={'full'} gap={4} direction={{ base: 'column', sm: 'row' }} display={{ base: 'none', md: 'flex' }} border={'1px solid #dcdcdc'} borderTopRadius={5}>
                    <Box flex=".5" textAlign="start">Trade</Box>
                    <Box flex="1.4" textAlign="start">Amount</Box>
                    <Box flex="1.3" textAlign="start">Method</Box>
                    <Box flex="1.3" textAlign="start">Partner</Box>
                    <Box flex="1" textAlign="start" display={{ base: 'none', lg: 'flex' }}>Started</Box>
                    <Box flex="1" textAlign="start" display={{ base: 'none', xl: 'flex' }} >Status</Box>
                    <Box flex=".5" textAlign="start">Others</Box>
                </Flex>
                <Flex w={'full'} direction={'column'} gap={2} display={{ base: 'none', md: 'flex' }}>

                    {/* Table Rows (Example Data) */}
                    {TradeList.map((row, index) => (
                        <Flex key={index} p={3} bg={getStatusColor(row.status)} w={'full'} fontWeight={500} gap={5} direction={{ base: 'column', sm: 'row' }}  >
                            <Box flex=".5" textAlign="start" fontWeight={600}>{row.trade}</Box>
                            <Flex flex="1.4" textAlign="start" direction={'column'} gap={2}>
                                {row.amount}
                                <Flex gap={2} flexWrap={'wrap'}>
                                    <Image boxSize={5} src="https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040"></Image>
                                    <Text fontSize={'sm'} >0.0004562BTC</Text>
                                </Flex>
                            </Flex>
                            <Box flex="1.3" textAlign="start">{row.method}</Box>
                            <Box flex="1.3" textAlign="start" color={'#ad6d29'} >{row.partner}</Box>
                            <Flex direction={'column'} flex={1} display={{ base: 'none', lg: 'flex' }}>

                                <Box flex="1" textAlign="start" color={'gray'}>{row.started}</Box>
                                <Box flex="1" textAlign="start" color={getStatusColorText(row.status)} display={{ base: 'flex', xl: 'none' }} >{row.status}</Box>
                            </Flex>

                            <Box flex="1" textAlign="start" color={getStatusColorText(row.status)} display={{ base: 'none', xl: 'flex' }} >{row.status}</Box>
                            <Box flex=".5" textAlign="start" color="blue.500" cursor="pointer" display={{ base: 'none', lg: 'flex' }} >{row.others}</Box>
                            {/* For small Screen */}
                            <Flex direction={'column'} display={{ base: 'flex', lg: 'none' }} alignItems={'end'}>

                                <Box textAlign="end" color={'gray'} >{row.started}</Box>
                                <Box textAlign="end" color={getStatusColorText(row.status)} display={{ base: 'flex', xl: 'none' }} >{row.status}</Box>
                                <Box textAlign="end" color="blue.500" cursor="pointer" >{row.others}</Box>

                            </Flex>
                        </Flex>
                    ))}
                </Flex>
                {/* <MobileActiveOffer /> */}


                <Flex direction={'column'} gap={3}>

                    <Button variant={'outline'} colorScheme="orange" size={'sm'} w={'150px'} mb={4} onClick={() => setIsActive(!isActive)}>{isActive ? 'Turn off all Offers' : 'Turn on all Offers'}</Button>
                    <Flex direction={'column'} mb={5}>
                        <Flex direction={{ base: 'column', sm: 'row' }}>

                            <Button
                                variant={'outline'}
                                bg={'transparent'}
                                borderTopRadius={5}
                                borderBottomRadius={0}
                                borderBottom={{ base: 'none', md: '1px solid #dcdcdc' }}
                                _hover={{ bg: 'transparent', borderBottom: '1px solid gray' }}
                                onClick={() => handleBuySellOfferShow('sell')}
                                _active={{ borderBottom: '1px solid black' }}
                                rightIcon={<Tag bg={'gray.100'} >{myOfferAnalytics?.totalUserSellAds}</Tag>}
                            >
                                Offers to sell
                            </Button>
                            <Button
                                variant={'outline'}
                                bg={'transparent'}
                                borderTopRadius={5}
                                borderBottomRadius={0}
                                borderBottom={{ base: 'none', md: '1px solid #dcdcdc' }}
                                _hover={{ bg: 'transparent', borderBottom: '1px solid gray' }}
                                onClick={() => handleBuySellOfferShow('buy')}
                                _active={{ borderBottom: '1px solid black' }}
                                rightIcon={<Tag bg={'gray.100'}>{myOfferAnalytics?.totalUserBuyAds}</Tag>}
                            >
                                Offers to buy
                            </Button>
                        </Flex>
                        <Divider display={{ base: 'flex', md: 'none' }} />
                    </Flex>
                    {
                        isSellOffer ?
                            mySellOffer?.length > 0 &&
                            mySellOffer.map((data, index) => (
                                <MobileAllOffers key={data.crypto_ad_id} data={data} isActive={isActive} setIsActive={setIsActive} handlechangeActiveStatus={handlechangeActiveStatus} changeErrors={changeErrors} toggleStatesSell={toggleStatesSell} setToggleStatesSell={setToggleStatesSell} setChangeErrors={setChangeErrors} />
                            ))
                            :
                            myBuyOffer?.length > 0 &&
                            myBuyOffer.map((data, index) => (
                                <MobileAllOffers key={data.crypto_ad_id} data={data} isActive={isActive} setIsActive={setIsActive} handlechangeActiveStatus={handlechangeActiveStatus} changeErrors={changeErrors} toggleStatesBuy={toggleStatesBuy} setToggleStatesBuy={setToggleStatesBuy} setChangeErrors={setChangeErrors} />
                            ))


                    }

                    <Flex direction={'column'}>
                        <AllOffers isActive={isActive} setIsActive={setIsActive} mySellOffer={mySellOffer} myBuyOffer={myBuyOffer} isSellOffer={isSellOffer} />
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
};




// const MobileActiveOffer = () => {
//     return (

//         <Flex direction={'column'} gap={4}>
//             {
//                 TradeList.map((row, index) => (

//                     <Flex direction={'column'} gap={5} bg={getStatusColor(row.status)} p={3} w={'100%'} fontWeight={500} display={{ base: 'flex', md: 'none' }} borderRadius={5}>
//                         <Flex className="a" justifyContent={'space-between'}>
//                             <Flex direction={'column'}>
//                                 <Box color={'#ad6d29'} w={'100px'}>{row.partner}</Box>
//                                 <Box fontSize={'12px'}>{row.started}</Box>

//                             </Flex>
//                             <Flex direction={'column'} alignItems={'end'}>
//                                 <Box color={getStatusColorText(row.status)} textAlign={'end'}>{row.status} funded</Box>
//                                 <Box color={'gray'}>{row.trade}</Box>

//                             </Flex>
//                         </Flex>
//                         <Flex className="b">
//                             <Flex flex="1.4" textAlign="start" direction={'column'} gap={2}>
//                                 {row.amount}
//                                 <Flex gap={2} flexWrap={'wrap'}>
//                                     <Image boxSize={5} src="https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040"></Image>
//                                     <Text fontSize={'sm'} >0.0045687 BTC</Text>
//                                 </Flex>
//                             </Flex>

//                         </Flex>
//                         <Flex className="c" justifyContent={'space-between'} alignItems={'center'}>
//                             <Flex>{row.method}</Flex>
//                             <Button textAlign="start" bg={'transparent'} color="blue.500" rightIcon={<MdKeyboardArrowRight />} >{row.others}</Button>


//                         </Flex>
//                     </Flex>
//                 ))
//             }
//         </Flex>
//     )
// }



const AllOffers = ({ isActive, setIsActive, mySellOffer, myBuyOffer, isSellOffer }) => {

    const toast = useToast();
    const [changeErrors, setChangeErrors] = useState({});
    const { handlechangeActiveStatus } = useOffer()
    const [toggleStatesSell, setToggleStatesSell] = useState({});
    const [toggleStatesBuy, setToggleStatesBuy] = useState({});
    const [isloading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 3000);

    useEffect(() => {
        const activeStatusMapSell = {};
        const activeStatusMapBuy = {};
        mySellOffer?.forEach(item => {
            activeStatusMapSell[item.crypto_ad_id] = item.is_active;
        });
        setToggleStatesSell(activeStatusMapSell);
        myBuyOffer?.forEach(item => {
            activeStatusMapBuy[item.crypto_ad_id] = item.is_active;
        });
        setToggleStatesBuy(activeStatusMapBuy);
    }, [mySellOffer, myBuyOffer]);
    return (
        <Flex direction={'column'} display={{ base: 'none', md: 'flex' }}>
            {/* Heading ---------------------------- */}
            <Flex px={3} py={6} fontWeight="bold" w={'full'} gap={4} direction={{ base: 'column', sm: 'row' }} border={'1px solid #dcdcdc'} borderTopRadius={5}  >
                <Box flex="1" textAlign="start">
                    Highlight offers
                </Box>
                <Box flex="1.2" textAlign={{ lg: 'center', xl: "start" }}>Rate</Box>
                <Box flex="1.2" textAlign="start">Min-Max amount</Box>
                <Box flex="1.2" textAlign="start">Payment method</Box>
                <Box flex=".4" textAlign="start">Offer Views</Box>
            </Flex>
            {/* Data -------------------- */}


            {/* Offert To sell/buy */}
            {
                isloading ?
                    <Heading p={10} alignSelf={'center'} fontSize={'lg'} color={'gray.400'}>Loading...</Heading>
                    :
                    (

                        isSellOffer ?
                            mySellOffer?.length > 0 ?
                                mySellOffer.map((data) => (

                                    <Flex key={data.crypto_ad_id} direction={'column'} border={'1px solid #dcdcdc'} bg={'gray.50'} gap={6} py={6} px={3}>

                                        {/* FirstRow */}
                                        <Flex fontWeight="bold" w={'full'} gap={4} direction={{ base: 'column', sm: 'row' }} >
                                            <Flex flex="1" textAlign="start" direction={'column'} gap={5}>
                                                <Flex gap={5}>
                                                    <Switch
                                                        size={'md'}
                                                        isChecked={toggleStatesSell[data.crypto_ad_id]}

                                                        onChange={async () => {
                                                            // 1. Toggle local state immediately
                                                            setToggleStatesSell(prev => ({
                                                                ...prev,
                                                                [data.crypto_ad_id]: !prev[data.crypto_ad_id]
                                                            }));

                                                            // 2. Send to API
                                                            const request = {
                                                                id: data.crypto_ad_id,
                                                                is_active: !toggleStatesSell[data.crypto_ad_id],
                                                            };

                                                            setIsActive(!toggleStatesSell[data.crypto_ad_id]);
                                                            try {

                                                                await handlechangeActiveStatus(request);
                                                            }
                                                            catch (error) {
                                                                console.log(error);
                                                                toast({
                                                                    title: "Error",
                                                                    description: error?.message,
                                                                    status: "info",
                                                                    duration: 2000,
                                                                    position: 'top-right'

                                                                })
                                                                setChangeErrors(prev => ({
                                                                    ...prev,
                                                                    [data.crypto_ad_id]: error?.errors || "Something went wrong"
                                                                }));
                                                                setToggleStatesSell(prev => ({
                                                                    ...prev,
                                                                    [data.crypto_ad_id]: true
                                                                }));

                                                            }
                                                        }}
                                                        colorScheme="orange"
                                                    />
                                                    <Image boxSize={5} src="https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040"></Image>


                                                </Flex>
                                                <Flex gap={5} >
                                                    <Button size={'sm'}>View</Button>
                                                    <Button size={'sm'}>Edit</Button>

                                                </Flex>

                                            </Flex>

                                            <Flex flex="1.2" textAlign="end" gap={2} flexWrap={'wrap'} >
                                                3,131,718.62<Box fontSize={'10px'} mt={1}>INR</Box>
                                                <Changemargin />
                                            </Flex>
                                            <Flex gap={1} flex="1.2" textAlign="start" flexWrap={'wrap'}>

                                                <Minmaxmodal />

                                            </Flex>
                                            <Flex flex="1.2" textAlign="start" direction={'column'}>


                                                <Box>{JSON.parse(data?.payment_method)?.payment_method}</Box>
                                                <Box color={'gray'} fontSize={'12px'} p={1}>All Payment Accepted</Box>
                                                <Flex gap={2} flexWrap={'wrap'} >
                                                    {
                                                        data?.offer_tags.length > 0 && data?.offer_tags.map((tag, index) => (

                                                            <Box
                                                                p={2}
                                                                key={index}
                                                                fontSize={'12px'}
                                                                fontWeight={500}
                                                                borderRadius={5}
                                                                bg={'gray.200'}
                                                            >{tag}</Box>
                                                        ))
                                                    }

                                                </Flex>
                                            </Flex>
                                            <Flex flex=".4" justifyContent={'end'} gap={2} >1
                                                <Box mt={1} color={'gray'}><BsEye /></Box>
                                            </Flex>
                                        </Flex>


                                        {/* second Row */}
                                        <Flex direction={'column'} gap={2} color={'brown'} pl={3}>
                                            <Flex gap={2}>
                                                <Box mt={1}><BsExclamationCircle /></Box>
                                                <Box>
                                                    We've updated the maximum amount
                                                    for this offer according to your current balance
                                                    , deposit more Bitcoin to raise it
                                                </Box>
                                            </Flex>
                                            <Flex gap={2}>
                                                <Box mt={1}><BsExclamationCircle /></Box>
                                                <Box>
                                                    To make your offer public, make sure you have crypto worth at least 500.00 INR in your wallet.
                                                </Box>
                                            </Flex>

                                        </Flex>
                                        {changeErrors[data.crypto_ad_id] && (
                                            <Heading
                                                key={data.crypto_ad_id}
                                                size="sm"
                                                color={'red'}
                                                fontWeight={500}
                                            >
                                                {changeErrors[data.crypto_ad_id]}
                                            </Heading>
                                        )}
                                    </Flex>
                                ))
                                :
                                <Heading fontSize={'lg'} textAlign={'center'} p={5} color={'gray.500'}>No Active Sell Offers</Heading>
                            :
                            myBuyOffer?.length > 0 ?
                                myBuyOffer.map((data, index) => (

                                    <Flex direction={'column'} key={index} border={'1px solid #dcdcdc'} bg={'gray.50'} gap={6} py={6} px={3}>

                                        {/* FirstRow */}
                                        <Flex fontWeight="bold" w={'full'} gap={4} direction={{ base: 'column', sm: 'row' }} >
                                            <Flex flex="1" textAlign="start" direction={'column'} gap={5}>
                                                <Flex gap={5}>
                                                    <Switch
                                                        size={'md'}
                                                        isChecked={toggleStatesBuy[data.crypto_ad_id]}
                                                        onChange={async () => {
                                                            // 1. Toggle local state immediately
                                                            setToggleStatesBuy(prev => ({
                                                                ...prev,
                                                                [data.crypto_ad_id]: !prev[data.crypto_ad_id]
                                                            }));

                                                            // 2. Send to API
                                                            const request = {
                                                                id: data.crypto_ad_id,
                                                                is_active: !toggleStatesBuy[data.crypto_ad_id],
                                                            };

                                                            setIsActive(!toggleStatesBuy[data.crypto_ad_id]);
                                                            try {

                                                                await handlechangeActiveStatus(request);
                                                            }
                                                            catch (error) {
                                                                toast({
                                                                    title: "Error",
                                                                    description: error?.message,
                                                                    status: "info",
                                                                    duration: 2000,
                                                                    position: 'top-right'

                                                                })
                                                                setChangeErrors(prev => ({
                                                                    ...prev,
                                                                    [data.crypto_ad_id]: error?.errors || "Something went wrong"
                                                                }));
                                                                setToggleStatesBuy(prev => ({
                                                                    ...prev,
                                                                    [data.crypto_ad_id]: true
                                                                }));

                                                            }
                                                        }}
                                                        colorScheme="orange"
                                                    />
                                                    <Image boxSize={5} src="https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040"></Image>


                                                </Flex>
                                                <Flex gap={5} >
                                                    <Button size={'sm'}>View</Button>
                                                    <Button size={'sm'}>Edit</Button>

                                                </Flex>

                                            </Flex>

                                            <Flex flex="1.2" textAlign="end" gap={2} flexWrap={'wrap'} >
                                                3,131,718.62<Box fontSize={'10px'} mt={1}>INR</Box>
                                                <Changemargin />
                                            </Flex>
                                            <Flex gap={1} flex="1.2" textAlign="start" flexWrap={'wrap'}>

                                                <Minmaxmodal />

                                            </Flex>
                                            <Flex flex="1.2" textAlign="start" direction={'column'}>

                                                <Box>{JSON.parse(data?.payment_method)?.payment_method}</Box>
                                                <Box color={'gray'} fontSize={'12px'} my={2}>All Payment Accepted</Box>
                                                <Flex gap={2} flexWrap={'wrap'}>
                                                    {
                                                        data?.offer_tags.length > 0 && data?.offer_tags.map((tag, index) => (

                                                            <Box
                                                                p={2}
                                                                key={index}
                                                                fontSize={'12px'}
                                                                fontWeight={500}
                                                                borderRadius={5}
                                                                bg={'gray.200'}
                                                            >{tag}</Box>
                                                        ))
                                                    }

                                                </Flex>


                                            </Flex>
                                            <Flex flex=".4" justifyContent={'end'} gap={2} >1
                                                <Box mt={1} color={'gray'}><BsEye /></Box>
                                            </Flex>
                                        </Flex>


                                        {/* second Row */}
                                        <Flex direction={'column'} gap={2} color={'brown'} pl={3}>
                                            <Flex gap={2}>
                                                <Box mt={1}><BsExclamationCircle /></Box>
                                                <Box>
                                                    We've updated the maximum amount
                                                    for this offer according to your current balance
                                                    , deposit more Bitcoin to raise it
                                                </Box>
                                            </Flex>
                                            <Flex gap={2}>
                                                <Box mt={1}><BsExclamationCircle /></Box>
                                                <Box>
                                                    To make your offer public, make sure you have crypto worth at least 500.00 INR in your wallet.
                                                </Box>
                                            </Flex>
                                        </Flex>
                                        {changeErrors[data.crypto_ad_id] && (
                                            <Heading
                                                key={data.crypto_ad_id}
                                                size="sm"
                                                color={'red'}
                                                fontWeight={500}
                                            >
                                                {changeErrors[data.crypto_ad_id]}
                                            </Heading>
                                        )}
                                    </Flex>
                                ))
                                :
                                <Heading fontSize={'lg'} textAlign={'center'} p={5} color={'gray.500'}>No Active Buy Offers</Heading>
                    )
            }
        </Flex>
    )
}

const MobileAllOffers = ({ isActive, setIsActive, toggleStatesSell, toggleStatesBuy, changeErrors, handlechangeActiveStatus, data, setToggleStatesBuy, setToggleStatesSell, setChangeErrors }) => {
    const [isShow, setIsShow] = useState(false);
    const toast = useToast();

    const parsedData = JSON.parse(data?.payment_method);




    return (
        <>
            <Flex w={'full'} direction={'column'} gap={5} p={3} border={'1px solid #dcdcdc'} bg={'gray.50'} display={{ base: 'flex', md: 'none' }}>
                <Flex justifyContent={'space-between'} w={'full'}>
                    <Flex direction={'column'}>
                        <Box fontSize={'14px'} fontWeight={500} color={'gray.500'}>{parsedData?.payment_method}</Box>
                        <Box color={'gray'} fontSize={'12px'} >All Payment Accepted</Box>
                    </Flex>
                    <Box>
                        {/* switch sell */}
                        {data.transaction_type === 'sell' &&
                            <Switch
                                size={'md'}
                                isChecked={toggleStatesSell[data.crypto_ad_id]}

                                onChange={async () => {
                                    // 1. Toggle local state immediately
                                    setToggleStatesSell(prev => ({
                                        ...prev,
                                        [data.crypto_ad_id]: !prev[data.crypto_ad_id]
                                    }));

                                    // 2. Send to API
                                    const request = {
                                        id: data.crypto_ad_id,
                                        is_active: !toggleStatesSell[data.crypto_ad_id],
                                    };

                                    setIsActive(!toggleStatesSell[data.crypto_ad_id]);
                                    try {

                                        await handlechangeActiveStatus(request);
                                    }
                                    catch (error) {
                                        console.log(error);
                                        toast({
                                            title: "Error",
                                            description: error?.message,
                                            status: "info",
                                            duration: 2000,
                                            position: 'top-right'

                                        })
                                        setChangeErrors(prev => ({
                                            ...prev,
                                            [data.crypto_ad_id]: error?.errors || "Something went wrong"
                                        }));
                                        setToggleStatesSell(prev => ({
                                            ...prev,
                                            [data.crypto_ad_id]: true
                                        }));

                                    }
                                }}
                                colorScheme="orange"
                            />
                        }
                        {/* switch buy */}
                        {data.transaction_type === 'buy' &&
                            <Switch
                                size={'md'}
                                isChecked={toggleStatesBuy[data.crypto_ad_id]}
                                onChange={async () => {
                                    // 1. Toggle local state immediately
                                    setToggleStatesBuy(prev => ({
                                        ...prev,
                                        [data.crypto_ad_id]: !prev[data.crypto_ad_id]
                                    }));

                                    // 2. Send to API
                                    const request = {
                                        id: data.crypto_ad_id,
                                        is_active: !toggleStatesBuy[data.crypto_ad_id],
                                    };

                                    setIsActive(!toggleStatesBuy[data.crypto_ad_id]);
                                    try {

                                        await handlechangeActiveStatus(request);
                                    }
                                    catch (error) {
                                        toast({
                                            title: "Error",
                                            description: error?.message,
                                            status: "info",
                                            duration: 2000,
                                            position: 'top-right'

                                        })
                                        setChangeErrors(prev => ({
                                            ...prev,
                                            [data.crypto_ad_id]: error?.errors || "Something went wrong"
                                        }));
                                        setToggleStatesBuy(prev => ({
                                            ...prev,
                                            [data.crypto_ad_id]: true
                                        }));

                                    }
                                }}
                                colorScheme="orange"
                            />

                        }
                    </Box>
                </Flex>
                <Flex justifyContent={'space-between'} w={'full'}>
                    <Box fontSize={'12px'} fontWeight={500} color={'gray.500'}>Rate</Box>
                    <Flex gap={1} >
                        3,131,718.62<Box fontSize={'10px'} mt={1}>INR</Box>
                        <Button size={'xs'}>+34%</Button>
                    </Flex>

                </Flex>
                <Flex>
                    <Box flex="1.2" fontSize={'12px'} fontWeight={500} textAlign="start" color={'gray.500'}>Limit</Box>
                    <Flex gap={1} >
                        <Button size={'xs'}>500</Button>
                        <Box>-</Box>
                        <Button size={'xs'}>0</Button>
                        INR
                    </Flex>



                </Flex>
                <Flex justifyContent={'space-between'} w={'full'}>
                    <Box fontSize={'12px'} fontWeight={500} color={'gray.500'}>Views</Box>
                    <Flex flex=".4" justifyContent={'end'} gap={2} >1
                        <Box mt={1} color={'gray'}><BsEye /></Box>
                    </Flex>
                </Flex>
                <Flex justifyContent={'space-between'} w={'full'} alignItems={'center'}>
                    <Image boxSize={5} src="https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040"></Image>
                    <Button size={'sm'} bg={'transparent'} onClick={() => setIsShow((prev) => !prev)} rightIcon={isShow ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}>{isShow ? 'Show less' : 'See more'}</Button>
                </Flex>
                {
                    isShow &&

                    <Flex direction={'column'} gap={4}>
                        <Flex justifyContent={'space-between'} w={'full'} >
                            <Box fontSize={'12px'} fontWeight={500} color={'gray.500'}>Tags:</Box>
                            <Flex justifyContent={'end'} gap={2} flexWrap={'wrap'} >
                                {
                                    data?.offer_tags.length > 0 && data?.offer_tags.map((tag, index) => (

                                        <Box
                                            p={1}
                                            key={index}
                                            fontSize={'12px'}
                                            borderRadius={5}
                                            bg={'gray.200'}
                                        >{tag}</Box>
                                    ))
                                }

                            </Flex>
                        </Flex>
                        <Flex justifyContent={'space-between'} w={'full'}>
                            <Box fontSize={'12px'} fontWeight={500} color={'gray.500'}>Speed:</Box>
                            <Button size={'xs'} bg={'transparent'}>New</Button>
                        </Flex>

                        <Flex direction={'column'} gap={4}>
                            <Button variant={'outline'}>View</Button>
                            <Button variant={'outline'}>Edit</Button>
                        </Flex>
                    </Flex>
                }
                {/* second Row */}
                <Flex direction={'column'} gap={2} color={'brown'} pl={3}>
                    <Flex gap={2}>
                        <Box mt={1}><BsExclamationCircle /></Box>
                        <Box>
                            We've updated the maximum amount
                            for this offer according to your current balance
                            , deposit more Bitcoin to raise it
                        </Box>
                    </Flex>
                    <Flex gap={2}>
                        <Box mt={1}><BsExclamationCircle /></Box>
                        <Box>
                            To make your offer public, make sure you have crypto worth at least 500.00 INR in your wallet.
                        </Box>
                    </Flex>
                </Flex>
                {changeErrors[data.crypto_ad_id] && (
                    <Heading
                        bg={'red.50'}
                        borderRadius={5}
                        p={4}
                        key={data.crypto_ad_id}
                        size="sm"
                        color={'red.500'}
                        fontWeight={500}
                    >
                        {changeErrors[data.crypto_ad_id]}
                    </Heading>
                )}

            </Flex>
        </>
    )
}



// const PercentagePopover = () => {
//     const [percentage, setPercentage] = useState("1%"); // Button Text State
//     const [maxValue, setMaxValue] = useState(""); // Max Input Value
//     const [minValue, setMinValue] = useState(""); // Min Input Value

//     const handleApply = () => {
//         if (maxValue && minValue) {
//             setPercentage(`${minValue}% - ${maxValue}%`);
//         }
//     };

//     return (
//         <>

//             <Popover>
//                 <PopoverTrigger>
//                     <Button>{percentage}</Button> {/* Button displays selected values */}
//                 </PopoverTrigger>

//                 <PopoverContent p={4}>
//                     <PopoverArrow />
//                     <PopoverCloseButton />
//                     <PopoverHeader>Select Percentage Range</PopoverHeader>
//                     <PopoverBody>
//                         <Flex direction="column" gap={3}>
//                             <Input
//                                 placeholder="Max %"
//                                 type="number"
//                                 value={maxValue}
//                                 onChange={(e) => setMaxValue(e.target.value)}
//                             />
//                             <Input
//                                 placeholder="Min %"
//                                 type="number"
//                                 value={minValue}
//                                 onChange={(e) => setMinValue(e.target.value)}
//                             />
//                             <Flex gap={2}>
//                                 <Button onClick={handleApply} colorScheme="blue">
//                                     Apply
//                                 </Button>
//                                 <Button onClick={() => { setMaxValue(""); setMinValue(""); }} variant="outline">
//                                     Close
//                                 </Button>
//                             </Flex>
//                         </Flex>
//                     </PopoverBody>
//                 </PopoverContent>
//             </Popover>
//         </>
//     );
// };




const getStatusColor = (status) => {
    switch (status) {
        case "Active":
            return "green.50";  // Active → Green
        case "Disputed":
            return "red.50";    // Disputed → Red
        case "Pending":
            return "orange.50"; // Pending → Yellow
        default:
            return "gray.50";   // Default Gray
    }
};
const getStatusColorText = (status) => {
    switch (status) {
        case "Active":
            return "green.500";  // Active → Green
        case "Disputed":
            return "red.500";    // Disputed → Red
        case "Pending":
            return "yellow.500"; // Pending → Yellow
        default:
            return "gray.500";   // Default Gray
    }
};


const Minmaxmodal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    return (
        <>
            <Button onClick={onOpen} bg={'transparent'} _hover={{ bg: 'transparent' }} size={'xs'}>
                <Button size={'xs'}>500</Button>
                <Box>&nbsp;-&nbsp;</Box>
                <Button size={'xs'}>0</Button>
                &nbsp; INR

            </Button>



            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'#757576'}>Quick Edit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Box mb={4}>Select the amount you want to trade.</Box>
                            <FormLabel>Minimum</FormLabel>
                            <Input ref={initialRef} defaultValue={261} />
                            <Flex alignItems={'center'} mt={1} gap={3}><AiOutlineExclamationCircle /> Minimum must be at least 259 INR.</Flex>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Maximum</FormLabel>
                            <Input />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant={'outline'} color={'#757576'} onClick={onClose} mr={3}>
                            Close
                        </Button>
                        <Button colorScheme="orange" variant={'outline'} >Apply</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const Changemargin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    return (
        <>
            <Button onClick={onOpen} size={'xs'}>+34%</Button>

            {/* </Button> */}



            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'#757576'}>Change Margin</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >


                        <FormControl>
                            <Input />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant={'outline'} color={'#757576'} onClick={onClose} mr={3}>
                            Close
                        </Button>
                        <Button colorScheme="orange" variant={'outline'} >Apply</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const TradeList = [
    { trade: "Sell", amount: "2541365.35 INR", method: "PayTm Online wallet", partner: "ranchor das chanchah", started: "12 second ago", status: "Pending", others: "View" },
    { trade: "Sell", amount: "2541365.35 INR", method: "Bank Transfer", partner: "ranchor das chanchah", started: "12 second ago", status: "Disputed", others: "View" },
    { trade: "Sell", amount: "2541365.35 INR", method: "Phone Pay", partner: "ranchor das chanchah", started: "12 second ago", status: "Active", others: "View" },
]

const cryptoOption = [
    { shrotName: 'BTC', name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040', pricePerCoin: '1 BTC = 8,448,496.2999 INR', blc: 0, INR: '0.00', table: 'true' },
    { shrotName: 'ETH', name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040', pricePerCoin: '1 ETH = 8,448,496.2999 INR', blc: 0, INR: '0.00' },
    { shrotName: 'USDC', name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040', pricePerCoin: '1 USDC = 8,448,496.2999 INR', blc: 0, INR: '0.00' },
    { shrotName: 'USDT', name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040', pricePerCoin: '1 USDT = 8,448,496.2999 INR', blc: 0, INR: '0.00' },
]
export default MyOffers;
