# smart-rss

use Cron trigger worker to run the batch jobs
https://developers.cloudflare.com/workers/configuration/cron-triggers/#supported-cron-expressions
https://developers.cloudflare.com/workers/examples/multiple-cron-triggers/
https://developers.cloudflare.com/workers/examples/cron-trigger/

cron trigger worker use the #Service bindings# to call the xxx source worker
https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/


use the D1 to save the rss feed as record format....
https://developers.cloudflare.com/workers/wrangler/commands/#dev
https://developers.cloudflare.com/d1/build-with-d1/d1-client-api/
https://blog.cloudflare.com/whats-new-with-d1/
https://github.com/cloudflare/cloudflare-docs/blob/production/content/d1/tutorials/d1-and-prisma-orm/index.md
https://developers.cloudflare.com/d1/tutorials/build-a-comments-api/


RSS feed srouces:
https://feeder.co/knowledge-base/rss-feed-creation/youtube-rss/
https://feeder.co/knowledge-base/rss-feed-creation/reddit-rss/


debug in local:
in youtube to 'npx wrangler dev' to start the youtube source worker

create DB
npx wrangler login  
npx wrangler d1 create d1-smart-rss-test  

 npx wrangler d1 execute d1-smart-rss-test --local --file=./rss-db-schema.sql 
 --remote

 curl "http://localhost:5988/__scheduled?cron=*+*+*+*+*" 

 npx wrangler d1 execute d1-smart-rss-test --local --command="SELECT * FROM RSSRecords"

 npx wrangler dev --test-scheduled