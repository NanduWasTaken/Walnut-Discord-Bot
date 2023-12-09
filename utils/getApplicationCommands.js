module.exports = {
  async get(client, guildId) {
    const applicationCommands = [];
    let rawApplicationCommands;

    if (guildId) {
      const guild = await client.guilds.cache.get(guildId);
      if (!guild) return ["nothing on cache"];
      rawApplicationCommands = await guild.commands.fetch();
    } else {
      rawApplicationCommands = await client.application.commands.fetch();
    }

    rawApplicationCommands.forEach((cmd) => {
      applicationCommands.push({
        options: cmd.options,
        name: cmd.name,
        name_localizations: cmd.name_localizations,
        description: cmd.description,
        description_localizations: cmd.description_localizations,
        default_permission: cmd.default_permission,
        default_member_permissions: cmd.default_member_permissions,
        dm_permission: cmd.dm_permission,
        nsfw: cmd.nsfw,
      });
    });

    return applicationCommands;
  },
};
