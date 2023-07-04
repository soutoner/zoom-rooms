import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('<Loading />', () => {
  it('should render a spinner', () => {
    render(<Loading />);

    const spinner = screen.getByRole('img');
    expect(spinner).toBeInTheDocument();
    expect(spinner.className).toEqual('Loading');
    expect(spinner.getAttribute('src')).toContain('loading.gif');
  });
});
