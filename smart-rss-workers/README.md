Note:
youtube playlist feed sample:
https://www.youtube.com/feeds/videos.xml?playlist_id=PLJwx0uYOFu7QWZarxOsEn1LCCNH0fIbfv

use https://www.npmjs.com/package/xml-js to convert xml to json


database:
D1:
binding = "RSSDB" # i.e. available in your Worker on env.DB
database_name = "d1-smart-rss-test"
database_id = "cb309938-f82e-4c5b-b3b1-47fe1572dd2f"

https://developers.cloudflare.com/d1/get-started/


To execute on your remote database, add a --remote flag to your wrangler command.
npx wrangler d1 execute d1-smart-rss-test --local --file=./rss-db-schema.sql
npx wrangler d1 execute d1-smart-rss-test --local --command="SELECT * FROM RSSRecords"

http://127.0.0.1:8787/?CONTENT_TYPE=playlist&CONTENT_ID=PLJwx0uYOFu7QWZarxOsEn1LCCNH0fIbfv