/**
 * HOLOGRAM ENGINE v7.2 - INTERACTIVE EDITION
 * គ្រប់គ្រងលើ: ការតាមដាន, ទិន្នន័យវត្ថុ, និងទិដ្ឋភាព Dynamic
 */

const map = document.getElementById('map');
const vehicles = [];
const logFeed = document.getElementById('log-feed');

// 1. ប្រព័ន្ធសំឡេងឆ្លើយតប AI (AI Voice System)
function aiSpeak(msg) {
    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = 'km-KH';
    speech.rate = 1.0;
    speech.pitch = 0.6; // សំឡេង Robot ធ្ងន់
    window.speechSynthesis.speak(speech);
}

// 2. ការបង្កើតយានយន្តអន្តរកម្ម (Interactive Vehicles with Data Tags)
function createVehicle(isEmergency = false) {
    const vContainer = document.createElement('div');
    vContainer.className = 'v-container';
    vContainer.style.position = 'absolute';
    vContainer.style.zIndex = isEmergency ? '100' : '10';

    const v = document.createElement('div');
    v.className = isEmergency ? 'vehicle flicker' : 'vehicle';
    if(isEmergency) {
        v.style.background = '#fff';
        v.style.boxShadow = '0 0 20px #fff, 0 0 10px var(--red)';
    }

    // បង្កើតស្លាកទិន្នន័យ
    const vehicleID = Math.random().toString(36).substr(2, 5).toUpperCase();
    const tag = document.createElement('div');
    tag.className = 'vehicle-tag';
    tag.innerHTML = `អត្តសញ្ញាណ: ${vehicleID}<br>ល្បឿន: 0 គ.ម/ម៉`;
    tag.style.cssText = `
        position: absolute; top: -35px; left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 242, 255, 0.8); color: #000;
        padding: 3px 8px; font-size: 0.65rem; visibility: hidden;
        white-space: nowrap; pointer-events: none;
        border-radius: 3px; font-weight: bold;
    `;

    vContainer.appendChild(tag);
    vContainer.appendChild(v);
    
    // បែបផែននៅពេលប៉ះ (Hover Effects)
    vContainer.onmouseover = () => {
        tag.style.visibility = 'visible';
        v.style.boxShadow = '0 0 25px var(--cyan)';
        v.style.cursor = 'crosshair';
    };
    vContainer.onmouseout = () => tag.style.visibility = 'hidden';

    const data = {
        el: vContainer,
        tag: tag,
        id: vehicleID,
        x: -50,
        y: isEmergency ? 250 : Math.random() * 450,
        speed: isEmergency ? 6 : (1.2 + Math.random() * 2),
        isEV: isEmergency
    };

    map.appendChild(vContainer);
    vehicles.push(data);
}

// 3. ម៉ាស៊ីនបញ្ជាចលនា (Animation Engine)
function animate() {
    // ធ្វើបច្ចុប្បន្នភាពនាឡិកាប្រព័ន្ធ
    const clock = document.getElementById('unix-clock');
    if(clock) clock.innerText = Math.floor(Date.now() / 1000);

    vehicles.forEach((v, index) => {
        v.x += v.speed;
        
        // ធ្វើបច្ចុប្បន្នភាពទិន្នន័យល្បឿនលើស្លាក
        v.tag.innerHTML = `អត្តសញ្ញាណ: ${v.id}<br>ល្បឿន: ${(v.speed * 20).toFixed(0)} គ.ម/ម៉`;

        // នៅពេលយានយន្តរត់ផុតផែនទី
        if (v.x > map.offsetWidth + 60) {
            if (v.isEV) {
                v.el.remove();
                vehicles.splice(index, 1);
                addLog(`យានសង្គ្រោះ ${v.id}: បញ្ចប់បេសកកម្ម`, "var(--cyan)");
            } else {
                v.x = -60; // ឱ្យឡានធម្មតាត្រឡប់មកវិញ
            }
        }

        v.el.style.left = v.x + 'px';
        v.el.style.top = v.y + 'px';
        
        // បង្កើតចលនាអណ្តែតបែប 3D (3D Floating Pulse)
        const bounce = Math.sin(Date.now() / 400) * 8;
        v.el.style.transform = `translateZ(${bounce}px)`;
    });

    requestAnimationFrame(animate);
}

// 4. ការបង្វិលផែនទីតាមចលនា Pointer (Mouse-Follow 3D Rotation)
window.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
    // រក្សាមុំលំអៀង 40ដឺក្រេ និងបូកបន្ថែមចលនាកណ្តុរ
    map.style.transform = `rotateX(${45 + yAxis}deg) rotateZ(${-10 + xAxis}deg)`;
});

// 5. មុខងារបញ្ជាការពារ និងអាទិភាព
function fireSolar() {
    aiSpeak("ប្រព័ន្ធការពារថាមពលព្រះអាទិត្យត្រូវបានដំណើរការ។ កំពុងបញ្ចេញពន្លឺ។");
    map.classList.add('flicker');
    addLog("ការបញ្ចេញពន្លឺសូឡា: កំពុងប្រតិបត្តិ", "var(--gold)");
    setTimeout(() => {
        map.classList.remove('flicker');
        aiSpeak("ការគំរាមកំហែងត្រូវបានលុបបំបាត់។");
    }, 2000);
}

function spawnEV() {
    aiSpeak("អាទិភាពចរាចរណ៍ត្រូវបានបើក។ យានសង្គ្រោះបន្ទាន់កំពុងឆ្លងកាត់។");
    createVehicle(true);
    addLog("សញ្ញាអាទិភាព V2X: សកម្ម", "#fff");
}

function addLog(msg, color) {
    const entry = document.createElement('div');
    entry.style.color = color;
    entry.innerText = `> ${msg}`;
    logFeed.prepend(entry);
}

// 6. ចាប់ផ្តើមប្រព័ន្ធ (System Boot)
window.onload = () => {
    // បង្កើតយានយន្តដំបូង ៣២ គ្រឿង
    for (let i = 0; i < 32; i++) createVehicle();
    
    animate();
    
    aiSpeak("ប្រព័ន្ធហូឡូក្រាមអន្តរកម្ម កំណែ ៧.២ បានដាក់ឱ្យដំណើរការ។");
    addLog("ប្រព័ន្ធ: ត្រៀមខ្លួនរួចរាល់", "var(--cyan)");
};
