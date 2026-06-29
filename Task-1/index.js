const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => { 
    res.render('index');    
});

app.post('/submit', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    res.render('result', { name: name, email: email });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
