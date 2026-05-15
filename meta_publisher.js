require('dotenv').config();
const axios = require('axios');

// Configuración de la API de Meta
const PAGE_ID = process.env.META_PAGE_ID || '539086392630917'; // Dreamcrafters Page ID
const ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN; 

/**
 * Publica un mensaje de texto simple en la página de Facebook.
 * @param {string} message El texto a publicar
 */
async function publishTextPost(message) {
    try {
        console.log(`Intentando publicar en la página ${PAGE_ID}...`);
        
        const response = await axios.post(`https://graph.facebook.com/v21.0/${PAGE_ID}/feed`, {
            message: message,
            access_token: ACCESS_TOKEN
        });
        
        console.log('✅ ¡Publicación exitosa!');
        console.log('ID del Post:', response.data.id);
        return response.data;
    } catch (error) {
        console.error('❌ Error al publicar:');
        if (error.response) {
            console.error(error.response.data.error.message);
        } else {
            console.error(error.message);
        }
        throw error;
    }
}

async function scheduleTextPost(message, scheduledTimeUnix) {
    try {
        console.log(`Programando publicación en la página ${PAGE_ID}...`);
        
        const response = await axios.post(`https://graph.facebook.com/v21.0/${PAGE_ID}/feed`, {
            message: message,
            published: false,
            scheduled_publish_time: scheduledTimeUnix,
            access_token: ACCESS_TOKEN
        });
        
        console.log('✅ ¡Publicación programada con éxito!');
        console.log('ID del Post:', response.data.id);
        return response.data;
    } catch (error) {
        console.error('❌ Error al programar:');
        if (error.response) {
            console.error(error.response.data.error.message);
        } else {
            console.error(error.message);
        }
        throw error;
    }
}

/**
 * Publica una foto con un mensaje en la página de Facebook.
 * @param {string} imageUrl URL pública de la imagen
 * @param {string} message El texto a publicar junto con la foto
 */
async function publishPhoto(imageUrl, message) {
    try {
        console.log(`Intentando publicar una foto en la página ${PAGE_ID}...`);
        
        const response = await axios.post(`https://graph.facebook.com/v21.0/${PAGE_ID}/photos`, {
            url: imageUrl,
            message: message,
            access_token: ACCESS_TOKEN
        });
        
        console.log('✅ ¡Foto publicada con éxito!');
        console.log('ID del Post:', response.data.post_id);
        return response.data;
    } catch (error) {
        console.error('❌ Error al publicar foto:');
        if (error.response) {
            console.error(error.response.data.error.message);
        } else {
            console.error(error.message);
        }
        throw error;
    }
}

/**
 * Programa una foto con un mensaje en el feed de Facebook para que sea visible en Meta Business Suite.
 * @param {string} imageUrl URL pública de la imagen
 * @param {string} message El texto a publicar
 * @param {number} scheduledTimeUnix El timestamp en formato Unix
 */
async function schedulePhoto(imageUrl, message, scheduledTimeUnix) {
    try {
        console.log(`[1/2] Subiendo foto oculta para programar en página ${PAGE_ID}...`);
        const photoRes = await axios.post(`https://graph.facebook.com/v21.0/${PAGE_ID}/photos`, {
            url: imageUrl,
            published: false,
            access_token: ACCESS_TOKEN
        });
        const photoId = photoRes.data.id;
        
        console.log(`[2/2] Programando el post en el feed visual de Meta Business Suite...`);
        const feedRes = await axios.post(`https://graph.facebook.com/v21.0/${PAGE_ID}/feed`, {
            message: message,
            published: false,
            scheduled_publish_time: scheduledTimeUnix,
            attached_media: [{ media_fbid: photoId }],
            access_token: ACCESS_TOKEN
        });
        
        console.log('✅ ¡Foto programada exitosamente en el calendario!');
        console.log('ID del Post:', feedRes.data.id);
        return feedRes.data;
    } catch (error) {
        console.error('❌ Error al programar foto:');
        if (error.response) {
            console.error(error.response.data.error.message);
        } else {
            console.error(error.message);
        }
        throw error;
    }
}

const IG_ACCOUNT_ID = process.env.META_IG_ACCOUNT_ID;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Publica una foto en el feed de Instagram.
 * @param {string} imageUrl URL pública de la imagen
 * @param {string} caption El texto o pie de foto
 */
async function publishToInstagram(imageUrl, caption) {
    if (!IG_ACCOUNT_ID) throw new Error("Falta META_IG_ACCOUNT_ID en .env");

    try {
        console.log(`[1/2] Subiendo la foto a los servidores de Instagram...`);
        // Paso 1: Crear el contenedor de Media
        const containerRes = await axios.post(`https://graph.facebook.com/v21.0/${IG_ACCOUNT_ID}/media`, {
            image_url: imageUrl,
            caption: caption,
            access_token: ACCESS_TOKEN
        });
        
        const creationId = containerRes.data.id;
        console.log(`[1/2] ¡Foto subida! Creation ID: ${creationId}`);
        
        console.log(`⏳ Esperando 5 segundos para que Meta procese la imagen...`);
        await sleep(5000);
        
        console.log(`[2/2] Publicando el post en el feed de Instagram...`);
        // Paso 2: Publicar el contenedor
        const publishRes = await axios.post(`https://graph.facebook.com/v21.0/${IG_ACCOUNT_ID}/media_publish`, {
            creation_id: creationId,
            access_token: ACCESS_TOKEN
        });
        
        console.log('✅ ¡PUBLICACIÓN EXITOSA EN INSTAGRAM!');
        console.log('IG Post ID:', publishRes.data.id);
        return publishRes.data;
    } catch (error) {
        console.error('❌ Error al publicar en Instagram:');
        if (error.response) {
            console.error(JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
        throw error;
    }
}

// Ejemplo de uso:
async function runDemo() {
    if (!ACCESS_TOKEN) {
        console.error("Falta el META_PAGE_ACCESS_TOKEN en las variables de entorno (.env)");
        process.exit(1);
    }
    
    // Descomenta la función que quieras probar:
    // await publishTextPost("🚀 ¡Hola mundo! Esta es mi primera publicación automatizada usando la API de Meta. Si estás viendo esto, ¡la automatización de Rufino es un éxito!");
    
    await publishToInstagram(
        "https://picsum.photos/1080/1080.jpg", 
        "🍄 ¡Las mejores invitaciones de Mario Bros! \n\nDirecto desde la automatización de Rufino. 🔥 #MarioBros #InvitacionesDigitales #Dreamcrafters"
    );
}

// runDemo(); // Comentado para que no dispare la prueba automáticamente al importar este archivo como módulo.

module.exports = {
    publishTextPost,
    scheduleTextPost,
    publishPhoto,
    schedulePhoto,
    publishToInstagram
};
