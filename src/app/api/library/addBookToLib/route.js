import {connect} from '../../../../lib/dbConnection/mongoose';
import Library from '../../../../lib/models/library';
import Book from '../../../../lib/models/books';

export async function POST(req) {
    try{
        await connect();
        const body = await req.json();
        const {title, author, lang, format, libId} = body;
        const publisher = body.publisher || "Not Found";
        const length = body.length || "Not Found";
        const date =  new Date(body.date) || new Date('1900-01-01')
        const desc = body.desc || "N/A"
        const genre = body.genre.split(',');
        const isbn = parseInt(body.isbn);
        const imgSrc = body.imgSrc || "N/A";

        console.log(genre);

        if(!libId || !title) {
            return new Response(JSON.stringify({ success: false, message: 'Missing data in request' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const newBook = await Book({
            title: title,
            author: author,
            length: length,
            genre: genre,
            description: desc,
            publishDate: date,
            imgUrl: imgSrc,
            isbn: isbn,
            publishName: publisher,
            format: format,
            language: lang,
        }) 

        await newBook.save();

        const bookId = newBook._id

        if(!bookId) {
            return new Response(JSON.stringify({ success: false, message: 'Error getting book ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }); 
        }
   
        const library = await Library.findOne({ authId: libId });


        if (!library) {
            return new Response(JSON.stringify({ success: false, message: 'Library not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        library.bookStock = library.bookStock || [];


        const existingBook = library.bookStock.find(stock => stock.bookId.equals(bookId));

        if (existingBook) {
            existingBook.amount += 1;
        } else {
            library.bookStock.push({ bookId: bookId, amount: 1 });
        }

        await library.save();


        return new Response(JSON.stringify({ success: true, inventory: library.bookStock, newBook: bookId }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

        

    }catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}