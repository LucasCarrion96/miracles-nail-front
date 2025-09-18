import { useFetchData } from '@api';

export const useFetchServices = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { data, loading, error } = useFetchData(`${apiUrl}/services/get-services`);

    // data ya es un array
    const services = Array.isArray(data) ? data : [];
    const artTypes = []; // si todavía no usas esto

    return { services, artTypes, loading, error };
};