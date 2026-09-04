document.addEventListener('DOMContentLoaded', () => {
    
    const assistant = document.getElementById('assistant-container');
    const bubble = document.getElementById('assistant-bubble');
    const bubbleText = document.getElementById('assistant-text');
    const options = document.getElementById('assistant-options');
    let clippyTimeout;
    let musicAsked = false;

    function clippySpeak(text, duration = 4000) {
        if (!assistant || !bubble) return;
        bubbleText.innerText = text;
        if (options) options.style.display = 'none';
        bubble.classList.add('visible');
        
        clearTimeout(clippyTimeout);
        clippyTimeout = setTimeout(() => {
            bubble.classList.remove('visible');
        }, duration);
    }

    const elementsToLoad = document.querySelectorAll('header, section, footer');
    elementsToLoad.forEach(el => el.classList.add('glitch-item'));

    function triggerGlitchLoad() {
        const items = document.querySelectorAll('.glitch-item');
        items.forEach((item, index) => {
            setTimeout(() => { item.classList.add('loaded'); }, index * 350 + 100); 
        });

        setTimeout(() => {
            if (assistant) {
                assistant.classList.add('show');
                setTimeout(() => {
                    const btnYesExist = document.getElementById('btn-yes');
                    if (!musicAsked && btnYesExist) {
                        bubbleText.innerText = "> Hola! [NOMBRE_ELIMINADO]. Parece que estás explorando un archivo clasificado... ¿Quieres poner música ambiental?";
                        if(options) options.style.display = 'flex';
                        bubble.classList.add('visible');
                        musicAsked = true;
                    }
                }, 1000);
            }
        }, 2500);
    }

    window.addEventListener('scroll', () => {
        const btnYesExist = document.getElementById('btn-yes');
        if (!musicAsked && btnYesExist && assistant && assistant.classList.contains('show')) {
            bubbleText.innerText = "> Hola! [NOMBRE_ELIMINADO]. Parece que estás explorando un archivo clasificado... ¿Quieres poner música ambiental?";
            if(options) options.style.display = 'flex';
            bubble.classList.add('visible');
            musicAsked = true;
        }
    }, { once: true });

    const bootScreen = document.getElementById('boot-screen');
    const bootContainer = document.getElementById('boot-text-container');
    const loginContainer = document.getElementById('login-container');
    const loginBtn = document.getElementById('login-btn');

    if (bootScreen && bootContainer && loginContainer && loginBtn) {
        if (sessionStorage.getItem('booted') === 'true') {
            bootScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            setTimeout(triggerGlitchLoad, 200);
        } else {
            document.body.style.overflow = 'hidden';
            const lines = [
                "INICIANDO BIOS v4.0.1...", "COMPROBANDO MEMORIA: 640K OK", "CARGANDO SISTEMA OPERATIVO...",
                "CONECTANDO CON SERVIDOR REMOTO [eAD_PUCV]...", "MONTANDO UNIDAD C: /ARCHIVOS_CLASIFICADOS...",
                "ADVERTENCIA: ENTORNO INESTABLE DETECTADO.", "REQUIERE AUTENTICACIÓN DE NIVEL 4."
            ];
            let lineIndex = 0;
            function typeLine() {
                if (lineIndex < lines.length) {
                    const p = document.createElement('p');
                    p.className = 'boot-line'; p.innerText = lines[lineIndex];
                    bootContainer.appendChild(p); lineIndex++;
                    setTimeout(typeLine, Math.random() * 500 + 300); 
                } else {
                    setTimeout(() => { loginContainer.style.display = 'flex'; }, 500);
                }
            }
            setTimeout(typeLine, 800);

            loginBtn.addEventListener('click', () => {
                sessionStorage.setItem('booted', 'true'); 
                bootScreen.classList.add('hidden');
                document.body.style.overflow = 'auto'; 
                setTimeout(() => { bootScreen.style.display = 'none'; triggerGlitchLoad(); }, 800);
            });
        }
    } else {
        setTimeout(triggerGlitchLoad, 200);
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'F5' || (e.ctrlKey && (e.key === 'r' || e.key === 'R'))) {
            e.preventDefault(); 
            const crashScreen = document.getElementById('crash-screen');
            if (crashScreen) crashScreen.classList.add('active');
            sessionStorage.removeItem('booted'); 
            
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);
        }
    });

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'a') return;
            card.classList.toggle('active');
            const indicator = card.querySelector('.toggle-indicator');
            if (card.classList.contains('active')) {
                indicator.innerText = "[ - ] CERRAR_ARCHIVO";
                clippySpeak("> DESCIFRANDO ARCHIVO CLASIFICADO...", 3000);
            } else {
                indicator.innerText = "[ + ] DESCIFRAR_DATOS";
                clippySpeak("> ARCHIVO SELLADO NUEVAMENTE.", 2500);
            }
        });
    });

    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => { clippySpeak("> INICIANDO TRANSFERENCIA DE SECTOR...", 2000); });
    });

    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => { clippySpeak("> REGISTRANDO PULSACIONES DEL USUARIO...", 3000); });
    });

    const easterEgg = document.querySelector('.easter-egg-box');
    if (easterEgg) {
        easterEgg.addEventListener('mouseenter', () => {
            if (!easterEgg.classList.contains('triggered')) {
                easterEgg.classList.add('triggered'); 
                setTimeout(() => { clippySpeak("> ESTE SITIO HA SIDO COMPROMETIDO. ERROR.", 6000); }, 3000); 
            }
        });
    }

    const contactForm = document.querySelector('.contact-form');
    const redTerminalPopup = document.getElementById('red-terminal-popup');
    const redTerminalInput = document.getElementById('red-terminal-input');
    const redTerminalMsg = document.getElementById('red-terminal-msg');

    if (contactForm && redTerminalPopup && redTerminalInput) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            redTerminalPopup.classList.add('show');
            redTerminalInput.focus();
            setTimeout(() => { clippySpeak("> SUGERENCIA: ESCRIBE 'BACKROOMS'", 6000); }, 800);
        });

        redTerminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = redTerminalInput.value.trim().toUpperCase();
                if (val === 'BACKROOMS') {
                    redTerminalMsg.innerText = "> INICIANDO PROTOCOLO DE EXTRACCIÓN...";
                    setTimeout(() => { window.location.href = 'BACKROOMS.html'; }, 1500);
                } else {
                    redTerminalMsg.innerText = "> COMANDO NO RECONOCIDO. EL SISTEMA TE OBSERVA.";
                    redTerminalInput.value = '';
                }
            }
        });
    }

    const openBtn = document.getElementById('open-global-gallery');
    const modal = document.getElementById('global-gallery-modal');
    const closeBtn = document.getElementById('close-modal');
    const modalGrid = document.getElementById('modal-grid-content');

    if(openBtn && modal && closeBtn) {
        openBtn.addEventListener('click', () => {
            clippySpeak("> ACCEDIENDO A BASE DE DATOS VISUAL...", 3000);
            modalGrid.innerHTML = '';
            const tracks = document.querySelectorAll('.gallery-track');
            tracks.forEach(track => {
                const imgs = track.querySelectorAll('img');
                imgs.forEach(img => { modalGrid.appendChild(img.cloneNode()); });
            });
            modal.classList.add('show'); document.body.style.overflow = 'hidden'; 
        });
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show'); document.body.style.overflow = 'auto'; 
        });
    }

    // ==========================================
    // 5. CLIPPY Y MÚSICA ENTRE PÁGINAS
    // ==========================================
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const audio = document.getElementById('bg-music');
    const musicPlayerContainer = document.getElementById('music-player-container');
    const musicIcon = document.getElementById('music-icon');
    const stopMusicBtn = document.getElementById('stop-music-btn');
    const trackLabel = document.getElementById('current-track-label');
    const volumeSlider = document.getElementById('volume-slider');

    const playlist = [
        { file: 'musica/c.mp3', name: 'c.mp3' },
        { file: 'musica/i.mp3', name: 'i.mp3' },
        { file: 'musica/a.mp3', name: 'a.mp3' },
        { file: 'musica/n.mp3', name: 'n.mp3' }
    ];
    let currentTrackIndex = 0;

    window.addEventListener('beforeunload', () => {
        if (audio && !audio.paused) {
            sessionStorage.setItem('musicPlaying', 'true');
            sessionStorage.setItem('musicTime', audio.currentTime);
            sessionStorage.setItem('musicTrack', currentTrackIndex);
            sessionStorage.setItem('musicVolume', audio.volume);
        } else {
            sessionStorage.setItem('musicPlaying', 'false');
        }
    });

    if (audio) {
        let savedVolume = sessionStorage.getItem('musicVolume');
        audio.volume = savedVolume !== null ? parseFloat(savedVolume) : (volumeSlider ? volumeSlider.value : 0.5);
        if (volumeSlider) volumeSlider.value = audio.volume;

        if (sessionStorage.getItem('musicPlaying') === 'true') {
            currentTrackIndex = parseInt(sessionStorage.getItem('musicTrack')) || 0;
            audio.src = playlist[currentTrackIndex].file;
            audio.currentTime = parseFloat(sessionStorage.getItem('musicTime')) || 0;
            musicAsked = true; 
            
            audio.play().then(() => {
                trackLabel.innerText = `> Pista: ${playlist[currentTrackIndex].name}`;
                musicIcon.classList.add('music-playing-anim');
                musicPlayerContainer.classList.add('show');
            }).catch(err => {
                document.body.addEventListener('click', function resumeAudio() {
                    audio.play();
                    trackLabel.innerText = `> Pista: ${playlist[currentTrackIndex].name}`;
                    musicIcon.classList.add('music-playing-anim');
                    musicPlayerContainer.classList.add('show');
                    document.body.removeEventListener('click', resumeAudio);
                }, { once: true });
            });
        }
    }

    function playTrack(index) {
        if (!audio) return;
        audio.src = playlist[index].file;
        audio.play();
        trackLabel.innerText = `> Pista: ${playlist[index].name}`;
        musicIcon.classList.add('music-playing-anim');
        musicPlayerContainer.classList.add('show');
    }

    if (volumeSlider && audio) {
        volumeSlider.addEventListener('input', (e) => { audio.volume = e.target.value; });
    }

    if (assistant) {
        assistant.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            
            if (!bubble.classList.contains('visible')) {
                const btnYesExist = document.getElementById('btn-yes');
                
                if (audio && audio.paused && !musicAsked && btnYesExist) {
                    bubbleText.innerText = "> Hola! [NOMBRE_ELIMINADO]. Parece que estás explorando un archivo clasificado... ¿Quieres poner música ambiental?";
                    if(options) options.style.display = 'flex';
                    bubble.classList.add('visible');
                    musicAsked = true;
                } else {
                    const phrases = [
                        "> NO DEBERÍAS ESTAR AQUÍ.", "> ¿HAS REVISADO TU ESPALDA?", "> EL SISTEMA TE OBSERVA.",
                        "> ¿NECESITAS AYUDA PARA ESCAPAR?", "> ESTE ARCHIVO HA SIDO CORROMPIDO.",
                        "> NO CONFÍES EN LAS PAREDES.", "> ¿ESCUCHAS ESE ZUMBIDO?"
                    ];
                    clippySpeak(phrases[Math.floor(Math.random() * phrases.length)]);
                }
            } else {
                bubble.classList.remove('visible'); 
            }
        });

        if (btnYes && btnNo && audio) {
            btnYes.addEventListener('click', () => {
                playTrack(currentTrackIndex);
                clippySpeak("> INICIANDO TRANSMISIÓN DE AUDIO...");
            });
            
            btnNo.addEventListener('click', () => {
                clippySpeak("> ENTENDIDO. MANTENIENDO SILENCIO TÁCTICO.");
            });
        }
    }

    if (musicIcon && stopMusicBtn && audio) {
        musicIcon.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            playTrack(currentTrackIndex);
        });

        stopMusicBtn.addEventListener('click', () => {
            audio.pause();
            musicIcon.classList.remove('music-playing-anim');
            musicPlayerContainer.classList.remove('show');
            musicAsked = false; 
            sessionStorage.setItem('musicPlaying', 'false'); 
        });
    }

    // ==========================================
    // 6. EFECTO TELETRANSPORTE (SALTAR EL VACÍO)
    // ==========================================
    let isTeleporting = false;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const isScrollingDown = currentScroll > lastScrollY;
        
        // Si el usuario empieza a bajar y está en la zona del abismo blanco
        if (isScrollingDown && currentScroll > 50 && currentScroll < 400 && !isTeleporting) {
            const firstTitle = document.querySelector('section:first-of-type h2:first-of-type');
            
            if (firstTitle) {
                // Apunta al bloque de contenido que sigue justo después del título
                const targetContent = firstTitle.nextElementSibling; 
                
                if (targetContent) {
                    isTeleporting = true;
                    // El "Teletransporte" (Scroll suave hasta el inicio del bloque)
                    targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Bloqueo temporal de 1 segundo para dejar que la animación termine fluida
                    setTimeout(() => { isTeleporting = false; }, 1000);
                }
            }
        }
        lastScrollY = currentScroll;
    });

});