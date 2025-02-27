export function appLoaded<T extends (...args: unknown[]) => void>(callback: T) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === "data-loaded") {
        if (document.body.dataset.loaded === "true") {
          callback();
        }
      }
    }
  });
  observer.observe(document.body, {
    attributeFilter: ["data-loaded"],
    attributes: true,
  });
}
