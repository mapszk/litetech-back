import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1737148874169 implements MigrationInterface {
  name = 'InitialMigration1737148874169';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "related_posts" (
        "id" SERIAL NOT NULL,
        "title" character varying NOT NULL,
        "image" character varying NOT NULL,
        "author" character varying NOT NULL,
        "readTime" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_related_posts" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "related_posts"`);
  }
}
