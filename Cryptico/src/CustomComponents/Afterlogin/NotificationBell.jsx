import React, { useState } from "react";
import { IconButton, Box, Badge, Modal, ModalBody, ModalContent, ModalOverlay, ModalFooter, Flex, useDisclosure, ModalHeader, ModalCloseButton, Button } from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useOtherDetail } from "../../Context/otherContext";


const NotificationBell = () => {
    // const [notification, setNotifications] = useState(3);
    const { notifications } = useOtherDetail();
    const { isOpen, onOpen, onClose } = useDisclosure()

    // console.log(notifications?.analytics?.totalNotifications);
    // console.log(notifications?.analytics.totalUnreadNotification);
    // const count = notifications?.analytics?.totalNotifications;
    // console.log(notifications?.analytics?.totalNotifications)
    // setNotifications();

    // const handleNotificationClick = () => {
    //     alert("You have new notifications!");
    //     setNotifications(0); // Reset notifications when clicked
    // };

    return (
        <>

            <Box position="relative" display="inline-block">
                <IconButton
                    icon={<IoMdNotificationsOutline />}
                    onClick={onOpen}
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
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Notifications
                        <ModalCloseButton />
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={5}>

                            {
                                notificationsData.map((data, index) => (
                                    <React.Fragment key={index}>
                                        <Flex

                                            backgroundImage="linear-gradient(to right, #ff7e5f 0%, #feb47b 51%, #ff7e5f 100%)"
                                            backgroundSize="200% auto"
                                            color="white"
                                            p={4}
                                            borderRadius="10px"
                                            boxShadow="0 0 20px #eee"
                                            // textTransform="uppercase"
                                            display="block"
                                            transition="0.5s"
                                            direction="column"
                                            _hover={{
                                                backgroundPosition: "right center",
                                                backgroundImage: "linear-gradient(to right, #ff7e5f 0%, #feb47b 51%, #ff7e5f 100%)",
                                                color: "#fff",
                                                textDecoration: "none",
                                            }}
                                        >
                                            <Box fontWeight={700} mb={2} fontSize={'14px'}>{data.title}</Box>
                                            <Box>{data.message}</Box>
                                            <Box>{data.timestamp}</Box>
                                            <Box>{data.read}</Box>

                                        </Flex>

                                    </React.Fragment>
                                ))
                            }
                        </Flex>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            backgroundImage="linear-gradient(to right, #ff7e5f 0%, #feb47b 51%, #ff7e5f 100%)"
                            backgroundSize="200% auto"
                            color="white"
                           
                            borderRadius="10px"
                            boxShadow="0 0 20px #eee"
                            // textTransform="uppercase"
                            display="block"
                            transition="0.5s"
                            _hover={{
                                backgroundPosition: "right center",
                                backgroundImage: "linear-gradient(to right, #ff7e5f 0%, #feb47b 51%, #ff7e5f 100%)",
                                color: "#fff",
                                textDecoration: "none",
                            }}
                        >
                            Mark as read
                        </Button>
                    </ModalFooter>

                </ModalContent>

            </Modal>
        </>
    );
};

// const NotificationModal = () => {


//     return (
//         <Modal >
//             <ModalOverlay />
//             <ModalContent>
//                 <ModalHeader>Notifications</ModalHeader>
//                 <ModalBody>
//                     {
//                         notifications.map((data, index) => (
//                             <React.Fragment key={index}>
//                                 <Flex direction="column" align="center">
//                                     <Box>{data.title}</Box>
//                                     <Box>{data.message}</Box>
//                                     <Box>{data.timestamp}</Box>
//                                     <Box>{data.read}</Box>

//                                 </Flex>

//                             </React.Fragment>
//                         ))
//                     }

//                 </ModalBody>
//                 <ModalFooter>

//                 </ModalFooter>

//             </ModalContent>

//         </Modal>
//     )
// }


const notificationsData = [
    {
        id: 1,
        title: "New Message",
        message: "You have received a new message from John.",
        timestamp: new Date().toISOString(),
        read: false,
    },
    {
        id: 2,
        title: "System Update",
        message: "A new update is available. Please update your app.",
        timestamp: new Date().toISOString(),
        read: true,
    },
    {
        id: 3,
        title: "Friend Request",
        message: "Anna sent you a friend request.",
        timestamp: new Date().toISOString(),
        read: false,
    },
];


export default NotificationBell;
