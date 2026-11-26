# Estándares y convenciones de desarrollo

## 1. Propósito

Este documento establece los criterios técnicos y convenciones utilizados en el desarrollo de NexoAula, con el propósito de mantener una estructura organizada, facilitar el mantenimiento del código fuente y favorecer la comprensión del proyecto por parte de otros desarrolladores.

Los criterios comprenden la organización de archivos, nomenclatura, arquitectura, programación, gestión de recursos, estructura de datos y control de versiones.

## 2. Tecnologías utilizadas

El proyecto utiliza tecnologías web estándar, sin depender de frameworks de desarrollo frontend ni de un backend propio.

| Tecnología | Aplicación |
|---|---|
| HTML5 | Estructura y organización del contenido. |
| CSS3 | Presentación, estilos y animaciones. |
| JavaScript (Vanilla) | Lógica, interactividad y manipulación dinámica del DOM. |
| JSON | Almacenamiento y organización de información. |
| Git | Control de versiones. |
| GitHub | Alojamiento del código fuente y gestión del repositorio. |
| GitHub Pages | Publicación de la demostración del proyecto. |

## 3. Arquitectura y paradigma de programación

### 3.1. Paradigma de programación

Se utiliza principalmente programación imperativa y procedural, complementada con un enfoque orientado a eventos.

Los procedimientos y funciones se organizan de acuerdo con las responsabilidades de cada funcionalidad, evitando incorporar complejidad arquitectónica innecesaria.

No se utiliza programación orientada a objetos basada en clases ni un framework frontend.

### 3.2. Separación de responsabilidades

Se procura mantener diferenciadas las siguientes responsabilidades:

- HTML: estructura y contenido inicial de las páginas.
- CSS: presentación visual, distribución y comportamiento gráfico.
- JavaScript: lógica de interacción, manipulación del DOM y carga de información.
- JSON: almacenamiento de datos y contenido utilizado por la aplicación.
- Recursos multimedia: imágenes, iconos y elementos gráficos.

## 4. Convenciones de nomenclatura

### 4.1. Archivos y directorios

Se utiliza nomenclatura descriptiva, preferentemente en minúsculas, con palabras separadas mediante guiones cuando corresponde.

Ejemplos:

- `index.html`
- `secondary.html`
- `users.html`
- `main.js`
- `style.css`
- `database.json`
- `schooldata.json`

Los nombres deben identificar claramente el propósito del archivo o directorio.

Se evita utilizar espacios, caracteres especiales y nombres ambiguos.

### 4.2. HTML

Los documentos HTML utilizan la extensión `.html` y nombres descriptivos en minúsculas.

Se procura emplear elementos semánticos de HTML5 cuando su función lo permite.

Ejemplos de elementos:

- `header`
- `main`
- `nav`
- `section`
- `article`
- `footer`

### 4.3. CSS

Se utiliza la nomenclatura `kebab-case` para clases, identificadores y nombres de variables personalizadas.

Ejemplos:

- `.secondary-header`
- `.home-button`
- `.home-icon`
- `--background-color`
- `--primary-color`

Los estilos se organizan mediante selectores relacionados con los componentes y elementos de la interfaz.

Se procura centralizar las reglas generales y variables de diseño en la hoja de estilos principal.

### 4.4. JavaScript

Se utiliza `camelCase` para nombrar variables y funciones.

Ejemplos:

- `loadHomepage()`
- `loadSecondary()`
- `loadUsersPage()`
- `setIconWithFallback()`

Los nombres deben describir la responsabilidad de la variable o función.

Se procura utilizar verbos para identificar acciones y evitar abreviaturas que dificulten la comprensión.

### 4.5. Archivos JSON

Los archivos JSON utilizan nombres descriptivos y la extensión `.json`.

Se mantiene la estructura de propiedades y relaciones definida por el modelo de datos del proyecto.

Los cambios en la estructura deben realizarse de manera consistente con las funciones que consumen dicha información.

No se deben incluir contraseñas, credenciales, datos personales ni información institucional privada en los archivos destinados a la publicación.

## 5. Organización del código

### 5.1. JavaScript

Las funciones se organizan de acuerdo con su responsabilidad dentro de la aplicación.

Se procura:

- Evitar duplicación innecesaria de código.
- Separar la carga de información de su representación visual.
- Utilizar funciones reutilizables cuando exista una responsabilidad compartida.
- Evitar variables globales innecesarias.
- Mantener nombres descriptivos.
- Controlar los errores derivados de operaciones asíncronas y solicitudes Fetch.

