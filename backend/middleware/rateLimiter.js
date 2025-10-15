import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for LaTeX compilation endpoint
 * Limits to 10 requests per 15 minutes per IP
 * LaTeX compilation is resource-intensive, so we limit it more strictly
 */
export const compileRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Too many compilation requests from this IP, please try again after 15 minutes',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many compilation requests. Please try again later.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000 - Date.now() / 1000) + ' seconds'
    });
  }
});

/**
 * Rate limiter for AI optimization endpoint
 * Limits to 5 requests per 15 minutes per IP
 * AI API calls are expensive and should be limited more strictly
 */
export const optimizeRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many optimization requests from this IP, please try again after 15 minutes',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many AI optimization requests. Please try again later.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000 - Date.now() / 1000) + ' seconds'
    });
  }
});

/**
 * General API rate limiter for all endpoints
 * Limits to 100 requests per 15 minutes per IP
 */
export const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});
