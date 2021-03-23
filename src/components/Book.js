import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md'
// import { TiTick } from 'react-icons/ti'
import { update } from '../BooksApi';
// import { useHistory } from 'react-router-dom'

export default function Book({ book, shelf }) {
    // const History = useHistory()
    const [value, setValue] = useState(shelf)

    const categories = [
        { shelf: "currentlyReading", text: 'Currently Reading' },
        { shelf: "wantToRead", text: 'Want To Read' },
        { shelf: "read", text: 'Read' },
    ]
    // let optionsDiv = document.querySelector(`.book-${book.id} #select`)

    // useEffect(() => {
    //     setTimeout(() => optionsDiv = document.querySelector(`.book-${book.id} ul.options`), 0)
    // }, [])

    function changeHandler(e) {
        e.preventDefault()
        if (e.target.value === shelf) {
            return
        }
        setValue(e.target.value)
        update(book, e.target.value)
            .then(_ => {
                // History.push('/')
                if (window.location.pathname === '/') window.location.reload(false)
            })
            .catch(err => {
                console.log('error: ', err)
            })
        // optionsDiv.style.display = 'none'
    }

    return (
        <div className={`book book-${book.id}`} key={book.id}
            style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}>

            <div className="book-info">
                <p><span>title:</span> {book.title}</p>
                <p><span>authors:</span> {book.authors.join(', ')}</p>
            </div>

            <div className="dropdown">
                <MdArrowDropDown className='bottom-arrow' onClick={() => {
                    // optionsDiv.
                }} />

                <select name="category" id="select" value={value} onChange={(e) => changeHandler(e)}>
                    {categories.map(book => (
                        <option
                            value={book.shelf}
                            key={book.shelf}
                        >{`${book.shelf === shelf ? '✔' : ''} ${book.text}`}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}