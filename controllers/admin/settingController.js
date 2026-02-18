const Profile = require('../../models/Profile');
const Skill = require('../../models/Skill');
const Stat = require('../../models/Stat');
const Badge = require('../../models/Badge');

// ════════ PROFILE ════════
exports.profileForm = async (req, res) => {
    try {
        const profile = await Profile.get();
        // Typewriter text is stored as JSON string, parse it for display (or handle in view)
        let typewriterPhrases = '';
        if (profile && profile.typewriter_text) {
            try {
                typewriterPhrases = JSON.parse(profile.typewriter_text).join('\n');
            } catch (e) {
                typewriterPhrases = profile.typewriter_text;
            }
        }

        res.render('admin/settings/profile', {
            layout: 'layouts/admin-layout',
            title: 'Edit Profile',
            profile,
            typewriterPhrases,
            currentPage: 'settings',
            activeTab: 'profile'
        });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error loading profile');
        res.redirect('/admin/dashboard');
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const {
            name, hero_title, hero_desc, typewriter_text,
            about_title, about_desc_1, about_desc_2,
            email, phone, whatsapp_url, linkedin_url, github_url, available_for_work
        } = req.body;

        // Convert newline separated typewriter text to JSON array
        const typewriterArray = typewriter_text.split('\n').map(s => s.trim()).filter(Boolean);
        const typewriterJson = JSON.stringify(typewriterArray);

        await Profile.update({
            name, hero_title, hero_desc, typewriter_text: typewriterJson,
            about_title, about_desc_1, about_desc_2,
            email, phone, whatsapp_url, linkedin_url, github_url,
            available_for_work: available_for_work === 'on'
        });

        req.flash('success_msg', 'Profile updated successfully');
        res.redirect('/admin/settings/profile');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating profile');
        res.redirect('/admin/settings/profile');
    }
};

// ════════ SKILLS ════════
exports.skillsList = async (req, res) => {
    try {
        const skills = await Skill.findAll();
        res.render('admin/settings/skills', {
            layout: 'layouts/admin-layout',
            title: 'Manage Skills',
            skills,
            currentPage: 'settings',
            activeTab: 'skills'
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

exports.storeSkill = async (req, res) => {
    try {
        await Skill.create(req.body);
        req.flash('success_msg', 'Skill added');
        res.redirect('/admin/settings/skills');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding skill');
        res.redirect('/admin/settings/skills');
    }
};

exports.updateSkill = async (req, res) => {
    try {
        await Skill.update(req.params.id, req.body);
        req.flash('success_msg', 'Skill updated');
        res.redirect('/admin/settings/skills');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating skill');
        res.redirect('/admin/settings/skills');
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        await Skill.delete(req.params.id);
        req.flash('success_msg', 'Skill deleted');
        res.redirect('/admin/settings/skills');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error deleting skill');
        res.redirect('/admin/settings/skills');
    }
};

// ════════ STATS ════════
exports.statsList = async (req, res) => {
    try {
        const stats = await Stat.findAll();
        res.render('admin/settings/stats', {
            layout: 'layouts/admin-layout',
            title: 'Manage Stats',
            stats,
            currentPage: 'settings',
            activeTab: 'stats'
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

exports.storeStat = async (req, res) => {
    try {
        await Stat.create(req.body);
        req.flash('success_msg', 'Stat added');
        res.redirect('/admin/settings/stats');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding stat');
        res.redirect('/admin/settings/stats');
    }
};

exports.updateStat = async (req, res) => {
    try {
        await Stat.update(req.params.id, req.body);
        req.flash('success_msg', 'Stat updated');
        res.redirect('/admin/settings/stats');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating stat');
        res.redirect('/admin/settings/stats');
    }
};

exports.deleteStat = async (req, res) => {
    try {
        await Stat.delete(req.params.id);
        req.flash('success_msg', 'Stat deleted');
        res.redirect('/admin/settings/stats');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error deleting stat');
        res.redirect('/admin/settings/stats');
    }
};

// ════════ BADGES ════════
exports.badgesList = async (req, res) => {
    try {
        const badges = await Badge.findAll();
        res.render('admin/settings/badges', {
            layout: 'layouts/admin-layout',
            title: 'Manage Badges',
            badges,
            currentPage: 'settings',
            activeTab: 'badges'
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};

exports.storeBadge = async (req, res) => {
    try {
        await Badge.create(req.body);
        req.flash('success_msg', 'Badge added');
        res.redirect('/admin/settings/badges');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding badge');
        res.redirect('/admin/settings/badges');
    }
};

exports.updateBadge = async (req, res) => {
    try {
        await Badge.update(req.params.id, req.body);
        req.flash('success_msg', 'Badge updated');
        res.redirect('/admin/settings/badges');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating badge');
        res.redirect('/admin/settings/badges');
    }
};

exports.deleteBadge = async (req, res) => {
    try {
        await Badge.delete(req.params.id);
        req.flash('success_msg', 'Badge deleted');
        res.redirect('/admin/settings/badges');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error deleting badge');
        res.redirect('/admin/settings/badges');
    }
};
