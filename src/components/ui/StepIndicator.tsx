'use client';

import React from 'react';
import { Steps } from 'antd';
import { Button } from '@/components/ui/Button';

interface StepIndicatorProps {
  totalSteps: number;
  step: number;
  onStepChange?: (step: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  children?: React.ReactNode;
  errorStep?: number;
  successStep?: number;
}

export function StepIndicator({ totalSteps, step, onStepChange, onNext, onPrevious, onComplete, children, errorStep, successStep }: StepIndicatorProps) {
  const stepsArray = Array.from({ length: totalSteps }, (_, i) => {
    const stepNumber = i + 1;
    let status: 'wait' | 'process' | 'finish' | 'error' = 'wait';
    
    if (errorStep === stepNumber) {
      status = 'error';
    } else if (successStep === stepNumber) {
      status = 'finish';
    } else if (stepNumber === step) {
      status = 'process';
    } else if (stepNumber < step) {
      status = 'finish';
    }
    
    return {
      title: `Step ${stepNumber}`,
      description: `Step ${stepNumber} description`,
      status,
    };
  });

  const childrenArray = React.Children.toArray(children);

  return (
    <div className="w-full mb-6">
      <Steps type="navigation" current={step - 1} items={stepsArray} />

      <div className="mt-4">
        {childrenArray[step - 1]}
      </div>

      <div className="flex gap-3 mt-4">
        {step > 1 && (
          <Button htmlType="button" variant="secondary" onClick={onPrevious}>
            Previous
          </Button>
        )}

        {step < totalSteps ? (
          <Button htmlType="button" variant="gradient" onClick={onNext}>
            Next
          </Button>
        ) : (
          <Button variant="gradient" htmlType="submit" onClick={onComplete}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
