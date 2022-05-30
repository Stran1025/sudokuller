set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."sudokus" (
	"sudokuId" serial NOT NULL,
	"userId" int,
	"challenge" json NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"points" int,
	CONSTRAINT "sudokus_pk" PRIMARY KEY ("sudokuId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"levelId" int NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."solutions" (
	"solutionId" serial NOT NULL,
	"userId" int NOT NULL,
	"sodukuId" int NOT NULL,
	"solution" json NOT NULL,
	"time" int NOT NULL,
	"isFinished" BOOLEAN NOT NULL,
	"lastPlayed" timestamptz NOT NULL,
	CONSTRAINT "solutions_pk" PRIMARY KEY ("solutionId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."levels" (
	"levelId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"experiencePoints" int NOT NULL,
	CONSTRAINT "levels_pk" PRIMARY KEY ("levelId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "sudokus" ADD CONSTRAINT "sudokus_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("levelId") REFERENCES "levels"("levelId");

ALTER TABLE "solutions" ADD CONSTRAINT "solutions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "solutions" ADD CONSTRAINT "solutions_fk1" FOREIGN KEY ("sodukuId") REFERENCES "sudokus"("sudokuId");
