import {Link} from 'react-router-dom'
import {useState} from 'react';
import './Navigation.css'

export const Navigation = () => {
    const [active,setActive] = useState('books')
    
    return(
        <nav className="main-navigation">
            <Link className="navigation-link" to={'/books'} onClick={() => {setActive('books')}}>{active === 'books' ? <strong>Books</strong> : <>Books</>}</Link>
            <Link to={'/authors'} onClick={() => {setActive('authors')}}>{active === 'authors' ? <strong>Authors</strong> : <>Authors</>}</Link>
            <Link to={'/newbook'} onClick={() => {setActive('newbooks')}}>{active === 'newbook' ? <strong>Create new book</strong> : <>Create new book</>}</Link>
            <Link to={'/setbirthdate'} onClick={() => setActive('setbirthdate')}>{active === 'setbirthdate' ? <strong>Set birthdate</strong> : <>Set birthdate</>}</Link>
        </nav>
    )
}