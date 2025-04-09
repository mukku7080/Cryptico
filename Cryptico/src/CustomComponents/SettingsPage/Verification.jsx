import {
    Box, Checkbox, Flex, FormControl, FormLabel, Heading, Input, FormErrorMessage,
    Button,
    VStack,
    Select,
    Tag,
    InputGroup,
    InputRightAddon,
    HStack, PinInput, PinInputField
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdArrowRightAlt, MdMarkEmailRead, MdMobileFriendly, MdOutlineLocationOff } from 'react-icons/md'
import CurrencyDropdown from '../Dropdown/CurrencyDropdown'
import NumberDropdownNew from '../Dropdown/NumberDropdownNew'
import { FaIdCard } from 'react-icons/fa'
import { useFormik } from "formik";
import * as Yup from "yup";
import OfferLocation from '../Dropdown/OfferLocation'
import CountryCodeDropdown from '../Dropdown/CountryCodeDropdown'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase.config';
// import { gradientButtonStyle } from '../Wallet/CreateWallet';

const validationSchema = Yup.object({
    region: Yup.string().required("Region/State is required"),
    city: Yup.string().required("City is required"),
    address1: Yup.string().required("Address Line 1 is required"),
    address2: Yup.string(),
    zip: Yup.string()
        .matches(/^\d{5}$/, "Zip code must be 5 digits")
        .required("Zip code is required"),
});

const Verification = () => {
    return (
        <>
            <Flex direction={'column'} gap={10}>
                <Heading size={'lg'}>Verification</Heading>
                <PhoneVerification />

                <EmailVerification />
                <IdVerification />
                <AddressVerification />

            </Flex>

        </>)
}

const PhoneVerification = () => {
    const [isShow, setShow] = useState(false);
    const [phone, setPhone] = useState();
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [fullPhone, setFullPhone] = useState(null);
    const [isotpsend, setIsOtpSend] = useState(false);


    const sendOtp = async () => {
        console.log('Sending OTP to:', fullPhone);
        try {

            const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
                size: 'invisible',
                callback: (response) => {
                    console.log('reCAPTCHA verified!');
                },
                'expired-callback': () => {
                    console.log('reCAPTCHA expired. Please solve again.');
                }
            })

            const confirmation = await signInWithPhoneNumber(auth, fullPhone, recaptchaVerifier);
            console.log(confirmation);
            setUser(confirmation);
        } catch (error) {
            console.log('Error sending OTP:', error);
        }
    };

    const verifyOtp = async () => {
        console.log('Verifying OTP:', otp);
        try {
            const confirmationResult = user;
            const data = await confirmationResult.confirm(otp);
            console.log('OTP verified:', data);
        } catch (error) {
            console.log('OTP verification failed:', error);
        }
    };
    useEffect(() => {
        setFullPhone(`${countryCode?.trim()}${phone?.trim()}`);

    }, [countryCode, phone])
    useEffect(() => {
        if (otp?.length === 6) {
            verifyOtp();
        }
    }, [otp]);
    return (
        <>
            <Flex direction={'column'} border={'1px solid #dcdcdc'}>

                <Flex className='main1' p={4} color={'red.500'}>
                    <Flex gap={2} cursor={'pointer'} onClick={() => setShow(!isShow)}>
                        <MdMobileFriendly size={50} opacity={0.2} />
                        <Flex direction={'column'} gap={1}>
                            <Heading size={'md'}>Phone Verification</Heading>
                            <Heading size={'xs'} color={'gray'}>Not Verified</Heading>
                        </Flex>
                    </Flex>

                </Flex>
                {
                    isShow &&
                    <Flex p={4} direction={'column'} gap={5} borderTop={'1px solid #dcdcdc'}>
                        <Flex direction={'column'} gap={2} w={{ base: '100%', md: '50%' }}>
                            {
                                isotpsend ?


                                    <FormControl isRequired >
                                        <FormLabel>OTP</FormLabel>

                                        {/* <Flex direction={'column'} gap={2}> */}

                                        <HStack>
                                            <PinInput

                                                value={otp}
                                                onChange={setOtp} // Update state when user types
                                            // onComplete={verifyOtp}
                                            >
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                            </PinInput>
                                        </HStack>
                                        {/* </Flex> */}
                                    </FormControl>
                                    :
                                    <FormControl>
                                        <FormLabel>Phone</FormLabel>
                                        <Flex border={'1px solid #dcdcdc'} p={2} gap={2} borderRadius={5} flexWrap={'nowrap'}>
                                            <Box>
                                                <CountryCodeDropdown setCountryCode={setCountryCode} />
                                            </Box>

                                            <Input size={'sm'} borderLeftRadius={0} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter your Number'></Input>

                                        </Flex>
                                    </FormControl>
                            }


                            {
                                isotpsend ? ""
                                    :
                                    <FormControl>
                                        <Flex>
                                            <Button colorScheme='gray' onClick={() => {
                                                sendOtp();
                                                setIsOtpSend(true);
                                            }}
                                                variant={'outline'}
                                                size={'sm'}
                                                alignSelf={'end'}
                                            >
                                                Send OTP
                                            </Button>
                                        </Flex>

                                    </FormControl>
                            }
                        </Flex>
                        <Box alignSelf={'center'} id="recaptcha" style={{ display: 'block' }}></Box>

                    </Flex>

                }
            </Flex>
        </>
    )
}


