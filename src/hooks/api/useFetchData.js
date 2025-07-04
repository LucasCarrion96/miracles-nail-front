import { useQuery } from '@tanstack/react-query';

export const useFetchData = (url) => {
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: [url],
        queryFn: async () => {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // 🔑 Envía cookies HttpOnly
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });

    const refreshData = () => refetch(); // 🔄 Refrescar manualmente

    return { data, error, isLoading, refreshData };
};
