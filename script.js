 particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5 },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 6 }
            },
            interactivity: {
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
                modes: { repulse: { distance: 200 } }
            },
            retina_detect: true
        });

        // Smooth scrolling with offset
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                const offset = 100; // Adjust this value as needed
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            });
        });
        // JavaScript to toggle the nav menu on click
        const menuIcon = document.getElementById('menu-icon');
        const nav = document.querySelector('nav');

        menuIcon.addEventListener('click', () => {
            nav.classList.toggle('active'); // إضافة/إزالة الكلاس active عند الضغط
        });





        
        const slides = document.querySelector('.slides');
        const slideCount = document.querySelectorAll('.slide').length;
        let currentIndex = 0;

        function showNextSlide() {
            currentIndex = (currentIndex + 1) % slideCount; // ينتقل إلى الصورة التالية بشكل دائري
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        setInterval(showNextSlide, 3000); // تغيير الصورة كل 10 ثوانٍ