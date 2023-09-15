import type { Meta, StoryObj } from '@storybook/react';
import Spinner from '../ui/Spinner';

const meta = {
  title: 'UI common/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