const EmailVerification = () => {
    return (
        <>
            <Flex direction={'column'} gap={10}>
                <Flex direction={'column'} border={'1px solid #dcdcdc'}>

                    <Flex className='main1' p={4}>
                        <Flex gap={2} color={'green.500'}>
                            <MdMarkEmailRead size={50} opacity={0.2} />
                            <Flex direction={'column'} gap={1}>
                                <Heading size={'md'}>Email Verification</Heading>
                                <Heading size={'xs'} color={'green.400'}>Verified</Heading>
                            </Flex>
                        </Flex>

                    </Flex>

                </Flex>

            </Flex>

        </>
    )
}
const IdVerification = () => {
    const [isShow, setShow] = useState(false);
    return (
        <>
            <Flex direction={'column'} gap={10}>
                <Flex direction={'column'} border={'1px solid #dcdcdc'}>

                    <Flex className='main1' p={4}>
                        <Flex cursor={'pointer'} onClick={() => setShow(!isShow)} gap={2} color={'red.500'}>
                            <FaIdCard size={50} opacity={0.2} />
                            <Flex direction={'column'} gap={1}>
                                <Heading size={'md'}>ID Verification</Heading>
                                <Heading size={'xs'} color={'gray'}>Not Verified</Heading>
                            </Flex>
                        </Flex>

                    </Flex>

                    {
                        isShow &&
                        <Flex p={4} borderTop={'1px solid #dcdcdc'} direction={'column'} gap={5} mt={0} >
                            <ResidenceForm />
                        </Flex>
                    }

                </Flex>


            </Flex>

        </>
    )
}
const AddressVerification = () => {
    return (
        <>
            <Flex direction={'column'} gap={10}>
                <Flex direction={'column'} border={'1px solid #dcdcdc'}>

                    <Flex className='main1' p={4} color={'red.500'}>
                        <Flex gap={2}>
                            <MdOutlineLocationOff size={50} opacity={0.2} />
                            <Flex direction={'column'} gap={1}>
                                <Heading size={'md'}>Address Verification</Heading>
                                <Heading size={'xs'} color={'gray'}>Not Verified</Heading>
                            </Flex>
                        </Flex>

                    </Flex>

                </Flex>

            </Flex>
        </>
    )
}








const ResidenceForm = () => {
    const formik = useFormik({
        initialValues: {
            region: "",
            city: "",
            address1: "",
            address2: "",
            zip: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("Form Data:", values);
            alert("Form submitted successfully!");
        },
    });

    return (
        <Box w={{ base: '100%', md: '100%' }} borderRadius="md" >
            <form onSubmit={formik.handleSubmit}>
                <Flex direction={'column'} gap={5}>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>

                            <FormControl >
                                <FormLabel>Issuing Country</FormLabel>
                                <OfferLocation />
                            </FormControl>
                        </Flex>
                        <Flex flex={1}>
                            <FormControl>
                                <FormLabel>Residence Country</FormLabel>
                                <OfferLocation />
                            </FormControl>

                        </Flex>
                    </Flex>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>
                            <FormControl isInvalid={formik.touched.region && formik.errors.region}>
                                <DocumentDropdown />
                                <FormErrorMessage>{formik.errors.region}</FormErrorMessage>
                            </FormControl>

                        </Flex>
                        <Flex flex={1}>
                            {/* Residence Region/State */}
                            <FormControl isInvalid={formik.touched.region && formik.errors.region}>
                                <FormLabel>Residence Region/State</FormLabel>
                                <Input
                                    name="region"
                                    placeholder="Enter your region/state"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.region}
                                />
                                <FormErrorMessage>{formik.errors.region}</FormErrorMessage>
                            </FormControl>

                        </Flex>
                    </Flex>







                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>
                            {/* Residence City */}
                            <FormControl isInvalid={formik.touched.city && formik.errors.city}>
                                <FormLabel>Residence City</FormLabel>
                                <Input
                                    name="city"
                                    placeholder="Enter your city"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                />
                                <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                            </FormControl>
                        </Flex>
                        <Flex flex={1}>
                            {/* Residence Address Line 1 */}
                            <FormControl isInvalid={formik.touched.address1 && formik.errors.address1}>
                                <FormLabel>Residence Address Line 1</FormLabel>
                                <Input
                                    name="address1"
                                    placeholder="Enter address line 1"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address1}
                                />
                                <FormErrorMessage>{formik.errors.address1}</FormErrorMessage>
                            </FormControl>
                        </Flex>
                    </Flex>




                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <Flex flex={1}>

                            {/* Residence Address Line 2 (Optional) */}
                            <FormControl>
                                <FormLabel>Residence Address Line 2<Tag>optional</Tag></FormLabel>
                                <Input
                                    name="address2"
                                    placeholder="Enter address line 2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address2}
                                />
                            </FormControl>

                        </Flex>
                        <Flex flex={1}>
                            {/* Residence Zip */}
                            <FormControl isInvalid={formik.touched.zip && formik.errors.zip}>
                                <FormLabel>Residence Zip</FormLabel>
                                <Input
                                    name="zip"
                                    placeholder="Enter zip code"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.zip}
                                />
                                <FormErrorMessage>{formik.errors.zip}</FormErrorMessage>
                            </FormControl>

                        </Flex>
                    </Flex>




                    {/* Submit Button */}
                    <Button colorScheme="orange" variant={'outline'} type="submit" width='200px' isDisabled>
                        Start Verification Process
                    </Button>
                </Flex>
            </form>
        </Box>
    );
};

const DocumentDropdown = () => {
    const [documentType, setDocumentType] = useState("");

    return (
        <Box >
            <FormControl >
                <FormLabel>Select Document Type</FormLabel>
                <Select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    isDisabled={true}
                >
                    <option value="driving-license">Driving License</option>
                    <option value="passport">Passport</option>
                    <option value="id-card">ID Card</option>
                </Select>
            </FormControl>
        </Box>
    );
}


export default Verification