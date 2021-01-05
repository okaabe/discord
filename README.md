<h2 align="center">Discord Bot</h2>
<p align="center">A simple application that consumes the discord api</p>

### Setup
For setup this application, you must to install all of the following items
  
    - NodeJs - A javascript runtime to run javascript without a browser
    - NPM - Node Package Manager
  
after they were installed, you can clone this repository and execute this commands in sequence

    - git clone  http://www.github.com/okaabe/discord
    - cd discord
    - npm install
    - cp .env.example .env
 
 open .env file and change the `DISCORD_TOKEN`, `MONGODB_URIS` value to your token and uris and run the application running `node .` inside of the directory.
 
 ### How to use
 The default prefix is `!`, so you can just send this message in a server that contains the application `!help`
 
 ### How to change the command prefix
 Inside of the .env file, you have the property `DISCORD_PREFIX`, change the value to a prefix of your choice.
