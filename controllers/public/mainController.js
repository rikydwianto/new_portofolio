const Project = require('../../models/Project');
const Category = require('../../models/Category');
const Timeline = require('../../models/Timeline');
const ProjectImage = require('../../models/ProjectImage');
const Profile = require('../../models/Profile');
const Stat = require('../../models/Stat');
const Skill = require('../../models/Skill');
const Badge = require('../../models/Badge');

exports.index = async (req, res) => {
    try {
        const projects = await Project.findAll();
        const categories = await Category.findAll();
        const timeline = await Timeline.findAll();

        // Fetch new dynamic content
        const stats = await Stat.findAll();
        const skills = await Skill.findAll();
        const badges = await Badge.findAll();

        res.render('public/index', {
            layout: 'layouts/main-layout',
            projects: projects.slice(0, 6), // Limit to 6 latest projects
            categories,
            timeline,
            stats,
            skills,
            badges,
            title: 'Riky Dwianto - Portfolio'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.listProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        const categories = await Category.findAll();

        res.render('public/projects', {
            layout: 'layouts/main-layout',
            projects,
            categories,
            title: 'All Projects - Riky Dwianto'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.detail = async (req, res) => {
    try {
        const project = await Project.findBySlug(req.params.slug);
        if (!project) {
            return res.status(404).render('404', { layout: 'layouts/main-layout', title: 'Not Found' });
        }
        const images = await ProjectImage.findByProjectId(project.id);
        res.render('public/detail', {
            layout: 'layouts/main-layout',
            project,
            images,
            title: project.title + ' - Riky Dwianto'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.downloadCV = (req, res) => {
    const file = './public/uploads/cv/resume.pdf';
    res.download(file);
};
