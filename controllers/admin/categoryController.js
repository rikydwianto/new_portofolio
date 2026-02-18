const Category = require('../../models/Category');

exports.list = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('admin/categories/list', {
            layout: 'layouts/admin-layout',
            active: 'categories',
            categories
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

exports.createForm = (req, res) => {
    res.render('admin/categories/form', {
        layout: 'layouts/admin-layout',
        active: 'categories',
        category: null
    });
};

exports.store = async (req, res) => {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    try {
        await Category.create({ name, slug });
        req.flash('success_msg', 'Category added');
        res.redirect('/admin/categories');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding category');
        res.redirect('/admin/categories');
    }
};

exports.editForm = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.render('admin/categories/form', {
            layout: 'layouts/admin-layout',
            active: 'categories',
            category
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/categories');
    }
};

exports.update = async (req, res) => {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    try {
        await Category.update(req.params.id, { name, slug });
        req.flash('success_msg', 'Category updated');
        res.redirect('/admin/categories');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating category');
        res.redirect('/admin/categories');
    }
};

exports.delete = async (req, res) => {
    try {
        await Category.delete(req.params.id);
        req.flash('success_msg', 'Category deleted');
        res.redirect('/admin/categories');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error deleting category');
        res.redirect('/admin/categories');
    }
};
