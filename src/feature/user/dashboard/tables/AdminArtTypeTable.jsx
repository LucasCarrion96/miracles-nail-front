import { ModalModifyTables } from "../componentsDashboard/ModalModifyTables";
import { useFetchData, usePutData } from '@api'; // Nuevo hook
import { useModalEdit } from '../../../../hooks/hooksTables/useModalEdit';



export const AdminArtTypeTable = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró el token en localStorage');
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrlEndpoint = `${apiUrl}/catalog/artTypes`;

    // 💾 Usamos el nuevo hook con enableRefresh
    const { data, isLoading, error, refreshData } = useFetchData(apiUrlEndpoint, true);
    //modal
    const { isOpen, selectedData, openModal, closeModal } = useModalEdit();

    // Usamos el hook usePutData para el PUT
    const { mutate: updateArtType } = usePutData('artTypes');

    if (isLoading) return <p>Cargando Diseños...</p>;
    if (error) return <p>Error al obtener Diseños: {error.message}</p>;

    const fields = ["artTypeName", "price"];
    const fieldsConfig = [
        { field: "artTypeName", type: "text" },
        { field: "price", type: "number" }
    ];

    // 💡 Usamos la mutación del hook usePutData para guardar los datos
    const handleSave = async (editedData) => {
        try {
            // Usamos la mutación para actualizar el diseño
            updateArtType({
                id: editedData.idArtType,
                updatedData: editedData,
            });

            console.log("✅ Dato actualizado, refrescando tabla...");
            refreshData(); // 🔄 Refresca datos automáticamente
        } catch (error) {
            console.error('❌ Error al guardar los datos:', error.message);
        }
    };

    return (
        <>
            <div >
                <h2 className="title">Diseños</h2>
                <div className='dashboard-table'>
                    <table className="table-custom">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Modificar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(artType => (
                                <tr key={artType.idArtType}>
                                    <th scope="row">{artType.idArtType}</th>
                                    <td>{artType.artTypeName}</td>
                                    <td>{artType.price}</td>
                                    <td><button className="btn" onClick={() => openModal(artType)}>Editar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalModifyTables
                isOpen={isOpen}
                onClose={closeModal}
                onSave={handleSave} // Este sigue llamando a handleSave
                fields={fields}
                fieldsConfig={fieldsConfig}
                data={selectedData}
            />
        </>
    );
};
