import { Avatar, AvatarBadge, Badge, Menu, MenuButton, MenuList, MenuItem, Button, Flex, Box, IconButton } from "@chakra-ui/react";
import { useAuth } from "../AuthContext/AuthProvider";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useState, useEffect } from "react";
import { FaUser, FaCreditCard, FaCog, FaHistory, FaUsers, FaGift, FaExchangeAlt, FaComments, FaSignOutAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationBell from "./Notificationbell";


const UserAvatar = () => {
    const { user } = useAuth();
    console.log(user)






    return (
        <Flex justifyContent={'center'} alignItems={'center'} gap={3}>
            <Box as="span" fontSize={'10px'}> Mukesh rai <br />5000.00 INR</Box>

            <Menu >
                <MenuButton as={Button} variant="ghost" borderRadius={'none'} p={0} rightIcon={<MdKeyboardArrowDown color="orange" />} _hover={{ bg: "transparent" }}
                    _focus={{ bg: "transparent", boxShadow: "none" }}
                    _active={{ bg: "transparent" }}
                >
                    <Avatar name="Mukesh rai" size="sm" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnnM0ib-pYCZg4DbbB_T5_mfxpqrDHYXFLy208bjvHjIM5q1FF4lzLvNFp2qZ5Eo11orA&usqp=CAU" >
                    </Avatar>
                </MenuButton>
                <MenuList borderRadius={0}>
                    {menuItems.map((item, index) => (
                        <MenuItem
                            key={index}
                            icon={item.icon}
                            color={'gray.500'}
                            _hover={{ borderRight: '1px solid orange', bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)' }}>
                            {item.name}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>


            <NotificationBell />


        </Flex>
    );
};


const menuItems = [
    { name: "My Profile", icon: <FaUser /> },
    { name: "Payment Methods", icon: <FaCreditCard /> },
    { name: "Settings", icon: <FaCog /> },
    { name: "Trade History", icon: <FaHistory /> },
    { name: "Trade Partners", icon: <FaUsers /> },
    { name: "Invite a Friend", icon: <FaGift /> },
    { name: "My Transactions", icon: <FaExchangeAlt /> },
    { name: "Join Cryptico Community", icon: <FaComments /> },
    { name: "Log Out", icon: <FaSignOutAlt /> },
];

export default UserAvatar;
