import { createLogger, format, transports } from 'winston';

const transportBuilder = [];

export const levels = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  http: 'http',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
};

//
// If we're not in production then log to the `console` with the format simple:
//
// if (isProd()) {
//   transportBuilder.push(new transports.Console({ format: format.simple() }));
// } else if (isTest()) {
//   transportBuilder.push(
//     new transports.Console({ level: levels.debug, format: format.json() }),
//   );
// } else {
//   transportBuilder.push(
//     new transports.Console({
//       level: levels.debug,
//       format: format.combine(
//         format.colorize(),
//         format.prettyPrint(),
//         format.json(),
//       ),
//     }),
//   );
// }

export const logger = createLogger({
  level: levels.info,
  format: format.json(),
  defaultMeta: { service: 'booking-service' },
  transports: transportBuilder,
});
