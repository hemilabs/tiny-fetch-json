"use strict";

/**
 * Fetches JSON data from a URL.
 *
 * @param {string|URL|Request} resource - The resource to fetch, i.e. the URL
 * @param {RequestInit} [options] - Additional settings to apply to the request
 * @returns {Promise<any>} The response parsed as JSON
 */
async function fetchJson(resource, options = {}) {
  options.headers = { Accept: "application/json", ...options.headers };
  const res = await fetch(resource, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch JSON: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Response is not JSON");
  }

  return res.json();
}

module.exports = fetchJson;
