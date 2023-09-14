import type { Meta } from '@storybook/react';
import Button from '../ui/Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variation: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Primary = {
  args: {
    variation: 'primary',
    size: 'medium',
    children: 'My Button',
  },
};
