const Discord = require('discord.js');

module.exports = {
  assignRole: (member, roleName) => {
    const role = member.guild.roles.cache.find((role) => role.name === roleName);
    if (!role) {
      console.error(`Role ${roleName} not found`);
      return;
    }

    if (member.roles.cache.has(role.id)) {
      console.log(`User already has the role ${roleName}`);
      return;
    }

    try {
      member.roles.add(role);
      console.log(`Role ${roleName} successfully assigned to ${member.user.tag}`);
    } catch (error) {
      console.error(`Error assigning role ${roleName} to ${member.user.tag}: ${error}`);
    }
  },

  removeRole: (member, roleName) => {
    const role = member.guild.roles.cache.find((role) => role.name === roleName);
    if (!role) {
      console.error(`Role ${roleName} not found`);
      return;
    }

    if (!member.roles.cache.has(role.id)) {
      console.log(`User does not have the role ${roleName}`);
      return;
    }

    try {
      member.roles.remove(role);
      console.log(`Role ${roleName} successfully removed from ${member.user.tag}`);
    } catch (error) {
      console.error(`Error removing role ${roleName} from ${member.user.tag}: ${error}`);
    }
  },

  modifyRole: (member, oldRoleName, newRoleName) => {
    const oldRole = member.guild.roles.cache.find((role) => role.name === oldRoleName);
    const newRole = member.guild.roles.cache.find((role) => role.name === newRoleName);

    if (!oldRole || !newRole) {
      console.error(`Old role ${oldRoleName} or new role ${newRoleName} not found`);
      return;
    }

    if (!member.roles.cache.has(oldRole.id)) {
      console.log(`User does not have the role ${oldRoleName}`);
      return;
    }

    try {
      member.roles.remove(oldRole);
      member.roles.add(newRole);
      console.log(`Role ${oldRoleName} successfully replaced with ${newRoleName} for ${member.user.tag}`);
    } catch (error) {
      console.error(`Error modifying roles for ${member.user.tag}: ${error}`);
    }
  }
};