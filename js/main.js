const DATA_FILE = 'data/schooldata.json';
const ICONS_PATH = 'images/icons/';
const GRADE_ICONS_PATH = ICONS_PATH + 'grades/';
const GROUP_ICONS_PATH = ICONS_PATH + 'groups/';
const FEATURED_ICONS_PATH = ICONS_PATH + 'featured/';
const FALLBACK_ICON = 'images/fallbacks/img-unavailable.svg';

/**
 * Asigna una imagen y utiliza un icono alternativo si falla su carga.
 */
function setIconWithFallback(imgEl, srcPath, fallback) {
    if (!imgEl || !fallback) return;

    imgEl.onerror = () => {
        imgEl.onerror = null;
        imgEl.src = fallback;
    };

    imgEl.src = srcPath;
}

/**
 * Inicializa los eventos de interacción de las tarjetas de grado.
 * Alterna la clase `active` al hacer clic en la imagen de cada tarjeta.
 */
function initDropdownListeners() {
    const imgs = document.querySelectorAll('.card-box .grade-img');

    imgs.forEach(img => img.addEventListener('click', () => {
        // Obtiene la tarjeta asociada y alterna su estado visual.
        const p = img.closest('.card-box');
        if (p) p.classList.toggle('active');
    }));
}


/**
* Inicializa la selección de grados escolares desde las tarjetas.
* Guarda el grado seleccionado en localStorage y redirige a secondary.html.
*/
function initGradeSelection() {
    const links = document.querySelectorAll('.grade-card');

    links.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();

        const id = link.dataset.gradeId;
        if (!id) return;

        // Guarda el grado seleccionado para recuperarlo en la página secundaria.
        localStorage.setItem('selectedGrade', id);

        // Redirige al usuario a la página de actividades del grado.
        window.location.href = 'secondary.html';
    }));
}

/**
 * Valida el campo de búsqueda y limpia su contenido tras enviarlo.
 * Evita el envío si está vacío o contiene solo espacios.
 */
function initForms() {
    const form = document.querySelector('#google-form .search-form');
    const input = form?.querySelector('input[name="q"]');

    if (!form || !input) return;

    form.addEventListener('submit', (e) => {
        if (!input.value.trim()) {
            e.preventDefault();
            input.focus();
            return;
        }

        setTimeout(() => input.value = '', 100);
    });
}

/**
 * Carga los datos de la página principal desde el archivo schooldata.json.
 * Genera las tarjetas de grados y accesos directos, y habilita su selección.
 * Muestra mensajes de error si falla la carga de datos.
 */
async function loadHomepage() {
    const gradesContainer = document.getElementById('grades-list');
    const featuredContainer = document.getElementById('featured-list');
    if (!gradesContainer || !featuredContainer) return;
    let data;
    try {
        const r = await fetch(DATA_FILE);
        if (!r.ok) throw new Error('Error critico, no se encuentra el archivo .json');
        data = await r.json();
    } catch (e) {
        console.error(e);
        gradesContainer.textContent = 'Error al cargar grados desde schoolData.json';
        featuredContainer.textContent = 'Error al cargar accesos directos desde schoolData.json';
        return;
    }
    gradesContainer.innerHTML = '';
    (data.grades || []).forEach(g => {
        const card = document.createElement('div');
        card.className = 'card-container';
        const link = document.createElement('a');
        link.className = 'grade-card';
        link.href = 'secondary.html';
        link.dataset.gradeId = g.id;
        const img = document.createElement('img');
        img.alt = `Grado ${g.id}`;
        setIconWithFallback(img, GRADE_ICONS_PATH + (g.icon || `grade-${g.id}.svg`), FALLBACK_ICON);
        const footer = document.createElement('div');
        footer.className = 'card-footer';
        const h = document.createElement('h6');
        h.className = 'card-footer-text';
        h.textContent = g.label || `Grade ${g.id}`;
        footer.appendChild(h);
        link.appendChild(img);
        link.appendChild(footer);
        card.appendChild(link);
        gradesContainer.appendChild(card);
    });
    featuredContainer.innerHTML = '';
    (data.mainLinks || []).forEach(item => {
        const box = document.createElement('div');
        box.className = 'featured-card';
        const a = document.createElement('a');
        a.href = item.url || '#';
        a.rel = 'noopener noreferrer';
        const img = document.createElement('img');
        img.alt = `Acceso a ${item.name}`;
        setIconWithFallback(img, FEATURED_ICONS_PATH + (item.icon || 'featured-generic.svg'), FEATURED_ICONS_PATH + 'featured-generic.svg');
        const desc = document.createElement('div');
        desc.className = 'description';
        desc.textContent = item.name || '';
        a.appendChild(img);
        a.appendChild(desc);
        box.appendChild(a);
        featuredContainer.appendChild(box);
    });
    initGradeSelection();
}

