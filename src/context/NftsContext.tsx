import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AbiItem } from "web3-utils";

import animetas from "~/contracts/animetas.json";
import { useWeb3 } from "~/hooks/useWeb3";

export type NFT = {
  id: number;
  name: string;
  description?: string;
  image: string;
};

type FNGetNfts = (address: string) => Promise<NFT[]>;

export type NftsContextData = {
  loading: boolean;
  nfts: NFT[];
  getNfts: FNGetNfts;
};

export interface NftsProviderProps {
  children: React.ReactNode;
}

export const NftsContext = createContext({} as NftsContextData);

export const NftsProvider = ({ children }: NftsProviderProps) => {
  const { contract } = useWeb3({
    contractABI: animetas.abi as AbiItem[],
    contractAddress: animetas.address,
  });

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const IPFSToHttp = useCallback((ipfs: string) => {
    return `https://ipfs.io/ipfs/${ipfs.split("ipfs://")[1]}`;
  }, []);

  const getNfts: FNGetNfts = (address: string) => {
    return new Promise<NFT[]>(async (resolve, reject) => {
      if (!contract) return reject();
      try {
        setNfts([]);
        setLoading(true);
        const list: NFT[] = [];
        const balanceOf = await contract.methods.balanceOf(address).call();

        for (let i = 0; i < balanceOf; i++) {
          const tokenId = await contract.methods
            .tokenOfOwnerByIndex(address, i)
            .call();
          const tokenIPFS = await contract.methods.tokenURI(tokenId).call();
          const tokenURI = IPFSToHttp(tokenIPFS);
          const token = await fetch(tokenURI);
          const tokenData = await token.json();

          list.push({
            id: Number(tokenId),
            name: tokenData.name,
            description: tokenData.description,
            image: IPFSToHttp(tokenData.image),
          });
        }

        setNfts(list);
        resolve(list);
      } catch (error) {
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum;
    }
  }, []);

  return (
    <NftsContext.Provider value={{ nfts, loading, getNfts }}>
      {children}
    </NftsContext.Provider>
  );
};

export const useNfts = () => useContext(NftsContext);
