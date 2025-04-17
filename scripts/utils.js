/**
 * Adds target and rel attributes to all links with the 'external-link' class.
 * This ensures they open in a new tab and follow security best practices.
 */

function addAttributesToExternalLinks() {
  const externalLinks = document.querySelectorAll("a.external-link");

  externalLinks.forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer nofollow");
  });
}
