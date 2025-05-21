import React, { useEffect, useRef } from 'react'

import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Divider,
    Avatar,
    useDisclosure,
    AvatarBadge,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Image,
    Input,
    IconButton,

} from '@chakra-ui/react';

import { useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ImStopwatch } from "react-icons/im";
import { BsExclamationCircle } from 'react-icons/bs';
import { OfferTerms, timeAgo } from './BuyOffer';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';
import { BiDislike, BiLike } from 'react-icons/bi';
import ChatComponent from '../ChatSection/ChatComponent';
import { useUser } from '../../Context/userContext';
import ReportBehaviour from '../ChatSection/ReportBehaviour';
import { getDatabase, ref, onDisconnect, set, onValue } from 'firebase/database';
import { getFirestore, doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { AttachmentIcon } from '@chakra-ui/icons';



const TradeStart = () => {
    const navigate = useNavigate();
    const [ispaid, setIsPaid] = useState(false);
    // const { tradeData } = useTradeData();
    const tradeData = JSON.parse(localStorage.getItem('chatUser'));





    return (
        <>
            <Flex maxW={'container.xxl'} justifyContent={'start'} alignItems={'center'} paddingTop={{ base: 0, lg: 20 }} minH={'90vh'} direction={'column'} >
                <Flex
                    maxW={{ base: "100%", lg: '90%', xl: "90%" }}
                    minW={{ base: "100%", sm: '90%', lg: '90%', xl: "none" }}
                    w={'100%'}
                    gap={5}
                    mt={{ base: 0, lg: 0 }}
                    direction={{ base: 'column', lg: 'row' }}
                >


                    {/* left Side start */}
                    <Flex alignSelf={{ base: 'center', lg: 'start' }} mt={{ base: 24, lg: 0 }} flex={{ lg: .8, xl: .8 }} direction={'column'} gap={5} overflowY={'auto'} w={{ base: '95%', lg: '90%' }} >
                        <Card borderRadius={5} gap={5} p={2} >
                            <Flex direction={'column'} py={5} px={2} gap={5}>
                                <Heading size={'lg'}>Trade Started</Heading>
                                <Flex gap={3}>
                                    <ImStopwatch size={40} />
                                    <Flex direction={'column'}>
                                        <Box as='p' fontWeight={500} color={'gray'} fontSize={'18px'}>Please make a paymennt of 1001 INR using PhonePe</Box>
                                        <Box>0.000095854 will be added to you bitcoin wallet</Box>
                                    </Flex>
                                </Flex>
                                <Divider />

                                {
                                    !ispaid ?
                                        <>
                                            <Flex>
                                                <Flex direction={'column'} borderBottomRadius={5} fontWeight={500} gap={5} >

                                                    <Box>
                                                        <b>

                                                            Once you've made the payemnet,&nbsp;
                                                        </b>
                                                        be sure to click paid within the given time limit. Otherwise the trade will be automatically canceled and the Bitcoin will be returned to the seller'se wallet.
                                                    </Box>
                                                    <PaidModal setIsPaid={setIsPaid} />

                                                </Flex>
                                            </Flex>
                                        </>
                                        :
                                        <Flex gap={5}>
                                            <Image boxSize={50} src='/imagelogo/argue.png'></Image>
                                            <Flex direction={'column'} gap={4}>
                                                <Box>
                                                    Click <b>Dispute</b> to report an unresponseive trade partener or any other issue you may have.
                                                </Box>
                                                <Button disabled>Start a Dispute</Button>
                                            </Flex>

                                        </Flex>
                                }
                                <Divider />

                                {
                                    ispaid &&
                                    <>
                                        <ReportBehaviour />
                                        <Divider />
                                    </>
                                }


                                <CompExample />
                                <Divider />
                                <Flex justifyContent={'space-between'} gap={{ base: 4, sm: 0 }} direction={{ base: 'column-reverse', sm: 'row' }} color={'gray.300'}>

                                    <Button boxShadow={'md'} variant={'outline'}>Cancel Trade</Button>
                                    <Flex gap={2}>
                                        <Box mt={1}>

                                            <BsExclamationCircle />
                                        </Box>
                                        <Box fontWeight={500}>  {ispaid ? 'You have paid already' : `You have't paid yet!`}</Box>
                                    </Flex>
                                </Flex>
                            </Flex>

                        </Card>
                        <OfferTerms />

                        <Heading size={'md'}>Trade Information</Heading>
                        <Flex gap={10} mb={5} direction={{ base: 'column', sm: 'row' }} borderTop={'1px solid #dcdcdc'} justifyContent={'space-between'} p={4}>
                            <Flex className='flex1' direction={{ base: 'row', sm: 'column' }} justifyContent={'space-between'}>
                                <Heading size={'sm'} color={'#fe532e'}>Rate</Heading>
                                <Box>455888 inr</Box>

                            </Flex>
                            <Flex className='flex2' justifyContent={'space-between'} direction={{ base: 'row', sm: 'column' }}>
                                <Heading size={'sm'} color={'#fe532e'}>TRADE ID</Heading>
                                <Box>455888 inr</Box>



                            </Flex>
                            <Flex className='flex3' justifyContent={'space-between'} direction={{ base: 'row', sm: 'column' }}>
                                <Heading size={'sm'} color={'#fe532e'}>STARTED</Heading>
                                <Box>455888 inr</Box>



                            </Flex>
                        </Flex>
                        <Flex justifyContent={'space-between'} >
                            <Button variant={'outline'} onClick={() => navigate('/chat')}>View Offer</Button>
                            <Button variant={'outline'}>Take a Tour</Button>
                        </Flex>

                    </Flex>


                    {/* Left Side end */}
                    {/* Right Side nav column */}
                    <RightSideContent tradeData={tradeData} />
                    {/* Right Side nav column end */}


                </Flex>
            </Flex>
        </>

    )
}


export const RightSideContent = ({ tradeData }) => {
    const [index, setIndex] = useState(0);
    const location = useLocation();
    const { user } = useUser();
    const [isOnline, setIsOnline] = useState(false);
    const db = getDatabase();
    const firestore = getFirestore();
    // Realtime DB ref to track online status
    const userStatusDatabaseRef = ref(db, `/status/${user?.user_id}`);

    // Firestore doc for public status
    const userStatusFirestoreRef = doc(firestore, `users/${user?.user_id}`);

    // Define online/offline state
    const isOfflineForDatabase = {
        state: 'offline',
        last_changed: serverTimestamp(),
    };

    const isOnlineForDatabase = {
        state: 'online',
        last_changed: serverTimestamp(),
    };

    const isOfflineForFirestore = {
        online: false,
        lastSeen: serverTimestamp(),
    };

    const isOnlineForFirestore = {
        online: true,
        lastSeen: serverTimestamp(),
    };

    // Monitor connection
    const connectedRef = ref(db, '.info/connected');
    onValue(connectedRef, (snapshot) => {
        if (snapshot.val() === false) return;

        onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
            set(userStatusDatabaseRef, isOnlineForDatabase);
            setDoc(userStatusFirestoreRef, isOnlineForFirestore, { merge: true });
        });
    });

    useEffect(() => {
        const userRef = doc(firestore, 'users', String(tradeData?.user?.user_id));
        const unsubscribe = onSnapshot(userRef, (docSnap) => {
            const data = docSnap.data();
            setIsOnline(data?.online || false);
        });

        return () => unsubscribe();
    }, [tradeData?.user?.user_id]);
    //     if (!user?.user_id) return;

    //     const statusRef = ref(db, `/status/${user.user_id}`);
    //     const unsubscribe = onValue(statusRef, (snapshot) => {
    //         const status = snapshot.val();
    //         if (!status) return;

    //         if (status.state === 'offline') {
    //             setDoc(userStatusFirestoreRef, {
    //                 online: false,
    //                 lastSeen: fsServerTimestamp(),
    //             }, { merge: true });
    //         } else if (status.state === 'online') {
    //             setDoc(userStatusFirestoreRef, {
    //                 online: true,
    //                 lastSeen: fsServerTimestamp(),
    //             }, { merge: true });
    //         }
    //     });

    //     return () => unsubscribe();
    // }, [user?.user_id]);
    useEffect(() => {
        return () => {
            // Component is unmounting (e.g., chat closing)
            setDoc(userStatusFirestoreRef, isOfflineForFirestore, { merge: true });
        };
    }, [user?.user_id]);



    return (
        <Flex flex={{ lg: 1.2, xl: 1.2 }}

            width={'full'}
            gap={{ base: 5, xl: 5 }}
            direction={{ base: 'column', md: 'row', lg: 'row', xl: 'column' }}
            position={'sticky'}
            top={{ base: '102px', lg: '58px' }}  // Adjust based on navbar height if any
            height={{ base: 'auto', lg: "calc(100vh - 60px)" }}
            zIndex={1}
            overflowY={'auto'}
            overflowX={'hidden'}
        >
            <Flex w={'full'} direction={'column'} >
                <Card boxShadow={'lg'}
                    borderRadius={{ base: 5, lg: 5 }}
                    border={'1px solid #dcdcdc'}
                    h='auto'
                    p={{ base: 4, sm: 4, md: 6, xl: 4 }}
                    gap={5}
                    m={{ base: 2, md: 0 }}
                >

                    <Flex justifyContent={'space-between'}>

                        <Flex direction={'column'} gap={5}>
                            <Flex w={'full'} p={4} gap={4} >
                                <Flex alignItems={'center'} gap={2}>

                                    {
                                        tradeData?.user ?
                                            <Avatar border={'1px solid #dcdcdc'} name={tradeData?.user?.name ? tradeData?.user?.name : tradeData?.user?.email} src={tradeData?.user.profile_image} size={'md'}>
                                                <AvatarBadge boxSize='1em' bg={isOnline ? 'green.200' : 'orange.200'} ></AvatarBadge>
                                            </Avatar>
                                            :
                                            <Spinner size={'xl'} />
                                    }


                                </Flex>
                                <Flex direction={'column'}>

                                    <Flex as={Link} href='/profile' alignItems={'center'} gap={2}>{tradeData?.user?.username} <LuSquareArrowOutUpRight /></Flex>
                                    <Flex gap={2} flexWrap={'wrap'} justifyContent={'space-between'}>
                                        {
                                            isOnline ?
                                                <Box fontWeight={500} fontSize={'16px'} color={'green'}>online</Box>
                                                :
                                                <Box color={'gray'}>offline</Box>
                                        }
                                    </Flex>
                                </Flex>
                            </Flex>



                        </Flex>

                        <Flex gap={5}>

                            <Flex gap={2}>
                                <Box mt={1}>
                                    <BiDislike color='red' />
                                </Box>

                                45
                            </Flex>
                            <Flex gap={2}>
                                <Box mt={1}>

                                    <BiLike color='green' />
                                </Box>
                                45
                            </Flex>

                        </Flex>

                    </Flex>
                    <ChatComponent currentUserId={user?.user_id} tradeData={tradeData} />


                </Card>
            </Flex>


        </Flex>
    )
}

