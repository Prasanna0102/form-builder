/*
  Warnings:

  - A unique constraint covering the columns `[responseId,fileName]` on the table `Attachment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attachment_responseId_fileName_key" ON "Attachment"("responseId", "fileName");
