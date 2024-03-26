# 📢 About the project
Semi-Advanced Twitch Chat Bot coded in JavaScript using [tmi.js](https://tmijs.com/). If you want more features please star this repo. This is my open source version and does not contain many features my bot has.

Made for https://twitch.tv/netlfixandchilly_

# 💬 Features
- Over 50+ Built in commands
- Point System similar to StreamElements
- Point Giveaway and Gambling commands
- Ability to add custom commands
- Ability to control moderators on the bot
- Simple Commands List and Points Leaderboard website
- ${user} and ${touser} support when making custom commands with !comadd

# 📥 Installation & Usage

You are going to need to have the latest version of [node js](https://nodejs.org/en) installed. Recommended to run make sure your bot has MODERATOR in the channel you wish to use it in otherwise some features may not work!

Rename `example_config.json` to `config.json` or copy the example `config.json` below!
#
### Getting Twitch OAuth Token
- Log in to twitch with your bot account
⚠️(When you create a new account, confirm the confirmation code sent to the e-mail. (You can do this with temp mail) Otherwise, oauths may not be able to send messages to chat.)
- https://twitchapps.com/tmi/ Enter this site and press the connect button.
- Once you accept the permissions, an oauth token will appear, put this token in `config.json` under `oauthToken` <br> <br>
![Animation1](https://user-images.githubusercontent.com/92625816/218175817-65772671-6d5f-4077-b9b4-bf6c17c6986b.gif)
#
### Getting your Bot's User ID / your User ID
- Go to https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/ and put in each of the usernames to get the Twitch ID's, then copy them and put them in the `config.json` under `botId` and `botOwnerId`
#
### Creating a Twitch Application
- Login to twitch under your bot account and follow this link to create an app https://dev.twitch.tv/console
- Once you are there click on `Applications` on the left and the click `+ Register Your Application` on the right.
- Give your application a name, to make it simple I recommend naming it whatever you shall name your bot.
- Under `OAuth Redirect URLs` add this link as it will be important later. https://twitchtokengenerator.com
- For Category you can choose `Chat Bot` or `Other`
- Once you are done make sure to click on `Save` down at the bottom then proceed to copy and paste the `Client ID` of your application into the `config.json` file.
- Finally click on the `New Secret` button under `Client Secret` then copy and paste that into the `config.json` file.
#
### Getting Bearer Token and Refresh Token
- Go to https://twitchtokengenerator.com
- Enter your Twitch App Client ID and the Twitch App Client Secret
- To make things simple scroll down and click `Select All` for Available Token Scopes
- Proceed by clicking on `Generate Token!` to the right, on the following page click on `Authorize`, it will then redirect you back to the website where you will have to pass a captcha
- Double Check you generated the token for your __Bot__ account and __not your main account__
- Copy the `Access Token` and put it under `bearer_token` in `config.json`, then copy the `Refresh Token` and put it under `bearer_refresh_token` in `config.json`
#
### Getting API Keys
- __Weather API__ - https://weatherstack.com <br> 
  Simply just follow the link above and sign up for a __FREE__ account to get your API key
  <br> <br>
- __Rapid API__ - https://rapidapi.com <br>
  There are some apis you will need to subscribe to for some commands to work. Do not worry these are completely __FREE__, simply follow the link above, create an account then follow the links below to subscribe to the API's <br>
  - https://rapidapi.com/cavsn/api/twitch-api8/ <br>
  - https://rapidapi.com/KegenGuyll/api/dad-jokes/ <br>
  - https://rapidapi.com/marchingtonoliver/api/the-love-calculator/ 
  <br> <br>
- __DecAPI.me__ - https://decapi.me <br>
  To get this api key just follow the link below and authorize your bot account. <br> 
  - [Get DecAPI Token Here](https://decapi.me/auth/twitch?redirect=followage&scopes=moderator:read:followers)

#
### Installing Dependencies and Creating Databases
- In the directory's terminal run `npm i` or `npm install`
- Run `setup.bat` to create the sqlite databases __(ONLY DO THIS ONCE)__

#
### Starting the Bot
- Run `start.bat` or `npm start` in the directory's terminal
- You should now be able to run the commands in the channel's twitch chat, you can do !ping to test if the bot is working.
- You can access the command list and leaderboard at `http://127.0.0.1:80/commands` and `http://127.0.0.1:80/leaderboard` by default

#
### Example Config.json
```
{
    "twitchApi": {
        "oauthToken": "Twitch OAuth Token",
        "botNickname": "Name of your bot",
        "channelName": "Twitch Channel where bot will respond to commands",
        "botId": "Your Bots Twitch User ID",
        "botOwnerId": "Your Twitch User ID",
        "clientId": "Twitch App Client ID",
        "clientSecret": "Twitch App Client Secret",
        "bearer_token": "Twitch App Bearer Token",
        "bearer_refresh_token": "Twitch App Refresh Token"
    },

    "APIS": {
        "weatherApiKey": "Weather Stack API Key",
        "rapidApiKey": "RapidAPI Key",
        "decapiMeKey": "DecAPI.me Key"
    },

    "ECONOMY": {
        "cheerPoints": 100,
        "giftSubPoints": 500,
        "subPoints": 500,
        "raidPoints": 1000,
        "resubPoints": 500
    },

    "WEBSITE": {
        "port": 80,
        "domain": "http://127.0.0.1:80"
    }
}
```

#
# ⭐Star
 ### If you give a star from the top right, I will add new features.
- 25 ⭐ Stars - Blacklist feature, enabling you to remove someones access to the bot  ❌
- 50 ⭐⭐ Stars - A revamped commands and leaderboard page with extra features. ❌
- 75 ⭐⭐⭐ Stars - Leveling System, and command usage stats on leaderboard page  ❌
- 100 ⭐⭐⭐⭐ Stars - A dashboard with twitch oauth support (Useful if you want to make this a public bot) ❌
#
# ⚠️Legal⚠️

The software designed to perform as a twitch chat bot ONLY. The author is not responsible for any illegal use of these programs. This is 100% educational, please do not misuse this in anyway. 

If there is a legal problem, please contact my e-mail address.

santadiscord2@gmail.com
