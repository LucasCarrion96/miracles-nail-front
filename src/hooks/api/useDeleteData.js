import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteData = (endpoint) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        // Especifica la función que realiza la mutación
        mutationFn: async (id) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar');
            }
        },
        // Acción que ocurre cuando la mutación es exitosa
        onSuccess: () => {
            queryClient.invalidateQueries([endpoint]);
        },
    });

    return mutation;
};
