import dns from "dns/promises";

try {
  const records = await dns.resolveSrv(
    "_mongodb._tcp.cluster0.jby2cid.mongodb.net"
  );

  console.log("SUCCESS:");
  console.log(records);
} catch (err) {
  console.error("ERROR:");
  console.error(err);
}