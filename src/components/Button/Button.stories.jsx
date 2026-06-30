import { Button } from './Button.jsx'

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'ghost', 'outline', 'destructive'] },
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export const Default = { args: { children: 'Save changes', variant: 'primary' } }

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
}

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const Loading = { args: { children: 'Saving', variant: 'primary', loading: true } }

export const DarkMode = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
  parameters: { backgrounds: { default: 'dark' } },
}
