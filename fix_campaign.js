require('dotenv').config();
const axios = require('axios');

const PAGE_ID = process.env.META_PAGE_ID;
const ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;

const postsToDelete = [
    '539086392630917_122159857910816727',
    '539086392630917_122159857844816727',
    '539086392630917_122159857790816727',
    '539086392630917_122159857736816727'
];

const images = [
    "https://files.catbox.moe/pgcpc8.jpg", // 01
    "https://files.catbox.moe/sejakk.jpg", // 02
    "https://files.catbox.moe/7a73rk.jpg", // 03
    "https://files.catbox.moe/g1gh7o.jpg"  // 04
];

const copies = [
    `🚀 ¡Nivel Desbloqueado! Nuestra Súper Invitación Edición Especial de Mario acaba de aterrizar en la galaxia. 🌌\n\nY por tiempo MUY limitado, la tenemos a MITAD DE PRECIO. 😱\n❌ Precio regular: $500\n✅ Precio de lanzamiento: ¡Solo $250! (50% de DESCUENTO)\n\nTus invitados no solo leerán los datos de la fiesta... ¡Tendrán que jugar para descubrirlos! 🎮✨\n👉 Aprovecha la oferta y juega la demo aquí: https://www.dreamcrafters.lat/invitacionmario\n\n#FiestaMarioBros #InvitacionDigital #Dreamcrafters`,
    `🌟 ¡NUEVA Edición Especial! 🌟\nLleva la fiesta de tu peque a otra galaxia con una Súper Invitación Web que dejará a todos con la boca abierta. 😲\n\nNo mandes un aburrido PDF o una foto estática... ¡Manda una experiencia interactiva! Tus invitados jugarán desde su celular para descubrir el secreto de la fiesta. 🍄💫\n\nAprovecha nuestro 50% de descuento por introducción. ¡Solo $250!\n👉 Pruébala tú mismo aquí: https://www.dreamcrafters.lat/invitacionmario\n\n#FiestasInfantiles #MarioBrosParty`,
    `¿Quieres que la fiesta de tu peque sea inolvidable desde el primer momento? 🎂🍄\nNuestra Súper Invitación Interactiva es más que una tarjeta, ¡es el primer juego de su fiesta! 🎮✨\n\nTotalmente digital, súper fácil de enviar por WhatsApp, y hoy con un 50% DE DESCUENTO. Haz que los amiguitos digan "¡WOW!" antes de siquiera llegar. 🚀\n\n👉 Toca aquí para probar la invitación y apartar tu promoción: https://www.dreamcrafters.lat/invitacionmario\n\n#CumpleañosMarioBros #InvitacionesWeb`,
    `🚨 ¡Últimas horas a mitad de precio! 🚨\nSi estás planeando una fiesta de Mario Bros, esta es TU señal. 🍄⭐\n\nLlévate la invitación web más interactiva y divertida del mercado por solo $250 (50% OFF) antes de que suba a su precio regular. ⏳\n\n🎮 Juega, sorpréndete y apártala hoy mismo:\n👉 https://www.dreamcrafters.lat/invitacionmario\n\n#Promocion #FiestaMario #Dreamcrafters`
];

const timestamps = [
    1778778000,
    1778878800,
    1778943600,
    1779058800
];

async function fix() {
    console.log("Limpiando posts anteriores...");
    for (const id of postsToDelete) {
        try {
            await axios.delete(`https://graph.facebook.com/v21.0/${id}?access_token=${ACCESS_TOKEN}`);
            console.log(`Deleted: ${id}`);
        } catch(e) {
            console.log(`Error deleting ${id}:`, e.response ? JSON.stringify(e.response.data) : e.message);
        }
    }

    console.log("Reprogramando con método Feed...");
    for(let i=0; i<4; i++) {
        try {
            const photoRes = await axios.post(`https://graph.facebook.com/v21.0/${PAGE_ID}/photos`, {
                url: images[i],
                published: false,
                access_token: ACCESS_TOKEN
            });
            const photoId = photoRes.data.id;
            console.log(`Photo uploaded: ${photoId}`);

            const feedRes = await axios.post(`https://graph.facebook.com/v21.0/${PAGE_ID}/feed`, {
                message: copies[i],
                published: false,
                scheduled_publish_time: timestamps[i],
                attached_media: [{ media_fbid: photoId }],
                access_token: ACCESS_TOKEN
            });
            console.log(`✅ Scheduled post ${i+1} successfully! ID: ${feedRes.data.id}`);
        } catch(e) {
            console.error(`Error scheduling post ${i+1}:`, e.response ? JSON.stringify(e.response.data) : e.message);
        }
    }
}
fix();
