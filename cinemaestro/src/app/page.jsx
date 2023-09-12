import React from "react";
import Link from "next/link";
import background from './background.svg';

export default function Home() {
  return (
    <html lang="en">
      <head>
        <title>CINEMAESTRO</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body>
        <div className="title-box">
          <div className="logo"></div>
          <h1 className="login-title">CineMaestro</h1>
        </div>
        <div className="login-box">
          <h2>Iniciar sesión</h2>
          <form>
            <div className="user-box">
              <input type="text" name="" required="" />
              <label>Usuario</label>
            </div>
            <div className="user-box">
              <input type="password" name="" required="" />
              <label>Contraseña</label>
            </div>
            <div class='signup-signin'>
              <Link class='aceptar' href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Aceptar
              </Link>
              <Link className='registrarse' href="#">Registrarse</Link>
            </div>
          </form>
        </div>
      </body>
    </html>
  );
}
