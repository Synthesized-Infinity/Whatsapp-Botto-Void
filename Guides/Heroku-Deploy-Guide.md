## Heroku Deploy Guide
1. [Whatsapp-Botto-Void](https://github.com/Synthesized-Infinity/Whatsapp-Botto-Void) - Go there
2. Scroll down a bit and you will see the "Deploy To Heroku" button in purple color (sorry if you are color blind)
3. Click on it and login or sign up for Heroku
4. Enter the following fields
    | KEY | VALUE |
    | --- | ----------- |
    | BOTNAME | Void |
    | PREFIX | ! |
    | SESSION | Any text you want but make sure to remember and don't share it |
    | MODS |  |
    | MONGO_URI | YOUR CLUSTER URI |
 
`NAME` The name of the Bot <br>
`PREFIX` The Prefix of the Bot <br>
`SESSION` A string to keep track of your session. <brs>
`MODS` The phone numbers of users who you want to be the bot's Admins separated by a comma and must the numbers must be in the following format: `[cc][number]`. eg: `919744******`<br>
`MONGO_URI` is the Connection URL to your DB ([Mongo-Atlas-Guide]())<br> 
5. Wait for the building to finish, you should always keep an eye on log messages, you can find log messages in the Dashboard -> More -> View logs
6. After it builds, click on the "View" or "Open App"
7. Authenticate By Providing Your SESSION_ID and a QR Code Will Show Up
8. Open WhatsApp on your phone -> Click on the 3 Dots on the top Right -> Click on WhatsApp Web -> Click on "Link a Device" and scan the QR from the previous step
9. Profit!

### 😼️ Enjoy and make sure to study!