const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Layout Engine
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout'); // Default layout
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session Config
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000 * 7,
    createDatabaseTable: true
});

app.use(session({
    key: 'portfolio_session',
    secret: process.env.SESSION_SECRET || 'secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 7 days
}));

app.use(flash());

// Global Variables for Views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user || null;
    res.locals.path = req.path;
    next();
});

// Visitor Logging (tracks page visits with IP + geolocation)
const visitorLogger = require('./middlewares/visitorLogger');
app.use(visitorLogger);

// Global Profile Context (Navbar/Footer)
const globalContext = require('./middlewares/globalContext');
app.use(globalContext);

// Routes
app.use('/', require('./routes/publicRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
