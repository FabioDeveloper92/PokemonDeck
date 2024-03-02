import { PageHeaderComponent } from "./page-header.componets";
import { Link } from "react-router-dom";

export function NotFoundComponent() {
  return (
    <PageHeaderComponent
      title="Page Not Found"
      subtitle="Sorry this page doesn't exist."
    >
      <Link to="/" className="text-decoration-none text-black">
        Return to home
      </Link>
    </PageHeaderComponent>
  );
}
