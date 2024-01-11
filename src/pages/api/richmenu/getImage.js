export const config = {
    api: {
        bodyParser: {
            bodyParser: true
        },
    },
}

export default async function handler(req, res) {
    function _arrayBufferToBase64(buffer) {
        // var binary = '';
        // var bytes = new Uint8Array(buffer);
        // var len = bytes.byteLength;
        // for (var i = 0; i < len; i++) {
        //     binary += String.fromCharCode(bytes[i]);
        // }
        return Buffer.from(buffer).toString('base64');
    }

    if (req.method !== 'POST') {
        res.status(405).json({ status: 0, message: '只允許 POST requests' })
        return;
    }
    try {
        const { id, token } = JSON.parse(req.body);
        const response = await fetch(`https://api-data.line.me/v2/bot/richmenu/${id}/content`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status !== 200) throw new Error("無效 token");
        const buffer = await response.arrayBuffer();
        const base64String =_arrayBufferToBase64(buffer);
        res.json({ status: 1, data: base64String });
    } catch (e) {
        res.status(405).json({ status: 0, message: e });
    }
}