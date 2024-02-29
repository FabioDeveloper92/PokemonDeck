import { PageHeaderComponent } from "./page-header.componets";

export function NotFoundComponent() {
  return (
    <PageHeaderComponent
      title="Page Not Found"
      subtitle="Sorry this page doesn't exist. <br/>Return to <a href='/'>home</a>"
    />
  );
}
