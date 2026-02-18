const Project = require('../../models/Project');
const Category = require('../../models/Category');
const fs = require('fs');
const path = require('path');

exports.list = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.render('admin/projects/list', {
            layout: 'layouts/admin-layout',
            active: 'projects',
            projects
        });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error fetching projects');
        res.redirect('/admin/dashboard');
    }
};

exports.createForm = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('admin/projects/form', {
            layout: 'layouts/admin-layout',
            active: 'projects',
            project: null,
            categories
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/projects');
    }
};

exports.store = async (req, res) => {
    const { title, description, excerpt, category_id, media_type, media_url, tech_stack } = req.body;
    let thumbnail = '';

    if (req.file) {
        thumbnail = '/uploads/projects/' + req.file.filename;
    } else {
        req.flash('error_msg', 'Thumbnail is required');
        return res.redirect('/admin/projects/create');
    }

    // Generate slug from title
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
        await Project.create({
            category_id, title, slug, description, excerpt, thumbnail, media_type, media_url, tech_stack
        });
        req.flash('success_msg', 'Project created successfully');
        res.redirect('/admin/projects');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error creating project (slug might be duplicate)');
        res.redirect('/admin/projects/create');
    }
};

exports.editForm = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        const categories = await Category.findAll();
        if (!project) {
            req.flash('error_msg', 'Project not found');
            return res.redirect('/admin/projects');
        }
        res.render('admin/projects/form', {
            layout: 'layouts/admin-layout',
            active: 'projects',
            project,
            categories
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/projects');
    }
};

exports.update = async (req, res) => {
    const { title, description, excerpt, category_id, media_type, media_url, tech_stack, existing_thumbnail } = req.body;
    let thumbnail = existing_thumbnail;

    if (req.file) {
        // Delete old thumbnail if exists
        const oldPath = path.join(__dirname, '../../public', '.' + existing_thumbnail);
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }
        thumbnail = '/uploads/projects/' + req.file.filename;
    }

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
        await Project.update(req.params.id, {
            category_id, title, slug, description, excerpt, thumbnail, media_type, media_url, tech_stack
        });
        req.flash('success_msg', 'Project updated successfully');
        res.redirect('/admin/projects');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating project');
        res.redirect('/admin/projects');
    }
};

exports.delete = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project && project.thumbnail) {
            const oldPath = path.join(__dirname, '../../public', '.' + project.thumbnail);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }
        await Project.delete(req.params.id);
        req.flash('success_msg', 'Project deleted successfully');
        res.redirect('/admin/projects');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error deleting project');
        res.redirect('/admin/projects');
    }
};
