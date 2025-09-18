

export const UserDetails = ({ formData, handleChange }) => {
    return (
        <div className="user-details">
            <p className='subtitle'>Datos personales</p>

            <div className="form-group">
                <input
                    placeholder="Nombre"
                    type="text"
                    className="input-form input-gray"
                    name="userName"
                    id="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <input
                    placeholder="Apellido"
                    type="text"
                    className="input-form input-gray"
                    name="userSurname"
                    id="userSurname"
                    value={formData.userSurname}
                    onChange={handleChange}
                    required
                />
            </div>
        </div>
    );
};