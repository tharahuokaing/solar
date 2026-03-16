/**
 * ភារកិច្ច៖ បង្កើតផែនទីកាលប្បវត្តិសកល បែបហូឡូក្រាម (CHRONOS ENGINE v7.8)
 * បញ្ជាក់៖ បង្ហាញពីការតភ្ជាប់រវាង Y2K, Y2K19 (GPS Rollover), និង Y2K38 (Unix Overflow)
 * Link: https://tharahuokaing.github.io/solar-cyber-empire/
 */

function initHologramMap() {
    const mapStage = document.getElementById('map');
    if (!mapStage) return;

    // ១. បង្កើតរចនាសម្ព័ន្ធ Interface
    mapStage.innerHTML = `
        <div class="hologram-viewport" style="perspective: 1000px;">
            <div class="grid-overlay"></div>
            <div class="scanline"></div>
            <canvas id="map-canvas" style="filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));"></canvas>
            
            <div class="epoch-label" style="top: 10%; left: 10%;">[ TAG: Y2K_LEGACY ]</div>
            <div class="epoch-label" style="top: 10%; right: 10%;">[ TAG: Y2K38_OVERFLOW ]</div>
            <div id="threat-layer"></div>
        </div>
    `;

    const canvas = document.getElementById('map-canvas');
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = mapStage.offsetWidth;
        canvas.height = mapStage.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // ២. បង្កើតចំណុចបណ្តាញ និងទិន្នន័យ Epoch (Network Nodes)
    const nodes = [];
    const nodeCount = 45;
    const colors = ["#D4AF37", "#00F2FF", "#FFFFFF"]; // Gold, Cyan, White

    for(let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 2 + 1
        });
    }

    // ៣. ម៉ាស៊ីនគំនូរ (Drawing Engine)
    function drawMap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // បែបផែនចលនា និងការតភ្ជាប់
        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;

            // រក្សាឱ្យនៅក្នុងព្រំដែន (Boundary Logic)
            if(node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if(node.y < 0 || node.y > canvas.height) node.vy *= -1;

            // គូរខ្សែតភ្ជាប់បណ្តាញ (Neural Links)
            nodes.slice(i + 1).forEach(target => {
                const dist = Math.hypot(node.x - target.x, node.y - target.y);
                if(dist < 130) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(212, 175, 55, ${1 - dist/130})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                }
            });

            // គូរចំណុចថាមពល (Data Nodes)
            ctx.shadowBlur = 10;
            ctx.shadowColor = node.color;
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // បន្ថែមអត្ថបទ Dynamic លើ Canvas
        drawChronologyInfo(ctx, canvas);

        requestAnimationFrame(drawMap);
    }

    function drawChronologyInfo(ctx, canvas) {
        ctx.font = "10px 'Share Tech Mono'";
        ctx.fillStyle = "rgba(0, 242, 255, 0.6)";
        ctx.fillText("SYSTEM_STATUS: MONITORING_Y2K38_VECTOR", 20, canvas.height - 40);
        ctx.fillText(`EPOCH_DRIFT: ${(Math.random() * 0.001).toFixed(6)}s`, 20, canvas.height - 25);
    }

    drawMap();
}

// ៤. ចាប់ផ្តើមដំណើរការ (Boot Sequence)
window.addEventListener('DOMContentLoaded', () => {
    initHologramMap();
    console.log("CHRONOS_ENGINE: Link established to Solar Cyber Empire.");
});
