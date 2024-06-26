const imageContainer = document.getElementById("image-container");

const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
totalImages = 0;
let photosArray = [];

// unslash api
const count = 30;
// const apiKey = "2UTfaknQqv9b1Hf8H4YgfKFRGyQ6_HUNN0qydJoj9BE";
const apiKey = "cQT4N4ybthPG5m4RXJhJ5MsuKj2XE7MO_e0U5bto_Ew";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true
  }
}

// create els for links and photos, add to dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // create <a>
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);

    // // or just
    // const item_a = `
    //     <a href="${photo.links.regular} target="_blank">
    //         <img src="${photo.urls.regular} alt="${photo.alt_description}" title="${photo.alt_description}" />
    //     </a>
    //     `
    // imageContainer.appendChild(item_a)
  });
}

//get photos for api]
async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (err) {}
}

// eventlistener for scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
