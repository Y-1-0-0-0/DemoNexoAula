# Mantenimiento — NexoAula

## 1. Alcance

Este documento establece las consideraciones y procedimientos básicos para realizar modificaciones, actualizaciones y tareas de mantenimiento en NexoAula.

Está dirigido a desarrolladores que necesiten comprender la organización del proyecto y realizar cambios sin comprometer su funcionamiento.

Las indicaciones corresponden a la versión demostrativa del proyecto y no constituyen un procedimiento de mantenimiento para un entorno de producción.

## 2. Requisitos de mantenimiento

Para modificar y ejecutar el proyecto se recomienda disponer de las siguientes herramientas:

| Herramienta | Utilidad |
|---|---|
| Editor de código | Modificación de archivos HTML, CSS, JavaScript y JSON. |
| Git | Control de versiones y seguimiento de modificaciones. |
| Navegador web | Pruebas y verificación de la interfaz. |
| Apache | Servidor HTTP para la ejecución local del proyecto. |

No se requiere instalar un framework JavaScript ni un gestor de paquetes para trabajar con la estructura actual de la aplicación.

## 3. Actualización de datos

Los archivos JSON contienen información utilizada por la aplicación.

Se encuentran organizados dentro del directorio `data/`.

### 3.1. Recursos educativos

El archivo `schooldata.json` permite modificar los enlaces principales, las actividades educativas, los grados escolares y los nombres de los iconos utilizados por la aplicación.

Al realizar modificaciones se recomienda:

- Conservar la estructura de propiedades existente.
- Respetar los nombres de las claves utilizadas por JavaScript.
- Verificar que las direcciones URL sean válidas.
- Comprobar que los nombres de los archivos gráficos coincidan con los recursos disponibles.
- Validar la sintaxis JSON antes de utilizar el archivo.

### 3.2. Registros de usuarios

El archivo `database.json` contiene registros organizados por grado y grupo.

Debido a que puede contener información personal, debe evitarse su distribución en repositorios públicos o entornos accesibles sin autorización.

## 4. Administración de recursos gráficos

Los recursos visuales se encuentran organizados dentro del directorio `images/`.

Antes de incorporar nuevos recursos se recomienda:

- Utilizar el directorio correspondiente a su categoría.
- Mantener una nomenclatura coherente con los archivos existentes.
- Actualizar las referencias cuando se sustituya o renombre un recurso.
- Verificar que las imágenes se visualicen correctamente.
- Conservar los recursos alternativos utilizados para representar imágenes no disponibles.

## 5. Modificación de la aplicación

Los principales archivos de desarrollo se distribuyen de acuerdo con su responsabilidad.

| Archivo o directorio | Modificaciones habituales |
|---|---|
| `index.html` | Estructura de la página principal. |
| `secondary.html` | Estructura de la sección de recursos educativos. |
| `users.html` | Estructura de la consulta de usuarios. |
| `css/style.css` | Diseño visual, distribución y adaptación responsiva. |
| `js/main.js` | Lógica de funcionamiento e interacción. |
| `data/` | Información y configuración de la aplicación. |
| `images/` | Recursos gráficos e iconografía formato estandar del proyecto svg. |

Se recomienda mantener separadas las responsabilidades de cada archivo y evitar duplicar lógica o estilos innecesariamente.

## 6. Verificación de cambios

Después de realizar modificaciones se recomienda comprobar los siguientes aspectos:

- La página principal carga correctamente.
- Los seis grados escolares se presentan adecuadamente.
- La navegación entre las páginas funciona.
- Los recursos educativos corresponden al grado y grupo seleccionado.
- Los enlaces externos conducen a sus destinos correspondientes.
- Los registros de usuarios se muestran correctamente.
- Las imágenes y los iconos se cargan sin errores.
- La interfaz conserva su adaptación a diferentes tamaños de pantalla.
- No existen errores relevantes en la consola del navegador.

Las pruebas deben realizarse mediante el servidor HTTP local y no abriendo directamente los archivos HTML mediante `file://`.

## 7. Problemas frecuentes

| Problema | Posible causa |
|---|---|
| Los datos no aparecen | Error de sintaxis en un archivo JSON o ruta incorrecta. Caché del navegador no actualizada. |
| Las imágenes no cargan | Nombre de archivo incorrecto o referencia inválida. |
| Los cambios no se reflejan | Caché del navegador no actualizada. |
| La navegación falla | Ruta incorrecta o problema en la lógica JavaScript. |
| La interfaz presenta errores visuales | Conflictos o modificaciones en las reglas CSS. |

Ante cualquier problema se recomienda revisar primero la consola del navegador y la pestaña de red (*Network*) de las herramientas de desarrollo.

## 8. Copias de seguridad

Antes de modificar archivos que contienen información importante se recomienda generar una copia de seguridad.

Se debe prestar especial atención a:

- `database.json`
- `schooldata.json`

Las copias que contengan información personal deben mantenerse en ubicaciones privadas y no incorporarse al repositorio público.

El control de versiones mediante Git también permite consultar y recuperar modificaciones realizadas en los archivos del proyecto, siempre que estos se encuentren bajo seguimiento.

## 9. Limitaciones de la versión demo

La versión demostrativa de NexoAula está orientada a presentar el funcionamiento y la estructura técnica del proyecto.

Por su alcance, no debe considerarse una implementación preparada para administrar información personal en un entorno público o multiusuario.

Entre sus consideraciones se encuentran:

- Almacenamiento de información mediante archivos JSON. Correcto para el entorno del proyecto que esta destinado para uso local, pero incorrecto para entornos publicos donde el proyecto este destinado a publicarse a internet.
- Ausencia de un backend dedicado para gestionar solicitudes y permisos.
- Ausencia de mecanismos de autenticación y autorización implementados para proteger los registros.
- Dependencia de un servidor HTTP local para determinadas operaciones.
- Recursos educativos que pueden depender de servicios externos.

Cualquier evolución hacia un entorno de producción deberá contemplar una arquitectura de backend, un sistema de almacenamiento apropiado y mecanismos de seguridad acordes con la información administrada.

## 10. Instalacion

Para ejecutar la versión local se requiere un servidor HTTP que permita servir los archivos estáticos y realizar solicitudes mediante Fetch API. La configuración del servidor queda fuera del alcance de esta versión demo.