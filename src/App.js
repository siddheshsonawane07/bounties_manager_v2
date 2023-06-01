import React, { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import Bounties from "./Components/Main/Bounty";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateBountyComponent from "./Components/CreateBounty/CreateBounty";
import AllBountiesComponent from "./Components/AllBounties/AllBounties";

const App = () => {
  console.log(process.env.REACT_APP_WALLET_ADD);
  const [currentAccount, setCurrentAccount] = useState("");
  const [wallet, setWallet] = useState("Please Connect Your Wallet to Proceed");
  const [contract, setContract] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const CONTRACT_ADDRESS = "0x847a244db9618010e65749Fe6952e15f2b38B371";

  const example = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "creator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "reward",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
      ],
      name: "BountyCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "bountyIndex",
          type: "uint256",
        },
      ],
      name: "BountyFailed",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "bountyIndex",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
      ],
      name: "bountySubmission",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_reward",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_deadline",
          type: "uint256",
        },
      ],
      name: "createBounty",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "bountyIndex",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "_submissionIndexes",
          type: "uint256[]",
        },
      ],
      name: "selectBountyWinner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "submitter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "description",
          type: "string",
        },
      ],
      name: "SubmissionReceived",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "winner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "reward",
          type: "uint256",
        },
      ],
      name: "WinnerSelected",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "bountyList",
      outputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "reward",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "numSubmission",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "bountyIndex",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "submissionIndex",
          type: "uint256",
        },
      ],
      name: "getBountySubmissionByIndex",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "submitter",
              type: "address",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          internalType: "struct BountyManager.Submission",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getNumBounties",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "bountyIndex",
          type: "uint256",
        },
      ],
      name: "getNumSubmissionsForBounty",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "bountyIndex",
          type: "uint256",
        },
      ],
      name: "getSelectedWinners",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "bountyIndex",
          type: "uint256",
        },
      ],
      name: "getTimeLeft",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "manager",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  useEffect(() => {
    //console.log(contract.winner())
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      console.log(currentAccount);
      connectWallet();
    }
  }, [walletConnected]);
  const checkIfWalletIsConnected = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await checkIfWalletIsConnected();
      setWalletConnected(true);
      setWallet("Wallet connected");

      const signer = await checkIfWalletIsConnected(true);
      setCurrentAccount(await signer.getAddress());
      const NContract = new Contract(CONTRACT_ADDRESS, example, signer);
      setContract(NContract);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <NavComponent account={currentAccount} /> */}
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Bounties contract={contract} account={currentAccount} />}
          />
          <Route
            path="/createBounty"
            element={
              <CreateBountyComponent
                contract={contract}
                account={currentAccount}
              />
            }
          />
          <Route
            path="/allBounties"
            element={
              <AllBountiesComponent
                contract={contract}
                account={currentAccount}
              />
            }
          />
          {/* <Route path="/allBounties/:index" component={<CardDetails />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
