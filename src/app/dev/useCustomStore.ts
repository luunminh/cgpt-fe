import { isEqual } from 'lodash';
import { useEffect, useLayoutEffect, useState } from 'react';

/**
 * Re-write the hook useSyncExternalStore
 */
export const useCustomStore = <T = any>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
) => {
  const value = getSnapshot();

  const [{ inst }, forceUpdate] = useState({ inst: { value, getSnapshot } });

  useLayoutEffect(() => {
    inst.value = value;
    inst.getSnapshot = getSnapshot;

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({ inst });
    }
  }, [subscribe, value, getSnapshot]);

  useEffect(() => {
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({ inst });
    }
    const handleStoreChange = () => {
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({ inst });
      }
    };
    // Subscribe to the store and return a clean-up function.
    return subscribe(handleStoreChange);
  }, [subscribe]);

  return value;
};

function checkIfSnapshotChanged(inst: { value: any; getSnapshot: () => any }) {
  const latestGetSnapshot = inst.getSnapshot;
  const prevValue = inst.value;
  try {
    const nextValue = latestGetSnapshot();
    return !isEqual(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}
