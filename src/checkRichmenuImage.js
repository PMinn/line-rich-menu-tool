import { writeFile, existsSync } from 'fs';
import fetch from 'node-fetch';

export default async function checkRichmenuImage(token, id) {
    return new Promise(async (resolve, reject) => {
        const savePath = `./public/richmenu/${id}.jpg`;
        const imagePath = `/richmenu/${id}.jpg`;
        try {
            if (existsSync(savePath)) {
                return resolve(imagePath);
            } else {
                const response = await fetch(`https://api-data.line.me/v2/bot/richmenu/${id}/content`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const buffer = await response.arrayBuffer();
                writeFile(savePath, buffer, () => resolve(imagePath));
            }
        }
        catch (err) {
            console.error(err)
            resolve(imagePath)
        }
    })
}