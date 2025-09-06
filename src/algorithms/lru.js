class LRUCache {
    constructor(limit = 5, ttl = 60000) {
      this.limit = limit;
      this.ttl = ttl;
      this.cache = new Map(); 
    }
  
    _isExpired(entry) {
      return Date.now() > entry.expiresAt;
    }
  
    get(key) {
      const entry = this.cache.get(key);
      if (!entry) return null;
  
      if (this._isExpired(entry)) {
        this.cache.delete(key);
        return null;
      }
  

      this.cache.delete(key);
      this.cache.set(key, entry);
      return entry.value;
    }
  
    set(key, value) {
      if (this.cache.has(key)) {
        this.cache.delete(key);
      } else if (this.cache.size >= this.limit) {

        
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
      }
  
      this.cache.set(key, {
        value,
        expiresAt: Date.now() + this.ttl
      });
    }
  
    has(key) {
      return this.get(key) !== null;
    }
  
    clear() {
      this.cache.clear();
    }
  }
  
  export default LRUCache;
  