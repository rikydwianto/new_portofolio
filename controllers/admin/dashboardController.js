const Project = require('../../models/Project');
const Category = require('../../models/Category');
const Timeline = require('../../models/Timeline');

exports.index = async (req, res) => {
    try {
        const projects = await Project.findAll();
        const categories = await Category.findAll();
        const timeline = await Timeline.findAll();

        res.render('admin/dashboard', {
            layout: 'layouts/admin-layout',
            active: 'dashboard',
            projectsCount: projects.length,
            categoriesCount: categories.length,
            timelineCount: timeline.length
        });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Server error');
        res.redirect('/admin/login');
    }
};
