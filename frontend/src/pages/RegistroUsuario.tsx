import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegistroUsuario = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [nombre, setNombre] = useState('');
    const [rol, setRol] = useState('superadministrador');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const res = await fetch('http://localhost:3001/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // ✅ Agregado
                },
                body: JSON.stringify({
                    correo,
                    contrasena,
                    rol,
                    nombre,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Error al registrar usuario');
            }

            alert('Usuario registrado con éxito');
            navigate('/usuarios');

        } catch (err: any) {
            alert('Error al registrar usuario: ' + (err.message || 'Error desconocido'));
        }
    };


    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h4 className="mb-4 text-center">Registrar Usuario</h4>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Rol</label>
                        <select
                            className="form-select"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="superadministrador">Superadministrador</option>
                            <option value="usuario">Usuario</option>
                        </select>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-success">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
