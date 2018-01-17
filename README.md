# Live Stream DApp

### This is just a side project to get to know the implementation of Ethereum DApp, assuming there are Twitch live streams, and anyone can subscribe the players and gives them Ether.



## Prerequisite

- nodejs
- truffle: $ npm install -g truffle
- python 2 (Windows platform, notice adding to PATH)



## Compile & Run

1. One console runs react frontend, so after ***npm install*** to download dependencies, use ***npm run start*** to display web page on localhost:3000.

2. Another console for running truffle, use

   **$ truffle compile**

   **$ truffle migrate**

   to compile and migrate the contracts. Then, ***$ truffle develop*** to start the test server including 10 accounts, each account has 100 ether.



## Demo

1. #### The owner(yourself) is supposed to be Account 1. We list top 8 twitch players on home page, and these players are Account 2 ~ Account 9.

   ![eth-1](/src/assets/eth-1.png)

   ![eth-2](/src/assets/eth-2.png)

2. #### Let's subscribe the first user (Account 2) and give it 2 ether.

   ![eth-3](/src/assets/eth-3.png)

3. #### If we subscribe successfully, the status of this user changed.

   ![eth-4](/src/assets/eth-4.png)

4. ####  Finally, let's check out the changes of balance.

   ![eth-5](/src/assets/eth-5.png)

   ![eth-6](/src/assets/eth-6.png)



## Learned from this project

- Truffle
- Solidity
- web3 js
- Twitch API
- Semantic UI React
- redux