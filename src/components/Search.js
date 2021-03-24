import React from 'react'
import Book from "./Book"
import { useEffect, useState } from 'react'
import { getAll, search } from '../BooksApi'
import { IoCaretBackOutline } from 'react-icons/io5'
import { Link } from "react-router-dom"

export default function Search() {
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState([])
    const [mainBooks, setMainBooks] = useState([])

    function changeHandler(e) {
        setQuery(e.target.value)
    }

    useEffect(() => {
        updateBooks()
    }, [])

    useEffect(() => {
        if (query !== '') {
            search(query)
                .then(data => {
                    if (data.error) {
                        throw Error('no results')
                    }
                    const mybooks = data

                    //from stackoverflow
                    for (let i = mybooks.length - 1; i >= 0; i--) {
                        for (let j = 0; j < mainBooks.length; j++) {
                            if (mybooks[i] && (mybooks[i].id === mainBooks[j].id)) {
                                mybooks.splice(i, 1);
                                mybooks.push(mainBooks[j])
                            }
                        }
                    }
                    setBooks(mybooks)
                })
                .catch(err => {
                    console.log('error: ', err)
                })
        }
    }, [query, mainBooks])

    function updateBooks() {
        getAll()
            .then(data => {
                setMainBooks(data)
            }).catch(err => {
                console.log('error: ', err)
            })
    }

    return (
        <div className='search-page'>

            <div className="search-input">
                <Link to='/'><IoCaretBackOutline className='back-btn' /></Link>
                <input type="text" placeholder='Search for a book' autoFocus value={query} onChange={(e) => changeHandler(e)} />
            </div>

            <div className="search-results">
                <h3>results</h3>

                {query && <div className="books">
                    {books && books.map(book => (
                        <Book book={book} shelf={book.shelf} updateBooks={updateBooks} key={book.id} />
                    ))}
                </div>}
            </div>

        </div>
    )
}