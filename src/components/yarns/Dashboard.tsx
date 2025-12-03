import { useGetYarns } from "../../api/ravelry/hooks";

export const Yarns = () => {
  const { data, isLoading, isError, error } = useGetYarns();

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return <div>Yarns</div>;
};
