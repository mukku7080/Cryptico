import { Box, Button, Flex, Heading, Icon, Image, Menu, MenuButton, MenuList, MenuItem, Modal, ModalOverlay, ModalContent, ModalFooter, useDisclosure, ModalHeader, ModalCloseButton, ModalBody, ButtonGroup, FormControl, Input, FormLabel, IconButton, InputRightElement, InputGroup, InputRightAddon } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useAuth } from '../../Context/AuthContext';
import { useAccount } from '../../Context/AccountContext';
import { MdKeyboardArrowDown } from 'react-icons/md';


const CreateWallet = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [blockChainType, setblockChainType] = useState();

    const [headername, setHeaderName] = useState(cryptoOption[0].name);
    const [headerlogo, setHeaderLogo] = useState(cryptoOption[0].logo);
    const resetState = () => {
        setHeaderName(cryptoOption[0].name);
        setHeaderLogo(cryptoOption[0].logo);
    }
    return (
        <>


            <Button onClick={onOpen}>
                Create Wallet
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={resetState}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'orange.50'} borderTopRadius={5}>
                        <Flex alignItems={'center'} gap={5} p={1}>

                            <Image src={headerlogo} boxSize={5}></Image>
                            {headername} Wallet

                            <ModalCloseButton mt={2} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        <Flex direction={'column'} gap={5} my={10}>

                            <SelectBlockChain index={0} setHeaderName={setHeaderName} setHeaderLogo={setHeaderLogo} setblockChainType={setblockChainType} />


                            <Flex p={2} bg={'green.50'} borderRadius={5} fontWeight={700} color={'green'}>
                                Verify your password to procced with wallet creation.

                            </Flex>
                            <PasswordVerification blockChainType={blockChainType} />

                        </Flex>
                    </ModalBody>

                </ModalContent>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Button>Save</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

const PasswordVerification = ({ blockChainType = {} }) => {
    // const { blockchain, network, asset } = blockChainType;
    const [password, setPassword] = useState('');
    const { handlePasswordMatch, passwordmatch } = useAuth();
    const [showpassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { handleCreateWallet, handleUpdateweb3WalletAddress } = useAccount();
    const [keyphrase, setKeyPhrase] = useState();
    const [walletid, setWalletId] = useState();
    const [iscelebrate, setCelebrate] = useState(false);
    const [createWalletErrorMessage, setCreateWalletErrorMessage] = useState(false);


    const handleClick = async () => {
        setLoading(true);
        try {

            const res = await handlePasswordMatch(password);
            if (res.passwordVerified) {

                const response = await handleCreateWallet(blockChainType);

                console.log(response.data);
                setKeyPhrase(response.data.phrase)
                setWalletId(response.data.wallet_id);

            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
            // setPassword('');
        }

    }
    const generateWalletAddress = async () => {
        console.log('hello');
        console.log(keyphrase);

        const decrypted = await decryptWithKey(keyphrase, 99);
        // console.log("Decrypted Data:", decrypted);
        const finalDecryption = await decryptWithKey(decrypted.phrase, decrypted.key);
        // console.log(finalDecryption);

        // const decy = await decryptData(keyphrase);



        // Create an HD Wallet from the mnemonic
        const mnemonic = finalDecryption;
        const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);

        console.log("Master Wallet Address:", hdNode.address); // First address

        // Generate multiple wallet addresses
        const wallet = new ethers.Wallet(hdNode.derivePath(`m/44'/60'/0'/0/${walletid}`).privateKey);
        const values = {
            "wallet_id": walletid,
            "wallet_address": wallet.address,
            "wallet_key": wallet.privateKey

        }
        const response = await handleUpdateweb3WalletAddress(values);
        if (response.data.status) {
            setCelebrate(true);
        }



    };




    async function decryptWithKey(encryptedData, customKey) {
        try {
            // Step 1: Base64 decode the encrypted data
            const decodedData = atob(encryptedData);
            const iv = new Uint8Array(decodedData.slice(0, 16).split('').map(c => c.charCodeAt(0)));
            const ciphertext = new Uint8Array(decodedData.slice(16).split('').map(c => c.charCodeAt(0)));

            // Step 2: Derive the key (SHA-256 hash of customKey)
            const encoder = new TextEncoder();
            const keyMaterial = encoder.encode(customKey);
            const keyHash = await crypto.subtle.digest('SHA-256', keyMaterial);

            // Step 3: Import the key
            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                keyHash,
                { name: 'AES-CBC' },
                false,
                ['decrypt']
            );

            // Step 4: Decrypt the data
            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: 'AES-CBC', iv: iv },
                cryptoKey,
                ciphertext
            );

            // Step 5: Convert decrypted data to string
            const decoder = new TextDecoder();
            const decryptedData = decoder.decode(decryptedBuffer);

            // Step 6: Parse JSON if possible
            try {
                return JSON.parse(decryptedData);
            } catch (e) {
                return decryptedData;  // Return as plain text if not JSON
            }
        } catch (error) {
            console.error('Decryption failed:', error);
            throw new Error('Decryption failed.');
        }
    }


    // Example usage


    // function decryptWithKey(encryptedData, customKey) {
    //     try {
    //         // Step 1: Decode the Base64 data
    //         const encryptedBase64 = CryptoJS.enc.Base64.parse(encryptedData);

    //         // Step 2: Extract IV (first 16 bytes)
    //         const iv = CryptoJS.lib.WordArray.create(encryptedBase64.words.slice(0, 4)); // 16 bytes = 4 words
    //         const encryptedText = CryptoJS.lib.WordArray.create(encryptedBase64.words.slice(4));

    //         // Step 3: Derive the key using SHA-256
    //         const key = CryptoJS.SHA256(customKey);

    //         // Step 4: Decrypt the data
    //         const decrypted = CryptoJS.AES.decrypt(
    //             { ciphertext: encryptedText, iv: iv },
    //             key,
    //             { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    //         );

    //         // Step 5: Convert to string
    //         const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

    //         // Step 6: Parse JSON if possible
    //         try {
    //             return JSON.parse(decryptedData);
    //         } catch (error) {
    //             return decryptedData; // Return as plain text if not JSON
    //         }
    //     } catch (error) {
    //         console.error('Decryption failed:', error);
    //         throw new Error('Decryption failed.');
    //     }
    // }



    return (
        <>

            {

                <Flex direction={'column'} gap={3} >
                    <FormControl isRequired>
                        <FormLabel>password</FormLabel>
                        <InputGroup>

                            <Input name="password" isDisabled={passwordmatch?.passwordVerified} placeholder='Enter Password' value={password} type={showpassword ? "text" : "password"} _focus={{ boxShadow: '0px', border: '0px' }} onChange={(e) => setPassword(e.target.value)} />

                            <InputRightElement >
                                <IconButton
                                    bg={'transparent'}
                                    h="1.75rem"
                                    size=""
                                    // border={'1px solid #c05621'}
                                    px={4}
                                    py={3}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    icon={true ? <IoMdEye /> : <IoMdEyeOff />}
                                    aria-label="Toggle Password Visibility"
                                    _hover={{ bg: 'transparent' }}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Flex justifyContent={'space-between'}>
                        {
                            passwordmatch?.passwordVerified === true ?
                                <Box color={'green'} fontWeight={700}>{passwordmatch?.message}</Box>
                                :
                                <Box color={'red'} fontWeight={700}>{passwordmatch?.message}</Box>
                        }
                        <Button isLoading={isLoading} isDisabled={passwordmatch?.passwordVerified} loadingText='wait' onClick={handleClick} alignSelf={'end'} size={'sm'} variant={'outline'} w={'80px'}>Verify</Button>
                    </Flex>
                    {
                        passwordmatch?.passwordVerified &&

                        <Button onClick={generateWalletAddress}>Procced to wallet creation</Button>
                    }
                    {
                        iscelebrate &&
                        <Flex justifyContent={'center'} alignItems={'center'} direction={'column'}>
                            <Box color={'green'}>Woohoo! Your Wallet is Created 🎉</Box>
                            <Image src='/imagelogo/wallet.gif'></Image>
                        </Flex>
                    }
                </Flex>
            }
        </>
    )
}


