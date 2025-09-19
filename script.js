// Draft Table Local Storage Persistence
document.addEventListener('DOMContentLoaded', function () {
    const draftTable = document.querySelector('.draft-table');
    if (!draftTable) return;

    // Identificatore unico per la tabella (puoi cambiarlo se hai più tabelle)
    const STORAGE_KEY = 'drunkest_draft_table';

    // Carica i dati salvati
    function loadDraftTable() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;
        try {
            const data = JSON.parse(saved);
            const rows = draftTable.querySelectorAll('tbody tr');
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                for (let j = 0; j < cells.length; j++) {
                    if (data[i] && typeof data[i][j] !== 'undefined') {
                        cells[j].textContent = data[i][j];
                    }
                }
            }
        } catch (e) {
            // ignore
        }
    }

    // Salva i dati
    function saveDraftTable() {
        const rows = draftTable.querySelectorAll('tbody tr');
        const data = [];
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            data[i] = [];
            for (let j = 0; j < cells.length; j++) {
                data[i][j] = cells[j].textContent;
            }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // Eventi su tutte le celle
    draftTable.querySelectorAll('tbody td').forEach(cell => {
        cell.addEventListener('input', saveDraftTable);
    });

    // Carica i dati all'avvio
    loadDraftTable();
});
// Drunkest League JavaScript Functions

// Section switching functionality
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.main-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Update nav active state
    document.querySelectorAll('.main-nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Document ready functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const sections = document.querySelectorAll('.section-content');
    const subNavLinks = document.querySelectorAll('.sub-nav-links a');
    const rulesSections = document.querySelectorAll('.rule-section');

    // Initial animation for first section
    if (sections[0]) {
        sections[0].classList.add('animate');
    }

    // Intersection Observer for scroll animations in regolamento
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the content
                const content = entry.target.querySelector('.section-content');
                if (content) {
                    content.classList.add('animate');
                }
                
                // Update active sub nav link
                const sectionId = entry.target.id;
                subNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all rule sections
    rulesSections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for sub-navigation links
    subNavLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle navbar blur on scroll
    const mainNavbar = document.querySelector('.main-navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove blur effect based on scroll position
        if (currentScrollY > 50) {
            mainNavbar.style.background = 'rgba(255, 255, 255, 0.9)';
            mainNavbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            mainNavbar.style.background = 'rgba(255, 255, 255, 0.95)';
            mainNavbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Mobile menu toggle (for future mobile implementation)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.main-nav-links');
            navLinks.classList.toggle('mobile-active');
        });
    }

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Animation utilities
function fadeIn(element, duration = 500) {
    element.style.opacity = 0;
    element.style.display = 'block';
    
    let start = performance.now();
    
    function animate(currentTime) {
        let elapsed = currentTime - start;
        let progress = elapsed / duration;
        
        if (progress > 1) progress = 1;
        
        element.style.opacity = progress;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function slideUp(element, duration = 300) {
    element.style.transformOrigin = 'top';
    element.style.transform = 'translateY(50px)';
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }, 10);
}

// Utility function to check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Draft Table Functions
let SHEETDB_API_URL = 'https://sheetdb.io/api/v1/YOUR_SHEET_ID'; // Sostituisci con il tuo URL SheetDB

function initializeDraftTable() {
    const table = document.getElementById('draftTable');
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    
    // Create 13 rows for players
    for (let row = 1; row <= 13; row++) {
        const tr = document.createElement('tr');
        tr.classList.add('player-row');
        
        for (let col = 0; col < 10; col++) {
            const td = document.createElement('td');
            td.classList.add('team-cell');
            td.setAttribute('data-row', row);
            td.setAttribute('data-col', col);
            td.setAttribute('contenteditable', 'true');
            td.style.minHeight = '40px';
            
            // Add event listeners for better UX
            td.addEventListener('focus', function() {
                this.style.background = 'rgba(0, 61, 167, 0.1)';
            });
            
            td.addEventListener('blur', function() {
                this.style.background = '';
                saveCellData(this);
            });
            
            td.addEventListener('keydown', function(e) {
                handleCellNavigation(e, this);
            });
            
            tr.appendChild(td);
        }
        
        tbody.appendChild(tr);
    }
    
    // Load data from SheetDB
    loadDraftDataFromSheet();
}

function handleCellNavigation(event, cell) {
    const row = parseInt(cell.getAttribute('data-row'));
    const col = parseInt(cell.getAttribute('data-col'));
    
    switch(event.key) {
        case 'Tab':
            event.preventDefault();
            moveToNextCell(row, col, event.shiftKey);
            break;
        case 'Enter':
            event.preventDefault();
            moveToNextRow(row, col);
            break;
        case 'ArrowUp':
            event.preventDefault();
            moveToCell(Math.max(0, row - 1), col);
            break;
        case 'ArrowDown':
            event.preventDefault();
            moveToCell(Math.min(13, row + 1), col);
            break;
        case 'ArrowLeft':
            if (event.ctrlKey) {
                event.preventDefault();
                moveToCell(row, Math.max(0, col - 1));
            }
            break;
        case 'ArrowRight':
            if (event.ctrlKey) {
                event.preventDefault();
                moveToCell(row, Math.min(9, col + 1));
            }
            break;
    }
}

function moveToNextCell(row, col, reverse = false) {
    let nextCol = reverse ? col - 1 : col + 1;
    let nextRow = row;
    
    if (nextCol < 0) {
        nextCol = 9;
        nextRow = Math.max(0, row - 1);
    } else if (nextCol > 9) {
        nextCol = 0;
        nextRow = Math.min(13, row + 1);
    }
    
    moveToCell(nextRow, nextCol);
}

