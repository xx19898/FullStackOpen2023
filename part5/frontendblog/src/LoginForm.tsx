import React from "react";


const LoginForm = () => {

    return(
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
            console.log('SUBMITTED')
            }} className="form">
            <label>Username</label><input onChange={(e) => setUsername(e.target.value)}></input>
            <label>Password</label><input type="password" onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit" className="login-button">Login</button>
          </form>
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
}