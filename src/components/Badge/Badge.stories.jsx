import { Badge } from './Badge.jsx'

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', 'sapphire', 'peridot', 'topaz', 'default'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
    dot:  { control: 'boolean' },
  },
}

export const Default = { args: { children: 'Active', variant: 'success', dot: true } }

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="success">Approved</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Defaulted</Badge>
      <Badge variant="info">Processing</Badge>
      <Badge variant="sapphire">Scoring</Badge>
      <Badge variant="peridot">USSD</Badge>
      <Badge variant="topaz">Mobile SDK</Badge>
      <Badge variant="default">Inactive</Badge>
    </div>
  ),
}

export const DarkBackground = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Defaulted</Badge>
    </div>
  ),
  parameters: { backgrounds: { default: 'mulberry' } },
}
