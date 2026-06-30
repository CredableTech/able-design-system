import { Card, CardHeader, CardTitle, CardBody } from './Card.jsx'
import { Badge } from '../Badge/Badge.jsx'
import { Button } from '../Button/Button.jsx'

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant:   { control: 'select', options: ['default', 'dark', 'bordered'] },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
}

export const Default = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Loan Portfolio</CardTitle>
        <Badge variant="success" dot>Live</Badge>
      </CardHeader>
      <CardBody>
        12,847 active customers across Tanzania and Kenya.
      </CardBody>
    </Card>
  ),
}

export const DarkVariant = {
  render: () => (
    <Card variant="dark" style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>TZS 4.7M</CardTitle>
        <Badge variant="success">Disbursed YTD</Badge>
      </CardHeader>
      <CardBody>
        January through June 2026. PAR 30 at 3.2%.
      </CardBody>
    </Card>
  ),
  parameters: { backgrounds: { default: 'dark' } },
}

export const Bordered = {
  render: () => (
    <Card variant="bordered" style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
      </CardHeader>
      <CardBody>
        Partner-level product configuration. No deployments required.
      </CardBody>
    </Card>
  ),
}

export const Hoverable = {
  render: () => (
    <Card hoverable clickable style={{ maxWidth: 280 }}>
      <CardHeader>
        <CardTitle>Scoring Engine</CardTitle>
        <Badge variant="sapphire">Risk</Badge>
      </CardHeader>
      <CardBody>
        PMML strategy authoring and real-time scoring.
      </CardBody>
    </Card>
  ),
}

export const WithActions = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
        <Badge variant="warning">14 waiting</Badge>
      </CardHeader>
      <CardBody>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <Button variant="primary" size="sm">Review all</Button>
          <Button variant="ghost" size="sm">Dismiss</Button>
        </div>
      </CardBody>
    </Card>
  ),
}
