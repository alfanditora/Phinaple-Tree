const userChatbotLimit = {};
const DAILY_LIMIT = 5; 
const ONE_DAY = 24 * 60 * 60 * 1000; // 1 hari

const chatbotRateLimiter = (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "User authentication required" });
    }

    const currentTime = Date.now();

    // Inisialisasi pengguna di penyimpanan jika belum ada
    if (!userChatbotLimit[userId]) {
        userChatbotLimit[userId] = {
            requests: 0,
            resetTime: currentTime + ONE_DAY,
        };
    }

    const userData = userChatbotLimit[userId];

    // Reset hitungan jika waktu reset tercapai
    if (currentTime > userData.resetTime) {
        userData.requests = 0;
        userData.resetTime = currentTime + ONE_DAY;
    }

    // Periksa apakah pengguna telah mencapai batas permintaan
    if (userData.requests >= DAILY_LIMIT) {
        return res.status(429).json({
            error: `Daily limit reached. You can only make ${DAILY_LIMIT-1} requests per day.`, // 1 Request for training
        });
    }

    // Tambahkan hitungan permintaan dan lanjutkan ke rute berikutnya
    userData.requests++;
    next();
};

module.exports = chatbotRateLimiter;