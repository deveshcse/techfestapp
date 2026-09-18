import PageHeader from "@/components/common/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContactList } from "@/features/contact/components/contact-list";
import { Access } from "@/features/auth/components/permission/access";
import { EmptyState } from "@/components/common/empty-state";
import { ShieldAlert } from "lucide-react";

export default function ContactMessagesPage() {
  return (
    <Access
      resource="contact"
      action="read"
      fallback={
        <div className="p-6">
          <EmptyState
            icon={ShieldAlert}
            title="Admin access required"
            description="Only admins can view contact form submissions."
          />
        </div>
      }
    >
      <div className="flex h-full flex-col">
        <PageHeader
          title="Contact messages"
          description="Submissions from the public contact form."
        />
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-6 py-4">
            <ContactList />
          </ScrollArea>
        </div>
      </div>
    </Access>
  );
}
