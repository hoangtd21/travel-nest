import type { Meta, StoryObj } from '@storybook/react';
import Tag from '../ui/Tag';

const meta = {
  title: 'UI common/Tag',
  component: Tag,
  argTypes: {
    type: {
      control: 'select',
      options: {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: 'unconfirmed',
    children: 'Status display',
  },
};
