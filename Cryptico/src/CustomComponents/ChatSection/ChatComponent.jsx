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
import { AttachmentIcon } from '@chakra-ui/icons';
import { FaCamera } from 'react-icons/fa';
import Webcam from 'react-webcam';

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null); // preview image if file is image
    const [chatLog, setChatLog] = useState([]);
    const [capturedImage, setCapturedImage] = useState(null);
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const webcamRef = useRef();

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

    const handleSend = () => {
        if (!message && !file && !capturedImage) {
            toast({
                title: 'Nothing to send.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:'top-right'
            });
            return;
        }

        const timestamp = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        const newMessage = {
            id: Date.now(),
            text: message,
            file: file ? { name: file.name, type: file.type } : null,
            image: capturedImage || (preview && file?.type.startsWith('image/') ? preview : null),
            time: timestamp,
        };

        setChatLog((prev) => [...prev, newMessage]);
        setMessage('');
        setFile(null);
        setCapturedImage(null);
        setPreview(null);
    };

    return (
        <Box w="100%" mx="auto" p={4} borderWidth={1} borderRadius="lg" bg="gray.50">
            <VStack spacing={3} h="400px" overflowY="auto" mb={4}>
                {chatLog.map((item) => (
                    <Flex alignSelf={'end'} key={item.id} >
                        <Box display={'flex'} gap={3} alignItems={'end'} bg="white" p={3} borderRadius="md" boxShadow="sm" w="100%">
                            <Text mt={1}>{item.text}</Text>


                            {item.image && (
                                <Image src={item.image} alt="Attachment" boxSize="150px" mt={2} borderRadius="md" />
                            )}
                            {item.file && !item.image && (
                                <Text mt={2} fontSize="sm" color="blue.500">
                                    📎 {item.file.name}
                                </Text>
                            )}

                            <Flex alignSelf={'end'} textAlign={'end'}>
                                <Box  textAlign={'end'} fontSize={'10px'} color="gray.500">{item.time}</Box>
                            </Flex>
                        </Box>
                    </Flex>
                ))}
            </VStack>
            {/* Show preview if file/image selected */}
            {(file || capturedImage) && (
                <Box mt={3}>
                    {preview && (
                        <Image src={preview} alt="Preview" boxSize="120px" borderRadius="md" />
                    )}
                    {file && (
                        <Text fontSize="sm" mt={1}>
                            📎 {file.name}
                        </Text>
                    )}
                </Box>
            )}

            <Flex gap={2} align="center" flexWrap="wrap">
                <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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

export default ChatComponent;
// import React, { useEffect, useRef, useState } from 'react';
// import {
//     Box,
//     Flex,
//     Input,
//     Button,
//     IconButton,
//     Text,
//     VStack,
//     useToast,
//     Image,
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalBody,
//     ModalFooter,
//     useDisclosure,
// } from '@chakra-ui/react';
// import { AttachmentIcon } from '@chakra-ui/icons';
// import { FaCamera } from 'react-icons/fa';
// import Webcam from 'react-webcam';

// const ChatComponent = ({ userId }) => {
//     const [message, setMessage] = useState('');
//     const [file, setFile] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [chatLog, setChatLog] = useState([]);
//     const [capturedImage, setCapturedImage] = useState(null);
//     const [socket, setSocket] = useState(null);
//     const toast = useToast();
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const webcamRef = useRef();

//     useEffect(() => {
//         const ws = new WebSocket('ws://localhost:8080');

//         ws.onopen = () => {
//             ws.send(JSON.stringify({ type: 'login', userId }));
//         };

//         ws.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             if (data.type === 'message') {
//                 setChatLog((prev) => [...prev, data]);
//             }
//         };

//         setSocket(ws);

//         return () => {
//             ws.close();
//         };
//     }, [userId]);

//     const handleFileChange = (e) => {
//         const selected = e.target.files[0];
//         if (selected) {
//             setFile(selected);
//             if (selected.type.startsWith('image/')) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => setPreview(reader.result);
//                 reader.readAsDataURL(selected);
//             } else {
//                 setPreview(null);
//             }
//             setCapturedImage(null);
//         }
//     };

//     const handleCapture = () => {
//         const imageSrc = webcamRef.current.getScreenshot();
//         setCapturedImage(imageSrc);
//         setFile(null);
//         setPreview(imageSrc);
//         onClose();
//     };

//     const handleSend = () => {
//         if (!message && !file && !capturedImage) {
//             toast({
//                 title: 'Nothing to send.',
//                 status: 'warning',
//                 duration: 2000,
//                 isClosable: true,
//                 position: 'top-right',
//             });
//             return;
//         }

//         const timestamp = new Date().toLocaleTimeString([], {
//             hour: '2-digit',
//             minute: '2-digit',
//         });

//         const outgoing = {
//             id: Date.now(),
//             type: 'message',
//             from: userId,
//             to: 'user2', // change as needed
//             text: message,
//             file: file ? { name: file.name, type: file.type } : null,
//             image: capturedImage || (preview && file?.type?.startsWith('image/') ? preview : null),
//             time: timestamp,
//         };

//         socket?.send(JSON.stringify(outgoing));

//         setChatLog((prev) => [...prev, outgoing]);
//         setMessage('');
//         setFile(null);
//         setCapturedImage(null);
//         setPreview(null);
//     };

//     return (
//         <Box w="100%" mx="auto" p={4} borderWidth={1} borderRadius="lg" bg="gray.50">
//             <VStack spacing={3} h="400px" overflowY="auto" mb={4}>
//                 {chatLog.map((item) => (
//                     <Flex
//                         key={item.id}
//                         alignSelf={item.from === userId ? 'flex-end' : 'flex-start'}
//                         justifyContent={item.from === userId ? 'flex-end' : 'flex-start'}
//                         w="100%"
//                     >
//                         <Box
//                             display={'flex'}
//                             gap={3}
//                             alignItems={'end'}
//                             bg={item.from === userId ? 'blue.100' : 'gray.100'}
//                             p={3}
//                             borderRadius="md"
//                             boxShadow="sm"
//                         >
//                             <Text mt={1}>{item.text}</Text>

//                             {item.image && (
//                                 <Image src={item.image} alt="Attachment" boxSize="150px" mt={2} borderRadius="md" />
//                             )}

//                             {item.file && !item.image && (
//                                 <Text mt={2} fontSize="sm" color="blue.500">
//                                     📎 {item.file.name}
//                                 </Text>
//                             )}

//                             <Flex alignSelf={'end'} textAlign={'end'}>
//                                 <Box textAlign={'end'} fontSize={'10px'} color="gray.500">
//                                     {item.time}
//                                 </Box>
//                             </Flex>
//                         </Box>
//                     </Flex>
//                 ))}
//             </VStack>

//             {(file || capturedImage) && (
//                 <Box mt={3}>
//                     {preview && (
//                         <Image src={preview} alt="Preview" boxSize="120px" borderRadius="md" />
//                     )}
//                     {file && (
//                         <Text fontSize="sm" mt={1}>
//                             📎 {file.name}
//                         </Text>
//                     )}
//                 </Box>
//             )}

//             <Flex gap={2} align="center" flexWrap="wrap">
//                 <Input
//                     placeholder="Type your message..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     flex="1"
//                 />

//                 <Input type="file" display="none" id="chat-file" onChange={handleFileChange} />
//                 <label htmlFor="chat-file">
//                     <IconButton as="span" icon={<AttachmentIcon />} aria-label="Attach file" />
//                 </label>

//                 <IconButton icon={<FaCamera />} aria-label="Open camera" onClick={onOpen} />

//                 <Button colorScheme="blue" onClick={handleSend}>
//                     Send
//                 </Button>
//             </Flex>

//             <Modal isOpen={isOpen} onClose={onClose} isCentered>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalBody>
//                         <Webcam
//                             audio={false}
//                             ref={webcamRef}
//                             screenshotFormat="image/jpeg"
//                             style={{ width: '100%' }}
//                         />
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button colorScheme="green" mr={3} onClick={handleCapture}>
//                             Capture
//                         </Button>
//                         <Button onClick={onClose}>Cancel</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </Box>
//     );
// };

// export default ChatComponent;

