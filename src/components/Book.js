import React from 'react'
import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md'
import { update } from '../BooksApi';

export default function Book({ book, shelf, updateBooks }) {
    const [value, setValue] = useState(shelf ? shelf : 'none')

    const categories = [
        { shelf: "currentlyReading", text: 'Currently Reading' },
        { shelf: "wantToRead", text: 'Want To Read' },
        { shelf: "read", text: 'Read' },
    ]

    const styleWithoutImage = { background: 'grey' }

    function changeHandler(e) {
        e.preventDefault()
        if (e.target.value === shelf) {
            return
        }
        setValue(e.target.value)
        update(book, e.target.value)
            .then(_ => updateBooks())
            .catch(err => {
                console.log('error: ', err)
            })
    }

    return (
        <div className={`book book-${book.id}`} key={book.id}
            style={book.imageLinks ? { backgroundImage: `url(${book.imageLinks.thumbnail})` } : styleWithoutImage}>

            <div className="book-info">
                <p><span>title:</span> {book.title}</p>
                <p><span>authors:</span> {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</p>
            </div>

            <div className="dropdown">
                <MdArrowDropDown className='bottom-arrow' />

                <select name="category" id="select" value={value} onChange={(e) => changeHandler(e)}>
                    <option value='moveto' disabled>move to...</option>
                    {categories.map(book => (
                        <option
                            value={book.shelf}
                            key={book.shelf}
                        >{`${book.shelf === shelf ? '✔' : ''} ${book.text}`}</option>
                    ))}
                    <option value='none'>{`${value === 'none' ? '✔' : ''} none`}</option>
                </select>
            </div>
        </div>
    )
}