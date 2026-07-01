const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => { 
    res.render('index');    
});

let submissions= [];

app.post('/submit', (req,res) => {
    const {name, email, age, password } = req.body;
    let errors = [];

    if (!name || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters')
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        errors.push('Please enter a valid email address.');
    }

    if (!age || age < 1 || age > 120) { 
        errors.push('Please enter a valid age.');
    }
       

    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters.');
    }

    if (errors.length > 0) {
        return res.render('errors', { errors: errors });
    }

    submissions.push({name,email,age});
    console.log('Stored submisssions so far:' , submissions);

    res.render('result', {name:name, email: email});

}); 

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
