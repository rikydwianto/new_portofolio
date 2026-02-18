const User = require('../../models/User');
const bcrypt = require('bcryptjs');

exports.loginForm = (req, res) => {
    res.render('admin/login', { layout: false });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            req.flash('error_msg', 'Invalid username or password');
            return res.redirect('/admin/login');
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (isMatch) {
            req.session.user = user;
            res.redirect('/admin/dashboard');
        } else {
            req.flash('error_msg', 'Invalid username or password');
            res.redirect('/admin/login');
        }
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Server error');
        res.redirect('/admin/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
};
