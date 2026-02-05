/**
 * CYBER SENTINEL OS v7.0 - Core Script
 * គ្រប់គ្រងលើ: ចលនា V2X, ប្រព័ន្ធសំឡេង AI, និងការតាមដានការវាយប្រហារ
 */

const map = document.getElementById('map');
const logFeed = document.getElementById('log-feed');
const vehicles = [];

// 1. ប្រព័ន្ធសំឡេង AI (AI Voice Synthesis)
function aiSpeak(msg) {
    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = 'km-KH'; // កំណត់ភាសាខ្មែរ
    speech.rate = 1.0;     // ល្បឿនធម្មតាដើម្បីឱ្យស្ដាប់ច្បាស់
    speech.pitch = 0.8;    // សំឡេងធ្ងន់បន្តិចបែប Robot
    window.speechSynthesis.speak(speech);
}

// 2. ការបង្កើតរថយន្តស្វ័យប្រវត្តិ (V2X Vehicle Engine)
function createVehicle(isEV) {
    const v = document.createElement('div');
    v.className = isEV ? 'vehicle flicker' : 'vehicle';
    
    // បើជារថយន្តសង្គ្រោះបន្ទាន់ (EV) ឱ្យវាមានពណ៌ស និងពន្លឺអាទិភាព
    if(isEV) {
        v.style.background = '#ffffff';
        v.style.boxShadow = '0 0 20px #ffffff, 0 0 10px #ff0000';
    }
    
    const data = {
        el: v,
        x: Math.random() * 800,
        y: isEV ? 250 : Math.random() * 500, // រថយន្តសង្គ្រោះរត់គន្លងកណ្តាល
        speed: isEV ? 7 : (1.2 + Math.random() * 2),
        isEV: isEV
    };
    
    map.appendChild(v);
    vehicles.push(data);
}

// 3. ប្រព័ន្ធដំណើរការចលនា (Main System Loop)
function updateSystem() {
    // ធ្វើបច្ចុប្បន្នភាពម៉ោងប្រព័ន្ធ (Unix Timestamp)
    const clockEl = document.getElementById('unix-clock');
    if(clockEl) clockEl.innerText = Math.floor(Date.now() / 1000);

    // គ្រប់គ្រងចលនារថយន្ត
    vehicles.forEach((v, index) => {
        v.x += v.speed;
        
        // នៅពេលរថយន្តរត់ផុតអេក្រង់
        if(v.x > 900) {
            if(v.isEV) {
                v.el.remove();
                vehicles.splice(index, 1);
                addLog("បេសកកម្មរថយន្តសង្គ្រោះ: បញ្ចប់", "var(--cyan)");
                return;
            }
            v.x = -30; // ឱ្យរថយន្តធម្មតាត្រឡប់មកវិញ
        }
        
        v.el.style.left = v.x + 'px';
        v.el.style.top = v.y + 'px';
    });

    requestAnimationFrame(updateSystem);
}

// 4. សកម្មភាពការពារ (Defense Actions)
function fireSolar() {
    aiSpeak("ប្រព័ន្ធការពារសូឡាត្រូវបានដំណើរការ។ កំពុងកម្ទេចគោលដៅ។");
    map.classList.add('flicker');
    addLog("ការការពារសូឡា: កំពុងប្រតិបត្តិការ", "var(--gold)");
    
    setTimeout(() => {
        map.classList.remove('flicker');
        aiSpeak("ការគំរាមកំហែងត្រូវបានកម្ចាត់។ ប្រព័ន្ធមានសុវត្ថិភាព។");
    }, 2000);
}

function spawnEV() {
    aiSpeak("បញ្ជាអាទិភាពខ្ពស់។ រថយន្តសង្គ្រោះបន្ទាន់កំពុងចេញដំណើរ។");
    createVehicle(true);
    addLog("ការបញ្ជាអាទិភាព: កំពុងដំណើរការ", "white");
}

// 5. ការក្លែងធ្វើការវាយប្រហារ (Threat Simulator)
function simulateIntrusion() {
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.8.${Math.floor(Math.random()*255)}`;
    const attackerEl = document.getElementById('attacker-ip');
    if(attackerEl) attackerEl.innerText = ip;
    
    const node = document.createElement('div');
    node.className = 'threat-node';
    node.style.left = Math.random() * 90 + '%';
    node.style.top = Math.random() * 90 + '%';
    map.appendChild(node);
    
    aiSpeak("ព្រមាន! រកឃើញការជ្រៀតជ្រែកប្រព័ន្ធពីអាសយដ្ឋាន " + ip);
    addLog(`រកឃើញការវាយប្រហារ: ${ip}`, "var(--red)");
    
    // បំបាត់ចំណុចវាយប្រហារក្រោយ ៤ វិនាទី
    setTimeout(() => {
        if(node) node.remove();
        aiSpeak("ការវាយប្រហារត្រូវបានទប់ស្កាត់ដោយជោគជ័យ។");
    }, 4000);
}

// ជំនួយការបន្ថែម Log ទៅកាន់ Feed
function addLog(text, color) {
    const entry = document.createElement('div');
    entry.style.color = color;
    entry.innerText = `> ${text}`;
    logFeed.prepend(entry);
}

// --- ចាប់ផ្តើមដំណើរការប្រព័ន្ធ (Boot sequence) ---
window.onload = () => {
    // បង្កើតរថយន្តធម្មតា ១០ គ្រឿង
    for(let i=0; i<10; i++) createVehicle(false);
    
    updateSystem();
    
    // បង្កើតការវាយប្រហារសាកល្បងរៀងរាល់ ២៥ វិនាទី
    setInterval(simulateIntrusion, 25000);
    
    aiSpeak("ប្រព័ន្ធ Sentinel OS កំណែ ៧.០ ចាប់ផ្តើមដំណើរការ។ ស្ថានភាពប្រព័ន្ធ: ប្រក្រតី។");
    addLog("ប្រព័ន្ធ: ចាប់ផ្តើមជោគជ័យ", "var(--cyan)");
};
