import * as LucideIcons from 'lucide-react';
import './secondary-button.css';

export const SecondaryButton = ({ btnClass, textBtn, handleClick, icon, color }) => {
    const iconColor = color || "black";
    const IconName = LucideIcons[icon] || "";
    const safeClick = handleClick || (() => { });
    const textButton = textBtn || "";
    const btnClassName = btnClass || "btn-no-bg";

    return (
        <>
            <button
                className={`secondary-btn ${btnClassName}`}

                style={{
                    gap: textButton && IconName ? '8px' : '0',
                    color: iconColor
                }}
            >
                {IconName && <IconName color={iconColor} />}
                {textButton && <span className="btn-text">{textButton}</span>}
            </button >
        </>
    )
}
