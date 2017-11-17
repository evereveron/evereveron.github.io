let categories = [
  'about-me',
  'coding',
  'creating'
];

document.addEventListener("DOMContentLoaded", function(event) {
  //click handlers for categories
  categories.forEach((category) => {
    document.getElementById(category).addEventListener('click', (e) => {
      clearActiveCategory();
      setActiveCategory(e.target.id);
    });
  });

});

// === helper functions ===
function setActiveCategory (section) {
  document.getElementById(section).classList.add('purple');
  document.getElementById(section + '-section').classList.add('active');
}

function clearActiveCategory () {
  categories.forEach((category) => {
    document.getElementById(category).classList.remove('purple');
    document.getElementById(category + '-section').classList.remove('active');
  })
}
