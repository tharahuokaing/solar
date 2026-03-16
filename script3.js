:root {
    --cyan: #00f2ff;
    --gold: #ffd700;
    --red: #ff3e3e;
}

/* 3D Container Setup */
.main-stage {
    perspective: 1200px;
    overflow: hidden;
}

.hologram-viewport {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    background: radial-gradient(circle at center, rgba(0, 242, 255, 0.05) 0%, transparent 70%);
}

/* --- Vehicle Data Tag Styling --- */
.vehicle-tag {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%) rotateX(-45deg); /* Counter-rotate to stay readable */
    background: rgba(10, 15, 20, 0.9);
    color: var(--cyan);
    padding: 4px 8px;
    font-size: 0.65rem;
    border: 1px solid var(--cyan);
    border-radius: 4px;
    backdrop-filter: blur(10px);
    pointer-events: none;
    white-space: nowrap;
    box-shadow: 0 0 15px rgba(0, 242, 255, 0.3);
    text-shadow: 0 0 5px var(--cyan);
    z-index: 1000;
}

.vehicle-tag::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    width: 1px;
    height: 12px;
    background: linear-gradient(to bottom, var(--cyan), transparent);
}
