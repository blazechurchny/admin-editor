/* =========================================================
   BLAZE ADMIN
   SIDEBAR CONFIG

   ADD PAGE:
   Copy one object.

   DELETE PAGE:
   Delete the object.

   REORDER PAGE:
   Move the object.

   That's it.
========================================================= */


const adminPages = [

  {
    id: "dashboard",
    name: "Dashboard",
    icon: "fa-solid fa-house",
    description: "Everything happening at Blaze."
  },

  {
    id: "website",
    name: "Website",
    icon: "fa-solid fa-globe",
    description: "Manage the Blaze Church website."
  },

  {
    id: "sermons",
    name: "Sermons",
    icon: "fa-solid fa-play",
    description: "Manage sermons and service content."
  },

  {
    id: "events",
    name: "Events",
    icon: "fa-solid fa-calendar",
    description: "Manage events and announcements."
  },

  {
    id: "media",
    name: "Media",
    icon: "fa-solid fa-images",
    description: "Manage images, graphics and media."
  },

  {
    id: "people",
    name: "People",
    icon: "fa-solid fa-users",
    description: "Manage users and team members."
  },

  {
    id: "settings",
    name: "Settings",
    icon: "fa-solid fa-gear",
    description: "Configure Blaze Admin."
  }

];



/* =========================================================
   ELEMENTS
========================================================= */

const sidebarNav =
  document.getElementById("sidebarNav");

const sidebar =
  document.getElementById("sidebar");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");

const mobileMenu =
  document.getElementById("mobileMenu");

const mobileClose =
  document.getElementById("mobileClose");

const pageTitle =
  document.getElementById("pageTitle");

const pageDescription =
  document.getElementById("pageDescription");



/* =========================================================
   BUILD SIDEBAR
========================================================= */

function buildSidebar() {

  sidebarNav.innerHTML = "";

  adminPages.forEach(page => {

    const button =
      document.createElement("button");

    button.className = "nav-item";

    button.dataset.page = page.id;

    button.innerHTML = `
      <i class="${page.icon}"></i>

      <span>
        ${page.name}
      </span>
    `;

    button.addEventListener(
      "click",
      () => openPage(page.id)
    );

    sidebarNav.appendChild(button);

  });

}



buildSidebar();



/* =========================================================
   OPEN PAGE
========================================================= */

function openPage(pageId) {

  const pageConfig =
    adminPages.find(
      page => page.id === pageId
    );

  if (!pageConfig) {
    return;
  }



  /* Hide all pages */

  document
    .querySelectorAll(".page")
    .forEach(page => {

      page.classList.remove("active");

    });



  /* Show selected page */

  const selectedPage =
    document.getElementById(
      `${pageId}Page`
    );

  if (selectedPage) {

    selectedPage.classList.add("active");

  }



  /* Update sidebar */

  document
    .querySelectorAll(".nav-item")
    .forEach(item => {

      item.classList.toggle(
        "active",
        item.dataset.page === pageId
      );

    });



  /* Update heading */

  pageTitle.textContent =
    pageConfig.name;

  pageDescription.textContent =
    pageConfig.description;



  /* Save URL */

  history.replaceState(
    null,
    "",
    `#${pageId}`
  );



  /* Close mobile sidebar */

  closeSidebar();

}



/* =========================================================
   QUICK ACTION CARDS
========================================================= */

document
  .querySelectorAll(".quick-card")
  .forEach(card => {

    card.addEventListener(
      "click",
      () => {

        openPage(
          card.dataset.page
        );

      }
    );

  });



/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function openSidebar() {

  sidebar.classList.add("open");

  sidebarOverlay.classList.add("open");

  document.body.style.overflow =
    "hidden";

}



function closeSidebar() {

  sidebar.classList.remove("open");

  sidebarOverlay.classList.remove("open");

  document.body.style.overflow =
    "";

}



mobileMenu.addEventListener(
  "click",
  openSidebar
);


mobileClose.addEventListener(
  "click",
  closeSidebar
);


sidebarOverlay.addEventListener(
  "click",
  closeSidebar
);



/* =========================================================
   INITIAL PAGE
========================================================= */

let initialPage =
  window.location.hash.replace("#", "");

if (
  !adminPages.some(
    page => page.id === initialPage
  )
) {

  initialPage =
    "dashboard";

}

openPage(initialPage);
