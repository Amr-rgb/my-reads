import logo from './../imgs/logo.svg'
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Header() {

    return (
        <div className='header'>
            <Link to="/" id='logo'><img src={logo} alt="logo" /></Link>

            <div className="search-input">
                <FiSearch className='search-icon' />
                <Link to='/search' ><input type="text" placeholder='Search for a book' /></Link>

            </div>
        </div>
    )
}