const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

const TOKEN = process.env.TOKEN;
const VERIFICATION_CHANNEL_ID = process.env.VERIFICATION_CHANNEL_ID;

// safety logs (IMPORTANT for Railway debugging)
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

if (!TOKEN) {
  console.log("TOKEN missing in environment variables");
  process.exit(1);
}

client.once("ready", () => {
  console.log(`⚔️ BOT ONLINE: ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    const channel = member.guild.channels.cache.get(VERIFICATION_CHANNEL_ID);

    // 📩 DM MESSAGE
    await member.send(
`⚔️ **WELCOME TO BRUTALS CORE** ⚔️

Yo ${member.user.username},

Before you get access, complete the steps below:

━━━━━━━━━━━━━━━━━━

📜 Rules:
<#1466451158729228538>

🎭 Reaction Roles:
<#1466580911528087653>

🔐 Verification:
<#1466593180266004560>

━━━━━━━━━━━━━━━━━━

⚠️ You must verify to unlock the server.

Stay loyal.`
    ).catch(() => {
      console.log(`Could not DM ${member.user.tag}`);
    });

    // 📢 CHANNEL MESSAGE
    if (!channel) return;

    const msg = await channel.send(
`👤 ${member}

⚔️ New member joined

👉 Check DM for steps to verify
🔓 Complete verification to unlock access`
    );

    // optional auto delete
    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 5000);

  } catch (err) {
    console.error("Join error:", err);
  }
});

client.login(TOKEN);
