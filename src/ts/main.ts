let currentPage = 0;
const pages = document.querySelectorAll(".page");


function scrollToPage(index: number) {
  pages.forEach((page, i) => {
    if (i === index) {
      page.scrollIntoView({ behavior: 'smooth' });
    }
  });
}


function handleKeyDown(event: KeyboardEvent) {
  if (event.key == 'ArrowDown' || event.key == ' ') {
    event.preventDefault();
    currentPage = Math.min(currentPage + 1, pages.length - 1);
    scrollToPage(currentPage);
  } else if (event.key == 'ArrowUp') {
    event.preventDefault();
    currentPage = Math.max(currentPage - 1, 0);
    scrollToPage(currentPage);
  }
}


document.addEventListener('keydown', handleKeyDown);
