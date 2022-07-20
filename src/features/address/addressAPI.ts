import { Address } from "./types";

const API_KEY = "HLr7mxe3r0GPQCkLCkXbyw35965"

export async function searchPostCodeByKeyword(postcode: string) {
  let headers = {
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
  };  
  const res = await fetch(`https://api.getAddress.io/typeahead/${postcode}?api-key=${API_KEY}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({"search": ["postcode"], "top": 20})
  });

  const json = await res.json()
  if (json.errors) {
    throw new Error('Failed to fetch Typehead API')
  }
  return json
}

export async function searchAddressByPostCode(postcode: string) {
  let headers = {
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
  }; 

  const res = await fetch(`https://api.getAddress.io/find/${postcode}?api-key=${API_KEY}`, {
    method: "GET",
    headers: headers,
  });

  const json = await res.json()
  if (json.errors) {
    throw new Error('Failed to fetch Address API')
  }
  return json
}
