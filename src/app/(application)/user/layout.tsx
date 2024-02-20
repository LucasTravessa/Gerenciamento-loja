import type { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
};

export default function LayoutAuth({ children }: layoutProps) {
  return (
    <div className="mt-16 flex flex-col items-center justify-between gap-5">
      {children}
    </div>
  );
}
