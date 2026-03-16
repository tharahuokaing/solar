/**
 * ក្រឡាបញ្ជាមហិទ្ធិឫទ្ធិ HOLOGRAM ENGINE v7.0 
 * INTEGRATED WITH SOLAR CYBER EMPIRE INFRASTRUCTURE
 * គ្រប់គ្រងលើ: យានយន្ត V2X, ការបង្ហាញ 3D, និងការទប់ស្កាត់មហន្តរាយ
 */

const map = document.getElementById('map');
const logFeed = document.getElementById('log-feed');
const solarLoadDisplay = document.getElementById('solar-load-val');
const unixClock = document.getElementById('unix-clock');
const vehicles = [];

// ១. ព្រះសូរសៀងបញ្ញាសិប្បនិម្មិត (AI Imperial Voice)
function aiSpeak(msg) {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(msg);
        speech.lang = 'km-KH'; 
        speech.rate = 0.9;    
        speech.pitch = 0.6;   // សំឡេងធ្ងន់បែប Robot
        window.speechSynthesis.speak(speech);
    }
}

// ២. ការបង្កើតគ្រាប់ពន្លឺហូឡូក្រាម (Hologram Particle Grid)
function createGridParticles() {
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'grid-dot';
        Object.assign(particle.style, {
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: '#00f2ff',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5,
            boxShadow: '0 0 5px #00f2ff',
            pointerEvents: 'none'
        });
        map.appendChild(particle);
    }
}

// ៣. ម៉ាស៊ីនបញ្ជាយានយន្ត V2X (V2X Imperial Engine)
function createVehicle(isEmergency = false) {
    const v = document.createElement('div');
    v.className = isEmergency ? 'vehicle flicker priority' : 'vehicle';
    
    // Custom styling to match Cyber Empire theme
    Object.assign(v.style, {
        position: 'absolute',
        width: isEmergency ? '12px' : '6px',
        height: isEmergency ? '12px' : '6px',
        background: isEmergency ? '#ffffff' : '#00f2ff',
        boxShadow: isEmergency ? '0 0 20px #fff' : '0 0 8px #00f2ff',
        borderRadius: '50%',
        zIndex: isEmergency ? '100' : '10'
    });

    const data = {
        el: v,
        x: -20,
        y: isEmergency ? (map.clientHeight / 2) : Math.random() * (map.clientHeight - 20),
        speed: isEmergency ? 7 : (1.5 + Math.random() * 2),
        isEV: isEmergency
    };

    map.appendChild(v);
    vehicles.push(data);
}

// ៤. វដ្តដំណើរការប្រព័ន្ធ (Main System Loop)
function updateTacticalMap() {
    // Unix Epoch 32-Bit Binary Simulation
    if (unixClock) {
        const now = Math.floor(Date.now() / 1000);
        unixClock.innerText = (now >>> 0).toString(2).padStart(32, '0');
    }

    // Vehicle Movement logic
    vehicles.forEach((v, index) => {
        v.x += v.speed;
        if (v.x > map.clientWidth + 50) {
            v.el.remove();
            vehicles.splice(index, 1);
            if(v.isEV) addLog("បេសកកម្មសង្គ្រោះ: បានសម្រេច", "#00ffff");
        }
        v.el.style.left = v.x + 'px';
        v.el.style.top = v.y + 'px';
    });

    requestAnimationFrame(updateTacticalMap);
}

// ៥. បញ្ជាការពារប្រព័ន្ធ (Empire Defense Commands)
function fireSolar() {
    aiSpeak("ស្នូលថាមពលព្រះអាទិត្យត្រូវបានដំណើរការ។ គោលដៅត្រូវបានចាក់សោ។");
    map.style.boxShadow = "inset 0 0 100px #ffd700";
    map.style.filter = "brightness(2) contrast(1.5)";
    addLog("ការវាយបកសូឡា: កំពុងប្រតិបត្តិ", "#ffd700");
    
    setTimeout(() => {
        map.style.boxShadow = "none";
        map.style.filter = "none";
        aiSpeak("ការគំរាមកំហែងត្រូវបានកម្ចាត់ចោល។ ស្ថានភាពធម្មតា។");
    }, 2000);
}

function spawnEV() {
    aiSpeak("បើកដំណើរការអាទិភាពបន្ទាន់។ កំពុងជម្រះផ្លូវសម្រាប់យានសង្គ្រោះ។");
    createVehicle(true);
    addLog("យានសង្គ្រោះ V2X: កំពុងចេញដំណើរ", "#ffffff");
}

// ៦. ការត្រួតពិនិត្យការគំរាមកំហែង (Empire Threat Monitoring)
function simulateThreat() {
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1.${Math.floor(Math.random()*255)}`;
    const attackerEl = document.getElementById('attacker-ip');
    if(attackerEl) attackerEl.innerText = ip;

    // Create a visual threat node on the map
    const node = document.createElement('div');
    node.style.position = 'absolute';
    node.style.width = '30px';
    node.style.height = '30px';
    node.style.border = '2px solid #ff3131';
    node.style.borderRadius = '50%';
    node.style.left = (20 + Math.random() * 60) + '%';
    node.style.top = (20 + Math.random() * 60) + '%';
    node.style.animation = 'flicker 0.5s infinite';
    map.appendChild(node);

    aiSpeak("ប្រកាសអាសន្ន! រកឃើញការជ្រៀតចូលពីអាសយដ្ឋាន " + ip);
    addLog(`រកឃើញការវាយប្រហារ: ${ip}`, "#ff3131");

    setTimeout(() => {
        node.remove();
        addLog("ស្ថានភាព: សុវត្ថិភាព", "#00f2ff");
    }, 4000);
}

// Helper: Imperial Logging
function addLog(msg, color) {
    const div = document.createElement('div');
    div.style.color = color;
    div.style.fontSize = "11px";
    div.style.borderBottom = "1px solid rgba(0, 242, 255, 0.1)";
    div.style.padding = "2px 0";
    div.innerText = `[${new Date().toLocaleTimeString()}] > ${msg}`;
    logFeed.prepend(div);
    if (logFeed.children.length > 12) logFeed.lastChild.remove();
}

// --- INITIALIZATION ---
window.addEventListener('load', () => {
    createGridParticles();
    updateTacticalMap();
    
    // Periodic system tasks
    setInterval(() => {
        if(vehicles.length < 15) createVehicle(false);
    }, 2000);

    setInterval(simulateThreat, 40000);
    
    aiSpeak("ប្រព័ន្ធហូឡូក្រាម កំណែ ៧.០ ដំណើរការ។ ត្រៀមខ្លួនសម្រាប់បញ្ជា។");
    addLog("HOLOGRAM_ENGINE: ONLINE", "#00f2ff");
});