/**
 * Carga los grupos y actividades del grado seleccionado.
 * Genera dinámicamente las tarjetas y gestiona el panel de actividades.
 * @async
 */
async function loadSecondary() {
    const container = document.getElementById('groups-list');
    const overlay = document.getElementById('activity-overlay');
    const floating = document.getElementById('floating-activities');
    if (!container || !overlay || !floating) return;
    const selectedGrade = localStorage.getItem('selectedGrade');
    if (!selectedGrade) return;
    let data;
    try {
        const r = await fetch(DATA_FILE);
        if (!r.ok) throw new Error('Error al cargar JSON');
        data = await r.json();
    } catch (e) {
        console.error(e);
        container.textContent = 'Error al cargar schoolData.json';
        return;
    }
    container.innerHTML = '';
    const gradeObj = (data.activities && data.activities[selectedGrade]) || { A: [] };
    const groups = Object.keys(gradeObj).filter(k => k.toLowerCase() !== 'general');
    groups.forEach(group => {
        const box = document.createElement('div');
        box.className = 'card-box';
        const img = document.createElement('img');
        img.alt = `Grupo ${group}`;
        img.className = 'grade-img';
        setIconWithFallback(img, `${GROUP_ICONS_PATH}grade-${group.toLowerCase()}.svg`, FALLBACK_ICON);
        box.addEventListener('click', () => {
            floating.replaceChildren();
            const generalActivities = Array.isArray(gradeObj.general) ? gradeObj.general : [];
            const groupActivities = Array.isArray(gradeObj[group]) ? gradeObj[group] : [];
            let merged = [...generalActivities, ...groupActivities];
            const activities = merged.filter(
                (act, index, self) =>
                    index === self.findIndex(a => a.url === act.url && a.name === act.name)
            );
            const scrollArea = document.createElement('div');
            scrollArea.className = 'scroll-area';
            floating.appendChild(scrollArea);
            if (activities.length === 0) {
                const empty = document.createElement('div');
                empty.className = 'activity-item empty';
                empty.textContent = 'No hay actividades disponibles';
                scrollArea.appendChild(empty);
            } else {
                activities.forEach(act => {
                    const item = document.createElement('div');
                    item.className = 'activity-item';
                    item.textContent = act.name || 'Actividad';
                    item.addEventListener('click', () => window.open(act.url || '#', '_blank'));
                    scrollArea.appendChild(item);
                });
            }
            overlay.style.display = 'block';
            floating.classList.add('show');
            overlay.classList.remove('hidden');
            floating.classList.remove('hidden');
        });
        box.appendChild(img);
        container.appendChild(box);
    });
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        floating.classList.remove('show');
        floating.classList.add('hidden');
        overlay.classList.add('hidden');
    });
    const titleEl = document.getElementById('page-title');
    const gradeNameEl = document.getElementById('grade-name');
    const faviconEl = document.getElementById('favicon-dynamic');
    if (titleEl) titleEl.textContent = `Grado ${selectedGrade}`;
    if (gradeNameEl) gradeNameEl.textContent = `Grado ${selectedGrade} lista de actividades`;
    if (faviconEl)
        setIconWithFallback(
            faviconEl,
            `${GRADE_ICONS_PATH}grade-${selectedGrade}.svg`,
            FALLBACK_ICON
        );
}
/**
 * Carga los grados y usuarios desde sus respectivos archivos JSON.
 * Permite consultar los usuarios por grado, visualizar y copiar su CURP.
 * Gestiona la apertura y el cierre del panel de usuarios.
 */
