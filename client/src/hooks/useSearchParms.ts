import { useSearchParams } from "next/navigation";

export function useSrchParams() {
  const searchParams = useSearchParams();

  const getSearchParams = () => {
    const params = new URLSearchParams(searchParams);

    const paramsObject = {};

    // Convert iterator to array using Array.from
    const paramsArray = Array.from(params.entries());

    // Iterate over the array and populate paramsObject
    for (const [key, value] of paramsArray) {
      paramsObject[key] = value;
    }


    return paramsObject;
  };

  return getSearchParams();
}
