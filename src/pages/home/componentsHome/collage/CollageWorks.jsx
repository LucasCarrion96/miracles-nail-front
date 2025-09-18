import React from 'react'
import './CollageWorks.css';
const images = [
    'https://picsum.photos/id/1012/250/150/',
    'https://picsum.photos/id/1012/250/150/',
    'https://picsum.photos/id/1012/250/150/',
    'https://picsum.photos/id/1012/250/150/',
    'https://picsum.photos/id/1012/250/150/',
    'https://picsum.photos/id/1012/250/150/'
];
export const CollageWorks = () => {
    return (
        <>
            <div className="collage-body">
                <div className='collage-text'>
                    <h1 className='title-principal '>El estilo que soñaste a un turno perra</h1>
                    <h2 className='title'>Diseños que cambian animos</h2>
                    <h3 className='subtitle'>Y mi hermano si te falta novio XD</h3>
                </div>
                <div className="collage-grid">
                    {images.map((src, i) => (
                        <div key={i} className={`collage-item anim-${i % 3}`}>
                            <img src={src} alt={`img-${i}`} />
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
