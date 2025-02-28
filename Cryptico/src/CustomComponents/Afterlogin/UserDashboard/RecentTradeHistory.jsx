import { Card, Flex, Box, Heading, Avatar, AvatarBadge, Grid, GridItem, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import React from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import RecentTradePartnerAccordian from '../../Accordian/RecentTradePartnerAccordian';
import PaginatedList from '../../Pagination/Pagination';
const now = new Date();

const RecentTradeHistory = () => {
    return (
        <>

            {/* for large Screen */}
            <Card borderRadius={5} p={10} gap={4} boxShadow={'lg'} display={{ base: 'none', md: 'flex' }}>

                <Grid templateColumns={'repeat(3,1fr)'} mb={3}>
                    <GridItem >
                        <Flex>
                            <Flex flex={1}>

                            </Flex>
                            <Flex flex={2}>

                                <Heading size={'sm'} > User Name</Heading>
                            </Flex>
                        </Flex>

                    </GridItem>
                    <GridItem>
                        <Heading size={'sm'}> Result</Heading>

                    </GridItem>
                    <GridItem>
                        <Heading size={'sm'} > Trede Date</Heading>

                    </GridItem>
                </Grid>

                {user.map((data, index) => (

                    <>

                        <Grid key={index} templateColumns={'repeat(3,1fr)'} my={2} >
                            <GridItem>
                                <Flex>

                                    <Flex flex={1}>

                                        <Avatar size={'sm'} name={data.user_name} >
                                            <AvatarBadge boxSize='1.25em' bg='green.500' />
                                        </Avatar>
                                    </Flex>
                                    <Flex flex={2} justifyContent={'start'} >

                                        <Box display={'flex'} alignItems={'center'}>{data.user_name}</Box>
                                    </Flex>
                                </Flex>

                            </GridItem>
                            <GridItem display={'flex'} alignItems={'center'}>
                                {
                                    data.status ?

                                        <Flex gap={2} alignItems={'center'} color={'#6B8E23'}>
                                            <Box display={'flex'} alignItems='center'>
                                                <IoMdCheckmark />
                                            </Box>
                                            <Box  >Successfull</Box>
                                        </Flex>
                                        :
                                        <Flex gap={2} alignItems={'center'} color={'#B76E79'}>
                                            <Box display={'flex'} alignItems='center'>
                                                <MdOutlineCancel />
                                            </Box>
                                            <Box  >Cancel</Box>
                                        </Flex>

                                }

                            </GridItem>
                            <GridItem>
                                <Flex gap={2}>
                                    <Box>{now.toUTCString()}</Box>
                                    <Box display={'flex'} alignItems='center'>


                                        <Menu>
                                            <MenuButton  >
                                                <CiMenuKebab />

                                            </MenuButton>
                                            <MenuList borderRadius={0}>
                                                <MenuItem>Add To Trusted List</MenuItem>
                                                <MenuItem> Add To Blocked List</MenuItem>
                                                <MenuItem>View This Trade</MenuItem>
                                            </MenuList>
                                        </Menu>


                                    </Box>
                                </Flex>

                            </GridItem>
                        </Grid>
                    </>
                ))}


                {/* pagination componente */}

                <PaginatedList />

            </Card>

            {/* for large Screen End */}


            {/* for small screen */}
            <Card borderRadius={5} p={{ base: 5, sm: 10 }} gap={4} boxShadow={'lg'} display={{ base: 'flex', md: 'none' }}>
                {
                    user.map((data, index) => (

                        <>

                            <RecentTradePartnerAccordian key={index} user={data} />
                        </>
                    ))
                }
                {/* <PaginatedList /> */}
            </Card>
            {/* for small screen End */}

        </>
    )
}

const user = [
    { user_name: "Mukesh rai", profile_url: '', status: true, date: now.toUTCString() },
    { user_name: "Risabh singh", profile_url: '', status: false, date: now.toUTCString() },
    { user_name: "Rohit Gaund", profile_url: '', status: false, date: now.toUTCString() },
    { user_name: "Tamanna Bhati", profile_url: '', status: true, date: now.toUTCString() },
    { user_name: "Kalin Bhaiya", profile_url: '', status: true, date: now.toUTCString() },
]

export default RecentTradeHistory