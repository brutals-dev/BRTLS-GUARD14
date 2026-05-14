const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

const TOKEN = process.env.TOKEN;
const VERIFICATION_CHANNEL_ID = process.env.VERIFICATION_CHANNEL_ID;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get(VERIFICATION_CHANNEL_ID);
  if (!channel) return;

  const msg = await channel.send(
    `${member} ${member} ${member}\n⚡ Verify here to unlock the server!`
  );

  setTimeout(() => msg.delete().catch(() => {}), 6000);
});

client.login(TOKEN);
