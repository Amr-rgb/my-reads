import Book from './Book'

export default function Category({ books, shelf }) {

    return (
        <div className='category'>
            <h2>{shelf}</h2>

            <div className="books">
                {books.map(book => (
                    <Book book={book} shelf={shelf} key={book.id} />
                ))}
            </div>
        </div>
    )
}