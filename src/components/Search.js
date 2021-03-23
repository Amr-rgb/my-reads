import Book from "./Book"
import { useEffect, useState } from 'react'
import { search } from '../BooksApi'
import { IoCaretBackOutline } from 'react-icons/io5'
import { Link } from "react-router-dom"

export default function Search() {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState([])

    function changeHandler(e) {
        setQuery(e.target.value)
    }

    useEffect(() => {
        if (query !== '') {
            search(query)
                .then(data => {
                    if (data.error) {
                        throw Error('no results')
                    }
                    setBooks(data)
                })
                .catch(err => {
                    console.log('error: ', err)
                })
        }
    }, [query])

    return (
        <div className='search-page'>

            <div className="search-input">
                <Link to='/'><IoCaretBackOutline className='back-btn' /></Link>
                <input type="text" placeholder='Search for a book' autoFocus value={query} onChange={(e) => changeHandler(e)} />
            </div>

            <div className="search-results">
                <h3>results</h3>

                <div className="books">
                    {books && books.map(book => (
                        <Book book={book} shelf={book.shelf} key={book.id} />
                    ))}
                </div>
            </div>

        </div>
    )
}