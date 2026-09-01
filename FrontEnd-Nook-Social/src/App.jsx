import { Routes, Route, Navigate } from 'react-router-dom'
import Post from './pages/post/post'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import axios from 'axios'
import { message } from 'antd'
import './App.css'
import { baseURL } from './core'
import { useEffect } from 'react'
import { store } from './store/states'
import Loadingpage from './pages/Loadingpage/Loadingpage'
import Profile from './pages/profile/profile'

function App() {
  const { globalLogin, globalLogout, user, islogin } = store()

  console.log({ user, islogin })

  useEffect(() => {
    get_profile()
  }, [])

  const get_profile = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      if (globalLogout) globalLogout()
      return
    }

    try {
      const response = await axios.get(`${baseURL}/api/v1/profile`, {
        headers: {
          token: token
        }
      })
      // console.log(response.data.data)
      globalLogin(response.data.data)
    } catch (error) {
      console.error(error)
      message.error(error?.response?.data?.message || error.message)
      if (globalLogout) globalLogout()
    }
  }

  return (
    <>
      {islogin == null ? <Loadingpage /> : null}

      {islogin == true ? (
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : null}

      {islogin == false ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : null}
    </>
  )
}

export default App