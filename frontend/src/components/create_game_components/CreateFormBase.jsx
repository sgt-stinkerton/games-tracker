import {Col, Row, Button, Card} from "react-bootstrap";

export default function CreateFormBase ({ canPrev=null, canNext=null, children }) {
  return (
    <Row className="mt-3" style={{ height: "calc(100vh - 110px)" }}>
      <Col md={3} className="d-flex flex-row justify-content-center align-items-center">
        {canPrev && (
          <Button size="lg" onClick={e => canPrev(e)}>
            Go Back
          </Button>
        )}
      </Col>

      <Col md={6} className="d-flex flex-row justify-content-center align-items-center">
        <Card className="p-4 h-75 w-100 shadow">
          {children}
        </Card>
      </Col>

      <Col md={3} className="d-flex flex-row justify-content-center align-items-center">
        {canNext && (
          <Button size="lg" onClick={e => canNext(e)}>
            Continue
          </Button>
        )}
      </Col>
    </Row>
  );
}