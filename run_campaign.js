require('dotenv').config();
const axios = require('axios');
const { publishToInstagram } = require('./meta_publisher.js');

const PAGE_ID = process.env.META_PAGE_ID;
const ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;

// Imágenes públicas subidas para la API
const images = [
    "https://files.catbox.moe/pgcpc8.jpg", // 01
    "https://files.catbox.moe/sejakk.jpg", // 02
    "https://files.catbox.moe/7a73rk.jpg", // 03
    "https://files.catbox.moe/g1gh7o.jpg"  // 04
];

// Función personalizada para PROGRAMAR fotos en Facebook (ya que meta_publisher solo programa texto)
async function schedulePhotoFacebook(imageUrl, message, scheduledTimeUnix) {
    try {
        console.log(`[Facebook] Programando foto para el timestamp: ${scheduledTimeUnix}...`);
        const response = await axios.post(`https://graph.facebook.com/v21.0/${PAGE_ID}/photos`, {
            url: imageUrl,
            message: message,
            published: false,
            scheduled_publish_time: scheduledTimeUnix,
            access_token: ACCESS_TOKEN
        });
        console.log(`✅ [Facebook] ¡Foto programada con éxito! ID: ${response.data.id}`);
    } catch (error) {
        console.error('❌ [Facebook] Error al programar foto:', error.response ? error.response.data.error.message : error.message);
    }
}

async function runCampaign() {
    console.log("🚀 Iniciando Campaña: Mario Invasión...\n");

    // --- DÍA 1: JUEVES 14 DE MAYO (12:00 PM) ---
    // Timestamp: 1778778000
    const copy1 = `🚀 ¡Nivel Desbloqueado! Nuestra Súper Invitación Edición Especial de Mario acaba de aterrizar en la galaxia. 🌌\n\nY por tiempo MUY limitado, la tenemos a MITAD DE PRECIO. 😱\n❌ Precio regular: $500\n✅ Precio de lanzamiento: ¡Solo $250! (50% de DESCUENTO)\n\nTus invitados no solo leerán los datos de la fiesta... ¡Tendrán que jugar para descubrirlos! 🎮✨\n👉 Aprovecha la oferta y juega la demo aquí: https://www.dreamcrafters.lat/invitacionmario\n\n#FiestaMarioBros #InvitacionDigital #Dreamcrafters`;
    
    // Facebook (Programado)
    await schedulePhotoFacebook(images[0], copy1, 1778778000);
    
    // Instagram (Inmediato, ya que la API no permite programar)
    console.log("\n[Instagram] La API no soporta programación diferida. Publicando el Día 1 AHORA MISMO...");
    try {
        await publishToInstagram(images[0], copy1);
    } catch (e) {
        console.log("⚠️ Nota: Si Instagram falla por el tamaño de la imagen, revisaremos el formato.");
    }

    // --- DÍA 2: VIERNES 15 DE MAYO (4:00 PM) ---
    // Timestamp: 1778878800
    const copy2 = `🌟 ¡NUEVA Edición Especial! 🌟\nLleva la fiesta de tu peque a otra galaxia con una Súper Invitación Web que dejará a todos con la boca abierta. 😲\n\nNo mandes un aburrido PDF o una foto estática... ¡Manda una experiencia interactiva! Tus invitados jugarán desde su celular para descubrir el secreto de la fiesta. 🍄💫\n\nAprovecha nuestro 50% de descuento por introducción. ¡Solo $250!\n👉 Pruébala tú mismo aquí: https://www.dreamcrafters.lat/invitacionmario\n\n#FiestasInfantiles #MarioBrosParty`;
    console.log("\n");
    await schedulePhotoFacebook(images[1], copy2, 1778878800);

    // --- DÍA 3: SÁBADO 16 DE MAYO (10:00 AM) ---
    // Timestamp: 1778943600
    const copy3 = `¿Quieres que la fiesta de tu peque sea inolvidable desde el primer momento? 🎂🍄\nNuestra Súper Invitación Interactiva es más que una tarjeta, ¡es el primer juego de su fiesta! 🎮✨\n\nTotalmente digital, súper fácil de enviar por WhatsApp, y hoy con un 50% DE DESCUENTO. Haz que los amiguitos digan "¡WOW!" antes de siquiera llegar. 🚀\n\n👉 Toca aquí para probar la invitación y apartar tu promoción: https://www.dreamcrafters.lat/invitacionmario\n\n#CumpleañosMarioBros #InvitacionesWeb`;
    console.log("\n");
    await schedulePhotoFacebook(images[2], copy3, 1778943600);

    // --- DÍA 4: DOMINGO 17 DE MAYO (6:00 PM) ---
    // Timestamp: 1779058800
    const copy4 = `🚨 ¡Últimas horas a mitad de precio! 🚨\nSi estás planeando una fiesta de Mario Bros, esta es TU señal. 🍄⭐\n\nLlévate la invitación web más interactiva y divertida del mercado por solo $250 (50% OFF) antes de que suba a su precio regular. ⏳\n\n🎮 Juega, sorpréndete y apártala hoy mismo:\n👉 https://www.dreamcrafters.lat/invitacionmario\n\n#Promocion #FiestaMario #Dreamcrafters`;
    console.log("\n");
    await schedulePhotoFacebook(images[3], copy4, 1779058800);

    console.log("\n🎉 Script finalizado. ¡Campaña en sistema!");
}

runCampaign();
