const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

const TOKEN = process.env.TOKEN;
const VERIFICATION_CHANNEL_ID = process.env.VERIFICATION_CHANNEL_ID;

if (!TOKEN) {
  console.error("TOKEN missing");
  process.exit(1);
}

if (!VERIFICATION_CHANNEL_ID) {
  console.error("VERIFICATION_CHANNEL_ID missing");
  process.exit(1);
}

client.once("ready", () => {
  console.log(`⚔️ BRUTALS GUARD ONLINE: ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    const channel = member.guild.channels.cache.get(
      VERIFICATION_CHANNEL_ID
    );

    // =========================
    // DM NEW MEMBER
    // =========================
    try {
      await member.send(
        `⚔️ WELCOME TO BRUTALS CORE ⚔️

🔥 You’ve entered BRUTALS — now prove yourself.

📌 FIRST STEP:
Head to the verification channel and verify to unlock full server access.

🚨 IMPORTANT:
Without verification, you stay locked out.

⚔️ Clan. Loyalty. Dominance.`
      );
    } catch (dmError) {
      console.log(`❌ Could not DM ${member.user.tag}`);
    }

    // =========================
    // VERIFICATION CHANNEL PING
    // =========================
    if (!channel) return;

    const msg = await channel.send(
      `${member} ${member} ${member} ${member}
⚔️ WELCOME TO BRUTALS CORE ⚔️
🔥 Verify now and prove you belong among the elite.`
    );

    // =========================
    // AUTO DELETE MESSAGE
    // =========================
    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 6000);

  } catch (error) {
    console.error("Join error:", error);
  }
});

client.login(TOKEN);
