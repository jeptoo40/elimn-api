const LRUCache = require("../src/algorithms/lru");

describe("LRU Cache Tests", () => {
  test("Stores and retrieves values", () => {
    const cache = new LRUCache(2);
    cache.put("a", 1, 1000);
    expect(cache.get("a")).toBe(1);
  });

  test("Evicts least recently used", () => {
    const cache = new LRUCache(2);
    cache.put("a", 1, 1000);
    cache.put("b", 2, 1000);
    cache.put("c", 3, 1000); // "a" should be evicted
    expect(cache.get("a")).toBe(null);
  });

  test("Respects TTL expiry", (done) => {
    const cache = new LRUCache(2);
    cache.put("x", 42, 50); // expires in 50ms
    setTimeout(() => {
      expect(cache.get("x")).toBe(null);
      done();
    }, 80);
  });
});
