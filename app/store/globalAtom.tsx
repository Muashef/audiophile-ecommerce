import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const cartsAtom = atomWithStorage<
  | {
      id: number | undefined;
      name: string | undefined;
      image: string | undefined;
      price: number | undefined;
      quantity: number | undefined;
    }[]
  | []
>("cartAtom", []);