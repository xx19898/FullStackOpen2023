import { gql, useMutation } from '@apollo/client';
import {useState} from 'react'

const SIGN_UP = gql`
    mutation signUp(
        $username: String!,
        $password: String!,
        $favoriteGenre: String
        ){
            signUp(
                username: $username,
                password: $password,
                favoriteGenre: $favoriteGenre){
                    username,
                    favoriteGenre
            }
        }`

const SignUp = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [favGenre,setFavGenre] = useState('');

    const {mutate} = useMutation(SIGN_UP,{
        onCompleted: (data) => {
            console.log({data});
        }});

    return(
        <form className="form" onSubmit={(e) => {
            e.preventDefault();
            mutate({username:username,password:password,favoriteGenre:favGenre})
        }}>
            <label>Username</label><input onChange={(e) => setUsername(e.target.value)}/>
            <label>Password</label><input onChange={(e) => setPassword(e.target.value)}/>
            <label>Favorite genre</label><input onChange={(e) => setFavGenre(e.target.value)}/>
            <button> Sign Up</button>
        </form>
    )
}

export default SignUp