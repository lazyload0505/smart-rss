/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import convert from './utils/converter';
import { RSSRecord, RecordSource } from '../../dataTypes';
import { WorkerEntrypoint } from 'cloudflare:workers';

interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	RSSDB: D1Database;
}

export default class extends WorkerEntrypoint<Env> implements RecordSource{
	async saveRSSRecord(contentType: string|null, contentID: string|null): Promise<{ success: boolean; message?: string }> {
		if (contentID == null || contentType == null) {
			return { message: 'No id or type in the request', success: false };
		}
		const rssResponse = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${contentID}`);
		const xmlResStr = await rssResponse.text();
		console.log(convert(xmlResStr));
		const rssRecordList: RSSRecord[] = convert(xmlResStr);
		//TODO: 可以检查时间，去除已有的记录，比如corn的周期是24小时，检查24小时内的内容。

		const iDResults = await this.env.RSSDB.prepare(`SELECT Id FROM RSSRecords WHERE Channel=0`).all();
		console.log(iDResults);
		const ids: string[] = [];
		if (iDResults.success) {
			iDResults.results.forEach((item) => {
				ids.push(item.Id as string);
			});
		}
		const commands: D1PreparedStatement[] = [];
		rssRecordList.forEach((fRecord) => {
			if (ids.indexOf(fRecord.id) == -1) {
				const publishedTime = new Date(fRecord.publishedTime).getTime();
				commands.push(
					this.env.RSSDB.prepare(
						`INSERT INTO RSSRecords (Id, Channel, Title, RecordUrl, PublishedTime, 
				DescriptionContent, ThumbnailUrl, AuthorName, AuthorUri) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
					).bind(
						fRecord.id,
						fRecord.channel,
						fRecord.title,
						fRecord.recordUrl,
						publishedTime,
						fRecord.description,
						fRecord.thumbnailUrl,
						fRecord.author?.name,
						fRecord.author?.uri
					)
				);
			}
		});
		console.log('commond length:', commands.length);
		if (commands.length > 0) {
			const result = await this.env.RSSDB.batch(commands);
			console.log(result);
			return {success: true};
		} else {
			console.log('No new records in this channel...');
			return {success: false, message: 'No new records in this channel...'};
		}
	}

	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const urlSearchParams: URLSearchParams = url.searchParams;
		const contentType = urlSearchParams.get('CONTENT_TYPE');
		const contentID = urlSearchParams.get('CONTENT_ID');

		const result = await this.saveRSSRecord(contentType, contentID);
		return Response.json(result)
	}
}
function saveRSSRecord(contentType: any, arg1: number, contentID: any, arg3: number) {
	throw new Error('Function not implemented.');
}

