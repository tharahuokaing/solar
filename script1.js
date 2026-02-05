/**
 * HOLOGRAM ENGINE v7.0
 * គ្រប់គ្រងលើការបង្ហាញរូបភាព 3D និងចលនាឌីជីថល
 */

const map = document.getElementById('map');
const vehicles = [];
const logFeed = document.getElementById('log-feed');

// 1. AI Voice - ប្រព័ន្ធសំឡេងឆ្លើយតប
function aiSpeak(msg) {
    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = 'en-US';
    speech.rate = 1.0;
    speech.pitch = 0.6; // សំឡេង Robot ធ្ងន់
    window.speechSynthesis.speak(speech);
}

// 2. Hologram Grid Particles (បង្កើតគ្រាប់ពន្លឺតូចៗលើផែនទី)
function createGridParticles() {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'var(--cyan)';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random();
        particle.style.boxShadow = '0 0 5px var(--cyan)';
        map.appendChild(particle);
    }
}

// 3. V2X Vehicle Engine (បង្កើត និងបញ្ជាចលនារថយន្ត)
function createVehicle(isEmergency = false) {
    const v = document.createElement('div');
    v.className = isEmergency ? 'vehicle flicker' : 'vehicle';
    
    if (isEmergency) {
        v.style.background = '#ffffff';
        v.style.boxShadow = '0 0 20px #fff, 0 0 10px var(--red)';
        v.style.zIndex = '100';
    }

    const data = {
        el: v,
        x: -20,
        y: isEmergency ? 250 : Math.random() * 450,
        speed: isEmergency ? 6 : (1 + Math.random() * 2),
        isEV: isEmergency
    };

    map.appendChild(v);
    vehicles.push(data);
}

// 4. Main Animation Loop (ចង្វាក់ដំណើរការប្រព័ន្ធ)
function animate() {
    // បច្ចុប្បន្នភាពម៉ោង Unix
    document.getElementById('unix-clock').innerText = Math.floor(Date.now() / 1000);

    // បញ្ជាចលនារថយន្ត
    vehicles.forEach((v, index) => {
        v.x += v.speed;
        
        // បើឡានរត់ផុតផែនទី
        if (v.x > map.offsetWidth) {
            if (v.isEV) {
                v.el.remove();
                vehicles.splice(index, 1);
            } else {
                v.x = -20;
            }
        }

        v.el.style.left = v.x + 'px';
        v.el.style.top = v.y + 'px';
        // បង្កើត Effect អណ្តែត (Floating)
        v.el.style.transform = `translateZ(${Math.sin(Date.now() / 500) * 5}px)`;
    });

    requestAnimationFrame(animate);
}

// 5. Defense Commands (បញ្ជាការពារ)
function fireSolar() {
    aiSpeak("Solar core active. Target locked.");
    map.classList.add('flicker');
    addLog("SOLAR_BLAST_EXECUTED", "var(--gold)");
    
    setTimeout(() => {
        map.classList.remove('flicker');
        aiSpeak("Threat neutralized.");
    }, 2000);
}

function spawnEV() {
    aiSpeak("Emergency priority override. Clearing lanes.");
    createVehicle(true);
    addLog("V2X_EMERGENCY_DEPLOYED", "#fff");
}

// 6. Threat Monitoring (តាមដានការលួចចូល)
function simulateThreat() {
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1.${Math.floor(Math.random()*255)}`;
    document.getElementById('attacker-ip').innerText = ip;

    const node = document.createElement('div');
    node.className = 'threat-node';
    node.style.left = (20 + Math.random() * 60) + '%';
    node.style.top = (20 + Math.random() * 60) + '%';
    map.appendChild(node);

    aiSpeak("Warning. External intrusion from " + ip);
    addLog(`ATTACK_DETECTED: ${ip}`, "var(--red)");

    setTimeout(() => {
        node.remove();
        aiSpeak("Security breach mitigated.");
    }, 4000);
}

// 7. Helper: Add Logs
function addLog(msg, color) {
    const entry = document.createElement('div');
    entry.style.color = color || 'inherit';
    entry.style.fontSize = '0.7rem';
    entry.style.borderLeft = `2px solid ${color}`;
    entry.style.paddingLeft = '5px';
