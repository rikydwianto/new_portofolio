const VisitorLog = require('../../models/VisitorLog');

exports.index = async (req, res) => {
    try {
        const stats = await VisitorLog.getStats();
        res.render('admin/visitors/index', {
            layout: 'layouts/admin-layout',
            title: 'Visitor Analytics',
            stats,
            currentPage: 'visitors'
        });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Failed to load visitor data');
        res.redirect('/admin/dashboard');
    }
};

exports.logs = async (req, res) => {
    try {
        const logs = await VisitorLog.findAll(200);
        res.render('admin/visitors/logs', {
            layout: 'layouts/admin-layout',
            title: 'Visitor Logs',
            logs,
            currentPage: 'visitors'
        });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Failed to load visitor logs');
        res.redirect('/admin/dashboard');
    }
};
