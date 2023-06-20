import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import engine from 'ejs-locals';

import api from './api.js';
import checkRichmenuImage from './checkRichmenuImage.js';

const app = express();

app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'));

app.use(session({
    name: 'testSession',
    secret: 'test session secret',
    resave: false, // 使沒有修改也強制存回 session store, 預設為 true
    saveUninitialized: false, // 強制將新的session存回 session store
    cookie: {
        httpOnly: true,
        maxAge: 360 * 24 * 60 * 60 * 1000 // 1年
    }
}))

app.use('/api', api);

app.get('/', (req, res) => res.render('index'));

app.post('/dashboard', (req, res) => {
    req.session.token = req.body.token;
    fetch("https://api.line.me/v2/bot/richmenu/list", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${req.session.token}`
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response.richmenus)
            Promise.all(response.richmenus.map(richmenu => checkRichmenuImage(req.session.token, richmenu.richMenuId)))
                .then(images => {
                    res.render('dashboard', {
                        richmenus: response.richmenus,
                        images
                    })
                })
        });
})

app.listen(3000);