var button = document.getElementById("menu-button");
var menu = document.getElementById("menu");

button.addEventListener("click", function () {
  menu.classList.toggle("show");
});

/* ===== TASK 3 ===== */
/* product.html also loads this file but has no grid, so we check first */
const grid = document.getElementById("grid");

if (grid) {
  const searchBox = document.getElementById("search");
  const sortButton = document.getElementById("sort-btn");
  const message = document.getElementById("no-results");
  const radios = document.querySelectorAll('input[name="cat"]');
  let lowToHigh = true;

  /* "Rs. 2,500" -> 2500 (remove everything that is not a digit) */
  function getPrice(card) {
    const text = card.querySelector("p").textContent;
    return parseInt(text.replace(/[^0-9]/g, ""));
  }

  /* show a card only if it matches BOTH the search text and the category */
  function applyFilters() {
    const text = searchBox.value.toLowerCase();
    const category = document.querySelector('input[name="cat"]:checked').value;
    let shown = 0;

    grid.querySelectorAll(".col").forEach(function (card) {
      const name = card.querySelector("h5").textContent.toLowerCase();
      const nameOk = name.includes(text);
      const categoryOk = category === "all" || card.dataset.cat === category;

      if (nameOk && categoryOk) {
        card.style.display = "";
        shown++;
      } else {
        card.style.display = "none";
      }
    });

    /* nothing matched: hide the grid, show the message */
    if (shown === 0) {
      grid.style.display = "none";
      message.style.display = "block";
    } else {
      grid.style.display = "";
      message.style.display = "none";
    }
  }

  /* run the filter when typing or when a radio is changed */
  searchBox.addEventListener("input", applyFilters);

  radios.forEach(function (radio) {
    radio.addEventListener("change", applyFilters);
  });

  /* sort button: low to high, then high to low, and so on */
  sortButton.addEventListener("click", function () {
    const cards = Array.from(grid.querySelectorAll(".col"));

    cards.sort(function (a, b) {
      if (lowToHigh) {
        return getPrice(a) - getPrice(b);
      } else {
        return getPrice(b) - getPrice(a);
      }
    });

    /* appendChild moves each existing card to the end, in sorted order */
    cards.forEach(function (card) {
      grid.appendChild(card);
    });

    lowToHigh = !lowToHigh;
  });

  /* Premium label for price > N x 100 = 37 x 100 = 3700 */
  grid.querySelectorAll(".col").forEach(function (card) {
    if (getPrice(card) > 3700) {
      const label = document.createElement("span");
      label.textContent = "Premium";
      label.className = "badge bg-warning text-dark";
      card.querySelector(".card-body").prepend(label);
    }
  });
}