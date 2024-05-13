import xml2json from '@hendt/xml2json';

import { RSSRecord, Channel } from '../../../dataTypes';

export default function convert(xmlStr: string): RSSRecord[] {
    const jsonData = xml2json(xmlStr);

    const feed = jsonData['feed'];

    const author = feed['author'];

    const entryList = feed['entry'];
    const recordList: RSSRecord[] = [];
    entryList.forEach((entry: any) => {
        const title = entry['title'];
        const id = `yt-${entry['yt:videoId']}`;
        const recordUrl = entry['link']['href'];
        const publishedTime = entry['published'];
        const channel = Channel.Youtube;

        const description = entry['media:group']['media:description'];
        const thumbnailUrl = entry['media:group']['media:thumbnail']['url'];

        const record: RSSRecord = {id, title, recordUrl, publishedTime, channel, author, description, thumbnailUrl};
        recordList.push(record);
    })
    console.log(JSON.stringify(recordList));

    return recordList;
}
