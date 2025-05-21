import React, { useRef, useState } from 'react';
import {
    Box,
    Flex,
    Input,
    Button,
    IconButton,
    Text,
    VStack,
    HStack,
    useToast,
    Image,
    Avatar,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    useDisclosure,
    ModalHeader,
    ModalCloseButton,
    Link,
} from '@chakra-ui/react';

import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    doc,
    updateDoc,
    setDoc

} from "firebase/firestore";
import { db } from '../Firebase';
import { useEffect } from "react";
import { AttachmentIcon } from '@chakra-ui/icons';
import { FaCamera } from 'react-icons/fa';
import Webcam from 'react-webcam';
import { useUser } from '../../Context/userContext';
import { useTradeData } from '../DataContext/TradeDataContext';


const ChatComponent = ({ currentUserId, tradeData }) => {
    // const { tradeData } = useTradeData();
    const { user } = useUser();
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null); // preview image if file is image
    const [chatLog, setChatLog] = useState([]);
    const [capturedImage, setCapturedImage] = useState(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const otherUserId = String(tradeData?.user_id);
    const otherUserName = tradeData?.user?.username;
    const [seenBy, setSeenBy] = useState({});
    const scrollRef = useRef();
    const chatId = getChatId(user?.user_id, tradeData?.user_id);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const webcamRef = useRef();
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [messages]);

    useEffect(() => {
        const q = query(messagesRef, orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
    }, [chatId]);
    //Here is Typing.... update
    useEffect(() => {
        if (!chatId || !otherUserId) return;

        const otherTypingRef = doc(db, "chats", chatId, "typingStatus", otherUserId);
        const unsubscribe = onSnapshot(otherTypingRef, (docSnap) => {
            const data = docSnap.data();
            setIsTyping(data?.isTyping || false);
        });

        return unsubscribe;
    }, [chatId, otherUserId]);
    //this is my seen track

    useEffect(() => {
        if (messages.length === 0) return;

        const lastMsg = messages[messages.length - 1];

        const seenRef = doc(db, "chats", chatId, "metadata", "seenStatus");
        // Try update, if fails, fall back to set
        updateDoc(seenRef, {
            [`seenBy.${currentUserId}`]: {
                messageId: lastMsg.id,
                seenAt: serverTimestamp(),
            }
        }).catch(async () => {
            await setDoc(seenRef, {
                seenBy: {
                    [currentUserId]: {
                        messageId: lastMsg.id,
                        seenAt: serverTimestamp(),
                    }
                }
            });
        });
    }, [messages]);

    //this is for listner
    useEffect(() => {
        const seenRef = doc(db, "chats", chatId, "metadata", "seenStatus");

        const unsubscribe = onSnapshot(seenRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data().seenBy;
                setSeenBy(data || {});
            }
        });

        return unsubscribe;
    }, [chatId]);
    const handleInputChange = (e) => {
        setInput(e.target.value);

        const typingStatusRef = doc(db, "chats", chatId, "typingStatus", String(currentUserId));
        setDoc(typingStatusRef, { isTyping: true });

        clearTimeout(window.typingTimeout);
        window.typingTimeout = setTimeout(() => {
            setDoc(typingStatusRef, { isTyping: false });
        }, 1500);
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            if (selected.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result);
                reader.readAsDataURL(selected);
            } else {
                setPreview(null);
            }
            setCapturedImage(null); // Clear camera image
        }
    };

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        setFile(null);
        setPreview(imageSrc);
        onClose();
    };

    const handleSend = async () => {
        if (!input && !file && !capturedImage) {
            toast({
                title: 'Nothing to send.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }

        const timestamp = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        const newMessage = {
            id: Date.now(),
            text: input,
            file: file ? { name: file.name, type: file.type } : null,
            image: capturedImage || (preview && file?.type.startsWith('image/') ? preview : null),
            sender: currentUserId,
            time: timestamp,
            createdAt: serverTimestamp(),
        };
        await addDoc(messagesRef, newMessage);

        setInput("");
        setChatLog((prev) => [...prev, newMessage]);
        setFile(null);
        setCapturedImage(null);
        setPreview(null);
    };


    return (
        <Box w="100%" mx="auto" p={4} borderWidth={1} borderRadius="lg" bg="gray.50">
            <VStack ref={scrollRef} spacing={3} h="400px" overflowY="auto" mb={4} >
                {messages.map((item, index) => {

                    const isCurrentUser = item.sender === currentUserId;
                    // The receiver's last seen message ID
                    const receiverSeenMsgId = seenBy?.[otherUserId]?.messageId;
                    // Find index of receiver's last seen message
                    const lastSeenIndex = messages.findIndex((m) => m.id === receiverSeenMsgId);
                    // Find index of current message
                    const msgIndex = messages.findIndex((m) => m.id === item.id);
                    // Check if this message was sent by me and is seen by the other user
                    const isSeen = isCurrentUser && msgIndex <= lastSeenIndex;
                    return (
                        <Flex alignSelf={isCurrentUser ? 'end' : 'start'} key={item.id} >
                            <Box display={'flex'} gap={1} flexDirection={'column'} alignItems={'end'} bg={isCurrentUser ? 'green.50' : 'blue.50'} p={3} borderRadius="md" boxShadow="sm" w="100%">
                                {item.image && (
                                    <>
                                        <Image
                                            src={item.image}
                                            alt="Attachment"
                                            boxSize="150px"
                                            borderRadius="md"
                                            cursor="pointer"
                                            onClick={() => {
                                                setPreviewImage(item.image);
                                                onOpen1();
                                            }}
                                        />
                                    </>
                                )}
                                <Text >{item.text}</Text>


                                {/* {item.file && !item.image && (
                                    <Text fontSize="sm" color="blue.500">
                                        📎 {item.file.name}
                                    </Text>
                                )} */}
                                {item.file && !item.image && (
                                    <Link
                                        href={item.file.url}
                                        download={item.file.name}
                                        isExternal
                                        color="blue.500"
                                        fontSize="sm"
                                    >
                                        📎 {item.file.name} (Download)
                                    </Link>
                                )}

                                <Flex alignSelf={'end'} textAlign={'end'}>
                                    <Box textAlign={'end'} fontSize={'10px'} color="gray.500">{item.time}</Box>
                                </Flex>
                                {isSeen && (
                                    <Flex fontSize={'8px'} color={'blue.500'}>✓✓</Flex>
                                )}
                            </Box>

                        </Flex>)
                })}
            </VStack>
            {isTyping && <Flex fontSize={'14px'} color={'green'} alignSelf={'self-start'}><em>{otherUserName} is typing...</em></Flex>}

            {/* Show preview if file/image selected */}
            {(file || capturedImage) && (
                <Box mt={3}>
                    {preview && (
                        <Image src={preview} alt="Preview" boxSize="120px" borderRadius="md" />
                    )}
                    {file && (
                        <Text fontSize="sm" mt={1} maxW={'400px'} bg={'gray.100'} p={4} borderRadius={5} mb={1}>
                            📎 {file.name}
                        </Text>
                    )}
                </Box>
            )}

            <Flex gap={2} align="center" direction={{ base: 'column', sm: 'row' }} flexWrap="wrap">
                <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    flex={{ base: 'none', sm: 1 }}
                />

                <Flex gap={2} align="center">
                    <Input
                        type="file"
                        display="none"
                        id="chat-file"
                        onChange={handleFileChange}
                    />

                    <label htmlFor="chat-file">
                        <IconButton as="span" icon={<AttachmentIcon />} aria-label="Attach file" />
                    </label>

                    <IconButton icon={<FaCamera />} aria-label="Open camera" onClick={onOpen} />

                    <Button colorScheme="blue" onClick={handleSend}>
                        Send
                    </Button>
                </Flex>
            </Flex>



            {/* Camera Modal */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            style={{ width: '100%' }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleCapture}>
                            Capture
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* preview of Image */}
            <Modal isOpen={isOpen1} onClose={onClose1} isCentered size="xl" >
                <ModalOverlay />
                <ModalContent bg={'transparent'}>
                    <ModalHeader borderTopRadius={5} bg={'gray.50'} >Image Preview</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody m={0} p={0} >
                        <Image src={previewImage} alt="Preview" width="100%" borderRadius="md" />
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* preview of Image */}
        </Box>
    );
};
// 🔁 Helper to generate consistent chatId
function getChatId(userA, userB) {
    return [userA, userB].sort().join("_");
}

export default ChatComponent;
