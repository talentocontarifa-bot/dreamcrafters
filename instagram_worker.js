require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { publishToInstagram } = require('./meta_publisher.js');

const QUEUE_FILE = path.join(__dirname, 'instagram_queue.json');

async function processInstagramQueue() {
    console.log(`[${new Date().toLocaleString()}] Revisando la cola de Instagram...`);
    
    if (!fs.existsSync(QUEUE_FILE)) {
        console.log("No existe el archivo instagram_queue.json. Nada que publicar.");
        return;
    }

    let queue = [];
    try {
        const rawData = fs.readFileSync(QUEUE_FILE, 'utf8');
        queue = JSON.parse(rawData);
    } catch (e) {
        console.error("Error leyendo la cola:", e);
        return;
    }

    const currentUnix = Math.floor(Date.now() / 1000);
    let updated = false;

    for (let i = 0; i < queue.length; i++) {
        const post = queue[i];
        
        // Si el post está pendiente y la fecha ya se cumplió o ya pasó
        if (post.status === 'pending' && currentUnix >= post.scheduledTimeUnix) {
            console.log(`\n⏳ Procesando Post ID: ${post.id}...`);
            try {
                await publishToInstagram(post.imageUrl, post.message);
                console.log(`✅ Post ${post.id} publicado en Instagram.`);
                queue[i].status = 'published'; // Marcamos como completado
                updated = true;
            } catch (error) {
                console.error(`❌ Falló la publicación del Post ${post.id}. Se reintentará en la siguiente vuelta.`);
            }
        }
    }

    if (updated) {
        fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8');
        console.log("📝 Archivo de cola actualizado (Posts marcados como published).");
    } else {
        console.log("💤 No hay posts pendientes para la hora actual.");
    }
}

// Ejecutar inmediatamente
processInstagramQueue();