async function loadUsersPage() {
    const container = document.getElementById('users-list');
    const overlay = document.getElementById('user-overlay');
    const floating = document.getElementById('floating-users');
    if (!container || !overlay || !floating) return;
    let dataGrades, dataUsers;
    try {
        const [gradesRes, usersRes] = await Promise.all([
            fetch(DATA_FILE),
            fetch('data/database.json')
        ]);
        if (!gradesRes.ok || !usersRes.ok) throw new Error('Error al cargar JSON');
        dataGrades = await gradesRes.json();
        dataUsers = await usersRes.json();
    } catch (e) {
        console.error(e);
        container.textContent = 'Error al cargar database.json';
        return;
    }
    container.innerHTML = '';
    (dataGrades.grades || []).forEach(g => {
        const card = document.createElement('div');
        card.className = 'card-container';
        const link = document.createElement('a');
        link.className = 'grade-card';
        link.href = '#';
        link.dataset.gradeId = g.id;
        const img = document.createElement('img');
        setIconWithFallback(img, GRADE_ICONS_PATH + (g.icon || `grade-${g.id}.svg`), FALLBACK_ICON);
        img.alt = g.label || `Grado ${g.id}`;
        const footer = document.createElement('div');
        footer.className = 'card-footer';
        const h = document.createElement('h6');
        h.className = 'card-footer-text';
        h.textContent = g.label || `Grado ${g.id}`;
        footer.appendChild(h);
        link.appendChild(img);
        link.appendChild(footer);
        card.appendChild(link);
        container.appendChild(card);
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const gradeId = g.id;
            floating.replaceChildren();
            const scrollArea = document.createElement('div');
            scrollArea.className = 'scroll-area';
            floating.appendChild(scrollArea);
            const usersForGrade = dataUsers.grades?.[gradeId] || {};
            const allUsers = Object.values(usersForGrade).flat();
            if (allUsers.length === 0) {
                const empty = document.createElement('div');
                empty.className = 'activity-item empty';
                empty.textContent = 'No hay usuarios disponibles';
                scrollArea.appendChild(empty);
            } else {
                allUsers.forEach(u => {
                    const card = document.createElement('div');
                    card.className = 'activity-item user-card';
                    const text = document.createElement('div');
                    text.className = 'user-text';
                    text.textContent = u.name || 'Usuario desconocido';
                    card.appendChild(text);
                    scrollArea.appendChild(card);
                    let showingCURP = false;
                    card.addEventListener('click', async (e) => {
                        const selectedText = window.getSelection().toString();
                        if (selectedText) return;
                        if (!showingCURP) {
                            text.textContent = '';
                            const curpSpan = document.createElement('span');
                            curpSpan.className = 'curp-text';
                            curpSpan.textContent = u.curp || 'CURP no disponible';
                            text.appendChild(curpSpan);
                            const copySpan = document.createElement('span');
                            copySpan.className = 'copy-indicator';
                            copySpan.textContent = u.curp ? ' (Copiado)' : ' (No se pudo copiar)';
                            text.appendChild(copySpan);
                            if (u.curp) {
                                try {
                                    if (navigator.clipboard && navigator.clipboard.writeText) {
                                        await navigator.clipboard.writeText(u.curp);
                                    } else {
                                        // Fallback para HTTP o contextos inseguros (XAMPP)
                                        const textArea = document.createElement('textarea');
                                        textArea.value = u.curp;
                                        document.body.appendChild(textArea);
                                        textArea.select();
                                        document.execCommand('copy');
                                        document.body.removeChild(textArea);
                                    }
                                    copySpan.textContent = ' (Copiado)';
                                } catch (err) {
                                    console.warn('Error al copiar CURP:', err);
                                    copySpan.textContent = ' (No se pudo copiar)';
                                }
                            }

                            showingCURP = true;
                        } else {
                            text.textContent = u.name || 'Usuario desconocido';
                            showingCURP = false;
                        }
                    });
                });
            }
            overlay.style.display = 'block';
            floating.classList.add('show');
            overlay.classList.remove('hidden');
            floating.classList.remove('hidden');
        });
    });
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        floating.classList.remove('show');
        floating.classList.add('hidden');
        overlay.classList.add('hidden');
    });
}
// Abre el formulario asociado y muestra el overlay al seleccionar una tarjeta.
document.querySelectorAll('.search-card').forEach(card => {
    card.addEventListener('click', () => {
        const formId = card.dataset.form;
        document.getElementById(formId).classList.remove('hidden');
        document.getElementById('floating-overlay').classList.remove('hidden');
    });
});
// Cierra los formularios abiertos y oculta el overlay al hacer clic fuera de ellos.
const overlay = document.getElementById('floating-overlay');
if (overlay) {
    overlay.addEventListener('click', () => {
        document.querySelectorAll('.floating-form').forEach(f => f.classList.add('hidden'));
        overlay.classList.add('hidden');
    });
}
/**
 * Aplica transiciones de entrada y salida entre páginas.
 * Excluye enlaces externos, anclas y enlaces que abren nuevas pestañas.
 */
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    body.classList.add('fade-in');
    document.querySelectorAll('a[href]').forEach(link => {
        if (link.hostname && link.hostname !== window.location.hostname) return;
        if (link.getAttribute('href').startsWith('#')) return;
        if (link.target === '_blank') return;
        link.addEventListener('click', e => {
            e.preventDefault();
            body.classList.remove('fade-in');
            body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    });
});
/**
 * Gestiona el menú contextual personalizado.
 * Permite copiar texto seleccionado con notificaciones visuales
 * o bloquear el menú contextual según la configuración de la página.
 */
