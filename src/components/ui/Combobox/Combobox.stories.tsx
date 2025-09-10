import type { Meta, StoryObj } from '@storybook/react-vite'
import { Combobox } from './Combobox'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    label: 'Your favorite fruit',
    placeholder: 'e.g., Apple',
    onItemClick: value => {
      console.log('Selected fruit:', value)
    },
    options: [
      { value: 'Apple', label: '🍎 Apple' },
      { value: 'Banana', label: '🍌 Banana' },
      { value: 'Grape', label: '🍇 Grape' },
      { value: 'Orange', label: '🍊 Orange' },
      { value: 'Strawberry', label: '🍓 Strawberry' },
      { value: 'Watermelon', label: '🍉 Watermelon' },
    ],
  },
}
