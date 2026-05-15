const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

const TOKEN = process.env.TOKEN;
const VERIFICATION_CHANNEL_ID = process.env.VERIFICATION_CHANNEL_ID;

// 🔥 debug so Railway shows real errors
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

// ❌ stop if token missing
if (!TOKEN) {
  console.log("❌ TOKEN missing in Railway Variables");
  process.exit(1);
}

client.once("ready", () => {
  console.log(`⚔️ BRUTALS BOT ONLINE: ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    // =========================
    // 📩 DM MESSAGE (CLEAN ONBOARDING)
    // =========================
    await member.send(
`⚔️ **WELCOME TO BRUTALS CORE** ⚔️

Yo ${member.user.username},

Before you get access, complete these steps:

━━━━━━━━━━━━━━━━━━

📜 Rules:
<#1466451158729228538>

🎭 Reaction Roles:
<#1466580911528087653>

🔐 Verification:
<#1466593180266004560>

━━━━━━━━━━━━━━━━━━

⚠️ You must verify to unlock full access.

Stay loyal. Stay active.`
    ).catch(() => {
      console.log(`❌ Could not DM ${member.user.tag}`);
    });

    // =========================
    // 📢 VERIFICATION CHANNEL PING
    // =========================
    const channel = member.guild.channels.cache.get(VERIFICATION_CHANNEL_ID);
    if (!channel) return;

    const msg = await channel.send(
`${member} ${member} ${member} ${member}

⚔️ **NEW MEMBER ALERT**

👉 Check your DM for steps
🔐 Verify to unlock full access`
    );

    // 🧹 auto delete (optional clean look)
    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 6000);

  } catch (err) {
    console.error("❌ Join event error:", err);
  }
});

client.login(TOKEN)
  .then(() => console.log("✅ Login successful"))
  .catch(err => console.log("❌ LOGIN FAILED:", err));
