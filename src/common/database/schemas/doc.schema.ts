import {
  mysqlTable,
  bigint,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const wikiDoc = mysqlTable('wiki_doc', {
  wikiDocId: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull().unique(),
});

export const docVersion = mysqlTable('doc_version', {
  docVersionId: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),

  wikiDocId: bigint('wiki_doc_id', { mode: 'bigint' })
    .notNull()
    .references(() => wikiDoc.wikiDocId, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

  body: text('body').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  version: varchar('version', { length: 50 }).notNull().unique(),
});
