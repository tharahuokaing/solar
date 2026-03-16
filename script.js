/**
 * ក្រឡាបញ្ជាមហិទ្ធិឫទ្ធិ SENTINEL OS v2.0
 * គ្រប់គ្រងលើ: យានយន្តអាទិភាព, ព្រះសូរសៀងបញ្ញាសិប្បនិម្មិត, និងការទប់ស្កាត់មហន្តរាយ
 */

const map = document.getElementById('map');
const logFeed = document.getElementById('log-feed');
const solarLoadDisplay = document.getElementById('solar-load-val');
const unixClock = document.getElementById('unix-clock');
const attackerIpDisplay = document.getElementById('attacker-ip');
const vehicles = [];

// ១. ព្រះសូរសៀងបញ្ញាសិប្បនិម្មិត (Imperial AI Voice)
function aiSpeak(msg) {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(msg);
        speech.lang = 'km-KH'; 
        speech.rate = 0.85;    // បន្ថយល្បឿនដើម្បីភាពថ្លៃថ្នូរ
        speech.pitch = 0.7;    // សំឡេងធ្ងន់អង់អាច
        window.speechSynthesis.speak(speech);
    }
}

// ២. ការចាត់តាំងយានយន្តអាទិភាព (Imperial V2X Engine)
function createVehicle(isPriority = false) {
    const v = document.createElement('div');
    v.className = isPriority ? 'vehicle flicker priority' : 'vehicle';
    
    // Styling for visual representation in the map
    Object.assign(v.style, {
        position: 'absolute',
        width: isPriority ? '12px' : '8px',
        height: isPriority ? '12px' : '8px',
        background: isPriority ? '#ffffff' : '#00f2ff',
        boxShadow: isPriority ? '0 0 15px #fff' : '0 0 5px #00f2ff',
        borderRadius: '50%',
        transition: 'transform 0.2s'
    });

    const data = {
        el: v,
        x: Math.random() * (map.clientWidth - 20),
        y: isPriority ? (map.clientHeight / 2) : Math.random() * (map.clientHeight - 20),
        speed: isPriority ? 6 : (1.0 + Math.random() * 2),
        isPriority: isPriority
    };
    
    map.appendChild(v);
    vehicles.push(data);
}

// ៣. វដ្តដំណើរការព្រះនគរឌីជីថល (Main System Loop)
function updateSystem() {
    // បច្ចុប្បន្នភាពកាលប្បវត្តិ (32-Bit Binary Unix Clock)
    if (unixClock) {
        const now = Math.floor(Date.now() / 1000);
        unixClock.innerText = (now >>> 0).toString(2).padStart(32, '0');
    }

    // ត្រួតពិនិត្យចលនាយានយន្ត
    vehicles.forEach((v, index) => {
        v.x += v.speed;
        
        if (v.x > map.clientWidth) {
            if (v.isPriority) {
                v.el.remove();
                vehicles.splice(index, 1);
                addLog("បេសកកម្មអាទិភាពខ្ពស់បំផុត: បញ្ចប់សព្វគ្រប់", "#00ffff");
                return;
            }
            v.x = -20; 
        }
        
        v.el.style.left = v.x + 'px';
        v.el.style.top = v.y + 'px';
    });

    requestAnimationFrame(updateSystem);
}

// ៤. ព្រះរាជកិច្ចការពារប្រព័ន្ធ (Defense & Utility Actions)
function fireSolar() {
    aiSpeak("សូរស័ក្តិសូឡាត្រូវបានប្រកាសអាសន្ន។ កំពុងបោសសម្អាតមហន្តរាយ។");
    map.style.filter = "brightness(2) saturate(2) hue-rotate(180deg)";
    addLog("ព្រះរាជបញ្ជាសូឡា: កំពុងប្រតិបត្តិការ", "#ffd700");
    
    setTimeout(() => {
        map.style.filter = "none";
        aiSpeak("មហន្តរាយត្រូវបានវិនាសសាបសូន្យ។ ព្រះនគរមានសុវត្ថិភាព។");
    }, 2000);
}

function spawnEV() {
    aiSpeak("ព្រះរាជបញ្ជាអាទិភាពខ្ពស់បំផុត។ យានសង្គ្រោះកំពុងយាងចេញដំណើរ។");
    createVehicle(true);
    addLog("ព្រះរាជបញ្ជាអាទិភាព: សកម្ម", "#ffffff");
}

// ៥. បច្ចុប្បន្នភាពថាមពលសូឡា (Solar Grid Progression)
function updateSolarLoad() {
    const now = Date.now();
    const tZero = new Date("January 19, 2038 03:14:07 UTC").getTime();
    const targetDate = tZero - (90 * 24 * 60 * 60 * 1000); // ៣ ខែមុនកាលកំណត់
    const startDate = new Date("January 1, 2026 00:00:00 UTC").getTime();
    
    if (now >= targetDate) {
        if (solarLoadDisplay) solarLoadDisplay.innerText = "១០០%";
        return;
    }

    const progress = (now - startDate) / (targetDate - startDate);
    const currentLoad = 14 + (progress * (100 - 14));
    
    if (solarLoadDisplay) {
        solarLoadDisplay.innerText = `${currentLoad.toFixed(4)}%`;
        // Visual warning if load is approaching critical
        solarLoadDisplay.style.color = currentLoad > 80 ? "#ff3131" : "#00f2ff";
    }
}

// ៦. ការក្លែងធ្វើមហន្តរាយ (Threat Simulator)
function simulateIntrusion() {
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.8.${Math.floor(Math.random()*255)}`;
    if (attackerIpDisplay) attackerIpDisplay.innerText = ip;
    
    aiSpeak(`សូមប្រយ័ត្ន! ពិនិត្យឃើញការរំលោភព្រះរាជអាជ្ញាប្រព័ន្ធពីអាសយដ្ឋាន ${ip}`);
    addLog(`ពិនិត្យឃើញមហន្តរាយ: ${ip}`, "#ff3131");
}

// បញ្ជីព្រឹត្តិការណ៍ (Imperial Log Helper)
function addLog(text, color) {
    const entry = document.createElement('div');
    entry.style.color = color;
    entry.style.fontSize = "12px";
    entry.style.marginBottom = "5px";
    entry.style.borderLeft = `2px solid ${color}`;
    entry.style.paddingLeft = "5px";
    entry.innerText = `[${new Date().toLocaleTimeString()}] >>> ${text}`;
    logFeed.prepend(entry);
    
    if (logFeed.children.length > 15) logFeed.lastChild.remove();
}

// --- ការចាប់ផ្តើមគ្រងរាជ្យនៃប្រព័ន្ធ (Imperial Boot sequence) ---
window.addEventListener('load', () => {
    // Populate initial traffic
    for (let i = 0; i < 12; i++) {
        setTimeout(() => createVehicle(false), i * 150);
    }
    
    updateSystem();
    setInterval(updateSolarLoad, 1000);
    setInterval(simulateIntrusion, 45000); // Reduced frequency for better UX
    
    aiSpeak("ប្រព័ន្ធសេនទីណែល កំណែ ៧.០ ចាប់ផ្តើមគ្រងរាជ្យ។ រាល់កិច្ចការទាំងឡាយមានភាពប្រក្រតី។");
    addLog("ស្នូលប្រព័ន្ធ: ចាប់ផ្តើមមហិទ្ធិឫទ្ធិ", "#00ffff");
});
