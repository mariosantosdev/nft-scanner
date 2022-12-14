import { useEffect, useState } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

interface useWeb3Props {
  contractABI: AbiItem | AbiItem[];
  contractAddress: string;
}

export const useWeb3 = ({ contractABI, contractAddress }: useWeb3Props) => {
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    const main = () => {
      if (!contractABI && !contractAddress) return;
      if (!window.ethereum) return;

      const web3 = new Web3(window.ethereum!);
      const newContract = new web3.eth.Contract(contractABI, contractAddress);
      setContract(newContract);
    };

    main();
  }, [contractABI, contractAddress]);

  return { contract };
};
