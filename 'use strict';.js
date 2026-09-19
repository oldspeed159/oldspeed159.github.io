'use strict';

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

const projectsData = [
    {
        title: "Portfolio Website",
        category: "Web Dev",
        description: "A sleek, responsive personal portfolio built with modern HTML5 & CSS3 layout techniques.",
        year: 2026
    },
    {
        title: "Interactive Music Player",
        category: "Interactive",
        description: "A web-based custom music player interface with functional play state animations and controls.",
        year: 2025
    },
    {
        title: "Web-Based Calculator",
        category: "Utility",
        description: "A clean, functional calculator application built for fast calculations on web browsers.",
        year: 2025
    },
    {
        title: "Network Port Scanner Concept",
        category: "Security",
        description: "A cybersecurity utility demonstration analyzing network port availability and security statuses.",
        year: 2026
    }
];

let activeCategory = 'All';

const projectsContainer = document.getElementById('projectsContainer');
const projectSearch = document.getElementById('projectSearch');
const filterControls = document.getElementById('filterControls');
const projectCount = document.getElementById('projectCount');

function filterProjects(list, category, query) {
    if (!Array.isArray(list)) {
        return [];
    }

    const safeCategory = (category || 'All').trim();
    const safeQuery = (query || '').trim().toLowerCase();

    return list.filter(project => {
        if (!project || typeof project !== 'object') return false;

        const matchesCategory = safeCategory === 'All' || project.category === safeCategory;
        const projectTitle = (project.title || '').toLowerCase();
        const projectDesc = (project.description || '').toLowerCase();
        const matchesQuery = safeQuery === '' || projectTitle.includes(safeQuery) || projectDesc.includes(safeQuery);

        return matchesCategory && matchesQuery;
    });
}

function renderProjects(items) {
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    if (!Array.isArray(items) || items.length === 0) {
        projectsContainer.innerHTML = `<p class="no-results">No matching projects found. Try adjusting your search term or filter category.</p>`;
        if (projectCount) {
            projectCount.textContent = `Showing 0 of ${projectsData.length} projects.`;
        }
        return;
    }

    let htmlMarkup = '';
    items.forEach(project => {
        const title = project.title || 'Untitled Project';
        const category = project.category || 'General';
        const description = project.description || 'No description provided.';
        const year = project.year || '2026';

        htmlMarkup += `
            <div class="card">
                <div class="card-tag">${category} • ${year}</div>
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;
    });

    projectsContainer.innerHTML = htmlMarkup;

    if (projectCount) {
        projectCount.textContent = `Showing ${items.length} of ${projectsData.length} projects.`;
    }
}

function applyFiltersAndRender() {
    const query = projectSearch ? projectSearch.value : '';
    const filteredList = filterProjects(projectsData, activeCategory, query);
    renderProjects(filteredList);
}

if (filterControls) {
    filterControls.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.classList.contains('filter-btn')) return;

        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');

        activeCategory = target.getAttribute('data-category') || 'All';
        applyFiltersAndRender();
    });
}

if (projectSearch) {
    projectSearch.addEventListener('input', applyFiltersAndRender);
}

applyFiltersAndRender();