import { useState } from 'react';

export const useSelectableItem = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return {
        selectedItem,
        isModalOpen,
        handleSelectItem,
        closeModal
    };
};
