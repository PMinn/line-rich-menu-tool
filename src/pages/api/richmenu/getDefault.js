export const config = {
    api: {
        bodyParser: {
            bodyParser: true
        },
    },
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ status: 0, message: '只允許 POST requests' })
        return;
    }
    try {
        const { token } = JSON.parse(req.body);
        const response = await fetch("https://api.line.me/v2/bot/user/all/richmenu", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status !== 200) throw new Error("無效 token");
        const json = await response.json();
        res.json({ status: 1, data: json });
    } catch (e) {
        res.status(405).json({ status: 0, message: e });
    }
}