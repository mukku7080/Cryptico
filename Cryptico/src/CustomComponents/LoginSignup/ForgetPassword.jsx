import { Card, CardBody, Divider, Flex, Heading, Icon, Image, InputGroup, IconButton, Link, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CgArrowsExchange } from "react-icons/cg";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Checkbox, Toast,
    InputRightElement

} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

import { FcGoogle } from "react-icons/fc";
import { FaApple, FaTelegramPlane } from "react-icons/fa";
// import { useAuth } from '../AuthContext/AuthProvider';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';


const ForgetPassowrd = () => {

    const { handleLogin, handleLoginWithGoogle, handleForgotPassword } = useAuth();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const txtcolor = useColorModeValue('black', 'white');
    const bgcolor = useColorModeValue('gray.100', 'gray.700');



    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("*field is required"),
        password: Yup.string().min(6, "Minimum 8 characters").required("*Password is required"),

    });

    const { values, handleBlur, handleSubmit, errors, touched, handleChange } = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema,

        onSubmit: async (values, action) => {

            try {
                setIsLoading(true);
                const res = await handleLogin(values);
                toast({
                    title: "Login Successfuly",
                    description: "Enjoy our Service",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                    position: "top-right",
                });

                navigate("/user-dashboard");
            }
            catch (err) {
                toast({
                    title: "Something Went Wrong",
                    description: "plz check you credential",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                console.log("Login Failded:", err);
            }
            finally {
                setIsLoading(false);
            }
            action.resetForm();


        }

    });




    return (
        <Box minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

            <Flex maxW={'container.xxl'} justifyContent={'center'}  >
                <Card borderRadius={'none'} bg={'transparent'}  >

                    <Flex minW={{ base: 'container', sm: '500px', md: 'container.md', lg: 'container.lg' }} direction={{ base: 'column', sm: 'column', md: 'row' }}  >


                      


                        <Box flex={1}
                        >

                            <Card borderRadius={'none'} bg={'transparent'} border={'none'} boxShadow={'none'} >
                                <Flex justifyContent={'space-between'} px={3} alignItems={'center'} mt={5}>
                                    <Button leftIcon={<CgArrowsExchange />} bg={'transparent'} color={'orange'} onClick={() => navigate('/login')}>Login</Button>
                                </Flex>

                                <Divider color={'#dcdcdc'} opacity={0.5} />

                                <Flex display={'flex'} justifyContent={'center'} alignItems={'start'} direction={'column'} w={'full'} my={10} px={4} gap={5}>
                                    <Heading size={'lg'} fontWeight={'500'} textAlign={'start'}>Forget password</Heading>
                                    <Box as='p' color={'gray'} minW={'400px'} my={3}  >password reset link will be sent to your email address</Box>


                                    <Box borderRadius="md" w={'36%'} >

                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSubmit();
                                        }} >
                                            {/* user Field */}

                                            <FormControl isInvalid={errors.email && touched.email} mb={3}>
                                                <FormLabel color={'gray'}  >Email</FormLabel>
                                                <Input name="email" placeholder="Email" bg={bgcolor}  // Light gray background
                                                    _focus={{ bgcolor }}
                                                    value={values.email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        handleChange(e);
                                                    }}
                                                    onBlur={handleBlur} />
                                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                                            </FormControl>










                                            {/* Submit Button */}
                                            <Button
                                                isLoading={isLoading}
                                                loadingText='Loading'
                                                type="submit" bg={'orange'}
                                                width="full"
                                                mt={5}
                                                _hover={{ bg: 'orange.500' }}>

                                                Send Reset Link

                                            </Button>
                                        </form>

                                    </Box>

                                </Flex>

                                <Flex>
                                    <Divider color={'orange'} ml={3} flex={1} opacity={0.9} />
                                    <Box fontSize={'14px'} textAlign={'center'} flex={1}>Or login with</Box>
                                    <Divider mr={3} flex={1} opacity={0.9} color={'orange'} />
                                </Flex>

                                <Flex my={5} justifyContent={'center'} gap={10}>
                                    <Button variant={'outline'} boxSize={10} onClick={async () => await handleLoginWithGoogle()}>
                                        <Icon as={FcGoogle} boxSize={6}></Icon>
                                    </Button>
                                    <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FaApple} boxSize={6}></Icon>
                                    </Button>
                                    <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FaTelegramPlane} color={'skyblue'} boxSize={6}></Icon>
                                    </Button>
                                </Flex>

                            </Card>
                        </Box>





                    </Flex>
                </Card>
            </Flex>
        </Box>


    )
}

export default ForgetPassowrd




