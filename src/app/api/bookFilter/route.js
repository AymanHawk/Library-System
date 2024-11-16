import clientPromise from "../../../lib/dbConnection/mongoDB";

export async function GET(req) {
    try {
        const headers = req.headers;
        const cleanArray = (arr) => arr.filter((item) => item !== '');
        const page = parseInt(headers.get('page')) || 1;
        const limit = parseInt(headers.get('limit')) || 10;
        const sortBy = headers.get('sortBy') || 'userRead';
        const order = headers.get('order') || 'asc';
        const genre = cleanArray(headers.get('genre')?.split(',') || []);
        const theme = cleanArray(headers.get('theme')?.split(',') || []);
        const pace = cleanArray(headers.get('pace')?.split(',') || []);
        const format =cleanArray( headers.get('format')?.split(',') || []);
        const language = cleanArray(headers.get('language')?.split(',') || []);
        const minRating = parseFloat(headers.get('minRating')) || 0;
        const maxRating = parseFloat(headers.get('maxRating')) || 5;
        const startDate = headers.get('startDate') || '1900-01-01';
        const endDate = headers.get('endDate') || new Date().toISOString();

        const skip = (page - 1) * limit;

        const client = await clientPromise
        const db = client.db('lib')

        const filterConditions = {
            ...(genre.length > 0 && {
                genre: { $in: genre }
            }),
            ...(theme.length > 0 && {
                $or: theme.map((t) => ({
                    [`reviewData.theme.${t}`]: { $gt: 50 },
                })),
            }),
            ...(pace.length > 0 && {
                $or: pace.map((p) => ({
                    [`reviewData.pace.${p}`]: { $gt: 50 },
                })),
            }),
            ...(format.length > 0 && {
                format: { $in: format }
            }),
            ...(language.length > 0 && {
                language: { $in: language }
            }),
            rating: {
                $gte: minRating, $lte: maxRating
            },
            publishDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        };

        let sortField;
        switch (sortBy) {
            case 'userRead':
              sortField = 'stats.userRead';
              break;
            case 'userLiked':
              sortField = 'stats.userLiked';
              break;
            case 'userRented':
              sortField = 'stats.userRented';
              break;
            case 'rating':
              sortField = 'rating';
              break;
            case 'publishDate':
              sortField = 'publishDate';
              break;
            case 'alpha':
              sortField = 'title';
              break;
            default:
              sortField = 'title';
          }

        const totalCount = await db.collection('books').countDocuments(filterConditions);
        const books = await db.collection('books')
                                .find(filterConditions)
                                .sort({[sortField]: order === 'asc' ? 1 : -1})
                                .project({ title: 1, author: 1, imgUrl: 1, isbn: 1, _id: 1, genre: 1, format: 1, length: 1, rating: 1})
                                .skip(skip)
                                .limit(limit)
                                .toArray();


        return new Response(JSON.stringify({ books, totalCount }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching books' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}