const path = require("path");
const {argv} = require("yargs")(process.argv);

/**
 * Возможные проблемы:
 * 1. Пробел в пути к ключу
 * 2. Обратные слеши `\` в пути к ключу криво экранируются и ключ не открывается. Можно использовать прямые слеши `/`
 * 3. ssh ругается, что у ключа слишком открытый доступ, надо для файла с ключом дать права на чтение только пользователю, от имени которого выполняется приложение
 */

require("dotenv").config();

function getProp(name) {
  const n = `ftp${name.charAt(0).toUpperCase()}${name.substr(1)}`;
  return argv[n] || process.env[`FTP_${name.toUpperCase()}`];
}

async function dataSync(props, _console = console) {
  const options = ["host", "port", "user", "pass", "local", "remote", "sshKeyPath", "sshKeyOptions", "protocol"].reduce(
    (res, name) => {
      res[name] = res[name] || getProp(name);
      return res;
    },
    {},
  );
  return doFTPS({...options, ...props}, _console);
}

function doFtpSync(options) {
  const ftpSync = require("ftpsync");
  return new Promise((resolve, reject) => {
    ftpSync.settings = options;
    ftpSync.log.verbose = true;
    ftpSync.run(function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function doFTPS(options, _console) {
  _console.log("FTP mirror start");
  return new Promise((resolve, reject) => {
    process.env.PATH += `;${path.resolve(__dirname, "../bin/lftp/bin")}`;
    const FTPS = require("ftps");
    const protocol = options.protocol || options.type;
    const ftps = new FTPS({
      host: options.host, // required
      username: options.user, // Optional. Use empty username for anonymous access.
      password: options.pass, // Required if username is not empty, except when requiresPassword: false
      protocol, // Optional, values : 'ftp', 'sftp', 'ftps', ... default: 'ftp'
      // protocol is added on beginning of host, ex : sftp://domain.com in this case
      port: options.port, // Optional
      // port is added to the end of the host, ex: sftp://domain.com:22 in this case
      escape: false, // optional, used for escaping shell characters (space, $, etc.), default: true
      // retries: 2, // Optional, defaults to 1 (1 = no retries, 0 = unlimited retries)
      // timeout: 10, // Optional, Time before failing a connection attempt. Defaults to 10
      // retryInterval: 5, // Optional, Time in seconds between attempts. Defaults to 5
      // retryMultiplier: 1, // Optional, Multiplier by which retryInterval is multiplied each time new attempt fails. Defaults to 1
      requiresPassword: false, // Optional, defaults to true
      autoConfirm: true, // Optional, is used to auto confirm ssl questions on sftp or fish protocols, defaults to false
      cwd: options.local, // Optional, defaults to the directory from where the script is executed
      additionalLftpCommands: [
        "set ftp:ssl-allow no",
        "set ssl:verify-certificate no",
        "set ssl-allow true",
        "set passive-mode yes",
      ].join(";"), // Additional commands to pass to lftp, splitted by ';'
      requireSSHKey: true, //  Optional, defaults to false, This option for SFTP Protocol with ssh key authentication
      sshKeyPath: options.sshKeyPath, //'/home1/phrasee/id_dsa', // Required if requireSSHKey: true , defaults to empty string, This option for SFTP Protocol with ssh key authentication
      sshKeyOptions: "StrictHostKeyChecking=no", // ssh key options such as 'StrictHostKeyChecking=no'
    });

    let callback = (err, response) => {
      if (err) reject(err);
      else {
        if (response.error) {
          _console.log("FTP mirror error", response.error);
          reject(response.error);
        } else {
          _console.log("FTP mirror complete", response.data);
          resolve(response.data);
        }
      }
    };

    const remoteDir = `${options.remote}/${path.basename(options.local)}`;

    ftps
      .cd(remoteDir)
      // .ls()
      // .raw("chmod 666 data.json")
      // .raw("chmod 777 images")
      // .raw("chmod -R 666 images/*")
      .mirror({
        remoteDir, // optional, default: .
        localDir: ".", //options.local.replace(/\\/g, "/"), // optional: default: .
        // filter: /\.pdf$/, // optional, filter the files synchronized
        parallel: 5, //true / Integer, // optional, default: false
        upload: true, // optional, default: false, to upload the files from the locaDir to the remoteDir
        options: "-p",
      })
      // .raw("chmod 666 data.json")
      // .raw("chmod -R 666 images/*")
      // .raw("chmod 777 images")
      .exec(callback);

    /*stream.stdout.on('data', function (res) {
      _console.log("FTP", res);
    })
    stream.stderr.on('data', function (res) {
      _console.log("FTP error", res);
    })
    stream.on('error', function (err) {
      if (callback) {
        callback(err)
      }
      callback = null // Make sure callback is only called once, whether 'exit' event is triggered or not.
    })
    stream.on('close', function (code) {
      callback?.(null, code);
    });*/
  });
}

module.exports = dataSync;
