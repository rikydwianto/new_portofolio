const Timeline = require('../../models/Timeline');

exports.list = async (req, res) => {
    try {
        const items = await Timeline.findAll();
        res.render('admin/timeline/list', {
            layout: 'layouts/admin-layout',
            active: 'timeline',
            items
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

exports.createForm = (req, res) => {
    res.render('admin/timeline/form', {
        layout: 'layouts/admin-layout',
        active: 'timeline',
        item: null
    });
};

exports.store = async (req, res) => {
    const { year_range, title, subtitle, description, type, order_index } = req.body;
    try {
        await Timeline.create({ year_range, title, subtitle, description, type, order_index });
        req.flash('success_msg', 'Timeline item added');
        res.redirect('/admin/timeline');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding timeline item');
        res.redirect('/admin/timeline');
    }
};

exports.editForm = async (req, res) => {
    try {
        const item = await Timeline.findById(req.params.id);
        res.render('admin/timeline/form', {
            layout: 'layouts/admin-layout',
            active: 'timeline',
            item
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/timeline');
    }
};

exports.update = async (req, res) => {
    const { year_range, title, subtitle, description, type, order_index } = req.body;
    try {
        await Timeline.update(req.params.id, { year_range, title, subtitle, description, type, order_index });
        req.flash('success_msg', 'Timeline item updated');
        res.redirect('/admin/timeline');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating timeline item');
        res.redirect('/admin/timeline');
    }
};

exports.delete = async (req, res) => {
    try {
        await Timeline.delete(req.params.id);
        req.flash('success_msg', 'Timeline item deleted');
        res.redirect('/admin/timeline');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error deleting timeline item');
        res.redirect('/admin/timeline');
    }
};
