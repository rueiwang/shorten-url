import crypto from 'crypto'
import ShortUrl from '../models/ShortUrl.js'

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex').slice(0, length)
}

async function generateUniqueShortUrl(length = 6) {
    let shortUrl;
    let isUnique = false;

    while(!isUnique) {
        shortUrl = generateRandomString(length);
        const isUrlExisted = await ShortUrl.findOne({shortUrl});
        if(!isUrlExisted) {
            isUnique = true;
        }
    }

    return shortUrl;
}

export default generateUniqueShortUrl;

