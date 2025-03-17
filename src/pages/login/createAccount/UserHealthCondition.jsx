import React from 'react'

export const UserHealthCondition = () => {
    return (
        <>
            <div className="userHealthConditions">
                <h4>Padeces de algun condicionamiento?</h4>
                <div className="mb-3">
                    <label htmlFor="healthCondition" className="form-label">
                        Alergias Comunes:
                    </label>
                    <select className="form-select" name="healthCondition" aria-label="Default select example">
                        <option value='0'>Ver lista de alergias</option>
                        <option value="1">Onicolisis</option>
                        <option value="2">Alergia a polimeros</option>
                        <option value="3">Onicofagia</option>
                        <option value="4">asdasd</option>
                        <option value="5">sdfsdf</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="otherHealthCondition" className="form-label">
                        Otra
                    </label>
                    <input
                        placeholder="Solo un nombre"
                        type="text"
                        className="form-control inputText"
                        name="otherHealthCondition"
                        value={"1"}
                        required
                    />
                </div>
            </div>
        </>
    )
}
