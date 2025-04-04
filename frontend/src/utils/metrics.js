// frontend/src/utils/metrics.js
import { Registry, Counter, Histogram } from 'prom-client';

// Create a registry
const register = new Registry();

// Define metrics
const pageVisits = new Counter({
  name: 'frontend_page_visits_total',
  help: 'Total number of page visits',
  labelNames: ['page'],
});

const pageLoadTime = new Histogram({
  name: 'frontend_page_load_seconds',
  help: 'Page load time in seconds',
  labelNames: ['page'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5],
});

// Register metrics
register.registerMetric(pageVisits);
register.registerMetric(pageLoadTime);

// Function to record page visits
export const recordPageVisit = (page) => {
  pageVisits.inc({ page });
};

// Function to record page load time
export const recordPageLoadTime = (page, time) => {
  pageLoadTime.observe({ page }, time);
};

// Function to get metrics
export const getMetrics = async () => {
  return await register.metrics();
};

export default register;