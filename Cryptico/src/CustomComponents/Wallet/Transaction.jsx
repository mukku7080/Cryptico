import { Box, Button, Card, Divider, Flex, Heading, Image, Circle, Modal, ModalContent, ModalFooter, useDisclosure, ModalHeader, Link, ModalCloseButton, ModalBody, Tooltip } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
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
import { useAccount } from '../../Context/AccountContext';
import { MdContentCopy } from 'react-icons/md';

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

                <Button variant={'outline'} w={'200px'}> veiw all transactions</Button>

            </Flex>

        </Flex>
    )
}

const LatestTransactions = () => {
    const { transaction } = useAccount();
    const [isloading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [copiedTrasactionId, setCopiedTransactionId] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    })
    const handleClick = (transaction) => {
        console.log(transaction);
        setSelectedTransaction(transaction);
        onOpen();
    };
    const handleCopyAddress = (item) => {
        console.log(item);
        navigator.clipboard.writeText(item).then(() => {
            setCopiedAddress(true);
            setTimeout(() => {
                setCopiedAddress(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleCopyTransaction = (item) => {
        navigator.clipboard.writeText(item).then(() => {
            setCopiedTransactionId(true);
            setTimeout(() => {
                setCopiedTransactionId(false);
            }, 2000);
        }).catch((err) => {
            console.log(err)
        })
    }


    const arr = [1, 2]

    return (
        <>
            <Flex w={'100%'} p={4} direction={'column'} gap={10}>
                <Heading size={'md'}> Finished Transactions</Heading>
                <Card w={'full'}>
                    {

                        isloading ? <Heading size={'sm'} color={'gray'} alignSelf={'center'} p={10}>
                            Loading...
                        </Heading> :
                            transaction?.data?.length > 0 ?

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
                                        transaction?.data?.length > 0 && transaction?.data.map((item, index) => (

                                            <Flex w={'full'} key={item.txn_id} onClick={() => handleClick(item)} cursor={'pointer'} p={{ base: 3, sm: 4 }} borderBottom={'1px solid #dcdcdc'} borderTop={'1px solid #dcdcdc'}>
                                                <Flex flex={1.4} gap={10}>
                                                    <Flex flex={.8}>
                                                        <Flex gap={5}>
                                                            <Box pt={1}> <Circle bg={'orange'} p={2}><BsBoxArrowInDownRight /></Circle></Box>
                                                            <Flex direction={'column'}>
                                                                <Box>{item.method === 'receive' ? "received" : 'Send'}</Box>

                                                                <Box fontSize={'12px'}>{new Date(Number(item.date_time) * 1000).toLocaleString('en-GB')}</Box>
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                    <Flex display={{ base: 'none', md: 'Flex' }} direction={'column'} flex={1.2} gap={2}>
                                                        <Box maxW={'250px'}>

                                                            {
                                                                item.method === "receive" ? `receive from ${item.from_address}` : `send to ${item.from_address}`
                                                            }
                                                        </Box>
                                                        <Flex display={{ base: 'flex', lg: 'none' }}>

                                                            <Button variant={'outline'} size={'sm'} colorScheme={item.status === 'success' ? 'green' : 'red'}>{item.status}</Button>

                                                        </Flex>

                                                    </Flex>
                                                </Flex>
                                                <Flex flex={.6} >
                                                    <Flex justifyContent={{ base: 'end', lg: 'space-between' }} w={'full'} gap={10}>

                                                        <Flex display={{ base: 'none', lg: 'Flex' }}>
                                                            <Button variant={'outline'} size={'sm'} colorScheme={item.status === 'success' ? 'green' : 'red'}>{item.status}</Button>
                                                        </Flex>
                                                        <Flex>
                                                            <Flex direction={'column'} textAlign={'end'}  >
                                                                <Box alignItems={'end'}  >{`${item.paid_amount} ${item.asset}`}</Box>
                                                            </Flex>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        ))
                                    }
                                    {
                                        selectedTransaction &&

                                        <Modal key={selectedTransaction.txn_id} isOpen={isOpen} onClose={onClose} isCentered size={'lg'} >
                                            <ModalContent>
                                                <ModalHeader bg={'gray.50'} borderTopRadius={5}>
                                                    Transaction Details
                                                    <ModalCloseButton onClick={onClose} />
                                                </ModalHeader>
                                                <ModalBody bg={'transparent'}>
                                                    <Flex direction={'column'} gap={7} mt={5}>
                                                        <Flex direction={'column'} gap={4}>

                                                            <Flex gap={2} direction={'column'} alignSelf={'center'}>
                                                                <Circle bg={'orange'} p={5}>
                                                                    {
                                                                        selectedTransaction.method === 'receive' ? <BsBoxArrowInDownRight size={20} /> : <BsBoxArrowInUpRight size={20} />
                                                                    }
                                                                </Circle>
                                                                <Flex direction={'column'}>
                                                                    <Box fontWeight={500} >{selectedTransaction.method === 'receive' ? "Received" : 'Send'}</Box>

                                                                </Flex>
                                                            </Flex>
                                                            <Heading alignSelf={'center'} color={'green.400'}>{`+${selectedTransaction.credit_amount}  ${selectedTransaction.asset.toUpperCase()}`}</Heading>
                                                            <Flex alignselectedTransactions={'center'} justifyContent={'center'} p={2} fontSize={'12px'} color={'gray.500'} fontWeight={500}>
                                                                {`send to ${selectedTransaction.to_address}`}
                                                            </Flex>
                                                        </Flex>

                                                        <Divider />



                                                        <Flex justifyContent={'space-between'}>
                                                            <Box fontWeight={500}>Time :</Box>
                                                            <Box>{new Date(Number(selectedTransaction.date_time) * 1000).toLocaleString('en-GB')}</Box>

                                                        </Flex>
                                                        <Flex justifyContent={'space-between'}>
                                                            <Box fontWeight={500}>Status :</Box>
                                                            <Box borderRadius={5} p={1} bg={'gray.50'} border={'1px solid #dcdcdc'}>{selectedTransaction.status}</Box>
                                                        </Flex>
                                                        <Flex justifyContent={'space-between'}>
                                                            <Box fontWeight={500}>Fee :</Box>
                                                            <Box>{selectedTransaction.transfer_fee}</Box>
                                                        </Flex>
                                                        <Flex justifyContent={'space-between'}>
                                                            <Box fontWeight={500}>Transaction link :</Box>
                                                            <Flex gap={1} as={Link} _hover={{ textDecoration: 'underline' }} color={'orange.400'} >
                                                                View in Blockchain
                                                                <Box mt={1} color={'orange.400'}>
                                                                    <BsBoxArrowInUpRight />
                                                                </Box>
                                                            </Flex>
                                                        </Flex>
                                                        <Flex justifyContent={'space-between'} direction={'column'} gap={2}>
                                                            <Box fontWeight={500}>Address :</Box>
                                                            <Flex borderRadius={5} border={'1px solid #dcdcdc'} direction={'column'} bg={'gray.50'} p={2} gap={2}>
                                                                <Box w={'full'}>

                                                                    {selectedTransaction.to_address}
                                                                </Box>
                                                                <Tooltip label={copiedAddress ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} >
                                                                    <Box alignSelf={'end'} mt={1} cursor={'pointer'} onClick={() => handleCopyAddress(selectedTransaction.to_address)}>

                                                                        <MdContentCopy />

                                                                    </Box>
                                                                </Tooltip>

                                                            </Flex>
                                                        </Flex>

                                                        <Flex justifyContent={'space-between'} direction={'column'} gap={2}>
                                                            <Box fontWeight={500}>Transaction hash ID :</Box>
                                                            <Flex borderRadius={5} bg={'gray.50'} direction={'column'} border={'1px solid #dcdcdc'} p={2} gap={2} >
                                                                <Box as='span' w={'full'}>

                                                                    <Box as='span'>
                                                                        {selectedTransaction.txn_hash_id}

                                                                    </Box>
                                                                </Box>
                                                                <Tooltip label={copiedTrasactionId ? "Copied!" : "Copy to clipboard"} bg={'gray.100'} color={'black'} closeDelay={500} >
                                                                    <Box alignSelf={'end'} mt={1} onClick={() => handleCopyTransaction(selectedTransaction.txn_hash_id)}>

                                                                        <MdContentCopy />
                                                                    </Box>
                                                                </Tooltip>
                                                            </Flex>
                                                        </Flex>

                                                    </Flex>


                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button className='btn btn-primary' onClick={onClose}>Close</Button>


                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    }
                                    {/* Data Part End */}

                                </Flex>
                                :
                                <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} gap={2} mt={50} mb={5} p={4}>
                                    <Image opacity={0.6} boxSize={10} src='/imagelogo/HugeiconsExchange03.png'></Image>
                                    <Heading size={'sm'} color={'gray.300'}>No Transaction Found</Heading>
                                </Flex>
                    }

                </Card>
            </Flex>
        </>
    )
}








export default Transaction