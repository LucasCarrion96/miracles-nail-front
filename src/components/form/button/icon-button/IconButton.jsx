import * as LucideIcons from 'lucide-react';

export const IconButton = ({ handleClick, color, size, icon, btnClass }) => {
    const btnClassName = btnClass || "btn-no-bg";
    const safeClick = handleClick || (() => { });
    const iconColor = color || "black";
    const iconSize = size || 20;
    const LucideIcon = LucideIcons[icon];
    if (!LucideIcon) {
        console.warn(`Icono "${icon}" no encontrado en lucide-react`);
        return null;
    }
    return (
        <>
            <button
                type="button"
                className={btnClassName}
                onClick={safeClick}>
                <LucideIcon
                    size={iconSize}
                    cursor={'pointer'}
                    color={iconColor}

                />
            </button >
        </>
    )
}
