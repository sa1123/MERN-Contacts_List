const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var contactList = [
]

app.get('/', function(req, res){


    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error in fetching contacts');
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    });

});

app.post('/create-contact', function(req, res){


    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if (err){
            console.log('error in creating contact');
            return;
        }

        console.log(newContact);

        return res.redirect('back');
    });

});

app.listen(port, function(err){
    if (err) { 
        console.log('Error in running the server', err);
    }
    console.log('Running on:', port);
});

app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deletion");
            return;
        }
        return res.redirect('back');
    });

    
});