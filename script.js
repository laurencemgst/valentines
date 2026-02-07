let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const invitation = document.getElementById("invitationCard");
const slideshow = document.getElementById("slideshow");

// Start slideshow immediately
showSlides();

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  // After last image → show invitation
  if (slideIndex > slides.length) {
    slideshow.classList.add("hidden");
    invitation.classList.remove("hidden");
    return;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 3000);
}

// ---------------------------
// Discord Webhook Button Logic
// ---------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Ensure loveMessage is hidden on load
  document.getElementById("loveMessage").classList.add("hidden");

  document.getElementById("yesBtn").addEventListener("click", function () {
    document.getElementById("loveMessage").classList.remove("hidden");
  });
});

document.getElementById("yesBtn").addEventListener("click", () => {
  document.getElementById("loveMessage").classList.remove("hidden");

  // Discord Webhook URL
  const webhookURL =
    "https://discord.com/api/webhooks/1469683373973704849/aV-CdbiVgRTARlcj75BmGCOYTGlqhBlqOVps_NhQ6kKVAPc66GcCHfUAyjAIcqqmZBWp";

  // Payload for Discord
  const payload = {
    content: "💌 She clicked YES on your Valentine invitation! ❤️",
  };

  // Send POST request to Discord
  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Discord notification sent!");
      } else {
        console.error("Failed to send Discord message:", response.statusText);
      }
    })
    .catch((err) => console.error("Error sending Discord message:", err));

  // Show animated I Love You message
  const loveMessage = document.getElementById("loveMessage");
  loveMessage.classList.remove("hidden");

  // Optional: hide invitation card
  invitation.classList.add("hidden");
});

function createFloatingEmoji() {
  const emojis = ["💐", "🌸", "🌹", "🌷", "💖", "❤️", "💕"];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const floating = document.createElement("span");
  floating.className = "floating";
  floating.textContent = emoji;

  // Random horizontal position
  floating.style.left = Math.random() * 100 + "vw";
  // Random size
  floating.style.fontSize = 24 + Math.random() * 32 + "px";

  document.getElementById("floating-bg").appendChild(floating);

  // Remove after animation
  setTimeout(() => {
    floating.remove();
  }, 6000);
}

// Generate floating emojis every 500ms
setInterval(createFloatingEmoji, 500);
