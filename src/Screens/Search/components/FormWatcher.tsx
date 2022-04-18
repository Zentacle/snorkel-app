import React from 'react';

import type { AnyObject } from 'final-form';
import type { FunctionComponent } from 'react';

import type { InitialSearchValues } from '_utils/interfaces/data/search';

interface FormWatcherProps {
  handleSubmit: () => Promise<AnyObject | undefined> | undefined;
  formValues: InitialSearchValues;
}

const FormWatcher: FunctionComponent<FormWatcherProps> = ({
  formValues,
  handleSubmit,
}) => {
  React.useEffect(() => {
    handleSubmit();
  }, [formValues, handleSubmit]);
  return null;
};

const areEqual = (prevProps: FormWatcherProps, nextProps: FormWatcherProps) => {
  let prev = JSON.stringify(prevProps);
  let next = JSON.stringify(nextProps);

  return prev === next;
};

const MemoizedFormWatcher = React.memo(FormWatcher, areEqual);

export default MemoizedFormWatcher;
