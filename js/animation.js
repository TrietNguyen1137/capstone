/* ==========================================================================
   Scroll reveal animations
   1) Auto-tags the key elements of each section with a reveal class
      (so you don't have to hand-edit every section's HTML).
   2) Uses IntersectionObserver to add `.is-visible` once an element
      scrolls into view, which triggers the CSS transition in animation.css.
   3) Staggers siblings (cards, list items, etc.) with a small delay each.
   ========================================================================== */

(function () {
    "use strict";

    // Map of "selector" -> "reveal variant class" for elements we want to animate.
    // Groups of repeated items (cards, columns, etc.) are staggered automatically.
    const revealGroups = [
        // Banner
        { selector: ".banner .text", variant: "reveal" },
        { selector: ".banner .left-pic", variant: "reveal--left" },
        { selector: ".banner .right-pic", variant: "reveal--right" },
        { selector: ".banner .bottom-pic", variant: "reveal--zoom" },

        // Number / counter
        { selector: ".number-left", variant: "reveal--left" },
        { selector: ".number-right .card", variant: "reveal--right", stagger: true },

        // About Us
        { selector: ".aboutUs-left", variant: "reveal--left" },
        { selector: ".aboutUs-right", variant: "reveal--right" },

        // Programs
        { selector: ".programs .title", variant: "reveal" },
        { selector: ".programs-card-layout .card-content", variant: "reveal", stagger: true },

        // Portfolio
        { selector: ".portfolio .title", variant: "reveal" },
        { selector: ".portfolio-content .nav-tabs", variant: "reveal" },
        { selector: ".tab-pane.active .pic-layout", variant: "reveal--zoom", stagger: true },

        // Service
        { selector: ".service-left", variant: "reveal--left" },
        { selector: ".service-right-bg", variant: "reveal--right" },

        // FAQ
        { selector: ".faq img", variant: "reveal--left" },
        { selector: ".faq .title", variant: "reveal--right" },
        { selector: ".faq-accordion .accordion-item", variant: "reveal--right", stagger: true },

        // Team
        { selector: ".team .title", variant: "reveal" },
        { selector: ".team-card", variant: "reveal--zoom", stagger: true },

        // Student age
        { selector: ".age-section .col-lg-5 > *", variant: "reveal--left", stagger: true },
        { selector: ".age-box", variant: "reveal--zoom", stagger: true },

        // Testimonial
        { selector: ".testimonial .title", variant: "reveal" },
        { selector: ".testimonial-wrap", variant: "reveal--zoom" },

        // Blog
        { selector: ".blog .title", variant: "reveal" },
        { selector: ".blog-card", variant: "reveal", stagger: true },

        // Newsletter
        { selector: ".newsletter-img-wrap", variant: "reveal--left" },
        { selector: ".newsletter-text", variant: "reveal--right" },

        // Footer
        { selector: ".site-footer .row > div", variant: "reveal", stagger: true },
        { selector: ".footer-bottom", variant: "reveal" },
    ];

    const STAGGER_STEP_MS = 120;

    function tagElements() {
        revealGroups.forEach(function (group) {
            const els = document.querySelectorAll(group.selector);
            els.forEach(function (el, index) {
                el.classList.add(group.variant);
                if (group.stagger && index > 0) {
                    el.setAttribute("data-reveal-delay", index * STAGGER_STEP_MS);
                }
            });
        });
    }

    function initObserver() {
        const elements = document.querySelectorAll(
            ".reveal, .reveal--left, .reveal--right, .reveal--zoom"
        );

        // If the browser doesn't support IntersectionObserver, just show everything.
        if (!("IntersectionObserver" in window)) {
            elements.forEach(function (el) {
                el.classList.add("is-visible");
            });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const delay = el.getAttribute("data-reveal-delay");

                        if (delay) {
                            el.style.transitionDelay = delay + "ms";
                        }

                        el.classList.add("is-visible");
                        obs.unobserve(el); // reveal once, don't re-trigger on scroll back up
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        tagElements();
        initObserver();
    });
})();