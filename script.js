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

