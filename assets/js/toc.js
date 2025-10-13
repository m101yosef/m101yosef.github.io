// assets/js/toc.js
document.addEventListener('DOMContentLoaded', function () {
  
  // --- NEW: Force all nested sections to be closed on page load ---
  // This will override any theme scripts that might be opening them by default.
  const allNestedLists = document.querySelectorAll('.hb-toc ul ul');
  allNestedLists.forEach(list => {
    // 1. Add the 'hidden' class to the nested list itself.
    list.classList.add('hidden');
    
    // 2. Find the parent <li> element that controls this list.
    const parentLi = list.previousElementSibling;
    if (parentLi && parentLi.tagName === 'LI') {
      // 3. Ensure the parent does NOT have the 'open' class for correct icon state.
      parentLi.classList.remove('open');
    }
  });
  // --- END of new section ---


  // --- This is the original code to handle the click-to-toggle behaviour ---
  const toggleButtons = document.querySelectorAll('[data-hb-toc-toggle]');

  toggleButtons.forEach(button => {
    button.addEventListener('click', function () {
      const parentLi = this.closest('li');
      const siblingUl = parentLi.nextElementSibling;

      if (parentLi && siblingUl && siblingUl.tagName === 'UL') {
        parentLi.classList.toggle('open');
        siblingUl.classList.toggle('hidden');
      }
    });
  });

});