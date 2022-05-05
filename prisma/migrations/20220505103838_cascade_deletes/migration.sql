-- DropForeignKey
ALTER TABLE "ProjectsOnTags" DROP CONSTRAINT "ProjectsOnTags_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectsOnTags" DROP CONSTRAINT "ProjectsOnTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TasksOnTags" DROP CONSTRAINT "TasksOnTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TasksOnTags" DROP CONSTRAINT "TasksOnTags_taskId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_project_id_fkey";

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksOnTags" ADD CONSTRAINT "TasksOnTags_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TasksOnTags" ADD CONSTRAINT "TasksOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsOnTags" ADD CONSTRAINT "ProjectsOnTags_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsOnTags" ADD CONSTRAINT "ProjectsOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
