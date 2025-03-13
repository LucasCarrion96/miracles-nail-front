import { useFetchData } from "../../../hooks/useFetchData";

export const useFetchServices = () => {
    //api
    const apiUrl = import.meta.env.VITE_API_URL;
    const { data, loading, error } = useFetchData(`${apiUrl}/prices`);
    const services = data?.services || [];
    const artTypes = data?.artTypes || [];
    return { services, artTypes, loading, error };
};
