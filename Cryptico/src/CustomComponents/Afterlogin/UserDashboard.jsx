import { Box, Button, Card, Divider, Flex, Grid, GridItem, Heading } from '@chakra-ui/react'
import React from 'react';
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiMiniArrowPath } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { PiChecks } from "react-icons/pi";

const UserDashboard = () => {
    return (
        <Flex maxW={'container.xxl'} bg={''} justifyContent={'center'} alignItems={'center'} direction={'column'} gap={10} my={10}>

            <Flex minW={'container.xl'} bg={''}>
                <Grid templateColumns={'repeat(4,1fr)'} gap={5} width={'full'} >
                    <GridItem bg={'wite'} >
                        <Card h={'150px'} borderRadius={0} bg={'#f7f7f7'} boxShadow={'none'} display={'flex'} justifyContent={'center'}>

                            <Heading size={'md'}> Trade History</Heading>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card h={'150px'} borderRadius={0}>

                            2
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card h={'150px'} borderRadius={0}>

                            3
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card h={'150px'} borderRadius={0}>

                            4
                        </Card>
                    </GridItem>
                </Grid>
            </Flex>


            {/* SecondRow------------------------------------------------------------ */}


            <Flex minW={'container.xl'}>
                <Grid templateColumns={'repeat(4,1fr)'} width={'full'} gap={5}>
                    <GridItem >
                        <Card borderRadius={0} display={'flex'} justifyContent={'center'} >

                            <Flex justifyContent={'center'} alignItems={'center'} m={10}>
                                <Flex direction={'column'} gap={5} borderRight={'1px solid #212121'}>


                                    {
                                        userOption.map((data, index) => (



                                            <Button borderRadius={'none'} border={'0px'} bg={'transparent'} key={index} p={7} justifyContent="flex-start" _hover={{ bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)', borderRight: '1px solid black' }} >
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
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Card borderRadius={0} h={'60vh'}>

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, voluptas?
                        </Card>
                    </GridItem>
                </Grid>
            </Flex>
        </Flex>
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

export default UserDashboard