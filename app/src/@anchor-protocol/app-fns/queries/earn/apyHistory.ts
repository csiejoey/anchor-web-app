import { DateTime, Rate } from '@anchor-protocol/types';

export interface EarnAPYHistoryData {
  apyHistory: {
    Timestamp: DateTime;
    Height: number;
    DepositRate: Rate;
  }[];
}

export async function earnAPYHistoryQuery(): Promise<EarnAPYHistoryData> {
  return fetch('https://api.anchorprotocol.com/api/v2/deposit-rate')
    .then((res) => res.json())
    .then(
      (
        data: Array<{
          timestamp: DateTime;
          height: number;
          deposit_rate: Rate;
        }>,
      ) => {
        return data.map(({ deposit_rate, height, timestamp }) => ({
          Timestamp: timestamp,
          Height: height,
          DepositRate: deposit_rate,
        }));
      },
    )
    .then((arr) => ({
      apyHistory: arr,
    }));
}
