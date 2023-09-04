import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render correct header title', () => {
    render(<App />);
    const headline = screen.getByText(/HEADER/i);
    expect(headline).toBeInTheDocument();
  });
});
