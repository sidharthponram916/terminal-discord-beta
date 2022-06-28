const Discord = require('discord.js');
const client = new Discord.Client(); 

const key = "<bot token>"
let channelName = ""; 
let name = "<username>"; 
const chalk = require('chalk');

const readline = require('readline'); 
const rl = readline.createInterface({ 
   input: process.stdin,
   output: process.stdout, 
   terminal: false
})

client.on('ready', async () => { 

   client.user.setActivity("VS Code");

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
                 
            channel.send(`hey`)
         }
         catch (e) { 
            console.log(e); 
         }
      })
   
})   
         

client.on('message', async msg => { 

      if (msg.channel.name == channelName) {            
           if (msg.author.tag !== "<bot user tag>") { 
               console.log(`${chalk.blueBright(`${msg.author.username}`)}: ${msg.content}`);
           }   
      }

     await rl.question(chalk.magentaBright('') , async message => { 
         if (message.trim('') !== '') {
            if (message.trim('').startsWith(">switch")) {
                channelName = message.trim('').split(' ')[1];
               
                let channel = client.channels.cache.find(c => c.name === `${channelName}`);
                 
                let last_messages = await channel.messages.fetch({ limit: 30}); 
       
                last_messages = Array.from(last_messages.values()).reverse();  
       
                for (i = 0; i < 30; i++) { 
                   let msg = last_messages[i]; 
           
                    console.log(`${chalk.yellowBright(msg.author.username)}: ${msg.content}`); 
                } 

                channel.send('‎'); 
       
            }
            else if (message.trim('').startsWith(">ping")) { 
               userName = message.trim('').split(' ')[1]; 

               let user_id = client.users.cache.find(user => user.username == `${userName}`).id; 

               let channel = client.channels.cache.find(c => c.name === `${channelName}`);
               
               channel.send(`<@${user_id}>`);   
            }
            else {   
               let channel = client.channels.cache.find(c => c.name === `${channelName}`);
               channel.send(`${message.trim('')}`)
            }   
         }
      })
})                
  
client.login(`${key}`);
