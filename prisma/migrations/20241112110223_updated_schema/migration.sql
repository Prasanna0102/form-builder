/*
  Warnings:

  - You are about to alter the column `amount` on the `Form` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the `FormTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "FormTemplate";

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
