const formLink = document.getElementById("link-form");
const input = document.getElementById("link-input");
const error = document.getElementById("err-msg");
const linksContainer = document.querySelector(".links-container");
const copy = document.querySelector(".copy");
const menubtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

const navToggle = function () {
  menubtn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");
};

//Validate url(str)
const validateUrl = function (str) {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
};

//Code to add radom string value;
function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

//generating  Shortly Links
const formSubmit = function (e) {
  e.preventDefault();
  if (input.value === "") {
    error.innerText = "Please enter something";
    input.classList.add("border-red");
    input.value = "";
  } else if (!validateUrl(input.value)) {
    error.innerText = "Please enter a valid URL";
    input.classList.add("border-red");
    input.value = "";
  } else {
    const linkContainerHtml = ` <div
    class="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:rounded-full md:flex-row"
  >
    <p class="font-bold text-center text-veryDarkViolet md:text-left">
      ${input.value}
    </p>
    <div
      class="flex flex-col items-centerjustify-end md:flex-row space-x-4 items-center md:space-y-0"
    >
      <div class="font-bold text-cyan">https://rel.ink/${makeid(5)}</div>
      <button
    href="#"
    class="copy p-2 px-8 text-white bg-gradient-to-tr from-cyan to-cyanLight rounded-full hover:opacity-70"
  >
    copy
  </button>
    </div>
  </div>`;

    linksContainer.insertAdjacentHTML("afterbegin", linkContainerHtml);
    input.classList.remove("border-red");
    input.value = "";
  }
};

//Copying links

formLink.addEventListener("submit", formSubmit);

linksContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    const shortlink = e.target.previousElementSibling.innerText;
    navigator.clipboard
      .writeText(shortlink)
      .then(() => alert("Text copied to clipboard"))
      .catch((error) => alert("Failed to copy text", error));
  }
});

//navgation mobile menu
menubtn.addEventListener("click", navToggle);
