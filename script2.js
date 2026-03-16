/**
 * HOLOGRAM ENGINE v7.2 - INTERACTIVE EMPIRE EDITION
 * គ្រប់គ្រងលើ: ការតាមដាន, ទិន្នន័យវត្ថុ, និងទិដ្ឋភាព Dynamic 3D
 * Integrated with: https://tharahuokaing.github.io/solar-cyber-empire/
 */

const map = document.getElementById('map');
const logFeed = document.getElementById('log-feed');
const unixClock = document.getElementById('unix-clock');
const solarLoadDisplay = document.getElementById('solar-load-val');
const vehicles = [];

// ១. ព្រះសូរសៀងបញ្ញាសិប្បនិម្មិត (AI Imperial Voice)
function aiSpeak(msg) {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(msg);
        speech.lang = 'km-KH';
        speech.rate = 0.95;
        speech.pitch = 0.55; // សំឡេង Robot ធ្ងន់ អង់អាច
        window.speechSynthesis.speak(speech);
    }
}

// ២. ការបង្កើតយានយន្តអន្តរកម្ម (Interactive Vehicles with Data Tags)
function createVehicle(isEmergency = false) {
    const vContainer = document.createElement('div');
    vContainer.className = 'v-container';
    vContainer.style.position = 'absolute';
    vContainer.style.zIndex = isEmergency ? '100' : '10';
    vContainer.style.transformStyle = 'preserve-3d';

    const v = document.createElement('div');
    v.className = isEmergency ? 'vehicle flicker priority' : 'vehicle';
    
    // Imperial Styling
    Object.assign(v.style, {
        width: isEmergency ? '12px' : '6px',
        height: isEmergency ? '12px' : '6px',
        background: isEmergency ? '#ffffff' : '#00f2ff',
        boxShadow: isEmergency ? '0 0 20px #fff' : '0 0 8px #00f2ff',
        borderRadius: '50%'
    });

    // បង្កើតស្លាកទិន្នន័យ (Data Tag)
    const vehicleID = "EMP-" + Math.random().toString(36).substr(2, 4).toUpperCase();
    const tag = document.createElement('div');
    tag.className = 'vehicle-tag';
    tag.innerHTML = `ID: ${vehicleID}<br>STATUS: ${isEmergency ? 'PRIORITY' : 'SYNCED'}`;
    tag.style.cssText = `
        position: absolute; top: -45px; left: 50%;
        transform: translateX(-50%) rotateX(-45deg);
        background: rgba(0, 242, 255, 0.9); color: #000;
        padding: 4px 10px; font-size: 0.7rem; visibility: hidden;
        white-space: nowrap; pointer-events: none;
        border: 1px solid #fff; clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%);
    `;

    vContainer.appendChild(tag);
    vContainer.appendChild(v);
    
    // បែបផែនអន្តរកម្ម (Hover Interactions)
    vContainer.onmouseover = () => {
        tag.style.visibility = 'visible';
        v.style.boxShadow = '0 0 30px #00f2ff';
        v.style.transform = 'scale(1.5)';
    };
    vContainer.onmouseout = () => {
        tag.style.visibility = 'hidden';
        v.style.transform = 'scale(1)';
    };

    const data = {
        el: vContainer,
        tag: tag,
        id: vehicleID,
        x: -50,
        y: isEmergency ? (map.clientHeight / 2) : Math.random() * (map.clientHeight - 40),
        speed: isEmergency ? 5.5 : (1.0 + Math.random() * 2),
        isEV: isEmergency
    };

    map.appendChild(vContainer);
    vehicles.push(data);
}

