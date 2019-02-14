const configuration = { directory: "db-backup", password: "lizbazi" };
function getArgs() {
  const args = {};
  for (let i = 2; i < process.argv.length - 1; i++) {
    const arg = process.argv[i];
    const next = process.argv[i + 1];
    const argValue = arg.slice(arg.lastIndexOf("-") + 1, arg.length);
    if (arg.startsWith("-")) {
      if (next.startsWith("-")) args[argValue] = true;
      else args[argValue] = next;
      i++;
    }
  }
  return args;
}
function parseArgs() {
  const args = getArgs();
  Object.keys(args).forEach(arg => {
    switch (arg) {
      case "u":
        configuration.user = args[arg];
        break;
      case "h":
        configuration.host = args[arg];
        break;
      case "d":
        configuration.database = args[arg];
        break;
      default:
        break;
    }
  });
  return configuration;
}
module.exports = parseArgs;
