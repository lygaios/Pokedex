function addAttributesToExternalLinks() {
  const externalLinks = document.querySelectorAll("a.external-link");

  externalLinks.forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer nofollow");
  });
}
