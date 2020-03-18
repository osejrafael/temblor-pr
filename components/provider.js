import React, { createContext } from 'react';
import { useMachine } from '@xstate/react';
import machine from '../constants/machine';

const Context = createContext();

const Provider = ({ children }) => {
  const [current, send] = useMachine(machine);

  return (
    <Context.Provider value={{ current, send }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
