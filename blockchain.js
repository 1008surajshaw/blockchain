const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()]
    }

    addBlock({data}){
        const newBlock =Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1],
            data
        });
        this.chain.push(newBlock) 
    }

    replaceChain(chain){
       if(chain.length <= this.chain.length){
        console.error("the incoming chain is not longest")
       }
       if(!BlockChain.isValidChain(chain)){
        console.error('The incoming chain is not valid')
       }
    this.chain = chain
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) 
        {
            return false;
        }
        
         for(let i=1;i<chain.length;i++){
           const {timestamp,prevHash,hash,data,nonce,difficulty} = chain[i];
           const lastDifficulty = chain[i-1].difficulty
           const realLastHash = chain[i-1].hash;
           if(prevHash !== realLastHash) return false
           
           const validatedHash = cryptoHash(timestamp,prevHash,data,nonce,difficulty)
           if(hash !== validatedHash) return false
           if(Math.abs(lastDifficulty-difficulty)>1) return false
         }
         return true; 
    }
}
const blockchain = new BlockChain()
blockchain.addBlock({data:"Block1"})
const result = BlockChain.isValidChain(blockchain.chain)
console.log(blockchain)
 console.log(result)
module.exports = BlockChain