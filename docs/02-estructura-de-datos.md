# Estructura y almacenamiento de datos — NexoAula

## 1. Descripción general

NexoAula utiliza archivos en formato JSON (*JavaScript Object Notation*) para almacenar y organizar la información necesaria para el funcionamiento de la aplicación.

Este mecanismo permite separar los datos de la lógica de programación y la presentación visual, facilitando su consulta, modificación y mantenimiento.

El proyecto utiliza dos archivos principales de almacenamiento:

| Archivo | Responsabilidad |
|---|---|
| `database.json` | Almacena los registros de usuarios organizados por grado y grupo. |
| `schooldata.json` | Almacena la configuración escolar, los recursos educativos y la información utilizada para generar elementos de la interfaz. |

NexoAula no utiliza actualmente un sistema gestor de bases de datos relacional (SGBD), sino archivos JSON como mecanismo de almacenamiento.

## 2. Archivo `database.json`

### 2.1. Propósito

Almacena los registros de usuarios organizados según el grado escolar y el grupo al que pertenecen.

Su estructura permite mantener separados los registros correspondientes a cada uno de los seis grados de educación primaria y sus respectivos grupos.

### 2.2. Estructura general

```json
{
  "grades": {
    "1": {
      "A": [],
      "B": []
    },
    "2": {
      "A": [],
      "B": [
        {
          "name": "",
          "curp": ""
        }
      ]
    }
  }
}
```

El ejemplo anterior es una representación simplificada de la estructura real.

### 2.3. Descripción de propiedades

| Propiedad | Tipo | Descripción |
|---|---|---|
| `grades` | Object | Contiene los registros organizados por grado escolar. |
| `grades[id]` | Object | Agrupa los registros correspondientes a un grado. |
| `A` | Array | Almacena los registros del grupo A. |
| `B` | Array | Almacena los registros del grupo B. |
| `name` | String | Nombre del usuario registrado. |
| `curp` | String | Clave Única de Registro de Población del usuario. |

### 2.4. Organización de los registros

La propiedad `grades` contiene seis objetos identificados mediante cadenas numéricas del `"1"` al `"6"`.

Cada grado contiene dos arreglos:

- `A`: registros correspondientes al grupo A.
- `B`: registros correspondientes al grupo B.

Cada elemento de estos arreglos representa un registro individual con las siguientes propiedades:

| Propiedad | Tipo | Descripción |
|---|---|---|
| `name` | String | Nombre del usuario. |
| `curp` | String | Identificador CURP del usuario. |

Los arreglos pueden contener cero o más registros. En este ejemplo se muestran vacíos únicamente con fines ilustrativos, para representar la estructura sintáctica de database.json.

## 3. Archivo `schooldata.json`

### 3.1. Propósito

Almacena la información utilizada por la aplicación web para generar dinámicamente los elementos de navegación, los grados escolares y los recursos educativos disponibles.

Su estructura permite administrar el contenido del sitio sin necesidad de modificar directamente el código JavaScript que lo presenta.

### 3.2. Estructura general

El archivo se organiza mediante cuatro propiedades principales:

| Propiedad | Tipo | Responsabilidad |
|---|---|---|
| `mainLinks` | Array | Contiene los enlaces a actividades generales independientes de un grado o grupo que se encuentran en la página de inicio. |
| `activities` | Object | Organiza los recursos educativos por grado y grupo. |
| `grades` | Array | Define los grados escolares disponibles y sus elementos visuales. |
| `namingStandards` | Object | Establece patrones para localizar los iconos del proyecto. |

### 3.3. Propiedad `mainLinks`

Contiene los enlaces destacados que se presentan en la página principal.

Cada elemento del arreglo representa un enlace y contiene las siguientes propiedades:

| Propiedad | Tipo | Descripción |
|---|---|---|
| `name` | String | Nombre descriptivo del enlace. |
| `url` | String | Dirección de destino del enlace. |
| `icon` | String | Nombre del archivo de icono asociado. |

**Ejemplo:**

```json
{
  "name": "Usuarios",
  "url": "users.html",
  "icon": "featured-users.svg"
}
```

### 3.4. Propiedad `activities`

Contiene los recursos educativos organizados por grado escolar.

Cada grado se identifica mediante una clave numérica representada como cadena de texto, del `"1"` al `"6"`.

Dentro de cada grado existen tres categorías:

- `general`: actividades disponibles para todos los grupos del grado.
- `A`: actividades específicas del grupo A.
- `B`: actividades específicas del grupo B.

Cada categoría contiene un arreglo de actividades.

**Estructura de una actividad:**

| Propiedad | Tipo | Descripción |
|---|---|---|
| `name` | String | Nombre descriptivo de la actividad. |
| `url` | String | Dirección web del recurso educativo. |

**Ejemplo:**

