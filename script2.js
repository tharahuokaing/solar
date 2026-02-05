/**
 * HOLOGRAM ENGINE v7.2 - INTERACTIVE EDITION
 * បន្ថែមមុខងារ: Mouse Tracking, Object Data, និង Dynamic Viewport
 */

const map = document.getElementById('map');
const vehicles = [];
const logFeed = document.getElementById('log-feed');

// 1. AI Voice System
function aiSpeak(msg) {
    const speech = new SpeechSynthesisUtterance(msg);
speech.lang = 'km-KH';
    speech.rate = 1.0;
    speech.pitch = 0.6;
    window.speechSynthesis.speak(speech);
}

// 2. បង្កើតរថយន្តដែលមាន Data Tags (Interactive Vehicles)
function createVehicle(isEmergency = false) {
    const vContainer = document.createElement('div');
    vContainer.className = 'v-container';
    vContainer.style.position = 'absolute';
    vContainer.style.zIndex = isEmergency ? '100' : '10';

    const v = document.createElement('div');
    v.className = isEmergency ? 'vehicle flicker' : 'vehicle';
    if(isEmergency) v.style.background = '#fff';

    // បង្កើត Data Tag (បង្ហាញនៅពេល Mouse Hover)
    const tag = document.createElement('div');
    tag.className = 'vehicle-tag';
    tag.innerHTML = `ID: ${Math.random().toString(36).substr(2, 5).toUpperCase()}<br>SPD: 0km/h`;
    tag.style.cssText = `
        position: absolute; top: -30px; left: 0;
        background: rgba(0, 242, 255, 0.8); color: #000;
        padding: 2px 5px; font-size: 0.6rem; visibility: hidden;
        white-space: nowrap; pointer-events: none;
    `;

    vContainer.appendChild(tag);
    vContainer.appendChild(v);
    
    // Hover Effects
    vContainer.onmouseover = () => {
        tag.style.visibility = 'visible';
        v.style.boxShadow = '0 0 20px var(--cyan)';
    };
    vContainer.onmouseout = () => tag.style.visibility = 'hidden';

    const data = {
        el: vContainer,
        tag: tag,
        x: -50,
        y: isEmergency ? 250 : Math.random() * 450,
        speed: isEmergency ? 6 : (1.2 + Math.random() * 2),
        isEV: isEmergency
    };

    map.appendChild(vContainer);
    vehicles.push(data);
}

// 3. Animation Engine (Update Loop)
function animate() {
    // Unix Clock Update
    document.getElementById('unix-clock').innerText = Math.floor(Date.now() / 1000);

    vehicles.forEach((v, index) => {
        v.x += v.speed;
        
        // Update tag speed info
        v.tag.innerHTML = `ID: ${v.el.innerText.split(' ')[0]}<br>SPD: ${(v.speed * 20).toFixed(0)} km/h`;

        if (v.x > map.offsetWidth + 50) {
            if (v.isEV) {
                v.el.remove();
                vehicles.splice(index, 1);
            } else {
                v.x = -50;
            }
        }

        v.el.style.left = v.x + 'px';
        v.el.style.top = v.y + 'px';
        
        // 3. 3D Floating Pulse
        const bounce = Math.sin(Date.now() / 400) * 8;
        v.el.style.transform = `translateZ(${bounce}px)`;
    });

    requestAnimationFrame(animate);
}

// 4. Mouse-Follow 3D Rotation (ផែនទីងាកតាម Mouse)
map.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    map.style.transform = `rotateX(${40 + yAxis}deg) rotateZ(${-10 + xAxis}deg)`;
});

// 5. មុខងារបញ្ជា (Action Functions)
function fireSolar() {
    aiSpeak("ការការពារព្រះអាទិត្យកំពុងដំណើរការ។ កំពុងចាប់ផ្តើមបាញ់។");
    map.classList.add('flicker');
    addLog("SOLAR_PULSE_FIRED", "var(--gold)");
    setTimeout(() => map.classList.remove('flicker'), 2000);
}

function spawnEV() {
    aiSpeak("អាទិភាពត្រូវបានសម្អាត។ ឯកភាពបន្ទាន់ត្រូវបានបញ្ជូន។");
    createVehicle(true);
    addLog("V2X_PRIORITY_SIGNAL", "#fff");
}

// Boot System
window.onload = () => {
    for (let i = 0; i < 15; i++) createVehicle();
    animate();
    aiSpeak("ប្រព័ន្ធហូឡូក្រាមអន្តរកម្មបានចាប់ផ្តើម។");
};

// Boot System
window.onload = () => {
    for (let i = 0; i < 15; i++) createVehicle();
    animate();
    aiSpeak("Interactive Hologram System Online.");
};
