import {Link} from 'react-router-dom'
import {useState} from 'react';
import './Navigation.css'
import { isAuthorized } from '../authComp/authUtility';

export const Navigation = () => {
    const [active,setActive] = useState('books')

    const authorization = isAuthorized()
    const authOk = authorization ? true : false
    console.log({authorization})

    return(
        <nav className="main-navigation">
            <Link className="nav-button" to={'/books'} onClick={() => {setActive('books')}}>{active === 'books' ? <strong>Books</strong> : <>Books</>}</Link>
            <Link className="nav-button" to={'/authors'} onClick={() => {setActive('authors')}}>{active === 'authors' ? <strong>Authors</strong> : <>Authors</>}</Link>
            {
                authOk ?
                <>
                <Link className="nav-button" to={'/newbook'} onClick={() => {setActive('newbook')}}>{active === 'newbook' ? <strong>Create new book</strong> : <>Create new book</>}</Link>
                <Link className="nav-button" to={'/newauthor'} onClick={() => setActive('newauthor')}>{active === 'newauthor' ? <strong>Create new author</strong> : <>Create new author</>}</Link>
                <Link className="nav-button" to={'/setbirthdate'} onClick={() => setActive('editbirthdate')}>{active === 'editbirthdate' ? <strong>Edit author birthdate</strong> : <>Edit author birthdate</>}</Link>
                <Link className="nav-button" to={'/'} onClick={ () => {
                    setActive('books')
                    localStorage.clear();
                    }} >Logout</Link>
                </>
                :
                <>
                <Link className="nav-button" to={'/login'} onClick={() => {setActive('login')}}>{active === 'login' ? <strong>Login</strong> : <>Login</>}</Link>
                <Link  className="nav-button"to={'/signUp'} onClick={() => {setActive('signUp')}}>{active === 'signUp' ? <strong>Sign Up</strong> : <>Sign up</>}</Link>
                </>
            }
        </nav>
    )
}