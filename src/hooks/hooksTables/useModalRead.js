import { useState } from 'react';

export const useModalRead = () => {
    const [isOpenText, setIsOpenText] = useState(false);
    const [isOpenList, setIsOpenList] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openTextModal = (item) => {
        setSelectedItem(item);
        setIsOpenText(true);
    };

    const closeTextModal = () => {
        setIsOpenText(false);
        setSelectedItem(null);
    };

    const openListModal = (items) => {
        setSelectedItem(items); // items debe ser un array para el modal de lista
        setIsOpenList(true);
    };

    const closeListModal = () => {
        setIsOpenList(false);
        setSelectedItem(null);
    };

    return {
        isOpenText,
        isOpenList,
        selectedItem,
        openTextModal,
        closeTextModal,
        openListModal,
        closeListModal
    };
};
