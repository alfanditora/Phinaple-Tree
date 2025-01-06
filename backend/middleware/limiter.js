const userLimit = {};
const WINDOW_MS = 15 * 60 * 1000; // 15 menit
const MAX_REQUESTS = 100;

const userRateLimiter = (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User authentication required" });
    }

    const userId = req.user.id;
    const currentTime = Date.now();

    if (!userLimit[userId]) {
        userLimit[userId] = {
            requests: 0,
            startTime: currentTime,
        };
    }

    const userData = userLimit[userId];

    // Reset hitungan jika jendela waktu telah berlalu
    if (currentTime - userData.startTime > WINDOW_MS) {
        userData.requests = 0;
        userData.startTime = currentTime;
    }

    // Cek apakah pengguna sudah melebihi batas permintaan
    if (userData.requests >= MAX_REQUESTS) {
        return res.status(429).json({
            error: "Too many requests. Please try again later.",
        });
    }

    // Tambahkan hitungan permintaan
    userData.requests++;
    next();
};

module.exports = userRateLimiter;
