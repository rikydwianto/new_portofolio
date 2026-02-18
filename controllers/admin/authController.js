const User = require('../../models/User');
const bcrypt = require('bcryptjs');

exports.loginForm = (req, res) => {
    res.render('admin/login', { layout: false, title: 'Admin Login' });
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
            req.session.user = { id: user.id, username: user.username, full_name: user.full_name };
            console.log('Login successful:', req.session.user);
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

exports.accountForm = async (req, res) => {
    try {
        // Fetch fresh user data from DB
        const user = await User.findById(req.session.user.id);
        res.render('admin/auth/account', {
            layout: 'layouts/admin-layout',
            title: 'My Account',
            user: user
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

exports.updateAccount = async (req, res) => {
    const { username, full_name, password, new_password, confirm_password } = req.body;
    try {
        const user = await User.findById(req.session.user.id);

        // Verify current password first
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            req.flash('error_msg', 'Current password incorrect');
            return res.redirect('/admin/account');
        }

        let newPasswordHash = null;
        if (new_password) {
            if (new_password !== confirm_password) {
                req.flash('error_msg', 'New passwords do not match');
                return res.redirect('/admin/account');
            }
            newPasswordHash = await bcrypt.hash(new_password, 10);
        }

        await User.update(user.id, username, newPasswordHash, full_name);

        // Update session
        req.session.user.username = username;
        req.session.user.full_name = full_name;

        req.flash('success_msg', 'Account updated successfully');
        res.redirect('/admin/account');

    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating account');
        res.redirect('/admin/account');
    }
};
