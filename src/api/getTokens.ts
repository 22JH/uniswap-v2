const PER_PAGE = 50;

export const getTokens = async (pageParam: number) => {
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${PER_PAGE}&page=${pageParam}&locale=en`;
  return (await fetch(URL)).json();
};
