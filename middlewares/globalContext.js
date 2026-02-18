const Profile = require('../models/Profile');

module.exports = async (req, res, next) => {
    try {
        // Only fetch for GET requests to avoid overhead on POST/API
        if (req.method === 'GET') {
            const profile = await Profile.get();
            res.locals.profile = profile || {};

            // Default fallbacks if DB is empty to prevent crashes
            if (!res.locals.profile.name) res.locals.profile.name = 'Riky Dwianto';
            if (!res.locals.profile.hero_title) res.locals.profile.hero_title = "Hi, I'm <span class='gradient-text'>Riky Dwianto</span>";
        }
        next();
    } catch (err) {
        console.error('Global Context Error:', err);
        res.locals.profile = {};
        next();
    }
};
