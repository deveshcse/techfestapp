import PageHeader from "@/components/common/page-header";
import { ContactMessageDetail } from "@/features/contact/components/contact-message-detail";
import { Access } from "@/features/auth/components/permission/access";
import { EmptyState } from "@/components/common/empty-state";
import { ShieldAlert } from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ContactMessagePage({ params }: PageProps) {
  const { id } = await params;
  const messageId = Number(id);

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
          title="Message details"
          description="Review and update this contact submission."
          returnTo="/dashboard/contact"
        />
        <ContactMessageDetail id={messageId} />
      </div>
    </Access>
  );
}
