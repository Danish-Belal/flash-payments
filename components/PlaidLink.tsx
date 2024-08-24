import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link';
import { StyledString } from 'next/dist/build/swc';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.action';

const PlaidLink = ({user, variant}: PlaidLinkProps) => {
  const router = useRouter();
  // console.log('User in Plaid', user, variant);
  
  const [token, setToken] = useState('')

  useEffect(()=>{
    const getLinkToken = async ()=>{
      // console.log('Goin to create link for plaid');
      
      const data = await createLinkToken(user);
      // console.log("Data in plaid component",data.linkToken);
      setToken(data?.linkToken)
    }

    getLinkToken();
  },[user]);

  const onSuccess  = useCallback<PlaidLinkOnSuccess>(async(public_token: string )=>{
    
    // console.log('Public token', public_token);
    
    
    const exchangeToken = await exchangePublicToken({
      publicToken: public_token,
      user,
    })
    // console.log('exchange Public Token in plaid', exchangeToken.publicTokenExchange);

    router.push('/')
  },[user])
  
  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const {open , ready} = usePlaidLink(config);

  return (
    <>
    {variant === 'primary' ? (
     <Button 
        className='plaidlink-primary'
        onClick={()=> open()} 
        disabled={!ready}>
          Connect Bank
       </Button>
    ): 
     variant === 'ghost' ? (
          <Button>Connect Bak</Button>
     ):(
          <Button>Connect Bank</Button>
     )
    }
    </>
  )
}

export default PlaidLink