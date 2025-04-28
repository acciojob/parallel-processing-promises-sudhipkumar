//your JS code here. If required.
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Main function to download all images
function downloadImages() {
  // Show loading spinner
  loading.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

  const downloadPromises = images.map(imageObj => downloadImage(imageObj.url));

  Promise.all(downloadPromises)
    .then(loadedImages => {
      // Hide loading spinner
      loading.style.display = "none";

      // Append each loaded image to the output div
      loadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(errorMsg => {
      // Hide loading spinner
      loading.style.display = "none";

      // Show error message
      errorDiv.textContent = errorMsg;
    });
}

// Attach click event to button
btn.addEventListener("click", downloadImages);