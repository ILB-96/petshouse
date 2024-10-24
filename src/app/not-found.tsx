import { Gutter } from "@/components/Gutter";
import { Button } from "@/components/ui/button";
import { VerticalPadding } from "@/components/VerticalPadding";
import Link from "next/link";

export default function NotFound() {
  return (
    <Gutter>
      <VerticalPadding top="none" bottom="large">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p>This page could not be found.</p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </VerticalPadding>
    </Gutter>
  );
}
