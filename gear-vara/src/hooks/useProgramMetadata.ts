'use client';

import { useAlert } from '@gear-js/react-hooks';
import { ProgramMetadata } from '@gear-js/api';
import { HexString } from '@polkadot/util/types';
import { useEffect, useState } from 'react';

export const useProgramMetadata = (source: string) => {
  const alert = useAlert();

  const [metadata, setMetadata] = useState<ProgramMetadata>();

  useEffect(() => {
    fetch(source)
      .then((response) => response.text())
      .then((raw) => `0x${raw}` as HexString)
      .then((metaHex) => ProgramMetadata.from(metaHex))
      .then((result) => setMetadata(result))
      .catch(({ message }: Error) => alert.error(message));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return metadata;
};
