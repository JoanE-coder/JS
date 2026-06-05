# Plan de Desarrollo - Prueba de Desempeño JavaScript SPA

## Objetivo

Completar la prueba de desempeño desarrollando una SPA (Single Page Application) para la gestión de reservas de espacios compartidos, implementando:

* Autenticación
* Persistencia de sesión
* Manejo de roles
* Protección de rutas
* CRUD de reservas
* Consumo de API con json-server

---

# Estado Actual del Proyecto

La base entregada ya incluye:

* Vite
* TailwindCSS
* json-server
* Router básico
* Navegación SPA
* Estructura modular
* Servicios HTTP

Por lo tanto, no es necesario rehacer la arquitectura desde cero.

---

# Errores Detectados

## Error 1

### home.controller.js

Importa:

```javascript
import { getReservations } from "@services/reservation.service";
```

Pero el servicio exporta:

```javascript
export const getReservation = () =>
  http.get("/reservations");
```

### Solución

Renombrar:

```javascript
export const getReservations = () =>
  http.get("/reservations");
```

---

## Error 2

### Logout no elimina la sesión

Actualmente:

```javascript
document
  .querySelector("#logoutBtn")
  ?.addEventListener("click", () => {
    navigateTo("/");
  });
```

Debe ser:

```javascript
document
  .querySelector("#logoutBtn")
  ?.addEventListener("click", () => {
    removeSession();
    navigateTo("/");
  });
```

---

## Error 3

### Doble asignación

Actualmente:

```javascript
container.innerHTML = container.innerHTML =
```

Debe ser:

```javascript
container.innerHTML =
```

---

# Funciones Faltantes

## Autenticación

### login()

```javascript
login(email, password)
```

Valida credenciales contra json-server.

---

### logout()

```javascript
logout()
```

Limpia la sesión.

---

### isAuthenticated()

```javascript
isAuthenticated()
```

Verifica si existe usuario autenticado.

---

### getCurrentUser()

```javascript
getCurrentUser()
```

Obtiene el usuario almacenado en localStorage.

---

# Guards

## authGuard()

```javascript
authGuard()
```

Impide acceder a rutas privadas sin autenticación.

---

## roleGuard()

```javascript
roleGuard(role)
```

Restringe acceso según el rol.

---

# CRUD de Reservas

## Obtener reservas

```javascript
getReservations()
```

GET /reservations

---

## Obtener reserva por ID

```javascript
getReservationById(id)
```

GET /reservations/:id

---

## Crear reserva

```javascript
createReservation(data)
```

POST /reservations

---

## Actualizar reserva

```javascript
updateReservation(id, data)
```

PATCH /reservations/:id

---

## Eliminar reserva

```javascript
deleteReservation(id)
```

DELETE /reservations/:id

---

# Funciones para Usuario

## Ver mis reservas

```javascript
getMyReservations(userId)
```

GET /reservations?userId=1

---

## Cancelar reserva

```javascript
cancelReservation(id)
```

Cambia el estado a:

```text
Cancelled
```

---

# Funciones para Administrador

## Aprobar reserva

```javascript
approveReservation(id)
```

Estado:

```text
Approved
```

---

## Rechazar reserva

```javascript
rejectReservation(id)
```

Estado:

```text
Rejected
```

---

# Dashboard

## Estadísticas

### Total reservas

```javascript
getTotalReservations()
```

---

### Reservas pendientes

```javascript
getPendingReservations()
```

---

### Reservas aprobadas

```javascript
getApprovedReservations()
```

---

### Reservas canceladas

```javascript
getCancelledReservations()
```

---

# Reglas de Negocio

## Validar conflictos

```javascript
validateReservationConflict()
```

Evita reservas duplicadas para el mismo horario.

---

## Validar edición

```javascript
canEditReservation()
```

Solo permite editar reservas pendientes.

---

## Validar cancelación

```javascript
canCancelReservation()
```

Controla cuándo puede cancelarse una reserva.

---

# Orden de Implementación

## Paso 1

Crear:

```text
src/utils/session.js
```

Contenido:

```javascript
const STORAGE_KEY = "user";

export const saveSession = (user) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  );
};

export const getSession = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  );
};

export const removeSession = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isAuthenticated = () => {
  return !!getSession();
};
```

---

## Paso 2

Crear:

```text
src/services/auth.service.js
```

Contenido:

```javascript
import { http } from "./http";

export const login = async (
  email,
  password
) => {
  const users = await http.get("/users");

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  return user || null;
};
```

---

## Paso 3

Crear:

```text
src/controllers/auth.controller.js
```

Contenido:

```javascript
import { login } from "@/services/auth.service";
import { saveSession } from "@/utils/session";

export const handleLogin = async (
  email,
  password
) => {
  const user = await login(
    email,
    password
  );

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  saveSession(user);
};
```

---

## Paso 4

Modificar LoginView

```javascript
loginForm.addEventListener(
  "submit",
  async (e) => {
    e.preventDefault();

    await handleLogin(
      email.value,
      password.value
    );
  }
);
```

---

# Prioridad para Aprobar la Prueba

Implementar en este orden:

1. login()
2. logout()
3. isAuthenticated()
4. authGuard()
5. roleGuard()
6. getMyReservations()
7. createReservation()
8. updateReservation()
9. deleteReservation()
10. approveReservation()
11. rejectReservation()

---

# Extras para Obtener Más Puntos

* Dashboard
* Dark Mode
* Buscador de reservas
* Filtro por fechas
* Paginación
* Toasts
* Deploy en Vercel
* Gestión de espacios
