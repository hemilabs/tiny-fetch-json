/**
 * Fetches JSON data from a URL.
 * @param resource The resource to fetch, i.e. the URL.
 * @param options Additional settings to apply to the request.
 * @returns The response parsed as JSON.
 */
declare function fetchJson(
  resource: string | URL | Request,
  options?: RequestInit,
): Promise<any>;

export = fetchJson;
