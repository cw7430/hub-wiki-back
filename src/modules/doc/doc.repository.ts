import { Inject, Injectable } from '@nestjs/common';
import { eq, desc, and } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';

import * as schema from '@/common/database/schemas';
import { wikiDoc, docVersion } from '@/common/database/schemas/doc.schema';

@Injectable()
export default class DocRepository {
  constructor(
    @Inject('DRIZZLE_CONNECTION')
    private readonly db: MySql2Database<typeof schema>,
  ) {}

  async findWikiDocByTitle(title: string) {
    return this.db
      .select()
      .from(wikiDoc)
      .where(eq(wikiDoc.title, title))
      .limit(1);
  }

  async findDocVersionsByWikiDocId(id: bigint) {
    return this.db
      .select()
      .from(docVersion)
      .where(eq(docVersion.wikiDocId, id));
  }

  async findDocLatestVersionByWikiDocId(id: bigint) {
    return this.db
      .select()
      .from(docVersion)
      .where(eq(docVersion.wikiDocId, id))
      .orderBy(desc(docVersion.version))
      .limit(1);
  }

  async findDocVersionByIdAndVersion(id: bigint, version: string) {
    return this.db
      .select()
      .from(docVersion)
      .where(and(eq(docVersion.wikiDocId, id), eq(docVersion.version, version)))
      .limit(1);
  }
}
