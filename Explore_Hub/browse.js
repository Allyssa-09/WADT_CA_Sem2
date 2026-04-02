/*  Browse Page (browse.js) */

/* Supabase connection details */
var SUPABASE_URL = "https://jyckleksyebexyuidvku.supabase.co";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5Y2tsZWtzeWViZXh5dWlkdmt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MjUxOTYsImV4cCI6MjA4ODIwMTE5Nn0.bQNuZzN019BEu8siqNwuXFzvzPa4UWaSlmfNEZSlglQ";

/* Keep track of which category is selected */
var activeCategory = "all";

/* SET CATEGORY
   When user clicks a category tab */
function setCategory(category, button) {
  activeCategory = category;
  var allTabs = document.querySelectorAll(".tab");
  for (var i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove("active");
  }
  button.classList.add("active");
  filterCards();
}

/* FILTER CARDS
   Runs every time user types or changes a filter */
function filterCards() {
  var searchText = document.getElementById("searchInput").value.toLowerCase();
  var selectedCountry = document.getElementById("countryFilter").value.toLowerCase();
  var selectedStatus = document.getElementById("statusFilter").value.toLowerCase();
  var allCards = document.querySelectorAll(".card");
  var visibleCount = 0;

  for (var i = 0; i < allCards.length; i++) {
    var card = allCards[i];
    var cardName = card.querySelector("h3").textContent.toLowerCase();
    var cardCountry = card.getAttribute("data-country");
    var cardStatus = card.getAttribute("data-status");
    var cardCategory = card.getAttribute("data-category");

    var matchSearch = cardName.includes(searchText) || cardCountry.includes(searchText);
    var matchCountry = selectedCountry === "" || cardCountry === selectedCountry;
    var matchStatus = selectedStatus === "" || cardStatus === selectedStatus;
    var matchCategory = activeCategory === "all" || cardCategory === activeCategory;

    if (matchSearch && matchCountry && matchStatus && matchCategory) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  }

  if (visibleCount === 1) {
    document.getElementById("resultsCount").textContent = "Showing 1 destination";
  } else {
    document.getElementById("resultsCount").textContent = "Showing " + visibleCount + " destinations";
  }
}

/* DELETE CARD
   Removes the card from the page
   AND deletes it from Supabase database */
async function deleteCard(button) {

  /* Ask the user to confirm before deleting */
  var confirmed = confirm("Are you sure you want to delete this destination?");

  if (confirmed) {

    /* Get the card element */
    var card = button.closest(".card");

    /* Get the destination ID stored on the card */
    var destId = card.getAttribute("data-id");

    /* Send DELETE request to Supabase */
    var response = await fetch(SUPABASE_URL + "/rest/v1/destinations?dest_id=eq." + destId, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY
      }
    });

    /* If delete worked */
    if (response.ok) {
      card.remove();
      filterCards();
      alert("Destination deleted successfully!");
    } else {
      alert("Something went wrong. Please try again.");
    }
  }
}

/* TOGGLE HEART
   When user clicks the heart button */
function toggleHeart(button) {
  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
    button.textContent = "♡";
  } else {
    button.classList.add("liked");
    button.textContent = "♥";
  }
}