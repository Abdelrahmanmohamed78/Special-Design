// Make Clickable Menu
let bars = document.querySelector("header .container nav .bars");
let links = document.querySelector("header .container nav .links");
let link = document.querySelectorAll("header .container nav .links li a");
bars.onclick = function () {
  if (links.classList.contains("open")) {
    links.classList.remove("open");
    bars.classList.remove("open");
  } else {
    links.classList.add("open");
    bars.classList.add("open");
  }
};

link.forEach((a) => {
  a.onclick = function () {
    link.forEach((a) => {
      a.classList.remove("active");
    });
    a.classList.add("active");
    links.classList.remove("open");
    bars.classList.remove("open");
  };
});

// Scroll To Top Button

let scrollTop = document.querySelector(".scrollTop");

// Button Show or Hide

window.addEventListener("scroll", () => {
  this.scrollY >= 300
    ? scrollTop.classList.add("show")
    : scrollTop.classList.remove("show");
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// Add Images Randomly In Landing
let landing = document.querySelector(".landing");
let images = [
  "./images/01.jpg",
  "./images/02.jpg",
  "./images/03.jpg",
  "./images/04.jpg",
  "./images/05.jpg",
  "./images/06.png",
  "./images/07.jpg",
  "./images/08.jpg",
  "./images/09.jpg",
  "./images/10.jpg",
];
const RandomBackEl = document.querySelectorAll(".setting-container .option-box:nth-child(2) span");
let backgroundStatus = true;
if (localStorage.getItem("background-option")) {
  RandomBackEl.forEach((span) => {
    span.classList.remove("active");
  });
  document
    .querySelector(
      `[data-background = "${localStorage.getItem("background-option")}"]`
    )
    .classList.add("active");
  if (localStorage.getItem("background-option") == "yes") {
    backgroundStatus = true;
  } else {
    backgroundStatus = false;
  }
}
let backgroundInterval;
function radomizeBackground() {
  if (backgroundStatus === true) {
    backgroundInterval = setInterval(() => {
      let num = Math.floor(Math.random() * images.length);
      landing.style.backgroundImage = `url(${images[num]})`;
    }, 5000);
  }
}
radomizeBackground();

// Random BackEl

RandomBackEl.forEach((span) => {
  span.addEventListener("click", () => {
    RandomBackEl.forEach((span) => {
      span.classList.remove("active");
    });
    span.classList.add("active");
    localStorage.setItem("background-option", span.dataset.background);
    if (localStorage.getItem("background-option")) {
      if (localStorage.getItem("background-option") == "yes") {
        backgroundStatus = true;
        radomizeBackground();
      } else {
        backgroundStatus = false;
        clearInterval(backgroundInterval);
      }
    }
  });
});

// Control The Setting Box And Animated Gear Icon
let mySettingBox = document.querySelector(".setting-box");
let gearIcon = document.querySelector(".setting-box .icon");
gearIcon.onclick = function () {
  if (mySettingBox.classList.contains("open")) {
    mySettingBox.classList.remove("open");
  } else {
    mySettingBox.classList.add("open");
  }
};

// Select Color
if (window.localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    `--main-color`,
    window.localStorage.getItem("color")
  );
  document
    .querySelector(`[data-color = "${window.localStorage.getItem("color")}"]`)
    .classList.add("active");
}
let colorsListLi = document.querySelectorAll(".setting-box .colors-list li");
colorsListLi.forEach((li) => {
  li.onclick = function () {
    colorsListLi.forEach((li) => {
      li.classList.remove("active");
    });
    this.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      `${this.dataset.color}`
    );
    window.localStorage.setItem("color", this.dataset.color);
  };
});

//animation on skills
let skills = document.querySelector(".skills");
let span = document.querySelectorAll(".skill-box .skill-progress span");

window.onscroll = function () {
  if (window.scrollY >= skills.offsetTop - 150) {
    span.forEach((box) => {
      box.style.width = box.dataset.progress;
    });
  }
};

// Control On Image Popup Window In Gallery Section

let imageWindow = document.querySelector(".gallery .image-window");
let popup = document.querySelector(".gallery .image-window .popup");
let closePopup = document.querySelector(".gallery .image-window .popup .close");
let image = document.querySelectorAll(".gallery .container .images-box img");

// Create Popup Image In Gallery Section

function createImage(ele) {
  document.body.classList.add("close-body");
  imageWindow.classList.add("open");
  let image = document.createElement("img");
  image.src = ele.getAttribute("src");
  popup.appendChild(image);
}

// Remove Popup Image In Gallery Section

function removeImage() {
  popup.children[1].remove();
  document.body.classList.remove("close-body");
  imageWindow.classList.remove("open");
}

image.forEach((ele) => {
  ele.onclick = function () {
    createImage(ele);
    closePopup.onclick = removeImage;
  };
});

// Go To Section Using Scroll Into View
let bulletsContainer = document.querySelector(".bullets");
let bullets = document.querySelectorAll(".bullets > li");

bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document
      .querySelector(`.${e.currentTarget.dataset.section}`)
      .scrollIntoView({
        behavior: "smooth",
      });
  });
});

// Handle Bullets State
let showBullets = document.querySelectorAll(".setting-box .setting-container .showBullets span");

showBullets.forEach((el) => {
  el.addEventListener("click", (ev) => {
    showBullets.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
  });
  sBullets(el);
});

if (window.localStorage.getItem("showBullets")) {
  showBullets.forEach((span) => {
    span.classList.remove("active");
  });
  if (window.localStorage.getItem(`showBullets`) == "yes") {
    bulletsContainer.style.display = "block";
    document.querySelector(`[data-states = 'yes']`).classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(`[data-states = 'no']`).classList.add("active");
  }
}

function sBullets(ele) {
  ele.addEventListener("click", (ev) => {
    if (ev.currentTarget.classList.contains("yes")) {
      window.localStorage.setItem("showBullets", "yes");
      bulletsContainer.style.display = "block";
    } else {
      window.localStorage.setItem("showBullets", "no");
      bulletsContainer.style.display = "none";
    }
  });
}

// Reset Button

let resetButton = document.querySelector(".reset-option");
resetButton.addEventListener("click", () => {
  window.localStorage.removeItem("color");
  window.localStorage.removeItem("showBullets");
  window.localStorage.removeItem("background-option");
  window.location.reload();
});
