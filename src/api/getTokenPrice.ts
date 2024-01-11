export const getTokenPrice = async (tokenId: string) => {
  const URL = `https://api.coingecko.com/api/v3/simple/price?
  vs_currencies=USD&ids=${tokenId}
  `;
  return await (await fetch(URL)).json();
};
