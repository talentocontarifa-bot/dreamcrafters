require('dotenv').config();
const axios = require('axios');

const PAGE_ID = process.env.META_PAGE_ID;
const ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;

async function checkScheduled() {
    try {
        console.log("Checking scheduled posts...");
        const res = await axios.get(`https://graph.facebook.com/v21.0/${PAGE_ID}/posts`, {
            params: {
                access_token: ACCESS_TOKEN,
                is_published: false,
                fields: 'id,message,created_time,scheduled_publish_time'
            }
        });
        console.log("Scheduled Posts Data:", JSON.stringify(res.data, null, 2));
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
    }
}

checkScheduled();
