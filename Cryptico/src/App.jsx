import { useState } from 'react'
import './App.css'
import Navbarnew from './CustomComponents/Navbar/Navbarnew'
import Footer from './CustomComponents/Footer/Footer'
import Hero from './CustomComponents/HeroSection/Hero'
import { Container, Flex, Box, useColorModeValue } from '@chakra-ui/react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Signupnew from './CustomComponents/LoginSignup/Signupnew'
import Loginnew from './CustomComponents/LoginSignup/Loginnew'
import UserDashboard from './CustomComponents/Afterlogin/UserDashboard/UserDashboard'
import Numberwithotp from './CustomComponents/LoginSignup/Numberwithotp'
import Profile from './CustomComponents/Afterlogin/Profile'
import TradeHistory from './CustomComponents/Afterlogin/UserDashboard/TradeHistory'
import RecentTradeHistory from './CustomComponents/Afterlogin/UserDashboard/RecentTradeHistory'
import PaymentMethod from './CustomComponents/Afterlogin/UserDashboard/PaymentMethod'
import ProtectedRoute from './CustomComponents/AuthContext/ProtectedRoute'
import { AuthProvider } from './Context/AuthContext'
import Buy from './CustomComponents/Buy&Sell/Buy'
import CreateOffers from './CustomComponents/Offers/CreateOffers'
import UserProvider from './Context/userContext'
import Sell from './CustomComponents/Buy&Sell/Sell'
import Redirect from './CustomComponents/LoginSignup/Redirect'
import Wallet from './CustomComponents/Wallet/Wallet'
import BuyNew from './CustomComponents/Buy&Sell/BuyNew'
import SellNew from './CustomComponents/Buy&Sell/SellNew'
import Balance from './CustomComponents/Wallet/Balance'
import Transaction from './CustomComponents/Wallet/Transaction'
import Addresses from './CustomComponents/Wallet/Addresses'
import Convert from './CustomComponents/Wallet/Convert'
import TradeHistoryNew from './CustomComponents/Afterlogin/UserDashboard/TradeHistoryNew'
import OtherDetailProvider from './Context/otherContext'
import PasswordReset from './CustomComponents/LoginSignup/PasswordReset'
import ForgetPassword from './CustomComponents/LoginSignup/ForgetPassword'

function App() {
  const [count, setCount] = useState(0)
  const bgColor = useColorModeValue("#f5f7fa", "gray.900");

  return (
    <>



      <AuthProvider>
        <UserProvider>
          <OtherDetailProvider>

            <Container maxW={'container.xxl'} margin={0} padding={0} bg={bgColor}>
              <Box position={'fixed'} top={0} left={0} right={0} zIndex={1}>

                <Navbarnew />
              </Box>





              <Routes>
                <Route path='/' element={<Hero />}></Route>
                <Route path='/login' element={<Loginnew />}></Route>
                <Route path='/signup' element={<Signupnew />}></Route>
                <Route path="/number-verification" element={<ProtectedRoute><Numberwithotp /></ProtectedRoute>} />
                <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} >
                  <Route index element={<TradeHistoryNew />} />
                  <Route path="tradehistory" element={<TradeHistoryNew />} />
                  <Route path="recentTradePartners" element={<RecentTradeHistory />} />
                </Route>
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/paymentMethod" element={<ProtectedRoute><PaymentMethod /></ProtectedRoute>} />
                <Route path='/buy' element={<ProtectedRoute><BuyNew /></ProtectedRoute>} />
                <Route path='/sell' element={<ProtectedRoute><SellNew /></ProtectedRoute>} />
                <Route path='/createOffers' element={<ProtectedRoute><CreateOffers /></ProtectedRoute>} />
                <Route path='/redirect' element={<Redirect />}></Route>
                <Route path='/wallet' element={<ProtectedRoute><Wallet /></ProtectedRoute>} >
                  <Route index element={<Balance />} />
                  <Route path='balance' element={<Balance />} />
                  <Route path='transactions' element={<Transaction />} />
                  <Route path='addresses' element={<Addresses />} />
                  <Route path='convert' element={<Convert />} />
                </Route>
                <Route path='password-reset/:token' element={<PasswordReset />} />
                <Route path='forget' element={<ForgetPassword />}></Route>

              </Routes>



              <Footer />




            </Container>
          </OtherDetailProvider>

        </UserProvider>

      </AuthProvider>

    </>
  )
}

export default App
