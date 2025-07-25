
import { CustomSelect } from '../../../../components/form/select/CustomSelect'
export const ServicesModal = ({ selects, services, handleChange }) => {
    if (!Array.isArray(services)) {
        return <p>Error: Los servicios no están disponibles</p>;
    }
    const options = services
        .filter(service => !['Service', 'Nada'].includes(service.nameService) && ![12, 13].includes(service.idService))
        .map(service => ({
            value: service.idService,
            label: `${service.nameService} - $${service.price}`
        }));

    return (
        <>
            <div className='servicesSelector'>
                <h2 className='subtitle'>Servicios:</h2>
                <CustomSelect
                    name="service"
                    options={options}
                    value={selects?.service}
                    onChange={(selected) =>
                        handleChange({ target: { name: "service", value: selected?.value } })
                    }
                    placeholder="Selecciona un Servicio"
                />
            </div>
            <div className="aditional-services">
                <h2 className='subtitle'>Servicio Adicional:</h2>
                <div className='radios-check'>
                    {services
                        .filter(service => [12, 13].includes(service.idService))
                        .map(service => (
                            <div className="custom-radio " key={service.idService}>
                                <input
                                    type="radio"
                                    name="radioService"
                                    id={`inlineRadio${service.idService}`}
                                    value={service.idService}
                                    checked={selects.radioService === String(service.idService)}
                                    onChange={handleChange}
                                />
                                <label className='content-text' htmlFor={`inlineRadio${service.idService}`}>
                                    <span className="radio-dot"></span>
                                    {service.nameService}
                                </label>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};