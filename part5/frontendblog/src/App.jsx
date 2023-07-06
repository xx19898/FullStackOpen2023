import { useState } from 'react';
import './App.css'
import axios from 'axios';
import UserInfo from './UserInfo';
import BlogCreationForm from './BlogCreationForm';
import Notification from './Notification';

const BACKEND_URL = 'http://localhost:80'

function App(){
  const [loginState,setLoginState] = useState('inProcess')
  const  [loggedInInfo,setLoggedInInfo] = useState({username:null,token:null})
  const [blogs,setBlogs] = useState([])
  
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const [notificationActive,setNotificationActive] = useState(false)
  const [notificationText,setNotificationText] = useState('')

  //console.log({token:loggedInInfo.token})
  console.log({username:loggedInInfo.username})

  return (
    <div>
      {
        notificationActive ? <Notification text={notificationText}/> : null
      }
      
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
        console.log('SUBMITTED')
        }} className="form">
        <label>Username</label><input onChange={(e) => setUsername(e.target.value)}></input>
        <label>Password</label><input type="password" onChange={(e) => setPassword(e.target.value)}></input>
        <button type="submit" className="login-button">Login</button>
      </form>
      {
        loginState === 'success' 
        ? 
        <>
        <UserInfo blogs={blogs} userInfo={loggedInInfo}/>
        <BlogCreationForm refetchBlogs={refetchBlogs} createBlog={createBlog} token={loggedInInfo.token} username={loggedInInfo.username}/>
        </>
        : <p>Login unsuccessful,please check your credentials</p>
      }
    </div>
  )

  async function handleSubmit(){
    try{
      const response = await (signIn(username,password))
      console.log({response})
      console.log({status:response.status})
    if(response.status === 200){
      const blogs = await getBlogs(response.data.user,response.data.token)
      setBlogs(blogs)
      setLoginState('success')
      console.log({response:response.data})
      setLoggedInInfo({token:response.data.token,username:response.data.username})
    }else{
      setLoginState('failed')
      showNotification('Login failed, please check your credentials')
    }
    }catch(e){
      console.log({error:e.message})
    }
  }

  async function signIn(username,password){
      const response = await axios({
        method:'post',
        url:`${BACKEND_URL}/api/users/login`,
        data:{username:username,password:password},
        withCredentials:false,
    })
      return response
  }

  async function refetchBlogs(){
      const response = await getBlogs(loggedInInfo.username,loggedInInfo.token)
      setBlogs(response)
  }

  async function getBlogs(username,token){
      const response = await axios({
        method:'get',
        url: `${BACKEND_URL}/api/blogs`,
        withCredentials: false,
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      return response.data
  }

  function createBlog(username,token,blog){
      const response = axios({
        method:'post',
        url: `${BACKEND_URL}/api/blogs`,
        headers:{
          Authorization:`Bearer ${token}`
        },
        data:{
          blog
        }
      })
      return response
  }

  async function showNotification(text){
      setNotificationText(text)
      setNotificationActive(true)
      setTimeout(() => setNotificationActive(false),4000)

  }
}

export default App
