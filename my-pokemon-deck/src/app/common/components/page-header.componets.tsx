import { Children, ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

class PageHeaderComponentProps {
  title: string;
  subtitle: string;

  children?: ReactNode;
}

export function PageHeaderComponent({
  title,
  subtitle,
  children,
}: PageHeaderComponentProps) {
  return (
    <Container fluid className="mb-3">
      <Row>
        <Col xs={12} className="p-0">
          <div className="page-header-image">
            <div className="h2 fw-normal text-shadow-white">{title}</div>
            <div
              className="h6 fw-normal text-shadow-white"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            ></div>
            {Children.map(children, (child) => (
              <div className="h6 fw-normal">{child}</div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
