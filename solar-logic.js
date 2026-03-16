/**
 * SENTINEL OS - SOLAR GRID ENGINE (EMPIRE EDITION)
 * គោលដៅ៖ ការគណនាបន្ទុកថាមពលឆ្ពោះទៅរកមហន្តរាយឆ្នាំ 2038 (T-Zero)
 * Integrated with: https://tharahuokaing.github.io/solar-cyber-empire/
 */

function calculateSolarLoad() {
    const display = document.getElementById('solar-load-val');
    const logFeed = document.getElementById('log-feed');
    
    // T-Zero: Tue, 19 Jan 2038 03:14:07 GMT (The 32-bit Signed Integer Limit)
    const T_ZERO = 2147483647; 
    
    // START_DATE: Jan 1st, 2026 (The beginning of the Cyber Empire Era)
    const START_DATE = 1767225600; 
    
    const NOW = Math.floor(Date.now() / 1000);
    
    // 3 Months in seconds for the "Post-Overflow" Critical Phase
    const THREE_MONTHS = 90 * 24 * 60 * 60;
    const SYSTEM_COLLAPSE = T_ZERO + THREE_MONTHS;

    let percentage;
    let statusText = "";

    if (NOW < T_ZERO) {
        // Phase 1: Leading to T-Zero
        const totalDuration = T_ZERO - START_DATE;
        const elapsed = NOW - START_DATE;
        percentage = (elapsed / totalDuration) * 100;
        
        // Logic for approaching overflow
        if (percentage > 99.9) {
            statusText = "CRITICAL_OVERFLOW_IMMINENT";
        }
    } else if (NOW >= T_ZERO && NOW <= SYSTEM_COLLAPSE) {
        // Phase 2: Post T-Zero (32-Bit Overflow Active)
        // Here we simulate the grid entering a "Beyond 100%" state
        const overflowElapsed = NOW - T_ZERO;
        const overflowPercentage = (overflowElapsed / THREE_MONTHS) * 38; // Up to 138% load
        percentage = 100 + overflowPercentage;
        statusText = "SYSTEM_INTEGRITY_COMPROMISED";
    } else {
        // Phase 3: Total Empire Blackout
        percentage = 0;
        statusText = "CORE_SHUTDOWN_COMPLETE";
    }

    // Update the UI
    if (display) {
        // We use .toFixed(6) to show the "ticking" precision
        display.innerHTML = `${percentage.toFixed(6)}%`;
        
        // Imperial Color Logic
        if (percentage >= 100) {
            display.style.color = "#ff3131"; // Blood Red
            display.style.textShadow = "0 0 15px #ff3131";
        } else if (percentage > 90) {
            display.style.color = "#ffd700"; // Imperial Gold
            display.style.textShadow = "0 0 10px #ffd700";
        } else {
            display.style.color = "#00f2ff"; // Neon Cyan
        }
    }

    // Trigger System Logs at key thresholds
    if (statusText && Math.random() > 0.98) {
        addEmpireLog(statusText, display.style.color);
    }
}

function addEmpireLog(msg, color) {
    const logFeed = document.getElementById('log-feed');
    if (logFeed) {
        const entry = document.createElement('div');
        entry.style.color = color;
        entry.style.fontSize = "10px";
        entry.innerText = `[WARN] ${msg} >> ${new Date().toISOString()}`;
        logFeed.prepend(entry);
        if (logFeed.children.length > 10) logFeed.lastChild.remove();
    }
}

// Initialization
setInterval(calculateSolarLoad, 1000);
