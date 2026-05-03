import { fireEvent, render, screen } from '@testing-library/react';
import { JourneyMap } from './JourneyMap';

describe('JourneyMap', () => {
  it('allows completed/current steps and locks future steps', () => {
    const onStepClick = vi.fn();

    render(
      <JourneyMap
        currentStep={3}
        completedSteps={[1, 2]}
        onStepClick={onStepClick}
      />
    );

    const stepOne = screen.getByRole('button', { name: /step 1:/i });
    const stepThree = screen.getByRole('button', { name: /step 3:/i });
    const stepFour = screen.getByRole('button', { name: /step 4:/i });

    fireEvent.click(stepOne);
    fireEvent.click(stepThree);

    expect(onStepClick).toHaveBeenCalledWith(1);
    expect(onStepClick).toHaveBeenCalledWith(3);
    expect(stepThree).toHaveAttribute('aria-current', 'step');
    expect(stepFour).toBeDisabled();
  });
});
