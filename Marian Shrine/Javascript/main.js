// Marian Shrine General JavaScript

document.addEventListener('DOMContentLoaded', function () {
    console.log("Marian Shrine JS Loaded");

    // --- DOM Elements ---
    const galleryContainer = document.getElementById('gallery-container');
    const videoContainer = document.getElementById('video-container');
    const navbar = document.querySelector('.navbar');

    // --- Data Fetching & Rendering ---

    function loadGallery() {
        if (!galleryContainer) return;

        fetch('api/gallery')
            .then(response => response.json())
            .then(data => {
                galleryContainer.innerHTML = '';
                if (data.length === 0) {
                    galleryContainer.innerHTML = '<p class="text-center w-100">No images found.</p>';
                    return;
                }

                data.forEach(img => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4 col-sm-6 mb-4';
                    col.innerHTML = `
                        <div class="gallery-item">
                            <img src="${img.url}" class="gallery-img" alt="${img.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Error'">
                            <div class="gallery-overlay">
                                <h5>${img.title}</h5>
                                ${img.date ? `<small>${formatDate(img.date)}</small>` : ''}
                            </div>
                        </div>
                    `;
                    galleryContainer.appendChild(col);
                });
            })
            .catch(error => {
                console.warn('Backend API not reachable, using fallback gallery data.');
                const fallbackData = [
                    { url: 'Images/graces.jpg', title: 'October 4 Ceremony', date: '2025-10-04' },
                    { url: 'https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', title: 'Sunday Masses', date: '2025-12-03' },
                    { url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', title: 'Night Vigils', date: '2025-12-05' }
                ];

                galleryContainer.innerHTML = '';
                fallbackData.forEach(img => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4 col-sm-6 mb-4';
                    col.innerHTML = `
                        <div class="gallery-item">
                            <img src="${img.url}" class="gallery-img" alt="${img.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Error'">
                            <div class="gallery-overlay">
                                <h5>${img.title}</h5>
                                ${img.date ? `<small>${formatDate(img.date)}</small>` : ''}
                            </div>
                        </div>
                    `;
                    galleryContainer.appendChild(col);
                });
            });
    }

    function loadVideos() {
        if (!videoContainer) return;

        fetch('api/videos')
            .then(response => response.json())
            .then(data => {
                videoContainer.innerHTML = '';
                if (data.length === 0) {
                    videoContainer.innerHTML = '<p class="text-center w-100">No videos found.</p>';
                    return;
                }

                data.forEach(vid => {
                    const col = document.createElement('div');
                    col.className = 'col-lg-6 mb-4';
                    col.innerHTML = `
                        <div class="card h-100 border-0 shadow-sm">
                            <div class="card-body p-0">
                                <div class="ratio ratio-16x9">
                                    <iframe src="${vid.url}" 
                                            title="video player" 
                                            frameborder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen></iframe>
                                </div>
                                <div class="p-3">
                                    <h5>${vid.title}</h5>
                                    <p class="text-muted">${formatDate(vid.date)}</p>
                                    ${vid.description ? `<p class="small">${vid.description}</p>` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                    videoContainer.appendChild(col);
                });
            })
            .catch(error => {
                console.warn('Backend API not reachable, using fallback video data.');
                const fallbackData = [
                    { url: 'https://www.facebook.com/embed/dQw4w9WgXcQ', title: 'Sunday Sermon: The Second school of Advent', date: '2025-12-07', description: 'Join us for a spiritual journey.' },
                    { url: 'https://www.facebook.com/embed/hTWKbfoikeg', title: 'Weekly Adoration', date: '2025-12-10', description: 'Moments of grace and prayer.' }
                ];

                videoContainer.innerHTML = '';
                fallbackData.forEach(vid => {
                    const col = document.createElement('div');
                    col.className = 'col-lg-6 mb-4';
                    col.innerHTML = `
                        <div class="card h-100 border-0 shadow-sm">
                            <div class="card-body p-0">
                                <div class="ratio ratio-16x9">
                                    <iframe src="${vid.url}" 
                                            title="video player" 
                                            frameborder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen></iframe>
                                </div>
                                <div class="p-3">
                                    <h5>${vid.title}</h5>
                                    <p class="text-muted">${formatDate(vid.date)}</p>
                                    ${vid.description ? `<p class="small">${vid.description}</p>` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                    videoContainer.appendChild(col);
                });
            });
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // --- UI Effects ---

    // Navbar Scroll Effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
            navbar.style.padding = '10px 0';
        } else {
            navbar.classList.remove('shadow');
            navbar.style.padding = '15px 0';
        }
    });

    // Initial Load
    loadGallery();
    loadVideos();

    // Active Link Highlighting (Scroll Spy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight; // Unused but part of standard spy logic
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
