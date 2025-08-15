// Sample photo data with categories and alt text
const photos = [
  {
    id: 1,
    src: "1.jpg",
    alt: "Modern living room with blue sofa and minimalist decor",
    category: "Interior Design",
    type: "image",
  },
  {
    id: 2,
    src: "2.jpg",
    alt: "Dark green circular coffee table in contemporary setting",
    category: "Furniture",
    type: "image",
  },
  {
    id: 3,
    src: "3.jpg",
    alt: "Bright living room with white fireplace and modern furniture",
    category: "Interior Design",
    type: "image",
  },
  {
    id: 4,
    src: "4.jpg",
    alt: "White modern kitchen with clean lines and minimal design",
    category: "Interior Design",
    type: "image",
  },
  {
    id: 5,
    src: "5.jpg",
    alt: "Wooden dining table with modern chairs and decor",
    category: "Furniture",
    type: "image",
  },
  {
    id: 6,
    src: "6.jpg",
    alt: "Long hallway with modern lighting and clean architecture",
    category: "Interior Design",
    type: "image",
  },
  {
    id: 7,
    src: "7.jpg",
    alt: "Cozy living room with warm lighting and comfortable seating",
    category: "Interior Design",
    type: "image",
  },
  {
    id: 8,
    src: "8.jpg",
    alt: "Elegant dining room with modern chandelier and sophisticated decor",
    category: "Interior Design",
    type: "image",
  },
  {
    id: 9,
    src: "9.jpg",
    alt: "Open concept kitchen and living space with neutral tones",
    category: "Interior Design",
    type: "image",
  },
  {
    id: 10,
    src: "1.mp4",
    alt: "Interior design showcase video with modern furniture and decor",
    category: "Video",
    type: "video",
  },
]

// State variables
let searchTerm = ""
let activeFilter = "All"
let selectedImage = null

// DOM elements
const searchInput = document.getElementById("searchInput")
const photoGrid = document.getElementById("photoGrid")
const noResults = document.getElementById("noResults")
const modal = document.getElementById("modal")
const modalOverlay = document.getElementById("modalOverlay")
const modalClose = document.getElementById("modalClose")
const modalImage = document.getElementById("modalImage")
const modalVideo = document.getElementById("modalVideo")
const modalCategory = document.getElementById("modalCategory")
const modalDescription = document.getElementById("modalDescription")

// Filter photos based on search term and category
function getFilteredPhotos() {
  return photos.filter((photo) => {
    const matchesSearch = photo.alt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activeFilter === "All" ? photo.type !== "video" : photo.category === activeFilter
    return matchesSearch && matchesFilter
  })
}

// Render photo grid
function renderPhotoGrid() {
  const filteredPhotos = getFilteredPhotos()

  if (filteredPhotos.length === 0) {
    photoGrid.innerHTML = ""
    noResults.classList.remove("hidden")
    return
  }

  noResults.classList.add("hidden")

  photoGrid.innerHTML = filteredPhotos
    .map((photo) => {
      if (photo.type === "video") {
        return `
          <div class="photo-item" data-photo-id="${photo.id}">
              <img src="public/video-thumbnail.png" alt="${photo.alt}" loading="lazy">
              <div class="video-overlay">
                  <div class="video-play-button"></div>
              </div>
          </div>
        `
      } else {
        return `
          <div class="photo-item" data-photo-id="${photo.id}">
              <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
              <div class="photo-overlay"></div>
          </div>
        `
      }
    })
    .join("")

  // Add click listeners to photo items
  document.querySelectorAll(".photo-item").forEach((item) => {
    item.addEventListener("click", () => {
      const photoId = Number.parseInt(item.dataset.photoId)
      const photo = photos.find((p) => p.id === photoId)
      openModal(photo)
    })
  })
}

// Open modal with selected image
function openModal(photo) {
  selectedImage = photo

  if (photo.type === "video") {
    modalImage.classList.add("hidden")
    modalVideo.classList.remove("hidden")
    modalVideo.src = photo.src
    modalVideo.load()
  } else {
    modalVideo.classList.add("hidden")
    modalImage.classList.remove("hidden")
    modalImage.src = photo.src
    modalImage.alt = photo.alt
  }

  modalCategory.textContent = photo.category
  modalDescription.textContent = photo.alt

  modal.classList.remove("hidden")
  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

// Close modal
function closeModal() {
  modal.classList.remove("show")
  document.body.style.overflow = "auto"

  // Pause video if it's playing
  if (!modalVideo.classList.contains("hidden")) {
    modalVideo.pause()
  }
}

// Initialize the application
function init() {
  // Render initial photo grid
  renderPhotoGrid()

  // Search input event listener
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value
    renderPhotoGrid()
  })

  // Filter button event listeners
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      // Update active filter
      activeFilter = btn.dataset.filter

      // Re-render grid
      renderPhotoGrid()
    })
  })

  // Modal event listeners
  modalClose.addEventListener("click", closeModal)
  modalOverlay.addEventListener("click", closeModal)

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal()
    }
  })
}

// Start the application when DOM is loaded
document.addEventListener("DOMContentLoaded", init)
