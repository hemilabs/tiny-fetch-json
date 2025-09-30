"use strict";

const { test } = require("node:test");
const assert = require("node:assert").strict;

const fetchJson = require("..");

function mockFetch(response, options = {}) {
  return function fetchMock() {
    if (options.shouldReject) {
      return Promise.reject(options.rejectWith || new Error("Network error"));
    }
    return Promise.resolve({
      headers: {
        get: (header) =>
          header.toLowerCase() === "content-type"
            ? options.contentType || "application/json"
            : null,
      },
      json: () =>
        options.invalidJson
          ? Promise.reject(new Error("Invalid JSON"))
          : Promise.resolve(response),
      ok: options.ok !== false,
      statusText: options.statusText || "ok",
    });
  };
}

// Patch global fetch for tests
function withMockedFetch(mock, fn) {
  const originalFetch = global.fetch;
  global.fetch = mock;
  return fn().finally(function () {
    global.fetch = originalFetch;
  });
}

test("Can fetch and parse a JSON response", async function () {
  await withMockedFetch(mockFetch({ hello: "world" }), async function () {
    const data = await fetchJson("https://api.example.com/hello");
    assert.deepEqual(data, { hello: "world" });
  });
});

test("Throws if the request fails", async function () {
  await withMockedFetch(
    mockFetch(null, { shouldReject: true }),
    async function () {
      await assert.rejects(
        () => fetchJson("https://api.example.com/fail"),
        /Network error/,
      );
    },
  );
});

test("Throws if the response is not ok", async function () {
  await withMockedFetch(
    mockFetch({ error: "Not found" }, { ok: false, statusText: "Not Found" }),
    async function () {
      await assert.rejects(
        () => fetchJson("https://api.example.com/404"),
        /Not Found/,
      );
    },
  );
});

test("Throws if the response is invalid JSON", async function () {
  await withMockedFetch(
    mockFetch(null, { invalidJson: true }),
    async function () {
      await assert.rejects(
        () => fetchJson("https://api.example.com/badjson"),
        /Invalid JSON/,
      );
    },
  );
});

test("Throws if the response is not a JSON", async function () {
  await withMockedFetch(
    mockFetch(null, { contentType: "text/html" }),
    async function () {
      await assert.rejects(
        () => fetchJson("https://api.example.com/badjson"),
        /Response is not JSON/,
      );
    },
  );
});