const SelectBlockChain = ({ index, setHeaderName, setHeaderLogo, setblockChainType }) => {
    const [option, setOption] = useState(cryptoOption[index].name);
    const [logo, setlogo] = useState(cryptoOption[index].logo);
    return (
        <>
            <Menu matchWidth >

                <MenuButton as={Button} py={8} w={'full'} borderRadius={5} bg={'gray.100'} rightIcon={<MdKeyboardArrowDown />} _hover={{ bg: 'gray.100' }}  >
                    <Flex gap={2}>
                        <Image boxSize={5} src={logo}></Image>
                        {option}
                    </Flex>

                </MenuButton>
                <MenuList borderRadius={0} p={2}  >
                    {cryptoOption.map((data, index) => (
                        <React.Fragment key={index}>
                            <MenuItem key={data.name} onClick={() => {
                                setOption(data.name);
                                setHeaderName(data.name);
                                setHeaderLogo(data.logo);
                                setlogo(data.logo);
                                setblockChainType(data.blockchainDetail)
                            }} gap={3} _hover={{ bg: "blue.100" }}><Image boxSize={5} src={data.logo}></Image>{data.name}</MenuItem>
                        </React.Fragment>
                    ))}

                </MenuList>
            </Menu>
        </>
    )
}





const cryptoOption = [
    {
        name: 'Bitcoin',
        logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040',
        blockchainDetail: {
            blockchain: "bitcoin",
            network: "btc",
            asset: "btc"
        }
    },
    {
        name: 'Ethereum',
        logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040',
        blockchainDetail: {
            blockchain: "ethereum",
            network: "erc20",
            asset: "eth"
        },
    },
    {
        name: 'Binance',
        logo: 'https://cryptologos.cc/logos/thumbs/bnb.png?v=040',
        blockchainDetail: {
            blockchain: "binance",
            network: "bep20",
            asset: "bnb"
        },
    },
    {
        name: 'Tether',
        logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040',
        blockchainDetail: {
            blockchain: "ethereum",
            network: "erc20",
            asset: "usdt"
        },
    },
]
export default CreateWallet;