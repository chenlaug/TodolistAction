-- DropForeignKey
ALTER TABLE "Subtask" DROP CONSTRAINT "Subtask_todoId_fkey";

-- AddForeignKey
ALTER TABLE "Subtask" ADD CONSTRAINT "Subtask_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
