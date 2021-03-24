import React from 'react'
import Book from './Book'

export default function Category({ books, shelf, updateBooks }) {

    return (
        <div className='category'>
            <h2>{shelf}</h2>

            <div className="books">
                {books.map(book => (
                    <Book book={book} shelf={shelf} updateBooks={updateBooks} key={book.id} />
                ))}
            </div>
        </div>
    )
}