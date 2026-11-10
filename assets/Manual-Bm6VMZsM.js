import{o as n,aG as h}from"./index-CT-h-X-A.js";const v=`# Manual de LML · Laboratorio de Música

Manual para el maestro: uso diario de la app y cómo publicar actualizaciones por tu cuenta.

## 1. Uso diario

### Alumnos
- **Alumnos → Agregar alumno**: creas la cuenta con usuario y contraseña. Compártele esos datos al alumno.
- Desde la ficha del alumno puedes cambiar su curso, su nivel, su contraseña o desactivarlo.

### Clases y lecciones
- **Cursos**: aquí ves el temario de cada curso. Para cambiar una lección, abre el editor visual desde la lección.
- **Editor de ejercicios**: agrega preguntas, opciones o juegos con el asistente. Los cambios se guardan como tu versión del contenido. El contenido original no se pierde.
- **Tareas**: asigna tareas desde la ficha del alumno. El alumno las ve en su inicio.
- En adultos, las lecciones se abren cuando marcas la anterior como **Vista en clase** (igual que en niños). Las que ya habías marcado siguen abiertas. En **Dar clase** puedes abrir cualquiera.
- El inicio del alumno adulto muestra la próxima lección, las tareas y las herramientas. Ya no muestra racha ni insignias (eso queda en el perfil). El modo niños no cambia.

### Calendario y pagos
- **Calendario**: crea clases sueltas o series semanales y marca la asistencia.
- **Más → Pagos**: planes de pago, pagos recibidos y adeudos.

### Cómo se ve la app
- **Más → Temas**, **Apartados**, **Logo, textos e imágenes**, **Sonidos** y **Temas de temporada**.
- En **Temas de temporada**, la pestaña **Más** reúne colores, letra, fondo, adornos, banner, sonidos, textos y pantallas. También tiene exportar e importar tema.

### Respaldo de datos
- **Más → Respaldo de datos → Respaldo completo** descarga un archivo \`.json\` con todo: alumnos, tareas, práctica, avances, calificaciones, calendario, pagos y tu contenido.
- El archivo contiene datos personales de tus alumnos. Puedes ponerle una contraseña (queda cifrado). Al restaurar, la app acepta respaldos con o sin contraseña.
- **Restaurar respaldo**: eliges el archivo y ves un resumen antes de confirmar. La restauración **solo agrega lo que falta**: no borra nada, no cambia contraseñas y no revive alumnos que hayas dado de baja. Si restauras dos veces el mismo archivo, no se duplica nada.
- Recomendación: haz un respaldo cada semana y guárdalo en tu Drive.

### Herramientas
- **Afinador** (adultos): si el micrófono ya está permitido, arranca solo. Si no, hay un botón grande. Arriba ves si hay que apretar o aflojar. Puedes ir cuerda por cuerda; al terminar las 6 hay una celebración. Instrumento, afinaciones, cents, Hz y clavijero están en **Más opciones**.
- **Diccionario**: abre en Do mayor y recuerda lo último que buscaste. Para cambiar de instrumento, toca el botón de arriba.
- El metrónomo muestra los compases más usados y el resto queda en **Más compases**. Ritmos sigue siendo de 2 compases y recuerda el último patrón.
- Micrófono, cámara y avisos se piden solo cuando se usan, no al abrir la app.

## 2. Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Código fuente | Repositorio **privado** de GitHub \`Awosemizer/lml-codigo\` |
| App web publicada | GitHub Pages: \`https://awosemizer.github.io/lml/\` (repositorio público \`Awosemizer/lml\`, solo contiene lo ya construido) |
| APK de Android | GitHub Releases de \`Awosemizer/lml\` (\`lml-v<versión>.apk\`) |
| Datos (alumnos, avances, pagos) | Supabase, proyecto «Escuela de Musica Profe Luis» (\`uqdezpnkwjgqunnhtvto\`) |
| Llave de firma del APK | Carpeta \`android-signing/\` (archivos \`curso-guitarra-pruebas.jks\` y \`keystore.properties\`) |

### La llave de firma (muy importante)
- Android solo instala una actualización si viene firmada con **la misma llave** que la versión anterior. Si la pierdes, tus alumnos tendrán que desinstalar y volver a instalar la app.
- La carpeta \`android-signing/\` **no se sube a GitHub** (está en \`.gitignore\`), así que **no viene en \`Awosemizer/lml-codigo\`**. Guarda una copia en un lugar privado: tu Google Drive, una USB, o ambos.
- \`keystore.properties\` contiene las contraseñas de la llave. No la compartas ni la subas a ningún lado público.
- Para compilar en otra computadora: copia la carpeta \`android-signing/\` completa a la raíz del proyecto.

### Archivos \`.env\`
- \`.env.production\` tiene la dirección de Supabase y la llave **publicable** (es pública por diseño; la seguridad la dan las reglas RLS). Este archivo sí viene en el repositorio de código.

## 3. Publicar una actualización tú mismo

### Lo que necesitas una sola vez
1. Una computadora con **Node.js 20 o más nuevo**, **Git** y la **CLI de GitHub** (\`gh\`).
2. Para el APK: **Android Studio** (trae el SDK y Java).
3. Descargar el código: \`gh repo clone Awosemizer/lml-codigo\` y entrar a la carpeta.
4. Copiar la carpeta \`android-signing/\` a la carpeta del proyecto.
5. \`npm install\`
6. \`gh auth login\` con tu cuenta \`Awosemizer\`.

### Cada vez que publiques
1. Prueba los cambios: \`npm run dev\` y abre \`http://localhost:5173\`. En modo demo los datos son de prueba y no tocan a tus alumnos.
2. Revisa que todo compile: \`npm test\` y \`npm run build\`.
3. Genera el APK con la versión nueva: \`npm run apk\` (sube la versión de parche, por ejemplo 1.8.2 → 1.8.3). Usa \`npm run apk -- minor\` para un cambio grande.
4. Prueba en seco (no sube nada): \`npm run release -- --dry\`
5. Publica: \`npm run release -- --notes "Qué cambió"\`
   - Sube la app web a GitHub Pages.
   - Sube el APK a GitHub Releases.
   - Publica el paquete de actualización automática. Las apps instaladas se actualizan solas al abrirse.
6. Guarda tus cambios de código: \`git add -A\`, \`git commit -m "v1.8.3"\` y \`git push\`.

Si solo cambiaste textos o pantallas (nada nativo), no hace falta instalar un APK nuevo: la actualización automática llega sola. Aun así, \`npm run release\` hace todo junto.

## 4. Supabase

- Entra a \`https://supabase.com/dashboard\` con tu cuenta y abre el proyecto \`uqdezpnkwjgqunnhtvto\`.
- **Table Editor**: ver los datos. Evita editar a mano a tus alumnos reales; usa la app.
- **Authentication**: deja desactivado «Allow new users to sign up». Las cuentas se crean desde la app.
- **Edge Functions**: \`manage-students\` crea, edita y da de baja alumnos.
- **Migraciones**: los cambios a la base de datos están en \`supabase/migrations/\`. Aplica solo migraciones nuevas, en orden, desde el **SQL Editor** o con \`supabase db push\`. Nunca borres tablas con datos.
- En la **1.9.1** se aplicó solo la parte compatible de las migraciones (\`docs/v1.9.1-migraciones.md\`): la función \`add_kid_game_reward\`. Las políticas que quitan al alumno la escritura directa y el paso del cubo de videos a privado quedan pendientes, para no romper a quienes aún usen la 1.9.0.
- **Plan gratuito**: si el proyecto pasa una semana sin uso, Supabase lo pausa. Entra al panel y presiona «Restore project».
- Haz un respaldo desde la app antes de cualquier cambio en Supabase.

## 5. GitHub Pages

- La app web vive en el repositorio público \`Awosemizer/lml\`, rama \`main\`. Ese repositorio solo contiene archivos ya construidos: nada de código fuente ni llaves.
- \`npm run release\` la actualiza. Tarda de 1 a 3 minutos en verse.
- Revisa en \`Awosemizer/lml → Settings → Pages\` que la fuente sea la rama \`main\`.

## 6. Si algo falla

- **La app no carga datos**: revisa que el proyecto de Supabase no esté pausado.
- **El APK no se instala encima del anterior**: se firmó con otra llave. Usa la de \`android-signing/\`.
- **\`gh\` dice que no tienes permiso**: corre \`gh auth login\` otra vez.
- **Más → Registro de errores** muestra los errores que vieron tus alumnos.
`;function c(u,e){return u.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((o,a)=>o.startsWith("**")?n.jsx("strong",{children:o.slice(2,-2)},e+a):o.startsWith("`")?n.jsx("code",{children:o.slice(1,-1)},e+a):o)}function y(u){var p;const e=u.split(`
`),o=[];let a=0;for(;a<e.length;){const i=e[a],s="m"+a;if(!i.trim()){a++;continue}if(i.startsWith("# ")){a++;continue}if(i.startsWith("## ")){o.push(n.jsx("h2",{className:"man-h2",children:c(i.slice(3),s)},s)),a++;continue}if(i.startsWith("### ")){o.push(n.jsx("h3",{className:"man-h3",children:c(i.slice(4),s)},s)),a++;continue}if(i.startsWith("|")){const r=[];for(;a<e.length&&e[a].startsWith("|");)/^\|[-| ]+\|$/.test(e[a])||r.push(e[a].slice(1,-1).split("|").map(l=>l.trim())),a++;o.push(n.jsx("dl",{className:"man-dl",children:r.slice(1).map((l,t)=>n.jsxs("div",{children:[n.jsx("dt",{children:c(l[0],s+"a"+t)}),n.jsx("dd",{children:c(l[1]??"",s+"b"+t)})]},t))},s));continue}const m=/^\d+\. /.test(i);if(m||i.startsWith("- ")){const r=[];for(;a<e.length&&(/^\d+\. /.test(e[a])||e[a].startsWith("- ")||/^\s+- /.test(e[a]));)/^\s+- /.test(e[a])?(p=r[r.length-1])==null||p.sub.push(e[a].trim().slice(2)):r.push({t:e[a].replace(/^(\d+\. |- )/,""),sub:[]}),a++;const l=r.map((t,d)=>n.jsxs("li",{children:[c(t.t,s+d),t.sub.length>0&&n.jsx("ul",{children:t.sub.map((b,g)=>n.jsx("li",{children:c(b,s+d+"s"+g)},g))})]},d));o.push(m?n.jsx("ol",{className:"man-list",children:l},s):n.jsx("ul",{className:"man-list",children:l},s));continue}o.push(n.jsx("p",{children:c(i,s)},s)),a++}return o}function q(){return n.jsx(h,{title:"Manual",children:n.jsx("div",{className:"card manual","data-testid":"manual",children:y(v)})})}export{q as Manual,y as renderManual};
