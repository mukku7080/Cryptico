import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbarnew from './CustomComponents/Navbar/Navbarnew'
import Footer from './CustomComponents/Footer/Footer'
import CardComponent from './CustomComponents/Cards/CardComponent'
import Hero from './CustomComponents/HeroSection/Hero'
import ProductsCard from './CustomComponents/Cards/ProductsCard'
import ProductsCard1 from './CustomComponents/Cards/ProductsCard1'
import Section3 from './CustomComponents/HeroSection/Section3'
import { Container, useColorModeValue } from '@chakra-ui/react'
import SMDashboard from './CustomComponents/SMDashborad/SMDashboard'
import Section4 from './CustomComponents/HeroSection/Section4'
import CryptoAccordion from './CustomComponents/Accordian/CryptoAccordion'
import ChakraMarquee from './CustomComponents/HeroSection/Marque'
import FastCounterChakra from './CustomComponents/HeroSection/FastCounterChakra'
import Dashborad1 from './CustomComponents/SMDashborad/Dashborad1'
import Signup from './CustomComponents/LoginSignup/Signup'
import Login from './CustomComponents/LoginSignup/Login'
import { Route, Routes } from 'react-router-dom'
import Signupnew from './CustomComponents/LoginSignup/Signupnew'
import Loginnew from './CustomComponents/LoginSignup/Loginnew'
import UserDashboard from './CustomComponents/Afterlogin/UserDashboard/UserDashboard'
import OTPInput from './CustomComponents/LoginSignup/OtpInput'
import Numberwithotp from './CustomComponents/LoginSignup/Numberwithotp'
import Profile from './CustomComponents/Afterlogin/Profile'
import TradeHistory from './CustomComponents/Afterlogin/UserDashboard/TradeHistory'
import RecentTradeHistory from './CustomComponents/Afterlogin/UserDashboard/RecentTradeHistory'
import PaymentMethod from './CustomComponents/Afterlogin/UserDashboard/PaymentMethod'
import ProtectedRoute from './CustomComponents/AuthContext/ProtectedRoute'
import { AuthProvider } from './Context/AuthContext'

function App() {
  const [count, setCount] = useState(0)
  const bgColor = useColorModeValue("#f5f7fa", "gray.900");

  return (
    <>



      <AuthProvider>

        <Container maxW={'container.xxl'} margin={0} padding={0} bg={bgColor}>


          <Navbarnew />



          <Routes>
            <Route path='/' element={<Hero />}></Route>
            <Route path='/login' element={<Loginnew />}></Route>
            <Route path='/signup' element={<Signupnew />}></Route>
            <Route path="/number-verification" element={<ProtectedRoute><Numberwithotp /></ProtectedRoute>} />
            <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} >
              <Route index element={<TradeHistory />} />
              <Route path="tradehistory" element={<TradeHistory />} />
              <Route path="recentTradePartners" element={<RecentTradeHistory />} />
            </Route>
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/paymentMethod" element={<ProtectedRoute><PaymentMethod /></ProtectedRoute>} />


          </Routes>




          <Footer />




        </Container>
      </AuthProvider>

    </>
  )
}

export default App
