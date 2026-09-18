export default async function () {
  document.addEventListener("DOMContentLoaded", initEruda);

  function initEruda() {
    if (!window.eruda) return setTimeout(initEruda);
    eruda.init({
      tool: ["console", "elements", "network", "resources", "sources", "info", "snippets"],
      console: {
        // Console-specific settings
        // Example: change the default level of logs
        level: "log", // 'log', 'info', 'warn', 'error'
      },
    });
  }
}
