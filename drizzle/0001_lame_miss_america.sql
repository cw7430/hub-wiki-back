ALTER TABLE `doc_version` ADD CONSTRAINT `doc_version_version_unique` UNIQUE(`version`);--> statement-breakpoint
ALTER TABLE `wiki_doc` ADD CONSTRAINT `wiki_doc_title_unique` UNIQUE(`title`);