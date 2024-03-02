import { Button } from "react-bootstrap";
import { PageHeaderComponent } from "./page-header.componets";
import { Link } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";

export function NotFoundComponent() {
  return (
    <PageHeaderComponent
      title="Page Not Found"
      subtitle="Sorry this page doesn't exist."
    >
      <Button variant="primary mt-2">
        <Link to="/" className="text-decoration-none text-white">
          <HouseFill className="mb-md-1 me-2" /> Go to Home
        </Link>
      </Button>
    </PageHeaderComponent>
  );
}
