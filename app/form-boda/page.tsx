"use client";

import React, { useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function WeddingOrderForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        groomName: '',
        brideName: '',
        eventDate: '',
        eventTime: '',
        ceremonyLocation: '',
        ceremonyMapsUrl: '',
        receptionLocation: '',
        receptionMapsUrl: '',
        whatsappContact: '',
        giftRegistryUrl: '',
        bankDetails: '',
        youtubeUrl: '',
        importantNotes: '', // No niños, valet, etc.
    });

    // Image States
    const [mainImage, setMainImage] = useState<{ file: File, preview: string } | null>(null);
    const [dressCodeImage, setDressCodeImage] = useState<{ file: File, preview: string } | null>(null);
    const [paletteImage, setPaletteImage] = useState<{ file: File, preview: string } | null>(null);
    const [galleryImages, setGalleryImages] = useState<{ file: File, preview: string }[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Generic Image Handler
    const handleSingleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setter: Function) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setter({ file, preview: URL.createObjectURL(file) });
        }
    };

    // Multiple Image Handler
    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            // Limit to 20 total
            setGalleryImages(prev => [...prev, ...newImages].slice(0, 20));
        }
    };

    const removeGalleryImage = (index: number) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Helper to upload file
            const uploadFile = async (file: File, path: string) => {
                const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
                const snapshot = await uploadBytes(storageRef, file);
                return await getDownloadURL(snapshot.ref);
            };

            // 1. Upload Main Images
            let mainImageUrl = '';
            let dressCodeUrl = '';
            let paletteUrl = '';

            if (mainImage) mainImageUrl = await uploadFile(mainImage.file, 'wedding_uploads/main');
            if (dressCodeImage) dressCodeUrl = await uploadFile(dressCodeImage.file, 'wedding_uploads/dresscode');
            if (paletteImage) paletteUrl = await uploadFile(paletteImage.file, 'wedding_uploads/palette');

            // 2. Upload Gallery (Parallel)
            const galleryUrls = await Promise.all(
                galleryImages.map(img => uploadFile(img.file, 'wedding_uploads/gallery'))
            );

            // 3. Save Data to Firestore
            await addDoc(collection(db, "wedding_orders"), {
                ...formData,
                mainImageUrl,
                dressCodeUrl,
                paletteUrl,
                galleryUrls,
                createdAt: new Date(),
                status: 'pending',
                orderId: `BODA-${formData.groomName.substring(0, 2).toUpperCase()}${formData.brideName.substring(0, 2).toUpperCase()}-${Math.floor(Math.random() * 1000)}` // Ticket ID Concept
            });

            setSuccess(true);
            setLoading(false);

            // WhatsApp Message
            const message = `💍 *NUEVO PEDIDO BODA* 💍%0A%0A` +
                `*Novios:* ${formData.groomName} & ${formData.brideName}%0A` +
                `*Fecha:* ${formData.eventDate}%0A` +
                `_¡Gracias por su confianza!_`;

            window.open(`https://wa.me/529845828658?text=${message}`, '_blank');

        } catch (error: any) {
            console.error("Error submitting form: ", error);
            if (error.code === 'permission-denied') {
                alert("Error de Permisos: Revisa las reglas de Firestore.");
            } else {
                alert(`Error desconocido: ${error.message}`);
            }
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#1B1F3B] text-[#D4AF37] flex flex-col items-center justify-center p-6 text-center font-serif">
                <span className="material-symbols-outlined text-6xl mb-6 animate-bounce">favorite</span>
                <h1 className="text-4xl mb-4">¡Gracias por su Confianza!</h1>
                <p className="text-[#F5F5DC] mb-8 max-w-md">
                    Hemos recibido su información con éxito. <br />
                    Nuestro equipo creativo comenzará a trabajar en su experiencia memorable. <br />
                    <em className="text-sm opacity-70 mt-4 block">"La magia está en los detalles."</em>
                </p>
                <div className="flex gap-4">
                    <button onClick={() => window.location.reload()} className="classic-btn">Enviar Otro</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#1B1F3B] text-[#e0e0e0] font-body min-h-[100dvh] overflow-x-hidden pb-20">
            {/* Fonts & Global Styles */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@300;400;600&family=Fleur+De+Leah&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            {/* In-Line Styles for specific overrides */}
            <style jsx global>{`
                :root { --inv-bg: #1B1F3B; --inv-primary: #D4AF37; --inv-accent: #F5F5DC; }
                .classic-btn {
                    background-color: transparent; border: 1px solid var(--inv-primary); color: var(--inv-primary);
                    font-family: 'Cinzel', serif; text-transform: uppercase; letter-spacing: 0.2em;
                    font-size: 11px; padding: 12px 24px; transition: all 0.3s ease; cursor: pointer;
                }
                .classic-btn:hover { background-color: var(--inv-primary); color: var(--inv-bg); }
                .form-input {
                    background: transparent; border: none; border-bottom: 1px solid rgba(212, 175, 55, 0.3);
                    color: #F5F5DC; font-family: 'Playfair Display', serif; padding: 12px 0; width: 100%;
                }
                .form-input:focus { outline: none; border-bottom-color: #D4AF37; }
                .form-label { color: #D4AF37; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 4px; display: block; }
                .section-box { position: relative; padding: 2rem; border: 1px solid rgba(212, 175, 55, 0.3); background-color: rgba(0,0,0,0.2); backdrop-filter: blur(4px); }
                .section-title { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background-color: #1B1F3B; padding: 0 1rem; color: #D4AF37; font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; }
            `}</style>

            <nav className="p-6 flex items-center justify-center border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#D4AF37]">diamond</span>
                    <span className="text-[12px] tracking-[0.4em] uppercase font-display text-[#D4AF37] font-bold">DreamCrafters Suite</span>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 pt-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-names text-[#D4AF37] mb-2">Diseña tu Experiencia</h1>
                    <p className="font-serif italic text-white/50 text-sm">Configuración completa del evento, tickets y assets digitales.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">

                    {/* 1. NOVIO & NOVIA */}
                    <section className="section-box">
                        <h3 className="section-title">Los Protagonistas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="form-label">Nombre del Novio</label>
                                <input type="text" name="groomName" required className="form-input text-xl" placeholder="Ej. Mateo" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="form-label">Nombre de la Novia</label>
                                <input type="text" name="brideName" required className="form-input text-xl" placeholder="Ej. Elena" onChange={handleChange} />
                            </div>
                        </div>
                    </section>

                    {/* 2. LOCACIONES & FECHAS */}
                    <section className="section-box">
                        <h3 className="section-title">Coordenadas del Evento</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="form-label">Fecha</label>
                                <input type="date" name="eventDate" required className="form-input" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="form-label">Hora Inicio</label>
                                <input type="time" name="eventTime" className="form-input" onChange={handleChange} />
                            </div>
                        </div>

                        {/* Ceremonia */}
                        <div className="space-y-4 mb-8">
                            <h4 className="text-[#D4AF37] font-display text-xs border-b border-[#D4AF37]/20 pb-1">Ceremonia Religiosa / Civil</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Lugar (Nombre)</label>
                                    <input type="text" name="ceremonyLocation" placeholder="Ej. Parroquia San José" className="form-input" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="form-label">Link Google Maps (Ceremonia)</label>
                                    <input type="url" name="ceremonyMapsUrl" placeholder="https://maps.app.goo.gl/..." className="form-input text-xs" onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Recepción */}
                        <div className="space-y-4">
                            <h4 className="text-[#D4AF37] font-display text-xs border-b border-[#D4AF37]/20 pb-1">Recepción / Fiesta</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Lugar (Nombre)</label>
                                    <input type="text" name="receptionLocation" placeholder="Ej. Hacienda Los Arcos" className="form-input" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="form-label">Link Google Maps (Recepción)</label>
                                    <input type="url" name="receptionMapsUrl" placeholder="https://maps.app.goo.gl/..." className="form-input text-xs" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. MULTIMEDIA & VISUALES */}
                    <section className="section-box">
                        <h3 className="section-title">Estética & Multimedia</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
                            {/* Main Photo */}
                            <div className="flex flex-col items-center">
                                <label className="form-label mb-2">Foto Principal (Portada)</label>
                                <label className="w-full aspect-[3/4] border border-dashed border-[#D4AF37] flex items-center justify-center cursor-pointer hover:bg-[#D4AF37]/10 transition">
                                    {mainImage ? (
                                        <img src={mainImage.preview} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="material-symbols-outlined text-[#D4AF37]">favorite</span>
                                    )}
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSingleImageChange(e, setMainImage)} />
                                </label>
                            </div>

                            {/* Dress Code */}
                            <div className="flex flex-col items-center">
                                <label className="form-label mb-2">Código de Vestimenta (Img)</label>
                                <label className="w-full aspect-[3/4] border border-dashed border-[#D4AF37] flex items-center justify-center cursor-pointer hover:bg-[#D4AF37]/10 transition">
                                    {dressCodeImage ? (
                                        <img src={dressCodeImage.preview} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="material-symbols-outlined text-[#D4AF37]">styler</span>
                                    )}
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSingleImageChange(e, setDressCodeImage)} />
                                </label>
                            </div>

                            {/* Palette */}
                            <div className="flex flex-col items-center">
                                <label className="form-label mb-2">Paleta de Colores (Img)</label>
                                <label className="w-full aspect-[3/4] border border-dashed border-[#D4AF37] flex items-center justify-center cursor-pointer hover:bg-[#D4AF37]/10 transition">
                                    {paletteImage ? (
                                        <img src={paletteImage.preview} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="material-symbols-outlined text-[#D4AF37]">palette</span>
                                    )}
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSingleImageChange(e, setPaletteImage)} />
                                </label>
                            </div>
                        </div>

                        {/* YouTube */}
                        <div className="mb-4">
                            <label className="form-label">Canción Especial (Link YouTube)</label>
                            <input type="url" name="youtubeUrl" placeholder="https://youtube.com/watch?v=..." className="form-input" onChange={handleChange} />
                        </div>
                    </section>

                    {/* 4. GALERÍA DE NOVIOS (ILIMITADA) */}
                    <section className="section-box">
                        <h3 className="section-title">Galería de Fotos (Max 20)</h3>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                            {galleryImages.map((img, idx) => (
                                <div key={idx} className="relative aspect-square group">
                                    <img src={img.preview} className="w-full h-full object-cover border border-[#D4AF37]/50" />
                                    <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute top-0 right-0 bg-red-900/80 text-white p-1 opacity-0 group-hover:opacity-100 transition">✕</button>
                                </div>
                            ))}
                            <label className="aspect-square border border-dashed border-[#D4AF37] flex flex-col items-center justify-center cursor-pointer hover:bg-[#D4AF37]/10 transition">
                                <span className="material-symbols-outlined text-[#D4AF37]">add_photo_alternate</span>
                                <span className="text-[9px] uppercase mt-1 text-[#D4AF37]">Agregar</span>
                                <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryChange} />
                            </label>
                        </div>
                        <p className="text-[10px] text-center text-white/30">Puedes seleccionar varias fotos a la vez.</p>
                    </section>

                    {/* 5. REGALOS Y EXTRAS */}
                    <section className="section-box">
                        <h3 className="section-title">Detalles Finales</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="form-label">Mesa de Regalos (Link)</label>
                                <input type="url" name="giftRegistryUrl" placeholder="Amazon / Liverpool / Palacio" className="form-input" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="form-label">Datos Bancarios / Sobre</label>
                                <textarea name="bankDetails" rows={2} placeholder="Banco, CLABE, Concepto..." className="form-input resize-none bg-white/5 p-2 rounded" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Notas Importantes (Restricciones, Tips)</label>
                            <textarea name="importantNotes" rows={3} placeholder="Ej: No niños, código de vestimenta estricto, hay valet parking..." className="form-input resize-none bg-white/5 p-2 rounded" onChange={handleChange} />
                        </div>

                        <div>
                            <label className="form-label">WhatsApp para Confirmaciones</label>
                            <input type="tel" name="whatsappContact" required placeholder="55 1234 5678" className="form-input text-xl text-center tracking-widest" onChange={handleChange} />
                        </div>
                    </section>

                    {/* SUBMIT */}
                    <div className="pt-4 text-center">
                        <button type="submit" disabled={loading} className={`classic-btn bg-[#D4AF37] text-[#1B1F3B]! font-bold hover:bg-white! hover:scale-105 transform ${loading ? 'opacity-50 cursor-wait' : ''}`}>
                            {loading ? 'Subiendo Archivos...' : 'GENERAR INVITACIÓN'}
                        </button>
                    </div>

                </form>

                <div className="mt-20 text-center opacity-30 text-[10px] uppercase tracking-widest font-display pb-4">
                    <p>Powered by DreamCrafters &copy; {new Date().getFullYear()}</p>
                    <p className="mt-1">Creating Memorable Experiences</p>
                </div>
            </div>
        </div>
    );
}
