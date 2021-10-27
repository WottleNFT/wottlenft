const getBechAddr = async (hexAddr: string) => {
  const res = await fetch("/api/convertAddr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address: hexAddr }),
  });
  return res.text();
};
export default getBechAddr;
