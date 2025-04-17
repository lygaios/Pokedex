/**
 * Utility functions for the website
 * @param {string} url - The URL to check
 * @returns {boolean} - Returns true if the URL is external, false otherwise
 * This function sets the target and rel attributes for external links
 * to open in a new tab and prevent security vulnerabilities.
 */

function addAttributesToExternalLinks() {
  const externalLinks = document.querySelectorAll("a.external-link");

  externalLinks.forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer nofollow");
  });
}
