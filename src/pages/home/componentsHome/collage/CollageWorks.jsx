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
            <div className="collageBody">
                <h1 className='titlePrincipal '>El estilo que soñaste a un turno perra</h1>
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
