export interface Summary {
  E_agg: {
    Raw_Value: number;
  };
  S_agg?: {
    Raw_Value: number;
  };
  G_agg?: {
    Raw_Value: number;
  };
}

export interface Metrics {
  number_of_employees: number;
  annual_revenue: number;
}

export interface ProxyIndicators {
  GHG_Scope_One: {
    Raw_Value: number;
  };
  Water_Consumption: {
    Raw_Value: number;
  };
  Acute_Risks: {
    Raw_Value: number;
  };
  Liquidity_and_Solvency: {
    Raw_Value: number;
  };
}

export interface AssetData {
  _id: string;
  asset_id: string;
  Summary: Summary;
  metrics: Metrics;
  proxy_indicators: ProxyIndicators;
}
