(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
      $(".navbar").addClass("sticky-top");
    } else {
      $(".navbar").removeClass("sticky-top");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Date and time picker
  $(".date").datetimepicker({
    format: "L",
  });
  $(".time").datetimepicker({
    format: "LT",
  });

  // Image comparison
  $(".twentytwenty-container").twentytwenty({});

  // Price carousel
  $(".price-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    margin: 45,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });
})(jQuery);

const blogPosts = [
  {
    title:
      "Empowering Communities Through Health and Education - January 2024 Outreach in North Dayi",
    date: "15 Jan, 2024",
    author: "MediMigrant Team",
    image: "images/blog-post-1.png", // main image
    images: [
      "images/blog-post-1.png",
      "images/blog-post-1b.png",
      "images/blog-post-1c.png",
      "images/blog-post-1d.png",
    ],
    alt: "Healthcare access for migrants",
    excerpt:
      "In January 2024, MediMigrant Compass e.V Deutschland, in collaboration with the MyHealth MyAfrica Outreach Team - Ghana, held their annual healthcare outreach in Tsrukpe-Tota, located in the North Dayi Constituency.",
    link: "/news/annual-healthcare-outreach-tsrukpe-tota.html",
  },
  {
    title:
      "Empowering Rural Health: First Aid Volunteer Training in North Dayi",
    date: "10 Jan, 2024",
    author: "MediMigrant Team",
    image: "images/blog-post-2.png", // main image
    images: [
      "images/blog-post-2e.png",
      "images/blog-post-2b.png",
      "images/blog-post-2c.png",
      "images/blog-post-2d.png",
    ],
    alt: "Career mentoring for migrants",
    excerpt:
      "Since 2019, MediMigrant Compass e.V Deutschland, in partnership with EuroAfric Therapy Tour - Deutschland, has been actively supporting underserved communities in Ghana's North Dayi Constituency through targeted healthcare interventions.",
    link: "/news/empowering-rural-health-north-dayi.html",
  },
];

// Helper: detect if we're in a subdirectory (like /news/)
const basePath = window.location.pathname.includes("/news/") ? "../" : "";

// === BLOG GRID (Home or Blog List Page) ===
const blogContainer = document.getElementById("blog-container");

if (blogContainer) {
  blogContainer.innerHTML = blogPosts
    .map(
      (post) => `
        <div class="col-lg-4">
          <div class="blog-item bg-light rounded overflow-hidden h-100 clickable-card"
               onclick="window.location.href='${post.link}'"
               style="cursor:pointer; transition: all 0.3s ease;">
            <div class="blog-img position-relative overflow-hidden">
              <img class="img-fluid" src="${basePath + post.image}" alt="${
        post.alt
      }" />
            </div>
            <div class="p-4">
              <div class="d-flex mb-3">
                <small class="me-3">
                  <i class="far fa-user text-primary me-2"></i>${post.author}
                </small>
                <small>
                  <i class="far fa-calendar-alt text-primary me-2"></i>${
                    post.date
                  }
                </small>
              </div>
              <h4 class="mb-3">${post.title}</h4>
              <p>${post.excerpt}</p>
              <span class="text-uppercase text-primary fw-bold">
                Read More <i class="bi bi-arrow-right"></i>
              </span>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  // Add hover effect only if cards exist
  document.querySelectorAll(".clickable-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });
}

// === SIDEBAR (Recent Posts) ===
document.addEventListener("DOMContentLoaded", () => {
  const recentContainer = document.getElementById("recent-posts");
  if (!recentContainer || !blogPosts) return;

  // Sort by latest date
  const sortedPosts = blogPosts.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  sortedPosts.slice(0, 3).forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.className =
      "d-flex mb-3 pb-3" + (index < 2 ? " border-bottom" : "");
    postDiv.innerHTML = `
      <img
        src="${basePath + post.image}"
        alt="${post.title}"
        class="img-fluid rounded"
        style="width: 80px; height: 80px; object-fit: cover"
      />
      <div class="ps-3">
        <a href="${post.link}" class="text-dark text-decoration-none">
          <h6 class="mb-1">${post.title}</h6>
        </a>
        <small class="text-muted">
          <i class="far fa-calendar-alt me-1"></i>${post.date}
        </small>
      </div>
    `;
    recentContainer.appendChild(postDiv);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("image-gallery");
  if (!galleryContainer) return;

  // Get current path (e.g. /news/annual-healthcare-outreach-tsrukpe-tota.html)
  const currentPath = window.location.pathname;

  // Find matching blog post
  const currentPost = blogPosts.find((post) => currentPath.endsWith(post.link));

  if (currentPost && currentPost.images && currentPost.images.length > 1) {
    currentPost.images.forEach((imgSrc, index) => {
      const imgDiv = document.createElement("div");
      imgDiv.className = "col-md-4 col-sm-6";
      imgDiv.innerHTML = `
        <img
          src="../${imgSrc}"
          alt="${currentPost.alt} ${index + 1}"
          class="img-fluid rounded shadow-sm"
          style="object-fit: cover; height: 200px; width: 100%;"
        />
      `;
      galleryContainer.appendChild(imgDiv);
    });
  }
});
