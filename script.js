/**
 * ក្រឡាបញ្ជាមហិទ្ធិឫទ្ធិ SENTINEL OS v7.0
 * គ្រប់គ្រងលើ: យានយន្តអាទិភាព, ព្រះសូរសៀងបញ្ញាសិប្បនិម្មិត, និងការទប់ស្កាត់មហន្តរាយ
 */

const map = document.getElementById('map');
const logFeed = document.getElementById('log-feed');
const solarLoadDisplay = document.getElementById('solar-load-val');
const vehicles = [];

// ១. ព្រះសូរសៀងបញ្ញាសិប្បនិម្មិត (High-Command AI Voice)
function aiSpeak(msg) {
    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = 'km-KH'; 
    speech.rate = 0.9;     // បន្ថយល្បឿនដើម្បីភាពថ្លៃថ្នូរ
    speech.pitch = 0.7;    // សំឡេងធ្ងន់អង់អាច
    window.speechSynthesis.speak(speech);
}

// ២. ការចាត់តាំងយានយន្តអាទិភាព (Imperial V2X Engine)
function createVehicle(isPriority = false) {
    const v = document.createElement('div');
    v.className = isPriority ? 'vehicle flicker priority' : 'vehicle';
    
    const data = {
        el: v,
        x: Math.random() * 800,
        y: isPriority ? 250 : Math.random() * 400,
        speed: isPriority ? 8 : (1.5 + Math.random() * 2),
        isPriority: isPriority
    };
    
    map.appendChild(v);
    vehicles.push(data);
}

// ៣. វដ្តដំណើរការព្រះនគរឌីជីថល (Main System Loop)
function updateSystem() {
    // បច្ចុប្បន្នភាពកាលប្បវត្តិ (Unix Clock)
    const clockEl = document.getElementById('unix-clock');
    if(clockEl) clockEl.innerText = Math.floor(Date.now() / 1000);

    // ត្រួតពិនិត្យចលនាយានយន្ត
    vehicles.forEach((v, index) => {
        v.x += v.speed;
        
        if(v.x > 900) {
            if(v.isPriority) {
                v.el.remove();
                vehicles.splice(index, 1);
                addLog("បេសកកម្មអាទិភាពខ្ពស់បំផុត: បញ្ចប់សព្វគ្រប់", "#00ffff");
                return;
            }
            v.x = -50; 
        }
        
        v.el.style.left = v.x + 'px';
        v.el.style.top = v.y + 'px';
    });

    requestAnimationFrame(updateSystem);
}

// ៤. ព្រះរាជកិច្ចការពារប្រព័ន្ធ (Defense & Utility Actions)
function fireSolar() {
    aiSpeak("សូរស័ក្តិសូឡាត្រូវបានប្រកាសអាសន្ន។ កំពុងបោសសម្អាតមហន្តរាយ។");
    map.classList.add('flicker');
    addLog("ព្រះរាជបញ្ជាសូឡា: កំពុងប្រតិបត្តិការ", "#ffd700");
    
    setTimeout(() => {
        map.classList.remove('flicker');
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
        if(solarLoadDisplay) solarLoadDisplay.innerText = "១០០%";
        return;
    }

    const progress = (now - startDate) / (targetDate - startDate);
    const currentLoad = 14 + (progress * (100 - 14));
    
    if(solarLoadDisplay) {
        solarLoadDisplay.innerText = `${currentLoad.toFixed(2)}%`;
    }
}

// ៦. ការក្លែងធ្វើមហន្តរាយ (Threat Simulator)
function simulateIntrusion() {
    const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.8.${Math.floor(Math.random()*255)}`;
    const attackerEl = document.getElementById('attacker-ip');
    if(attackerEl) attackerEl.innerText = ip;
    
    aiSpeak(`សូមប្រយ័ត្ន! ពិនិត្យឃើញការរំលោភព្រះរាជអាជ្ញាប្រព័ន្ធពីអាសយដ្ឋាន ${ip}`);
    addLog(`ពិនិត្យឃើញមហន្តរាយ: ${ip}`, "#ff3131");
}

// បញ្ជីព្រឹត្តិការណ៍ (Imperial Log Helper)
function addLog(text, color) {
    const entry = document.createElement('div');
    entry.style.color = color;
    entry.style.fontWeight = "bold";
    entry.innerText = `>>> ${text}`;
    logFeed.prepend(entry);
}

// --- ការចាប់ផ្តើមគ្រងរាជ្យនៃប្រព័ន្ធ (Imperial Boot sequence) ---
window.onload = () => {
    for(let i=0; i<15; i++) createVehicle(false);
    
    updateSystem();
    setInterval(updateSolarLoad, 1000);
    setInterval(simulateIntrusion, 30000);
    
    aiSpeak("ប្រព័ន្ធសេនទីណែល កំណែ ៧.០ ចាប់ផ្តើមគ្រងរាជ្យ។ រាល់កិច្ចការទាំងឡាយមានភាពប្រក្រតី។");
    addLog("ស្នូលប្រព័ន្ធ: ចាប់ផ្តើមមហិទ្ធិឫទ្ធិ", "#00ffff");
};
