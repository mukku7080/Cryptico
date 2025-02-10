import { Avatar, AvatarBadge, Badge, Menu, MenuButton, MenuList, MenuItem, Button, Flex, Box, IconButton } from "@chakra-ui/react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useState, useEffect } from "react";
import { FaUser, FaCreditCard, FaCog, FaHistory, FaUsers, FaGift, FaExchangeAlt, FaComments, FaSignOutAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationBell from "./Notificationbell";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";


const UserAvatar = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const Logout = async () => {
        try {
            // const res = axios.delete('http://192.168.29.109:7000/api/logout').then((Response) => {
            //     localStorage.removeItem('authToken');
            //     localStorage.setItem('authToken', null)
            //     navigate('/');
            //     window.location.reload();
            // })

            const res = await handleLogout();
            if (res.status === 'success') {
                localStorage.setItem('authToken', null)
                navigate('/');
                window.location.reload();
            }

        }
        catch (err) {
            console.log("Error:", err.res ? err.res.data : err.message);
        }


    }







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
                            onClick={() => {
                                // navigate(`${item.to}`);
                                if (item.name == "Log Out") {
                                    Logout();
                                }
                            }}
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
    { name: "My Profile", icon: <FaUser />, to: 'profile' },
    { name: "Payment Methods", icon: <FaCreditCard />, to: 'paymentMethod' },
    { name: "Settings", icon: <FaCog />, to: 'settings' },
    { name: "Trade History", icon: <FaHistory />, to: 'tradehistory' },
    { name: "Trade Partners", icon: <FaUsers />, to: 'tradeParters' },
    { name: "Invite a Friend", icon: <FaGift />, to: 'iFriend' },
    { name: "My Transactions", icon: <FaExchangeAlt />, to: 'myTransactions' },
    { name: "Join Cryptico Community", icon: <FaComments />, to: 'cryptoComunity' },
    { name: "Log Out", icon: <FaSignOutAlt />, to: '/' },
];

export default UserAvatar;
