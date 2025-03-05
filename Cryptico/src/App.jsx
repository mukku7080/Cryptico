import { useState } from 'react'
import './App.css'
import Navbarnew from './CustomComponents/Navbar/Navbarnew'
import Footer from './CustomComponents/Footer/Footer'
import Hero from './CustomComponents/HeroSection/Hero'
import { Container, Flex, Box, useColorModeValue } from '@chakra-ui/react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
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
import { AnimatePresence } from 'framer-motion'
import { motion } from "framer-motion";

import PageLoader from './CustomComponents/Animation/PageLoader'
import BuySellWithNotification from './CustomComponents/Buy&Sell/BuySellWithNotification'

function App() {
  const [count, setCount] = useState(0)
  const bgColor = useColorModeValue("#f5f7fa", "gray.900");
  const location = useLocation();
  const isTopLevelRoute = location.pathname.split('/').length <= 2;

  return (
    <>



      <AuthProvider>
        <UserProvider>
          <OtherDetailProvider>


            <Container maxW={'container.xxl'} margin={0} padding={0} bg={bgColor} display={'flex'} flexDirection={'column'}>
              {/* <Box  zIndex={1}> */}

              <motion.div
                initial={{ opacity: 0, y: -20 }} // Start position
                animate={{ opacity: 1, y: 0 }}    // End position
                transition={{ duration: 0.5, ease: 'easeInOut' }} // Smooth transition
                style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
              >
                <Navbarnew />
                <BuySellWithNotification />
              </motion.div>
              {/* </Box> */}
              <AnimatePresence mode='wait'>
                <PageLoader key={location.pathname}>





                  <Routes location={location} key={location.pathname}>
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
                </PageLoader>

              </AnimatePresence>



              <Footer />




            </Container>


          </OtherDetailProvider>

        </UserProvider>

      </AuthProvider>

    </>
  )
}

export default App
