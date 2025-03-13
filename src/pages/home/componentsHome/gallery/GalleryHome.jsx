import React, { useEffect, useRef, useCallback, useState } from 'react';
import './GalleryHome.css';

// Define an array of slides
const slides = [
    {
        name: 'Capping',
        description: 'Técnica utilizada para sellar y proteger el borde libre de las uñas,Técnica utilizada para sellar y proteger el borde libre de las uñas,Técnica utilizada para sellar y proteger el borde libre de las uñas',
        imageUrl: 'https://picsum.photos/id/1012/1000/600/',
        thumbnail: "https://picsum.photos/id/1012/250/150/",
    },
    {
        name: 'Semi Permanente',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        name: 'Esculpidas',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://picsum.photos/id/1011/1000/600/',
        thumbnail: "https://picsum.photos/id/1011/250/150/"
    },
    {
        name: 'Dual System',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://picsum.photos/id/1016/1000/600/',
        thumbnail: "https://picsum.photos/id/1016/250/150/",
    },
    {
        name: 'Soft Gel',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        name: 'Nail Art y 3D Design',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    }
];

export const GalleryHome = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [loaded, setLoaded] = useState(false); // Estado para controlar la carga de la imagen actual
    const slideRef = useRef(null);
    const nextRef = useRef(null);
    const prevRef = useRef(null);

    const handleNextClick = useCallback(() => {
        const slide = slideRef.current;
        if (slide) {
            const items = slide.querySelectorAll('.itemThumbnail');
            if (items.length > 0) {
                slide.appendChild(items[0]);
                setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
                setLoaded(false); // Reiniciar el estado de carga
            }
        }
    }, []);

    const handlePrevClick = useCallback(() => {
        const slide = slideRef.current;
        if (slide) {
            const items = slide.querySelectorAll('.itemThumbnail');
            if (items.length > 0) {
                slide.prepend(items[items.length - 1]);
                setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
                setLoaded(false); // Reiniciar el estado de carga
            }
        }
    }, []);

    useEffect(() => {
        const next = nextRef.current;
        const prev = prevRef.current;

        if (next && prev) {
            next.addEventListener('click', handleNextClick);
            prev.addEventListener('click', handlePrevClick);

            return () => {
                next.removeEventListener('click', handleNextClick);
                prev.removeEventListener('click', handlePrevClick);
            };
        }
    }, [handleNextClick, handlePrevClick]);

    // Añadir un retraso en la carga para mostrar el fade correctamente
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true); // Cambiar el estado de la imagen a cargada después de un retraso
        }, 300); // Retraso de 300ms para que el fade sea visible

        return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }, [currentIndex]);

    const currentSlide = slides[currentIndex];

    return (
        <div className="containerSlider">
            <div className="slideIndex">
                {/* Imagen con retraso y onLoad */}
                <img
                    className={`imgIndex ${loaded ? 'loaded' : ''}`}
                    src={currentSlide.imageUrl}
                    alt=""
                    onLoad={() => setLoaded(false)} // Reinicia el estado cuando comienza la carga
                />
                <div className="content">
                    <h2 className='name'>{currentSlide.name}</h2>
                    <p className='des'>{currentSlide.description}</p>
                    <button className='btnSeeMore'>Quiero esto !!!</button>
                </div>
            </div>
            <div className="thumbnailGallery" ref={slideRef}>
                {slides.map((slide, index) => (
                    <div key={index} className="itemThumbnail" style={{ backgroundImage: `url(${slide.thumbnail})` }}>
                        <h1>{slide.name}</h1>
                    </div>
                ))}
            </div>

            <div className="button">
                <button className="prev" ref={prevRef}>&#10096;</button>
                <button className="next" ref={nextRef}>&#10097;</button>
            </div>
        </div>
    );
};