import React, { useState } from "react";
import { IconButton, Box, Badge } from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useOtherDetail } from "../../Context/otherContext";


const NotificationBell = () => {
    const [notification, setNotifications] = useState(3);
    const { notifications } = useOtherDetail();
    // console.log(notifications?.analytics?.totalNotifications);
    // console.log(notifications?.analytics.totalUnreadNotification);
    // const count = notifications?.analytics?.totalNotifications;
    // console.log(notifications?.analytics?.totalNotifications)
    // setNotifications();

    const handleNotificationClick = () => {
        alert("You have new notifications!");
        setNotifications(0); // Reset notifications when clicked
    };

    return (
        <Box position="relative" display="inline-block">
            <IconButton
                icon={<IoMdNotificationsOutline />}
                onClick={handleNotificationClick}
                aria-label="Notifications"
                size="sm"
                _hover={{ bg: "gray.200" }}
            />
            {notifications?.analytics.totalNotifications > 0 && (
                <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    borderRadius="full"
                    bg="red.500"
                    color="white"
                    px={2}
                    fontSize="0.8em"
                >
                    {notifications?.analytics.totalNotifications}
                </Badge>
            )}
        </Box>
    );
};

export default NotificationBell;
