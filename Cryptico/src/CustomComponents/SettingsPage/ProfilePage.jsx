import React, { useEffect, useRef, useState } from 'react'
import {
    Box, Button, Card, Collapse, Divider, Flex, Grid, GridItem, Heading, IconButton, useDisclosure,
    Image, Link, useColorModeValue,
    RadioGroup,
    Radio,
    Stack,
    Text,
    InputGroup,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    Avatar,
    InputRightAddon,
    Spinner
} from '@chakra-ui/react'
import { FaArrowTrendUp, FaUser } from "react-icons/fa6";
import { HiMiniArrowPath } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { MdOutlineFileDownload, MdKeyboardArrowRight, MdKeyboardArrowDown, MdDomainVerification, MdModeEdit, MdUpload } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { PiChecks } from "react-icons/pi";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineBank, AiOutlineSecurityScan } from 'react-icons/ai';
import { CiCircleQuestion } from 'react-icons/ci';
import NumberDropdown from '../Dropdown/NumberDropdown';
import PhoneInputWithCountry from '../Dropdown/NumberDropdown';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';
import SearchableMultiSelect from '../Dropdown/SearchableMultiSelect';
import LanguageSelectorDropdown from '../Dropdown/LanguageSelectorDropdown';
import { useUser } from '../../Context/userContext';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [istoogle, setToogle] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isOpen1, onToggle: onToggle1 } = useDisclosure();
    const [visibility, setVisibility] = useState("firstName");
    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser, handleChangeProfilePic } = useUser()
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);




    const handleClick = () => {
        fileInputRef.current.click();
    };


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imagePreviewUrl = URL.createObjectURL(file);
        setImageUrl(imagePreviewUrl); // Set preview image

        try {
            setIsLoading(true);

            const res = await handleChangeProfilePic(file);
            if (res?.profile_image_url) {
                const updatedUrl = `${res.profile_image_url}?timestamp=${new Date().getTime()}`;
                setUser((prevUser) => ({ ...prevUser, profile_image_url: updatedUrl })); // Update state
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }

    };

    // useEffect(()=>{
    //     window.location.reload();
    // },[image])
    return (
        <Flex gap={5} direction={'column'} my={5}>
            <Flex gap={10} direction={{ base: 'column-reverse', lg: 'row' }} >
                <Flex flex={1} >
                    <Flex direction={'column'} gap={5} w={{ base: '80%', lg: '100%' }}>

                        <Flex alignItems={'center'} gap={2}>

                            <Heading>
                                Account settings

                                <Box color={'green.400'} fontSize={'16px'} > &nbsp;ID verified</Box>
                            </Heading>
                        </Flex>
                        <Flex gap={{ base: 5, sm: 2 }} alignItems={'center'}>
                            <Box>{user && user.email}</Box>
                            <Button size={'sm'} bg={'transparent'} textDecoration={'underline'}>change email</Button>
                        </Flex>
                        <Flex>
                            <Box p={4} borderWidth={1} borderRadius="lg" w={'full'}>
                                <Text fontSize="lg" fontWeight="bold" mb={3}>
                                    How would you like others to see your name during trades?
                                </Text>
                                <RadioGroup onChange={setVisibility} value={visibility}>
                                    <Stack spacing={3}>
                                        <Radio value="firstName">First name and initial</Radio>
                                        <Radio value="fullName">Full name</Radio>
                                        <Radio value="hide">Hide full name</Radio>
                                    </Stack>
                                </RadioGroup>
                            </Box>
                        </Flex>

                        <NumberDropdown />

                    </Flex>





                </Flex>


                {/* User_Image & name Section --------------------------------------------------------------------------------------- */}

                <Flex flex={1}>

                    <Flex alignItems={'start'} justifyContent={'start'} gap={5} w={'full'} direction={{ base: 'column', xl: 'column' }} >
                        <Flex gap={5} alignItems={'center'}>

                            {user ? (
                                <Avatar key={user.profile_image_url} border={'1px solid white'} size="xl" src={user && user.profile_image_url} />
                            ) : (
                                <Spinner size="xl" color="black" />
                            )}

                            {/* <Avatar size={{ base: 'lg', sm: 'xl' }} alignSelf={'start'} src={user && user.profile_image_url} /> */}
                            <Heading size={'xl'} color={'orange'}>{user && user.username}</Heading>
                        </Flex>

                        <Flex direction={'column'} gap={3} w={{ base: '80%', lg: '100%' }} >

                            <Flex direction={'column'} gap={2} >
                                <Heading size={'sm'}>username</Heading>

                                <Flex justifyContent={'space-between'} alignItems={'center'} border={'1px solid #dcdcdc'} borderRadius={5} >
                                    <InputGroup >

                                        <Input placeholder='Enter username'
                                            border={'none'}
                                            _hover={{ border: "none" }}
                                            _focus={{ boxShadow: "none", border: "none" }}

                                        ></Input>

                                        <InputRightAddon bg='orange' px={0} borderRightRadius={4}>
                                            <Button bg={'transparent'} >save</Button>
                                        </InputRightAddon>

                                    </InputGroup>
                                </Flex>
                                <Box> you can change your username only once</Box>
                            </Flex>

                            <Input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <Button isLoading={isLoading} loadingText='uploading..' onClick={handleClick} variant={'outline'} rightIcon={<MdUpload />}>
                                Upload Image
                            </Button>
                            {image && <Image src={image} alt="Preview" mt={4} boxSize="100px" />}
                            {/* <Button variant={'outline'} rightIcon={<MdUpload />}>Upload Image </Button> */}
                            <Box fontSize={'14px'}>
                                Upload a nice picture, preferably of yourself. If you upload any explicit or otherwise inappropriate image, we’ll remove it immediately.
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
                {/* User_Image & name Section end--------------------------------------------------------------------------------- */}

            </Flex>



            <Divider />


            <Flex w={{ base: '80%', lg: '100%' }} gap={{ base: 5, md: 10 }} direction={{ base: 'column', md: 'row' }} >
                <Flex direction={'column'} gap={5} flex={1}>
                    <Heading size={'sm'}>Prefered Currency</Heading>

                    <Flex justifyContent={'space-between'} alignItems={'center'} border={'1px solid #dcdcdc'} borderRadius={5} width={'full'} >
                        <InputGroup>

                            <Input placeholder='Enter Amount'
                                border={'none'}
                                _hover={{ border: "none" }}
                                _focus={{ boxShadow: "none", border: "none" }}

                            ></Input>
                            {
                                false &&
                                <InputRightElement>
                                    <Button><MdKeyboardArrowDown /></Button>
                                </InputRightElement>
                            }
                        </InputGroup>
                        <CurrencyDropdown />
                    </Flex>
                </Flex>
                <Flex flex={1}>
                    <LanguageSelectorDropdown />
                </Flex>
            </Flex>
            <Flex w={{ base: '80%', lg: '100%' }}>
                <FormControl gap={4}>
                    <FormLabel mb={3}>
                        <Heading size={'sm'}>Bio</Heading>
                    </FormLabel>
                    <Textarea h={'150px'} placeholder='Your bio appear publicaly on your profile ' />

                    <Box fontSize={'14px'}>Maximum 3 lines and 180 characters</Box>
                </FormControl>
            </Flex>
        </Flex>
    )
}




// const ProfileAvatar = ({ user }) => {
//     useEffect(()=>{

//     },[])
//     return (
//         <>
//             {user ? (
//                 <Avatar border={'1px solid white'} size="xl" src={user && user.profile_image_url} />
//             ) : (
//                 <Spinner size="xl" color="black" />
//             )}
//         </>
//     )
// }

export default ProfilePage
