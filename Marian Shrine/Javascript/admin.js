document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginForm = document.getElementById('login-form');
    const loginAlert = document.getElementById('login-alert');
    const logoutBtn = document.getElementById('logout-btn');

    // Check Session
    fetch('api/auth/check')
        .then(res => res.json())
        .then(data => {
            if (data.status === 'loggedin') {
                showDashboard();
            }
        });

    // Login Handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('username').value;
        const p = document.getElementById('password').value;

        fetch('api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u, password: p })
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Invalid credentials');
            })
            .then(data => {
                showDashboard();
            })
            .catch(err => {
                loginAlert.textContent = "Invalid username or password";
                loginAlert.classList.remove('hidden');
            });
    });

    // Logout Handler
    logoutBtn.addEventListener('click', () => {
        fetch('api/auth/logout').then(() => {
            location.reload();
        });
    });

    // Image Upload
    document.getElementById('upload-image-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            title: document.getElementById('imgTitle').value,
            url: document.getElementById('imgUrl').value,
            date: document.getElementById('imgDate').value,
            description: document.getElementById('imgDesc').value
        };

        fetch('api/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Image added successfully!');
                    e.target.reset();
                } else {
                    alert('Error uploading image');
                }
            });
    });

    // Video Upload
    document.getElementById('upload-video-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            title: document.getElementById('vidTitle').value,
            url: document.getElementById('vidUrl').value,
            date: document.getElementById('vidDate').value,
            description: document.getElementById('vidDesc').value
        };

        fetch('api/videos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Video added successfully!');
                    e.target.reset();
                } else {
                    alert('Error uploading video');
                }
            });
    });

    function showDashboard() {
        loginSection.classList.add('hidden');
        dashboardSection.style.display = 'block';

        // Set default dates to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('imgDate').value = today;
        document.getElementById('vidDate').value = today;
    }
});
