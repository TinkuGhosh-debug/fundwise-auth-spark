
interface MutualFund {
  schemeCode: string;
  schemeName: string;
}

interface FundDetails {
  meta: {
    scheme_code: string;
    scheme_name: string;
    scheme_category: string;
    scheme_type: string;
    scheme_start_date: string;
    fund_house: string;
  };
  data: Array<{
    date: string;
    nav: string;
  }>;
}

const BASE_URL = 'https://api.mfapi.in/mf';

export const mutualFundsService = {
  searchFunds: async (query: string): Promise<MutualFund[]> => {
    try {
      const response = await fetch(`${BASE_URL}`);
      const funds: MutualFund[] = await response.json();
      
      if (!query.trim()) return funds.slice(0, 20);
      
      return funds.filter(fund => 
        fund.schemeName.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 50);
    } catch (error) {
      console.error('Error searching funds:', error);
      throw new Error('Failed to search mutual funds');
    }
  },

  getFundDetails: async (schemeCode: string): Promise<FundDetails> => {
    try {
      const response = await fetch(`${BASE_URL}/${schemeCode}`);
      const details = await response.json();
      return details;
    } catch (error) {
      console.error('Error fetching fund details:', error);
      throw new Error('Failed to fetch fund details');
    }
  }
};
