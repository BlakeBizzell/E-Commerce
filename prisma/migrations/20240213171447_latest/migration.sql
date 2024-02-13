-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "mime_type" TEXT,
    "data" BYTEA,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);
