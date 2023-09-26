export function Login() {
    return (
      <>
      <div className='title-box'>
        <div className='logo'></div>
        <h1 className='login-title'>CineMaestro</h1>
      </div>
      <div className='login-box'>
        <h2>Registrarse</h2>
        <form>
          <div className='user-box'>
            <input type='text' name='' required='' />
            <label>Correo</label>
          </div>
          <div className='user-box'>
            <input type='text' name='' required='' />
            <label>Usuario</label>
          </div>
          <div className='user-box'>
            <input type='password' name='' required='' />
            <label>Contraseña</label>
          </div>
          <div className='signup-signup'>
            <button className='aceptar'>Aceptar</button>
            <a className='iniciar' href='/'>
              Iniciar sesión
            </a>
          </div>
        </form>
      </div>
      </>
    );
  }

