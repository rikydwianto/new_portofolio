const Project = require('../../models/Project');
const Category = require('../../models/Category');
const Timeline = require('../../models/Timeline');
const VisitorLog = require('../../models/VisitorLog');

exports.index = async (req, res) => {
    try {
        const projects = await Project.findAll();
        const categories = await Category.findAll();
        const timeline = await Timeline.findAll();

        // Fetch Visitor Stats
        // Fetch Visitor Stats
        const visitorStats = await VisitorLog.getStats() || {};

        // Prepare Recent Items
        const recentProjects = projects.slice(0, 5);

        // Calculate Project Per Category for Chart
        const catStats = {};
        projects.forEach(p => {
            const catName = p.category_name || 'Uncategorized';
            catStats[catName] = (catStats[catName] || 0) + 1;
        });

        res.render('admin/dashboard', {
            layout: 'layouts/admin-layout',
            title: 'Dashboard',
            stats: {
                projectsCount: projects.length,
                categoriesCount: categories.length,
                timelineCount: timeline.length,
                ...visitorStats
            },
            recentProjects,
            catStats: JSON.stringify(catStats) // Pass as JSON for Chart.js
        });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Server error');
        res.redirect('/admin/login');
    }
};