// ៣. ម៉ាស៊ីនបញ្ជាចលនា (Animation & 32-Bit Sync Engine)
function animate() {
    // Unix Epoch 32-Bit Binary Update
    if (unixClock) {
        const now = Math.floor(Date.now() / 1000);
        unixClock.innerText = (now >>> 0).toString(2).padStart(32, '0');
    }

    vehicles.forEach((v, index) => {
        v.x += v.speed;
        
        // ធ្វើបច្ចុប្បន្នភាពទិន្នន័យល្បឿន
        if (v.tag.style.visibility === 'visible') {
            v.tag.innerHTML = `ID: ${v.id}<br>VEL: ${(v.speed * 42).toFixed(0)} KM/H`;
        }

        // ត្រួតពិនិត្យដែនកំណត់ផែនទី
        if (v.x > map.clientWidth + 60) {
            if (v.isEV) {
                v.el.remove();
                vehicles.splice(index, 1);
                addLog(`យានសង្គ្រោះ ${v.id}: បេសកកម្មបានបញ្ចប់`, "#00f2ff");
            } else {
                v.x = -60; // Loop generic traffic
            }
        }

        v.el.style.left = v.x + 'px';
        v.el.style.top = v.y + 'px';
        
        // បង្កើតចលនាអណ្តែតបែប 3D (Holographic Float)
        const bounce = Math.sin(Date.now() / 500) * 5;
        v.el.style.transform = `translateZ(${bounce}px)`;
    });

    requestAnimationFrame(animate);
}

// ៤. ការបង្វិលផែនទី (3D Perspective Follow)
window.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
    // Base 45deg tilt for the "Empire" view
    map.style.transform = `rotateX(${45 + yAxis}deg) rotateZ(${-5 + xAxis}deg)`;
});

// ៥. មុខងារបញ្ជាការពារ (Imperial Commands)
function fireSolar() {
    aiSpeak("ប្រព័ន្ធការពារថាមពលព្រះអាទិត្យត្រូវបានដំណើរការ។ កំពុងបញ្ចេញពន្លឺ។");
    map.style.filter = "brightness(3) saturate(0) hue-rotate(180deg)";
    addLog("ព្រះរាជបញ្ជាសូឡា: កំពុងប្រតិបត្តិ", "#ffd700");
    
    setTimeout(() => {
        map.style.filter = "none";
        aiSpeak("ការគំរាមកំហែងត្រូវបានលុបបំបាត់។");
    }, 1800);
}

function spawnEV() {
    aiSpeak("អាទិភាពចរាចរណ៍ត្រូវបានបើក។ យានសង្គ្រោះបន្ទាន់កំពុងឆ្លងកាត់។");
    createVehicle(true);
    addLog("យានអាទិភាព V2X: ចេញដំណើរ", "#ffffff");
}

function addLog(msg, color) {
    const entry = document.createElement('div');
    entry.style.color = color;
    entry.style.fontSize = "12px";
    entry.style.marginBottom = "4px";
    entry.style.borderLeft = `2px solid ${color}`;
    entry.style.paddingLeft = "8px";
    entry.innerText = `[${new Date().toLocaleTimeString()}] > ${msg}`;
    logFeed.prepend(entry);
    if (logFeed.children.length > 15) logFeed.lastChild.remove();
}

// ៦. ចាប់ផ្តើមគ្រងរាជ្យ (Imperial System Boot)
window.addEventListener('load', () => {
    // Initializing 24 tracked units
    for (let i = 0; i < 24; i++) {
        setTimeout(() => createVehicle(false), i * 100);
    }
    
    animate();
    
    // Update Solar Grid Load (Empire Logic)
    setInterval(() => {
        const load = (Math.random() * 5 + 14).toFixed(2);
        if(solarLoadDisplay) solarLoadDisplay.innerText = load + "%";
    }, 3000);

    aiSpeak("ប្រព័ន្ធហូឡូក្រាមអន្តរកម្ម កំណែ ៧.២ បានដាក់ឱ្យដំណើរការ។ សុវត្ថិភាពព្រះនគរគឺជានិរន្តរ៍។");
    addLog("CORE_SENTINEL: លំដាប់ទី៧ ដំណើរការ", "#00f2ff");
});
