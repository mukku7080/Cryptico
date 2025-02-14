import { Box, Icon, Button, Collapse, Flex, IconButton, Popover, PopoverContent, Stack, Text, useDisclosure, PopoverTrigger, useColorModeValue, Center, Image, useColorMode, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import { FaArrowTrendUp } from "react-icons/fa6";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { IoMenuOutline, IoCloseOutline, IoBagOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { HiMiniArrowPath } from "react-icons/hi2";
import { LiaHandPointRightSolid } from "react-icons/lia";

import { MdDarkMode, MdOutlineFileDownload, MdKeyboardDoubleArrowDown } from "react-icons/md";
import { BsLightningCharge, BsQrCode } from "react-icons/bs";
import { CiLight, CiWallet } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { SiConvertio } from "react-icons/si";
import { PiChecks } from "react-icons/pi";


import UserAvatar from '../Afterlogin/UserAvatar';
import PaymentDropdown from '../Dropdown/PaymentDropdown';

const Navbarnew = () => {
    // const { user } = useAuth();
    const navigate = useNavigate();
    const navigateTo = () => { navigate("/") }
    const { isOpen, onToggle } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("black", "white");
    const [isdark, setDark] = useState(false);
    const token = localStorage.getItem("authToken");


    return (
        <Box as='nav' bg={'#17181E'} >
            <Flex maxW={'container.xxl'} width={{ md: '100%', lg: '100%' }} padding={'0 18px'} bg={'black'} color={'white'} minH={'48px'} align={'center'} justifyContent={'space-between'} >




                {/* NavSection */}
                <Flex  >
                    <Center mr={{ lg: '5', xl: '10' }} onClick={navigateTo} cursor={'pointer'}>
                        <Image src='/imagelogo/cryptico.png' w={'60px'} h={'50px'} mx={0}></Image>
                        <Text
                            fontSize={'2xl'}
                            mb={1}
                            fontWeight={'600'}
                            sx={{
                                "@media screen and (max-width: 254px)": {
                                    display: 'none'

                                }
                            }}
                        >CRYPTICO</Text>
                    </Center>



                    <Center>

                        <Flex display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }} >
                            <DesktopNav />

                        </Flex>
                    </Center>




                </Flex>

                {/*Login & Logout ButtonSection */}
                <Stack justify={'flex-end'} direction={'row'} spacing={6} display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }} gap={10}>
                    {
                        token ? <UserAvatar /> :
                            <>

                                <Button as={Link} to='/login' padding={'0px 32px'} borderColor={'#ffffff99'} variant={'ghost'} color={'white'} _hover={{ color: 'black', bgColor: '#ffb11a' }}>
                                    Log In
                                </Button>

                                <Button as={Link} to='/signup' padding={'0px 32px'} bgColor={'#ffb11a'} >
                                    Sign Up
                                </Button>
                            </>

                    }
                    <Button onClick={() => {
                        setDark(!isdark)
                        toggleColorMode();
                    }} boxSize={10}
                        bg={'orange'}
                        borderRadius={'full'}>
                        {
                            isdark ? <Icon as={CiLight} boxSize={6} ></Icon> :
                                <Icon as={MdDarkMode} boxSize={6} ></Icon>
                        }
                    </Button>
                    {/* <Button onClick={toggleColorMode}>toogle</Button> */}



                </Stack>
                {/*Login & Logout ButtonSection end */}


                {/* ToggleIcon */}
                <Flex justify={'flex-end'} flex={{ base: 1, md: 'auto' }} display={{ base: 'flex', md: 'flex', lg: 'flex', xl: 'none' }} pr={{ base: '20px', sm: '20px', md: '20px', lg: '0px' }}>

                    <IconButton

                        onClick={onToggle}
                        color={'white'}
                        fontFamily={'heading'}
                        fontSize={'4xl'}
                        icon={isOpen ? <IoCloseOutline /> : <IoMenuOutline />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}

                    />

                </Flex>
                {/* ToggleIcon End */}





            </Flex>


            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}


