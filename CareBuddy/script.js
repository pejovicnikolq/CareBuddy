/**
 * CAREBUDDY MAIN SCRIPT
 * Sadrži: Loader, Hero animacije, Intersection Observers, Modal i Burger logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SELEKTORI ---
  const overlay = document.querySelector(".modal-overlay");
  const closeBtn = document.querySelector(".modal-close-btn");
  const burger = document.getElementById("burger-menu");
  const nav = document.getElementById("nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");
  const allBtns = document.querySelectorAll(".btn");

  // --- 2. MODAL LOGIKA ---
  const toggleModal = (show) => {
    if (!overlay) return;
    overlay.classList.toggle("modal-active", show);
    document.body.style.overflow = show ? "hidden" : ""; // Onemogući skrolovanje kad je modal otvoren
  };

  if (overlay) {
    allBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const href = btn.getAttribute("href");

        // Ako dugme vodi na internu sekciju (npr. #kontakt), nemoj otvarati modal
        if (href && href.startsWith("#") && href.length > 1) {
          // Dozvoli prirodno skrolovanje do sekcije
          return;
        }

        // Za sva ostala dugmad otvori modal
        e.preventDefault();
        e.stopPropagation();
        toggleModal(true);
      });
    });

    // Zatvaranje na X
    closeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      toggleModal(false);
    });

    // Zatvaranje klikom na zatamnjenu pozadinu
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) toggleModal(false);
    });
  }

  // --- 3. BURGER MENU LOGIKA ---
  if (burger && nav) {
    const toggleNav = () => {
      burger.classList.toggle("active");
      nav.classList.toggle("active");
      document.body.style.overflow = nav.classList.contains("active")
        ? "hidden"
        : "";
    };

    burger.addEventListener("click", toggleNav);

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("active");
        nav.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // --- 4. INTERSECTION OBSERVERS (Animacije na skrol) ---
  const observerOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

  // A) Naslovi sekcija
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("naslov-active");
        headerObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document
    .querySelectorAll(".naslov")
    .forEach((el) => headerObserver.observe(el));

  // B) Problem sekcije (Levo/Desno animacija)
  const problemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const left = entry.target.querySelector(".left-problem");
        const right = entry.target.querySelector(".right-problem");
        if (left) left.classList.add("element-appear");
        setTimeout(() => right?.classList.add("element-appear"), 200);
        problemObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document
    .querySelectorAll(".problem")
    .forEach((p) => problemObserver.observe(p));

  // C) Kontakt pilule
  const pillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const mail = entry.target.querySelector(".contact-mail");
          const phone = entry.target.querySelector(".contact-phone");
          if (mail) mail.classList.add("pill-appear");
          setTimeout(() => phone?.classList.add("pill-appear"), 200);
          pillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  const contactBox = document.querySelector(".contact-container");
  if (contactBox) pillObserver.observe(contactBox);
});

// --- 5. LOADER & HERO ANIMACIJE ---
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-wrapper");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("loader-hidden");
      startHeroAnimations();
    }, 500);
  } else {
    // Ako nema loadera, pokreni odmah
    startHeroAnimations();
  }
});

function startHeroAnimations() {
  const selectors = {
    ".hero-title h1": "animate-text",
    ".hero-p p": "animate-text",
    ".right-side img": "animate-image",
    ".hero .btn": "animate-btn",
  };

  Object.entries(selectors).forEach(([selector, className]) => {
    const el = document.querySelector(selector);
    if (el) el.classList.add(className);
  });
}
