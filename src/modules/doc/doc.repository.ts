import { Inject, Injectable } from '@nestjs/common';
import { eq, desc, and } from 'drizzle-orm';
import type { MySql2Database } from 'drizzle-orm/mysql2';

import * as schema from '@/common/database/schemas';
import { wikiDoc, docVersion } from '@/common/database/schemas/doc.schema';

@Injectable()
export default class DocRepository {
  constructor(
    @Inject('DRIZZLE_CONNECTION')
    private readonly db: MySql2Database<typeof schema>,
  ) {}

  private static readonly selectDocJoinedFields = {
    wikiDocId: wikiDoc.wikiDocId,
    title: wikiDoc.title,
    docVersionId: docVersion.docVersionId,
    body: docVersion.body,
    createdAt: docVersion.createdAt,
    version: docVersion.version,
  };

  async findWikiDocByTitle(title: string) {
    const result = await this.db
      .select()
      .from(wikiDoc)
      .where(eq(wikiDoc.title, title))
      .limit(1);
    return result[0] ?? undefined;
  }

  async findDocVersions(wikiDocId: bigint) {
    return this.db
      .select({
        docVersionId: docVersion.docVersionId,
        createdAt: docVersion.createdAt,
        version: docVersion.version,
      })
      .from(docVersion)
      .where(eq(docVersion.wikiDocId, wikiDocId));
  }

  async findDocLatestVersion(title: string) {
    const result = await this.db
      .select(DocRepository.selectDocJoinedFields)
      .from(wikiDoc)
      .innerJoin(docVersion, eq(wikiDoc.wikiDocId, docVersion.wikiDocId))
      .where(eq(wikiDoc.title, title))
      .orderBy(desc(docVersion.version))
      .limit(1);

    return result[0] ?? undefined;
  }

  async findDocVersion(title: string, version: string) {
    const result = await this.db
      .select(DocRepository.selectDocJoinedFields)
      .from(wikiDoc)
      .innerJoin(docVersion, eq(wikiDoc.wikiDocId, docVersion.wikiDocId))
      .where(and(eq(wikiDoc.title, title), eq(docVersion.version, version)))
      .limit(1);
    return result[0] ?? undefined;
  }
}
