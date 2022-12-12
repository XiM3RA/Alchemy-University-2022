const provider = require('./provider');

async function getTotalBalance(addresses) {
    const batchCalls = addresses.map((x,i) => (
        {
        jsonrpc: "2.0",
        id: i,
        method: "eth_getBalance",
        params: [x],
        }));
    const response = await provider.send(batchCalls);
    
    // return the total balance of all the addresses 
    
    return response.reduce((acc,x) => acc + parseInt(x.result),0);
}

module.exports = getTotalBalance;
