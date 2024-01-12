import { QueryFunctionContext } from "react-query";

export const getTokenPrice = async ({
  queryKey,
}: QueryFunctionContext<string[]>) => {
  const [, tokenId] = queryKey;
  const URL = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=${tokenId}
  `;
  return await (await fetch(URL)).json();
};
