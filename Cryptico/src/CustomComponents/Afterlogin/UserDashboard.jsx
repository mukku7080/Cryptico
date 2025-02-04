import {
    Box, Button, ButtonGroup, Card, Collapse, Divider, Flex, Grid, GridItem, Heading, IconButton, useDisclosure, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Icon,
    Image, Link
} from '@chakra-ui/react'
import React, { useState } from 'react';
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiMiniArrowPath } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { MdOutlineFileDownload, MdKeyboardArrowRight, MdKeyboardArrowDown, MdOutlineContentCopy } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { PiChecks } from "react-icons/pi";
import { IoMenuOutline, IoCloseOutline, IoColorFilter } from "react-icons/io5";
import UserDrware from '../Drwares/UserDrware';
import { LuUpload } from "react-icons/lu";



const UserDashboard = () => {


    const [tag, setTag] = useState("Trade History");
    const [istoogle, setToogle] = useState(false);

    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isOpen1, onToggle: onToggle1 } = useDisclosure();


    return (
        <Flex maxW={'container.xxl'} bg={''} justifyContent={'center'} alignItems={'center'} direction={'column'} gap={10} my={10}>

            <Flex minW={'90%'} bg={''} direction={'column'} gap={10} mx={5}>




                {/* First Grid Row---------------------------------------------------------------------- */}
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }} gap={5} width={'full'} transition="all 0.5s ease-in-out" >
                    <GridItem bg={'wite'} colSpan={{ base: 3, md: 3, lg: 3, xl: 1 }} >
                        <Card h={{ md: '50px', lg: '50px', xl: '150px' }} borderRadius={0} bg={'transparent'} boxShadow={'none'} direction={'row'} display={'flex'} justifyContent={'start'}>

                            <Heading size={'md'} display={'flex'} alignItems={'center'} > {tag}</Heading>
                            <Flex justify={'flex-end'} flex={{ base: 1, md: 'auto' }} display={{ base: 'flex', md: 'flex', lg: 'flex', xl: 'none' }} pr={{ base: '20px', sm: '20px', md: '20px', lg: '0px' }} >

                                <Button
                                    rightIcon={istoogle ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                                    onClick={() => {
                                        setToogle(!istoogle);
                                        onToggle();
                                    }}
                                    display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
                                    aria-label={'Toggle Action'}
                                colorScheme='orange'
                                    
                                >
                                    Action
                                </Button>

                                <IconButton

                                    onClick={onToggle1}
                                    color={'black'}
                                    fontFamily={'heading'}
                                    fontSize={'4xl'}
                                    icon={isOpen1 ? <IoCloseOutline /> : <IoMenuOutline />}
                                    variant={'ghost'}
                                    aria-label={'Toggle Navigation'}

                                />

                            </Flex>
                        </Card>
                    </GridItem>


                    <GridItem display={{ base: 'none', md: 'block' }}>
                        <Card h={'150px'} borderRadius={0} display={{ base: 'none', md: 'flex' }} direction={'column'} justifyContent={'center'} alignItems={'center'} boxShadow={'lg'}>

                            <Box>
                                Account Level : 1
                            </Box>
                            <Box>
                                Account Limit: 87022.8
                            </Box>
                        </Card>
                    </GridItem>
                    <GridItem display={{ base: 'none', md: 'block' }}>
                        <Card h={'150px'} borderRadius={0} display={{ base: 'none', md: 'flex' }} direction={'column'} justifyContent={'center'} alignItems={'center'} boxShadow={'lg'}>

                            <Flex gap={5}>
                                <Box>
                                <Image src='imagelogo/phoneverify.png' h={'50px' } w={'50px'}/>
                                </Box>
                                <Flex direction={'column'}>
                                    <Box color={'red'}>

                                        Phone Number Not Verified
                                    </Box>
                                    <Box>
                                        Take a minute to verify your number
                                    </Box>
                                    <Link color={'orange'}>verify</Link>
                                </Flex>
                            </Flex>
                        </Card>
                    </GridItem>
                    <GridItem display={{ base: 'none', md: 'block' }}>
                        <Card h={'150px'} borderRadius={0} display={{ base: 'none', md: 'flex' }} direction={'column'} justifyContent={'center'} alignItems={'center'} boxShadow={'lg'}>

                        <Flex gap={5} mx={5}>
                                <Box>
                                <Image src='imagelogo/eaglesecure.png' h={'50px' } w={'50px'}/>
                                </Box>
                                <Flex direction={'column'}>
                                    <Box color={'red'}>

                                    2FA Not Enabled
                                    </Box>
                                    <Box maxW={'300px'}>
                                    Enabling two-factor authentication is great way to secure your account.
                                    </Box>
                                    <Link color={'orange'}>Setup 2FA Now</Link>
                                </Flex>
                            </Flex>
                        </Card>
                    </GridItem>

                </Grid>
                <Collapse in={isOpen} animateOpacity>
                    <Mobilecollapse1 />
                </Collapse>

                <Collapse in={isOpen1} animateOpacity>
                    <Mobilecollapse2 />
                </Collapse>
                {/* First Grid Row  End---------------------------------------------------------------------- */}



                {/* Second Grid Row---------------------------------------------------------------------- */}

                <Grid templateColumns={'repeat(4,1fr)'} width={'full'} gap={5}>

                    {/* Left Side Nav ------------------------------------------------------------------------- */}
                    <GridItem >
                        <Card borderRadius={0} display={{ base: 'none', sm: 'none', md: 'none', lg: 'flex' }} justifyContent={'center'} boxShadow={'lg'}>

                            <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} my={5} mx={5}>
                                <Flex direction={'column'} gap={5} borderRight={'1px solid rgba(128, 128, 128, 0.3)'}>


                                    {
                                        userOption.map((data, index) => (



                                            <Button
                                                borderRadius={'none'}
                                                border={'0px'} bg={'transparent'}
                                                key={index} p={7}
                                                justifyContent="flex-start"
                                                _hover={{
                                                    bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                                    borderRight: '1px solid black'
                                                }}
                                                onClick={() => setTag(data.btn_name)}

                                            >
                                                <Flex align="center" gap={2}>
                                                    {data.icon}
                                                    <span>{data.btn_name}</span>
                                                </Flex>
                                            </Button>


                                        ))
                                    }



                                </Flex>
                                <Divider />


                                <Flex direction={'column'} gap={0}  >


                                    {
                                        userOption1.map((data, index) => (



                                            <Button
                                                borderRadius={'none'}
                                                border={'0px'} bg={'transparent'}
                                                key={index} p={7}
                                                justifyContent="flex-start"
                                                _hover={{
                                                    bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                                    borderRight: '1px solid black'
                                                }}
                                                onClick={() => setTag(data.btn_name)}

                                            >
                                                <Flex align="center" gap={2}>
                                                    {data.icon}
                                                    <span>{data.btn_name}</span>
                                                </Flex>
                                            </Button>


                                        ))
                                    }
                                    <Button mt={3} colorScheme='orange'>Do You have any idea for us?</Button>



                                </Flex>


                            </Flex>


                        </Card>
                    </GridItem>
                    {/* Left Side Nav End ------------------------------------------------------------------------- */}
                    {/* Right Side Content ------------------------------------------------------------------------- */}

                    <GridItem colSpan={{ base: 4, sm: 4, md: 4, lg: 3 }}>
                        <Card borderRadius={0} p={10} gap={4} boxShadow={'lg'}>
                            <Box>You are viewing all trades for the last 3 days</Box>
                            <Flex border={'1px solid rgba(128, 128, 128, 0.3)'} p={1} justifyContent={'space-between'} bgColor={'#f7f7f7'} boxShadow={'lg'} borderRadius={'5px'}>
                                <Box fontWeight={500} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    Filter
                                </Box>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <UserDrware />
                                </Box>
                            </Flex>
                            <Flex border={'1px solid rgba(128, 128, 128, 0.3)'} p={1} justifyContent={'space-between'} bgColor={'#f7f7f7'} boxShadow={'lg'} borderRadius={'5px'}>
                                <Box fontWeight={500} display={'flex'} alignItems={'center'} justifyContent={'center'} color={'gray'}>
                                    Export Trades
                                </Box>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <Button colorScheme='orange'>

                                        <LuUpload />
                                    </Button>
                                </Box>
                            </Flex>

                            <Flex border={'1px solid rgba(128, 128, 128, 0.3)'} p={3} justifyContent={'space-between'} bgColor={'#f7f7f7'} boxShadow={'lg'} borderRadius={'5px'}>
                                <Box fontWeight={500} display={'flex'} alignItems={'center'} justifyContent={'center'} color={'gray'}>
                                    Completed Trades:
                                    0% (trades out of 0)
                                </Box>

                            </Flex>
                            <Flex direction={'column'} border={'1px solid rgba(128, 128, 128, 0.3)'} >

                                <Flex justifyContent={'space-between'} minH={'105px'} bg={'#f7f7f7'} borderBottom={'1px solid rgba(128, 128, 128, 0.3)'} px={2}>
                                    <Flex fontWeight={500} alignItems={'center'} justifyContent={'center'} color={'gray'}>
                                        My Past Trades
                                    </Flex>
                                    <Flex alignItems={'center'} justifyContent={'center'} gap={2}>
                                        <Button colorScheme='orange' rightIcon={<MdOutlineFileDownload />}>

                                            Export Trades

                                        </Button>
                                        <Button colorScheme='orange' rightIcon={<MdOutlineContentCopy />}>

                                            Copy Details

                                        </Button>
                                    </Flex>
                                </Flex>
                                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} p={20}>
                                    <Image src='imagelogo/cryptico.png' maxH={'200px'} maxW={'200px'} ></Image>
                                    <Box as='p' color={'gray'}>
                                        You haven't traded yet.
                                    </Box>
                                    <Link color={'orange'}> ! Start Trading Now ! </Link>
                                </Box>

                            </Flex>


                        </Card>
                    </GridItem>
                    {/* Right Side Content End------------------------------------------------------------------------- */}

                </Grid>
            </Flex>

            {/* <Flex minW={'70%'}>

            </Flex> */}
        </Flex>
    )
}


