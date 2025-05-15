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
} from '@chakra-ui/react';

import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp

} from "firebase/firestore";
import { db } from '../Firebase';
import { useEffect } from "react";
import { AttachmentIcon } from '@chakra-ui/icons';
import { FaCamera } from 'react-icons/fa';
import Webcam from 'react-webcam';
import { useUser } from '../../Context/userContext';
import { useTradeData } from '../DataContext/TradeDataContext';

const ChatComponent = ({ currentUserId }) => {
    const { tradeData } = useTradeData();
    const { user } = useUser();
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null); // preview image if file is image
    const [chatLog, setChatLog] = useState([]);
    const [capturedImage, setCapturedImage] = useState(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [input, setInput] = useState("");
    const chatId = getChatId(user?.user_id, tradeData?.user_id);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const webcamRef = useRef();
    useEffect(() => {
        const q = query(messagesRef, orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        console.log(messages);
        return unsubscribe;
    }, [chatId]);

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
        console.log(chatLog);
        setFile(null);
        setCapturedImage(null);
        setPreview(null);
    };

    return (
        <Box w="100%" mx="auto" p={4} borderWidth={1} borderRadius="lg" bg="gray.50">
            <VStack spacing={3} h="400px" overflowY="auto" mb={4}>
                {messages.map((item) => {
                    const isCurrentUser = item.sender === currentUserId;
                    return (
                        <Flex alignSelf={isCurrentUser ? 'end' : 'start'} key={item.id} >
                            <Box display={'flex'} gap={1} flexDirection={'column'} alignItems={'end'} bg={isCurrentUser ? 'green.50' : 'blue.50'} p={3} borderRadius="md" boxShadow="sm" w="100%">


                                {item.image && (
                                    <Image src={item.image} alt="Attachment" boxSize="150px" borderRadius="md" />
                                )}
                                <Text >{item.text}</Text>

                                {item.file && !item.image && (
                                    <Text fontSize="sm" color="blue.500">
                                        📎 {item.file.name}
                                    </Text>
                                )}

                                <Flex alignSelf={'end'} textAlign={'end'}>
                                    <Box textAlign={'end'} fontSize={'10px'} color="gray.500">{item.time}</Box>
                                </Flex>
                            </Box>
                        </Flex>)
                })}
            </VStack>
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

            <Flex gap={2} align="center" flexWrap="wrap">
                <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    flex="1"
                />

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
        </Box>
    );
};
// 🔁 Helper to generate consistent chatId
function getChatId(userA, userB) {
    return [userA, userB].sort().join("_");
}

export default ChatComponent;
