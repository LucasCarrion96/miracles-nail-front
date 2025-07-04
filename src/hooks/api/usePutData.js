import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePutData = (endpoint) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar datos');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries([endpoint]); // Refresca automáticamente la caché
        },
    });
};

/*
const { mutate: putData } = usePutData('your-endpoint');

const handlePutData = (id, updatedData) => {
    putData({ id, updatedData }); // Esto ejecutará el PUT con el id y los datos actualizados
};

*/