import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export const usePaginationFetchData = (apiUrl, initialPage = 1, itemsPerPage = 10, dataMapper = res => res.data) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    // Query para obtener los datos paginados
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: [apiUrl, currentPage], // Query key depende de la URL y la página actual
        queryFn: async () => {
            const response = await axios.get(`${apiUrl}?page=${currentPage}&limit=${itemsPerPage}`, {
                withCredentials: true,
            });
            console.log('usando usequery')
            return dataMapper(response); // Mapear los datos con dataMapper
        },
        keepPreviousData: true, // Mantener los datos anteriores mientras se cargan nuevos
        staleTime: 1000 * 60 * 5, // Los datos se mantienen frescos por 5 minutos
        enabled: !!apiUrl, // Evitar que la consulta se ejecute si no hay URL
    });

    const handleNextPage = () => {
        if (data?.totalPages && currentPage < data.totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleRefresh = () => {
        refetch(); // Refresca los datos para la página actual
    };

    const handleHardRefresh = () => {
        setCurrentPage(1); // Restablece la página a la primera
        refetch(); // Refresca los datos para la primera página
    };

    return {
        data: data?.items || [], // Los datos obtenidos por la consulta
        currentPage,
        totalPages: data?.totalPages || 1,
        loading: isLoading,
        error,
        handleNextPage,
        handlePreviousPage,
        handleRefresh,
        handleHardRefresh,
    };
};
