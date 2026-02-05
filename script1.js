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
    speech.lang = 'km-KH';
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

// 5. បញ្ជាការពារ (Defense Commands)
function fireSolar() {
    aiSpeak("ស្នូលព្រះអាទិត្យកំពុងដំណើរការ។ គោលដៅត្រូវបានចាក់សោ។");
    map.classList.add('flicker');
    addLog("SOLAR_BLAST_EXECUTED", "var(--gold)");
    
    setTimeout(() => {
        map.classList.remove('flicker');
        aiSpeak("គ្រោះថ្នាក់ត្រូវបានបំបាត់។");
    }, 2000);
}

function spawnEV() {
    aiSpeak("អាទិភាពបន្ទាន់ត្រូវបានបើក។ កំពុងសម្អាតផ្លូវ។");
    createVehicle(true);
    addLog("V2X_EMERGENCY_DEPLOYED", "#fff");
}

// 6. តាមដានការលួចចូល (Threat Monitoring)
function simulateThreat() {
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1.${Math.floor(Math.random()*255)}`;
    document.getElementById('attacker-ip').innerText = ip;

    const node = document.createElement('div');
    node.className = 'threat-node';
    node.style.left = (20 + Math.random() * 60) + '%';
    node.style.top = (20 + Math.random() * 60) + '%';
    map.appendChild(node);

    aiSpeak("ព្រមាន។ មានការលួចចូលពី " + ip);
    addLog(`ATTACK_DETECTED: ${ip}`, "var(--red)");

    setTimeout(() => {
        node.remove();
        aiSpeak("ការលួចចូលត្រូវបានបំបាត់។");
    }, 4000);
}
