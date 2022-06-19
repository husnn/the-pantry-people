import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1655668804357 implements MigrationInterface {
  name = 'initial1655668804357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "email" text NOT NULL, "password" text NOT NULL, "first_name" text, "last_name" text, "last_login" TIMESTAMP, "last_login_ip" text, "address" jsonb, "coordinates" geography(Point,4326), "preferences" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "charities" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" integer NOT NULL, "name" text NOT NULL, "address" jsonb, "coordinates" geography(Point,4326), CONSTRAINT "PK_b25f8c5ff91d63a1f03b6416506" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_637bad9b12ad4ff6fb5aab6eba" ON "charities" USING GiST ("coordinates") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e9abb9381b4e764819d65ba1e1" ON "charities" ("owner_id") `
    );
    await queryRunner.query(
      `CREATE TYPE "public"."charity_users_role_enum" AS ENUM('ADMIN', 'VOLUNTEER')`
    );
    await queryRunner.query(
      `CREATE TABLE "charity_users" ("id" SERIAL NOT NULL, "charity_id" integer NOT NULL, "user_id" integer NOT NULL, "role" "public"."charity_users_role_enum" NOT NULL, CONSTRAINT "PK_e4da0cf1d04f3c821f74b6c43f2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_81c31f852d70d7090af8b6aa5c" ON "charity_users" ("user_id", "charity_id") `
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lists_status_enum" AS ENUM('CREATED', 'PROCESSING', 'FULFILLED', 'PARTLY_FULFILLED', 'EXPIRED', 'CANCELLED')`
    );
    await queryRunner.query(
      `CREATE TABLE "lists" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "beneficiary_id" integer NOT NULL, "charity_id" integer, "status" "public"."lists_status_enum" NOT NULL DEFAULT 'CREATED', "date_fulfilled" TIMESTAMP, "name" text, "area" geography(Polygon,4326) NOT NULL, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ccc4e77005a72756cbabab6b03" ON "lists" USING GiST ("area") `
    );
    await queryRunner.query(
      `CREATE TABLE "list_items" ("id" SERIAL NOT NULL, "list_id" integer NOT NULL, "label" text NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "unavailable" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_26260957b2b71a1d8e2ecd005f8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8bf07909d6d9e95e8e637bd5b3" ON "list_items" ("list_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "charity_users" ADD CONSTRAINT "FK_3532c90a8003efeb7ef161b5945" FOREIGN KEY ("charity_id") REFERENCES "charities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "charity_users" ADD CONSTRAINT "FK_ba2510261efd757a527dfaaae79" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "lists" ADD CONSTRAINT "FK_2e75df40fc7e660c489c1e49a45" FOREIGN KEY ("beneficiary_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "lists" ADD CONSTRAINT "FK_0baac45cbfa3022bbc8a15dc1e5" FOREIGN KEY ("charity_id") REFERENCES "charities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "list_items" ADD CONSTRAINT "FK_8bf07909d6d9e95e8e637bd5b3e" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list_items" DROP CONSTRAINT "FK_8bf07909d6d9e95e8e637bd5b3e"`
    );
    await queryRunner.query(
      `ALTER TABLE "lists" DROP CONSTRAINT "FK_0baac45cbfa3022bbc8a15dc1e5"`
    );
    await queryRunner.query(
      `ALTER TABLE "lists" DROP CONSTRAINT "FK_2e75df40fc7e660c489c1e49a45"`
    );
    await queryRunner.query(
      `ALTER TABLE "charity_users" DROP CONSTRAINT "FK_ba2510261efd757a527dfaaae79"`
    );
    await queryRunner.query(
      `ALTER TABLE "charity_users" DROP CONSTRAINT "FK_3532c90a8003efeb7ef161b5945"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8bf07909d6d9e95e8e637bd5b3"`
    );
    await queryRunner.query(`DROP TABLE "list_items"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ccc4e77005a72756cbabab6b03"`
    );
    await queryRunner.query(`DROP TABLE "lists"`);
    await queryRunner.query(`DROP TYPE "public"."lists_status_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_81c31f852d70d7090af8b6aa5c"`
    );
    await queryRunner.query(`DROP TABLE "charity_users"`);
    await queryRunner.query(`DROP TYPE "public"."charity_users_role_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e9abb9381b4e764819d65ba1e1"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_637bad9b12ad4ff6fb5aab6eba"`
    );
    await queryRunner.query(`DROP TABLE "charities"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
