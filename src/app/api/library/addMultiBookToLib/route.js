import { connect } from "../../../../lib/dbConnection/mongoose";
import Book from '../../../../lib/models/books'
import Library from '../../../../lib/models/library'

export async function GET(req) {
    try {
        await connect();
        const url = new URL(req.url);
        const booksQuery = url.searchParams.get('books');

        if (!booksQuery) {
            return new Response(JSON.stringify({ success: false, error: 'No books data found in the query' }), { status: 400 });
        }

        const bookArray = JSON.parse(decodeURIComponent(booksQuery));

        const isbns = bookArray.map(books => books.isbn);

        const foundBooks = await Book
            .find({ isbn: { $in: isbns } })
            .select('title author imgUrl isbn _id genre format length language');
        const result = bookArray.map(book => {
            const dbBook = foundBooks.find(dbBook => dbBook.isbn === parseInt(book.isbn));
            if(dbBook) {
                return { ...dbBook.toObject(), editable: false};
            } else {
                return { ...book, editable: true};
            }
        })

        return new Response(JSON.stringify({ result }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req) {
    try {
        await connect();
        const body = await req.json();
        const { libId, books } = body;
        const library = await Library.findOne({ authId: libId });

        // console.log(library)

        if (!library) {
            return new Response(JSON.stringify({ success: false, message: 'Library not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        library.bookStock = library.bookStock || [];

        const procBook = [];

        for (const book of books) {

            const { title, author, language, format, genre, isbn } = book;
            const dateParsed = new Date(book.publication_date) || new Date('1900-01-01');
            let genreArray;
            if ((typeof genre) === "object") {
                genreArray = genre
            } else {
                genreArray = genre.split(',');
            }
            const bookIsbn = parseInt(isbn);
            const publisher = book.publisher || "Not found"
            const desc = book.desc || "N/A"
            const length = book.length || "N/A"
            const img = book.imgSrc || "N/A";
            let existingBook = await Book.findOne({ isbn: bookIsbn });
            if (!existingBook) {
                const newBook = new Book({
                    title: title,
                    author: author,
                    length: length,
                    genre: genreArray,
                    publishDate: dateParsed,
                    imgUrl: img,
                    isbn: bookIsbn,
                    publishName: publisher,
                    format: format,
                    language: language,
                    description: desc,
                })
                await newBook.save();
               
                existingBook = newBook;
            }

            const existingLibBook = library.bookStock.find(stock => stock.bookId.equals(existingBook._id));
            if (existingLibBook) {
                existingLibBook.amount += 1;
            } else {
                library.bookStock.push({ bookId: existingBook._id, amount: 1 });
            }

            procBook.push(existingBook._id);
        }
        

    
        await library.save();
        console.log(library.bookStock);

        return new Response(JSON.stringify({ success: true, inventory: library.bookStock }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}