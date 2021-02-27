import React, {createContext} from 'react';

const initialState = [];

export const TallyContext = createContext(null);
export function Context(props) {
  const [state, setState] = React.useState(initialState);
  return (
    <TallyContext.Provider value={{state, setState}}>
      {props.children}
    </TallyContext.Provider>
  );
}
