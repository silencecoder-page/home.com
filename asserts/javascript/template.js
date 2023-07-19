// HEADER
class silenceNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <nav class="main_nav">
          <div class="nav_container nav_container_layout">
            <div class="nav_logo">
                <span class="logo_text">silence<span class="nav_text_dot">.</span><span class="nav_text_highlight">coder</span></span>
            </div>
            <div class="nav_items_box">
                <div class="nav_items_box_layout">
                  <ul class="nav_list_contanier">
                    <li class="nav_item"><a href="/index.html">Home</a></li>
                    <li class="nav_item"><a href="/pages/portfolio-main.html">portfolio</a></li>
                    <li class="nav_item"><a href="/pages/blog-main.html">Blog</a></li>
                    <li class="nav_item"><a href="/index.html#about">About</a></li>
                    <li class="nav_item"><a href="/index.html#contact">Contact</a></li>
                  </ul>
                  <!-- NAV CLOSE -->
                  <img id="munuClose" class="navButton" src="/main-icons/close_FILL0_wght400_GRAD0_opsz48.svg" alt="" srcset="">
                </div>
            </div>
            <!-- Nav Button -->
            <img id="munuOpen" class="navButton" src="/main-icons/menu_FILL0_wght400_GRAD0_opsz48.svg" alt="" srcset="">
          </div>
        </nav>
        `;
  }
}

// FOOTER
class silenceFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer id="base_footer">
        <div class="copyright">&copy by Michael Bright Amoah</div>
        <div class="socail_footer_links">
        <div class="defaultWhiteButton link_button socail_footer_link_item"><a href="">Github</a></div>
        <div class="defaultWhiteButton link_button socail_footer_link_item"><a href="">Discord</a></div>
        <div class="defaultWhiteButton link_button socail_footer_link_item"><a href="">Facebook</a></div>
        <div class="defaultWhiteButton link_button socail_footer_link_item"><a href="#hero">Home</a></div>
      </div>
        </footer>
        `;
  }
}
customElements.define("silence-nav", silenceNav);
customElements.define("silence-footer", silenceFooter);

// Template Setting
const $munuOpen = $("#munuOpen");
const $munuClose = $("#munuClose");

$munuOpen.on("click", function () {
  console.log("clicked");
  $(".nav_items_box").show(500);
});

$munuClose.on("click", function () {
  console.log("clicked");
  $(".nav_items_box").hide(500);
});

$(window).on("resize", () => {
  if (window.innerWidth >= 770) {
    $(".nav_items_box").show(500);
  } else if (window.innerWidth < 770) {
    $(".nav_items_box").hide();
  }
});
