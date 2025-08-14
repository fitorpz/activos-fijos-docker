import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errores, setErrores] = useState<string[]>([]);
    const navigate = useNavigate();

    const validarCampos = () => {
        const erroresTemp: string[] = [];

        // Validación de correo
        if (!correo) {
            erroresTemp.push('El correo es obligatorio.');
        } else if (!/\S+@\S+\.\S+/.test(correo)) {
            erroresTemp.push('El correo no tiene un formato válido.');
        }

        // Validación de contraseña
        if (!contrasena) {
            erroresTemp.push('La contraseña es obligatoria.');
        }

        setErrores(erroresTemp);
        return erroresTemp.length === 0;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validarCampos()) return;

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contrasena }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrores([data.message || 'Credenciales incorrectas.']);
                return;
            }

            // ✅ GUARDAMOS EL TOKEN JWT
            localStorage.setItem('auth', 'true');
            window.dispatchEvent(new Event('storage')); // 👈 fuerza re-render

            // Guardar usuario opcionalmente
            localStorage.setItem('usuario', JSON.stringify(data.usuario));

            // Redirigir al dashboard
            navigate('/dashboard');
        } catch (error) {
            setErrores(['Error al conectar con el servidor.']);
        }
    };




    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-4">Acceder al sistema</h3>

                {errores.length > 0 && (
                    <div className="alert alert-danger">
                        <ul className="mb-0">
                            {errores.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="ejemplo@correo.com"
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
                            placeholder="Ingrese su contraseña"
                            required
                        />
                    </div>
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary">
                            Acceder
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <small className="d-block mb-1 text-muted">
                        ¿Primera vez? <a href="/primera-vez">Solicite su cuenta</a>
                    </small>

                    <small className="d-block mb-1 text-muted">
                        ¿Olvidaste tu contraseña? <a href="/recuperar">Recupérala</a>
                    </small>
                    <small className="d-block text-danger">
                        ¿Tu cuenta está deshabilitada? <a href="/deshabilitada">Solicita reactivación</a>
                    </small>

                </div>
            </div>
        </div>
    );
};

export default Login;
