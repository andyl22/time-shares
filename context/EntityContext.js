import { createContext } from 'react';
import PropTypes from 'prop-types';

const EntityContext = createContext([{}, () => {}]);

export default function EntityContextProvider(props) {
  const { children, entityDetails } = props;

  return (
    <EntityContext.Provider value={entityDetails}>
      {entityDetails ? children : <p>Loading Context</p>}
    </EntityContext.Provider>
  );
}

EntityContextProvider.propTypes = {
  children: PropTypes.array,
  entityDetails: PropTypes.object
};

export { EntityContext };
