import React from 'react'

export const UserHealthCondition = () => {
    return (
        <>
            <div className="userHealthConditions">
                <div className="mb-3">
                    <label htmlFor="healthCondition" className="form-label">
                        Padeces de alguna alergia?
                    </label>
                    <select className="form-select" name="healthCondition" aria-label="Default select example">
                        <option value='0'>Ver lista de alergias</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
        </>
    )
}
