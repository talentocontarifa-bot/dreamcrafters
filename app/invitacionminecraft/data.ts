export type PartyConfig = {
    name: string;
    age: number;
    date: string;
    fullDate: string; // ISO or human readable for calendar
    time: string;
    locationName: string;
    locationAddress: string;
    mapUrl: string;
    musicUrl: string;
    targetDate: string;
    whatsappPhone: string;
};

export const DB: Record<string, PartyConfig> = {
    'ian-level8': {
        name: 'IAN', age: 9, date: '25 OCT',
        fullDate: '2026-10-25',
        time: '4:00 PM',
        locationName: "Salón 'El Bloque'", locationAddress: 'Av. Siempre Viva 742',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661601053058!2d-99.16782292411933!3d19.42702058185368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2003d18c!2sEl%20Angel%20of%20Independence!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx', // Mock Embed
        musicUrl: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
        targetDate: '2026-10-25T16:00:00',
        whatsappPhone: '5555555555'
    },
    'juanito8': {
        name: 'JUANITO', age: 9, date: '12 OCT',
        fullDate: '2026-10-12',
        time: '5:00 PM',
        locationName: 'Jardín Real', locationAddress: 'Calle Falsa 123',
        mapUrl: 'https://maps.google.com',
        musicUrl: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
        targetDate: '2026-10-12T17:00:00',
        whatsappPhone: '5555555555'
    },
    // Alejandro deleted as requested
};
