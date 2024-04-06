import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function handleRouterPush(
  router: AppRouterInstance,
  path?: string
): React.MouseEventHandler {
  return (event: React.MouseEvent) => {
    event.preventDefault();
    router.push(
      path ||
        (event.currentTarget as HTMLAnchorElement).getAttribute("href") ||
        ""
    );
  };
}
