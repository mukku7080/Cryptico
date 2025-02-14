import { useState, useEffect } from "react";
import { HStack, PinInput, PinInputField, Button, Text, VStack, Box, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";



function OTPInput({ verification, email }) {
    const [otp, setOtp] = useState("");
    const { handleVerifyEmailOtp, handleEmailOtp } = useAuth();
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes (120 seconds)
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const toast = useToast()

    // Timer Effect
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsResendDisabled(false); // Enable the resend button
        }
    }, [timeLeft]);
    const navigate = useNavigate("");

    const handleSubmit = async () => {
        if (verification == 'Email') {

            try {

                const res = await handleVerifyEmailOtp({ otp });
                if (res.status === "success") {

                    navigate('/user-dashboard');
                }
            }
            catch (err) {
                console.log("Error:", err.res ? err.res.data : err.message);
            }
        }
        if (verification == 'Mobile') {

            navigate('/user-dashboard');
            // login(email);
            console.log(email.value);
        }

    }

    // Handle Resend OTP
    const handleResendOTP = () => {
        setTimeLeft(120); // Reset timer to 2 minutes
        setIsResendDisabled(true);
        setOtp(""); // Clear OTP input
        const res = handleEmailOtp();
        if (res.status === 'success') {
            toast({
                title: "Otp Resent Successfully",
                status: "warning",
                duration: 4000,
                isClosable: true,
                position: "top-right",
            });

        }
        console.log("OTP Resent!");
    };

    // Format timer display (MM:SS)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    return (
        <VStack spacing={4} p={6} >

            <Text fontSize="lg" fontWeight="bold" color={'orange'}>{`Enter ${verification} OTP`} </Text>

            <HStack>
                <PinInput otp onComplete={(value) => setOtp(value)} >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>

            <Text color="gray.600">Time Left: {formatTime(timeLeft)}</Text>

            <Button
                colorScheme="orange"
                isDisabled={otp.length !== 6}
                onClick={handleSubmit}
            >
                Submit OTP
            </Button>

            <Button
                colorScheme="red"
                variant="ghost"
                onClick={handleResendOTP}
                isDisabled={isResendDisabled}
            >
                Resend OTP
            </Button>
        </VStack>
    );
}

export default OTPInput;
