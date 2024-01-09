-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_responder_id_fkey" FOREIGN KEY ("responder_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
