var VyperStorage = artifacts.require("VyperStorage");
var Pool = artifacts.require("Pool");
var Token = artifacts.require("Token");
var testerc = artifacts.require("SC");


module.exports = async function(deployer) {
  // deployer.deploy(VyperStorage);
  const accounts = await web3.eth.getAccounts();
  
  let tk1 = await deployer.deploy(testerc); 
  let tk2 = await deployer.deploy(testerc);
  let tk3 = await deployer.deploy(testerc);


  // let tk1 = await testerc.at("0x53cd358bf060af53eb3103b0803048e34a349f95"); // USDT on Neon
  // let tk2 = await testerc.at("0x9C27C76239E69555103C43AFD87C41628E8f8a14"); // USDC on Neon
  // let tk3 = await testerc.at("0x90723af99e62abe72f2089d84ac144844524cd78"); // DAI on Neon



  let TokenInstance = await deployer.deploy(Token,"LiquidityToken","Token","18","0");

  let PoolInstance = await deployer.deploy(Pool,accounts[0],[tk1.address,tk2.address,tk3.address],TokenInstance.address,"2000","3000000","5000000000");
  
  await TokenInstance.set_minter(PoolInstance.address);

  await TokenInstance.balanceOf(accounts[0]).then((response)=>{
    console.log(response.toString(10));
  })
  
  await tk1.approve(PoolInstance.address,"100000000000000000000");
  await tk2.approve(PoolInstance.address,"100000000000000000000");
  await tk3.approve(PoolInstance.address,"100000000000000000000");
  
  await PoolInstance.add_liquidity(["100000000000000000000","100000000000000000000","100000000000000000000"],"100000000000000000000");
  
  await TokenInstance.balanceOf(accounts[0]).then((response)=>{
    console.log("Liquidity balance",response.toString(10));
  })

  await console.log("Pool -",PoolInstance.address);
  await console.log("Token -",TokenInstance.address);
  await console.log(tk1.address);
  await console.log(tk2.address);
  await console.log(tk3.address);

  await TokenInstance.approve(PoolInstance.address,"3000000000000000000");
  
  await PoolInstance.remove_liquidity("3000000000000000000",["1","1","1"]);
  
  await TokenInstance.approve(PoolInstance.address,"0");
  
  
  await TokenInstance.approve(PoolInstance.address,"3000000000000000000");
  
  await PoolInstance.remove_liquidity("3000000000000000000",["1","1","1"]);
  
  await TokenInstance.balanceOf(accounts[0]).then((response)=>{
    console.log("Liquidity balance",response.toString(10));
  })
  
  await console.log("Hello1")
  await TokenInstance.approve(PoolInstance.address,"0");
  await TokenInstance.approve(PoolInstance.address,"30000000000000000000");
  await console.log("Hello2")
  
  await PoolInstance.remove_liquidity_one_coin("20000000000000000000","0","1");
  await console.log("Hello3")
  
  await TokenInstance.balanceOf(accounts[0]).then((response)=>{
    console.log("Liquidity balance",response.toString(10));
  })

  await tk1.balanceOf(accounts[0]).then((response)=>{
    console.log("Token 1 balance",response.toString(10));
  })
  await tk2.balanceOf(accounts[0]).then((response)=>{
    console.log("Token 2 balance",response.toString(10));
  })
  
  
  await tk1.approve(PoolInstance.address,"5000000000000000000");


await PoolInstance.exchange("0","1","5000000000000000000","400000000000000000")

  await tk1.balanceOf(accounts[0]).then((response)=>{
    console.log("Token 1 balance",response.toString(10));
  })
  await tk2.balanceOf(accounts[0]).then((response)=>{
    console.log("Token 2 balance",response.toString(10));
  })
  
  
  
};
