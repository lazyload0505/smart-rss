DROP TABLE IF EXISTS RSSRecords;
CREATE TABLE IF NOT EXISTS RSSRecords (Id TEXT PRIMARY KEY, Channel INTEGER NOT NULL, Title TEXT NOT NULL, RecordUrl TEXT NOT NULL, PublishedTime INTEGER NOT NULL, DescriptionContent TEXT, ThumbnailUrl TEXT, AuthorName TEXT, AuthorUri TEXT);