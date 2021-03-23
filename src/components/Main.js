import { getAll } from './../BooksApi'
import { useEffect, useState } from 'react'
import Category from './Category'
import Header from './Header'

export function Main() {
    const [books, setBooks] = useState(null)
    const [currentlyReading, setCurrentlyReading] = useState(null)
    const [wantToRead, setWantToRead] = useState(null)
    const [read, setRead] = useState(null)

    useEffect(() => {
        getAll()
            .then(data => {
                setBooks(data)
                setCurrentlyReading(data.filter(b => b.shelf === 'currentlyReading'))
                setWantToRead(data.filter(b => b.shelf === 'wantToRead'))
                setRead(data.filter(b => b.shelf === 'read'))
            }).catch(err => {
                console.log('error: ', err)
            })
    }, [])

    return (
        <>
            <Header />

            <main>
                {books && (
                    <div className="categories">
                        {currentlyReading && <Category
                            books={currentlyReading}
                            shelf='currentlyReading'
                        />}
                        {wantToRead && <Category
                            books={wantToRead}
                            shelf='wantToRead'
                        />}
                        {read && <Category
                            books={read}
                            shelf='read'
                        />}
                    </div>
                )}

            </main >
        </>
    )
}