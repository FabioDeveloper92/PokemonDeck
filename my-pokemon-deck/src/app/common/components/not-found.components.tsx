import { PageHeaderComponent } from "./page-header.componts";

export function NotFoundComponent() {
  return (
    <PageHeaderComponent
      title="Page Not Found"
      subtitle="Sorry this page doesn't exist. <br/>Return to <a href='/'>home</a>"
    />
  );
}
