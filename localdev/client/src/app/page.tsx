'use client';

import { useEffect, useState } from 'react';
import Web3, { Web3 as Web3Props, Contract } from 'web3';
import { RegisteredSubscription } from 'web3-eth';
import MetaDisplayABI from '@/contracts/MetaDisplay.json';
import { IdGen } from '@/lib/helpers';

type InitStateProps = {
  web3: Web3Props<RegisteredSubscription>;
  contract: Contract<typeof MetaDisplayABI.abi>;
};

const Home = () => {
  const [state, setState] = useState<InitStateProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [collections, setCollections] = useState<any[]>([]);

  console.log('state: ', state);

  useEffect(() => {
    setLoading(false);
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');

    console.log('provider: ', provider);

    const temp = async () => {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MetaDisplayABI.networks[networkId];
      console.log('networkId: ', networkId);
      console.log('deployedNetwork: ', deployedNetwork);

      console.log('web3: ', web3);

      const contract = new web3.eth.Contract(
        MetaDisplayABI.abi,
        deployedNetwork.address
      );
      setState({ web3, contract });
    };
    !loading && provider && temp();
  }, [loading]);

  useEffect(() => {
    if (state) {
      const { contract } = state;

      const readyCollections = async () => {
        const assetCollections = (await contract.methods
          .getAllAssets()
          .call()) as any[];
        setCollections(assetCollections);
        console.log('assetCollections: ', assetCollections);
      };

      contract && readyCollections();
    }
  }, [state, loading]);

  const createAsset = async () => {
    console.log('out');
    if (state) {
      const { contract,web3 } = state;
      const gasPrice = await web3.eth.getGasPrice() as string;
      try {
        console.log('in');
        const asset = await contract.methods
          .createAsset(
            GeneratedSolAsset.id,
            GeneratedSolAsset.title,
            GeneratedSolAsset.description,
            GeneratedSolAsset.image,
            GeneratedSolAsset.category,
            GeneratedSolAsset.date
          )
          .send({
            from: '0xBAcaB12c09A6516FD18dB74C863d0b912E7bf8d6',
            gas: '500000',
            gasPrice: gasPrice,
          })
          .on('error', (error, receipt) => {
            console.log('error:  ', error);
          });
        console.log('asset: ', asset);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className=''>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <p>
            Data:{' '}
            {collections.length > 0
              ? JSON.stringify(collections)
              : collections.length}
          </p>

          <button onClick={createAsset}>create a post</button>
        </>
      )}
    </main>
  );
};

export default Home;

const GeneratedSolAsset = {
  id: IdGen('id'),
  image: IdGen('image'),
  title: IdGen('title'),
  description: IdGen('description'),
  date: IdGen(new Date().toISOString()),
  category: IdGen('category'),
};
