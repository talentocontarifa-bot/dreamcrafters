"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default function AdminPedidos() {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (auth) {
            const fetchPedidos = async () => {
                try {
                    const q = query(collection(db, "wedding_orders"), orderBy("createdAt", "desc"));
                    const querySnapshot = await getDocs(q);
                    const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setPedidos(orders);
                } catch (error) {
                    console.error("Error al obtener pedidos:", error);
                    alert("No se pudieron cargar los pedidos. Verifica los permisos de Firebase.");
                } finally {
                    setLoading(false);
                }
            };
            fetchPedidos();
        }
    }, [auth]);

    if (!auth) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Acceso Admin 🔒</h2>
                    <input
                        type="password"
                        className="w-full border p-2 rounded mb-4 text-black"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={() => password === 'admin123' ? setAuth(true) : alert('Incorrecto')}
                        className="w-full bg-blue-600 text-white py-2 rounded font-bold"
                    >
                        Entrar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-800">
            {/* Fix Icons not loading */}
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            <style jsx global>{`
                .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; }
            `}</style>

            <h1 className="text-3xl font-bold mb-8 text-blue-900 border-b pb-4">📋 Pedidos de Invitaciones</h1>

            {loading ? (
                <p>Cargando pedidos...</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-blue-900 text-white">
                            <tr>
                                <th className="p-4">Fecha Pedido</th>
                                <th className="p-4">Novios</th>
                                <th className="p-4">Evento</th>
                                <th className="p-4">Ubicación</th>
                                <th className="p-4">Multimedia</th>
                                <th className="p-4">Contacto</th>
                                <th className="p-4">Foto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((p) => (
                                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                                    {/* Fecha */}
                                    <td className="p-4 text-sm text-gray-500">
                                        <div className="font-bold text-gray-700">{p.createdAt?.seconds ? new Date(p.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</div>
                                        <div className="text-xs text-blue-500 font-mono">{p.orderId || 'OLD-ID'}</div>
                                    </td>

                                    {/* Novios */}
                                    <td className="p-4 font-bold text-lg text-blue-900 leading-tight">
                                        {p.groomName} <br /> <span className="text-[#D4AF37]">&</span> <br /> {p.brideName}
                                    </td>

                                    {/* Evento */}
                                    <td className="p-4">
                                        <div className="text-sm font-semibold">{p.eventDate}</div>
                                        <div className="text-xs text-gray-500">{p.eventTime}</div>
                                        {p.importantNotes && <div className="text-[10px] bg-yellow-100 text-yellow-800 p-1 rounded mt-1 inline-block max-w-[150px] truncate" title={p.importantNotes}>📝 Nota: {p.importantNotes}</div>}
                                    </td>

                                    {/* Ubicaciones */}
                                    <td className="p-4 text-sm">
                                        <div className="flex flex-col gap-1">
                                            {p.ceremonyMapsUrl && (
                                                <a href={p.ceremonyMapsUrl} target="_blank" className="flex items-center gap-1 text-blue-600 hover:underline">
                                                    <span className="material-symbols-outlined text-[14px]">church</span> Ceremonia
                                                </a>
                                            )}
                                            {p.receptionMapsUrl && (
                                                <a href={p.receptionMapsUrl} target="_blank" className="flex items-center gap-1 text-purple-600 hover:underline">
                                                    <span className="material-symbols-outlined text-[14px]">celebration</span> Fiesta
                                                </a>
                                            )}
                                        </div>
                                    </td>

                                    {/* Assets / Galería */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {p.dressCodeUrl && (
                                                <a href={p.dressCodeUrl} target="_blank" title="Ver Dress Code" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-blue-100 border hover:border-blue-300 transition">
                                                    <span className="material-symbols-outlined text-[16px]">styler</span>
                                                </a>
                                            )}
                                            {p.paletteUrl && (
                                                <a href={p.paletteUrl} target="_blank" title="Ver Paleta" className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-pink-100 border hover:border-pink-300 transition">
                                                    <span className="material-symbols-outlined text-[16px]">palette</span>
                                                </a>
                                            )}
                                            {p.galleryUrls?.length > 0 && (
                                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 border border-green-300 flex items-center justify-center text-xs font-bold" title={`${p.galleryUrls.length} fotos en galería`}>
                                                    +{p.galleryUrls.length}
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Contacto & Status */}
                                    <td className="p-4">
                                        <a href={`https://wa.me/52${p.whatsappContact}`} target="_blank" className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200 hover:bg-green-200 transition-colors flex items-center w-fit gap-1 mb-1">
                                            <span className="material-symbols-outlined text-[14px]">chat</span> {p.whatsappContact}
                                        </a>
                                        {p.status === 'pending' ? (
                                            <span className="text-[10px] uppercase font-bold text-orange-500">Pendiente Pago</span>
                                        ) : (
                                            <span className="text-[10px] uppercase font-bold text-green-500">Pagado</span>
                                        )}
                                    </td>

                                    {/* Foto Principal */}
                                    <td className="p-4">
                                        {p.mainImageUrl ? (
                                            <a href={p.mainImageUrl} target="_blank" rel="noopener noreferrer" className="block relative group">
                                                <img src={p.mainImageUrl} className="w-16 h-20 object-cover rounded shadow-sm group-hover:scale-150 transition-transform origin-right z-10 border-2 border-white" alt="Portada" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-300 text-xs italic">Sin portada</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pedidos.length === 0 && <p className="p-8 text-center text-gray-500">No hay pedidos registrados aún.</p>}
                </div>
            )}
        </div>
    );
}
