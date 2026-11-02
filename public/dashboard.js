// =========================
// VALIDAR SESIÓN
// =========================

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";
}

// =========================
// ELEMENTOS DEL DOM
// =========================

const formulario =
    document.getElementById("itemForm");

const listaItems =
    document.getElementById("listaItems");

const btnCerrarSesion =
    document.getElementById(
        "btnCerrarSesion"
    );

// =========================
// OBTENER ITEMS
// =========================

const cargarItems = async () => {

    try {

        const respuesta =
            await fetch(
                "/api/items"
            );

        const items =
            await respuesta.json();

        listaItems.innerHTML = "";

        if (items.length === 0) {

            listaItems.innerHTML = `
                <div class="item-card">
                    <h3>
                        Sin registros
                    </h3>

                    <p>
                        No existen datos almacenados.
                    </p>
                </div>
            `;

            return;
        }

        items.forEach(item => {

            listaItems.innerHTML += `
                <div class="item-card">

                    <div class="item-badge">
                        Registro MongoDB
                    </div>

                    <h3>
                        ${item.nombre}
                    </h3>

                    <p>
                        ${item.descripcion}
                    </p>

                    <button
                        onclick="eliminarItem('${item._id}')">

                        Eliminar

                    </button>

                </div>
            `;
        });

    } catch (error) {

        console.error(
            "Error al cargar registros:",
            error
        );
    }
};

// =========================
// CREAR ITEM
// =========================

formulario.addEventListener(
    "submit",
    async (evento) => {

        evento.preventDefault();

        const nombre =
            document.getElementById(
                "nombre"
            ).value.trim();

        const descripcion =
            document.getElementById(
                "descripcion"
            ).value.trim();

        if (
            nombre === "" ||
            descripcion === ""
        ) {

            alert(
                "Todos los campos son obligatorios."
            );

            return;
        }

        try {

            const respuesta =
                await fetch(
                    "/api/items",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Authorization":
                                token
                        },

                        body: JSON.stringify({
                            nombre,
                            descripcion
                        })
                    }
                );

            const datos =
                await respuesta.json();

            if (respuesta.ok) {

                formulario.reset();

                cargarItems();

            } else {

                alert(
                    datos.mensaje
                );
            }

        } catch (error) {

            console.error(
                "Error al guardar:",
                error
            );
        }
    }
);

// =========================
// ELIMINAR ITEM
// =========================

window.eliminarItem =
    async (id) => {

        const confirmar =
            confirm(
                "¿Desea eliminar este registro?"
            );

        if (!confirmar) {

            return;
        }

        try {

            const respuesta =
                await fetch(
                    `/api/items/${id}`,
                    {
                        method: "DELETE",

                        headers: {
                            "Authorization":
                                token
                        }
                    }
                );

            const datos =
                await respuesta.json();

            if (respuesta.ok) {

                cargarItems();

            } else {

                alert(
                    datos.mensaje
                );
            }

        } catch (error) {

            console.error(
                "Error al eliminar:",
                error
            );
        }
    };

// =========================
// CERRAR SESIÓN
// =========================

btnCerrarSesion.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "token"
        );

        window.location.href =
            "login.html";
    }
);

// =========================
// CARGA INICIAL
// =========================

cargarItems();