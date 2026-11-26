# Módulos y funcionalidades — NexoAula

## 1. Descripción general

NexoAula está organizado en módulos funcionales que permiten distribuir y administrar los recursos educativos mediante una interfaz web.

Cada módulo cumple una responsabilidad específica dentro de la aplicación, facilitando la navegación, la consulta de información y la organización de los recursos escolares.

## 2. Módulos de la aplicación

### 2.1. Página principal

**Archivo:** `index.html`

**Propósito:** Proporcionar el punto de entrada a la aplicación y permitir el acceso a sus principales secciones.

**Funcionalidades:**

- Presentar los enlaces a actividades disponibles dirigidas a todos los alumnos en general, independiente del grado, o el grupo.
- Permitir la navegación hacia otras secciones de la aplicación. Un ejemplo la pagina usuarios.
- Presentar la selección de grados escolares.

### 2.2. Selección de grado escolar

**Archivo:** `index.html`

**Propósito:** Permitir seleccionar el grado escolar al que pertenecen los recursos educativos que se desean consultar.

**Funcionalidades:**

- Mostrar los seis grados de educación primaria.
- Identificar visualmente cada grado mediante iconografía.
- Permitir seleccionar el grado correspondiente.
- Facilitar el acceso a los recursos educativos asociados al grado seleccionado.

### 2.3. Recursos educativos

**Archivo:** `secondary.html`

**Propósito:** Presentar las actividades y recursos educativos disponibles para cada grado y grupo escolar.

**Funcionalidades:**

- Consultar las actividades generales del grado seleccionado.
- Presentar actividades específicas para los grupos A y B.
- Mostrar el nombre de cada recurso educativo.
- Permitir acceder a los recursos mediante sus respectivas direcciones URL.
- Facilitar el regreso a la página principal.

Los recursos se organizan en actividades generales y actividades específicas de cada grupo, permitiendo ofrecer contenido diferenciado según las necesidades escolares. Es decir se puede generar una actividad exclusiva para un grado indiferente del grupo, o una actividad exclusiva para un grado y grupo especifico.

### 2.4. Usuarios registrados

**Archivo:** `users.html`

**Propósito:** Presentar los registros de usuarios en este caso nombre y curp organizados por grado escolar.

**Funcionalidades:**

- Consultar los registros disponibles.
- Organizar la información por grado escolar.
- Presentar la información asociada a cada registro.

La información de este módulo se encuentra vinculada al almacenamiento de datos del proyecto.

## 3. Organización de los recursos

Los recursos educativos se clasifican mediante tres categorías principales:

| Categoría | Descripción |
|---|---|
| Actividades generales | Recursos disponibles para todos los estudiantes de un mismo grado indiferente del grupo.|
| Actividades por grado y grupo | Recursos destinados exclusivamente a los estudiantes del primer grado grupo A.
| Actividades destacadas | Recursos destinados al alumnado en general, independiente del grado y grupo de estudio.

Esta organización permite adaptar la disponibilidad de los recursos según las necesidades del momento.

## 4. Navegación entre módulos

La navegación del sitio web permite desplazarse entre la página principal, la selección de grado, los recursos educativos y la consulta de usuarios.

El flujo general de navegación se representa de la siguiente manera:

```text
                 Página principal
                        |
          +-------------+-------------+
          |             |             |
       Usuarios      Recursos      Selección
       registrados   destacados   de grado
                                      |
                                      ▼
                                Grupos Disponibles
                                      |
                              +-------+-------+
                              |               |
                         Actividades     Actividades
                          generales       por grupo
```

## 5. Consideraciones funcionales

- Los recursos educativos se organizan mediante archivos JSON para facilitar su actualización. Es decir que si se necesita mostrar un nuevo elemento en la interfaz del sitio web, basta con modiicar el contenido de los archivos .json.
- La disponibilidad de actividades puede variar según el grado y grupo seleccionado.
- La aplicación permite acceder a recursos alojados tanto localmente como en servicios externos.
- La información personal de los usuarios debe manejarse conforme a las medidas de seguridad correspondientes.