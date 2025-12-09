# 🚀 Portfolio Personal - Daniel Ramirez

Portafolio web moderno y minimalista desarrollado con Next.js, React, TypeScript y Three.js. Presenta una experiencia interactiva en 3D con animaciones fluidas y diseño responsive.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia con efectos glassmorphism y gradientes
- 🎭 **Avatar 3D Interactivo**: Modelo Ready Player Me con tracking de mouse
- 🌟 **Partículas de Skills**: Sistema de partículas 3D mostrando tecnologías
- ⌨️ **Animación Typing**: Efecto de escritura en el título principal con loop
- 📱 **100% Responsive**: Optimizado para todos los dispositivos
- 🎬 **Animaciones GSAP**: Transiciones suaves con ScrollTrigger
- 🎯 **Clean Architecture**: Código organizado y mantenible
- 🔥 **Performance Optimizada**: SSG y optimización de assets

## 🛠️ Tecnologías

### Frontend
- **Framework**: Next.js 16.0.1 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: GSAP + ScrollTrigger
- **3D**: Three.js, @react-three/fiber, @react-three/drei

### Herramientas
- **Control de Versiones**: Git
- **Package Manager**: npm
- **Linting**: ESLint
- **Deployment**: Vercel

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/portfolio.git

# Navegar al directorio
cd portfolio

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:3000
```

### Producción

```bash
# Crear build de producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura del Proyecto

```
portfolio/
├── src/
│   ├── app/                    # App Router de Next.js
│   ├── core/                   # Lógica de negocio
│   │   ├── entities/           # Entidades del dominio
│   │   ├── repositories/       # Interfaces de repositorios
│   │   └── usecases/           # Casos de uso
│   ├── infrastructure/         # Implementaciones
│   │   ├── di/                 # Dependency Injection
│   │   └── repositories/       # Implementación de repos
│   ├── presentation/           # Componentes UI
│   │   ├── components/         # Componentes React
│   │   │   ├── 3d/             # Componentes Three.js
│   │   │   ├── common/         # Componentes reutilizables
│   │   │   ├── layout/         # Layout components
│   │   │   └── sections/       # Secciones de la página
│   │   └── hooks/              # Custom React hooks
│   └── shared/                 # Código compartido
│       ├── constants/          # Constantes y configuración
│       ├── types/              # Tipos TypeScript
│       └── utils/              # Utilidades
└── public/                     # Assets estáticos
```

## 🎨 Secciones

1. **Hero**: Avatar 3D interactivo con partículas de skills
2. **About**: Información personal, skills y experiencia
3. **Projects**: Galería de proyectos con modal detallado
4. **Contact**: Formulario de contacto con EmailJS

## 🌐 Deploy

El proyecto está optimizado para deploy en Vercel:

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push a main

## 📝 Variables de Entorno

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Daniel Ramirez**
- GitHub: [@DAMN05](https://github.com/DAMN05)
- LinkedIn:(https://www.linkedin.com/in/daniel-rmdev/)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