const DesktopNav = () => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("black", "white");
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (

        <>
            <Stack direction={'row'} spacing={{ lg: '2', xl: '10' }} >
                {
                    NAV_ITEMS.map((navitem) => (
                        <Box key={navitem.label} display={'flex'} justifyContent={'center'} >
                            <Popover trigger='hover' placement='bottom-start'>
                                <PopoverTrigger>
                                    <Box
                                        as={'a'}
                                        href={navitem.href ?? '#'}
                                        fontSize={'sm'}
                                        fontWeight={'medium'}
                                        color={'white'}
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        textDecoration={'underline'}


                                    >
                                        {navitem.label}
                                        <Flex alignItems={'center'} justifyContent={'center'}>

                                            {/* <Icon mt={1} color={'orange'} w={5} h={5} as={MdKeyboardDoubleArrowDown} /> */}
                                        </Flex>
                                    </Box>


                                </PopoverTrigger>
                                {navitem.children && (

                                    <PopoverContent>
                                        <Stack gap={5} borderRadius={0}>


                                            {
                                                navitem.children.map((child) => (

                                                    <DesktopSubNav key={child.label} {...child} />

                                                ))
                                            }
                                        </Stack>

                                    </PopoverContent>

                                )}
                            </Popover>

                        </Box>

                    ))
                }

                <Button size={'sm'} bg={'transparent'} color={'white'} _hover={{bgColor:'transparent'}} onClick={()=>navigate('/createOffers')}>Create an Offer</Button>
                {/* DashboardButton */}
                <Menu isOpen={isMenuOpen} >
                    <MenuButton as={Button} variant="ghost" borderRadius={'none'} p={0} color={'white'} _hover={{ bg: "transparent" }}
                        _focus={{ bg: "transparent", boxShadow: "none" }}
                        _active={{ bg: "transparent" }}
                        size={'sm'}
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={() => setMenuOpen(false)}


                        onClick={() => navigate('/user-dashboard')}
                    >
                        Dashboard
                    </MenuButton>
                    <MenuList borderRadius={0}
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={() => setMenuOpen(false)}

                    >
                        {userOption.map((item, index) => (
                            <MenuItem
                                key={index}
                                icon={item.icon}
                                color={textColor}
                                onClick={() => {
                                    if (item.name == "Log Out") {
                                        Logout();
                                    }
                                    else {
                                        navigate(`${item.to}`);

                                    }
                                }}
                                _hover={{ borderRight: '1px solid orange', bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)' }}>
                                {item.btn_name}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>

            </Stack>
        </>
    )
}


const DesktopSubNav = ({ label, href, logo, subLabel, icon }) => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("black", "white");
    return (
        <Box

            as="a"
            href={href}
            color={textColor}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: 'gray.200' }}>
            <Flex direction={'row'} align={'center'} gap={4}>
                {logo &&

                    <Image boxSize={10} src={logo}></Image>
                }
                {icon &&
                    <Flex >{icon}</Flex>
                }

                <Box >
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'orange' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'orange'} w={5} h={5} as={BiChevronRight} />
                </Flex>
            </Flex>
        </Box>
    )
}



const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ base: 'flex', md: 'flex', lg: 'flex', xl: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}


            <Stack justify={'flex-start'} direction={'row'} spacing={6} mt={5} >
                <Button as={Link} to='/login' padding={'0px 32px'} bgColor={'#ffb11a'} >
                    Log In
                </Button>

                <Button as={Link} to='/signup' padding={'0px 32px'} bgColor={'#ffb11a'} >
                    Sign Up
                </Button>


            </Stack>
        </Stack>
    )
}

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={BiChevronRight}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(90deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>



        </Stack>
    )
}





const NAV_ITEMS = [
    {
        label: 'Buy',
        children: [
            {
                label: 'Buy Bitcoin',
                logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040',
                subLabel: 'Search for offer to buy Bitcoin',
                href: '#',
            },
            {
                label: 'Buy Tether',
                logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040',
                subLabel: 'Search for offer to buy Tether',
                href: '#',
            },
            {
                label: 'Buy Ethereum',
                logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040',
                subLabel: 'Search for offer to buy Ethereum',
                href: '#',
            }, {
                label: 'Buy USDC',
                logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040',
                subLabel: 'Search for offer to buy USDC',
                href: '#',
            },
        ],
    },

    {
        label: 'Sell',
        children: [
            {
                label: 'Sell Bitcoin',
                logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040',
                subLabel: 'Search for offer to buy Bitcoin',
                href: '#',
            },
            {
                label: 'Sell Tether',
                logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040',
                subLabel: 'Search for offer to buy Tether',
                href: '#',
            },
            {
                label: 'Sell Ethereum',
                logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040',
                subLabel: 'Search for offer to buy Ethereum',
                href: '#',
            }, {
                label: 'Sell USDC',
                logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040',
                subLabel: 'Search for offer to buy USDC',
                href: '#',
            },
        ],
    },
    // {
    //     label: 'Create an Offer',
    //     to: 'createOffers'

    // },

    {
        label: 'wallet',
        children: [
            {
                label: 'Balance',
                icon: <CiWallet />,
                subLabel: 'Check you Crypto balacnce in Cryptico',
                href: '#',
            },
            {
                label: 'Lightining',
                icon: <BsLightningCharge />,
                subLabel: 'send and revice BTC with lightining speed and low fee',
                href: '#',
            },
            {
                label: 'Transaction',
                icon: <GrTransaction />,
                subLabel: 'check your account transaction history',
                href: '#',
            }, {
                label: 'Address',
                icon: <BsQrCode />,
                subLabel: 'use you wallet address to recieve crypto',
                href: '#',
            },
            {
                label: 'Convert',
                icon: <SiConvertio />,
                subLabel: 'convert fund from one to another cypto',
                href: '#',
            },
        ],
    },





];

const userOption = [
    {
        icon: <FaArrowTrendUp />,
        btn_name: "Trade History",
        to: 'tradehistory'
    },
    {
        icon: <HiMiniArrowPath />,
        btn_name: "Recent Trade Partners",
        to: 'recentTradePartners'

    },
    {
        icon: <IoBagOutline />,
        btn_name: " My Offers",
        to: 'myOffers'

    },
    {
        icon: <LiaHandPointRightSolid />,
        btn_name: "Favorite Offers",
        to: 'favoriteOffers'

    },
    {
        icon: <MdOutlineFileDownload />,
        btn_name: "Trade Statistics",
        to: 'tradeStatistics'

    },
    {
        icon: <BsLightningCharge />,
        btn_name: "Trader Program Badges",
        to: 'tpBadges'
    },
    {
        icon: <PiChecks />,
        btn_name: "Invite a Friend",
        to: 'iFriend'

    },
]

export default Navbarnew