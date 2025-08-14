# 📦 Sistema de Gestión de Activos Fijos (Dockerizado)

Este proyecto contiene un sistema de gestión de activos fijos desarrollado con:

- ⚙️ Backend: [NestJS](https://nestjs.com/)
- 💻 Frontend: [React](https://reactjs.org/)
- 🛢️ Base de datos: PostgreSQL
- 🐳 Orquestado con Docker y Docker Compose

---

## 🚀 ¿Cómo levantar el proyecto?

### ✅ Requisitos previos

- Tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

### ⚙️ Pasos para levantar el sistema

```bash
# Clonar el repositorio
git clone https://github.com/tu_usuario/activos-fijos-docker.git

# Entrar al proyecto
cd activos-fijos-docker

# Construir e iniciar los servicios
docker-compose up --build
