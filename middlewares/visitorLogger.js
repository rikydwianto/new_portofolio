const http = require('http');
const VisitorLog = require('../models/VisitorLog');

/**
 * Get real IP address from request (handles proxies)
 */
function getClientIP(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return req.connection?.remoteAddress || req.socket?.remoteAddress || req.ip || '0.0.0.0';
}

/**
 * Fetch geolocation data from ip-api.com (free, no key required)
 * Rate limit: 45 requests per minute
 */
function fetchGeoLocation(ip) {
    return new Promise((resolve) => {
        // Skip for localhost/private IPs
        if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1' || ip.startsWith('192.168') || ip.startsWith('10.')) {
            return resolve({ city: 'Localhost', region: 'Local', country: 'Local', isp: 'Local Network' });
        }

        const url = `http://ip-api.com/json/${ip}?fields=status,city,regionName,country,isp`;

        const request = http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.status === 'success') {
                        resolve({
                            city: parsed.city || '',
                            region: parsed.regionName || '',
                            country: parsed.country || '',
                            isp: parsed.isp || ''
                        });
                    } else {
                        resolve({ city: '', region: '', country: '', isp: '' });
                    }
                } catch {
                    resolve({ city: '', region: '', country: '', isp: '' });
                }
            });
        });

        request.on('error', () => {
            resolve({ city: '', region: '', country: '', isp: '' });
        });

        // Timeout after 3 seconds
        request.setTimeout(3000, () => {
            request.destroy();
            resolve({ city: '', region: '', country: '', isp: '' });
        });
    });
}

/**
 * Middleware to log visitor info (runs asynchronously, does not block response)
 */
function visitorLogger(req, res, next) {
    // Skip logging for static assets and admin pages
    const path = req.path;
    if (
        path.startsWith('/css') ||
        path.startsWith('/js') ||
        path.startsWith('/images') ||
        path.startsWith('/uploads') ||
        path.startsWith('/admin') ||
        path.includes('favicon') ||
        path.includes('.') // Skip file requests
    ) {
        return next();
    }

    // Run logging asynchronously — don't wait for it
    const ip = getClientIP(req);
    const userAgent = req.headers['user-agent'] || '';
    const referrer = req.headers['referer'] || req.headers['referrer'] || '';
    const pageVisited = req.originalUrl || req.url;

    // Detect project slug from URL
    let projectSlug = null;
    const projectMatch = pageVisited.match(/^\/project\/([^/?]+)/);
    if (projectMatch) {
        projectSlug = projectMatch[1];
    }

    // Fire and forget — don't slow down the response
    setImmediate(async () => {
        try {
            const geo = await fetchGeoLocation(ip);
            await VisitorLog.create({
                ip_address: ip,
                city: geo.city,
                region: geo.region,
                country: geo.country,
                isp: geo.isp,
                user_agent: userAgent,
                page_visited: pageVisited,
                project_slug: projectSlug,
                referrer: referrer
            });
        } catch (err) {
            console.error('Visitor log error:', err.message);
        }
    });

    next();
}

module.exports = visitorLogger;
