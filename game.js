const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameOver = false;

const player = { x: canvas.width / 2, y: canvas.height - 50, size: 20, color: '#00ffcc' };
const enemies = [];

// Handle Mouse/Touch movement
window.addEventListener('mousemove', (e) => { player.x = e.clientX; });
window.addEventListener('touchmove', (e) => { player.x = e.touches[0].clientX; });

function spawnEnemy() {
    if (gameOver) return;
    enemies.push({
        x: Math.random() * canvas.width,
        y: -30,
        size: 15 + Math.random() * 20,
        speed: 3 + (score / 10)
    });
    setTimeout(spawnEnemy, 600 - Math.min(score * 5, 400));
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - player.size/2, player.y, player.size, player.size);

    // Update & Draw Enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        let e = enemies[i];
        e.y += e.speed;
        
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();

        // Collision Check
        if (e.y + e.size > player.y && e.x > player.x - player.size && e.x < player.x + player.size) {
            gameOver = true;
            alert(`Game Over! Final Score: ${score}`);
            location.reload();
        }

        if (e.y > canvas.height) {
            enemies.splice(i, 1);
            score++;
            scoreElement.innerText = score;
        }
    }
    requestAnimationFrame(update);
}

spawnEnemy();
update();