```json
{
  "general": [
    {
      "name": "Tablas de multiplicar",
      "url": "https://example.com"
    }
  ],
  "A": [
    {
      "name": "Actividad exclusiva",
      "url": "https://example.com"
    }
  ],
  "B": []
}
```

La separación entre actividades generales y específicas permite proporcionar recursos comunes a todos los estudiantes y otros destinados exclusivamente a determinados grupos. Para explicar mas a detalle entendamos que, los grados se representan con numeros del 1 al 6, pero estos grados internamente pueden contener grupos representados con las letras del alfabeto A, B, C etc.

### 3.5. Propiedad `grades`

Define los grados escolares que presenta la aplicación.

Cada elemento del arreglo representa un grado y contiene:

| Propiedad | Tipo | Descripción |
|---|---|---|
| `id` | String | Identificador numérico del grado. |
| `label` | String | Nombre descriptivo del grado. |
| `icon` | String | Nombre del archivo gráfico asociado. |

**Ejemplo:**

```json
{
  "id": "1",
  "label": "PRIMERO",
  "icon": "grade-1.svg"
}
```

Esta estructura permite generar los elementos visuales de selección de grado a partir de los datos almacenados. Dichos elementos son los que se pueden visualizar en la pagina inicio o en la pagina usuarios.

### 3.6. Propiedad `namingStandards`

Define patrones de nomenclatura para localizar determinados recursos gráficos.

| Propiedad | Tipo | Descripción |
|---|---|---|
| `gradeIcon` | String | Patrón de ubicación de los iconos de grado. |
| `featuredIcon` | String | Patrón de ubicación de los iconos destacados. |

**Ejemplo:**

```json
{
  "gradeIcon": "images/icons/grades/grade-{id}.svg",
  "featuredIcon": "images/icons/featured/{fileName}"
}
```

Los segmentos `{id}` y `{fileName}` representan marcadores que permiten construir las rutas de los recursos correspondientes.

## 4. Relación entre los archivos de datos

Aunque ambos archivos utilizan JSON, sus responsabilidades son independientes.

| Característica | `database.json` | `schooldata.json` |
|---|---|---|
| Finalidad | Almacenamiento de registros de usuarios. | Configuración y contenido educativo. |
| Organización | Grados y grupos. | Enlaces, actividades, grados y recursos gráficos. |
| Información principal | Nombre y CURP. | Nombres, direcciones URL e iconos. |
| Estructura principal | Objetos y arreglos anidados. | Objetos y arreglos anidados. |
| Uso | Administración de registros. | Generación dinámica de la interfaz. |

Ambos archivos comparten una organización por grados escolares, pero no existe una relación referencial implementada entre sus registros.

## 5. Acceso y manipulación de datos

El acceso a la información depende del componente que la utiliza:

| Componente | Responsabilidad |
|---|---|
| Aplicación web | Consulta de los archivos JSON mediante solicitudes HTTP. |
| JavaScript | Procesamiento de los datos y generación de elementos de la interfaz. |
| Herramienta CRUD | Administración de los registros almacenados en `database.json`. |

La consulta de archivos JSON desde la aplicación web requiere un servidor HTTP, como Apache.

## 6. Consideraciones técnicas y seguridad

- Los archivos JSON deben conservar una sintaxis válida para permitir su procesamiento, de lo contrario se pueden presentar errores de visualizacion de ls elementos graficos del sitio web.
- Las propiedades y los tipos de datos deben respetar las estructuras esperadas por los componentes que los utilizan.
- Las modificaciones deben mantener la compatibilidad con la lógica de la aplicación.
- Los enlaces externos deben utilizar direcciones válidas.
- Los archivos que contienen información personal deben almacenarse y gestionarse mediante mecanismos que impidan su acceso y distribución no autorizados. En el caso de `database.json`, al contener nombres y CURP, su ubicación dentro del directorio del proyecto responde a una decisión de simplicidad para el entorno local y al alcance funcional de NexoAula. Sin embargo, esta disposición no representa una práctica recomendada para aplicaciones que gestionan información personal ni debe considerarse una medida de seguridad. En un entorno de producción o despliegue público, estos datos deberían mantenerse fuera del directorio raíz del proyecto accesible desde el servidor web, implementando controles de acceso, protección y almacenamiento adecuados.

## 7. Limitaciones del almacenamiento JSON

El uso de archivos JSON proporciona una solución sencilla para las necesidades actuales del proyecto. Sin embargo, presenta algunas limitaciones frente a un sistema gestor de bases de datos convencional:

- No dispone de consultas relacionales nativas.
- No incorpora mecanismos propios de transacciones.
- La integridad y validación de los datos dependen de la lógica implementada por las herramientas que los manipulan.
- La modificación simultánea de archivos requiere mecanismos de control para evitar inconsistencias.
- No proporciona por sí mismo mecanismos de autenticación ni control de acceso.

Para el alcance actual de NexoAula, este mecanismo permite mantener una estructura de almacenamiento sencilla y de fácil mantenimiento.