function CompExample() {
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true })

    return isVisible ? (
        <Alert status='warning'>
            <Flex >
                <AlertIcon />
                <Flex direction={'column'}>

                    <AlertTitle>Please Read it !</AlertTitle>
                    <AlertDescription>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Iure beatae aliquid sequi fugiat quis modi mollitia non illum eos earum! Obcaecati quia porro earum nulla deleniti,
                        necessitatibus aliquam ut consequuntur!
                    </AlertDescription>
                </Flex>

            </Flex>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    ) : null
}

const PaidModal = ({ setIsPaid }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);
    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            if (selected.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result);
                reader.readAsDataURL(selected);
            } else {
                setPreview(null);
            }
            setCapturedImage(null); // Clear camera image
        }
    };

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };
    return (
        <>
            <Button textAlign={'start'} color={'white'} w={'150px'} bg={'green.400'} p={8} onClick={onOpen}>
                <Flex direction={'column'} >
                    <Box>Paid</Box>
                    <Box>{formatTime(timeLeft)}</Box>
                </Flex>

            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderTopRadius={5} bg={'gray.100'}>Self Confirmation
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box mb={5}>
                            please read the seller's instructions below,
                            if you have followed them all and paid, click "Paid".
                            If you have missed a step or haven't paid click Back to Chat to the seller.
                        </Box>
                        <Flex p={4} bg={'red.50'} gap={3}>
                            <Box color={'red.500'} mt={1}><BsExclamationCircle /></Box>
                            <Box color={'gray'} fontWeight={500}>
                                Clicking Paid without paying the vendor will damage your reputation on the plateform and get you blocked.
                            </Box>
                        </Flex>
                        <Input
                            type="file"
                            display="none"
                            id="chat-file"
                            onChange={handleFileChange}
                        />

                        <label htmlFor="chat-file">
                            <IconButton as="span" icon={<AttachmentIcon />} aria-label="Attach file" />
                        </label>

                    </ModalBody>
                    <ModalFooter justifyContent={'space-between'}>
                        <Button variant={'outline'} onClick={onClose}>Close</Button>
                        <Button variant={'outline'} color={'white'} bg={'green.400'} onClick={() => { setIsPaid(true); onClose(); }}>Paid</Button>

                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}

const cryptoOption = [
    { name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' },
    { name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' },
    { name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040' },
]



export default TradeStart