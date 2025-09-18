import React from 'react';
import * as LucideIcons from 'lucide-react';

export const StepButton = ({ variant, handleClick, btnClass, color, size }) => {

    const btnClassName = btnClass || "btn-no-bg";
    const iconColor = color || "black";
    let VariantRefresh;
    if (variant === "next") {
        VariantRefresh = LucideIcons.StepForward;
    } else if (variant === "back") {
        VariantRefresh = LucideIcons.StepBack;
    } else {
        console.warn(`Variant ${variant} no soportada para RefreshButton`);
        return null;
    }
    if (!VariantRefresh) {
        console.warn(`Icono para variant ${variant} no encontrado en lucide-react`);
        return null;
    }

    return (
        <>
            <button
                type='button'
                className={btnClassName}
                onClick={handleClick}
            >
                <VariantRefresh
                    size={size || 24}
                    cursor="pointer"
                    color={iconColor}

                />
            </button>
        </>
    );
};
