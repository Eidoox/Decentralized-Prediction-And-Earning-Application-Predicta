import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter ,Routes, Route,Link } from "react-router-dom";
import {ethers} from 'ethers';
import { useToast } from '@chakra-ui/react'
import detectZoom from 'detect-zoom';
import Navbar from './pages/navbar.js';
import HOME from './pages/home.js';
import PRICINGPLANS from './pages/pricingplans';
import EXPLOREEVENTS from './pages/explore_events';
import CREATEEVENTS from './pages/create_events.js';
import WORKINGMECHANISM from './pages/workingmechanism.js';
import predictatokenabiobject from './ContractsAbi/predictatoken.json';
import nftsubscriptionplansabiobject from './ContractsAbi/nftsubscriptionplans.json';
import predictaabiobject from './ContractsAbi/predictaabi.json';


function App() {
  const [accounts , setaccounts] = useState([]);
  const toast = useToast();

  const [predictatokencontract, setpredictatokencontract] = useState({});
  const [nftsubscriptionplanscontract, setnftsubscriptionplanscontract] = useState({});
  const [predictacontract, setpredictacontract] = useState({});


  const predictatokenaddress = "0x021Fd8D5CE323D33Af56F3A3c92733C7b5AC468F";
  const nftsubscriptionplansaddress = "0x770dA8cdD24406cA79b8BD6845fA08fF5c181C0F";
  const predictadappcontractaddress = "0x463BB354292b28b9f95e7CE0B8130Ff2Dd44f5DF";


  const  connectwallet = async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request ({
            method: "eth_requestAccounts",
        }); 
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        setaccounts(accounts);
      

        window.ethereum.on('accountsChanged', async function (accounts) {
            setaccounts(accounts[0])
            
            await connectwallet()
          })
          
        connectpredictatokencontract(signer);
        connectnftsubscriptionplanscontract(signer);
        connectpredictacontract(signer);

    

    }
    else {
      toast({
        title: 'Error! MetaMask Not Found',
        description: "You have not installed MetaMask",
        status: 'error',
        duration: 2200,
        isClosable: true,
        position: 'top',   
    });

    }

  }

  const connectpredictatokencontract = async (signer) => {
    const predictatoken = new ethers.Contract(predictatokenaddress,predictatokenabiobject.predictatokenabi,signer);
    setpredictatokencontract(predictatoken);
  }
  //Connect to demo test coins
  //wbtc
  const connectnftsubscriptionplanscontract = async (signer) => {
    const nftsubscriptionplans = new ethers.Contract(nftsubscriptionplansaddress,nftsubscriptionplansabiobject.nftsubscriptionplanabi,signer);
    setnftsubscriptionplanscontract(nftsubscriptionplans);
  }
  const connectpredictacontract = async (signer) => {
    const predicta = new ethers.Contract(predictadappcontractaddress,predictaabiobject.predictaabi,signer);
    setpredictacontract(predicta);
  }



  return (
    <div>
           
      <BrowserRouter>        
        <div className="App">
          <Navbar accounts={accounts} connectwallet={connectwallet} />
        </div>  
        <Routes>
          <Route path= "/" element={ <HOME accounts={accounts} predictatokencontract={predictatokencontract} nftsubscriptionplanscontract={nftsubscriptionplanscontract}/>}/>
          <Route path= "/home" element={ <HOME />}/>
          <Route path= "/exploreevents" element={ <EXPLOREEVENTS accounts={accounts} predictacontract ={predictacontract}/>}/>
          <Route path= "/createevents" element={ <CREATEEVENTS accounts={accounts} predictacontract = {predictacontract}/>}/>
          <Route path= "/workingmechanism" element={ <WORKINGMECHANISM />}/>
          <Route path= "/pricing" element={ <PRICINGPLANS predictatokencontract={predictatokencontract} nftsubscriptionplanscontract={nftsubscriptionplanscontract} />}/>
          
          
        </Routes>
      </BrowserRouter>
   
      
   
    


    </div>
  );
}

export default App;
