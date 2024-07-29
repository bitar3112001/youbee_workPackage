import { Summary } from "./summary";
import { Metrics } from "./metrics";
import { ProxyIndicators } from "./ProxyIndicators";



export interface AssetData {
  _id: string;
  asset_id: string;
  Summary: Summary;
  metrics: Metrics;
  proxy_indicators: ProxyIndicators;
}
