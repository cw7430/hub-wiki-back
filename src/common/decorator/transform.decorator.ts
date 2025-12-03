import { Transform } from 'class-transformer';

export const TransformBigintToString = () => {
  return Transform(({ value }) =>
    typeof value === 'bigint' ? value.toString() : value,
  );
};

export const TransformStringToBigint = () => {
  return Transform(({ value }) =>
    typeof value === 'string' ? BigInt(value) : value,
  );
};
