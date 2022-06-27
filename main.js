const Discord = require('discord.js');
const client = new Discord.Client(); 

// of course, you can shield your key with .env as well
const key = "<your_bot_key>" 

let channelName = ""; 
let name = "<your_display_name>"; 
const chalk = require('chalk');

const readline = require('readline'); 
const rl = readline.createInterface({ 
   input: process.stdin,
   output: process.stdout, 
   terminal: false
})

client.on('ready', async () => { 

   client.user.setActivity("im online lmao");

     console.log(chalk.blueBright(`Discord FeatherWeight Edition V1.0.2`)); 
     console.log(chalk.redBright(`Powered by ${client.user.tag}`)); 


         
    await rl.question(`Enter the name of the channel you want to access: `, async data => { 
        try { 
            channelName = data;

            /*  let last_messages = await client.channels.cache.get(`${channel_id}`).messages.fetch({ limit: 30}); */
            let channel = client.channels.cache.find(c => c.name === `${channelName}`);
 
            let last_messages = await channel.messages.fetch({ limit: 30}); 

            last_messages = Array.from(last_messages.values()).reverse();  
   
            for (i = 0; i < 30; i++) { 
               let msg = last_messages[i]; 
      
                console.log(`${chalk.yellowBright(msg.author.username)}: ${msg.content}`); 
            }
   
            channel.send(`**${name}** has connected to this channel via Discord FeatherWeight`)
         }
         catch (e) { 
            console.log(e); 
         }
      })

})   
   

client.on('message', async msg => { 

      if (msg.channel.name == channelName) {            
           if (msg.author.tag !== "<your_bot_user_tag>") { 
               console.log(`${chalk.blueBright(`${msg.author.username}`)}: ${msg.content}`);
           }   
      }

     await rl.question(chalk.magenta('') , async message => { 
         if (message.trim('') !== '') {
            if (message.trim('').startsWith(">switch")) {
                channelName = message.trim('').split(' ')[1];

                let channel = client.channels.cache.find(c => c.name === `${channelName}`);

                msg.channel.send(`**${name}** has disconnected from the channel. `); 



                let last_messages = await channel.messages.fetch({ limit: 30}); 
       
                last_messages = Array.from(last_messages.values()).reverse();  
       
                for (i = 0; i < 30; i++) { 
                   let msg = last_messages[i]; 
           
                    console.log(`${chalk.yellowBright(msg.author.username)}: ${msg.content}`); 
                }
       
                channel.send(`**${name}** has connected to this channel via Discord FeatherWeight`)

               }
            else {
             msg.channel.send(`${message.trim('')}`)
            }
         }
      })
})
  
client.login(`${key}`);
