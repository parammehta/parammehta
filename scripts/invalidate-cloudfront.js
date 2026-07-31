const { execSync } = require('child_process');

// CloudFront caches every file it serves, so after `aws s3 sync` uploads a new
// build, the live site keeps serving the old cached version until this cache is
// cleared. Without this, a deploy can silently appear to do nothing for
// visitors (and for us) until the default TTL expires.
const DISTRIBUTION_ID = 'E3E00OKUBAT1AJ';

execSync(`aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*"`, {
  stdio: 'inherit',
});
