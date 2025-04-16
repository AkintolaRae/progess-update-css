//nav bar style on scroll
let lastScrollY = window.scrollY;
const nav = document.querySelector("nav");
const fixedPosition = 200; //
let scrollTimeout; // Timeout to detect when scrolling stops

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Clear any existing timeout
  clearTimeout(scrollTimeout);

  if (currentScrollY > lastScrollY) {
    // Scrolling down
    nav.classList.remove("scrolling-up"); // Remove scrolling-up class
    if (currentScrollY < fixedPosition) {
      nav.style.position = "fixed";
      nav.style.top = "0";
      nav.style.animation = "stayFixed 1s forwards";
      nav.classList.remove("white-bg"); // Ensure text stays white
    } else {
      nav.style.position = "absolute";
      nav.style.top = `${fixedPosition}px`;
      nav.style.animation = "scrollDown 1s forwards";
      nav.classList.add("white-bg"); // Change text to black
    }
  } else {
    // Scrolling up
    nav.classList.add("scrolling-up"); // Add scrolling-up class
    nav.style.position = "fixed";
    nav.style.top = "0";
    nav.style.animation = "scrollUp 1s forwards"; // Show the navbar
    nav.classList.add("white-bg"); // Change text to black

    if (currentScrollY === 0) {
      nav.style.animation = "scrollToBlack 1s forwards"; // Smoothly transition to black
      nav.classList.remove("white-bg"); // Remove white-bg class
    }
  }

  // Set a timeout to detect when scrolling stops
  scrollTimeout = setTimeout(() => {
    if (currentScrollY > 0) {
      nav.style.animation = "eraseUp 1s forwards"; // Erase the navbar when scrolling stops
    }
  }, 20000);
  lastScrollY = currentScrollY;
});

//show menu
const menu = document.querySelector(".nav-menu");
const menuBtn = document.querySelector(".button-bar");
const closemenu = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
  menu.style.display = "flex";
  closemenu.style.display = "inline.block";
  menuBtn.style.display = "none";
  document.body.style.overflow = "hidden"; // Prevent background scrolling
});

const closeMenu = () => {
  menu.style.display = "none";
  closemenu.style.display = "visible";
  menuBtn.style.display = "inline-block";
  document.body.style.overflow = ""; // Allow background scrolling again
};

closemenu.addEventListener("click", closeMenu);

// Select all the articles in the closing-articles section
const articles = document.querySelectorAll(".closing-articles .first-article");

articles.forEach((article) => {
  const spanImg = article.querySelector("span img"); // The clickable span image
  const firstImage = article.querySelector(".first-image img"); // The first-image div
  const ul = article.querySelector("ul"); // The ul element
  const hr = document.querySelector(".closing-articles hr");

  // Add a click event listener to the span image
  spanImg.addEventListener("click", () => {
    // Close all other articles
    articles.forEach((otherArticle) => {
      if (otherArticle !== article) {
        otherArticle.querySelector(".first-image img").style.display = "none";
        otherArticle.querySelector("ul").style.display = "none";
        otherArticle.querySelector("span img").style.display = "block";
      }
    });

    // Toggle the visibility of the current article's content
    firstImage.style.display = "flex"; // Show the first-image
    ul.style.display = "block"; // Show the ul
    spanImg.style.display = "none"; // Hide the span image
  });
});

//add and minus faqs
// Select all FAQ articles
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  const faqIcon = faq.querySelector(".faq-icon img:first-child"); // The add icon
  const removeIcon = faq.querySelector(".faq-icon .remove-icon"); // The remove icon
  const faqText = faq.querySelector("p"); // The paragraph to toggle
  const faqList = faq.querySelector("ul");

  // Add a click event listener to the FAQ icon
  faqIcon.addEventListener("click", () => {
    // Show the FAQ text and replace the FAQ icon with the remove icon
    faqText.style.display = "block";
    faqIcon.style.display = "none";
    removeIcon.style.display = "inline-block";
    faqList.style.display = "block";
  });

  // Add a click event listener to the remove icon
  removeIcon.addEventListener("click", () => {
    // Hide the FAQ text and replace the remove icon with the FAQ icon
    faqText.style.display = "none";
    faqIcon.style.display = "inline-block";
    removeIcon.style.display = "none";
    faqList.style.display = "none"; // Hide the list as well
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const textPath = document.querySelector(".curved-text textPath");
  let offset = 550.166261; // Initial offset value

  window.addEventListener("wheel", (event) => {
    const scrollDirection = event.deltaY || window.scrollY; // Detect scroll direction
    if (scrollDirection > 0) {
      // Scrolling down
      offset -= 5; // Decrease offset for anti-clockwise
    } else {
      // Scrolling up
      offset += 5; // Increase offset for clockwise
    }

    // Make the scrolling infinite by looping the offset
    if (offset < 0) {
      offset = 1000; // Reset to the maximum value
    } else if (offset > 1000) {
      offset = 0; 
    }

    textPath.setAttribute("startOffset", offset);
  });
});



