/* ================================
   Global variables
   ================================ */
var userName = "Guest";

function detectLoginStatus() {
    const headerLoginButton = document.getElementById('header_login_button');
    const notLoggedInLabel = document.getElementById("loginLabel");
    const loggedInLabel = document.getElementById("userDropDownBtn");
    const headerDiv = document.getElementById("header_buttons");
    var isLoggedIn = false;            // reset each check
    var loggedinName = "Guest";        // default

    // --- OLD TEMPLATE ---
    if (headerLoginButton) {
        const txt = headerLoginButton.textContent || headerLoginButton.innerText || "";
        if (txt.indexOf("Welcome") > -1) {
            loggedinName = txt.replace("Welcome", "")
                               .replace(/[\n\r\t]/g, "")
                               .replace(/\s+/g, " ")
                               .trim();
            isLoggedIn = true;
            return loggedinName;
        }
    }

    // --- NEW TEMPLATE: NOT LOGGED IN ---
    if (notLoggedInLabel) {
        const txt = (notLoggedInLabel.textContent || "").trim().toLowerCase();
        if (txt === "log in" || txt === "login") {
            isLoggedIn = false;
            return loggedinName;
        }
    }

    // --- NEW TEMPLATE: LOGGED IN ---
    if (loggedInLabel) {
        let raw = loggedInLabel.textContent || "";
        let cleaned = raw.replace(/[\n\r\t]/g, "").trim();
        loggedinName = cleaned;
        isLoggedIn = true;
        return loggedinName;
    }
    
   if (headerDiv) {
    const strongTag = headerDiv.querySelector("strong");

    if (strongTag) {
        const txt = (strongTag.textContent || "").trim();
        loggedinName = txt;
        return loggedinName;
    }
} 
}


document.addEventListener("DOMContentLoaded", function () {
  userName = detectLoginStatus();
  if (userName != "Guest" ) {
   sortedUsers = expandConcatenatedNames(fulldata) ;
  }
 });

