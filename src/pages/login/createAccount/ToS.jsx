import React from 'react'


export const ToS = () => {
    return (
        <>
            <div className=''>
                <h4>Por favor lea los terminos</h4>
                <div className="createAccountComplete">

                    <div className="mb-3 passwordCheck">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name='ToS'

                        />
                        <label htmlFor='ToS' className="form-check-label labelPasswordCheck">Terminos y Condiciones</label>

                    </div>
                    <button type="submit" className="btn btn-primary">
                        Registrarse
                    </button>
                </div>
            </div>

        </>
    )
}