const Mobilecollapse1 = () => {

    return (

        <>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={1} width={'full'} transition="all 0.5s ease-in-out"   >

                <GridItem>
                    <Card display={{ base: 'flex', sm: 'flex', md: 'none', lg: 'none' }} h={'100px'} borderRadius={0}>

                        2
                    </Card>
                </GridItem>
                <GridItem>
                    <Card display={{ base: 'flex', sm: 'flex', md: 'none', lg: 'none' }} h={'100px'} borderRadius={0}>

                        3
                    </Card>
                </GridItem>
                <GridItem>
                    <Card display={{ base: 'flex', sm: 'flex', md: 'none', lg: 'none' }} h={'100px'} borderRadius={0}>

                        4
                    </Card>
                </GridItem>
            </Grid>
        </>
    )



}
const Mobilecollapse2 = () => {

    return (

        <>

            <Card borderRadius={0} display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} justifyContent={'center'} width={'full'}>

                <Flex justifyContent={'center'} alignItems={'center'} m={10}>
                    <Flex direction={'column'} gap={5} borderRight={'1px solid #212121'}>


                        {
                            userOption.map((data, index) => (





                                <Button

                                    borderRadius={'none'}
                                    border={'0px'} bg={'transparent'}
                                    key={index} p={7}
                                    justifyContent="flex-start"
                                    _hover={{
                                        bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                        borderRight: '1px solid black'
                                    }}
                                    onClick={() => setTag(data.btn_name)}

                                >
                                    <Flex align="center" gap={2}>
                                        {data.icon}
                                        <span>{data.btn_name}</span>
                                    </Flex>
                                </Button>


                            ))
                        }


                    </Flex>


                </Flex>


            </Card>
        </>
    )



}



const userOption = [
    {
        icon: <FaArrowTrendUp />,
        btn_name: "Trade History"
    },
    {
        icon: <HiMiniArrowPath />,
        btn_name: "Recent Trade Partners"
    },
    {
        icon: <IoBagOutline />,
        btn_name: " My Offers"
    },
    {
        icon: <LiaHandPointRightSolid />,
        btn_name: "Favorite Offers"
    },
    {
        icon: <MdOutlineFileDownload />,
        btn_name: "Trade Statistics"
    },
    {
        icon: <BsLightningCharge />,
        btn_name: "Trader Program Badges"
    },
    {
        icon: <PiChecks />,
        btn_name: "Invite a Friend"
    },
]

const userOption1 = [
    {
        icon: <FaArrowTrendUp />,
        btn_name: "Account Setting"
    },
    {
        icon: <HiMiniArrowPath />,
        btn_name: "Criptico Community "
    },
    {
        icon: <IoBagOutline />,
        btn_name: " Developer"
    }


]

export default UserDashboard