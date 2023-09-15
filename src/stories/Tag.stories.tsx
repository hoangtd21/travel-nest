import type { Meta, StoryObj } from '@storybook/react';
import Tag from '../ui/Tag';

const meta = {
  title: 'UI common/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['unconfirmed', 'checked-in', 'checked-out'],
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: 'unconfirmed',
    children: 'Unconfirmed',
  },
};
