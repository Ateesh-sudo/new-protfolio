  const canvas = document.getElementById('molCanvas');
  const ctx = canvas.getContext('2d');

  const W = canvas.width;
  const H = canvas.height;

  // ---- Settings you can tweak ----
  const NODE_COUNT   = 30;      // how many dots
  const DOT_RADIUS   = 2.2;     // <-- small dot size (was ~5-9 before)
  const LINE_DIST    = 140;     // max distance to draw a connecting line
  const SPEED        = 0.35;    // drift speed
  const DOT_COLOR     = '#B284BE';
  const LINE_COLOR    = '133, 183, 235'; // rgb values, alpha added per-line
  // ---------------------------------

  let nodes = [];

  function initNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: DOT_RADIUS + Math.random() * 1.2   // slight size variety, still small
      });
    }
  }

  function update() {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x <= 0 || n.x >= W) n.vx *= -1;
      if (n.y <= 0 || n.y >= H) n.vy *= -1;

      n.x = Math.max(0, Math.min(W, n.x));
      n.y = Math.max(0, Math.min(H, n.y));
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // draw connecting lines first (so dots sit on top)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < LINE_DIST) {
          const alpha = 1 - dist / LINE_DIST;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // draw small dots
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = DOT_COLOR;
      ctx.fill();
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  initNodes();
  loop();

// header scrolling

window.addEventListener("scroll", function () {

    const header = document.getElementById("mainHeader");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});



document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("mainHeader");
    const navbarContent = document.getElementById("navbarContent");
    const toggleButton = document.querySelector(".navbar-toggler");



    /* =========================
       MOBILE MENU TOGGLE
    ========================= */

    toggleButton.addEventListener("click", function () {

        navbarContent.classList.toggle("show");

        const isOpen = navbarContent.classList.contains("show");

        toggleButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });



    /* =========================
       CLOSE MENU AFTER LINK CLICK
    ========================= */

    const navLinks = document.querySelectorAll(
        "#navbarContent .nav-link, #navbarContent .hire-btn"
    );


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            // Only close on mobile
            if (window.innerWidth <= 991) {

                navbarContent.classList.remove("show");

                toggleButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });



    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    function handleScroll() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll
    );


    // Run once when page loads
    handleScroll();



    /* =========================
       RESIZE FIX
    ========================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 991) {

            navbarContent.classList.remove("show");

            toggleButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});



// hero section script
 const headings = [
    "E-commerce Website",
    "Bussines Website",
    "Bloging Website",
    "Modern Design",
    "Responsive Design"
  ];

  let index = 0;

  setInterval(() => {
    index = (index + 1) % headings.length;
    document.getElementById("changingHeading").textContent = headings[index];
  }, 1000); // changes every 2 seconds







/* =========================
   ABOUT BAR ANIMATION
========================= */

 const aboutBox = document.getElementById("aboutBox");

        const observer = new IntersectionObserver(
            function(entries) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {

                        aboutBox.classList.add("show");

                    }

                });

            },
            {
                threshold: 0.2
            }
        );

        observer.observe(aboutBox);


        /* Profile image mouse movement */

        const profile = document.querySelector(".profile-wrapper");

        document.addEventListener("mousemove", function(e) {

            if (window.innerWidth > 767) {

                const x = (window.innerWidth / 2 - e.clientX) / 80;
                const y = (window.innerHeight / 2 - e.clientY) / 80;

                profile.style.transform =
                    `translate(${x}px, ${y}px)`;

            }

        });




/* =========================
   SKILL BAR ANIMATION
========================= */

const skillBars = document.querySelectorAll(".skill-bar span");

const skillObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                skillBars.forEach(function(bar) {

                    const width = bar.getAttribute("data-width");

                    bar.style.width = width;

                });

                skillObserver.disconnect();

            }

        });

    },
    {
        threshold: 0.2
    }
);

const skillsSection = document.querySelector("#skills");

skillObserver.observe(skillsSection);


// ================= CONTACT FORM =================

/* =====================================================
   CONTACT FORM JAVASCRIPT
===================================================== */

const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get form values

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    // Check name

    if (name === "") {

        alert("Please enter your name.");

        return;
    }


    // Check email

    if (email === "") {

        alert("Please enter your email address.");

        return;
    }


    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;
    }


    // Check subject

    if (subject === "") {

        alert("Please enter a subject.");

        return;
    }


    // Check message

    if (message === "") {

        alert("Please enter your message.");

        return;
    }


    // Show success message

    successMessage.style.display = "block";


    // Reset form

    contactForm.reset();


    // Hide success message

    setTimeout(function () {

        successMessage.style.display = "none";

    }, 5000);

});