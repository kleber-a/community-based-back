/*
  Warnings:

  - The `atividades` column on the `pessoas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pessoas" DROP COLUMN "atividades",
ADD COLUMN     "atividades" TEXT[] DEFAULT ARRAY[]::TEXT[];