### 5.2. CSS

Los estilos se mantienen separados de los documentos HTML.

Se procura:

- Centralizar las variables de diseño.
- Agrupar reglas relacionadas.
- Evitar declaraciones duplicadas.
- Mantener selectores específicos y comprensibles.
- Utilizar transiciones y animaciones sin perjudicar la interacción.
- Mantener coherencia visual entre las distintas páginas.

### 5.3. HTML

Se evita incorporar grandes cantidades de estilos o lógica JavaScript directamente en los documentos HTML.

Se utilizan referencias externas a las hojas de estilos, scripts y recursos multimedia cuando corresponde.

## 6. Gestión y consumo de datos

La información se almacena en archivos JSON para mantener separados los datos de la lógica de presentación.

La web utiliza la API Fetch de JavaScript para recuperar y procesar dicha información.

Se consideran los siguientes criterios:

- Mantener estructuras JSON válidas.
- Evitar duplicar información innecesariamente.
- Conservar la coherencia entre las propiedades y sus consumidores.
- Gestionar errores durante la recuperación de información.
- Utilizar rutas relativas para facilitar la ejecución en diferentes entornos.
- Evitar almacenar información sensible en archivos públicos.

## 7. Gestión de recursos multimedia

Las imágenes e iconos se organizan en directorios según su función dentro de la interfaz.

Se procura:

- Utilizar nombres descriptivos.
- Mantener una clasificación consistente.
- Evitar duplicados innecesarios.
- Utilizar recursos locales cuando sea posible.
- Definir alternativas visuales cuando un recurso no se encuentre disponible.
- Mantener las referencias a los archivos actualizadas.

## 8. Control de versiones

El proyecto utiliza Git para administrar los cambios del código fuente y mantener un historial de desarrollo.

Se establece una organización de ramas con las siguientes responsabilidades:

| Rama | Responsabilidad |
|---|---|
| `main` | Versiones estables y publicables. |
| `develop` | Integración del desarrollo activo. |
| `feature/*` | Desarrollo de funcionalidades o modificaciones específicas. |

Se procura utilizar commits descriptivos que permitan identificar el propósito de cada modificación.

La integración de cambios se realiza mediante solicitudes de incorporación (Pull Requests), cuando corresponde.

Las versiones estables pueden identificarse mediante etiquetas siguiendo el esquema de versionado semántico:

`MAJOR.MINOR.PATCH`

Ejemplo: `v2.0.1`.

## 9. Compatibilidad y ejecución

NexoAula está desarrollado para ejecutarse en navegadores web modernos compatibles con HTML5, CSS3 y JavaScript.

Por su arquitectura estática, no requiere:

- MySQL o MariaDB.
- Node.js.
- Frameworks frontend.

Para la ejecución local se requiere un servidor HTTP que permita servir los documentos y procesar las solicitudes realizadas mediante Fetch API.

La demostración pública se distribuye mediante GitHub Pages, siempre que los recursos requeridos estén disponibles en el repositorio publicado.

La disponibilidad de recursos externos como el contenido educativo depende de sus respectivos proveedores y de la conexión a Internet.

## 10. Seguridad y publicación

Se procura mantener separados los recursos públicos de aquellos que contienen información privada o institucional.

Para la publicación del proyecto se consideran los siguientes criterios:

- No publicar credenciales ni contraseñas.
- Excluir información institucional privada.
- Evitar incluir datos personales de estudiantes o personal educativo.
- Mantener archivos de configuración sensibles fuera del repositorio público.
- Revisar los recursos y enlaces externos antes de publicar.
- Verificar que los archivos necesarios para la demostración estén disponibles.

## 11. Mantenimiento y evolución

Las modificaciones deben conservar la organización general del proyecto y evitar introducir dependencias innecesarias.

Se recomienda:

- Revisar el impacto de los cambios antes de integrarlos.
- Mantener actualizada la documentación.
- Verificar la integridad de los archivos JSON.
- Comprobar las rutas de recursos.
- Probar las funcionalidades afectadas después de cada modificación.
- Mantener las versiones publicadas en condiciones funcionales.

---

**Nota:** Estos criterios describen la organización y las convenciones de desarrollo de NexoAula. No representan una certificación de cumplimiento de normas externas ni implican que todas las recomendaciones estén implementadas de manera exhaustiva en cada archivo del proyecto. Utilia esta documentacion como una guia no como un reglamento estricto a seguir durante el desarrollo.