import { CW20Addr, HumanAddr, Token, u, UST } from '@anchor-protocol/types';
import { terraSendTx } from '@anchor-protocol/app-fns';
import { useRefetchQueries } from '@libs/app-provider';
import { useStream } from '@rx-stream/react';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useCallback } from 'react';
import { useAnchorWebapp } from '../../contexts/context';
import { ANCHOR_TX_KEY } from '../../env';

export interface TerraSendTxParams {
  toWalletAddress: HumanAddr;
  currency: { cw20Contract: CW20Addr } | { tokenDenom: string };
  memo?: string;
  amount: Token;
  txFee: u<UST>;

  onTxSucceed?: () => void;
}

export function useTerraSendTx() {
  const connectedWallet = useConnectedWallet();

  const { queryClient, txErrorReporter, constants } = useAnchorWebapp();

  const refetchQueries = useRefetchQueries();

  const stream = useCallback(
    ({
      toWalletAddress,
      currency,
      memo,
      amount,
      txFee,
      onTxSucceed,
    }: TerraSendTxParams) => {
      if (!connectedWallet || !connectedWallet.availablePost) {
        throw new Error('Can not post!');
      }

      return terraSendTx({
        myWalletAddress: connectedWallet.walletAddress,
        toWalletAddress,
        amount,
        currency,
        memo,
        txFee,
        // post
        network: connectedWallet.network,
        post: connectedWallet.post,
        gasFee: constants.gasWanted,
        gasAdjustment: constants.gasAdjustment,
        // query
        queryClient,
        // error
        txErrorReporter,
        // side effect
        onTxSucceed: () => {
          onTxSucceed?.();
          refetchQueries(ANCHOR_TX_KEY.TERRA_SEND);
        },
      });
    },
    [
      connectedWallet,
      constants.gasWanted,
      constants.gasAdjustment,
      queryClient,
      txErrorReporter,
      refetchQueries,
    ],
  );

  const streamReturn = useStream(stream);

  return connectedWallet ? streamReturn : [null, null];
}
