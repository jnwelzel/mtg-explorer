import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
}
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
}
export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
  },
}
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}
export const ActiveSecondary: Story = {
  args: {
    children: 'Active Button',
    isActive: true,
    variant: 'secondary',
  },
}
export const Loading: Story = {
  args: {
    children: 'Loading Button',
    isLoading: true,
  },
}
