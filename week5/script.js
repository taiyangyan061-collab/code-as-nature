const button = document.getElementById("generate-button");

const memeText = document.getElementById("meme-text");

const memeImage = document.getElementById("meme-image");

const saveButton = document.getElementById("save-button");

const supabaseClient = supabase.createClient(

  "https://uspxokoxzbajirtyhtjv.supabase.co",

  "sb_publishable_QfPcMD4M9fWHFAL5oHRznA_7g7g-v5Y"

);

// Only attach buttons if they exist

if (button) {

  button.addEventListener("click", generateMeme);

}

if (saveButton) {

  saveButton.addEventListener("click", saveMeme);

}

function generateMeme() {

  // Get text

  fetch("https://corporatebs-generator.sameerkumar.website/?" + Date.now())

    .then(response => response.json())

    .then(data => {

      memeText.textContent = data.phrase;

    })

    .catch(error => console.error("Text loading failed:", error));

  // Get image

  fetch("https://yesno.wtf/api?" + Date.now())

    .then(response => response.json())

    .then(data => {

      memeImage.src = data.image;

    })

    .catch(error => console.error("Image loading failed:", error));

}

async function saveMeme() {

  const { error } = await supabaseClient

    .from("memes")

    .insert({

      image_url: memeImage.src,

      meme_text: memeText.textContent

    });

  if (error) {

    console.error("Could not save meme:", error);

  } else {

    console.log("Meme saved!");

  }

}

// Automatically generate a meme ONLY on the homepage preview

if (window.previewMode === true) {

  generateMeme();

}