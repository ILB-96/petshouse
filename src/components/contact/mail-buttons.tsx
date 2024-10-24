"use client";

import { Icons } from "./icons";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
const MailButtons = () => {
  const { toast } = useToast();
  const copyEmailToClipboard = () => {
    const email = process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "";
    navigator.clipboard.writeText(email).then((r) => r);
    toast({ description: "Email copied to clipboard!" });
  };
  const openEmailClient = () => {
    const email = process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "";
    window.location.href = `mailto:${email}`;
  };
  return (
    <div className="text-muted-foreground mt-4 space-x-2">
      <Button
        className="contact-btn"
        variant="outline"
        onClick={copyEmailToClipboard}
        aria-label="Copy email to clipboard"
      >
        <Icons.copy
          className="text-accent-foreground opacity-75"
          height="1.3rem"
          width="1.3rem"
        />
        <span>Copy Mail</span>
      </Button>
      <Button
        className="contact-btn"
        variant="outline"
        onClick={openEmailClient}
        aria-label="Open email client"
      >
        <Icons.open
          className="text-accent-foreground opacity-75"
          height="1.3rem"
          width="1.3rem"
        />
        <span>Open Mail</span>
      </Button>
    </div>
  );
};
export default MailButtons;
