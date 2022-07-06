import React from 'react';

const initialState = {
    walletAddress: null,
    walletConnected: false,
    count: 0
}

// const walletContext = React.createContext(initialState);
const WalletContext = React.createContext();

function walletReducer(state, action) {
    switch (action.type) {
        case 'setWalletConnected': {
            return { ...state, walletConnected: action.data }
        }
        case 'setWalletAddress': {
            return { ...state, walletAddress: action.data }
        }
        case 'add': {
            return { ...state, count: action.data }
        }
        default: {
            // throw new Error(`Unhandled action type ${action.type}`)
            return { initialState }
        }
    }
}

function WalletProvider({ children }) {
    const [state, dispatch] = React.useReducer(walletReducer, initialState);

    const value = { state, dispatch };
    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

function useWalletValues() {
    const context = React.useContext(WalletContext);

    if (context === undefined) {
        throw new Error('useWalletValues must be used within a walletProvider');
    }

    //check if connected and connect if not
    // if (context)

    return context;
}

export { WalletProvider, useWalletValues }

