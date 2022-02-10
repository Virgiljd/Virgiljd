const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blog');

//express app
const app = express();

//connect to mongodb
//const dbURI = "mongodb+srv://Virgil:Virgil123456@cluster0.lypeq.mongodb.net/node-db?retryWrites=true&w=majority";
//mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    //.then((result) => console.log('connected to db'))
    //.then((result) => app.listen(3000))
    //.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) =>{
    const blog = new Blog({
        title: 'new blog 5',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) =>{
            res.send(result)
        })
        .catch((err) =>{
            console.log(err);
        });
})


app.get('/all-blogs', (req, res) =>{
    Blog.find()
        .then((result) =>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        });
})

app.get('/single-blog', (req, res) =>{
    Blog.findById('60affcdc820ba23a7069d50f')
        .then((result) =>{
            res.send(result)
        })
        .catch((err) =>{
            console.log(err);
        });
})

app.get('/', (req, res) =>{
    const blogs = [
        {title: 'Making a healthy meal', snippets: 'This is a very interesting topic'},
        {title: 'Keeping fit daily', snippets: 'This is a very interesting topic'},
        {title: 'Building mental strength', snippets: 'This is a very interesting topic'},
    ];
    res.render('index16', { title: 'Home', blogs });
});

app.get('/about', (req, res) =>{
    res.render('about16', { title: 'About' });
});


app.get('/blogs/create', (req, res) =>{
    res.render('create16', { title: 'Create a new Blog' });
});

//404 page      position of this is very important
app.use((req, res) =>{
    res.status(404).render('404-16', { title: '404' });
});