function moveToNextRow(row, col) {
    const nextRow = Math.min(13, row + 1);
    moveToCell(nextRow, col);
}

function moveToCell(row, col) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (cell && cell.hasAttribute('contenteditable')) {
        cell.focus();
    }
}

function saveCellData(cell) {
    // Save locally as backup
    const draftData = JSON.parse(localStorage.getItem('draftData') || '{}');
    const row = cell.getAttribute('data-row');
    const col = cell.getAttribute('data-col');
    const key = `${row}-${col}`;
    
    draftData[key] = cell.textContent.trim();
    localStorage.setItem('draftData', JSON.stringify(draftData));
    
    // Debounced save to SheetDB
    debouncedSaveToSheet();
}

// Debounced function to avoid too many API calls
const debouncedSaveToSheet = debounce(saveToSheetDB, 2000);

function loadDraftData() {
    // Load from localStorage as fallback
    const draftData = JSON.parse(localStorage.getItem('draftData') || '{}');
    
    Object.keys(draftData).forEach(key => {
        const [row, col] = key.split('-');
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.textContent = draftData[key];
        }
    });
}

// SheetDB Integration Functions
function loadDraftDataFromSheet() {
    if (!SHEETDB_API_URL || SHEETDB_API_URL.includes('YOUR_SHEET_ID')) {
        console.log('SheetDB URL non configurato, caricamento da localStorage...');
        loadDraftData();
        return;
    }

    showNotification('Caricamento dati dal cloud...', 'info');
    
    fetch(SHEETDB_API_URL)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                populateTableFromSheet(data);
                showNotification('Dati caricati dal cloud!', 'success');
            } else {
                loadDraftData(); // Fallback to localStorage
            }
        })
        .catch(error => {
            console.error('Errore nel caricamento da SheetDB:', error);
            showNotification('Errore nel caricamento dal cloud, dati locali caricati', 'error');
            loadDraftData(); // Fallback to localStorage
        });
}

function populateTableFromSheet(data) {
    data.forEach(record => {
        if (record.row !== undefined && record.col !== undefined) {
            const cell = document.querySelector(`[data-row="${record.row}"][data-col="${record.col}"]`);
            if (cell && record.value) {
                cell.textContent = record.value;
            }
        }
    });
}

function saveToSheetDB() {
    if (!SHEETDB_API_URL || SHEETDB_API_URL.includes('YOUR_SHEET_ID')) {
        console.log('SheetDB URL non configurato');
        return;
    }

    const cells = document.querySelectorAll('.draft-table [contenteditable="true"]');
    const sheetData = [];
    
    // Clear existing data first
    clearSheetDB().then(() => {
        // Prepare data for SheetDB
        cells.forEach(cell => {
            const row = cell.getAttribute('data-row');
            const col = cell.getAttribute('data-col');
            const value = cell.textContent.trim();
            
            if (value) { // Only save non-empty cells
                sheetData.push({
                    row: row,
                    col: col,
                    value: value,
                    timestamp: new Date().toISOString()
                });
            }
        });
        
        if (sheetData.length > 0) {
            // Send data to SheetDB
            fetch(SHEETDB_API_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sheetData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Dati salvati su SheetDB:', data);
            })
            .catch(error => {
                console.error('Errore nel salvataggio su SheetDB:', error);
                showNotification('Errore nel salvataggio cloud (dati salvati localmente)', 'error');
            });
        }
    });
}

function clearSheetDB() {
    if (!SHEETDB_API_URL || SHEETDB_API_URL.includes('YOUR_SHEET_ID')) {
        return Promise.resolve();
    }

    return fetch(SHEETDB_API_URL + '/all', {
        method: 'DELETE'
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Errore nella pulizia SheetDB:', error);
        return {};
    });
}

function saveDraftData() {
    const cells = document.querySelectorAll('.draft-table [contenteditable="true"]');
    const draftData = {};
    
    cells.forEach(cell => {
        const row = cell.getAttribute('data-row');
        const col = cell.getAttribute('data-col');
        const key = `${row}-${col}`;
        draftData[key] = cell.textContent.trim();
    });
    
    // Save locally
    localStorage.setItem('draftData', JSON.stringify(draftData));
    
    // Save to SheetDB
    saveToSheetDB();
    
    showNotification('Dati salvati localmente e nel cloud!', 'success');
}

function clearDraftData() {
    if (confirm('Sei sicuro di voler cancellare tutti i dati del draft? Questo cancellerà anche i dati nel cloud.')) {
        const cells = document.querySelectorAll('.draft-table [contenteditable="true"]');
        cells.forEach(cell => {
            cell.textContent = '';
        });
        
        // Clear local storage
        localStorage.removeItem('draftData');
        
        // Clear SheetDB
        clearSheetDB().then(() => {
            showNotification('Dati cancellati localmente e nel cloud!', 'info');
        });
    }
}

// Configuration function to set SheetDB URL
function setSheetDBUrl(url) {
    SHEETDB_API_URL = url;
    localStorage.setItem('sheetdb_url', url);
    showNotification('URL SheetDB configurato!', 'success');
}

function exportDraftData() {
    const table = document.getElementById('draftTable');
    const rows = table.querySelectorAll('tr');
    let csvContent = '';
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => `"${cell.textContent.trim()}"`);
        csvContent += rowData.join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drunkest_league_draft.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('File CSV esportato con successo!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type
