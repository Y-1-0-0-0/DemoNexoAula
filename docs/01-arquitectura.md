Arquitectura del proyecto — NexoAula

1. Descripción general

NexoAula es una aplicación web educativa orientada a la organización y distribución de recursos didácticos digitales para estudiantes de educación primaria.

Su propósito es centralizar recursos educativos mediante una interfaz gráfica accesible, facilitando su consulta y utilización dentro del entorno escolar. Optimizando tiemos de acceso a diversos recursos educativos dispersos en internet, facilitando las tareas academicas del tutor dentro de una sala de medios.

El proyecto utiliza tecnologías web del lado del cliente, principalmente HTML5, CSS3 y JavaScript, junto con archivos JSON para almacenar y proporcionar información a la aplicación.

La arquitectura está basada en una estructura modular por responsabilidades, separando la presentación, la lógica de funcionamiento, los datos y los recursos gráficos.

NexoAula utiliza una arquitectura frontend estática de tipo multipágina (MPA, Multi-Page Application).

La navegación se distribuye entre distintos documentos HTML, mientras que JavaScript se encarga de generar y actualizar dinámicamente determinados elementos de la interfaz.

La información se encuentra separada de la lógica de presentación mediante archivos JSON, consultados mediante la API Fetch.

2. Tecnologías utilizadas

| Tecnología | Responsabilidad |
|:---|:---|
| HTML5 | Estructura y contenido de las páginas. |
| CSS3 | Presentación visual, diseño y adaptación responsiva. |
| JavaScript | Lógica de funcionamiento y generación dinámica de contenido. |
| JSON | Almacenamiento y organización de datos utilizados por la aplicación. |
| Apache | Servidor HTTP para la ejecución local. |
3. Estructura de directorios

1. ESTRUCTURA DE DIRECTORIOS
--------------------------------------------------
```text
NexoAula/
│
├── css/
│   └── style.css
│
├── data/
│   ├── database.json
│   └── schooldata.json
│
├── docs/
│   ├── 01-arquitectura.md
|   ├── 02-estructura-de-datos.md
|   ├── 03-modulos-y-funcionalidades.md
|   ├── 04-estandares-de-desarrollo.md
|   ├── 05-mantenimiento.md
│
├── images/
│   ├── background/
│   │   └── default-background.svg
│   │
│   ├── fallbacks/
│   │   └── img-unavailable.svg
│   │
│   └── icons/
│       ├── featured/
│       │   ├── featured-general.svg
│       │   ├── featured-users.svg
│       │   ├── google-logo.svg
│       │   ├── home.svg
│       │   └── site-favicon.jpg
│       │
│       ├── grades/
│       │   ├── grade-1.svg
│       │   ├── grade-2.svg
│       │   ├── grade-3.svg
│       │   ├── grade-4.svg
│       │   ├── grade-5.svg
│       │   └── grade-6.svg
│       │
│       ├── groups/
│       │   ├── grade-a.svg
│       │   └── grade-b.svg
│       │
│       └── subjects/
│           ├── big-cursor.svg
│           └── small-cursor.svg
│
├── js/
│   └── main.js
│
├── index.html
├── secondary.html
├── users.html
├── README.md
```
4. Organización de los componentes

4.1. Archivos principales

"index.html"

Punto de entrada principal de la aplicación. Contiene la estructura HTML de la página de inicio y las referencias a las hojas de estilo y los archivos JavaScript necesarios.

"secondary.html"

Página secundaria destinada a presentar los recursos educativos organizados por grupo correspondientes al grado seleccionado.

"users.html"

Página destinada a mostrar información de facil acceso relacionada con los usuarios registrados.

4.2. Directorio "css/"

Contiene los archivos encargados de la presentación visual de la aplicación.

- "style.css": hoja de estilos principal. Centraliza las reglas visuales, componentes, distribución, adaptación responsiva y efectos de interacción de la interfaz.

4.3. Directorio "js/"

Contiene los archivos responsables de la lógica de funcionamiento.

- "main.js": archivo JavaScript principal. Gestiona la lógica de la página de inicio y la generación dinámica de determinados elementos de la interfaz a partir de los datos disponibles dentro del directorio data/.

4.4. Directorio "data/"

Contiene archivos JSON utilizados como fuentes de información para la aplicación.

- "database.json": archivo de datos del proyecto utilizado principalmente en la generacion del contenido de la pagina users.html.
- "schooldata.json": archivo destinado a almacenar información y recursos asociados a algunas paginas internas del sitio web, tal es el caso del contendo de index.html y secondary.html.

Los archivos JSON permiten separar la información de la lógica de presentación, facilitando su mantenimiento y actualización.

4.5. Directorio "images/"

Almacena los recursos gráficos utilizados por la interfaz.

- "background/": imágenes destinadas a fondos del sitio web.
- "fallbacks/": recursos alternativos utilizados cuando una imagen no está disponible.
- "icons/": iconografía utilizada para representar secciones, grados, grupos, asignaturas y recursos destacados.

5. Arquitectura de funcionamiento

La aplicación utiliza una arquitectura del lado del cliente (client-side).

Su funcionamiento general se organiza de la siguiente manera:

1. El navegador solicita y procesa el documento HTML.
2. El HTML carga las hojas de estilo y los archivos JavaScript correspondientes.
3. JavaScript ejecuta la lógica necesaria para inicializar los componentes de la interfaz.
4. Cuando se requieren datos externos al código JavaScript, se consultan los archivos JSON mediante solicitudes HTTP.
5. La información obtenida se utiliza para generar o actualizar elementos de la interfaz.
6. CSS controla la presentación visual y los estados de interacción de los componentes.

Esta separación permite mantener diferenciadas la estructura, la presentación, la lógica y la información de la aplicación.

6. Entorno de ejecución

NexoAula está diseñado para ejecutarse mediante un servidor web HTTP.

Para su ejecución local puede utilizarse Apache mediante XAMPP en sistemas Windows.

No requiere necesariamente una conexión a Internet para funcionar, siempre que los recursos, archivos y dependencias necesarios estén disponibles localmente.

El acceso a los archivos JSON mediante solicitudes HTTP requiere ejecutar la aplicación desde un servidor web y no directamente mediante el protocolo "file://".

7. Consideraciones arquitectónicas

- La aplicación utiliza tecnologías web nativas, sin depender de ningun framework para su funcionamiento principal.
- La información se encuentra separada de la lógica de presentación mediante archivos JSON.
- Los recursos gráficos se organizan por categorías para facilitar su identificación y mantenimiento.
- La hoja de estilos principal centraliza la presentación visual de la aplicación.
