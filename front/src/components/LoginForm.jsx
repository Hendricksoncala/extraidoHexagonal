import React, { useState } from 'react';
import '../style/LoginForm.css'; // Importa el archivo CSS para los estilos

function LoginForm() {
  // ... (lógica de estado y envío del formulario, igual que antes)

  return (
    <div className="login-container"> {/* Contenedor principal */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        {error && <div className="error">{error}</div>} 
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default LoginForm;