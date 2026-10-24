# tino-sc

Beacon (página de enlaces) de **James Valentino Rojas Díaz (Tino)**: contacto, proyectos, experiencia y stack, en español e inglés.
Se publica en `tino-sc.space/beacon`.

## Cómo funciona

- Una sola página con 5 pantallas: **Inicio → Enlaces → Proyectos → Experiencia → Stack**. Cada una usa el siguiente fondo y se abre directo con `/beacon#proyectos`, `/beacon#experience`, etc.
- Stack: React 19, Vite, Tailwind CSS v4, `motion` y `lucide-react`.

## Comandos

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # genera dist/
npm run lint    # revisa tipos
npm test        # pruebas de src/utils
```

## Estructura

```
src/
  main.tsx              entrada
  index.css             estilos base y animaciones del Stack
  components/           BeaconPage y sus piezas (tarjetas, desplegables, iconos)
  data/
    profile.ts          correo, teléfonos, Upwork, rutas del CV y la foto
    beacon.ts           textos ES/EN, enlaces, proyectos, empresas y tecnologías
    experience.ts       cargos del CV (detalle de los desplegables)
  utils/                enlaces de WhatsApp y de correo (+ pruebas), detector de tamaño de pantalla
public/
  cv-james-rojas.pdf    CV descargable
  favicon*.png, apple-touch-icon.png
  fonts/                Outfit y Plus Jakarta Sans (alojadas aquí, no en Google)
  images/               todo en WebP, ya reducido al tamaño en que se muestra
    profile.webp        foto de perfil
    backgrounds/        fondos de las pantallas
    projects/           capturas de los proyectos
    brands/             logos de los clientes
    companies/          logos de las empresas donde trabajó
    tech/               iconos de tecnologías (Simple Icons)
```

## Diseño y rendimiento

- **Responsive:** una columna en celular, columna más ancha en tablet (contacto en 2 columnas, proyectos en 3 tarjetas) y dos columnas en escritorio (perfil y contacto a la izquierda, resumen a la derecha).
- **Carga rápida:** una portada mínima en `index.html` se pinta antes de que llegue el JavaScript, solo se descarga el fondo visible (los demás cuando la página ya cargó) y las animaciones son CSS.
- **Imágenes nuevas:** conviértelas a WebP y al tamaño en que se muestran (los logos ~190 px, las capturas ~960 px de ancho, la foto ~320 px) antes de ponerlas en `public/images/`.

## Qué editar

| Quiero cambiar…                       | Archivo                    |
| ------------------------------------- | -------------------------- |
| Correo, teléfonos, CV, foto           | `src/data/profile.ts`      |
| Textos, proyectos, empresas, stack    | `src/data/beacon.ts`       |
| Detalle de cada puesto                | `src/data/experience.ts`   |
| Nombre y favicon de la pestaña        | `index.html` y `public/`   |

## Despliegue

Pensado para Vercel: `vercel.json` redirige `/beacon` a `index.html` (la raíz `/` muestra lo mismo).
