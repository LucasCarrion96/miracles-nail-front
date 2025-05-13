// GalleryHome.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';


import "./GalleryHome.css";

const images = [
    {
        name: 'Capping',
        description: 'Técnica utilizada para sellar y proteger el borde libre de las uñas...',
        src: './src/assets/tarjet1.png',
        thumbnail: "https://picsum.photos/id/1012/250/150/",
    },
    {
        name: 'Semi Permanente',
        description: 'Aplicación de esmalte semi permanente de larga duración...',
        src: './src/assets/tarjet2.png',
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        name: 'Esculpidas',
        description: 'Construcción de uñas mediante técnicas de escultura profesional...',
        src: './src/assets/tarjet3.png',
        thumbnail: "https://picsum.photos/id/1011/250/150/"
    },
    {
        name: 'Dual System',
        description: 'Sistema rápido para esculpir uñas usando moldes especiales...',
        src: './src/assets/tarjet1.png',
        thumbnail: "https://picsum.photos/id/1016/250/150/",
    },
    {
        name: 'Soft Gel',
        description: 'Uñas en gel suave con terminaciones naturales y resistentes...',
        src: './src/assets/tarjet2.png',
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        name: 'Nail Art y 3D Design',
        description: 'Decoraciones artísticas y diseños en 3D para uñas personalizadas...',
        src: './src/assets/tarjet3.png',
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    }
];

export const GalleryHome = () => {
    const [current, setCurrent] = useState(0);
    const image = images[current];

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    // ⏱️ Efecto con temporizador
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 7000); // cambia cada 5 segundos

        return () => clearInterval(interval); // limpia al desmontar
    }, []);

    return (
        <div className="gallery-container">
            <div className="gallery-controls">
                <button className='rightleftButton' onClick={handlePrev}>
                    <ChevronLeft size={35} />
                </button>
                <button className='rightleftButton' onClick={handleNext}>
                    <ChevronRight size={35} />
                </button>
            </div>

            <div className="gallery-image-wrapper">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={image.src}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="gallery-fade-layer"
                    >
                        <img src={image.src} alt={image.name} />
                        <div className="gradient-overlay" />
                    </motion.div>
                </AnimatePresence>
                <div className='gallery-overlay'>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={image.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="gallery-overlay-content"
                        >
                            <h2 className="gallery-title">{image.name}</h2>
                            <p className="gallery-description">{image.description}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <div className="gallery-counter">
                {current + 1} / {images.length}
            </div>
        </div>
    );
};