/**
 * ក្រឡាបញ្ជាមហិទ្ធិឫទ្ធិ SENTINEL OS v7.0 
 * ការកែសម្រួល៖ បញ្ជាយានយន្តអាទិភាពឱ្យរត់ក្នុងគន្លងកណ្តាលនៃព្រះអធិរាជាណាចក្រ
​ * ភារកិច្ចចម្បង៖ ទប់ស្កាត់វិនាសកម្មកាលប្បវត្តិ ឆ្នាំ ២០៣៨ (Unix Epoch Crisis)
 */

const map = document.getElementById('map');
const logFeed = document.getElementById('log-feed');
const solarLoadDisplay = document.getElementById('solar-load-val');
const vehicles = [];

// ១. ព្រះសូរសៀងបញ្ញាសិប្បនិម្មិត (Imperial AI Voice)
function aiSpeak(msg) {
    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = 'km-KH'; 
    speech.rate = 0.9;     
    speech.pitch = 0.7;    
    window.speechSynthesis.speak(speech);
}

// ២. ការចាត់តាំងយានយន្ត (Imperial Vehicle Engine)
function createVehicle(isPriority = false) {
    const v = document.createElement('div');
    v.className = isPriority ? 'vehicle flicker priority' : 'vehicle';
    
    // គណនាគន្លងកណ្តាលនៃផែនទី (Dynamic Lane Calculation)
    const mapHeight = map.offsetHeight || 500; // កម្ពស់ផែនទី
    const centerPoint = (mapHeight / 2) - 10;   // ចំណុចកណ្តាល
    
    const data = {
        el: v,
        x: -50, // ចាប់ផ្តើមចេញពីខាងឆ្វេងផែនទី
        // បើជាយានអាទិភាព ឱ្យរត់ចំកណ្តាល បើជាយានធម្មតា ឱ្យរត់ឆៀងលើក្រោមបន្តិចបន្តួច
        y: isPriority ? centerPoint : (Math.random() * (mapHeight - 40)), 
        speed: isPriority ? 7 : (1.5 + Math.random() * 2),
        isPriority: isPriority
    };
    
    map.appendChild(v);
    vehicles.push(data);
}

// ៣. វដ្តដំណើរការអធិរាជាណាចក្រឌីជីថល (Main System Loop)
function updateSystem() {
    // បច្ចុប្បន្នភាពកាលប្បវត្តិ (Unix Clock)
    const clockEl = document.getElementById('unix-clock');
    if(clockEl) clockEl.innerText = Math.floor(Date.now() / 1000);

    // ត្រួតពិនិត្យ និងបញ្ជាចលនាយានយន្ត
    vehicles.forEach((v, index) => {
        v.x += v.speed;
        
        // នៅពេលយានយន្តរត់ផុតកម្រិតផែនទី (ឧទាហរណ៍ ៩៥០ ភិចសែល)
        if(v.x > (map.offsetWidth || 900) + 50) {
            if(v.isPriority) {
                v.el.remove();
                vehicles.splice(index, 1);
                addLog("បេសកកម្មអាទិភាពខ្ពស់បំផុត: បញ្ចប់សព្វគ្រប់", "#00ffff");
                return;
            }
            v.x = -50; // ឱ្យយានធម្មតារត់ត្រឡប់មកវិញ
        }
        
        v.el.style.left = v.x + 'px';
        v.el.style.top = v.y + 'px';
    });

    requestAnimationFrame(updateSystem);
}

// ៤. ព្រះរាជកិច្ចការពារប្រព័ន្ធ (Defense Actions)
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
    aiSpeak("ព្រះរាជបញ្ជាអាទិភាពខ្ពស់បំផុត។ យានសង្គ្រោះកំពុងយាងចេញដំណើរតាមគន្លងកណ្តាល។");
    createVehicle(true);
    addLog("ព្រះរាជបញ្ជាអាទិភាព: សកម្ម", "#ffffff");
}

// ៥. បច្ចុប្បន្នភាពថាមពលសូឡា (Solar Grid Progression)
function updateSolarLoad() {
    const solarLoadDisplay = document.getElementById('solar-load-val');
    const now = Date.now();
    
    // កាលបរិច្ឆេទមហន្តរាយវិនាសកម្មឆ្នាំ ២០៣៨ (T-Zero)
    const tZero = new Date("January 19, 2038 03:14:07 UTC").getTime();
    
    // គោលដៅ ១០០% (៣ ខែមុន T-Zero)
    const targetDate = tZero - (90 * 24 * 60 * 60 * 1000); 
    
    // ចំណុចចាប់ផ្តើម៖ ថ្ងៃទី ៣១ ធ្នូ ២០១៩ (មហន្តរាយ Y2K19)
    const startDate = new Date("December 31, 2019 00:00:00 UTC").getTime();
    
    if (now >= targetDate) {
        if(solarLoadDisplay) solarLoadDisplay.innerText = "១០០% (បំណះប្រព័ន្ធរួចរាល់)";
        return;
    }

    // គណនា Progress បច្ចុប្បន្ន
    const progress = (now - startDate) / (targetDate - startDate);
    
    // ថាមពលកើនពី ១៤% (នៅឆ្នាំ ២០១៩) ដល់ ១០០% (នៅឆ្នាំ ២០៣៧)
    const currentLoad = 14 + (progress * (100 - 14));
    
    if(solarLoadDisplay) {
        solarLoadDisplay.innerText = `${currentLoad.toFixed(6)}%`;
    }
}

// ៦. ការក្លែងធ្វើមហន្តរាយ (Threat Simulator (penetration Testing))
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
    entry.style.marginBottom = "4px";
    entry.innerText = `>>> ${text}`;
    logFeed.prepend(entry);
}

// --- ការចាប់ផ្តើមគ្រងរាជ្យនៃប្រព័ន្ធ (Imperial Boot sequence) ---
window.onload = () => {
    // បង្កើតយានយន្តធម្មតាចំនួន ៣០ គ្រឿង
    for(let i=0; i<30; i++) {
        setTimeout(() => createVehicle(false), i * 200);
    }
    
    updateSystem();
    setInterval(updateSolarLoad, 1000);
    setInterval(simulateIntrusion, 30000);
    
    aiSpeak("ប្រព័ន្ធសេនទីណែល កំណែ ៧.០ ចាប់ផ្តើម។ រាល់កិច្ចការទាំងឡាយមានភាពប្រក្រតី។");
    addLog("ស្នូលប្រព័ន្ធ: ចាប់ផ្តើមមហិទ្ធិឫទ្ធិ", "#00ffff");
};
