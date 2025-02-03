import { Box, Icon, Button, Collapse, Flex, IconButton, Popover, PopoverContent, Stack, Text, useDisclosure, PopoverTrigger, useColorModeValue, Center, Image, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const Navbarnew = () => {

    const navigate = useNavigate();


    const navigateTo = () => {
        navigate("/")
    }

    const { isOpen, onToggle } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("black", "white");

    const [isdark, setDark] = useState(false);


    return (
        <Box as='nav' bg={'#17181E'} >
            <Flex maxW={'container.xxl'} width={{ md: '100%', lg: '100%' }} padding={'0 18px'} bg={'black'} color={'white'} minH={'48px'} align={'center'} justifyContent={'space-between'} >




                {/* NavSection */}
                <Flex  >
                    <Center mr={{ lg: '5', xl: '10' }} onClick={navigateTo} cursor={'pointer'}>
                        <Image src='imagelogo/cryptico.png' w={'60px'} h={'50px'} mx={0}></Image>
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

                        <Flex display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
                            <DesktopNav />

                        </Flex>
                    </Center>




                </Flex>

                {/* ButtonSection */}
                <Stack justify={'flex-end'} direction={'row'} spacing={6} display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
                    <Button as={Link} to='/login' padding={'0px 32px'} borderColor={'#ffffff99'} variant={'ghost'} color={'white'} _hover={{ color: 'black', bgColor: '#ffb11a' }}>
                        Log In
                    </Button>

                    <Button as={Link} to='/signup' padding={'0px 32px'} bgColor={'#ffb11a'} >
                        Sign Up
                    </Button>
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




            </Flex>


            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}


const DesktopNav = () => {
    return (

        <>
            <Stack direction={'row'} spacing={{ lg: '2', xl: '10' }}>
                {
                    NAV_ITEMS.map((navitem) => (
                        <Box key={navitem.label}>
                            <Popover trigger='hover' placement='bottom-start'>
                                <PopoverTrigger>
                                    <Box
                                        as={'a'}
                                        href={navitem.href ?? '#'}
                                        fontSize={'sm'}
                                        fontWeight={'medium'}
                                        color={'white'}

                                    >
                                        {navitem.label}
                                    </Box>
                                </PopoverTrigger>
                                {navitem.children && (

                                    <PopoverContent>
                                        <Stack>


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

            </Stack>
        </>
    )
}


const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Box
            as="a"
            href={href}
            color={'black'}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{}}>
            <Stack direction={'row'} align={'center'}>

                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: '#c8f051' }}
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
                    <Icon color={'#c8f051'} w={5} h={5} as={BiChevronRight} />
                </Flex>
            </Stack>
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
                <Button as={'a'} href='#' variant={'outline'} borderRadius={'32px'} bg={'black'} color={'white'} _hover={{ color: 'black', bgColor: 'white' }}>
                    Sign In
                </Button>

                <Button as={'a'} href='#' bgColor={'#c8f051'} borderRadius={'32px'}>
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
        label: 'Buy Crypto',
        children: [
            {
                label: 'Buy',
                subLabel: 'Trending Design to inspire you',
                href: '#',
            },
            {
                label: 'Sell',
                subLabel: 'Up-and-coming Designers',
                href: '#',
            },
        ],
    },
    {
        label: 'Market',
        href: '#',
    },
    {
        label: 'Trade',
        children: [
            {
                label: 'About',
                subLabel: 'know every thing about us',
                href: '#',
            },
            {
                label: 'Carrers',
                subLabel: 'crypto is future',
                href: '#',
            },
        ],
    },

    {
        label: 'Tools',
        children: [
            {
                label: 'About',
                subLabel: 'know every thing about us',
                href: '#',
            },
            {
                label: 'Carrers',
                subLabel: 'crypto is future',
                href: '#',
            },
        ],
    },
    {
        label: 'Finance',
        children: [
            {
                label: 'About',
                subLabel: 'know every thing about us',
                href: '#',
            },
            {
                label: 'Carrers',
                subLabel: 'crypto is future',
                href: '#',
            },
        ],
    },
    {
        label: 'Reward',
        children: [
            {
                label: 'About',
                subLabel: 'know every thing about us',
                href: '#',
            },
            {
                label: 'Carrers',
                subLabel: 'crypto is future',
                href: '#',
            },
        ],
    },
    {
        label: 'Learn',
        children: [
            {
                label: 'About',
                subLabel: 'know every thing about us',
                href: '#',
            },
            {
                label: 'Carrers',
                subLabel: 'crypto is future',
                href: '#',
            },
        ],
    },
    {
        label: 'Reward Hub',
        href: '#',
    },
    {
        label: 'More',
        children: [
            {
                label: 'About',
                subLabel: 'know every thing about us',
                href: '#',
            },
            {
                label: 'Carrers',
                subLabel: 'crypto is future',
                href: '#',
            },
        ],
    },


];

export default Navbarnew