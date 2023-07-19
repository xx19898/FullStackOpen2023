import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const LOGIN = gql`
    mutation login($username:String!,$password:String!){
        login(username: $username,password:$password){
            token
            favoriteGenre
        }
    }`
const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()

    const [login] = useMutation(
        LOGIN,{
            onCompleted:(data)  => {
                 localStorage.setItem(
                    'userInfo',
                    JSON.stringify({
                        token:data.login.token,
                        favoriteGenre: data.login.favoriteGenre
                    }))
                navigate('/')
            }
        })

    return(
        <form className="form" onSubmit={(e) => {
            e.preventDefault()
            login({variables:{username:username,password:password}})
        }}>
            <label>Username</label>
            <input onChange={(e) => setUsername(e.target.value)}/>
            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button>Login</button>
        </form>
    )
}

export default Login
