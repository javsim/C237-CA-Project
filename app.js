//import express js 
const exp = require('express');
//import sql
const mysql = require('mysql2');
//create instance for exp
const app = exp();
//setup view engine
app.set('view engine', 'ejs');
// enable static files
app.use(exp.static('public'));
//import multer
const multer = require('multer');
//setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/images'); //directory to save uploaded files
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});

const upload = multer({storage:storage});
//create mysql connection
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'carlist',
port: 3316
});
connection.connect((err)=>{
    if (err){
        console.error('Error connecting mySQL', err);
        return;
    }
    console.log('Connected to mySQL database');
});
//enable form processing
app.use(exp.urlencoded({extended: false}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//route to display inventory
app.get('/', (req, res)=>{
    const sql = 'SELECT * FROM cars';
    //fetch data from mySQL
    connection.query(sql, (error, results)=>{
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retreiving cars');
        }
        res.render('index', {cars : results});
    });
})

//route to retrieve product info by id
app.get('/car/:id', (req, res)=>{
    const carId = req.params.id;
    const sql = 'SELECT * FROM cars WHERE carId = ?';
    //fetch data from sql
    connection.query(sql, [carId], (error, results) => {
        if (error) {    
            console.error("Database query error:", error.message);
            return res.status(500).send('Error retreiving cars');
        }
        //check if any product with the given id was found
        if (results.length > 0){
            res.render('car', { car: results[0] }); // Render HTML page with data
        }
        else{
            res.status(404).send('car not found'); //if no product found with given id 
        }
    });

});

//route to display sedan
app.get('/sedan', (req, res)=>{
    const sql = 'SELECT * FROM cars';
    //fetch data from mySQL
    connection.query(sql, (error, results)=>{
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retreiving cars');
        }
        res.render('sedan', {cars : results});
    });
});

////route to display suv
app.get('/suv', (req, res)=>{
    const sql = 'SELECT * FROM cars';
    //fetch data from mySQL
    connection.query(sql, (error, results)=>{
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retreiving cars');
        }
        res.render('suv', {cars : results});
    });
});
    
//route to display luxury
app.get('/luxury', (req, res)=>{
    const sql = 'SELECT * FROM cars';
    //fetch data from mySQL
    connection.query(sql, (error, results)=>{
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retreiving cars');
        }
        res.render('luxury', {cars : results});
    });
});

//route to display mpv
app.get('/mpv', (req, res)=>{
    const sql = 'SELECT * FROM cars';
    //fetch data from mySQL
    connection.query(sql, (error, results)=>{
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retreiving cars');
        }
        res.render('mpv', {cars : results});
    });
});

//route to contact 
app.get('/contact', (req, res)=>{
    res.render('contact');
})

app.post('/contact', upload.single('image'), (req, res)=>{
    const {name, email, message} = req.body;
    let image;
    if (req.file){
        image = req.file.filename; // save only the filename
    }
    else{
        image = null;
    }
    const sql = 'INSERT INTO inquiry (name, email, image, comments) VALUES (?,?,?,?)';
    connection.query(sql, [name, email, message, image], (error, results)=>{
        if (error){
            //an error occurs when adding prodcut
            console.error('Error sending message:', error.message);
            res.status(500).send('Error sending message');
        }
        else{
            //send a success response
            res.redirect('/');
        }
    })
})

//route to cart without specifying the car intending to rent
app.get('/cart', (req, res)=>{
    const sql = 'SELECT * FROM cars';
    //fetch data from mySQL
    connection.query(sql, (error, results)=>{
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retreiving products');
        }
        res.render('cart', {car : results});
    });
});

//add choosen car to cart for rent
app.get('/cart/:id', (req, res)=>{
    const carId = req.params.id;
    const sql = 'SELECT * FROM cars WHERE carId = ?';
    //fetch data from sql
    connection.query(sql, [carId], (error, results) => {
        if (error) {    
            console.error("Database query error:", error.message);
            return res.status(500).send('Error retreiving car');
        }
        //check if any product with the given id was found
        if (results.length > 0){
            res.render('cart', { car: results[0] }); // Render HTML page with data
        }
        else{
            res.status(404).send('car not found'); //if no product found with given id 
        }
    });

});


//add customer to database
app.post('/cart', (req, res)=>{
    //extract customer data from the req body
    const {car, name, license, dob, contact, location, postal, startdate, enddate} = req.body;

    const sql = 'INSERT INTO customers (car, name, license, dob, contact, location, postal, startdate, enddate) VALUES(?,?,?,?,?,?,?,?,?)';
    //insert new customer into database
    connection.query(sql, [car, name, license, dob, contact, location, postal, startdate, enddate], (error, results)=>{
        if (error){
            //an error occurs when adding customer
            console.error('Error adding car:', error.message);
            res.status(500).send('no cars added to cart');
        }
        else{
            //send a success response
            res.redirect('/booking');
        }
    });
});

//route to booking
app.get('/booking', (req, res)=>{
    const sql = 'SELECT * FROM customers';
    //fetch data from mySQL
    connection.query(sql, (error, results)=>{
        if (error){
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retreiving bookings');
        }
        res.render('booking', {customers : results});
    });
});

//edit booking
app.get('/editBooking/:id', (req, res)=>{
    const customerId = req.params.id;
    const sql = 'SELECT * FROM customers WHERE customerId = ?';
    //fetch customer data from sql
    connection.query(sql, [customerId], (error, results)=>{
        if (error) {    
            console.error("Database query error:", error.message);
            return res.status(500).send('Error retreiving booking');
        }
        //check if any booking with the given id was found
        if (results.length > 0){
            res.render('editBooking', { customer: results[0] }); // Render HTML page with data
        }
        else{
            res.status(404).send('Booking not found'); //if no booking found with given id 
        }
    });
});

//update the new edited booking
app.post('/editBooking/:id', (req, res)=>{
    const customerId = req.params.id;
    //extract customer data from request body
    const {car, name, license, dob, contact, location, postal, startdate, enddate} = req.body;

    const sql = 'UPDATE customers SET car =?, name =?, license =?, dob =?, contact =?, location =?, postal =?, startdate =?, enddate =? WHERE customerId =?';
    //insert new updated booking into database
    connection.query(sql, [car, name, license, dob, contact, location, postal, startdate, enddate, customerId], (error, results)=>{
        if (error){
            //handle any error that occurs during the database operation
            console.error("Error updating booking:", error.message);
            res.status(500).send('Error updating booking');
        }
        else{
            res.redirect('/booking');
        }
    });
});

//delete booking 
app.get('/deleteBooking/:id', (req, res)=>{
    const customerId = req.params.id;
    //delete selected booking from database
    const sql = 'DELETE FROM customers WHERE customerId =?';
    connection.query(sql, [customerId], (error, results)=>{
        if (error){
            //handle any error that occurs during database operation
            console.error('Error deleting booking', error.message)
            res.status(500).send('Error deleting booking');
        }
        else{
            //send a success response
            res.redirect('/booking');
        }
    });
});

//start server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
