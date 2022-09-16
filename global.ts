import chalk from "chalk";

const { error, info, log, debug, warn } = console;

console.error = (message?: any, ...optionalParams: any[]) => {
    error(chalk.red(message), chalk.red(...optionalParams));
};

console.info = (message?: any, ...optionalParams: any[]) => {
    info(chalk.blue(message), chalk.blue(optionalParams));
};

console.log = (message?: any, ...optionalParams: any[]) => {
    log(chalk.white(message), chalk.white(optionalParams));
};

console.debug = (message?: any, ...optionalParams: any[]) => {
    debug(chalk.yellow(message), chalk.yellow(optionalParams));
};

console.warn = (message?: any, ...optionalParams: any[]) => {
    warn(chalk.gray(message), chalk.gray(optionalParams));
};
