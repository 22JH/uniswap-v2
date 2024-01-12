import { QueryFunctionContext } from "react-query";

export const getSearchedToken = async ({
  queryKey,
}: QueryFunctionContext<string[]>) => {
  const [, tokenName] = queryKey;
  const URL = `https://api.coingecko.com/api/v3/search?query=${tokenName}`;
  console.log("search");
  return await (await fetch(URL)).json();
};
