import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 300 }); // 5 phút

const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    // Nếu không phải GET thì skip cache
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    // Override res.json để cache trước khi gửi response
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      cache.set(key, body, duration);
      originalJson(body);
    };

    next();
  };
};

export default cacheMiddleware;