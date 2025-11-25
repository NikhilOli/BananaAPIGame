
//  mobile toggle + safe auth button updater
(function () {
    // Mobile menu toggle (works without Firebase)
    const btn = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    if (btn && mobileMenu) {
        btn.addEventListener("click", () => {
        const visible = mobileMenu.getAttribute("data-visible") === "true";
        if (visible) {
            mobileMenu.setAttribute("data-visible", "false");
            mobileMenu.style.display = "none";
        } else {
            mobileMenu.setAttribute("data-visible", "true");
            mobileMenu.style.display = "flex";
        }
        });
        // close on click outside (optional)
        document.addEventListener("click", (ev) => {
        if (!mobileMenu || !btn) return;
        if (!mobileMenu.contains(ev.target) && !btn.contains(ev.target)) {
            mobileMenu.setAttribute("data-visible", "false");
            mobileMenu.style.display = "none";
        }
        });
    }

    // Auth-aware button update (works only if firebase exists)
    function setSignedInUI(uidOrName) {
        const navAuthBtn = document.getElementById("navAuthBtn");
        const mobileAuthBtn = document.getElementById("mobileAuthBtn");
        if (navAuthBtn) {
        navAuthBtn.textContent = "Sign out";
        navAuthBtn.href = "#";
        navAuthBtn.onclick = async (ev) => {
            ev.preventDefault();
            if (window.firebase && firebase.auth) {
            await firebase.auth().signOut();
            location.reload();
            }
        };
        }
        if (mobileAuthBtn) {
        mobileAuthBtn.textContent = "Sign out";
        mobileAuthBtn.href = "#";
        mobileAuthBtn.onclick = navAuthBtn.onclick;
        }
    }
    function setSignedOutUI() {
        const navAuthBtn = document.getElementById("navAuthBtn");
        const mobileAuthBtn = document.getElementById("mobileAuthBtn");
        if (navAuthBtn) {
        navAuthBtn.textContent = "Sign in";
        navAuthBtn.href = "login.html";
        navAuthBtn.onclick = null;
        }
        if (mobileAuthBtn) {
        mobileAuthBtn.textContent = "Sign in";
        mobileAuthBtn.href = "login.html";
        mobileAuthBtn.onclick = null;
        }
    }

    // If firebase is loaded, attach listener. If not, leave default sign-in links.
    if (window.firebase && firebase.auth) {
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setSignedInUI(user.displayName || user.email || user.uid);
        } else {
            setSignedOutUI();
        }
        });
    } else {
        // No firebase => ensure default state (signed out)
        setSignedOutUI();
    }
})();
