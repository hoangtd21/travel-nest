import type { Meta, StoryObj } from '@storybook/react';
import Pagination from '../ui/Pagination';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'UI common/Pagination',
  component: Pagination,
  argTypes: {
    count: {
      control: {
        type: 'number',
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ count }) => {
    return (
      <BrowserRouter>
        <Pagination count={count} />
      </BrowserRouter>
    );
  },
  args: {
    count: 30,
  },
};
