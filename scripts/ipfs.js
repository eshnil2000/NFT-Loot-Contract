require('dotenv').config();

const IPFS = require('ipfs-core');
var ipfs;
var cid
const ipfsCreate = async () => {
    ipfs =  await IPFS.create({repo: 'ok'+ Math.random()})
    //console.log("ipfs message " + ipfs)
}

 const pinJSONToIPFS = async(JSONBody) => {
    //console.log("pinJSONToIPFS got "+ JSON.stringify(JSONBody))
    //ipfsCreate()
    ipfs =  await IPFS.create({repo: 'ok'+ Math.random()})
    
    cid = await ipfs.add(JSON.stringify(JSONBody))
        //console.info("returning success from " + JSON.stringify(cid))
        ipfs.stop()
        return {
            success: true,
            ipfsUrl: cid.path
        };
};

module.exports = { pinJSONToIPFS };
