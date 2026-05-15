await member.send(
`⚔️ **WELCOME TO BRUTALS CORE** ⚔️

Yo ${member.user.username},

You’ve just entered the server. Before you get full access, follow the steps below carefully.

━━━━━━━━━━━━━━━━━━

📌 **STEP 1 — READ RULES**
<#1466451158729228538>

Make sure you understand the server rules before proceeding.

━━━━━━━━━━━━━━━━━━

📌 **STEP 2 — REACTION ROLES**
<#1466580911528087653>

Pick your roles here to unlock channels and personalize your access.

━━━━━━━━━━━━━━━━━━

📌 **STEP 3 — VERIFY YOURSELF**
<#1466593180266004560>

Complete verification to unlock the full server.

━━━━━━━━━━━━━━━━━━

⚠️ IMPORTANT:
- No verification = no access
- Follow steps in order
- Don’t skip anything

⚔️ Welcome to the system. Stay loyal.`
).catch(() => {
  console.log(`❌ Could not DM ${member.user.tag}`);
});
