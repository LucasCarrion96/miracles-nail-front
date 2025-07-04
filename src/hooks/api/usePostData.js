import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostData = (endpoint) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newData) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newData),
            });

            if (!response.ok) {
                throw new Error('Error al enviar datos');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries([endpoint]); // Refresca automáticamente la caché
        },
    });
};


/*
const { mutate: postData } = usePostData('your-endpoint');

const handlePostData = (newData) => {
    postData(newData); // Esto ejecutará el POST con los nuevos datos
};
 */