document.addEventListener('DOMContentLoaded', () => {
    // Navigáció a beállítások lapok között
    const tabs = document.querySelectorAll('.settings-tab');
    const panels = document.querySelectorAll('.settings-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Aktív lap eltávolítása az összesről
            tabs.forEach(t => t.classList.remove('active'));
            // Aktív panel elrejtése
            panels.forEach(p => p.classList.remove('active'));

            // Kattintott lap aktiválása
            tab.classList.add('active');

            // Megfelelő panel megjelenítése
            const targetPanelId = tab.dataset.tab + '-panel';
            document.getElementById(targetPanelId).classList.add('active');
        });
    });

    // Profil lap funkciói
    const profileUpload = document.getElementById('profile-upload');
    const profilePreview = document.getElementById('profile-preview');
    const bioTextarea = document.getElementById('bio');
    const bioCount = document.getElementById('bio-count');
    const languageInput = document.querySelector('.tag-input input');
    const languageTags = document.querySelector('.tag-input .tags');

    // Profilkép feltöltése és előnézete
    if (profileUpload && profilePreview) {
        profileUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Bio karakterszámláló
    if (bioTextarea && bioCount) {
        const updateBioCount = () => {
            const currentLength = bioTextarea.value.length;
            bioCount.textContent = currentLength;
        };
        bioTextarea.addEventListener('input', updateBioCount);
        updateBioCount(); // Kezdeti érték beállítása
    }

    // Nyelvek hozzáadása és eltávolítása
    if (languageInput && languageTags) {
        languageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && languageInput.value.trim() !== '') {
                event.preventDefault();
                const newTagText = languageInput.value.trim();
                const newTag = document.createElement('span');
                newTag.classList.add('tag');
                newTag.innerHTML = `${newTagText} <i class="fas fa-times"></i>`;

                newTag.querySelector('i').addEventListener('click', () => {
                    newTag.remove();
                });

                languageTags.appendChild(newTag);
                languageInput.value = '';
            }
        });

        // Eltávolítás meglévő tag-ekre
        document.querySelectorAll('.tag-input .tags .tag i').forEach(removeIcon => {
            removeIcon.addEventListener('click', (e) => {
                e.target.closest('.tag').remove();
            });
        });
    }

    // Social Media lap funkciói
    document.querySelectorAll('.social-platform').forEach(platform => {
        const connectBtn = platform.querySelector('.connect-btn');
        const disconnectBtn = platform.querySelector('.disconnect-btn');
        const statusSpan = platform.querySelector('.connection-status');
        const detailsDiv = platform.querySelector('.platform-details');

        // Csatlakozás gomb
        if (connectBtn) {
            connectBtn.addEventListener('click', () => {
                // Szimulált API hívás
                const platformName = platform.querySelector('h3').textContent;
                alert(`${platformName} fiók csatlakoztatása folyamatban...`);

                // Az állapot frissítése
                statusSpan.textContent = 'Csatlakoztatva';
                statusSpan.classList.remove('not-connected');
                statusSpan.classList.add('connected');
                
                // Gombok cseréje
                connectBtn.style.display = 'none';
                if (disconnectBtn) disconnectBtn.style.display = 'inline-block';

                // Részletek megjelenítése
                if (detailsDiv) detailsDiv.style.display = 'block';
            });
        }

        // Szétkapcsolás gomb
        if (disconnectBtn) {
            disconnectBtn.addEventListener('click', () => {
                if (confirm('Biztosan szétkapcsolod ezt a fiókot?')) {
                    // Szimulált API hívás
                    const platformName = platform.querySelector('h3').textContent;
                    alert(`${platformName} fiók szétkapcsolva.`);

                    // Az állapot frissítése
                    statusSpan.textContent = 'Nincs csatlakoztatva';
                    statusSpan.classList.remove('connected');
                    statusSpan.classList.add('not-connected');
                    
                    // Gombok cseréje
                    disconnectBtn.style.display = 'none';
                    if (connectBtn) connectBtn.style.display = 'inline-block';

                    // Részletek elrejtése
                    if (detailsDiv) detailsDiv.style.display = 'none';
                }
            });
        }
    });

    // Fiók lap funkciói
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordRequirements = document.querySelectorAll('.password-requirements .requirement');

    // Jelszó-ellenőrzés
    if (newPasswordInput) {
        const checkPassword = () => {
            const password = newPasswordInput.value;
            const requirements = {
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /[0-9]/.test(password)
            };

            for (const key in requirements) {
                const reqElement = document.getElementById(`req-${key}`);
                if (requirements[key]) {
                    reqElement.classList.add('valid');
                    reqElement.classList.remove('invalid');
                } else {
                    reqElement.classList.add('invalid');
                    reqElement.classList.remove('valid');
                }
            }
        };

        newPasswordInput.addEventListener('input', checkPassword);
    }
    
    // Jelszó módosításának megerősítése
    if (newPasswordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', () => {
            const password = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            if (password === confirmPassword && password !== '') {
                confirmPasswordInput.style.borderColor = 'green';
            } else {
                confirmPasswordInput.style.borderColor = '';
            }
        });
    }

    // Fiók törlése
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            const confirmation = confirm('Figyelem! Ez a művelet végleges. Biztosan törölni szeretnéd a fiókodat?');
            if (confirmation) {
                alert('A fiókod törölve.');
                window.location.href = 'index.html'; // Példa: Vissza a főoldalra
            }
        });
    }

    // Logout gomb (headerben)
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const confirmation = confirm('Biztosan ki szeretnél jelentkezni?');
            if (confirmation) {
                alert('Sikeres kijelentkezés.');
                window.location.href = 'index.html'; // Példa: Vissza a főoldalra
            }
        });
    }
});