const formulario =
    document.getElementById("loginForm");

const mensaje =
    document.getElementById("mensaje");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    try {

        const respuesta =
            await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        usuario,
                        password
                    })
                }
            );

        const datos =
            await respuesta.json();

        if (respuesta.ok) {

            localStorage.setItem(
                "token",
                datos.token
            );

            mensaje.textContent =
                "Login correcto";

            mensaje.style.color =
                "green";

            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 1000);

        } else {

            mensaje.textContent =
                datos.mensaje;

            mensaje.style.color =
                "red";
        }

    } catch (error) {

        mensaje.textContent =
            "Error al conectar con el servidor";

        mensaje.style.color =
            "red";
    }
});