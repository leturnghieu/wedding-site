document.getElementById("send-wish-button").addEventListener("click", () => {
    const message = document.getElementById("wish-textarea").value;
    if (message.trim() === "") {
        alert("Vui lòng nhập lời chúc!");
    } else {
        alert("Cảm ơn bạn đã gửi lời chúc!");
        document.getElementById("wish-textarea").value = ""; // Clear the input
    }
});

document.getElementById("play-music").addEventListener("click", () => {
    const audio = document.getElementById("background-music");
    audio.play().then(() => {
        console.log("Nhạc đã bắt đầu phát.");
    }).catch((error) => {
        console.error("Không thể phát nhạc:", error);
        alert("Không thể phát nhạc. Vui lòng kiểm tra file hoặc tương tác trực tiếp với trang.");
    });
});

document.getElementById("pause-music").addEventListener("click", () => {
    const audio = document.getElementById("background-music");
    audio.pause();
    console.log("Nhạc đã tạm dừng.");
});

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-music");

    // Phát nhạc sau khi người dùng tương tác
    const playMusic = () => {
        audio.play().then(() => {
            console.log("Nhạc nền đã phát.");
        }).catch((error) => {
            console.warn("Không thể phát nhạc tự động:", error);
        });

        // Gỡ sự kiện sau khi nhạc đã phát
        document.removeEventListener("click", playMusic);
        document.removeEventListener("scroll", playMusic);
    };

    // Gắn sự kiện click hoặc cuộn trang
    document.addEventListener("click", playMusic);
    document.addEventListener("scroll", playMusic);
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("fireworks-canvas");
    const ctx = canvas.getContext("2d");

    // Điều chỉnh kích thước canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Hàm tạo giá trị ngẫu nhiên trong khoảng [min, max]
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Lớp Firework
    class Firework {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.particles = [];
            for (let i = 0; i < 100; i++) {
                this.particles.push({
                    x: this.x,
                    y: this.y,
                    angle: random(0, 2 * Math.PI),
                    speed: random(2, 6),
                    alpha: 1,
                    decay: random(0.01, 0.03),
                });
            }
        }

        draw() {
            this.particles.forEach((particle) => {
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;
                particle.alpha -= particle.decay;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 2, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(${this.color}, ${particle.alpha})`;
                ctx.fill();
            });

            // Loại bỏ các particle đã tắt
            this.particles = this.particles.filter((p) => p.alpha > 0);
        }
    }

    const fireworks = [];

    // Hàm thêm pháo hoa
    function addFirework(x, y) {
        const color = `${Math.floor(random(100, 255))}, ${Math.floor(random(100, 255))}, ${Math.floor(random(100, 255))}`;
        fireworks.push(new Firework(x, y, color));
    }

    // Hàm tạo pháo hoa ngẫu nhiên
    function createRandomFirework() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight / 2; // Tạo pháo hoa ở nửa trên màn hình
        addFirework(x, y);
    }

    // Hàm render pháo hoa
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((firework, index) => {
            firework.draw();
            if (firework.particles.length === 0) {
                fireworks.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    // Bắt đầu tạo pháo hoa tự động
    setInterval(createRandomFirework, 200); // Mỗi giây tạo một pháo hoa
    animate(); // Bắt đầu render
});

// Ảnh chuyển động khi kéo xuống thấy chúng

document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.querySelector(".image-container");

    function handleScroll() {
        const containerPosition = imageContainer.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        // Khi phần tử vào khung nhìn
        if (containerPosition < screenHeight - 100) {
            imageContainer.classList.add("active");
        }
    }

    window.addEventListener("scroll", handleScroll);
});
