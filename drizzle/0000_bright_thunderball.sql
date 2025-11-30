CREATE TABLE `doc_version` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`wiki_doc_id` bigint NOT NULL,
	`body` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`version` varchar(50) NOT NULL,
	CONSTRAINT `doc_version_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wiki_doc` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	CONSTRAINT `wiki_doc_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `doc_version` ADD CONSTRAINT `doc_version_wiki_doc_id_wiki_doc_id_fk` FOREIGN KEY (`wiki_doc_id`) REFERENCES `wiki_doc`(`id`) ON DELETE cascade ON UPDATE cascade;