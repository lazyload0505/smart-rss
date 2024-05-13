export interface RSSRecord {
    id: string;
    channel: Channel;
    title: string;
    recordUrl: string;
    publishedTime: string;
    author?: Author;
    description?: string;
    thumbnailUrl?: string;
} 

export enum Channel {
    Youtube,
    Twitter,
    Reddit
}

export interface Author {
    name: string;
    uri: string;
}

export interface RecordSource {
    saveRSSRecord: (contentType: string|null, contentID: string|null) => Promise<{ success: boolean; message?: string }>
}