(function () {
    const menu = document.getElementById('custom-context-menu');
    const copyBtn = document.getElementById('copy-option');

    if (!menu) return;
    if (document.body.classList.contains('allow-context')) {
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            const x = e.clientX;
            const y = e.clientY;
            menu.style.left = `${x}px`;
            menu.style.top = `${y}px`;
            menu.classList.remove('hidden');
        });
        document.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
        function showTooltip(msg, x, y) {
            const tooltip = document.createElement('div');
            tooltip.className = 'temp-tooltip';
            tooltip.style.position = 'fixed';
            tooltip.style.top = `${y + 10}px`;
            tooltip.style.left = `${x + 10}px`;
            tooltip.style.background = '#222';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '6px 10px';
            tooltip.style.borderRadius = '6px';
            tooltip.style.fontSize = '0.9em';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.zIndex = 25;
            tooltip.style.opacity = 0;
            tooltip.style.transition = 'opacity 0.2s ease';
            tooltip.textContent = msg;
            document.body.appendChild(tooltip);
            requestAnimationFrame(() => (tooltip.style.opacity = 1));
            setTimeout(() => {
                tooltip.style.opacity = 0;
                setTimeout(() => tooltip.remove(), 250);
            }, 2500);
        }
        copyBtn.addEventListener('click', () => {
            const selection = window.getSelection().toString();
            let x = 0, y = 0;

            if (selection) {
                const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
                x = rect.left + rect.width / 2;
                y = rect.top + rect.height / 2;

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(selection)
                        .then(() => showTooltip('Texto copiado', x, y))
                        .catch(() => showTooltip('No se pudo copiar', x, y));
                } else {
                    const textArea = document.createElement('textarea');
                    textArea.value = selection;
                    document.body.appendChild(textArea);
                    textArea.select();

                    try {
                        document.execCommand('copy');
                        showTooltip('Texto copiado (método alternativo)', x, y);
                    } catch {
                        showTooltip('No se pudo copiar', x, y);
                    }

                    document.body.removeChild(textArea);
                }
            } else {
                showTooltip('No hay texto seleccionado', x, y);
            }

            menu.classList.add('hidden');
        });
    } else {
        document.addEventListener("contextmenu", function (event) { event.preventDefault(); });
    }
})();

/**
 * Deshabilita el menú contextual del navegador.
 * Nota: no constituye una medida de seguridad real.
 */
window.oncontextmenu = () => false;

/**
 * Inicializa la página cuando el documento HTML ha terminado de cargarse.
 * Ejecuta las funciones correspondientes según la página actual.
 */
document.addEventListener('DOMContentLoaded', async () => {

    // Hace visible el contenido principal de la página.
    document.body.style.visibility = 'visible';

    // Identifica la página actual a partir de su ruta.
    const path = window.location.pathname.split('/').pop();

    // Página principal.
    if (!path || path === 'index.html' || path === 'principal.html') {
        await loadHomepage();

        // Espera a que la interfaz principal termine de generarse.
        setTimeout(() => {
            const usersCard = document.querySelector('.featured-card[href="users.html"]');

            if (usersCard) {
                usersCard.removeAttribute('target');

                // Aplica una transición antes de navegar a la página de usuarios.
                usersCard.addEventListener('click', e => {
                    e.preventDefault();

                    document.body.classList.remove('fade-in');
                    document.body.classList.add('fade-out');

                    setTimeout(() => {
                        window.location.href = usersCard.getAttribute('href');
                    }, 400);
                });
            }
        }, 200);

        // Página de selección de actividades por grado.
    } else if (path === 'secondary.html') {
        await loadSecondary();

        // Página de administración de usuarios.
    } else if (path === 'users.html') {
        await loadUsersPage();

        const homeBtn = document.querySelector('.home-button');

        if (homeBtn) {
            // Utiliza el icono genérico si la imagen del botón no puede cargarse.
            const homeImg = homeBtn.querySelector('img');

            if (homeImg && homeImg.getAttribute('src')) {
                setIconWithFallback(
                    homeImg,
                    homeImg.getAttribute('src'),
                    FALLBACK_ICON
                );
            }

            // Intenta cerrar la ventana y, si no es posible, vuelve al inicio.
            homeBtn.addEventListener('click', e => {
                e.preventDefault();

                window.close();

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);
            });
        }
    }

    // Inicializa los eventos de los formularios disponibles.
    initForms();
});

